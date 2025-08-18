"use client"

import { useState, useEffect } from "react"
import { useCreateProductMutation, useUpdateProductMutation } from "../../store/slices/productApi"
import { useGetCategoriesQuery } from "../../store/slices/categoryApi"
import { generateSlug } from "../../lib/products-data"
import { X, Upload } from "lucide-react"

export default function ProductForm({ product, onClose }) {
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    description: "",
    avatar: "",
    avatarFile: null,
    images: [],
    imageFiles: [],
    price: "",
    discountPrice: "",
    status: "active",
    slug: "",
    isFlashsale: false,
    isTopsale: false,
    isHangngoai: false,
    isThuonghieuNoibat: false,
    isBancothethich: false,
    quantity: "",
  })

  const [autoSlug, setAutoSlug] = useState(true)

  const { data: categories = [] } = useGetCategoriesQuery()
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()

  // Get active categories for dropdown
  const activeCategories = categories.filter((c) => c.status === "active")

  useEffect(() => {
    if (product) {
      setFormData({
        categoryId: product.categoryId || "",
        name: product.name || "",
        description: product.description || "",
        avatar: product.avatar || "",
        avatarFile: null,
        images: product.images || [],
        imageFiles: [],
        price: product.price || "",
        discountPrice: product.discountPrice || "",
        status: product.status || "active",
        slug: product.slug || "",
        isFlashsale: product.isFlashsale || false,
        isTopsale: product.isTopsale || false,
        isHangngoai: product.isHangngoai || false,
        isThuonghieuNoibat: product.isThuonghieuNoibat || false,
        isBancothethich: product.isBancothethich || false,
        quantity: product.quantity || "",
      })
      setAutoSlug(false)
    }
  }, [product])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.")
        return
      }

      if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh!")
        return
      }

      setFormData((prev) => ({
        ...prev,
        avatarFile: file,
        avatar: "",
      }))
    }
  }

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = []

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} quá lớn! Vui lòng chọn file nhỏ hơn 5MB.`)
        continue
      }

      if (!file.type.startsWith("image/")) {
        alert(`File ${file.name} không phải là hình ảnh!`)
        continue
      }

      validFiles.push(file)
    }

    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        imageFiles: [...prev.imageFiles, ...validFiles],
      }))
    }
  }

  const handleRemoveAvatar = () => {
    setFormData((prev) => ({
      ...prev,
      avatarFile: null,
      avatar: "",
    }))
  }

  const handleRemoveImage = (index, isFile = false) => {
    if (isFile) {
      setFormData((prev) => ({
        ...prev,
        imageFiles: prev.imageFiles.filter((_, i) => i !== index),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }))
    }
  }

  const uploadFile = async (file) => {
    const uploadFormData = new FormData()
    uploadFormData.append("file", file)

    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      body: uploadFormData,
    })

    if (uploadResponse.ok) {
      const uploadResult = await uploadResponse.json()
      return uploadResult.url
    } else {
      throw new Error("Upload file thất bại")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let avatarUrl = formData.avatar
      let imageUrls = [...formData.images]

      // Upload avatar if new file selected
      if (formData.avatarFile) {
        avatarUrl = await uploadFile(formData.avatarFile)
      }

      // Upload new images
      if (formData.imageFiles.length > 0) {
        const uploadPromises = formData.imageFiles.map(uploadFile)
        const newImageUrls = await Promise.all(uploadPromises)
        imageUrls = [...imageUrls, ...newImageUrls]
      }

      const productData = {
        ...formData,
        categoryId: Number.parseInt(formData.categoryId),
        price: Number.parseFloat(formData.price),
        discountPrice: formData.discountPrice ? Number.parseFloat(formData.discountPrice) : null,
        quantity: Number.parseInt(formData.quantity),
        avatar: avatarUrl,
        images: imageUrls,
        avatarFile: undefined,
        imageFiles: undefined,
      }

      if (product) {
        await updateProduct({ id: product.id, ...productData }).unwrap()
      } else {
        await createProduct(productData).unwrap()
      }
      onClose()
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error)
      alert("Có lỗi xảy ra khi lưu sản phẩm!")
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "name" && autoSlug) {
      const newSlug = generateSlug(value)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: newSlug,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }

    if (name === "slug") {
      setAutoSlug(false)
    }
  }

  const handleSlugGenerate = () => {
    const newSlug = generateSlug(formData.name)
    setFormData((prev) => ({
      ...prev,
      slug: newSlug,
    }))
    setAutoSlug(true)
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : "N/A"
  }

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-4 border-b">
        <h2 className="text-xl font-bold text-gray-900">{product ? "Sửa Sản phẩm" : "Thêm Sản phẩm Mới"}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Chọn danh mục --</option>
              {activeCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.parentId ? `${getCategoryName(cat.parentId)} > ${cat.name}` : cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleSlugGenerate}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Tự động
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc (VNĐ) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Giá khuyến mãi (VNĐ)</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện</label>
          <div className="space-y-3">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click để upload</span> ảnh đại diện
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
              </label>
            </div>

            {(formData.avatar || formData.avatarFile) && (
              <div className="relative inline-block">
                <img
                  src={formData.avatarFile ? URL.createObjectURL(formData.avatarFile) : formData.avatar}
                  alt="Avatar preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh sản phẩm</label>
          <div className="space-y-3">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click để upload</span> nhiều hình ảnh
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB mỗi file)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" multiple onChange={handleImagesChange} />
              </label>
            </div>

            {/* Existing Images */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, false)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New Image Files */}
            {formData.imageFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {formData.imageFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`New ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, true)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b-lg truncate">
                      {file.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status and Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
        </div>

        {/* Feature Flags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Tính năng đặc biệt</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFlashsale"
                checked={formData.isFlashsale}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">Flash Sale</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isTopsale"
                checked={formData.isTopsale}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">Top Sale</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isHangngoai"
                checked={formData.isHangngoai}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">Hàng ngoại</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isThuonghieuNoibat"
                checked={formData.isThuonghieuNoibat}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">Thương hiệu nổi bật</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isBancothethich"
                checked={formData.isBancothethich}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">Bạn có thể thích</label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t sticky bottom-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isCreating || isUpdating ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </form>
    </div>
  )
}
