"use client"

import { useEffect, useState } from "react"
import CustomerLayout from "@/components/layout/customer-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart } from "lucide-react"
import Image from "next/image"

type Product = {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  imageUrl: string | null
  category: {
    name: string
  }
}

export default function CustomerProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(products)
    }
  }, [searchQuery, products])

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700 border-red-300" }
    if (stock < 10) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-700 border-yellow-300" }
    return { label: "In Stock", color: "bg-emerald-100 text-emerald-700 border-emerald-300" }
  }

  if (loading) {
    return (
      <CustomerLayout>
        <div className="p-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Image
                src="/images/3d-cartoon-honey-bottle.jpg"
                alt="Loading"
                width={200}
                height={200}
                className="mx-auto mb-4 opacity-50 animate-pulse"
              />
              <p className="text-amber-700">Loading products...</p>
            </div>
          </div>
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-amber-900">Our Products</h1>
          <p className="text-amber-700">Browse our premium honey collection</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-amber-200 focus:border-amber-500"
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Image
              src="/images/3d-cartoon-honey-bottle.jpg"
              alt="No products"
              width={300}
              height={300}
              className="mx-auto mb-6 opacity-30"
            />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock)
              return (
                <Card
                  key={product.id}
                  className="border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
                >
                  <div className="relative h-48 bg-gradient-to-br from-amber-50 to-yellow-50 overflow-hidden">
                    <Image
                      src={product.imageUrl || "/images/3d-cartoon-honey-bottle.jpg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={stockStatus.color}>
                        {stockStatus.label}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg text-amber-900 line-clamp-1">
                        {product.name}
                      </CardTitle>
                      <Badge variant="outline" className="border-amber-300 text-amber-700 shrink-0">
                        {product.category.name}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-2 h-10">
                      {product.description || "Premium quality honey from our cooperative"}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-amber-600">
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">{product.stock} units available</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
