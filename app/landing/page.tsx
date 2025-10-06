"use client"

import { ArrowRight, Package, Users, TrendingUp, Shield, CheckCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Modern Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/503b69f8-f356-4d94-a174-540e44291d83.jpg"
              alt="Shahd Logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Shahd
              </h1>
              <p className="text-xs text-gray-600">Beekeeping Cooperative</p>
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
            onClick={() => window.location.href = '/auth/login'}
          >
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </nav>

      {/* Hero Section - Modern Glassmorphism */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50/30 to-white -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-20 -z-10" />

        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-900">Modern Beekeeping Management</span>
              </div>

              <h1 className="text-6xl font-bold text-gray-900 leading-tight">
                Sweet Management for Your{" "}
                <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  Honey Business
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Complete solution for beekeeping cooperatives. Manage products, customers, orders, and finances all in one beautiful platform.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg text-base px-8"
                  onClick={() => window.location.href = '/auth/login'}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-amber-600">100%</div>
                  <div className="text-sm text-gray-600">Complete Solution</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">4+</div>
                  <div className="text-sm text-gray-600">Key Features</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-600">24/7</div>
                  <div className="text-sm text-gray-600">Access</div>
                </div>
              </div>
            </div>

            {/* Right - Modern Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/close-up-bee-filing-hive-with-honey.jpg"
                      alt="Bee filling hive"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative h-40 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/working-bee-filling-honey-combs.jpg"
                      alt="Bee working"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative h-40 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/3d-cartoon-honey-bottle.jpg"
                      alt="Honey bottle"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src="/images/vertical-shot-bee-white-blooming-flowers-nature.jpg"
                      alt="Bee on flowers"
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Modern Cards */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features designed for beekeeping cooperatives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Package,
                title: "Product Management",
                description: "Track honey products, stock levels, and categories effortlessly",
                color: "from-amber-500 to-yellow-500"
              },
              {
                icon: Users,
                title: "Customer Relations",
                description: "Manage customer information and complete order history",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: TrendingUp,
                title: "Cash Flow Tracking",
                description: "Monitor income and expenses with real-time balance calculations",
                color: "from-yellow-500 to-amber-500"
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Enterprise-grade security with PostgreSQL and modern encryption",
                color: "from-orange-500 to-amber-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-6">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/honey-word-honeycomb-with-dipper-wooden-plate.jpg"
                alt="Fresh honey with honeycomb"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Why Choose Shahd?
              </h2>
              <p className="text-lg text-gray-600">
                Built specifically for beekeeping cooperatives with features that matter most to your business.
              </p>

              <div className="space-y-4">
                {[
                  "Real-time inventory tracking with automatic stock updates",
                  "Complete order management with shopping cart system",
                  "Comprehensive cash flow monitoring and reporting",
                  "Beautiful, honey-themed interface that's easy to use",
                  "Secure data storage with PostgreSQL database"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 p-12 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10" />

            <div className="relative text-center space-y-6">
              <h2 className="text-5xl font-bold text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-amber-100 max-w-2xl mx-auto">
                Join modern beekeeping cooperatives managing their business with Shahd
              </p>
              <Button
                size="lg"
                className="bg-white text-amber-900 hover:bg-amber-50 shadow-xl text-base px-10"
                onClick={() => window.location.href = '/auth/login'}
              >
                Access Dashboard Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/503b69f8-f356-4d94-a174-540e44291d83.jpg"
                alt="Shahd Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <p className="font-semibold text-gray-900">Shahd</p>
                <p className="text-sm text-gray-600">Beekeeping Cooperative</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600">© 2025 Shahd - All rights reserved</p>
              <p className="text-sm text-gray-500 mt-1">Made with 🍯 for honey producers</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
