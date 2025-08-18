// Shared data store cho orders
const orders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerId: 1,
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@email.com",
    customerPhone: "0901234567",
    shippingAddress: {
      fullName: "Nguyễn Văn A",
      phone: "0901234567",
      address: "123 Đường ABC, Phường XYZ",
      ward: "Phường 1",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      zipCode: "70000",
    },
    billingAddress: {
      fullName: "Nguyễn Văn A",
      phone: "0901234567",
      address: "123 Đường ABC, Phường XYZ",
      ward: "Phường 1",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      zipCode: "70000",
    },
    items: [
      {
        id: 1,
        productId: 1,
        productName: "Áo sơ mi nam công sở",
        productImage: "/placeholder.svg?height=100&width=100&text=Shirt",
        price: 299000,
        discountPrice: 249000,
        quantity: 2,
        total: 498000,
      },
      {
        id: 2,
        productId: 3,
        productName: "iPhone 15 Pro Max",
        productImage: "/placeholder.svg?height=100&width=100&text=iPhone",
        price: 34990000,
        discountPrice: 32990000,
        quantity: 1,
        total: 32990000,
      },
    ],
    subtotal: 33488000,
    shippingFee: 50000,
    discount: 0,
    tax: 0,
    total: 33538000,
    paymentMethod: "cod",
    paymentStatus: "pending",
    orderStatus: "processing",
    shippingMethod: "standard",
    trackingNumber: null,
    notes: "Giao hàng giờ hành chính",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerId: 2,
    customerName: "Trần Thị B",
    customerEmail: "tranthib@email.com",
    customerPhone: "0907654321",
    shippingAddress: {
      fullName: "Trần Thị B",
      phone: "0907654321",
      address: "456 Đường DEF, Phường UVW",
      ward: "Phường 2",
      district: "Quận 2",
      city: "TP. Hồ Chí Minh",
      zipCode: "70000",
    },
    billingAddress: {
      fullName: "Trần Thị B",
      phone: "0907654321",
      address: "456 Đường DEF, Phường UVW",
      ward: "Phường 2",
      district: "Quận 2",
      city: "TP. Hồ Chí Minh",
      zipCode: "70000",
    },
    items: [
      {
        id: 3,
        productId: 2,
        productName: "Váy dạ hội nữ",
        productImage: "/placeholder.svg?height=100&width=100&text=Dress",
        price: 1299000,
        discountPrice: null,
        quantity: 1,
        total: 1299000,
      },
    ],
    subtotal: 1299000,
    shippingFee: 30000,
    discount: 100000,
    tax: 0,
    total: 1229000,
    paymentMethod: "bank_transfer",
    paymentStatus: "paid",
    orderStatus: "shipped",
    shippingMethod: "express",
    trackingNumber: "VN123456789",
    notes: null,
    createdAt: "2024-01-14T15:45:00Z",
    updatedAt: "2024-01-16T09:20:00Z",
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customerId: 3,
    customerName: "Lê Văn C",
    customerEmail: "levanc@email.com",
    customerPhone: "0912345678",
    shippingAddress: {
      fullName: "Lê Văn C",
      phone: "0912345678",
      address: "789 Đường GHI, Phường RST",
      ward: "Phường 3",
      district: "Quận 3",
      city: "Hà Nội",
      zipCode: "10000",
    },
    billingAddress: {
      fullName: "Lê Văn C",
      phone: "0912345678",
      address: "789 Đường GHI, Phường RST",
      ward: "Phường 3",
      district: "Quận 3",
      city: "Hà Nội",
      zipCode: "10000",
    },
    items: [
      {
        id: 4,
        productId: 4,
        productName: "MacBook Pro M3",
        productImage: "/placeholder.svg?height=100&width=100&text=MacBook",
        price: 52990000,
        discountPrice: 49990000,
        quantity: 1,
        total: 49990000,
      },
    ],
    subtotal: 49990000,
    shippingFee: 0,
    discount: 2000000,
    tax: 0,
    total: 47990000,
    paymentMethod: "credit_card",
    paymentStatus: "paid",
    orderStatus: "delivered",
    shippingMethod: "express",
    trackingNumber: "VN987654321",
    notes: "Khách hàng VIP",
    createdAt: "2024-01-13T09:20:00Z",
    updatedAt: "2024-01-18T14:30:00Z",
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    customerId: 4,
    customerName: "Phạm Thị D",
    customerEmail: "phamthid@email.com",
    customerPhone: "0923456789",
    shippingAddress: {
      fullName: "Phạm Thị D",
      phone: "0923456789",
      address: "321 Đường JKL, Phường MNO",
      ward: "Phường 4",
      district: "Quận 4",
      city: "Đà Nẵng",
      zipCode: "50000",
    },
    billingAddress: {
      fullName: "Phạm Thị D",
      phone: "0923456789",
      address: "321 Đường JKL, Phường MNO",
      ward: "Phường 4",
      district: "Quận 4",
      city: "Đà Nẵng",
      zipCode: "50000",
    },
    items: [
      {
        id: 5,
        productId: 5,
        productName: "Bàn làm việc gỗ sồi",
        productImage: "/placeholder.svg?height=100&width=100&text=Desk",
        price: 3500000,
        discountPrice: 2999000,
        quantity: 1,
        total: 2999000,
      },
      {
        id: 6,
        productId: 6,
        productName: "Quần jean nam slim fit",
        productImage: "/placeholder.svg?height=100&width=100&text=Jeans",
        price: 599000,
        discountPrice: 399000,
        quantity: 3,
        total: 1197000,
      },
    ],
    subtotal: 4196000,
    shippingFee: 80000,
    discount: 200000,
    tax: 0,
    total: 4076000,
    paymentMethod: "cod",
    paymentStatus: "pending",
    orderStatus: "cancelled",
    shippingMethod: "standard",
    trackingNumber: null,
    notes: "Khách hàng hủy đơn",
    createdAt: "2024-01-12T14:15:00Z",
    updatedAt: "2024-01-13T10:00:00Z",
  },
  {
    id: 5,
    orderNumber: "ORD-2024-005",
    customerId: 5,
    customerName: "Hoàng Văn E",
    customerEmail: "hoangvane@email.com",
    customerPhone: "0934567890",
    shippingAddress: {
      fullName: "Hoàng Văn E",
      phone: "0934567890",
      address: "654 Đường PQR, Phường STU",
      ward: "Phường 5",
      district: "Quận 5",
      city: "TP. Hồ Chí Minh",
      zipCode: "70000",
    },
    billingAddress: {
      fullName: "Hoàng Văn E",
      phone: "0934567890",
      address: "654 Đường PQR, Phường STU",
      ward: "Phường 5",
      district: "Quận 5",
      city: "TP. Hồ Chí Minh",
      zipCode: "70000",
    },
    items: [
      {
        id: 7,
        productId: 1,
        productName: "Áo sơ mi nam công sở",
        productImage: "/placeholder.svg?height=100&width=100&text=Shirt",
        price: 299000,
        discountPrice: 249000,
        quantity: 1,
        total: 249000,
      },
    ],
    subtotal: 249000,
    shippingFee: 25000,
    discount: 0,
    tax: 0,
    total: 274000,
    paymentMethod: "e_wallet",
    paymentStatus: "paid",
    orderStatus: "pending",
    shippingMethod: "standard",
    trackingNumber: null,
    notes: null,
    createdAt: "2024-01-11T11:30:00Z",
    updatedAt: "2024-01-11T11:30:00Z",
  },
]

