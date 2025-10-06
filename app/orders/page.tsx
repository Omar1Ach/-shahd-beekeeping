"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Search, Eye } from "lucide-react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

type Order = {
  id: string
  orderNumber: string
  status: string
  totalAmount: number
  createdAt: string
  customer: {
    name: string
  }
  orderItems: Array<{
    quantity: number
    price: number
    product: {
      name: string
    }
  }>
}

type Product = {
  id: string
  name: string
  price: number
  stock: number
}

type Customer = {
  id: string
  name: string
}

type CartItem = {
  productId: string
  productName: string
  price: number
  quantity: number
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const [cart, setCart] = useState<CartItem[]>([])
  const [formData, setFormData] = useState({
    customerId: "",
    status: "PENDING",
    notes: "",
  })

  useEffect(() => {
    fetchOrders()
    fetchProducts()
    fetchCustomers()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders")
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/customers")
      const data = await res.json()
      setCustomers(data)
    } catch (error) {
      console.error("Error fetching customers:", error)
    }
  }

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    const existingItem = cart.find(item => item.productId === productId)
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
      }])
    }
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.productId !== productId))
    } else {
      setCart(cart.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ))
    }
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId))
  }

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert("Please add at least one product to the cart")
      return
    }

    if (!formData.customerId) {
      alert("Please select a customer")
      return
    }

    try {
      const orderData = {
        customerId: formData.customerId,
        status: formData.status,
        notes: formData.notes,
        orderItems: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (res.ok) {
        await fetchOrders()
        await fetchProducts()
        setIsDialogOpen(false)
        resetForm()
        alert("Order created successfully!")
      }
    } catch (error) {
      console.error("Error creating order:", error)
      alert("Failed to create order")
    }
  }

  const resetForm = () => {
    setFormData({
      customerId: "",
      status: "PENDING",
      notes: "",
    })
    setCart([])
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-700 border-emerald-300'
      case 'PENDING':
        return 'bg-orange-100 text-orange-700 border-orange-300'
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'PAID':
        return 'bg-amber-100 text-amber-700 border-amber-300'
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const filteredOrders = orders.filter((order) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8">Loading...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Orders</h1>
            <p className="text-amber-700">Manage customer orders and track sales</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Select customer, add products to cart, and create an order
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer *</Label>
                    <Select
                      value={formData.customerId}
                      onValueChange={(value) => setFormData({ ...formData, customerId: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Order Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="PAID">Paid</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Add Products to Cart</Label>
                  <Select onValueChange={addToCart}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id} disabled={product.stock === 0}>
                          {product.name} - ${product.price.toFixed(2)} (Stock: {product.stock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {cart.length > 0 && (
                  <div className="border border-amber-200 rounded-lg p-4 bg-amber-50/30">
                    <h3 className="font-semibold text-amber-900 mb-3">Cart Items</h3>
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div key={item.productId} className="flex items-center justify-between bg-white p-3 rounded-lg border border-amber-200">
                          <div className="flex-1">
                            <p className="font-medium text-amber-900">{item.productName}</p>
                            <p className="text-sm text-amber-700">${item.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateCartQuantity(item.productId, parseInt(e.target.value))}
                              className="w-20"
                            />
                            <span className="font-semibold text-amber-900 w-24 text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.productId)}
                              className="hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-amber-200 flex justify-between items-center">
                      <span className="text-lg font-semibold text-amber-900">Total:</span>
                      <span className="text-2xl font-bold text-amber-900">${getTotalAmount().toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    placeholder="Special instructions or notes..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false)
                      resetForm()
                    }}
                    className="border-amber-300 hover:bg-amber-50"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white">
                    Create Order (${getTotalAmount().toFixed(2)})
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-amber-200 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-amber-900">Order History</CardTitle>
                <CardDescription className="text-amber-700">
                  {filteredOrders.length} total orders
                </CardDescription>
              </div>
              <div className="w-72">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-amber-100">
                  <TableHead className="text-amber-900">Order #</TableHead>
                  <TableHead className="text-amber-900">Customer</TableHead>
                  <TableHead className="text-amber-900">Items</TableHead>
                  <TableHead className="text-amber-900">Total</TableHead>
                  <TableHead className="text-amber-900">Status</TableHead>
                  <TableHead className="text-amber-900">Date</TableHead>
                  <TableHead className="text-amber-900 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-amber-100">
                      <TableCell className="font-medium text-amber-900">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell className="text-gray-700">{order.customer.name}</TableCell>
                      <TableCell className="text-gray-700">{order.orderItems.length} items</TableCell>
                      <TableCell className="font-semibold text-gray-700">${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedOrder(order)
                            setIsViewDialogOpen(true)
                          }}
                          className="hover:bg-amber-100"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Order Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Order Number</Label>
                    <p className="font-semibold text-amber-900">{selectedOrder.orderNumber}</p>
                  </div>
                  <div>
                    <Label>Customer</Label>
                    <p className="font-semibold">{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div>
                    <Label>Date</Label>
                    <p>{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <Label>Order Items</Label>
                  <div className="mt-2 space-y-2">
                    {selectedOrder.orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between p-3 bg-amber-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-amber-200">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-amber-900">${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
