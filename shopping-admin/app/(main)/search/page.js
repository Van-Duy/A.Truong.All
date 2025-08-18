"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, ChevronDown, Filter, Grid, List, ChevronRight } from "lucide-react"
import UserHeader from "@/components/user/UserHeader"
import UserFooter from "@/components/user/UserFooter"
import ProductCard from "@/components/user/ProductCard"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("relevant")
  const [filters, setFilters] = useState({
    brand: [],
    priceRange: "",
    rating: "",
    shipping: [],
  })

  // Mock suggestions data
  const suggestions = {
    trending: ["Tựu trường hoành tráng", "mút màng cầu thanh long", "bà ngoại tôi gửi lời xin lỗi", "milo"],
    popular: [
      { text: "máy xông tinh dầu", icon: "🏠" },
      { text: "áo khoác nam", icon: "👔" },
      { text: "áo phao nữ", icon: "🧥" },
      { text: "enfagrow 4", icon: "🍼" },
      { text: "đẹp quai hậu nữ", icon: "👠" },
      { text: "đào hải sản", icon: "🦐" },
    ],
    categories: [
      { name: "Đồ Chơi - Mẹ & Bé", icon: "🧸", color: "bg-orange-100" },
      { name: "Điện Thoại - Máy Tính Bảng", icon: "📱", color: "bg-blue-100" },
      { name: "NGON", icon: "🍯", color: "bg-green-100" },
      { name: "Làm Đẹp - Sức Khỏe", icon: "💄", color: "bg-pink-100" },
      { name: "Điện Gia Dụng", icon: "🏠", color: "bg-gray-100" },
      { name: "Thời trang nữ", icon: "👗", color: "bg-purple-100" },
      { name: "Thời trang nam", icon: "👔", color: "bg-blue-100" },
      { name: "Giày - Dép nữ", icon: "👠", color: "bg-red-100" },
    ],
  }

  // Mock search results
  const mockProducts = [
    {
      id: "1",
      name: "MÚT MÀNG CẦU THANH LONG 500G - VIỆT NAM",
      brand: "THÀNH LONG",
      price: 138600,
      originalPrice: 150000,
      image: "/placeholder.svg?height=200&width=200&text=Mut+Mang+Cau+1",
      rating: 4.2,
      reviewCount: 37,
      badges: ["2025", "FREESHIP XTRA", "CHÍNH HÃNG"],
      deliveryDate: "Giao sáng thứ 4, 13/08",
      discount: "Giảm 10K",
      isOfficial: true,
    },
    {
      id: "2",
      name: "MÚT ME CHUA CAY THÀNH LONG 200G - VIỆT NAM",
      brand: "THÀNH LONG",
      price: 99000,
      originalPrice: 120000,
      image: "/placeholder.svg?height=200&width=200&text=Mut+Me+Chua+Cay",
      rating: 4.5,
      reviewCount: 1,
      badges: ["2025", "FREESHIP XTRA", "CHÍNH HÃNG"],
      deliveryDate: "Giao sáng thứ 4, 13/08",
      discount: "Giảm 10K",
      isOfficial: true,
    },
    {
      id: "3",
      name: "Mứt Me sấy Chua Cay Nguyên Trái Truyền Thống Thơm Ngon Thành Long 500g",
      brand: "THÀNH LONG",
      price: 184800,
      originalPrice: 200000,
      image: "/placeholder.svg?height=200&width=200&text=Mut+Me+Say",
      rating: 4.0,
      reviewCount: 2,
      badges: ["2025", "FREESHIP XTRA", "CHÍNH HÃNG"],
      deliveryDate: "Giao sáng thứ 4, 13/08",
      discount: "Giảm 10K",
      isOfficial: true,
    },
    {
      id: "4",
      name: "MÚT ME THÁI CAY THÀNH LONG (500G) - THÀNH LONG",
      brand: "THÀNH LONG",
      price: 191400,
      originalPrice: 210000,
      image: "/placeholder.svg?height=200&width=200&text=Mut+Me+Thai+Cay",
      rating: 4.8,
      reviewCount: 1,
      badges: ["2025", "FREESHIP XTRA", "CHÍNH HÃNG"],
      deliveryDate: "Giao sáng thứ 4, 13/08",
      discount: "Giảm 10K",
      isOfficial: true,
    },
  ]

  useEffect(() => {
    if (query) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setProducts(mockProducts)
        setLoading(false)
      }, 500)
    }
  }, [query])

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm)
    setShowSuggestions(false)
    // In real app, navigate to search results
    window.history.pushState({}, "", `/search?q=${encodeURIComponent(searchTerm)}`)
  }

  const brands = ["Thành Long", "Thực phẩm Hải Long", "Lai Phú Store", "Ohla"]
  const sortOptions = [
    { value: "relevant", label: "Liên quan" },
    { value: "popular", label: "Phổ biến" },
    { value: "newest", label: "Mới nhất" },
    { value: "price-low", label: "Giá thấp đến cao" },
    { value: "price-high", label: "Giá cao đến thấp" },
    { value: "rating", label: "Đánh giá cao" },
  ]

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserHeader />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Input */}
            <div className="relative mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm, thương hiệu và thể loại mong muốn..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowSuggestions(e.target.value.length > 0)
                  }}
                  onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                  className="w-full px-4 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
                  <div className="p-4">
                    {/* Trending Searches */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-800 mb-3">Tìm kiếm gần đây</h4>
                      <div className="space-y-2">
                        {suggestions.trending.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(item)}
                            className="flex items-center space-x-3 w-full text-left hover:bg-gray-50 p-2 rounded"
                          >
                            <Search className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{item}</span>
                          </button>
                        ))}
                      </div>
                      <button className="text-blue-600 text-sm mt-2 hover:text-blue-700">Xem thêm ▼</button>
                    </div>

                    {/* Popular Searches */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-800 mb-3 text-red-600">🔥 Tìm Kiếm Phổ Biến</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {suggestions.popular.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(item.text)}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded text-left"
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm">{item.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-800 mb-3">Danh Mục Nổi Bật</h4>
                      <div className="grid grid-cols-4 gap-3">
                        {suggestions.categories.map((category, index) => (
                          <Link
                            key={index}
                            href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                            className="flex flex-col items-center p-3 hover:bg-gray-50 rounded text-center"
                          >
                            <div
                              className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-xl mb-2`}
                            >
                              {category.icon}
                            </div>
                            <span className="text-xs text-gray-700">{category.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Default Content */}
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Tìm kiếm sản phẩm</h2>
              <p className="text-gray-600">Nhập từ khóa để tìm kiếm sản phẩm bạn mong muốn</p>
            </div>
          </div>
        </div>

        <UserFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />

      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>Kết quả tìm kiếm "{query}"</span>
        </nav>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 mb-4">
              <h3 className="font-semibold mb-3">Nhà cung cấp</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <button key={brand} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">
                    {brand}
                  </button>
                ))}
                <button className="flex items-center text-blue-600 text-sm">
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Xem thêm
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Bar */}
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded text-sm font-medium">
                    <span>NOW</span>
                    <span>Giao siêu tốc 2H</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded text-sm font-medium">
                    <span>👍 TOP DEAL</span>
                    <span>Siêu rẻ</span>
                  </button>
                  <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded text-sm font-medium">
                    FREESHIP XTRA
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-2 border border-gray-200 rounded text-sm">
                    <span>⭐⭐⭐⭐</span>
                    <span>từ 4 sao</span>
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Sắp xếp</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded px-3 py-2 text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  <button className="flex items-center space-x-1 px-3 py-2 border border-gray-200 rounded text-sm">
                    <Filter className="w-4 h-4" />
                    <span>Tất cả</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Search Results */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" : "space-y-4"}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Promotional Banners */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 text-center">
                <div className="text-2xl font-bold mb-2">Vinamilk</div>
                <div className="text-sm opacity-90">EST 1976</div>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg p-6 text-center">
                <div className="text-xl font-bold mb-2">RohTo</div>
                <div className="text-sm opacity-90">Chăm sóc toàn diện</div>
                <div className="text-xs opacity-75 mt-1">Deal siêu tiết kiệm</div>
                <div className="text-xs opacity-75">Duy nhất tháng 8</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserFooter />
    </div>
  )
}
