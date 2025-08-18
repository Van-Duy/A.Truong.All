"use client"

import { useState, useEffect } from "react"
import { useUpdateOrderMutation } from "../../store/slices/orderApi"
import { formatPrice, getPaymentMethodText, getShippingMethodText } from "../../lib/orders-data"
import { X, Package, User, MapPin, CreditCard, Truck } from "lucide-react"

export default function OrderForm({ order, onClose }) {
  const [formData, setFormData] = useState({
    orderStatus: "",
    paymentStatus: "",
    trackingNumber: "",
    notes: "",
  })

  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation()

  useEffect(() => {
    if (order) {
      setFormData({
        orderStatus: order.orderStatus || "",
        paymentStatus: order.paymentStatus || "",
        trackingNumber: order.trackingNumber || "",
        notes: order.notes || "",
      })
    }
  }, [order])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await updateOrder({ id: order.id, ...formData }).unwrap()
      onClose()
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error)
      alert("Có lỗi xảy ra khi cập nhật đơn hàng!")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!order) return null

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-white z-10 pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng</h2>
          <p className="text-gray-600">{order.orderNumber}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Info */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Thông tin khách hàng</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Tên:</span> {order.customerName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {order.customerEmail}
              </p>
              <p>
                <span className="font-medium">Điện thoại:</span> {order.customerPhone}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Địa chỉ giao hàng</h3>
            </div>
            <div className="text-sm">
              <p className="font-medium">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.ward}, {order.shippingAddress.district}
              </p>
              <p>{order.shippingAddress.city}</p>
            </div>
          </div>

          {/* Payment & Shipping Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Thanh toán & Vận chuyển</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Phương thức thanh toán:</span> {getPaymentMethodText(order.paymentMethod)}
              </p>
              <p>
                <span className="font-medium">Phương thức vận chuyển:</span>{" "}
                {getShippingMethodText(order.shippingMethod)}
              </p>
              <p>
                <span className="font-medium">Ngày đặt:</span> {new Date(order.createdAt).toLocaleString("vi-VN")}
              </p>
              {order.trackingNumber && (
                <p>
                  <span className="font-medium">Mã vận đơn:</span> {order.trackingNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Order Items & Update Form */}
        <div className="space-y-6">
          {/* Order Items */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Sản phẩm đã đặt</h3>
            </div>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-lg">
                  <img
                    src={item.productImage || "/placeholder.svg"}
                    alt={item.productName}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.productName}</p>
                    <p className="text-xs text-gray-500">
                      {item.discountPrice ? (
                        <>
                          <span className="text-red-600 font-medium">{formatPrice(item.discountPrice)}</span>
                          <span className="line-through ml-2">{formatPrice(item.price)}</span>
                        </>
                      ) : (
                        <span className="font-medium">{formatPrice(item.price)}</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">x{item.quantity}</p>
                    <p className="text-sm text-gray-600">{formatPrice(item.total)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tạm tính:</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển:</span>
                <span>{formatPrice(order.shippingFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>Giảm giá:</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Cập nhật đơn hàng
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái đơn hàng</label>
                <select
                  name="orderStatus"
                  value={formData.orderStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Chờ xử lý</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="shipped">Đã giao vận</option>
                  <option value="delivered">Đã giao hàng</option>
                  <option value="cancelled">Đã hủy</option>
                  <option value="returned">Đã trả hàng</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái thanh toán</label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Chờ thanh toán</option>
                  <option value="paid">Đã thanh toán</option>
                  <option value="failed">Thanh toán thất bại</option>
                  <option value="refunded">Đã hoàn tiền</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mã vận đơn</label>
              <input
                type="text"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleChange}
                placeholder="Nhập mã vận đơn"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Ghi chú về đơn hàng"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isUpdating ? "Đang cập nhật..." : "Cập nhật"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
