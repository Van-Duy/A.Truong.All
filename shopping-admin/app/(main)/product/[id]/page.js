"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  Heart,
  Share2,
  Plus,
  Minus,
  Star,
  MapPin,
  Truck,
  Shield,
  CreditCard,
  ChevronRight,
  Clock,
  Award,
} from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedStorage, setSelectedStorage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
    fetchRelatedProducts()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      const data = await response.json()
      setProduct(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching product:", error)
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}/related`)
      const data = await response.json()
      setRelatedProducts(data)
    } catch (error) {
      console.error("Error fetching related products:", error)
    }
  }

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        productId: product.id,
        productName: product.name,
        productImage: product.images[0],
        price: getCurrentPrice(),
        quantity: quantity,
        color: product.colors[selectedColor],
        storage: product.storageOptions[selectedStorage],
      }

      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      })

      if (response.ok) {
        alert("Đã thêm vào giỏ hàng!")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  const getCurrentPrice = () => {
    if (!product) return 0
    const basePrice = product.price
    const storagePrice = product.storageOptions[selectedStorage]?.priceAdd || 0
    return basePrice + storagePrice
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Quay lại cửa hàng
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/category/electronics" className="hover:text-blue-600">
              Điện Thoại - Máy Tính Bảng
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/category/electronics/smartphones" className="hover:text-blue-600">
              Điện thoại Smartphone
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4">
              {/* Brand Header */}
              <div className="flex items-center justify-center mb-4 bg-black text-white py-2 rounded">
                <span className="font-bold text-sm">TIKI TRADING × {product.brand.toUpperCase()}</span>
              </div>

              {/* Main Image */}
              <div className="relative mb-4">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 object-contain"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-6 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded p-1 ${
                      selectedImage === index ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-12 object-contain" />
                  </button>
                ))}
              </div>

              {/* Product Features */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center text-blue-600 mb-2">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Ưu điểm & lưu ý của sản phẩm</span>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6">
              {/* Badges */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                  30 NGÀY ĐỔI TRẢ
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">CHÍNH HÃNG</span>
              </div>

              {/* Product Title */}
              <h1 className="text-xl font-medium text-gray-900 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-600 mb-4">Thương hiệu: {product.brand}</p>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviewCount})</span>
                </div>
                <span className="text-sm text-gray-600">Đã bán {product.soldCount}</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-red-600">{formatPrice(getCurrentPrice())}</span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                </div>
                <span className="text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Màu</h3>
                <div className="flex space-x-3">
                  {product.colors?.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`flex items-center space-x-2 px-3 py-2 border rounded-lg ${
                        selectedColor === index ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      }`}
                    >
                      <img src={color.image || "/placeholder.svg"} alt={color.name} className="w-6 h-6 rounded" />
                      <span className="text-sm">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Kích cỡ</h3>
                <div className="flex space-x-3">
                  {product.storageOptions?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedStorage(index)}
                      className={`px-4 py-2 border rounded-lg text-sm ${
                        selectedStorage === index ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      }`}
                    >
                      {option.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Thông tin vận chuyển</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span>Giao đến Q. 1, P. Bến Nghé, Hồ Chí Minh</span>
                    <button className="text-blue-600 ml-2">Đổi</button>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-red-600 text-white text-xs px-2 py-1 rounded mr-2">NOW</div>
                    <span>Giao siêu tốc 2h</span>
                  </div>
                  <div className="text-gray-600 ml-6">Trước 14h hôm nay: Miễn phí 25.000đ</div>
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 text-gray-500 mr-2" />
                    <span>Giao đúng sáng mai</span>
                  </div>
                  <div className="text-gray-600 ml-6">8h - 12h, 12/08: Miễn phí 16.500đ</div>
                  <div className="text-green-600 text-sm">🚚 Freeship 10k đơn từ 45k, Freeship 25k đơn từ 100k</div>
                </div>
              </div>

              {/* Additional Services */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Dịch vụ bổ sung</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm">Ưu đãi đến 600k với thẻ TikiCard</span>
                    </div>
                    <button className="text-blue-600 text-sm">Đăng ký</button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-pink-600 text-xs">02</span>
                      </div>
                      <span className="text-sm">Trả góp từ 1.832.500 đ/tháng</span>
                    </div>
                    <button className="text-blue-600 text-sm">Đăng ký</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              {/* Seller Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">TIKI</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">Tiki Trading</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-2">OFFICIAL</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>4.7</span>
                      <Star className="w-3 h-3 text-yellow-400 fill-current ml-1" />
                      <span className="ml-1">(6.51k+ đánh giá)</span>
                    </div>
                  </div>
                </div>
                <button>
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Variant Info */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <img
                    src={product.colors[selectedColor]?.image || "/placeholder.svg"}
                    alt=""
                    className="w-12 h-12 rounded mr-3"
                  />
                  <div>
                    <div className="font-medium">
                      {product.colors[selectedColor]?.name}, {product.storageOptions[selectedStorage]?.size}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Số Lượng</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-16 text-center border border-gray-300 rounded py-1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Tạm tính</h3>
                <div className="text-2xl font-bold text-red-600">{formatPrice(getCurrentPrice() * quantity)}</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Mua ngay
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Thêm vào giỏ
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Mua trả góp - trả sau
                </button>
              </div>

              {/* Vinamilk Banner */}
              <div className="mt-6">
                <img
                  src="/placeholder.svg?height=120&width=300&text=Vinamilk+EST+1976"
                  alt="Vinamilk"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Warranty & Guarantees */}
        <div className="mt-8 bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Thông tin bảo hành</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Thời gian bảo hành: 12 Tháng</h3>
              <p className="text-gray-600 mb-2">Hình thức bảo hành: Điện tử</p>
              <p className="text-gray-600 mb-2">Nơi bảo hành: Bảo hành chính hãng</p>
              <p className="text-gray-600">
                Hướng dẫn bảo hành: <button className="text-blue-600">Xem chi tiết</button>
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">An tâm mua sắm</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Được đồng kiểm khi nhận hàng</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Được hoàn tiền 200% nếu là hàng giả</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Đổi trả miễn phí trong 30 ngày. Được đổi ý.</span>
                  <button className="text-blue-600 ml-2 text-sm">Chi tiết</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Sản phẩm tương tự</h2>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <span className="mr-1">Xem thêm</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <img
                    src={relatedProduct.images[0] || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    className="w-full h-32 object-contain mb-3"
                  />
                  <h3 className="text-sm font-medium mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(relatedProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">({relatedProduct.reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600 font-bold">{formatPrice(relatedProduct.price)}</span>
                    {relatedProduct.discount > 0 && (
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(relatedProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
