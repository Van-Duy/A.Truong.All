"use client"

import { useState } from "react"
import { useGetCouponsQuery, useDeleteCouponMutation } from "@/store/slices/couponApi"
import CouponForm from "@/components/admin/CouponForm"
import { Ticket, Plus, Search, Edit, Trash2, Copy, Calendar, Users, TrendingUp } from "lucide-react"

export default function CouponsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState(null)
  const [selectedCoupons, setSelectedCoupons] = useState([])

  const {
    data: coupons = [],
    isLoading,
    refetch,
  } = useGetCouponsQuery({
    search: searchTerm,
    status: statusFilter,
    type: typeFilter,
  })

  const [deleteCoupon] = useDeleteCouponMutation()

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa coupon này?")) {
      try {
        await deleteCoupon(id).unwrap()
      } catch (error) {
        alert("Có lỗi xảy ra khi xóa coupon")
      }
    }
  }

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingCoupon(null)
  }

  const handleFormSuccess = () => {
    refetch()
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCoupons(coupons.map((coupon) => coupon.id))
    } else {
      setSelectedCoupons([])
    }
  }

  const handleSelectCoupon = (couponId, checked) => {
    if (checked) {
      setSelectedCoupons([...selectedCoupons, couponId])
    } else {
      setSelectedCoupons(selectedCoupons.filter((id) => id !== couponId))
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert("Đã copy mã coupon!")
  }

  const getStatusBadge = (status) => {
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
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${badges[status]}`}>{labels[status]}</span>
  }

  const getTypeBadge = (type) => {
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
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${badges[type]}`}>{labels[type]}</span>
  }

  const formatValue = (type, value) => {
    if (type === "percentage") return `${value}%`
    if (type === "fixed_amount") return `${value.toLocaleString("vi-VN")}đ`
    return "Free ship"
  }

  // Calculate statistics
  const stats = {
    total: coupons.length,
    active: coupons.filter((c) => c.status === "active").length,
    expired: coupons.filter((c) => c.status === "expired").length,
    totalUsed: coupons.reduce((sum, c) => sum + c.usedCount, 0),
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Ticket className="w-8 h-8 mr-3 text-blue-600" />
            Quản lý Coupon
          </h1>
          <p className="text-gray-600 mt-1">Quản lý mã giảm giá và khuyến mãi</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
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
                    checked={selectedCoupons.length === coupons.length && coupons.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
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
                      checked={selectedCoupons.includes(coupon.id)}
                      onChange={(e) => handleSelectCoupon(coupon.id, e.target.checked)}
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
                      <button
                        onClick={() => handleEdit(coupon)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(coupon.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {coupons.length === 0 && (
          <div className="text-center py-12">
            <Ticket className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Không có coupon nào</h3>
            <p className="mt-1 text-sm text-gray-500">Bắt đầu bằng cách tạo coupon đầu tiên của bạn.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Thêm Coupon
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedCoupons.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 border">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Đã chọn {selectedCoupons.length} coupon</span>
            <button className="text-sm text-blue-600 hover:text-blue-800">Kích hoạt</button>
            <button className="text-sm text-gray-600 hover:text-gray-800">Tạm dừng</button>
            <button className="text-sm text-red-600 hover:text-red-800">Xóa</button>
          </div>
        </div>
      )}

      {/* Coupon Form Modal */}
      {showForm && <CouponForm coupon={editingCoupon} onClose={handleCloseForm} onSuccess={handleFormSuccess} />}
    </div>
  )
}
