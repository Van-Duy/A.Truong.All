"use client"

import Link from "next/link"
import { Search } from "lucide-react"

const categories = [
  { name: "Nhà Sách Tiki", icon: "📚", color: "text-blue-600", href: "/category/books" },
  { name: "Nhà Cửa - Đời Sống", icon: "🏠", color: "text-green-600", href: "/category/home" },
  { name: "Điện Thoại - Máy Tính Bảng", icon: "📱", color: "text-purple-600", href: "/category/electronics" },
  { name: "Đồ Chơi - Mẹ & Bé", icon: "🧸", color: "text-orange-600", href: "/category/toys" },
  { name: "Thiết Bị Số - Phụ Kiện Số", icon: "🎧", color: "text-gray-600", href: "/category/accessories" },
  { name: "Điện Gia Dụng", icon: "🔌", color: "text-red-600", href: "/category/appliances" },
  { name: "Làm Đẹp - Sức Khỏe", icon: "💄", color: "text-pink-600", href: "/category/beauty" },
  { name: "Ô Tô - Xe Máy - Xe Đạp", icon: "🚗", color: "text-indigo-600", href: "/category/vehicles" },
  { name: "Thời trang nữ", icon: "👗", color: "text-purple-600", href: "/category/women-fashion" },
  { name: "Bách Hóa Online", icon: "🛒", color: "text-yellow-600", href: "/category/grocery" },
  { name: "Thể Thao - Dã Ngoại", icon: "⚽", color: "text-green-600", href: "/category/sports" },
  { name: "Thời trang nam", icon: "👔", color: "text-blue-600", href: "/category/men-fashion" },
  { name: "Cross Border - Hàng Quốc Tế", icon: "🌍", color: "text-teal-600", href: "/category/international" },
  { name: "Laptop - Máy Vi Tính - Linh kiện", icon: "💻", color: "text-gray-600", href: "/category/computers" },
  { name: "Giày - Dép nam", icon: "👞", color: "text-brown-600", href: "/category/men-shoes" },
  { name: "Điện Tử - Điện Lạnh", icon: "❄️", color: "text-cyan-600", href: "/category/electronics-cooling" },
  { name: "Giày - Dép nữ", icon: "👠", color: "text-pink-600", href: "/category/women-shoes" },
  { name: "Máy Ảnh - Máy Quay", icon: "📷", color: "text-purple-600", href: "/category/cameras" },
]

export default function UserSidebar() {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm p-4">
      <h2 className="font-semibold text-gray-800 mb-4">Danh mục</h2>

      {/* Search Link */}
      <Link
        href="/search"
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group mb-2"
      >
        <Search className="w-5 h-5 text-blue-600" />
        <span className="text-sm text-gray-700 group-hover:text-blue-600">Tìm kiếm nâng cao</span>
      </Link>

      <div className="border-t border-gray-100 pt-2">
        <div className="space-y-1">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className="text-lg">{category.icon}</span>
              <span className={`text-sm ${category.color} group-hover:text-blue-600`}>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
