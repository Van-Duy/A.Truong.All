// Shared data store cho categories
const categories = [
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
  {
    id: 7,
    name: "Gia dụng",
    slug: "gia-dung",
    description: "Đồ gia dụng, nội thất",
    image: "/placeholder.svg?height=200&width=300&text=Home",
    parentId: null,
    ordering: 3,
    status: "active",
    createdAt: "2024-01-09T13:20:00Z",
  },
  {
    id: 8,
    name: "Nội thất",
    slug: "noi-that",
    description: "Bàn ghế, tủ kệ, giường ngủ",
    image: "/placeholder.svg?height=200&width=300&text=Furniture",
    parentId: 7,
    ordering: 1,
    status: "active",
    createdAt: "2024-01-08T10:15:00Z",
  },
]

let nextId = 9

export function getCategories() {
  return categories
}

export function getCategoryById(id) {
  return categories.find((c) => c.id === id)
}

export function getParentCategories() {
  return categories.filter((c) => c.parentId === null)
}

export function getChildCategories(parentId) {
  return categories.filter((c) => c.parentId === parentId)
}

export function createCategory(categoryData) {
  const newCategory = {
    id: nextId++,
    ...categoryData,
    ordering: categoryData.ordering || Math.max(...categories.map((c) => c.ordering || 0)) + 1,
    createdAt: new Date().toISOString(),
  }
  categories.push(newCategory)
  return newCategory
}

export function updateCategory(id, updateData) {
  const categoryIndex = categories.findIndex((c) => c.id === id)
  if (categoryIndex === -1) {
    return null
  }

  categories[categoryIndex] = {
    ...categories[categoryIndex],
    ...updateData,
    updatedAt: new Date().toISOString(),
  }

  return categories[categoryIndex]
}

export function deleteCategory(id) {
  const categoryIndex = categories.findIndex((c) => c.id === id)
  if (categoryIndex === -1) {
    return false
  }

  // Check if category has children
  const hasChildren = categories.some((c) => c.parentId === id)
  if (hasChildren) {
    return { error: "Không thể xóa danh mục có danh mục con" }
  }

  categories.splice(categoryIndex, 1)
  return true
}

// Helper function to generate slug from name
export function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[đĐ]/g, "d") // Replace đ with d
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim("-") // Remove leading/trailing hyphens
}
