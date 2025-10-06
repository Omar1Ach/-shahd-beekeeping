import { auth } from "@/src/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Public routes
  const publicRoutes = ["/landing", "/auth/login"]
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Allow public routes and static files
  if (isPublicRoute || pathname.startsWith("/_next") || pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // Redirect to login if not authenticated
  if (!session) {
    const loginUrl = new URL("/auth/login", req.url)
    return NextResponse.redirect(loginUrl)
  }

  // Admin routes - only accessible by admins
  const adminRoutes = ["/", "/products", "/customers", "/cash-flow", "/orders"]
  const isAdminRoute = adminRoutes.some(route => pathname === route || (route !== "/" && pathname.startsWith(route)))

  console.log('Middleware check:', { pathname, role: session.user.role, isAdminRoute })

  if (isAdminRoute && session.user.role !== "ADMIN") {
    console.log('Redirecting to customer portal - not admin')
    return NextResponse.redirect(new URL("/customer", req.url))
  }

  // Customer routes - only accessible by customers
  if ((pathname === "/customer" || pathname.startsWith("/customer/")) && session.user.role !== "CUSTOMER") {
    console.log('Redirecting customer route to admin dashboard')
    return NextResponse.redirect(new URL("/", req.url))
  }

  console.log('Allowing request to proceed:', pathname)
  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
}
