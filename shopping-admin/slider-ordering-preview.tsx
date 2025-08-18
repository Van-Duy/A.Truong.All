"use client"

import { useState } from "react"
import { Trash2, Edit, Plus, Check, X, MoveUp, MoveDown, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

export default function SliderOrderingPreview() {
  const [mockSliders, setMockSliders] = useState([
    {
      id: 1,
      title: "Khuyến mãi mùa hè 2024",
      description: "Giảm giá lên đến 50% cho tất cả sản phẩm thời trang mùa hè",
      image: "/placeholder.svg?height=400&width=800&text=Summer Sale",
      active: true,
      ordering: 1,
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      title: "Bộ sưu tập mới 2024",
      description: "Khám phá những sản phẩm mới nhất trong bộ sưu tập xuân hè",
      image: "/placeholder.svg?height=400&width=800&text=New Collection",
      active: true,
      ordering: 2,
      createdAt: "2024-01-14T15:45:00Z",
    },
    {
      id: 3,
      title: "Flash Sale cuối tuần",
      description: "Ưu đãi đặc biệt chỉ có vào cuối tuần với giá shock",
      image: "/placeholder.svg?height=400&width=800&text=Flash Sale",
      active: false,
      ordering: 3,
      createdAt: "2024-01-13T09:20:00Z",
    },
    {
      id: 4,
      title: "Sản phẩm công nghệ",
      description: "Những thiết bị công nghệ mới nhất với giá ưu đãi",
      image: "/placeholder.svg?height=400&width=800&text=Tech Products",
      active: true,
      ordering: 4,
      createdAt: "2024-01-12T14:15:00Z",
    },
    {
      id: 5,
      title: "Thời trang nam",
      description: "Bộ sưu tập thời trang nam phong cách và hiện đại",
      image: "/placeholder.svg?height=400&width=800&text=Men Fashion",
      active: true,
      ordering: 5,
      createdAt: "2024-01-11T11:30:00Z",
    },
  ])

  const [editingOrdering, setEditingOrdering] = useState({})
  const [tempOrdering, setTempOrdering] = useState({})
  const [sortField, setSortField] = useState("ordering")
  const [sortDirection, setSortDirection] = useState("asc")

  // Sort sliders
  const sortedSliders = [...mockSliders].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === "createdAt") {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }

    if (sortField === "ordering") {
      aValue = aValue || 999999
      bValue = bValue || 999999
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />
    return sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  const handleEditOrdering = (sliderId, currentOrdering) => {
    setEditingOrdering({ ...editingOrdering, [sliderId]: true })
    setTempOrdering({ ...tempOrdering, [sliderId]: currentOrdering || 0 })
  }

  const handleCancelEditOrdering = (sliderId) => {
    const newEditingOrdering = { ...editingOrdering }
    const newTempOrdering = { ...tempOrdering }
    delete newEditingOrdering[sliderId]
    delete newTempOrdering[sliderId]
    setEditingOrdering(newEditingOrdering)
    setTempOrdering(newTempOrdering)
  }

  const handleSaveOrdering = (sliderId) => {
    const newOrdering = Number.parseInt(tempOrdering[sliderId])
    setMockSliders((prev) =>
      prev.map((slider) => (slider.id === sliderId ? { ...slider, ordering: newOrdering } : slider)),
    )
    handleCancelEditOrdering(sliderId)
  }

  const handleOrderingChange = (sliderId, value) => {
    setTempOrdering({ ...tempOrdering, [sliderId]: value })
  }

  const handleMoveUp = (slider) => {
    const currentIndex = sortedSliders.findIndex((s) => s.id === slider.id)
    if (currentIndex > 0) {
      const prevSlider = sortedSliders[currentIndex - 1]
      const currentOrdering = slider.ordering || 0
      const prevOrdering = prevSlider.ordering || 0

      setMockSliders((prev) =>
        prev.map((s) => {
          if (s.id === slider.id) return { ...s, ordering: prevOrdering }
          if (s.id === prevSlider.id) return { ...s, ordering: currentOrdering }
          return s
        }),
      )
    }
  }

  const handleMoveDown = (slider) => {
    const currentIndex = sortedSliders.findIndex((s) => s.id === slider.id)
    if (currentIndex < sortedSliders.length - 1) {
      const nextSlider = sortedSliders[currentIndex + 1]
      const currentOrdering = slider.ordering || 0
      const nextOrdering = nextSlider.ordering || 0

      setMockSliders((prev) =>
        prev.map((s) => {
          if (s.id === slider.id) return { ...s, ordering: nextOrdering }
          if (s.id === nextSlider.id) return { ...s, ordering: currentOrdering }
          return s
        }),
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Slider - Ordering</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm Slider
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("ordering")}
                  >
                    <div className="flex items-center gap-1">
                      Thứ tự
                      {getSortIcon("ordering")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center gap-1">
                      Tiêu đề
                      {getSortIcon("title")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("active")}
                  >
                    <div className="flex items-center gap-1">
                      Trạng thái
                      {getSortIcon("active")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedSliders.map((slider, index) => (
                  <tr key={slider.id} className="hover:bg-gray-50">
                    {/* Ordering Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {editingOrdering[slider.id] ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={tempOrdering[slider.id] || 0}
                              onChange={(e) => handleOrderingChange(slider.id, e.target.value)}
                              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="0"
                            />
                            <button
                              onClick={() => handleSaveOrdering(slider.id)}
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Lưu"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCancelEditOrdering(slider.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="Hủy"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 min-w-[24px] px-2 py-1 rounded hover:bg-blue-50"
                              onClick={() => handleEditOrdering(slider.id, slider.ordering)}
                              title="Click để chỉnh sửa thứ tự"
                            >
                              {slider.ordering || 0}
                            </span>
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => handleMoveUp(slider)}
                                disabled={index === 0}
                                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed p-1 rounded hover:bg-gray-100"
                                title="Di chuyển lên"
                              >
                                <MoveUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMoveDown(slider)}
                                disabled={index === sortedSliders.length - 1}
                                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed p-1 rounded hover:bg-gray-100"
                                title="Di chuyển xuống"
                              >
                                <MoveDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={slider.image || "/placeholder.svg"}
                        alt={slider.title}
                        className="w-20 h-12 object-cover rounded border"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs">{slider.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">{slider.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          slider.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {slider.active ? "Hoạt động" : "Không hoạt động"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50" title="Sửa">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" title="Xóa">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Tính năng Ordering</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Click vào số thứ tự</strong> để chỉnh sửa trực tiếp
                  </li>
                  <li>
                    <strong>Nút mũi tên lên/xuống</strong> để di chuyển nhanh
                  </li>
                  <li>
                    <strong>Sắp xếp theo thứ tự</strong> bằng cách click header "Thứ tự"
                  </li>
                  <li>
                    <strong>Auto-assign ordering</strong> cho slider mới
                  </li>
                  <li>
                    <strong>Swap ordering</strong> khi di chuyển lên/xuống
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
