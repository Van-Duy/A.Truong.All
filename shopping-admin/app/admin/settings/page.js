"use client"

import { useState } from "react"
import { useGetAllSettingsQuery } from "../../../store/slices/settingsApi"
import SettingsForm from "../../../components/admin/SettingsForm"
import { Settings, Monitor, ImageIcon, Share2, FileText, Phone, Search } from "lucide-react"

export default function SettingsPage() {
  const { data: settings, isLoading } = useGetAllSettingsQuery()
  const [selectedType, setSelectedType] = useState(null)

  const settingsCards = [
    {
      type: "header",
      title: "Cài đặt Header",
      description: "Quản lý header, menu điều hướng và thanh công cụ",
      icon: Monitor,
      color: "bg-blue-500",
      stats: settings?.header ? `${settings.header.menuItems?.length || 0} menu items` : "0 menu items",
    },
    {
      type: "logo",
      title: "Logo & Favicon",
      description: "Cài đặt logo, favicon và branding",
      icon: ImageIcon,
      color: "bg-purple-500",
      stats: settings?.logo?.logoImage ? "Đã có logo" : "Chưa có logo",
    },
    {
      type: "socialMedia",
      title: "Mạng xã hội",
      description: "Quản lý liên kết mạng xã hội",
      icon: Share2,
      color: "bg-pink-500",
      stats: settings?.socialMedia
        ? `${Object.values(settings.socialMedia).filter((v) => v && typeof v === "string" && v.startsWith("http")).length} liên kết`
        : "0 liên kết",
    },
    {
      type: "footer",
      title: "Cài đặt Footer",
      description: "Quản lý footer, cột thông tin và bản quyền",
      icon: FileText,
      color: "bg-green-500",
      stats: settings?.footer ? `${settings.footer.columns?.length || 0} cột thông tin` : "0 cột thông tin",
    },
    {
      type: "contact",
      title: "Thông tin liên hệ",
      description: "Thông tin công ty, địa chỉ, số điện thoại",
      icon: Phone,
      color: "bg-orange-500",
      stats: settings?.contact?.phone ? "Đã cập nhật" : "Chưa cập nhật",
    },
    {
      type: "seo",
      title: "Cài đặt SEO",
      description: "Meta tags, Google Analytics, Facebook Pixel",
      icon: Search,
      color: "bg-indigo-500",
      stats: settings?.seo?.googleAnalytics ? "Đã cấu hình" : "Chưa cấu hình",
    },
  ]

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
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
          <div className="text-2xl font-bold text-blue-600">{settings?.header?.menuItems?.length || 0}</div>
          <div className="text-sm text-gray-600">Menu Items</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">
            {settings?.socialMedia
              ? Object.values(settings.socialMedia).filter((v) => v && typeof v === "string" && v.startsWith("http"))
                  .length
              : 0}
          </div>
          <div className="text-sm text-gray-600">Social Links</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">{settings?.footer?.columns?.length || 0}</div>
          <div className="text-sm text-gray-600">Footer Columns</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-orange-600">{settings?.seo?.googleAnalytics ? "✓" : "✗"}</div>
          <div className="text-sm text-gray-600">SEO Setup</div>
        </div>
      </div>

      {selectedType && <SettingsForm type={selectedType} onClose={() => setSelectedType(null)} />}
    </div>
  )
}
