"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react"

export default function OrderDetailPage() {
  const params = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [params.id])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${params.id}`)
      const data = await response.json()
      setOrder(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching order:", error)
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getOrderStatusText = (status) => {
    const statusMap = {
      pending: "Chờ xử lý",
      processing: "Đang xử lý",
      shipped: "Đã giao vận",
      delivered: "Đã giao hàng",
      cancelled: "Đã hủy",
    }
    return statusMap[status] || status
  }

  const getOrderStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-600 bg-yellow-100",
      processing: "text-blue-600 bg-blue-100",
      shipped: "text-purple-600 bg-purple-100",
      delivered: "text-green-600 bg-green-100",
      cancelled: "text-red-600 bg-red-100",
    }
    return colors[status] || "text-gray-600 bg-gray-100"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy đơn hàng</h2>
          <Link href="/account" className="text-blue-600 hover:text-blue-800">
            Quay lại tài khoản
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/account" className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng #{order.orderNumber}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Trạng thái đơn hàng</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.orderStatus)}`}
                >
                  {getOrderStatusText(order.orderStatus)}
                </span>
              </div>

              {/* Order Timeline */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Đơn hàng đã được đặt</h3>
                    <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString("vi-VN")}</p>
                  </div>
                </div>

                {order.orderStatus !== "pending" && (
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Đơn hàng đang được xử lý</h3>
                      <p className="text-sm text-gray-600">Đang chuẩn bị hàng</p>
                    </div>
                  </div>
                )}

                {(order.orderStatus === "shipped" || order.orderStatus === "delivered") && (
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Đơn hàng đã được giao cho đơn vị vận chuyển</h3>
                      <p className="text-sm text-gray-600">
                        Mã vận đơn: <span className="font-medium">{order.trackingNumber}</span>
                      </p>
                    </div>
                  </div>
                )}

                {order.orderStatus === "delivered" && (
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Đơn hàng đã được giao thành công</h3>
                      <p className="text-sm text-gray-600">{new Date(order.updatedAt).toLocaleString("vi-VN")}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Sản phẩm đã đặt</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.productImage || "/placeholder.svg"}
                      alt={item.productName}
                      className="w-16 h-16 object-contain rounded border"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.productName}</h3>
                      <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                      {item.discountPrice && (
                        <div className="flex items-center space-x-2">
                          <span className="text-red-600 font-medium">{formatPrice(item.discountPrice)}</span>
                          <span className="text-gray-500 line-through text-sm">{formatPrice(item.price)}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-red-600">{formatPrice(item.total)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="font-medium">{order.shippingAddress.fullName}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-500 mr-2" />
                  <span>{order.shippingAddress.phone}</span>
                </div>
                <div className="ml-6 text-gray-600">
                  {order.shippingAddress.address}, {order.shippingAddress.ward}, {order.shippingAddress.district},{" "}
                  {order.shippingAddress.city}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Mã đơn hàng:</span>
                  <span className="font-medium">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ngày đặt:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString("vi-VN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phương thức thanh toán:</span>
                  <span>{order.paymentMethod === "cod" ? "COD" : "Chuyển khoản"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trạng thái thanh toán:</span>
                  <span className={order.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}>
                    {order.paymentStatus === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                  </span>
                </div>
              </div>

              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span>{order.shippingFee === 0 ? "Miễn phí" : formatPrice(order.shippingFee)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá:</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600">{formatPrice(order.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                {order.orderStatus === "delivered" && (
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Đánh giá sản phẩm
                  </button>
                )}
                {order.orderStatus === "pending" && (
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                    Hủy đơn hàng
                  </button>
                )}
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
                  Liên hệ hỗ trợ
                </button>
              </div>

              {/* Customer Service */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Cần hỗ trợ?</h4>
                <div className="space-y-1 text-sm text-blue-700">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>Hotline: 1900-6035</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>support@tiki.vn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
