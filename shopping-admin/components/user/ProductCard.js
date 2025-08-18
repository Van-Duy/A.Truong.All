"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Truck, Clock } from "lucide-react"

export default function ProductCard({ product, viewMode = "grid" }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const calculateDiscountPercent = (originalPrice, salePrice) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
  }

  if (viewMode === "list") {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex space-x-4">
          {/* Product Image */}
          <div className="relative w-32 h-40 flex-shrink-0">
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.image || "/placeholder.svg?height=160&width=128"}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
            </Link>

            {/* Discount badge */}
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                -{calculateDiscountPercent(product.originalPrice, product.price)}%
              </div>
            )}

            {/* Badges */}
            {product.badges?.map((badge, index) => (
              <div
                key={index}
                className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                  badge === "AD"
                    ? "bg-gray-800 text-white"
                    : badge === "FREESHIP XTRA"
                      ? "bg-blue-500 text-white"
                      : badge === "TOP DEAL"
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white"
                }`}
              >
                {badge}
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <Link href={`/product/${product.id}`}>
              <h3 className="text-base font-medium text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors mb-2">
                {product.name}
              </h3>
            </Link>

            {/* Author/Publisher */}
            {product.author && <p className="text-sm text-gray-600 mb-1">{product.author}</p>}
            {product.publisher && <p className="text-xs text-gray-500 mb-2">{product.publisher}</p>}

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">Đã bán {product.reviewCount || 0}</span>
              </div>
            )}

            {/* Price */}
            <div className="mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-red-500 font-semibold text-lg">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-gray-400 text-sm line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>

            {/* Delivery Info */}
            {product.deliveryDate && (
              <div className="flex items-center space-x-1 text-xs text-gray-600 mb-2">
                <Truck className="w-3 h-3" />
                <span>{product.deliveryDate}</span>
              </div>
            )}

            {/* Official Badge */}
            {product.isOfficial && (
              <div className="flex items-center space-x-1 mb-2">
                <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>CHÍNH HÃNG</span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Grid view (existing code)
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg?height=300&width=225"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        </Link>

        {/* Discount badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            -{calculateDiscountPercent(product.originalPrice, product.price)}%
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>

        {/* Badges */}
        {product.badges?.map((badge, index) => (
          <div
            key={index}
            className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-semibold ${
              badge === "AD"
                ? "bg-gray-800 text-white"
                : badge === "FREESHIP XTRA"
                  ? "bg-blue-500 text-white"
                  : badge === "TOP DEAL"
                    ? "bg-red-500 text-white"
                    : "bg-gray-500 text-white"
            }`}
          >
            {badge}
          </div>
        ))}
      </div>

      <div className="p-3">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Author */}
        {product.author && <p className="text-xs text-gray-600 mb-1 uppercase">{product.author}</p>}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">Đã bán {product.reviewCount || 0}</span>
          </div>
        )}

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-red-500 font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-gray-400 text-sm line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>

        {/* Official Badge */}
        {product.isOfficial && (
          <div className="mb-2">
            <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium inline-flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>CHÍNH HÃNG</span>
            </div>
          </div>
        )}

        {/* Delivery info */}
        {product.deliveryDate && (
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            <span>{product.deliveryDate}</span>
          </div>
        )}
      </div>
    </div>
  )
}
