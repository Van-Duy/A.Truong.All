"use client"

import { useState, useEffect } from "react"
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../services/category.api"

import { generateSlug } from "../../lib/categories-data"
import { X } from "lucide-react"

export default function CategoryForm({ category, onClose, nextOrdering = 1 }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    imageFile: null,
    parentId: null,
    ordering: nextOrdering,
    status: "active",
  })

  const [autoSlug, setAutoSlug] = useState(true)

  // const { data: categories = [], isLoading: isLoadingCategories } = useGetCategoriesQuery()

  // useEffect(() => {
  //   if (category) {
  //     setFormData({
  //       name: category.name || "",
  //       slug: category.slug || "",
  //       description: category.description || "",
  //       image: category.image || "",
  //       imageFile: null,
  //       parentId: category.parentId || null,
  //       ordering: category.ordering || nextOrdering,
  //       status: category.status || "active",
  //     })
  //     setAutoSlug(false)
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       ordering: nextOrdering, // Ensure ordering is set to nextOrdering when creating a new category
  //     }))
  //   }
  // }, [category, nextOrdering]) // Added nextOrdering to dependency array

  const handleFileChange = (e) => {
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
        imageFile: file,
        image: "",
      }))
    }
  }

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageFile: null,
      image: "",
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let imageUrl = formData.image

      if (formData.imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append("file", formData.imageFile)

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        })

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json()
          imageUrl = uploadResult.url
        } else {
          throw new Error("Upload file thất bại")
        }
      }

      const categoryData = {
        ...formData,
        image: imageUrl,
        parentId: formData.parentId === "" ? null : Number.parseInt(formData.parentId) || null,
        ordering: Number.parseInt(formData.ordering) || 0,
        imageFile: undefined,
      }

      if (category) {
        await updateCategory({ id: category.id, ...categoryData }).unwrap()
      } else {
        await createCategory(categoryData).unwrap()
      }
      onClose()
    } catch (error) {
      console.error("Lỗi khi lưu danh mục:", error)
      alert("Có lỗi xảy ra khi lưu danh mục!")
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === "name" && autoSlug) {
      // Auto generate slug from name
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{category ? "Sửa Danh mục" : "Thêm Danh mục Mới"}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
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
          <p className="text-xs text-gray-500 mt-1">URL thân thiện cho danh mục</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục cha</label>
          <select
            name="parentId"
            value={formData.parentId || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Danh mục gốc --</option>
            {/* {categories.map((cat) => ( // Changed parentCategories to categories
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))} */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
          <div className="space-y-3">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click để upload</span> hoặc kéo thả file
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>

            {(formData.image || formData.imageFile) && (
              <div className="relative">
                <img
                  src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.image}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự hiển thị</label>
          <input
            type="number"
            name="ordering"
            value={formData.ordering}
            onChange={handleChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Số nhỏ hơn sẽ hiển thị trước (0 = đầu tiên)</p>
        </div>

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

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  )
}
