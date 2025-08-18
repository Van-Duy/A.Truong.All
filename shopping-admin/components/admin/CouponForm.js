"use client"

import { useState, useEffect } from "react"
import { useCreateCouponMutation, useUpdateCouponMutation } from "@/store/slices/couponApi"
import { useGetCategoriesQuery } from "@/store/slices/categoryApi"
import { useGetProductsQuery } from "@/store/slices/productApi"

export default function CouponForm({ coupon, onClose, onSuccess }) {
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation()
  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation()
  const { data: categories = [] } = useGetCategoriesQuery()
  const { data: products = [] } = useGetProductsQuery()

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    type: "percentage",
    value: 0,
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    usageLimit: 100,
    userLimit: 1,
    startDate: "",
    endDate: "",
    status: "active",
    applicableProducts: [],
    applicableCategories: [],
    excludeProducts: [],
    isFirstOrderOnly: false,
    allowCombine: false,
  })

  const [activeTab, setActiveTab] = useState("basic")

  useEffect(() => {
    if (coupon) {
      setFormData({
        ...coupon,
        startDate: coupon.startDate ? coupon.startDate.split("T")[0] : "",
        endDate: coupon.endDate ? coupon.endDate.split("T")[0] : "",
      })
    }
  }, [coupon])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const submitData = {
        ...formData,
        value: Number.parseFloat(formData.value),
        minOrderAmount: Number.parseFloat(formData.minOrderAmount),
        maxDiscountAmount: Number.parseFloat(formData.maxDiscountAmount),
        usageLimit: Number.parseInt(formData.usageLimit),
        userLimit: Number.parseInt(formData.userLimit),
      }

      if (coupon) {
        await updateCoupon({ id: coupon.id, ...submitData }).unwrap()
      } else {
        await createCoupon(submitData).unwrap()
      }

      onSuccess?.()
      onClose()
    } catch (error) {
      console.error("Error saving coupon:", error)
      alert(error.data?.error || "Có lỗi xảy ra khi lưu coupon")
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleArrayChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData((prev) => ({ ...prev, code: result }))
  }

  const tabs = [
    { id: "basic", label: "Thông tin cơ bản" },
    { id: "conditions", label: "Điều kiện áp dụng" },
    { id: "products", label: "Sản phẩm áp dụng" },
    { id: "settings", label: "Cài đặt nâng cao" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{coupon ? "Chỉnh sửa Coupon" : "Thêm Coupon mới"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã Coupon *</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="VD: WELCOME10"
                      required
                    />
                    <button
                      type="button"
                      onClick={generateCouponCode}
                      className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
                      title="Tạo mã tự động"
                    >
                      🎲
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên Coupon *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="VD: Chào mừng khách hàng mới"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mô tả chi tiết về coupon..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại giảm giá *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="percentage">Giảm theo %</option>
                    <option value="fixed_amount">Giảm số tiền cố định</option>
                    <option value="free_shipping">Miễn phí vận chuyển</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá trị {formData.type === "percentage" ? "(%)" : "(VNĐ)"}
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    min="0"
                    step={formData.type === "percentage" ? "0.1" : "1000"}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={formData.type === "free_shipping"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu *</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc *</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Conditions Tab */}
          {activeTab === "conditions" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Đơn hàng tối thiểu (VNĐ)</label>
                  <input
                    type="number"
                    name="minOrderAmount"
                    value={formData.minOrderAmount}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giảm tối đa (VNĐ)</label>
                  <input
                    type="number"
                    name="maxDiscountAmount"
                    value={formData.maxDiscountAmount}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0 = không giới hạn"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tổng số lượt sử dụng</label>
                  <input
                    type="number"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    min="1"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số lần/khách hàng</label>
                  <input
                    type="number"
                    name="userLimit"
                    value={formData.userLimit}
                    onChange={handleChange}
                    min="1"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFirstOrderOnly"
                    checked={formData.isFirstOrderOnly}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Chỉ áp dụng cho đơn hàng đầu tiên</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="allowCombine"
                    checked={formData.allowCombine}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Có thể kết hợp với coupon khác</label>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục áp dụng</label>
                <div className="border border-gray-300 rounded-md p-3 max-h-40 overflow-y-auto">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${category.id}`}
                          checked={formData.applicableCategories.includes(category.id)}
                          onChange={(e) => {
                            const newCategories = e.target.checked
                              ? [...formData.applicableCategories, category.id]
                              : formData.applicableCategories.filter((id) => id !== category.id)
                            handleArrayChange("applicableCategories", newCategories)
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  {categories.length === 0 && <p className="text-gray-500 text-sm">Không có danh mục nào</p>}
                </div>
                <p className="text-xs text-gray-500 mt-1">Để trống = áp dụng cho tất cả danh mục</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sản phẩm loại trừ</label>
                <div className="border border-gray-300 rounded-md p-3 max-h-40 overflow-y-auto">
                  <div className="space-y-2">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`exclude-product-${product.id}`}
                          checked={formData.excludeProducts.includes(product.id)}
                          onChange={(e) => {
                            const newProducts = e.target.checked
                              ? [...formData.excludeProducts, product.id]
                              : formData.excludeProducts.filter((id) => id !== product.id)
                            handleArrayChange("excludeProducts", newProducts)
                          }}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`exclude-product-${product.id}`} className="ml-2 text-sm text-gray-700">
                          {product.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  {products.length === 0 && <p className="text-gray-500 text-sm">Không có sản phẩm nào</p>}
                </div>
                <p className="text-xs text-gray-500 mt-1">Những sản phẩm này sẽ không được áp dụng coupon</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">Cài đặt nâng cao</h3>
                <p className="text-sm text-yellow-700">
                  Các tùy chọn này sẽ được phát triển trong phiên bản tiếp theo:
                </p>
                <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                  <li>Tự động gửi email thông báo coupon</li>
                  <li>Áp dụng coupon theo địa lý</li>
                  <li>Coupon động theo hành vi khách hàng</li>
                  <li>Tích hợp với chương trình loyalty</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                  <h4 className="font-medium text-gray-700 mb-2">Thống kê sử dụng</h4>
                  {coupon && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Đã sử dụng:</span>
                        <span className="font-medium">
                          {coupon.usedCount}/{coupon.usageLimit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tỷ lệ sử dụng:</span>
                        <span className="font-medium">
                          {((coupon.usedCount / coupon.usageLimit) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                  <h4 className="font-medium text-gray-700 mb-2">Trạng thái coupon</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ngày tạo:</span>
                      <span>{coupon ? new Date(coupon.createdAt).toLocaleDateString("vi-VN") : "Mới"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cập nhật:</span>
                      <span>{coupon ? new Date(coupon.updatedAt).toLocaleDateString("vi-VN") : "Mới"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isCreating || isUpdating ? "Đang lưu..." : coupon ? "Cập nhật" : "Tạo mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
