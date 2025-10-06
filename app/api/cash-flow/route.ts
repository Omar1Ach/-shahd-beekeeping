import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

export async function GET() {
  try {
    const movements = await prisma.cashMovement.findMany({
      orderBy: {
        date: 'desc',
      },
    })
    return NextResponse.json(movements)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cash movements' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, amount, description, category, date } = body

    const movement = await prisma.cashMovement.create({
      data: {
        type,
        amount: parseFloat(amount),
        description,
        category,
        date: date ? new Date(date) : new Date(),
      },
    })

    return NextResponse.json(movement, { status: 201 })
  } catch (error) {
    console.error('Error creating cash movement:', error)
    return NextResponse.json({ error: 'Failed to create cash movement' }, { status: 500 })
  }
}
