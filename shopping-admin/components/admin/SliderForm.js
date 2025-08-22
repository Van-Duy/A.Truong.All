"use client"

import { useState, useEffect } from "react"
import { useUpdateSliderMutation } from "../../store/slices/sliderApi"
import { useCreateSliderMutation, useUploadSliderImageMutation } from '../../services/slider.api'
import { X } from "lucide-react"

export default function SliderForm({ slider, onClose, nextOrdering = 1 }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    imageFile: null,
    link: "",
    active: true,
    ordering: nextOrdering,
  })

  const [createSlider, { isLoading: isCreating }] = useCreateSliderMutation()
  const [uploadImage, { isLoading: isUploading }] = useUploadSliderImageMutation()
  const [updateSlider, { isLoading: isUpdating }] = useUpdateSliderMutation()

  useEffect(() => {
    if (slider) {
      setFormData({
        title: slider.title || "",
        description: slider.description || "",
        image: slider.image || "",
        imageFile: null,
        link: slider.link || "",
        active: slider.active ?? true,
        ordering: slider.ordering || nextOrdering,
      })
    } else {
      setFormData((prev) => ({
        ...prev,
        ordering: nextOrdering,
      }))
    }
  }, [slider, nextOrdering])

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
      // let imageUrl = formData.image

      // if (formData.imageFile) {
      //   const uploadFormData = new FormData()
      //   uploadFormData.append("file", formData.imageFile)

      //   const uploadResponse = await fetch("/api/upload", {
      //     method: "POST",
      //     body: uploadFormData,
      //   })

      //   if (uploadResponse.ok) {
      //     const uploadResult = await uploadResponse.json()
      //     imageUrl = uploadResult.url
      //   } else {
      //     throw new Error("Upload file thất bại")
      //   }
      // }

      const sliderData = {
        ...formData,
        ordering: Number.parseInt(formData.ordering) || 0,
      }

      if (slider) {
        await updateSlider({ id: slider.id, ...sliderData }).unwrap()
      } else {
        let { id } = await createSlider(sliderData).unwrap()
        // upload images
        if (formData.imageFile) {
          const uploadFormData = new FormData()
          uploadFormData.append("image", formData.imageFile)
          console.log(uploadFormData.get("image"));

          // Upl  oad image
          await uploadImage(id, uploadFormData).unwrap()
        }

      }
      onClose()
    } catch (error) {
      console.error("Lỗi khi lưu slider:", error)
      alert("Có lỗi xảy ra khi lưu slider!")
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{slider ? "Sửa Slider" : "Thêm Slider Mới"}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Liên kết</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

        <div className="flex items-center">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Kích hoạt slider</label>
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
