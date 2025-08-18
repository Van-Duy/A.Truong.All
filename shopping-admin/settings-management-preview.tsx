"use client"

import { useState } from "react"
import {
  Settings,
  Monitor,
  ImageIcon,
  Share2,
  FileText,
  Phone,
  Search,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react"

export default function SettingsManagementPreview() {
  const [selectedType, setSelectedType] = useState(null)
  const [activeTab, setActiveTab] = useState("general")
  const [editingItem, setEditingItem] = useState(null)

  const mockSettings = {
    header: {
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
      logoImage: "/placeholder.svg?height=60&width=200&text=Logo",
      logoText: "Shopping Store",
      faviconImage: "/placeholder.svg?height=32&width=32&text=Fav",
      logoWidth: 200,
      logoHeight: 60,
      showText: true,
      position: "left",
    },
    socialMedia: {
      facebook: "https://facebook.com/store",
      instagram: "https://instagram.com/store",
      twitter: "https://twitter.com/store",
      youtube: "https://youtube.com/store",
      tiktok: "https://tiktok.com/@shopstore",
      zalo: "https://zalo.me/store",
      showInHeader: true,
      showInFooter: true,
      openInNewTab: true,
    },
    footer: {
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
          ],
        },
      ],
    },
    contact: {
      companyName: "Công ty TNHH Shopping Store",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      phone: "0123 456 789",
      email: "info@shopstore.com",
      hotline: "1900 1234",
      workingHours: "8:00 - 22:00 (Thứ 2 - Chủ nhật)",
      showInFooter: true,
      showMap: true,
    },
    seo: {
      metaTitle: "Shopping Store - Mua sắm trực tuyến",
      metaDescription: "Cửa hàng trực tuyến uy tín với hàng ngàn sản phẩm chất lượng",
      googleAnalytics: "GA-XXXXXXXXX-X",
      facebookPixel: "123456789",
      structuredData: true,
    },
  }

  const settingsCards = [
    {
      type: "header",
      title: "Cài đặt Header",
      description: "Quản lý header, menu điều hướng và thanh công cụ",
      icon: Monitor,
      color: "bg-blue-500",
      stats: `${mockSettings.header.menuItems.length} menu items`,
    },
    {
      type: "logo",
      title: "Logo & Favicon",
      description: "Cài đặt logo, favicon và branding",
      icon: ImageIcon,
      color: "bg-purple-500",
      stats: "Đã có logo",
    },
    {
      type: "socialMedia",
      title: "Mạng xã hội",
      description: "Quản lý liên kết mạng xã hội",
      icon: Share2,
      color: "bg-pink-500",
      stats: "6 liên kết",
    },
    {
      type: "footer",
      title: "Cài đặt Footer",
      description: "Quản lý footer, cột thông tin và bản quyền",
      icon: FileText,
      color: "bg-green-500",
      stats: `${mockSettings.footer.columns.length} cột thông tin`,
    },
    {
      type: "contact",
      title: "Thông tin liên hệ",
      description: "Thông tin công ty, địa chỉ, số điện thoại",
      icon: Phone,
      color: "bg-orange-500",
      stats: "Đã cập nhật",
    },
    {
      type: "seo",
      title: "Cài đặt SEO",
      description: "Meta tags, Google Analytics, Facebook Pixel",
      icon: Search,
      color: "bg-indigo-500",
      stats: "Đã cấu hình",
    },
  ]

  const renderHeaderForm = () => (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 font-medium ${activeTab === "general" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
        >
          Cài đặt chung
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("menu")}
          className={`px-4 py-2 font-medium ${activeTab === "menu" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
        >
          Menu điều hướng
        </button>
      </div>

      {activeTab === "general" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên website</label>
            <input
              type="text"
              value={mockSettings.header.siteName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slogan</label>
            <input
              type="text"
              value={mockSettings.header.tagline}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Màu header</label>
            <input
              type="color"
              value={mockSettings.header.headerColor}
              className="w-full h-10 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Màu chữ</label>
            <input
              type="color"
              value={mockSettings.header.textColor}
              className="w-full h-10 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
        </div>
      )}

      {activeTab === "menu" && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Thêm menu mới</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Tên menu" className="px-3 py-2 border border-gray-300 rounded-md" />
              <input type="text" placeholder="URL" className="px-3 py-2 border border-gray-300 rounded-md" />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Thêm
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {mockSettings.header.menuItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.url}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className={`p-1 rounded ${item.isActive ? "text-green-600" : "text-gray-400"}`}>
                    {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderSocialMediaForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: "facebook", label: "Facebook", icon: Facebook },
          { key: "instagram", label: "Instagram", icon: Instagram },
          { key: "twitter", label: "Twitter", icon: Twitter },
          { key: "youtube", label: "YouTube", icon: Youtube },
        ].map(({ key, label, icon: Icon }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </label>
            <input
              type="url"
              value={mockSettings.socialMedia[key] || ""}
              placeholder={`https://${key}.com/username`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Cài đặt hiển thị</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" checked={mockSettings.socialMedia.showInHeader} className="mr-2" readOnly />
            Hiển thị trong header
          </label>
          <label className="flex items-center">
            <input type="checkbox" checked={mockSettings.socialMedia.showInFooter} className="mr-2" readOnly />
            Hiển thị trong footer
          </label>
        </div>
      </div>
    </div>
  )

  const renderForm = () => {
    switch (selectedType) {
      case "header":
        return renderHeaderForm()
      case "socialMedia":
        return renderSocialMediaForm()
      default:
        return <div className="p-8 text-center text-gray-500">Form preview cho {selectedType}</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cài đặt hệ thống</h1>
          <p className="text-gray-600">Quản lý các cài đặt chung của website</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsCards.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.type}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedType(card.type)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${card.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Settings className="w-5 h-5 text-gray-400" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>

                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{card.stats}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Cấu hình →</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-gray-600">Menu Items</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-purple-600">6</div>
            <div className="text-sm text-gray-600">Social Links</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">Footer Columns</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-orange-600">✓</div>
            <div className="text-sm text-gray-600">SEO Setup</div>
          </div>
        </div>

        {selectedType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-semibold">{settingsCards.find((c) => c.type === selectedType)?.title}</h2>
                <button onClick={() => setSelectedType(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {renderForm()}

                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                  <button
                    onClick={() => setSelectedType(null)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
