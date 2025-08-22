"use client"

import { useState, useMemo, useEffect } from "react"
import { useGetSlidersQuery, useDeleteSliderMutation, useUpdateSliderMutation } from "@/services/slider.api"
import SliderForm from "../../../components/admin/SliderForm"
import {
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Check,
  MoveUp,
  MoveDown,
} from "lucide-react"

export default function SlidersPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingSlider, setEditingSlider] = useState(null)

  // Filter and pagination states
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortField, setSortField] = useState("ordering") // Default sort by ordering
  const [sortDirection, setSortDirection] = useState("asc")
  const [sliders, setSliders] = useState([])

  // Ordering edit states
  const [editingOrdering, setEditingOrdering] = useState({})
  const [tempOrdering, setTempOrdering] = useState({})

  const { data: slidersData = {}, isLoading, error } = useGetSlidersQuery()
  const [deleteSlider] = useDeleteSliderMutation()
  const [updateSlider] = useUpdateSliderMutation()

  useEffect(() => {
    if (slidersData && slidersData.data) {
      setSliders(slidersData.data)
    }
  }, [slidersData])


  // Filter and sort logic
  const filteredAndSortedSliders = useMemo(() => {
    let filtered = [...sliders]

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((slider) => (statusFilter === "active" ? slider.active : !slider.active))
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (slider) =>
          slider.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          slider.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (sortField === "createdAt") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      if (sortField === "ordering") {
        aValue = aValue || 999999 // Put items without ordering at the end
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

    return filtered
  }, [sliders, statusFilter, searchTerm, sortField, sortDirection])

  // Pagination logic
  const totalItems = filteredAndSortedSliders.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSliders = filteredAndSortedSliders.slice(startIndex, endIndex)

  const handleEdit = (slider) => {
    setEditingSlider(slider)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    console.log(id);

    if (window.confirm("Bạn có chắc chắn muốn xóa slider này?")) {
      try {
        await deleteSlider(id).unwrap()
      } catch (error) {
        console.error("Lỗi khi xóa slider:", error)
      }
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingSlider(null)
  }

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

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Ordering functions
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

  const handleSaveOrdering = async (sliderId) => {
    try {
      const newOrdering = tempOrdering[sliderId]
      await updateSlider({
        id: sliderId,
        ordering: Number.parseInt(newOrdering),
      }).unwrap()

      // Clear editing state
      handleCancelEditOrdering(sliderId)
    } catch (error) {
      console.error("Lỗi khi cập nhật ordering:", error)
      alert("Có lỗi xảy ra khi cập nhật thứ tự!")
    }
  }

  const handleOrderingChange = (sliderId, value) => {
    setTempOrdering({ ...tempOrdering, [sliderId]: value })
  }

  // Move up/down functions
  const handleMoveUp = async (slider) => {
    const currentIndex = filteredAndSortedSliders.findIndex((s) => s.id === slider.id)
    if (currentIndex > 0) {
      const prevSlider = filteredAndSortedSliders[currentIndex - 1]
      const currentOrdering = slider.ordering || 0
      const prevOrdering = prevSlider.ordering || 0

      try {
        console.log(`Moving slider ${slider.id} up. Current: ${currentOrdering}, Prev: ${prevOrdering}`)

        // Swap ordering values
        const updatePromises = [
          updateSlider({
            id: slider.id,
            ordering: prevOrdering,
          }).unwrap(),
          updateSlider({
            id: prevSlider.id,
            ordering: currentOrdering,
          }).unwrap(),
        ]

        await Promise.all(updatePromises)
        console.log("Move up successful")
      } catch (error) {
        console.error("Lỗi khi di chuyển slider lên:", error)
        alert(`Có lỗi xảy ra khi di chuyển slider: ${error.data?.error || error.message}`)
      }
    }
  }

  const handleMoveDown = async (slider) => {
    const currentIndex = filteredAndSortedSliders.findIndex((s) => s.id === slider.id)
    if (currentIndex < filteredAndSortedSliders.length - 1) {
      const nextSlider = filteredAndSortedSliders[currentIndex + 1]
      const currentOrdering = slider.ordering || 0
      const nextOrdering = nextSlider.ordering || 0

      try {
        console.log(`Moving slider ${slider.id} down. Current: ${currentOrdering}, Next: ${nextOrdering}`)

        // Swap ordering values
        const updatePromises = [
          updateSlider({
            id: slider.id,
            ordering: nextOrdering,
          }).unwrap(),
          updateSlider({
            id: nextSlider.id,
            ordering: currentOrdering,
          }).unwrap(),
        ]

        await Promise.all(updatePromises)
        console.log("Move down successful")
      } catch (error) {
        console.error("Lỗi khi di chuyển slider xuống:", error)
        alert(`Có lỗi xảy ra khi di chuyển slider: ${error.data?.error || error.message}`)
      }
    }
  }

  // Auto-assign ordering for new sliders
  const getNextOrdering = () => {
    if (sliders.length === 0) return 1
    const maxOrdering = Math.max(...sliders.map((s) => s.ordering || 0))
    return maxOrdering + 1
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (isLoading) return <div className="text-center py-8">Đang tải...</div>
  if (error) return <div className="text-center py-8 text-red-600">Có lỗi xảy ra</div>



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Slider</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Thêm Slider
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <SliderForm
              slider={editingSlider}
              onClose={handleCloseForm}
              nextOrdering={editingSlider ? editingSlider.ordering : getNextOrdering()}
            />
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm slider..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>

          {/* Items per page */}
          <div>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5 / trang</option>
              <option value={10}>10 / trang</option>
              <option value={20}>20 / trang</option>
              <option value={50}>50 / trang</option>
            </select>
          </div>

          {/* Results info */}
          <div className="flex items-center text-sm text-gray-600">
            Hiển thị {startIndex + 1}-{Math.min(endIndex, totalItems)} của {totalItems} kết quả
          </div>
        </div>
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
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center gap-1">
                    Ngày tạo
                    {getSortIcon("createdAt")}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSliders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm || statusFilter !== "all" ? "Không tìm thấy slider nào" : "Chưa có slider nào"}
                  </td>
                </tr>
              ) : (
                currentSliders.map((slider, index) => (
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
                              className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 min-w-[24px]"
                              onClick={() => handleEditOrdering(slider.id, slider.ordering)}
                              title="Click để chỉnh sửa"
                            >
                              {slider.ordering || 0}
                            </span>
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => handleMoveUp(slider)}
                                disabled={index === 0}
                                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Di chuyển lên"
                              >
                                <MoveUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMoveDown(slider)}
                                disabled={index === currentSliders.length - 1}
                                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
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
                        src={slider.image || "/placeholder.svg?height=60&width=100"}
                        alt={slider.title}
                        className="w-20 h-12 object-cover rounded border"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs">{slider.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {slider.description || "Không có mô tả"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${slider.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                      >
                        {slider.active ? "Hoạt động" : "Không hoạt động"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {slider.createdAt ? new Date(slider.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(slider)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(slider.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">{startIndex + 1}</span> đến{" "}
                    <span className="font-medium">{Math.min(endIndex, totalItems)}</span> của{" "}
                    <span className="font-medium">{totalItems}</span> kết quả
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === "number" && handlePageChange(page)}
                        disabled={page === "..."}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : page === "..."
                            ? "border-gray-300 bg-white text-gray-500 cursor-default"
                            : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
