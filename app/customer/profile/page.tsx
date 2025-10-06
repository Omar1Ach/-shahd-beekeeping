"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import CustomerLayout from "@/components/layout/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Phone, MapPin, Save } from "lucide-react"

type Customer = {
  id: string
  name: string
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  notes: string | null
}

export default function CustomerProfilePage() {
  const { data: session } = useSession()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (session?.user?.customerId) {
      fetchCustomer()
    }
  }, [session])

  const fetchCustomer = async () => {
    try {
      const res = await fetch(`/api/customers/${session?.user?.customerId}`)
      const data = await res.json()
      setCustomer(data)
    } catch (error) {
      console.error("Error fetching customer:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customer) return

    setSaving(true)
    try {
      const res = await fetch(`/api/customers/${customer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      })

      if (res.ok) {
        alert("Profile updated successfully!")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <CustomerLayout>
        <div className="p-8">Loading profile...</div>
      </CustomerLayout>
    )
  }

  if (!customer) {
    return (
      <CustomerLayout>
        <div className="p-8">Customer not found</div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-amber-900">My Profile</h1>
          <p className="text-amber-700">Manage your account information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Summary */}
          <Card className="border-amber-200 md:col-span-1">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
              <CardTitle className="text-amber-900">Account</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-amber-900">{customer.name}</p>
                  <p className="text-sm text-gray-600">{session?.user?.email}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-100 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-amber-600" />
                  <span>{customer.email || "No email"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-amber-600" />
                  <span>{customer.phone || "No phone"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-amber-600" />
                  <span>{customer.city || "No city"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card className="border-amber-200 md:col-span-2">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
              <CardTitle className="text-amber-900">Edit Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="border-amber-200 focus:border-amber-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customer.email || ""}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="border-amber-200 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={customer.phone || ""}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="border-amber-200 focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={customer.city || ""}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="border-amber-200 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={customer.address || ""}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={customer.notes || ""}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    rows={3}
                    className="border-amber-200 focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                    disabled={saving}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  )
}
