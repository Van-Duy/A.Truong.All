"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ChevronRight, ChevronDown, Filter, Grid, List, Star } from "lucide-react"
import ProductCard from "@/components/user/ProductCard"

// Mock data cho danh mục
const categoryData = {
  books: {
    name: "Nhà Sách Tiki",
    description: "Sách hay, giá tốt, giao hàng nhanh",
    banners: [
      {
        id: 1,
        image: "/placeholder.svg?height=200&width=600&text=Vinamilk+Banner",
        title: "Vinamilk EST 1976",
        link: "/brand/vinamilk",
      },
      {
        id: 2,
        image: "/placeholder.svg?height=200&width=300&text=1980+Books",
        title: "1980 Books - Khuyến mãi đặc biệt",
        link: "/brand/1980books",
      },
    ],
    subcategories: [
      { name: "English Books", icon: "📖", count: 15420 },
      { name: "Sách tiếng Việt", icon: "📚", count: 28350 },
      { name: "Văn phòng phẩm", icon: "✏️", count: 8920 },
      { name: "Quà lưu niệm", icon: "🎁", count: 2150 },
    ],
    filters: {
      brands: [
        "Deli",
        "Thiên Long",
        "MAGIX",
        "K&B Handmade",
        "Bamboo Books",
        "Nhà Sách Vĩnh Thụy",
        "HỆ THỐNG NHÀ SÁCH MINH KHAI",
      ],
      publishers: ["NXB Kim Đồng", "NXB Trẻ", "NXB Văn Học", "NXB Giáo Dục", "NXB Lao Động"],
      priceRanges: [
        { label: "Dưới 50.000đ", min: 0, max: 50000 },
        { label: "50.000đ - 100.000đ", min: 50000, max: 100000 },
        { label: "100.000đ - 200.000đ", min: 100000, max: 200000 },
        { label: "200.000đ - 500.000đ", min: 200000, max: 500000 },
        { label: "Trên 500.000đ", min: 500000, max: null },
      ],
      ratings: [5, 4, 3, 2, 1],
    },
  },
}

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: "Cổ Tích Việt Nam Bằng Thơ (Ấn Bản Kỉ Niệm 60 Năm NXB Kim Đồng)",
    price: 117950,
    originalPrice: 150000,
    image: "/placeholder.svg?height=300&width=300&text=Cổ+Tích+Việt+Nam",
    rating: 4.8,
    reviewCount: 37,
    author: "THÁI BÁ TÂN",
    publisher: "NXB Kim Đồng",
    deliveryDate: "Giao thứ 5, 14/08",
    isOfficial: true,
    badges: ["AD"],
  },
  {
    id: 2,
    name: "Kinh Dịch (Ngũ Tật Tố)",
    price: 193250,
    originalPrice: 250000,
    image: "/placeholder.svg?height=300&width=300&text=Kinh+Dịch",
    rating: 4.9,
    reviewCount: 92,
    author: "NGÔ TẤT TỐ",
    publisher: "NXB Văn Học",
    deliveryDate: "Giao thứ 6, 15/08",
    isOfficial: true,
    badges: ["AD"],
  },
  {
    id: 3,
    name: "Combo 3 tập sách 60 Ngày Khám Phá Toán Tư Duy Cùng App Bài Giảng cho bé sẵn sàng bước vào lớp 1",
    price: 296100,
    originalPrice: 400000,
    image: "/placeholder.svg?height=300&width=300&text=Combo+Toán+Tư+Duy",
    rating: 4.7,
    reviewCount: 1,
    author: "PHAN HỒ ĐIỆP",
    publisher: "NXB Giáo Dục",
    deliveryDate: "Giao thứ 7, 16/08",
    isOfficial: true,
    discount: 26,
    badges: ["FREESHIP XTRA"],
  },
  {
    id: 4,
    name: "Sách Bé Học Âm Vần Tiếng Việt có App Bài Giảng cho bé 3-6 tuổi sẵn sàng bước vào lớp 1",
    price: 44000,
    originalPrice: 129000,
    image: "/placeholder.svg?height=300&width=300&text=Bé+Học+Âm+Vần",
    rating: 4.6,
    reviewCount: 1,
    author: "PHAN HỒ ĐIỆP",
    publisher: "NXB Giáo Dục",
    deliveryDate: "Giao thứ 7, 16/08",
    isOfficial: true,
    discount: 66,
    badges: ["FREESHIP XTRA"],
  },
  {
    id: 5,
    name: "Tư Duy Nhanh Và Chậm",
    price: 180000,
    originalPrice: 220000,
    image: "/placeholder.svg?height=300&width=300&text=Tư+Duy+Nhanh+Chậm",
    rating: 4.8,
    reviewCount: 156,
    author: "DANIEL KAHNEMAN",
    publisher: "NXB Trẻ",
    deliveryDate: "Giao thứ 5, 14/08",
    isOfficial: true,
    badges: ["AD"],
  },
  {
    id: 6,
    name: "Hạn Kang - Người Ăn Chay",
    price: 95000,
    originalPrice: 120000,
    image: "/placeholder.svg?height=300&width=300&text=Người+Ăn+Chay",
    rating: 4.5,
    reviewCount: 89,
    author: "HAN KANG",
    publisher: "NXB Văn Học",
    deliveryDate: "Giao thứ 6, 15/08",
    isOfficial: true,
    badges: ["AD"],
  },
  {
    id: 7,
    name: "12 Nguyên Tắc Cốt Lõi",
    price: 150000,
    originalPrice: 180000,
    image: "/placeholder.svg?height=300&width=300&text=12+Nguyên+Tắc",
    rating: 4.7,
    reviewCount: 234,
    author: "JORDAN PETERSON",
    publisher: "NXB Trẻ",
    deliveryDate: "Giao thứ 7, 16/08",
    isOfficial: true,
    badges: ["AD"],
  },
  {
    id: 8,
    name: "Thuyền",
    price: 85000,
    originalPrice: 110000,
    image: "/placeholder.svg?height=300&width=300&text=Thuyền",
    rating: 4.4,
    reviewCount: 67,
    author: "NGUYỄN ĐỨC TÙNG",
    publisher: "NXB Văn Học",
    deliveryDate: "Giao thứ 5, 14/08",
    isOfficial: true,
    badges: ["TOP DEAL"],
  },
]

