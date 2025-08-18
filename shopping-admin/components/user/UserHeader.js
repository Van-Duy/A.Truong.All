"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, MapPin, User, ShoppingCart } from "lucide-react"

export default function UserHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const features = [
    { icon: "🎯", title: "Cam kết", subtitle: "100% hàng thật" },
    { icon: "🚚", title: "Freeship", subtitle: "mọi đơn" },
    { icon: "💰", title: "Hoàn 200%", subtitle: "nếu hàng giả" },
    { icon: "📅", title: "30 ngày", subtitle: "đổi trả" },
    { icon: "⚡", title: "Giao nhanh", subtitle: "2h" },
    { icon: "💎", title: "Giá siêu rẻ" },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="bg-white shadow-sm">
      {/* Top banner */}
      <div className="bg-green-500 text-white text-center py-1 text-sm">
        Freeship đơn từ 45k, giảm nhiều hơn cùng <strong>FREESHIP XTRA</strong>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-500 text-white px-3 py-2 rounded-lg font-bold text-xl">TIKI</div>
            <div className="text-sm text-gray-600">
              <div className="font-semibold">Tốt & Nhanh</div>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Gạo ST25 25k/kg bao thật"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Search suggestions */}
            <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
              <Link href="/search?q=điện gia dụng" className="hover:text-blue-600">
                điện gia dụng
              </Link>
              <Link href="/search?q=xe cộ" className="hover:text-blue-600">
                xe cộ
              </Link>
              <Link href="/search?q=mẹ & bé" className="hover:text-blue-600">
                mẹ & bé
              </Link>
              <Link href="/search?q=khỏe đẹp" className="hover:text-blue-600">
                khỏe đẹp
              </Link>
              <Link href="/search?q=nhà cửa" className="hover:text-blue-600">
                nhà cửa
              </Link>
              <Link href="/search?q=sách" className="hover:text-blue-600">
                sách
              </Link>
              <Link href="/search?q=thể thao" className="hover:text-blue-600">
                thể thao
              </Link>
            </div>
          </div>

          {/* Right menu */}
          <div className="flex items-center space-x-6">
            <Link href="/search" className="text-blue-500 hover:text-blue-600">
              Tìm kiếm
            </Link>
            <Link href="/account" className="flex items-center space-x-1 text-gray-700 hover:text-blue-500">
              <User className="w-5 h-5" />
              <span>Tài khoản</span>
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-500" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 pb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>
            Giao đến: <strong>Q. 1, P. Bến Nghé, Hồ Chí Minh</strong>
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <span className="text-lg">{feature.icon}</span>
              <div>
                <div className="font-medium text-gray-800">{feature.title}</div>
                {feature.subtitle && <div className="text-gray-600">{feature.subtitle}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
