import { NextResponse } from "next/server"
import { getSliders, createSlider } from "../../../lib/sliders-data"

// Dữ liệu mẫu với ordering
const sliders = [
  {
    id: 1,
    title: "Khuyến mãi mùa hè 2024",
    description: "Giảm giá lên đến 50% cho tất cả sản phẩm thời trang mùa hè",
    image: "/placeholder.svg?height=400&width=800&text=Summer Sale",
    link: "/products/summer-sale",
    active: true,
    ordering: 1,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    title: "Bộ sưu tập mới 2024",
    description: "Khám phá những sản phẩm mới nhất trong bộ sưu tập xuân hè",
    image: "/placeholder.svg?height=400&width=800&text=New Collection",
    link: "/collections/new",
    active: true,
    ordering: 2,
    createdAt: "2024-01-14T15:45:00Z",
  },
  {
    id: 3,
    title: "Flash Sale cuối tuần",
    description: "Ưu đãi đặc biệt chỉ có vào cuối tuần với giá shock",
    image: "/placeholder.svg?height=400&width=800&text=Flash Sale",
    link: "/flash-sale",
    active: false,
    ordering: 3,
    createdAt: "2024-01-13T09:20:00Z",
  },
  {
    id: 4,
    title: "Sản phẩm công nghệ",
    description: "Những thiết bị công nghệ mới nhất với giá ưu đãi",
    image: "/placeholder.svg?height=400&width=800&text=Tech Products",
    link: "/categories/tech",
    active: true,
    ordering: 4,
    createdAt: "2024-01-12T14:15:00Z",
  },
  {
    id: 5,
    title: "Thời trang nam",
    description: "Bộ sưu tập thời trang nam phong cách và hiện đại",
    image: "/placeholder.svg?height=400&width=800&text=Men Fashion",
    link: "/categories/men",
    active: true,
    ordering: 5,
    createdAt: "2024-01-11T11:30:00Z",
  },
  {
    id: 6,
    title: "Thời trang nữ",
    description: "Xu hướng thời trang nữ mới nhất cho mùa này",
    image: "/placeholder.svg?height=400&width=800&text=Women Fashion",
    link: "/categories/women",
    active: false,
    ordering: 6,
    createdAt: "2024-01-10T16:45:00Z",
  },
  {
    id: 7,
    title: "Phụ kiện thời trang",
    description: "Các phụ kiện thời trang độc đáo và phong cách",
    image: "/placeholder.svg?height=400&width=800&text=Accessories",
    link: "/categories/accessories",
    active: true,
    ordering: 7,
    createdAt: "2024-01-09T13:20:00Z",
  },
  {
    id: 8,
    title: "Giày dép thời trang",
    description: "Bộ sưu tập giày dép đa dạng cho mọi phong cách",
    image: "/placeholder.svg?height=400&width=800&text=Shoes",
    link: "/categories/shoes",
    active: true,
    ordering: 8,
    createdAt: "2024-01-08T10:15:00Z",
  },
]

const nextId = 9

export async function GET() {
  return NextResponse.json(getSliders())
}

export async function POST(request) {
  try {
    const body = await request.json()
    const newSlider = createSlider(body)
    return NextResponse.json(newSlider, { status: 201 })
  } catch (error) {
    console.error("POST Error:", error)
    return NextResponse.json({ error: "Lỗi khi tạo slider" }, { status: 500 })
  }
}
