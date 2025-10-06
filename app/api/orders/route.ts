import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerId, status, notes, orderItems } = body

    // Calculate total amount
    const totalAmount = orderItems.reduce(
      (sum: number, item: any) => sum + item.quantity * item.price,
      0
    )

    // Create order with items
    const order = await prisma.order.create({
      data: {
        customerId,
        status,
        totalAmount,
        notes,
        orderItems: {
          create: orderItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.quantity * item.price,
          })),
        },
      },
      include: {
        customer: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    })

    // Update stock for each product
    for (const item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    // Create cash movement for income
    await prisma.cashMovement.create({
      data: {
        type: 'INCOME',
        amount: totalAmount,
        description: `Sale - Order #${order.orderNumber}`,
        category: 'Sales',
        orderId: order.id,
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
