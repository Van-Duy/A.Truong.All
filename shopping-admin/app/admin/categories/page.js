"use client"

import { useState, useMemo } from "react"
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../store/slices/categoryApi"
import CategoryForm from "../../../components/admin/CategoryForm"
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
  FolderOpen,
  Folder,
} from "lucide-react"

export default function CategoriesPage() {
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  // Filter and pagination states
  const [statusFilter, setStatusFilter] = useState("all")
  const [parentFilter, setParentFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [sortField, setSortField] = useState("ordering")
  const [sortDirection, setSortDirection] = useState("asc")

  // Ordering edit states
  const [editingOrdering, setEditingOrdering] = useState({})
  const [tempOrdering, setTempOrdering] = useState({})

  const { data: categories = [], isLoading, error } = useGetCategoriesQuery()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()

  // Get parent categories for filter
  const parentCategories = categories.filter((c) => c.parentId === null)

  // Filter and sort logic
  const filteredAndSortedCategories = useMemo(() => {
    let filtered = [...categories]

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((category) => category.status === statusFilter)
    }

    // Filter by parent
    if (parentFilter !== "all") {
      if (parentFilter === "root") {
        filtered = filtered.filter((category) => category.parentId === null)
      } else {
        filtered = filtered.filter((category) => category.parentId === Number.parseInt(parentFilter))
      }
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description.toLowerCase().includes(searchTerm.toLowerCase()),
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

    return filtered
  }, [categories, statusFilter, parentFilter, searchTerm, sortField, sortDirection])

  // Pagination logic
  const totalItems = filteredAndSortedCategories.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCategories = filteredAndSortedCategories.slice(startIndex, endIndex)

  const handleEdit = (category) => {
    setEditingCategory(category)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await deleteCategory(id).unwrap()
      } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error)
        if (error.data?.error) {
          alert(error.data.error)
        } else {
          alert("Có lỗi xảy ra khi xóa danh mục!")
        }
      }
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingCategory(null)
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
  const handleEditOrdering = (categoryId, currentOrdering) => {
    setEditingOrdering({ ...editingOrdering, [categoryId]: true })
    setTempOrdering({ ...tempOrdering, [categoryId]: currentOrdering || 0 })
  }

  const handleCancelEditOrdering = (categoryId) => {
    const newEditingOrdering = { ...editingOrdering }
    const newTempOrdering = { ...tempOrdering }
    delete newEditingOrdering[categoryId]
    delete newTempOrdering[categoryId]
    setEditingOrdering(newEditingOrdering)
    setTempOrdering(newTempOrdering)
  }

  const handleSaveOrdering = async (categoryId) => {
    try {
      const newOrdering = tempOrdering[categoryId]
      await updateCategory({
        id: categoryId,
        ordering: Number.parseInt(newOrdering),
      }).unwrap()

      handleCancelEditOrdering(categoryId)
    } catch (error) {
      console.error("Lỗi khi cập nhật ordering:", error)
      alert("Có lỗi xảy ra khi cập nhật thứ tự!")
    }
  }

  const handleOrderingChange = (categoryId, value) => {
    setTempOrdering({ ...tempOrdering, [categoryId]: value })
  }

  // Move up/down functions
  const handleMoveUp = async (category) => {
    const currentIndex = filteredAndSortedCategories.findIndex((c) => c.id === category.id)
    if (currentIndex > 0) {
      const prevCategory = filteredAndSortedCategories[currentIndex - 1]
      const currentOrdering = category.ordering || 0
      const prevOrdering = prevCategory.ordering || 0

      try {
        const updatePromises = [
          updateCategory({
            id: category.id,
            ordering: prevOrdering,
          }).unwrap(),
          updateCategory({
            id: prevCategory.id,
            ordering: currentOrdering,
          }).unwrap(),
        ]

        await Promise.all(updatePromises)
      } catch (error) {
        console.error("Lỗi khi di chuyển danh mục lên:", error)
        alert(`Có lỗi xảy ra khi di chuyển danh mục: ${error.data?.error || error.message}`)
      }
    }
  }

  const handleMoveDown = async (category) => {
    const currentIndex = filteredAndSortedCategories.findIndex((c) => c.id === category.id)
    if (currentIndex < filteredAndSortedCategories.length - 1) {
      const nextCategory = filteredAndSortedCategories[currentIndex + 1]
      const currentOrdering = category.ordering || 0
      const nextOrdering = nextCategory.ordering || 0

      try {
        const updatePromises = [
          updateCategory({
            id: category.id,
            ordering: nextOrdering,
          }).unwrap(),
          updateCategory({
            id: nextCategory.id,
            ordering: currentOrdering,
          }).unwrap(),
        ]

        await Promise.all(updatePromises)
      } catch (error) {
        console.error("Lỗi khi di chuyển danh mục xuống:", error)
        alert(`Có lỗi xảy ra khi di chuyển danh mục: ${error.data?.error || error.message}`)
      }
    }
  }

  // Auto-assign ordering for new categories
  const getNextOrdering = () => {
    if (categories.length === 0) return 1
    const maxOrdering = Math.max(...categories.map((c) => c.ordering || 0))
    return maxOrdering + 1
  }

  // Get parent category name
  const getParentName = (parentId) => {
    if (!parentId) return "Danh mục gốc"
    const parent = categories.find((c) => c.id === parentId)
    return parent ? parent.name : "N/A"
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
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Danh mục</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Thêm Danh mục
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CategoryForm
              category={editingCategory}
              onClose={handleCloseForm}
              nextOrdering={editingCategory ? editingCategory.ordering : getNextOrdering()}
            />
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
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

          {/* Parent Filter */}
          <div>
            <select
              value={parentFilter}
              onChange={(e) => {
                setParentFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="root">Danh mục gốc</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
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
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    Tên danh mục
                    {getSortIcon("name")}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục cha
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Trạng thái
                    {getSortIcon("status")}
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
              {currentCategories.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm || statusFilter !== "all" || parentFilter !== "all"
                      ? "Không tìm thấy danh mục nào"
                      : "Chưa có danh mục nào"}
                  </td>
                </tr>
              ) : (
                currentCategories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    {/* Ordering Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {editingOrdering[category.id] ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={tempOrdering[category.id] || 0}
                              onChange={(e) => handleOrderingChange(category.id, e.target.value)}
                              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="0"
                            />
                            <button
                              onClick={() => handleSaveOrdering(category.id)}
                              className="text-green-600 hover:text-green-800 p-1"
                              title="Lưu"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCancelEditOrdering(category.id)}
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
                              onClick={() => handleEditOrdering(category.id, category.ordering)}
                              title="Click để chỉnh sửa"
                            >
                              {category.ordering || 0}
                            </span>
                            <div className="flex flex-col gap-1">
                              <button
                                onClick={() => handleMoveUp(category)}
                                disabled={index === 0}
                                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Di chuyển lên"
                              >
                                <MoveUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleMoveDown(category)}
                                disabled={index === currentCategories.length - 1}
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
                        src={category.image || "/placeholder.svg?height=60&width=100"}
                        alt={category.name}
                        className="w-20 h-12 object-cover rounded border"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {category.parentId ? (
                          <Folder className="w-4 h-4 text-gray-400" />
                        ) : (
                          <FolderOpen className="w-4 h-4 text-blue-500" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          {category.description && (
                            <div className="text-xs text-gray-500 max-w-xs truncate">{category.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{category.slug}</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{getParentName(category.parentId)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          category.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {category.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.createdAt ? new Date(category.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
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
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === currentPage
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
