import { NextResponse } from "next/server"

// Mock product data - in real app, this would come from database
const products = {
  1: {
    id: "1",
    name: "Điện thoại AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S Pen - Hàng Chính Hãng",
    brand: "Samsung",
    category: "smartphones",
    rating: 5.0,
    reviewCount: 23,
    soldCount: "2k",
    originalPrice: 32590000,
    price: 21990000,
    discount: 33,
    images: [
      "/placeholder.svg?height=500&width=400&text=Samsung+S24+Ultra+Main",
      "/placeholder.svg?height=500&width=400&text=Samsung+S24+Ultra+Back",
      "/placeholder.svg?height=500&width=400&text=Samsung+S24+Ultra+Side",
      "/placeholder.svg?height=500&width=400&text=Samsung+S24+Ultra+Screen",
      "/placeholder.svg?height=500&width=400&text=Samsung+S24+Ultra+Camera",
      "/placeholder.svg?height=500&width=400&text=Samsung+S24+Ultra+Box",
    ],
    colors: [
      { name: "Tím", value: "purple", image: "/placeholder.svg?height=50&width=50&text=Purple" },
      { name: "Đen", value: "black", image: "/placeholder.svg?height=50&width=50&text=Black" },
    ],
    storageOptions: [
      { name: "128GB/512GB", value: "128gb", price: 21990000 },
      { name: "256GB/1TB", value: "256gb", price: 24990000 },
    ],
    description:
      "Điện thoại Samsung Galaxy S24 Ultra với camera 200MP, zoom 100x và S Pen tích hợp. Thiết kế cao cấp, hiệu năng mạnh mẽ.",
    features: [
      "Camera 200MP với zoom 100x",
      "S Pen tích hợp",
      "AI Photography",
      "Màn hình Dynamic AMOLED 2X 6.8 inch",
      "Chip Snapdragon 8 Gen 3",
      "Pin 5000mAh sạc nhanh 45W",
    ],
    specifications: {
      screen: "6.8 inch, Dynamic AMOLED 2X",
      os: "Android 14",
      camera: "200MP + 50MP + 12MP + 10MP",
      frontCamera: "12MP",
      chip: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "512GB",
      battery: "5000mAh",
      charging: "45W",
    },
    warranty: "12 Tháng",
    warrantyType: "Điện tử",
    warrantyProvider: "Bảo hành chính hãng",
    seller: {
      name: "Tiki Trading",
      isOfficial: true,
      rating: 4.7,
      reviewCount: "6.51k+",
    },
    shipping: {
      location: "Q. 1, P. Bến Nghé, Hồ Chí Minh",
      fastDelivery: {
        available: true,
        time: "2h",
        fee: 25000,
        freeThreshold: 45000,
      },
      standardDelivery: {
        available: true,
        time: "8h - 12h, 12/08",
        fee: 16500,
        freeThreshold: 100000,
      },
    },
    services: [
      {
        name: "Ưu đãi đến 600k với thẻ TikiCard",
        type: "credit",
        action: "Đăng ký",
      },
      {
        name: "Trả góp từ 1.832.500 ₫/tháng",
        type: "installment",
        action: "Đăng ký",
      },
    ],
    guarantees: [
      {
        icon: "shield",
        title: "Được đồng kiểm khi nhận hàng",
        description: "",
      },
      {
        icon: "money-back",
        title: "Được hoàn tiền 200% nếu là hàng giả.",
        description: "",
      },
      {
        icon: "return",
        title: "Đổi trả miễn phí trong 30 ngày. Được đổi ý.",
        description: "Chi tiết",
      },
    ],
    stock: 50,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
}

export async function GET(request, { params }) {
  try {
    const { id } = params
    const product = products[id]

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
