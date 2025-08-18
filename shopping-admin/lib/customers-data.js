// Mock data for customers
const customers = [
  {
    id: 1,
    customerCode: "KH001",
    fullName: "Nguyễn Văn An",
    email: "nguyenvanan@gmail.com",
    phone: "0901234567",
    dateOfBirth: "1990-05-15",
    gender: "male",
    avatar: "/placeholder.svg?height=50&width=50",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    city: "TP.HCM",
    zipCode: "70000",
    customerType: "vip",
    status: "active",
    totalOrders: 15,
    totalSpent: 25000000,
    lastOrderDate: "2024-01-10",
    registrationDate: "2023-01-15",
    loyaltyPoints: 2500,
    notes: "Khách hàng VIP, thường xuyên mua hàng",
    tags: ["VIP", "Thường xuyên"],
    socialMedia: {
      facebook: "facebook.com/nguyenvanan",
      instagram: "",
      zalo: "0901234567",
    },
    preferences: {
      newsletter: true,
      smsMarketing: true,
      emailMarketing: true,
    },
  },
  {
    id: 2,
    customerCode: "KH002",
    fullName: "Trần Thị Bình",
    email: "tranthibinh@gmail.com",
    phone: "0912345678",
    dateOfBirth: "1985-08-22",
    gender: "female",
    avatar: "/placeholder.svg?height=50&width=50",
    address: "456 Đường XYZ, Quận 3, TP.HCM",
    ward: "Phường Võ Thị Sáu",
    district: "Quận 3",
    city: "TP.HCM",
    zipCode: "70000",
    customerType: "regular",
    status: "active",
    totalOrders: 8,
    totalSpent: 12000000,
    lastOrderDate: "2024-01-08",
    registrationDate: "2023-03-20",
    loyaltyPoints: 1200,
    notes: "Khách hàng thân thiết",
    tags: ["Thân thiết"],
    socialMedia: {
      facebook: "",
      instagram: "instagram.com/tranthibinh",
      zalo: "",
    },
    preferences: {
      newsletter: true,
      smsMarketing: false,
      emailMarketing: true,
    },
  },
  {
    id: 3,
    customerCode: "KH003",
    fullName: "Lê Minh Cường",
    email: "leminhcuong@gmail.com",
    phone: "0923456789",
    dateOfBirth: "1992-12-10",
    gender: "male",
    avatar: "/placeholder.svg?height=50&width=50",
    address: "789 Đường DEF, Quận 7, TP.HCM",
    ward: "Phường Tân Phú",
    district: "Quận 7",
    city: "TP.HCM",
    zipCode: "70000",
    customerType: "new",
    status: "inactive",
    totalOrders: 2,
    totalSpent: 3500000,
    lastOrderDate: "2023-12-15",
    registrationDate: "2023-11-01",
    loyaltyPoints: 350,
    notes: "Khách hàng mới, cần chăm sóc",
    tags: ["Mới"],
    socialMedia: {
      facebook: "",
      instagram: "",
      zalo: "0923456789",
    },
    preferences: {
      newsletter: false,
      smsMarketing: true,
      emailMarketing: false,
    },
  },
]

export function getCustomers() {
  return customers
}

export function getCustomerById(id) {
  return customers.find((customer) => customer.id === Number.parseInt(id))
}

export function createCustomer(customerData) {
  const newCustomer = {
    id: Math.max(...customers.map((c) => c.id)) + 1,
    customerCode: `KH${String(Math.max(...customers.map((c) => c.id)) + 1).padStart(3, "0")}`,
    ...customerData,
    registrationDate: new Date().toISOString().split("T")[0],
    totalOrders: 0,
    totalSpent: 0,
    loyaltyPoints: 0,
    lastOrderDate: null,
  }
  customers.push(newCustomer)
  return newCustomer
}

export function updateCustomer(id, customerData) {
  const index = customers.findIndex((customer) => customer.id === Number.parseInt(id))
  if (index !== -1) {
    customers[index] = { ...customers[index], ...customerData }
    return customers[index]
  }
  return null
}

export function deleteCustomer(id) {
  const index = customers.findIndex((customer) => customer.id === Number.parseInt(id))
  if (index !== -1) {
    const deletedCustomer = customers[index]
    customers.splice(index, 1)
    return deletedCustomer
  }
  return null
}

export function getCustomerStats() {
  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const vipCustomers = customers.filter((c) => c.customerType === "vip").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)

  return {
    totalCustomers,
    activeCustomers,
    vipCustomers,
    totalRevenue,
  }
}
