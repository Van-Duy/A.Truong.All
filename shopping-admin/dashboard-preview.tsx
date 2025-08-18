"use client"

import { BarChart3, TrendingUp, Users, ShoppingBag, DollarSign, Package } from "lucide-react"

export default function AdminDashboardPreview() {
  const stats = [
    {
      title: "Tổng doanh thu",
      value: "₫45,231,000",
      change: "+20.1%",
      changeType: "increase",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Đơn hàng",
      value: "1,234",
      change: "+15.3%",
      changeType: "increase",
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    {
      title: "Khách hàng",
      value: "892",
      change: "+8.2%",
      changeType: "increase",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Sản phẩm",
      value: "156",
      change: "+2.4%",
      changeType: "increase",
      icon: Package,
      color: "bg-orange-500",
    },
  ]

  const recentOrders = [
    { id: "#ORD-001", customer: "Nguyễn Văn A", amount: "₫1,250,000", status: "Hoàn thành", date: "2024-01-15" },
    { id: "#ORD-002", customer: "Trần Thị B", amount: "₫890,000", status: "Đang xử lý", date: "2024-01-15" },
    { id: "#ORD-003", customer: "Lê Văn C", amount: "₫2,100,000", status: "Đang giao", date: "2024-01-14" },
    { id: "#ORD-004", customer: "Phạm Thị D", amount: "₫750,000", status: "Hoàn thành", date: "2024-01-14" },
    { id: "#ORD-005", customer: "Hoàng Văn E", amount: "₫1,680,000", status: "Chờ thanh toán", date: "2024-01-13" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Hoàn thành":
        return "bg-green-100 text-green-800"
      case "Đang xử lý":
        return "bg-yellow-100 text-yellow-800"
      case "Đang giao":
        return "bg-blue-100 text-blue-800"
      case "Chờ thanh toán":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Admin Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 -m-6 mb-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Admin Panel - Shopping Project</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Chào mừng trở lại! Đây là tổng quan về cửa hàng của bạn.</p>
          </div>
          <div className="text-sm text-gray-500">Cập nhật lần cuối: {new Date().toLocaleString("vi-VN")}</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-green-600">{stat.change}</span>
                      <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Doanh thu 7 ngày qua</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[65, 45, 78, 52, 89, 67, 94].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-600 cursor-pointer"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">
                    {["CN", "T2", "T3", "T4", "T5", "T6", "T7"][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Thống kê nhanh</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tỷ lệ chuyển đổi</span>
                <span className="text-sm font-semibold text-gray-900">3.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "32%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Giỏ hàng bỏ dở</span>
                <span className="text-sm font-semibold text-gray-900">68.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "68.5%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Khách hàng quay lại</span>
                <span className="text-sm font-semibold text-gray-900">24.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "24.8%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Xem tất cả</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{order.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation Hint */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
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
              <p className="text-sm text-blue-700">
                <strong>Lưu ý:</strong> Đây là preview của trang admin dashboard. Để chạy project đầy đủ với Redux và
                API, bạn cần tải code về máy và chạy với <code className="bg-blue-100 px-1 rounded">npm run dev</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
