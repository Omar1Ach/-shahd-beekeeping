import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding authentication users...')

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10)
  const customerPassword = await bcrypt.hash('customer123', 10)

  // Create or update admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@shahd.com' },
    update: {},
    create: {
      email: 'admin@shahd.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Get first customer from database
  const firstCustomer = await prisma.customer.findFirst()

  if (firstCustomer) {
    // Create customer user linked to first customer
    const customerUser = await prisma.user.upsert({
      where: { email: 'customer@shahd.com' },
      update: {},
      create: {
        email: 'customer@shahd.com',
        password: customerPassword,
        name: firstCustomer.name,
        role: 'CUSTOMER',
        customerId: firstCustomer.id,
      },
    })

    console.log('✅ Created customer user:', customerUser.email)
  }

  console.log('✅ Auth seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
