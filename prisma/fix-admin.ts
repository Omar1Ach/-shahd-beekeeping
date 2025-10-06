import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🔧 Fixing admin user role...')

  // Delete existing users
  await prisma.user.deleteMany({})
  console.log('✅ Deleted existing users')

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10)
  const customerPassword = await bcrypt.hash('customer123', 10)

  // Create admin user with ADMIN enum
  const admin = await prisma.user.create({
    data: {
      email: 'admin@shahd.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN', // This should be the enum value
    },
  })

  console.log('✅ Created admin user:', admin.email, 'with role:', admin.role)

  // Get first customer from database
  const firstCustomer = await prisma.customer.findFirst()

  if (firstCustomer) {
    // Create customer user with CUSTOMER enum
    const customerUser = await prisma.user.create({
      data: {
        email: 'customer@shahd.com',
        password: customerPassword,
        name: firstCustomer.name,
        role: 'CUSTOMER', // This should be the enum value
        customerId: firstCustomer.id,
      },
    })

    console.log('✅ Created customer user:', customerUser.email, 'with role:', customerUser.role)
  }

  console.log('✅ Fix complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
