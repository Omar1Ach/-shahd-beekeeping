"use client"

import { useState, useEffect } from "react"
import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type CashMovement = {
  id: string
  type: string
  amount: number
  description: string
  category: string | null
  date: string
  createdAt: string
}

export default function CashFlowPage() {
  const [movements, setMovements] = useState<CashMovement[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filter, setFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL')
  const [formData, setFormData] = useState({
    type: "INCOME",
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    fetchMovements()
  }, [])

  const fetchMovements = async () => {
    try {
      const res = await fetch("/api/cash-flow")
      const data = await res.json()
      setMovements(data)
    } catch (error) {
      console.error("Error fetching cash movements:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/cash-flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        await fetchMovements()
        setIsDialogOpen(false)
        resetForm()
      }
    } catch (error) {
      console.error("Error creating cash movement:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      type: "INCOME",
      amount: "",
      description: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
    })
  }

  const getFilteredMovements = () => {
    if (filter === 'ALL') return movements
    return movements.filter(m => m.type === filter)
  }

  const calculateTotals = () => {
    const income = movements
      .filter(m => m.type === 'INCOME')
      .reduce((sum, m) => sum + m.amount, 0)

    const expense = movements
      .filter(m => m.type === 'EXPENSE')
      .reduce((sum, m) => sum + m.amount, 0)

    return {
      income,
      expense,
      balance: income - expense
    }
  }

  const totals = calculateTotals()
  const filteredMovements = getFilteredMovements()

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
            <h1 className="text-3xl font-bold text-amber-900">Cash Flow</h1>
            <p className="text-amber-700">Track income and expenses for your cooperative</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Cash Movement</DialogTitle>
                <DialogDescription>
                  Record income or expense transaction
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Transaction Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INCOME">Income</SelectItem>
                        <SelectItem value="EXPENSE">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount ($) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Sales, Equipment, Supplies"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Describe this transaction..."
                    required
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
                    Add Transaction
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-amber-200 bg-gradient-to-br from-white to-emerald-50/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Total Income</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-emerald-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">${totals.income.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-white to-red-50/30 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Total Expenses</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                <TrendingDown className="h-4 w-4 text-red-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">${totals.expense.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-white to-amber-50/50 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900">Net Balance</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-amber-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                ${totals.balance.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className="border-amber-200 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-amber-900">Transaction History</CardTitle>
                <CardDescription className="text-amber-700">
                  {filteredMovements.length} transactions
                </CardDescription>
              </div>
              <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
                <TabsList className="bg-white">
                  <TabsTrigger value="ALL">All</TabsTrigger>
                  <TabsTrigger value="INCOME">Income</TabsTrigger>
                  <TabsTrigger value="EXPENSE">Expenses</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-amber-100">
                  <TableHead className="text-amber-900">Date</TableHead>
                  <TableHead className="text-amber-900">Type</TableHead>
                  <TableHead className="text-amber-900">Description</TableHead>
                  <TableHead className="text-amber-900">Category</TableHead>
                  <TableHead className="text-amber-900 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMovements.map((movement) => (
                    <TableRow key={movement.id} className="border-amber-100">
                      <TableCell className="text-gray-700">
                        {new Date(movement.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          movement.type === 'INCOME'
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                            : 'bg-red-100 text-red-700 border-red-300'
                        }>
                          {movement.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">{movement.description}</TableCell>
                      <TableCell className="text-gray-700">
                        {movement.category && (
                          <Badge variant="outline" className="border-amber-300">
                            {movement.category}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className={`text-right font-semibold ${
                        movement.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {movement.type === 'INCOME' ? '+' : '-'}${movement.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
