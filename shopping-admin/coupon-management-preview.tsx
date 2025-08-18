"use client"

import { useState } from "react"
import { Ticket, Plus, Search, Edit, Trash2, Copy, Calendar, Users, TrendingUp } from "lucide-react"

export default function CouponManagementPreview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  // Mock data
  const coupons = [
    {
      id: 1,
      code: "WELCOME10",
      name: "Chào mừng khách hàng mới",
      description: "Giảm 10% cho đơn hàng đầu tiên",
      type: "percentage",
      value: 10,
      usageLimit: 100,
      usedCount: 25,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
    },
    {
      id: 2,
      code: "FREESHIP",
      name: "Miễn phí vận chuyển",
      description: "Miễn phí ship cho đơn từ 200k",
      type: "free_shipping",
      value: 0,
      usageLimit: 500,
      usedCount: 150,
      startDate: "2024-01-01",
      endDate: "2024-06-30",
      status: "active",
    },
    {
      id: 3,
      code: "SUMMER50K",
      name: "Giảm 50K mùa hè",
      description: "Giảm 50.000đ cho đơn hàng từ 500k",
      type: "fixed_amount",
      value: 50000,
      usageLimit: 200,
      usedCount: 180,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "active",
    },
    {
      id: 4,
      code: "EXPIRED20",
      name: "Coupon đã hết hạn",
      description: "Giảm 20% - đã hết hạn",
      type: "percentage",
      value: 20,
      usageLimit: 50,
      usedCount: 45,
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      status: "expired",
    },
  ]

  const getStatusBadge = (status: string) => {
    const badges = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      expired: "bg-red-100 text-red-800",
    }
    const labels = {
      active: "Hoạt động",
      inactive: "Tạm dừng",
      expired: "Hết hạn",
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getTypeBadge = (type: string) => {
    const badges = {
      percentage: "bg-blue-100 text-blue-800",
      fixed_amount: "bg-purple-100 text-purple-800",
      free_shipping: "bg-orange-100 text-orange-800",
    }
    const labels = {
      percentage: "Giảm %",
      fixed_amount: "Giảm tiền",
      free_shipping: "Free ship",
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badges[type as keyof typeof badges]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    )
  }

  const formatValue = (type: string, value: number) => {
    if (type === "percentage") return `${value}%`
    if (type === "fixed_amount") return `${value.toLocaleString("vi-VN")}đ`
    return "Free ship"
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Đã copy mã coupon!")
  }

  // Calculate statistics
  const stats = {
    total: coupons.length,
    active: coupons.filter((c) => c.status === "active").length,
    expired: coupons.filter((c) => c.status === "expired").length,
    totalUsed: coupons.reduce((sum, c) => sum + c.usedCount, 0),
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Ticket className="w-8 h-8 mr-3 text-blue-600" />
            Quản lý Coupon
          </h1>
          <p className="text-gray-600 mt-1">Quản lý mã giảm giá và khuyến mãi</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Thêm Coupon
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Ticket className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng Coupon</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Calendar className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đã hết hạn</p>
              <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Lượt sử dụng</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm theo mã, tên coupon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm dừng</option>
              <option value="expired">Hết hạn</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả loại</option>
              <option value="percentage">Giảm %</option>
              <option value="fixed_amount">Giảm tiền</option>
              <option value="free_shipping">Free ship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã Coupon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên & Mô tả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loại & Giá trị
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sử dụng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                        {coupon.code}
                      </div>
                      <button
                        onClick={() => copyToClipboard(coupon.code)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        title="Copy mã coupon"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{coupon.name}</div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">{coupon.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      {getTypeBadge(coupon.type)}
                      <div className="text-sm font-medium text-gray-900">{formatValue(coupon.type, coupon.value)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {coupon.usedCount}/{coupon.usageLimit}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{new Date(coupon.startDate).toLocaleDateString("vi-VN")}</div>
                    <div>{new Date(coupon.endDate).toLocaleDateString("vi-VN")}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(coupon.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="Chỉnh sửa">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Xóa">
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
    </div>
  )
}
