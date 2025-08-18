"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ImageIcon, Package, Users, ShoppingCart, Settings, FolderOpen, Ticket } from "lucide-react"

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/sliders", label: "Quản lý Slider", icon: ImageIcon },
  { href: "/admin/categories", label: "Quản lý Danh mục", icon: FolderOpen },
  { href: "/admin/products", label: "Quản lý Sản phẩm", icon: Package },
  { href: "/admin/orders", label: "Quản lý Đơn hàng", icon: ShoppingCart },
  { href: "/admin/customers", label: "Quản lý Khách hàng", icon: Users },
  { href: "/admin/coupons", label: "Quản lý Coupon", icon: Ticket },
  { href: "/admin/settings", label: "Cài đặt hệ thống", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="mt-8">
        <div className="px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </aside>
  )
}
