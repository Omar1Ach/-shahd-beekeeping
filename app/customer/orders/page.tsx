"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import CustomerLayout from "@/components/layout/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package } from "lucide-react"

type Order = {
  id: string
  orderNumber: string
  totalAmount: number
  status: string
  createdAt: string
  orderItems: {
    quantity: number
    price: number
    product: {
      name: string
    }
  }[]
}

export default function CustomerOrdersPage() {
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
        <div className="p-8">Loading orders...</div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-amber-900">My Orders</h1>
          <p className="text-amber-700">View all your order history</p>
        </div>

        {orders.length === 0 ? (
          <Card className="border-amber-200">
            <CardContent className="py-16 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
              <p className="text-gray-500">Start shopping to see your orders here</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-amber-200 bg-white/90">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
              <CardTitle className="text-amber-900">Order History</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
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
                  {orders.map((order) => (
                    <TableRow key={order.id} className="border-amber-100">
                      <TableCell className="font-medium">
                        #{order.orderNumber.slice(0, 8)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.orderItems.map((item, idx) => (
                            <div key={idx} className="text-sm">
                              {item.product.name} x{item.quantity}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-emerald-600">
                        ${order.totalAmount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </CustomerLayout>
  )
}
