"use client"

import { useState, useMemo } from "react"
import {
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  Check,
  X,
  MoveUp,
  MoveDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  FolderOpen,
  Folder,
} from "lucide-react"

export default function CategoryManagementPreview() {
  const [mockCategories, setMockCategories] = useState([
    {
      id: 1,
      name: "Thời trang",
      slug: "thoi-trang",
      description: "Các sản phẩm thời trang nam nữ",
      image: "/placeholder.svg?height=200&width=300&text=Fashion",
      parentId: null,
      ordering: 1,
      status: "active",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      name: "Thời trang nam",
      slug: "thoi-trang-nam",
      description: "Quần áo, phụ kiện dành cho nam giới",
      image: "/placeholder.svg?height=200&width=300&text=Men Fashion",
      parentId: 1,
      ordering: 1,
      status: "active",
      createdAt: "2024-01-14T15:45:00Z",
    },
    {
      id: 3,
      name: "Thời trang nữ",
      slug: "thoi-trang-nu",
      description: "Quần áo, phụ kiện dành cho nữ giới",
      image: "/placeholder.svg?height=200&width=300&text=Women Fashion",
      parentId: 1,
      ordering: 2,
      status: "active",
      createdAt: "2024-01-13T09:20:00Z",
    },
    {
      id: 4,
      name: "Công nghệ",
      slug: "cong-nghe",
      description: "Các sản phẩm công nghệ, điện tử",
      image: "/placeholder.svg?height=200&width=300&text=Technology",
      parentId: null,
      ordering: 2,
      status: "active",
      createdAt: "2024-01-12T14:15:00Z",
    },
    {
      id: 5,
      name: "Điện thoại",
      slug: "dien-thoai",
      description: "Smartphone và phụ kiện",
      image: "/placeholder.svg?height=200&width=300&text=Phones",
      parentId: 4,
      ordering: 1,
      status: "active",
      createdAt: "2024-01-11T11:30:00Z",
    },
    {
      id: 6,
      name: "Laptop",
      slug: "laptop",
      description: "Máy tính xách tay các loại",
      image: "/placeholder.svg?height=200&width=300&text=Laptops",
      parentId: 4,
      ordering: 2,
      status: "inactive",
      createdAt: "2024-01-10T16:45:00Z",
    },
  ])

  const [statusFilter, setStatusFilter] = useState("all")
  const [parentFilter, setParentFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("ordering")
  const [sortDirection, setSortDirection] = useState("asc")
  const [editingOrdering, setEditingOrdering] = useState({})
  const [tempOrdering, setTempOrdering] = useState({})

  // Get parent categories for filter
  const parentCategories = mockCategories.filter((c) => c.parentId === null)

  // Filter and sort logic
  const filteredAndSortedCategories = useMemo(() => {
    let filtered = [...mockCategories]

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
  }, [mockCategories, statusFilter, parentFilter, searchTerm, sortField, sortDirection])

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

  const handleSaveOrdering = (categoryId) => {
    const newOrdering = Number.parseInt(tempOrdering[categoryId])
    setMockCategories((prev) =>
      prev.map((category) => (category.id === categoryId ? { ...category, ordering: newOrdering } : category)),
    )
    handleCancelEditOrdering(categoryId)
  }

  const handleOrderingChange = (categoryId, value) => {
    setTempOrdering({ ...tempOrdering, [categoryId]: value })
  }

  const getParentName = (parentId) => {
    if (!parentId) return "Danh mục gốc"
    const parent = mockCategories.find((c) => c.id === parentId)
    return parent ? parent.name : "N/A"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý Danh mục</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm Danh mục
          </button>
        </div>

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
                }}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
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
                onChange={(e) => setParentFilter(e.target.value)}
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
              <select className="px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
                <option value={50}>50 / trang</option>
              </select>
            </div>

            {/* Results info */}
            <div className="flex items-center text-sm text-gray-600">
              Hiển thị 1-{filteredAndSortedCategories.length} của {filteredAndSortedCategories.length} kết quả
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedCategories.map((category, index) => (
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
                              className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600 min-w-[24px] px-2 py-1 rounded hover:bg-blue-50"
                              onClick={() => handleEditOrdering(category.id, category.ordering)}
                              title="Click để chỉnh sửa thứ tự"
                            >
                              {category.ordering || 0}
                            </span>
                            <div className="flex flex-col gap-1">
                              <button
                                disabled={index === 0}
                                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed p-1 rounded hover:bg-gray-100"
                                title="Di chuyển lên"
                              >
                                <MoveUp className="w-3 h-3" />
                              </button>
                              <button
                                disabled={index === filteredAndSortedCategories.length - 1}
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
                        src={category.image || "/placeholder.svg"}
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
              <h3 className="text-sm font-medium text-blue-800">Tính năng Quản lý Danh mục</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Hierarchical Categories:</strong> Hỗ trợ danh mục cha-con
                  </li>
                  <li>
                    <strong>Auto Slug Generation:</strong> Tự động tạo slug từ tên danh mục
                  </li>
                  <li>
                    <strong>Image Upload:</strong> Upload hình ảnh cho danh mục
                  </li>
                  <li>
                    <strong>Ordering System:</strong> Sắp xếp thứ tự hiển thị
                  </li>
                  <li>
                    <strong>Status Management:</strong> Quản lý trạng thái active/inactive
                  </li>
                  <li>
                    <strong>Advanced Filtering:</strong> Lọc theo trạng thái, danh mục cha
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
