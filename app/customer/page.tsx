"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import CustomerLayout from "@/components/layout/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingBag, DollarSign, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Order = {
  id: string
  orderNumber: string
  totalAmount: number
  status: string
  createdAt: string
  orderItems: {
    quantity: number
    product: {
      name: string
    }
  }[]
}

export default function CustomerDashboard() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.customerId) {
      fetchOrders()
    }
  }, [session])

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/customers/${session?.user?.customerId}/orders`)
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'PENDING').length,
    totalSpent: orders.reduce((sum, o) => sum + o.totalAmount, 0),
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
      PAID: "bg-blue-100 text-blue-700 border-blue-300",
      SHIPPED: "bg-purple-100 text-purple-700 border-purple-300",
      COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-300",
      CANCELLED: "bg-red-100 text-red-700 border-red-300",
    }
    return variants[status] || variants.PENDING
  }

  if (loading) {
    return (
      <CustomerLayout>
        <div className="p-8">Loading...</div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-amber-900">Dashboard</h1>
          <p className="text-amber-700">Welcome back, {session?.user?.name}!</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-amber-200 bg-white/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Total Orders</CardTitle>
              <ShoppingBag className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-white/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Pending Orders</CardTitle>
              <Clock className="h-5 w-5 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-white/90">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Total Spent</CardTitle>
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-600">${stats.totalSpent.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="border-amber-200 bg-white/90">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
            <CardTitle className="text-amber-900">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No orders yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-amber-100">
                    <TableHead className="text-amber-900">Order #</TableHead>
                    <TableHead className="text-amber-900">Items</TableHead>
                    <TableHead className="text-amber-900">Status</TableHead>
                    <TableHead className="text-amber-900">Date</TableHead>
                    <TableHead className="text-amber-900 text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 5).map((order) => (
                    <TableRow key={order.id} className="border-amber-100">
                      <TableCell className="font-medium">{order.orderNumber.slice(0, 8)}</TableCell>
                      <TableCell>
                        {order.orderItems.map(item => `${item.product.name} (${item.quantity})`).join(', ')}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right font-semibold text-emerald-600">
                        ${order.totalAmount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
}
