"use client"

import { useState, useMemo } from "react"
import {
  Trash2,
  Eye,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Package,
  User,
  Calendar,
  DollarSign,
  Truck,
} from "lucide-react"

export default function OrderManagementPreview() {
  const [mockOrders, setMockOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-2024-001",
      customerName: "Nguyễn Văn A",
      customerPhone: "0901234567",
      items: [
        { productName: "Áo sơ mi nam công sở", quantity: 2 },
        { productName: "iPhone 15 Pro Max", quantity: 1 },
      ],
      total: 33538000,
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "processing",
      trackingNumber: null,
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      orderNumber: "ORD-2024-002",
      customerName: "Trần Thị B",
      customerPhone: "0907654321",
      items: [{ productName: "Váy dạ hội nữ", quantity: 1 }],
      total: 1229000,
      paymentMethod: "bank_transfer",
      paymentStatus: "paid",
      orderStatus: "shipped",
      trackingNumber: "VN123456789",
      createdAt: "2024-01-14T15:45:00Z",
    },
    {
      id: 3,
      orderNumber: "ORD-2024-003",
      customerName: "Lê Văn C",
      customerPhone: "0912345678",
      items: [{ productName: "MacBook Pro M3", quantity: 1 }],
      total: 47990000,
      paymentMethod: "credit_card",
      paymentStatus: "paid",
      orderStatus: "delivered",
      trackingNumber: "VN987654321",
      createdAt: "2024-01-13T09:20:00Z",
    },
    {
      id: 4,
      orderNumber: "ORD-2024-004",
      customerName: "Phạm Thị D",
      customerPhone: "0923456789",
      items: [
        { productName: "Bàn làm việc gỗ sồi", quantity: 1 },
        { productName: "Quần jean nam slim fit", quantity: 3 },
      ],
      total: 4076000,
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "cancelled",
      trackingNumber: null,
      createdAt: "2024-01-12T14:15:00Z",
    },
    {
      id: 5,
      orderNumber: "ORD-2024-005",
      customerName: "Hoàng Văn E",
      customerPhone: "0934567890",
      items: [{ productName: "Áo sơ mi nam công sở", quantity: 1 }],
      total: 274000,
      paymentMethod: "e_wallet",
      paymentStatus: "paid",
      orderStatus: "pending",
      trackingNumber: null,
      createdAt: "2024-01-11T11:30:00Z",
    },
  ])

  const [orderStatusFilter, setOrderStatusFilter] = useState("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all")
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("createdAt")
  const [sortDirection, setSortDirection] = useState("desc")

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getOrderStatusText = (status) => {
    const statusMap = {
      pending: "Chờ xử lý",
      processing: "Đang xử lý",
      shipped: "Đã giao vận",
      delivered: "Đã giao hàng",
      cancelled: "Đã hủy",
      returned: "Đã trả hàng",
    }
    return statusMap[status] || status
  }

  const getPaymentStatusText = (status) => {
    const statusMap = {
      pending: "Chờ thanh toán",
      paid: "Đã thanh toán",
      failed: "Thanh toán thất bại",
      refunded: "Đã hoàn tiền",
    }
    return statusMap[status] || status
  }

  const getPaymentMethodText = (method) => {
    const methodMap = {
      cod: "COD",
      bank_transfer: "Chuyển khoản",
      credit_card: "Thẻ tín dụng",
      e_wallet: "Ví điện tử",
    }
    return methodMap[method] || method
  }

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...mockOrders]

    if (orderStatusFilter !== "all") {
      filtered = filtered.filter((order) => order.orderStatus === orderStatusFilter)
    }

    if (paymentStatusFilter !== "all") {
      filtered = filtered.filter((order) => order.paymentStatus === paymentStatusFilter)
    }

    if (paymentMethodFilter !== "all") {
      filtered = filtered.filter((order) => order.paymentMethod === paymentMethodFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerPhone.includes(searchTerm),
      )
    }

    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === "createdAt") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      if (sortField === "total") {
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
  }, [mockOrders, orderStatusFilter, paymentStatusFilter, paymentMethodFilter, searchTerm, sortField, sortDirection])

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

  const getOrderStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      returned: "bg-gray-100 text-gray-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      refunded: "bg-gray-100 text-gray-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const totalRevenue = mockOrders.reduce((sum, order) => sum + (order.paymentStatus === "paid" ? order.total : 0), 0)
    const totalOrders = mockOrders.length
    const pendingOrders = mockOrders.filter((order) => order.orderStatus === "pending").length
    const completedOrders = mockOrders.filter((order) => order.orderStatus === "delivered").length

    return {
      totalRevenue,
      totalOrders,
      pendingOrders,
      completedOrders,
    }
  }, [mockOrders])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-green-600">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đã hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Order Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="processing">Đang xử lý</option>
                <option value="shipped">Đã giao vận</option>
                <option value="delivered">Đã giao hàng</option>
                <option value="cancelled">Đã hủy</option>
                <option value="returned">Đã trả hàng</option>
              </select>
            </div>

            {/* Payment Status Filter */}
            <div>
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả thanh toán</option>
                <option value="pending">Chờ thanh toán</option>
                <option value="paid">Đã thanh toán</option>
                <option value="failed">Thanh toán thất bại</option>
                <option value="refunded">Đã hoàn tiền</option>
              </select>
            </div>

            {/* Payment Method Filter */}
            <div>
              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả phương thức</option>
                <option value="cod">COD</option>
                <option value="bank_transfer">Chuyển khoản</option>
                <option value="credit_card">Thẻ tín dụng</option>
                <option value="e_wallet">Ví điện tử</option>
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
              Hiển thị 1-{filteredAndSortedOrders.length} của {filteredAndSortedOrders.length} kết quả
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("orderNumber")}
                  >
                    <div className="flex items-center gap-1">
                      Mã đơn hàng
                      {getSortIcon("orderNumber")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("total")}
                  >
                    <div className="flex items-center gap-1">
                      Tổng tiền
                      {getSortIcon("total")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thanh toán
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center gap-1">
                      Ngày đặt
                      {getSortIcon("createdAt")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{order.orderNumber}</div>
                      {order.trackingNumber && (
                        <div className="text-xs text-gray-500">Vận đơn: {order.trackingNumber}</div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                          <div className="text-xs text-gray-500">{order.customerPhone}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-900">{order.items.length} sản phẩm</div>
                          <div className="text-xs text-gray-500">
                            {order.items.reduce((sum, item) => sum + item.quantity, 0)} món
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{formatPrice(order.total)}</div>
                      <div className="text-xs text-gray-500">{getPaymentMethodText(order.paymentMethod)}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}
                      >
                        {getPaymentStatusText(order.paymentStatus)}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOrderStatusColor(order.orderStatus)}`}
                      >
                        {getOrderStatusText(order.orderStatus)}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
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
              <h3 className="text-sm font-medium text-blue-800">Tính năng Quản lý Đơn hàng</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Order Tracking:</strong> Theo dõi trạng thái đơn hàng từ đặt hàng đến giao hàng
                  </li>
                  <li>
                    <strong>Payment Management:</strong> Quản lý trạng thái thanh toán và phương thức
                  </li>
                  <li>
                    <strong>Customer Information:</strong> Thông tin khách hàng và địa chỉ giao hàng
                  </li>
                  <li>
                    <strong>Order Details:</strong> Chi tiết sản phẩm, số lượng, giá cả
                  </li>
                  <li>
                    <strong>Revenue Analytics:</strong> Thống kê doanh thu và đơn hàng
                  </li>
                  <li>
                    <strong>Advanced Filtering:</strong> Lọc theo trạng thái, thanh toán, phương thức
                  </li>
                  <li>
                    <strong>Order Updates:</strong> Cập nhật trạng thái và mã vận đơn
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
