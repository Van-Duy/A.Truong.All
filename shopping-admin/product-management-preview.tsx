"use client"

import { useState, useMemo } from "react"
import {
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Package,
  Star,
  Zap,
  Globe,
  Award,
  Heart,
} from "lucide-react"

export default function ProductManagementPreview() {
  const [mockProducts, setMockProducts] = useState([
    {
      id: 1,
      categoryId: 2,
      categoryName: "Thời trang nam",
      name: "Áo sơ mi nam công sở",
      description: "Áo sơ mi nam chất liệu cotton cao cấp, phù hợp cho môi trường công sở",
      avatar: "/placeholder.svg?height=300&width=300&text=Shirt",
      images: [
        "/placeholder.svg?height=400&width=400&text=Shirt1",
        "/placeholder.svg?height=400&width=400&text=Shirt2",
      ],
      price: 299000,
      discountPrice: 249000,
      status: "active",
      slug: "ao-so-mi-nam-cong-so",
      isFlashsale: true,
      isTopsale: false,
      isHangngoai: false,
      isThuonghieuNoibat: true,
      isBancothethich: false,
      quantity: 50,
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      categoryId: 3,
      categoryName: "Thời trang nữ",
      name: "Váy dạ hội nữ",
      description: "Váy dạ hội sang trọng, thiết kế tinh tế cho các buổi tiệc",
      avatar: "/placeholder.svg?height=300&width=300&text=Dress",
      images: ["/placeholder.svg?height=400&width=400&text=Dress1"],
      price: 1299000,
      discountPrice: null,
      status: "active",
      slug: "vay-da-hoi-nu",
      isFlashsale: false,
      isTopsale: true,
      isHangngoai: true,
      isThuonghieuNoibat: false,
      isBancothethich: true,
      quantity: 25,
      createdAt: "2024-01-14T15:45:00Z",
    },
    {
      id: 3,
      categoryId: 5,
      categoryName: "Điện thoại",
      name: "iPhone 15 Pro Max",
      description: "Điện thoại iPhone 15 Pro Max 256GB, màn hình 6.7 inch, chip A17 Pro",
      avatar: "/placeholder.svg?height=300&width=300&text=iPhone",
      images: [
        "/placeholder.svg?height=400&width=400&text=iPhone1",
        "/placeholder.svg?height=400&width=400&text=iPhone2",
      ],
      price: 34990000,
      discountPrice: 32990000,
      status: "active",
      slug: "iphone-15-pro-max",
      isFlashsale: true,
      isTopsale: true,
      isHangngoai: true,
      isThuonghieuNoibat: true,
      isBancothethich: false,
      quantity: 100,
      createdAt: "2024-01-13T09:20:00Z",
    },
    {
      id: 4,
      categoryId: 6,
      categoryName: "Laptop",
      name: "MacBook Pro M3",
      description: "MacBook Pro 14 inch với chip M3, 16GB RAM, 512GB SSD",
      avatar: "/placeholder.svg?height=300&width=300&text=MacBook",
      images: ["/placeholder.svg?height=400&width=400&text=MacBook1"],
      price: 52990000,
      discountPrice: 49990000,
      status: "inactive",
      slug: "macbook-pro-m3",
      isFlashsale: false,
      isTopsale: false,
      isHangngoai: true,
      isThuonghieuNoibat: true,
      isBancothethich: true,
      quantity: 0,
      createdAt: "2024-01-12T14:15:00Z",
    },
  ])

  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [featureFilter, setFeatureFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("desc")

  const categories = [
    { id: 2, name: "Thời trang nam" },
    { id: 3, name: "Thời trang nữ" },
    { id: 5, name: "Điện thoại" },
    { id: 6, name: "Laptop" },
  ]

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...mockProducts]

    if (statusFilter !== "all") {
      filtered = filtered.filter((product) => product.status === statusFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((product) => product.categoryId === Number.parseInt(categoryFilter))
    }

    if (featureFilter !== "all") {
      filtered = filtered.filter((product) => product[featureFilter] === true)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === "createdAt") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      if (sortField === "price" || sortField === "discountPrice" || sortField === "quantity") {
        aValue = aValue || 0
        bValue = bValue || 0
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [mockProducts, statusFilter, categoryFilter, featureFilter, searchTerm, sortField, sortDirection])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />
    return sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  const getFeatureIcons = (product) => {
    const features = []
    if (product.isFlashsale) features.push({ icon: Zap, color: "text-yellow-500", title: "Flash Sale" })
    if (product.isTopsale) features.push({ icon: Star, color: "text-red-500", title: "Top Sale" })
    if (product.isHangngoai) features.push({ icon: Globe, color: "text-blue-500", title: "Hàng ngoại" })
    if (product.isThuonghieuNoibat)
      features.push({ icon: Award, color: "text-purple-500", title: "Thương hiệu nổi bật" })
    if (product.isBancothethich) features.push({ icon: Heart, color: "text-pink-500", title: "Bạn có thể thích" })
    return features
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm Sản phẩm
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Feature Filter */}
            <div>
              <select
                value={featureFilter}
                onChange={(e) => setFeatureFilter(e.target.value)}
                className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả tính năng</option>
                <option value="isFlashsale">Flash Sale</option>
                <option value="isTopsale">Top Sale</option>
                <option value="isHangngoai">Hàng ngoại</option>
                <option value="isThuonghieuNoibat">Thương hiệu nổi bật</option>
                <option value="isBancothethich">Bạn có thể thích</option>
              </select>
            </div>

            {/* Items per page */}
            <div>
              <select className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
                <option value={50}>50 / trang</option>
              </select>
            </div>

            {/* Results info */}
            <div className="flex items-center text-sm text-gray-600">
              Hiển thị 1-{filteredAndSortedProducts.length} của {filteredAndSortedProducts.length} kết quả
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("price")}
                  >
                    <div className="flex items-center gap-1">
                      Giá
                      {getSortIcon("price")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("quantity")}
                  >
                    <div className="flex items-center gap-1">
                      Kho
                      {getSortIcon("quantity")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tính năng
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-1">
                      Trạng thái
                      {getSortIcon("status")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    {/* Product Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.avatar || "/placeholder.svg"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{product.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{product.slug}</div>
                          {product.description && (
                            <div className="text-xs text-gray-400 truncate max-w-xs mt-1">{product.description}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{product.categoryName}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        {product.discountPrice ? (
                          <>
                            <div className="font-medium text-red-600">{formatPrice(product.discountPrice)}</div>
                            <div className="text-xs text-gray-500 line-through">{formatPrice(product.price)}</div>
                          </>
                        ) : (
                          <div className="font-medium text-gray-900">{formatPrice(product.price)}</div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span
                          className={`text-sm font-medium ${
                            product.quantity === 0
                              ? "text-red-600"
                              : product.quantity < 10
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {product.quantity}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {getFeatureIcons(product).map((feature, index) => {
                          const Icon = feature.icon
                          return <Icon key={index} className={`w-4 h-4 ${feature.color}`} title={feature.title} />
                        })}
                        {getFeatureIcons(product).length === 0 && (
                          <span className="text-xs text-gray-400">Không có</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50" title="Sửa">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" title="Xóa">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Tính năng Quản lý Sản phẩm</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Multi-image Upload:</strong> Avatar + nhiều hình ảnh sản phẩm
                  </li>
                  <li>
                    <strong>Pricing System:</strong> Giá gốc + giá khuyến mãi
                  </li>
                  <li>
                    <strong>Inventory Management:</strong> Quản lý số lượng tồn kho
                  </li>
                  <li>
                    <strong>Feature Flags:</strong> Flash Sale, Top Sale, Hàng ngoại, v.v.
                  </li>
                  <li>
                    <strong>Category Integration:</strong> Liên kết với hệ thống danh mục
                  </li>
                  <li>
                    <strong>Advanced Filtering:</strong> Lọc theo danh mục, tính năng, trạng thái
                  </li>
                  <li>
                    <strong>Auto Slug Generation:</strong> Tự động tạo slug từ tên sản phẩm
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
