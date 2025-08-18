// Shared data store for coupons
const coupons = [
  {
    id: 1,
    code: "WELCOME10",
    name: "Chào mừng khách hàng mới",
    description: "Giảm 10% cho đơn hàng đầu tiên",
    type: "percentage", // percentage, fixed_amount, free_shipping
    value: 10,
    minOrderAmount: 100000,
    maxDiscountAmount: 50000,
    usageLimit: 100,
    usedCount: 25,
    userLimit: 1, // Số lần 1 user có thể sử dụng
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active", // active, inactive, expired
    applicableProducts: [], // Rỗng = áp dụng tất cả
    applicableCategories: [],
    excludeProducts: [],
    isFirstOrderOnly: true,
    allowCombine: false, // Có thể kết hợp với coupon khác
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    code: "FREESHIP",
    name: "Miễn phí vận chuyển",
    description: "Miễn phí ship cho đơn từ 200k",
    type: "free_shipping",
    value: 0,
    minOrderAmount: 200000,
    maxDiscountAmount: 30000,
    usageLimit: 500,
    usedCount: 150,
    userLimit: 5,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    status: "active",
    applicableProducts: [],
    applicableCategories: [],
    excludeProducts: [],
    isFirstOrderOnly: false,
    allowCombine: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    code: "SUMMER50K",
    name: "Giảm 50K mùa hè",
    description: "Giảm 50.000đ cho đơn hàng từ 500k",
    type: "fixed_amount",
    value: 50000,
    minOrderAmount: 500000,
    maxDiscountAmount: 50000,
    usageLimit: 200,
    usedCount: 180,
    userLimit: 2,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: "active",
    applicableProducts: [],
    applicableCategories: [1, 2], // Chỉ áp dụng cho category 1, 2
    excludeProducts: [],
    isFirstOrderOnly: false,
    allowCombine: false,
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-01T00:00:00Z",
  },
  {
    id: 4,
    code: "EXPIRED20",
    name: "Coupon đã hết hạn",
    description: "Giảm 20% - đã hết hạn",
    type: "percentage",
    value: 20,
    minOrderAmount: 0,
    maxDiscountAmount: 100000,
    usageLimit: 50,
    usedCount: 45,
    userLimit: 1,
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    status: "expired",
    applicableProducts: [],
    applicableCategories: [],
    excludeProducts: [],
    isFirstOrderOnly: false,
    allowCombine: false,
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2023-12-01T00:00:00Z",
  },
]

let nextId = 5

export function getCoupons() {
  return coupons
}

export function getCouponById(id) {
  return coupons.find((coupon) => coupon.id === Number.parseInt(id))
}

export function createCoupon(couponData) {
  const newCoupon = {
    id: nextId++,
    ...couponData,
    usedCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  coupons.push(newCoupon)
  return newCoupon
}

export function updateCoupon(id, couponData) {
  const index = coupons.findIndex((coupon) => coupon.id === Number.parseInt(id))
  if (index !== -1) {
    coupons[index] = {
      ...coupons[index],
      ...couponData,
      updatedAt: new Date().toISOString(),
    }
    return coupons[index]
  }
  return null
}

export function deleteCoupon(id) {
  const index = coupons.findIndex((coupon) => coupon.id === Number.parseInt(id))
  if (index !== -1) {
    const deletedCoupon = coupons.splice(index, 1)[0]
    return deletedCoupon
  }
  return null
}

export function validateCouponCode(code) {
  const coupon = coupons.find((c) => c.code.toLowerCase() === code.toLowerCase())
  if (!coupon) {
    return { valid: false, message: "Mã coupon không tồn tại" }
  }

  if (coupon.status !== "active") {
    return { valid: false, message: "Mã coupon không hoạt động" }
  }

  const now = new Date()
  const startDate = new Date(coupon.startDate)
  const endDate = new Date(coupon.endDate)

  if (now < startDate) {
    return { valid: false, message: "Mã coupon chưa có hiệu lực" }
  }

  if (now > endDate) {
    return { valid: false, message: "Mã coupon đã hết hạn" }
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, message: "Mã coupon đã hết lượt sử dụng" }
  }

  return { valid: true, coupon }
}
