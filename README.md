# Shahd - Beekeeping Cooperative Dashboard

A modern, production-ready dashboard web application for managing a beekeeping cooperative. Built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## 🍯 Features

- **Honey-Inspired Design**: Beautiful color palette featuring honey gold (#F59E0B), forest green (#10B981), and bee black (#1F2937)
- **Dashboard Overview**: Real-time statistics, charts, and insights
- **Product Management**: CRUD operations for honey products with categories and stock tracking
- **Customer Management**: Complete customer relationship management
- **Order System**: Create and manage orders with automatic stock updates
- **Cash Flow Tracking**: Monitor income (sales) and expenses
- **Responsive Design**: Mobile-first approach with smooth animations
- **Authentication**: Secure admin login with NextAuth.js

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: TailwindCSS + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Data Fetching**: React Query
- **Charts**: Recharts
- **Authentication**: NextAuth.js
- **Icons**: Lucide React

## 📦 Database Schema

### Models

- **User**: Admin authentication
- **Category**: Product categories
- **Product**: Honey products with stock tracking
- **Customer**: Customer information
- **Order**: Orders with status tracking (Pending/Paid/Shipped/Completed/Cancelled)
- **OrderItem**: Individual items in orders
- **CashMovement**: Income and expense tracking

## 🎨 Design System

### Color Palette

```css
/* Light Theme */
--primary: Honey Gold (#F59E0B)
--secondary: Forest Green (#10B981)
--background: Soft Cream (#FFFBEB)
--muted: Light Honey (#FEF3C7)
--foreground: Bee Black (#1F2937)

/* Dark Theme */
Dark variations with vibrant honey gold accent
```

## 📁 Project Structure

```
chahd/
├── app/
│   ├── page.tsx              # Dashboard homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles & theme
│   ├── products/             # Products CRUD
│   ├── customers/            # Customers CRUD
│   ├── orders/               # Orders management
│   └── cash-flow/            # Cash flow tracking
├── components/
│   └── ui/                   # shadcn/ui components
├── src/
│   └── lib/
│       └── prisma.ts         # Prisma client
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── package.json
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Navigate to project directory**
   ```bash
   cd chahd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Edit `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/shahd"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Seed the database (optional)**
   ```bash
   npx prisma db seed
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```

8. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Dashboard Features

### Overview Page ✅
- Revenue, orders, stock, and customer statistics
- Trend indicators (up/down arrows)
- Recent orders table
- Top selling products
- Low stock alerts

### Products Page (To be implemented)
- Product listing with search and filters
- Add/Edit/Delete products
- Category management
- Stock level tracking
- Image uploads

### Customers Page (To be implemented)
- Customer directory
- Contact information management
- Order history per customer
- Customer notes

### Orders Page (To be implemented)
- Create new orders
- Order status management
- Automatic stock updates
- Invoice generation
- Order history and search

### Cash Flow Page (To be implemented)
- Income tracking from sales
- Expense recording
- Cash balance overview
- Financial reports
- Charts and analytics

## 🔒 Authentication (To be implemented)

- Admin login page
- Session management with NextAuth.js
- Protected routes
- User profile management

## 🎯 Next Steps

1. Implement authentication system
2. Create Products CRUD pages
3. Build Customers management interface
4. Develop Orders system with cart functionality
5. Add Cash Flow tracking pages
6. Create charts and analytics
7. Add data export functionality
8. Implement real-time notifications
9. Add print/PDF generation for invoices
10. Deploy to production

## 📝 Database Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# Open Prisma Studio (Database GUI)
npx prisma studio

# Push schema without migration
npx prisma db push
```

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌙 Dark Mode

The honey-themed design includes a beautiful dark mode with:
- Dark bee black background
- Vibrant honey gold accents
- Optimized contrast for readability

## 📄 License

MIT License - feel free to use this project for your beekeeping cooperative!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue in the GitHub repository.

---

**Shahd** (شهد) - Arabic for "Honey" 🍯
*Made with love for beekeeping cooperatives worldwide*
