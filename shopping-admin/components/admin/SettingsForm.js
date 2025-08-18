"use client"

import { useState, useEffect } from "react"
import {
  useGetSettingsByTypeQuery,
  useUpdateSettingsMutation,
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} from "../../store/slices/settingsApi"
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react"

export default function SettingsForm({ type, onClose }) {
  const { data: settings, isLoading } = useGetSettingsByTypeQuery(type)
  const [updateSettings] = useUpdateSettingsMutation()
  const [addMenuItem] = useAddMenuItemMutation()
  const [updateMenuItem] = useUpdateMenuItemMutation()
  const [deleteMenuItem] = useDeleteMenuItemMutation()

  const [formData, setFormData] = useState({})
  const [activeTab, setActiveTab] = useState("general")
  const [editingItem, setEditingItem] = useState(null)
  const [newItem, setNewItem] = useState({})

  useEffect(() => {
    if (settings) {
      setFormData(settings)
    }
  }, [settings])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateSettings({ type, data: formData }).unwrap()
      alert("Cập nhật thành công!")
      onClose?.()
    } catch (error) {
      alert("Có lỗi xảy ra!")
    }
  }

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setFormData((prev) => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [field]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleFileUpload = async (file, field, nested = null) => {
    const formDataUpload = new FormData()
    formDataUpload.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      })
      const result = await response.json()

      if (result.url) {
        handleInputChange(field, result.url, nested)
      }
    } catch (error) {
      alert("Upload failed!")
    }
  }

  const handleAddMenuItem = async () => {
    try {
      await addMenuItem(newItem).unwrap()
      setNewItem({})
      alert("Thêm menu thành công!")
    } catch (error) {
      alert("Có lỗi xảy ra!")
    }
  }

  const handleUpdateMenuItem = async (id, data) => {
    try {
      await updateMenuItem({ id, data }).unwrap()
      setEditingItem(null)
      alert("Cập nhật menu thành công!")
    } catch (error) {
      alert("Có lỗi xảy ra!")
    }
  }

  const handleDeleteMenuItem = async (id) => {
    if (confirm("Bạn có chắc muốn xóa menu này?")) {
      try {
        await deleteMenuItem(id).unwrap()
        alert("Xóa menu thành công!")
      } catch (error) {
        alert("Có lỗi xảy ra!")
      }
    }
  }

  if (isLoading) return <div className="p-4">Đang tải...</div>

  const renderHeaderSettings = () => (
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
              value={formData.siteName || ""}
              onChange={(e) => handleInputChange("siteName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slogan</label>
            <input
              type="text"
              value={formData.tagline || ""}
              onChange={(e) => handleInputChange("tagline", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Màu header</label>
            <input
              type="color"
              value={formData.headerColor || "#ffffff"}
              onChange={(e) => handleInputChange("headerColor", e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Màu chữ</label>
            <input
              type="color"
              value={formData.textColor || "#333333"}
              onChange={(e) => handleInputChange("textColor", e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Hiển thị các thành phần</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["showSearch", "showCart", "showWishlist", "showAccount"].map((field) => (
                <label key={field} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData[field] || false}
                    onChange={(e) => handleInputChange(field, e.target.checked)}
                    className="mr-2"
                  />
                  {field.replace("show", "").replace(/([A-Z])/g, " $1")}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "menu" && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Thêm menu mới</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Tên menu"
                value={newItem.name || ""}
                onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="URL"
                value={newItem.url || ""}
                onChange={(e) => setNewItem((prev) => ({ ...prev, url: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddMenuItem}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {formData.menuItems?.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                {editingItem === item.id ? (
                  <div className="flex-1 grid grid-cols-3 gap-2 mr-4">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const updatedItems = formData.menuItems.map((i) =>
                          i.id === item.id ? { ...i, name: e.target.value } : i,
                        )
                        setFormData((prev) => ({ ...prev, menuItems: updatedItems }))
                      }}
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => {
                        const updatedItems = formData.menuItems.map((i) =>
                          i.id === item.id ? { ...i, url: e.target.value } : i,
                        )
                        setFormData((prev) => ({ ...prev, menuItems: updatedItems }))
                      }}
                      className="px-2 py-1 border rounded"
                    />
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleUpdateMenuItem(item.id, item)}
                        className="text-green-600 hover:text-green-800 mr-2"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.url}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          const updatedItems = formData.menuItems.map((i) =>
                            i.id === item.id ? { ...i, isActive: !i.isActive } : i,
                          )
                          setFormData((prev) => ({ ...prev, menuItems: updatedItems }))
                        }}
                        className={`p-1 rounded ${item.isActive ? "text-green-600" : "text-gray-400"}`}
                      >
                        {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingItem(item.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteMenuItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderLogoSettings = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Logo hình ảnh</label>
        <div className="space-y-2">
          {formData.logoImage && (
            <img
              src={formData.logoImage || "/placeholder.svg"}
              alt="Logo"
              className="w-32 h-16 object-contain border rounded"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], "logoImage")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
        <div className="space-y-2">
          {formData.faviconImage && (
            <img
              src={formData.faviconImage || "/placeholder.svg"}
              alt="Favicon"
              className="w-8 h-8 object-contain border rounded"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], "faviconImage")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Văn bản logo</label>
        <input
          type="text"
          value={formData.logoText || ""}
          onChange={(e) => handleInputChange("logoText", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Vị trí logo</label>
        <select
          value={formData.position || "left"}
          onChange={(e) => handleInputChange("position", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="left">Trái</option>
          <option value="center">Giữa</option>
          <option value="right">Phải</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Chiều rộng logo</label>
        <input
          type="number"
          value={formData.logoWidth || 200}
          onChange={(e) => handleInputChange("logoWidth", Number.parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Chiều cao logo</label>
        <input
          type="number"
          value={formData.logoHeight || 60}
          onChange={(e) => handleInputChange("logoHeight", Number.parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="md:col-span-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.showText || false}
            onChange={(e) => handleInputChange("showText", e.target.checked)}
            className="mr-2"
          />
          Hiển thị văn bản logo
        </label>
      </div>
    </div>
  )

  const renderSocialMediaSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: "facebook", label: "Facebook", icon: Facebook },
          { key: "instagram", label: "Instagram", icon: Instagram },
          { key: "twitter", label: "Twitter", icon: Twitter },
          { key: "youtube", label: "YouTube", icon: Youtube },
          { key: "tiktok", label: "TikTok", icon: null },
          { key: "zalo", label: "Zalo", icon: null },
          { key: "linkedin", label: "LinkedIn", icon: Linkedin },
          { key: "pinterest", label: "Pinterest", icon: null },
        ].map(({ key, label, icon: Icon }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              {label}
            </label>
            <input
              type="url"
              value={formData[key] || ""}
              onChange={(e) => handleInputChange(key, e.target.value)}
              placeholder={`https://${key}.com/username`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Cài đặt hiển thị</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.showInHeader || false}
              onChange={(e) => handleInputChange("showInHeader", e.target.checked)}
              className="mr-2"
            />
            Hiển thị trong header
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.showInFooter || false}
              onChange={(e) => handleInputChange("showInFooter", e.target.checked)}
              className="mr-2"
            />
            Hiển thị trong footer
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.openInNewTab || false}
              onChange={(e) => handleInputChange("openInNewTab", e.target.checked)}
              className="mr-2"
            />
            Mở trong tab mới
          </label>
        </div>
      </div>
    </div>
  )

  const renderFooterSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Màu nền footer</label>
          <input
            type="color"
            value={formData.backgroundColor || "#2d3748"}
            onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Màu chữ</label>
          <input
            type="color"
            value={formData.textColor || "#ffffff"}
            onChange={(e) => handleInputChange("textColor", e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Màu link</label>
          <input
            type="color"
            value={formData.linkColor || "#4299e1"}
            onChange={(e) => handleInputChange("linkColor", e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Văn bản bản quyền</label>
        <textarea
          value={formData.copyrightText || ""}
          onChange={(e) => handleInputChange("copyrightText", e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Newsletter</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.showNewsletter || false}
            onChange={(e) => handleInputChange("showNewsletter", e.target.checked)}
            className="mr-2"
          />
          Hiển thị đăng ký newsletter
        </label>
        {formData.showNewsletter && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
              <input
                type="text"
                value={formData.newsletterTitle || ""}
                onChange={(e) => handleInputChange("newsletterTitle", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
              <input
                type="text"
                value={formData.newsletterDescription || ""}
                onChange={(e) => handleInputChange("newsletterDescription", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Phương thức thanh toán</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.showPaymentMethods || false}
            onChange={(e) => handleInputChange("showPaymentMethods", e.target.checked)}
            className="mr-2"
          />
          Hiển thị phương thức thanh toán
        </label>
        {formData.showPaymentMethods && (
          <div className="ml-6">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {["visa", "mastercard", "momo", "zalopay", "vnpay", "paypal", "applepay", "googlepay"].map((method) => (
                <label key={method} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.paymentMethods?.includes(method) || false}
                    onChange={(e) => {
                      const current = formData.paymentMethods || []
                      const updated = e.target.checked ? [...current, method] : current.filter((m) => m !== method)
                      handleInputChange("paymentMethods", updated)
                    }}
                    className="mr-1"
                  />
                  <span className="text-sm capitalize">{method}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderContactSettings = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tên công ty</label>
        <input
          type="text"
          value={formData.companyName || ""}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
        <input
          type="tel"
          value={formData.phone || ""}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hotline</label>
        <input
          type="tel"
          value={formData.hotline || ""}
          onChange={(e) => handleInputChange("hotline", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
        <textarea
          value={formData.address || ""}
          onChange={(e) => handleInputChange("address", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Giờ làm việc</label>
        <input
          type="text"
          value={formData.workingHours || ""}
          onChange={(e) => handleInputChange("workingHours", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mã số thuế</label>
        <input
          type="text"
          value={formData.taxCode || ""}
          onChange={(e) => handleInputChange("taxCode", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Giấy phép kinh doanh</label>
        <input
          type="text"
          value={formData.businessLicense || ""}
          onChange={(e) => handleInputChange("businessLicense", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.showInFooter || false}
            onChange={(e) => handleInputChange("showInFooter", e.target.checked)}
            className="mr-2"
          />
          Hiển thị trong footer
        </label>
      </div>
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.showMap || false}
            onChange={(e) => handleInputChange("showMap", e.target.checked)}
            className="mr-2"
          />
          Hiển thị bản đồ
        </label>
      </div>
      {formData.showMap && (
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">URL Google Maps Embed</label>
          <input
            type="url"
            value={formData.mapUrl || ""}
            onChange={(e) => handleInputChange("mapUrl", e.target.value)}
            placeholder="https://maps.google.com/embed?pb=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      )}
    </div>
  )

  const renderSeoSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
        <input
          type="text"
          value={formData.metaTitle || ""}
          onChange={(e) => handleInputChange("metaTitle", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
        <textarea
          value={formData.metaDescription || ""}
          onChange={(e) => handleInputChange("metaDescription", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
        <input
          type="text"
          value={formData.metaKeywords || ""}
          onChange={(e) => handleInputChange("metaKeywords", e.target.value)}
          placeholder="keyword1, keyword2, keyword3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">OG Image</label>
        <div className="space-y-2">
          {formData.ogImage && (
            <img
              src={formData.ogImage || "/placeholder.svg"}
              alt="OG"
              className="w-48 h-24 object-cover border rounded"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0], "ogImage")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
          <input
            type="text"
            value={formData.googleAnalytics || ""}
            onChange={(e) => handleInputChange("googleAnalytics", e.target.value)}
            placeholder="GA-XXXXXXXXX-X"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
          <input
            type="text"
            value={formData.facebookPixel || ""}
            onChange={(e) => handleInputChange("facebookPixel", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Google Tag Manager ID</label>
          <input
            type="text"
            value={formData.googleTagManager || ""}
            onChange={(e) => handleInputChange("googleTagManager", e.target.value)}
            placeholder="GTM-XXXXXXX"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.structuredData || false}
              onChange={(e) => handleInputChange("structuredData", e.target.checked)}
              className="mr-2"
            />
            Bật Structured Data
          </label>
        </div>
      </div>
    </div>
  )

  const getTitle = () => {
    const titles = {
      header: "Cài đặt Header",
      logo: "Cài đặt Logo",
      socialMedia: "Mạng xã hội",
      footer: "Cài đặt Footer",
      contact: "Thông tin liên hệ",
      seo: "Cài đặt SEO",
    }
    return titles[type] || "Cài đặt"
  }

  const renderContent = () => {
    switch (type) {
      case "header":
        return renderHeaderSettings()
      case "logo":
        return renderLogoSettings()
      case "socialMedia":
        return renderSocialMediaSettings()
      case "footer":
        return renderFooterSettings()
      case "contact":
        return renderContactSettings()
      case "seo":
        return renderSeoSettings()
      default:
        return <div>Không tìm thấy cài đặt</div>
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">{getTitle()}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {renderContent()}

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
