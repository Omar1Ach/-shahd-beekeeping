"use client"

import { ReactNode } from "react"
import { Home, Package, ShoppingBag, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  { icon: Home, label: "Dashboard", href: "/customer" },
  { icon: Package, label: "Products", href: "/customer/products" },
  { icon: ShoppingBag, label: "My Orders", href: "/customer/orders" },
  { icon: User, label: "Profile", href: "/customer/profile" },
]

function CustomerSidebar() {
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
              <p className="text-xs text-amber-700">Customer Portal</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-900 px-6">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <a
                        href={item.href}
                        className={
                          isActive
                            ? "bg-amber-200 text-amber-900 hover:bg-amber-200"
                            : "text-gray-700 hover:bg-amber-100 hover:text-amber-900"
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </a>
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

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <CustomerSidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b border-amber-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-xl font-semibold text-amber-900">Welcome back!</h1>
                <p className="text-sm text-amber-700">{session?.user?.name}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-amber-400 to-yellow-500 text-white">
                        {session?.user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session?.user?.email}
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
            </div>
          </header>
          <main className="flex-1 bg-gradient-to-br from-amber-50/50 via-white to-yellow-50/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
