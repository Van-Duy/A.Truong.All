// lib/products-data.js

const productsData = [
  {
    id: 1,
    name: "Điện thoại AI Samsung Galaxy S24 Ultra, Camera 200MP Zoom 100x, S Pen - Hàng Chính Hãng",
    brand: "Samsung",
    categoryId: 1,
    price: 21990000,
    originalPrice: 32590000,
    discount: 33,
    rating: 5.0,
    reviewCount: 23,
    soldCount: 2000,
    images: [
      "/placeholder.svg?height=400&width=400&text=Samsung+S24+Ultra+Main",
      "/placeholder.svg?height=400&width=400&text=Samsung+S24+Ultra+2",
      "/placeholder.svg?height=400&width=400&text=Samsung+S24+Ultra+3",
      "/placeholder.svg?height=400&width=400&text=Samsung+S24+Ultra+4",
      "/placeholder.svg?height=400&width=400&text=Samsung+S24+Ultra+5",
      "/placeholder.svg?height=400&width=400&text=Samsung+S24+Ultra+6",
    ],
    colors: [
      {
        name: "Tím",
        image: "/placeholder.svg?height=60&width=60&text=Purple",
      },
      {
        name: "Đen",
        image: "/placeholder.svg?height=60&width=60&text=Black",
      },
    ],
    storageOptions: [
      {
        size: "128GB/512GB",
        priceAdd: 0,
      },
    ],
    features: [
      "Camera 200MP với zoom quang học 100x",
      "Chip Snapdragon 8 Gen 3 mạnh mẽ",
      "S Pen tích hợp với nhiều tính năng AI",
      "Màn hình Dynamic AMOLED 2X 6.8 inch",
      "Pin 5000mAh sạc nhanh 45W",
      "Khung Titanium cao cấp, bền bỉ",
    ],
    specifications: {
      screen: "6.8 inch, Dynamic AMOLED 2X",
      os: "Android 14, One UI 6.1",
      camera: "200MP + 50MP + 12MP + 12MP",
      chip: "Snapdragon 8 Gen 3",
      ram: "12GB",
      storage: "512GB",
      battery: "5000mAh",
    },
    warranty: {
      period: "12 tháng",
      type: "Điện tử",
      provider: "Bảo hành chính hãng",
    },
    seller: {
      name: "Tiki Trading",
      official: true,
      rating: 4.7,
      reviewCount: 6510,
    },
    shipping: {
      location: "Q. 1, P. Bến Nghé, Hồ Chí Minh",
      methods: [
        {
          type: "now",
          name: "Giao siêu tốc 2h",
          fee: 25000,
          freeFrom: 0,
          time: "Trước 14h hôm nay",
        },
        {
          type: "standard",
          name: "Giao đúng sáng mai",
          fee: 16500,
          freeFrom: 0,
          time: "8h - 12h, 12/08",
        },
      ],
    },
    services: [
      {
        name: "Ưu đãi đến 600k với thẻ TikiCard",
        icon: "credit-card",
        link: "/tikicard",
      },
      {
        name: "Trả góp từ 1.832.500 đ/tháng",
        icon: "installment",
        link: "/installment",
      },
    ],
    guarantees: [
      "Được đồng kiểm khi nhận hàng",
      "Được hoàn tiền 200% nếu là hàng giả",
      "Đổi trả miễn phí trong 30 ngày. Được đổi ý.",
    ],
  },
  // ** rest of code here **
]

module.exports = productsData
