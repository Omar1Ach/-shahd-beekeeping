import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@shahd.com' },
    update: {},
    create: {
      email: 'admin@shahd.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })
  console.log('✓ Admin user created')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Raw Honey' },
      update: {},
      create: {
        name: 'Raw Honey',
        description: 'Pure, unprocessed honey from various flowers',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Flavored Honey' },
      update: {},
      create: {
        name: 'Flavored Honey',
        description: 'Honey infused with natural flavors',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Honeycomb' },
      update: {},
      create: {
        name: 'Honeycomb',
        description: 'Natural honeycomb sections',
      },
    }),
    prisma.category.upsert({
      where: { name: 'Bee Products' },
      update: {},
      create: {
        name: 'Bee Products',
        description: 'Pollen, propolis, royal jelly, and more',
      },
    }),
  ])
  console.log('✓ Categories created')

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Wildflower Honey',
        description: 'Light and floral honey from wildflowers',
        price: 12.99,
        stock: 50,
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Acacia Honey',
        description: 'Premium light-colored honey with mild flavor',
        price: 15.99,
        stock: 35,
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Manuka Honey',
        description: 'High-quality medicinal honey from New Zealand',
        price: 49.99,
        stock: 20,
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Eucalyptus Honey',
        description: 'Distinctive honey with herbal notes',
        price: 14.99,
        stock: 12,
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Cinnamon Honey',
        description: 'Honey infused with natural cinnamon',
        price: 13.99,
        stock: 28,
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Lavender Honey',
        description: 'Soothing honey with lavender essence',
        price: 16.99,
        stock: 18,
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Raw Honeycomb',
        description: 'Pure honeycomb section, straight from the hive',
        price: 22.99,
        stock: 8,
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Honey Straws',
        description: 'Convenient single-serve honey straws (pack of 20)',
        price: 9.99,
        stock: 45,
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Bee Pollen',
        description: 'Nutrient-rich bee pollen granules',
        price: 18.99,
        stock: 25,
        categoryId: categories[3].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Propolis Extract',
        description: 'Natural propolis tincture for immune support',
        price: 24.99,
        stock: 15,
        categoryId: categories[3].id,
      },
    }),
  ])
  console.log('✓ Products created')

  // Create customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: 'Ahmad Hassan',
        email: 'ahmad@example.com',
        phone: '+1234567890',
        address: '123 Main St',
        city: 'Damascus',
        notes: 'Regular customer, prefers wildflower honey',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Fatima Ali',
        email: 'fatima@example.com',
        phone: '+1234567891',
        address: '456 Oak Ave',
        city: 'Aleppo',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Mohammed Ibrahim',
        email: 'mohammed@example.com',
        phone: '+1234567892',
        address: '789 Pine Rd',
        city: 'Homs',
      },
    }),
    prisma.customer.create({
      data: {
        name: 'Layla Khalil',
        email: 'layla@example.com',
        phone: '+1234567893',
        address: '321 Elm St',
        city: 'Latakia',
        notes: 'Wholesale buyer',
      },
    }),
  ])
  console.log('✓ Customers created')

  // Create orders
  const order1 = await prisma.order.create({
    data: {
      customerId: customers[0].id,
      status: 'COMPLETED',
      totalAmount: 38.97,
      notes: 'Express delivery requested',
      orderItems: {
        create: [
          {
            productId: products[0].id,
            quantity: 2,
            price: 12.99,
            subtotal: 25.98,
          },
          {
            productId: products[1].id,
            quantity: 1,
            price: 12.99,
            subtotal: 12.99,
          },
        ],
      },
    },
  })

  const order2 = await prisma.order.create({
    data: {
      customerId: customers[1].id,
      status: 'PENDING',
      totalAmount: 29.98,
      orderItems: {
        create: [
          {
            productId: products[2].id,
            quantity: 2,
            price: 14.99,
            subtotal: 29.98,
          },
        ],
      },
    },
  })

  const order3 = await prisma.order.create({
    data: {
      customerId: customers[2].id,
      status: 'SHIPPED',
      totalAmount: 117.94,
      orderItems: {
        create: [
          {
            productId: products[2].id,
            quantity: 2,
            price: 49.99,
            subtotal: 99.98,
          },
          {
            productId: products[8].id,
            quantity: 1,
            price: 17.96,
            subtotal: 17.96,
          },
        ],
      },
    },
  })

  console.log('✓ Orders created')

  // Create cash movements
  await Promise.all([
    prisma.cashMovement.create({
      data: {
        type: 'INCOME',
        amount: 38.97,
        description: 'Sale - Order #' + order1.orderNumber,
        category: 'Sales',
        orderId: order1.id,
      },
    }),
    prisma.cashMovement.create({
      data: {
        type: 'INCOME',
        amount: 29.98,
        description: 'Sale - Order #' + order2.orderNumber,
        category: 'Sales',
        orderId: order2.id,
      },
    }),
    prisma.cashMovement.create({
      data: {
        type: 'EXPENSE',
        amount: 250.00,
        description: 'Beekeeping equipment purchase',
        category: 'Equipment',
      },
    }),
    prisma.cashMovement.create({
      data: {
        type: 'EXPENSE',
        amount: 150.00,
        description: 'Packaging materials',
        category: 'Supplies',
      },
    }),
    prisma.cashMovement.create({
      data: {
        type: 'INCOME',
        amount: 500.00,
        description: 'Wholesale order payment',
        category: 'Sales',
      },
    }),
  ])
  console.log('✓ Cash movements created')

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