const sortOptions = [
  { value: "popular", label: "Phổ biến" },
  { value: "newest", label: "Mới nhất" },
  { value: "price-asc", label: "Giá thấp đến cao" },
  { value: "price-desc", label: "Giá cao đến thấp" },
  { value: "rating", label: "Đánh giá cao nhất" },
  { value: "discount", label: "Giảm giá nhiều nhất" },
]

const quickFilters = [
  { type: "delivery", label: "Giao siêu tốc 2H", color: "bg-red-500", icon: "NOW" },
  { type: "deal", label: "Siêu rẻ", color: "bg-red-500", icon: "TOP DEAL" },
  { type: "freeship", label: "Freeship Xtra", color: "bg-blue-500", icon: "FREESHIP XTRA" },
  { type: "rating", label: "từ 4 sao", color: "bg-yellow-500", icon: "⭐" },
]

export default function CategoryPage() {
  const params = useParams()
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [filters, setFilters] = useState({
    brands: [],
    publishers: [],
    priceRange: null,
    rating: null,
    quickFilters: [],
  })
  const [showFilters, setShowFilters] = useState({
    brands: false,
    publishers: false,
    price: false,
  })

  useEffect(() => {
    // Simulate API call
    const loadCategoryData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const categoryKey = params.slug
      const categoryInfo = categoryData[categoryKey] || categoryData.books

      setCategory(categoryInfo)
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
    }

    loadCategoryData()
  }, [params.slug])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      if (filterType === "quickFilters") {
        if (newFilters.quickFilters.includes(value)) {
          newFilters.quickFilters = newFilters.quickFilters.filter((f) => f !== value)
        } else {
          newFilters.quickFilters.push(value)
        }
      } else if (filterType === "brands" || filterType === "publishers") {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter((f) => f !== value)
        } else {
          newFilters[filterType].push(value)
        }
      } else {
        newFilters[filterType] = newFilters[filterType] === value ? null : value
      }

      return newFilters
    })
  }

  const handleSort = (sortValue) => {
    setSortBy(sortValue)
    const sorted = [...filteredProducts]

    switch (sortValue) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case "discount":
        sorted.sort((a, b) => {
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0
          return discountB - discountA
        })
        break
      default:
        // Keep original order for popular
        break
    }

    setFilteredProducts(sorted)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">{category?.name}</span>
        </nav>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 space-y-4">
            {/* Category exploration */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Khám phá theo danh mục</h3>
              <div className="space-y-3">
                {category?.subcategories?.map((subcat, index) => (
                  <Link
                    key={index}
                    href={`/category/${params.slug}/${subcat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{subcat.icon}</span>
                      <span className="text-sm text-gray-700 group-hover:text-blue-600">{subcat.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">({subcat.count?.toLocaleString()})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <button
                onClick={() => setShowFilters((prev) => ({ ...prev, brands: !prev.brands }))}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-semibold text-gray-800">Thương hiệu</h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters.brands ? "rotate-180" : ""}`} />
              </button>
              {showFilters.brands && (
                <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                  {category?.filters?.brands?.map((brand, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleFilterChange("brands", brand)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Publisher Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <button
                onClick={() => setShowFilters((prev) => ({ ...prev, publishers: !prev.publishers }))}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-semibold text-gray-800">Nhà cung cấp</h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters.publishers ? "rotate-180" : ""}`} />
              </button>
              {showFilters.publishers && (
                <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                  {category?.filters?.publishers?.map((publisher, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.publishers.includes(publisher)}
                        onChange={() => handleFilterChange("publishers", publisher)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{publisher}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <button
                onClick={() => setShowFilters((prev) => ({ ...prev, price: !prev.price }))}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-semibold text-gray-800">Khoảng giá</h3>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters.price ? "rotate-180" : ""}`} />
              </button>
              {showFilters.price && (
                <div className="mt-4 space-y-2">
                  {category?.filters?.priceRanges?.map((range, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range}
                        onChange={() => handleFilterChange("priceRange", range)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Rating Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Đánh giá</h3>
              <div className="space-y-2">
                {category?.filters?.ratings?.map((rating, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange("rating", rating)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-1">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[...Array(5 - rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                      ))}
                      <span className="text-sm text-gray-600">từ {rating} sao</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{category?.name}</h1>
              <p className="text-gray-600">{category?.description}</p>
            </div>

            {/* Banners */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {category?.banners?.map((banner, index) => (
                <Link key={banner.id} href={banner.link} className="block">
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-full h-32 object-cover rounded-lg hover:shadow-md transition-shadow"
                  />
                </Link>
              ))}

              {/* Top Selling Books Widget */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Top Sách Bán Chạy</h3>
                <p className="text-sm text-gray-600 mb-2">Tài trợ bởi 1980 Books Tại Tiki Trading 5/5⭐</p>
                <div className="flex space-x-2">
                  <div className="w-12 h-16 bg-red-500 rounded text-white text-xs flex items-center justify-center">
                    -30%
                  </div>
                  <div className="w-12 h-16 bg-red-500 rounded text-white text-xs flex items-center justify-center">
                    -38%
                  </div>
                  <div className="w-12 h-16 bg-gray-800 rounded text-white text-xs flex items-center justify-center">
                    Book
                  </div>
                </div>
              </div>
            </div>

            {/* Category subcategories */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Khám phá theo danh mục</h3>
              <div className="grid grid-cols-4 gap-4">
                {category?.subcategories?.map((subcat, index) => (
                  <Link
                    key={index}
                    href={`/category/${params.slug}/${subcat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-2">{subcat.icon}</div>
                    <p className="text-sm font-medium text-gray-800">{subcat.name}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white rounded-lg shadow-sm">
              {/* Filter and Sort Bar */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Tất cả sản phẩm</h2>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm">Tất cả</span>
                  </button>
                </div>

                {/* Quick Filters */}
                <div className="flex items-center space-x-3 mb-4">
                  {quickFilters.map((filter, index) => (
                    <button
                      key={index}
                      onClick={() => handleFilterChange("quickFilters", filter.type)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        filters.quickFilters.includes(filter.type)
                          ? `${filter.color} text-white`
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {filter.icon} {filter.label}
                    </button>
                  ))}
                </div>

                {/* Sort and View Options */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <select
                      value={sortBy}
                      onChange={(e) => handleSort(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
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
                </div>
              </div>

              {/* Products Grid */}
              <div className="p-4">
                <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-4" : "grid-cols-1"}`}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                  <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    Xem thêm sản phẩm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
