"use client"

import { Package, ShoppingCart, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentOrders = [
  { id: "ORD-001", customer: "Ahmad Hassan", amount: 156.50, status: "Completed", items: 3 },
  { id: "ORD-002", customer: "Fatima Ali", amount: 89.00, status: "Pending", items: 2 },
  { id: "ORD-003", customer: "Mohammed Ibrahim", amount: 234.75, status: "Shipped", items: 5 },
  { id: "ORD-004", customer: "Layla Khalil", amount: 67.50, status: "Paid", items: 1 },
]

function StatCard({ title, value, change, icon: Icon, trend }: {
  title: string
  value: string
  change: string
  icon: any
  trend: 'up' | 'down'
}) {
  return (
    <Card className="border-amber-200 bg-gradient-to-br from-white to-amber-50/30 hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-amber-900">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
          <Icon className="h-4 w-4 text-amber-700" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-amber-900">{value}</div>
        <p className="text-xs text-amber-700 flex items-center gap-1 mt-1">
          {trend === 'up' ? (
            <ArrowUpRight className="h-3 w-3 text-emerald-600" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-600" />
          )}
          <span className={trend === 'up' ? 'text-emerald-600' : 'text-red-600'}>
            {change}
          </span>
          {' from last month'}
        </p>
      </CardContent>
    </Card>
  )
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-emerald-100 text-emerald-700 border-emerald-300'
    case 'pending':
      return 'bg-orange-100 text-orange-700 border-orange-300'
    case 'shipped':
      return 'bg-blue-100 text-blue-700 border-blue-300'
    case 'paid':
      return 'bg-amber-100 text-amber-700 border-amber-300'
    case 'cancelled':
      return 'bg-red-100 text-red-700 border-red-300'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300'
  }
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-amber-900">Welcome back, Admin</h2>
            <p className="text-amber-700">Here's what's happening with your cooperative today.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-amber-300 hover:bg-amber-50 text-amber-900">
              Download Report
            </Button>
            <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            change="+20.1%"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Total Orders"
            value="2,350"
            change="+180.1%"
            icon={ShoppingCart}
            trend="up"
          />
          <StatCard
            title="Products in Stock"
            value="1,234"
            change="-19%"
            icon={Package}
            trend="down"
          />
          <StatCard
            title="Active Customers"
            value="573"
            change="+201"
            icon={Users}
            trend="up"
          />
        </div>

        {/* Recent Orders */}
        <Card className="border-amber-200 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-amber-900">Recent Orders</CardTitle>
                <CardDescription className="text-amber-700">Latest orders from your customers</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-amber-100 text-amber-900">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-amber-100">
                  <TableHead className="text-amber-900">Order ID</TableHead>
                  <TableHead className="text-amber-900">Customer</TableHead>
                  <TableHead className="text-amber-900">Items</TableHead>
                  <TableHead className="text-amber-900">Amount</TableHead>
                  <TableHead className="text-amber-900">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id} className="border-amber-100">
                    <TableCell className="font-medium text-amber-900">{order.id}</TableCell>
                    <TableCell className="text-gray-700">{order.customer}</TableCell>
                    <TableCell className="text-gray-700">{order.items} items</TableCell>
                    <TableCell className="text-gray-700">${order.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Stats Row */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-amber-200 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
              <CardTitle className="text-amber-900">Top Products</CardTitle>
              <CardDescription className="text-amber-700">Best selling honey products this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {[
                { name: "Wildflower Honey", sales: 156, revenue: "$3,120" },
                { name: "Acacia Honey", sales: 134, revenue: "$2,680" },
                { name: "Manuka Honey", sales: 98, revenue: "$4,900" },
              ].map((product) => (
                <div key={product.name} className="flex items-center justify-between p-3 rounded-lg bg-amber-50/50 hover:bg-amber-100/50 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-amber-900">{product.name}</p>
                    <p className="text-xs text-amber-700">{product.sales} units sold</p>
                  </div>
                  <div className="font-semibold text-amber-900">{product.revenue}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-amber-200 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
              <CardTitle className="text-amber-900">Low Stock Alert</CardTitle>
              <CardDescription className="text-amber-700">Products running low on inventory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {[
                { name: "Eucalyptus Honey", stock: 12, threshold: 50 },
                { name: "Raw Honeycomb", stock: 8, threshold: 30 },
                { name: "Honey Straws", stock: 23, threshold: 100 },
              ].map((product) => (
                <div key={product.name} className="flex items-center justify-between p-3 rounded-lg bg-orange-50/50 hover:bg-orange-100/50 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-amber-900">{product.name}</p>
                    <p className="text-xs text-amber-700">Threshold: {product.threshold} units</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                    {product.stock} left
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
