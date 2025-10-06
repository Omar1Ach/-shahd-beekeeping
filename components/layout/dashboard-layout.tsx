"use client"

import { ReactNode } from "react"
import { Home, Package, ShoppingCart, Users, DollarSign, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
  { icon: DollarSign, label: "Cash Flow", href: "/cash-flow" },
]

function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-amber-200">
      <SidebarContent className="bg-gradient-to-b from-amber-50 to-yellow-50">
        <div className="px-6 py-4 border-b border-amber-200">
          <div className="flex items-center gap-3">
            <Image
              src="/images/503b69f8-f356-4d94-a174-540e44291d83.jpg"
              alt="Shahd Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <h2 className="font-bold text-lg text-amber-900">Shahd</h2>
              <p className="text-xs text-amber-700">Beekeeping Co-op</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-800">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      className={isActive ? "bg-amber-200 text-amber-900 hover:bg-amber-300" : "hover:bg-amber-100 text-gray-700"}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-amber-50/30">
        <DashboardSidebar />

        <div className="flex flex-col w-full">
          {/* Header with honey gradient */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-amber-200 bg-white/80 backdrop-blur-sm px-6 shadow-sm">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-amber-100">
                  <Menu className="h-5 w-5 text-amber-900" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <DashboardSidebar />
              </SheetContent>
            </Sheet>

            <div className="flex-1">
              {/* Title will be set by each page */}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-amber-100">
                  <Avatar className="h-9 w-9 ring-2 ring-amber-300">
                    <AvatarFallback className="bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-900 font-bold">
                      {session?.user?.name?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session?.user?.name || 'Admin User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email || 'admin@shahd.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/landing" })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Main Content with honeycomb pattern background */}
          <main className="flex-1 bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
