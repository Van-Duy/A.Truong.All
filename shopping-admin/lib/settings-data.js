// Shared data store for settings
const settingsData = {
  header: {
    id: 1,
    siteName: "Shopping Store",
    tagline: "Mua sắm trực tuyến tốt nhất",
    showSearch: true,
    showCart: true,
    showWishlist: true,
    showAccount: true,
    headerColor: "#ffffff",
    textColor: "#333333",
    menuItems: [
      { id: 1, name: "Trang chủ", url: "/", order: 1, isActive: true },
      { id: 2, name: "Sản phẩm", url: "/products", order: 2, isActive: true },
      { id: 3, name: "Danh mục", url: "/categories", order: 3, isActive: true },
      { id: 4, name: "Liên hệ", url: "/contact", order: 4, isActive: true },
    ],
  },
  logo: {
    id: 1,
    logoImage: "/placeholder.svg?height=60&width=200&text=Logo",
    logoText: "Shopping Store",
    faviconImage: "/placeholder.svg?height=32&width=32&text=Fav",
    logoWidth: 200,
    logoHeight: 60,
    showText: true,
    position: "left",
  },
  socialMedia: {
    id: 1,
    facebook: "https://facebook.com/store",
    instagram: "https://instagram.com/store",
    twitter: "https://twitter.com/store",
    youtube: "https://youtube.com/store",
    tiktok: "https://tiktok.com/@shopstore",
    zalo: "https://zalo.me/store",
    linkedin: "",
    pinterest: "",
    showInHeader: true,
    showInFooter: true,
    openInNewTab: true,
  },
  footer: {
    id: 1,
    backgroundColor: "#2d3748",
    textColor: "#ffffff",
    linkColor: "#4299e1",
    showNewsletter: true,
    newsletterTitle: "Đăng ký nhận tin",
    newsletterDescription: "Nhận thông tin khuyến mãi và sản phẩm mới nhất",
    copyrightText: "© 2024 Shopping Store. Tất cả quyền được bảo lưu.",
    showPaymentMethods: true,
    paymentMethods: ["visa", "mastercard", "momo", "zalopay", "vnpay"],
    columns: [
      {
        id: 1,
        title: "Về chúng tôi",
        order: 1,
        links: [
          { id: 1, name: "Giới thiệu", url: "/about", order: 1 },
          { id: 2, name: "Liên hệ", url: "/contact", order: 2 },
          { id: 3, name: "Tuyển dụng", url: "/careers", order: 3 },
        ],
      },
      {
        id: 2,
        title: "Hỗ trợ khách hàng",
        order: 2,
        links: [
          { id: 1, name: "Hướng dẫn mua hàng", url: "/guide", order: 1 },
          { id: 2, name: "Chính sách đổi trả", url: "/return-policy", order: 2 },
          { id: 3, name: "Chính sách bảo hành", url: "/warranty", order: 3 },
        ],
      },
    ],
  },
  contact: {
    id: 1,
    companyName: "Công ty TNHH Shopping Store",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    phone: "0123 456 789",
    email: "info@shopstore.com",
    hotline: "1900 1234",
    workingHours: "8:00 - 22:00 (Thứ 2 - Chủ nhật)",
    taxCode: "0123456789",
    businessLicense: "0123456789",
    showInFooter: true,
    showMap: true,
    mapUrl: "https://maps.google.com/embed?pb=...",
  },
  seo: {
    id: 1,
    metaTitle: "Shopping Store - Mua sắm trực tuyến",
    metaDescription: "Cửa hàng trực tuyến uy tín với hàng ngàn sản phẩm chất lượng",
    metaKeywords: "mua sắm, online, shopping, store",
    ogImage: "/placeholder.svg?height=630&width=1200&text=OG+Image",
    googleAnalytics: "",
    facebookPixel: "",
    googleTagManager: "",
    structuredData: true,
  },
}

export function getAllSettings() {
  return settingsData
}

export function getSettingsByType(type) {
  return settingsData[type] || null
}

export function updateSettings(type, data) {
  if (settingsData[type]) {
    settingsData[type] = { ...settingsData[type], ...data }
    return settingsData[type]
  }
  return null
}

export function addMenuItem(item) {
  const newItem = {
    id: Date.now(),
    ...item,
    order: settingsData.header.menuItems.length + 1,
  }
  settingsData.header.menuItems.push(newItem)
  return newItem
}

export function updateMenuItem(id, data) {
  const index = settingsData.header.menuItems.findIndex((item) => item.id === Number.parseInt(id))
  if (index !== -1) {
    settingsData.header.menuItems[index] = { ...settingsData.header.menuItems[index], ...data }
    return settingsData.header.menuItems[index]
  }
  return null
}

export function deleteMenuItem(id) {
  const index = settingsData.header.menuItems.findIndex((item) => item.id === Number.parseInt(id))
  if (index !== -1) {
    settingsData.header.menuItems.splice(index, 1)
    return true
  }
  return false
}

export function addFooterColumn(column) {
  const newColumn = {
    id: Date.now(),
    ...column,
    order: settingsData.footer.columns.length + 1,
    links: [],
  }
  settingsData.footer.columns.push(newColumn)
  return newColumn
}

export function updateFooterColumn(id, data) {
  const index = settingsData.footer.columns.findIndex((col) => col.id === Number.parseInt(id))
  if (index !== -1) {
    settingsData.footer.columns[index] = { ...settingsData.footer.columns[index], ...data }
    return settingsData.footer.columns[index]
  }
  return null
}

export function deleteFooterColumn(id) {
  const index = settingsData.footer.columns.findIndex((col) => col.id === Number.parseInt(id))
  if (index !== -1) {
    settingsData.footer.columns.splice(index, 1)
    return true
  }
  return false
}

export function addFooterLink(columnId, link) {
  const column = settingsData.footer.columns.find((col) => col.id === Number.parseInt(columnId))
  if (column) {
    const newLink = {
      id: Date.now(),
      ...link,
      order: column.links.length + 1,
    }
    column.links.push(newLink)
    return newLink
  }
  return null
}

export function updateFooterLink(columnId, linkId, data) {
  const column = settingsData.footer.columns.find((col) => col.id === Number.parseInt(columnId))
  if (column) {
    const index = column.links.findIndex((link) => link.id === Number.parseInt(linkId))
    if (index !== -1) {
      column.links[index] = { ...column.links[index], ...data }
      return column.links[index]
    }
  }
  return null
}

export function deleteFooterLink(columnId, linkId) {
  const column = settingsData.footer.columns.find((col) => col.id === Number.parseInt(columnId))
  if (column) {
    const index = column.links.findIndex((link) => link.id === Number.parseInt(linkId))
    if (index !== -1) {
      column.links.splice(index, 1)
      return true
    }
  }
  return false
}