let nextId = 6
let orderCounter = 6

export function getOrders() {
  return orders
}

export function getOrderById(id) {
  return orders.find((o) => o.id === id)
}

export function getOrderByNumber(orderNumber) {
  return orders.find((o) => o.orderNumber === orderNumber)
}

export function createOrder(orderData) {
  const newOrder = {
    id: nextId++,
    orderNumber: `ORD-2024-${String(orderCounter++).padStart(3, "0")}`,
    ...orderData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  orders.push(newOrder)
  return newOrder
}

export function updateOrder(id, updateData) {
  const orderIndex = orders.findIndex((o) => o.id === id)
  if (orderIndex === -1) {
    return null
  }

  orders[orderIndex] = {
    ...orders[orderIndex],
    ...updateData,
    updatedAt: new Date().toISOString(),
  }

  return orders[orderIndex]
}

export function deleteOrder(id) {
  const orderIndex = orders.findIndex((o) => o.id === id)
  if (orderIndex === -1) {
    return false
  }

  orders.splice(orderIndex, 1)
  return true
}

// Helper functions
export function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price)
}

export function getOrderStatusText(status) {
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

export function getPaymentStatusText(status) {
  const statusMap = {
    pending: "Chờ thanh toán",
    paid: "Đã thanh toán",
    failed: "Thanh toán thất bại",
    refunded: "Đã hoàn tiền",
  }
  return statusMap[status] || status
}

export function getPaymentMethodText(method) {
  const methodMap = {
    cod: "Thanh toán khi nhận hàng",
    bank_transfer: "Chuyển khoản ngân hàng",
    credit_card: "Thẻ tín dụng",
    e_wallet: "Ví điện tử",
  }
  return methodMap[method] || method
}

export function getShippingMethodText(method) {
  const methodMap = {
    standard: "Giao hàng tiêu chuẩn",
    express: "Giao hàng nhanh",
    same_day: "Giao hàng trong ngày",
  }
  return methodMap[method] || method
}
