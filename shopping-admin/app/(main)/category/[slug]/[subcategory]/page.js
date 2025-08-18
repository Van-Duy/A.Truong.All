"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import ProductCard from "@/components/user/ProductCard"

export default function SubcategoryPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadSubcategoryData = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data for subcategory
      const mockSubcategoryProducts = [
        {
          id: 1,
          name: "Oxford Advanced Learner's Dictionary",
          price: 450000,
          originalPrice: 550000,
          image: "/placeholder.svg?height=300&width=225&text=Oxford+Dictionary",
          rating: 4.8,
          reviewCount: 156,
          author: "OXFORD UNIVERSITY PRESS",
          publisher: "Oxford",
          deliveryDate: "Giao thứ 5, 14/08",
          isOfficial: true,
          badges: ["AD"],
        },
        // Add more products...
      ]

      setProducts(mockSubcategoryProducts)
      setLoading(false)
    }

    loadSubcategoryData()
  }, [params.slug, params.subcategory])

  const categoryName = params.slug === "books" ? "Nhà Sách Tiki" : params.slug
  const subcategoryName = params.subcategory?.replace(/-/g, " ")

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/category/${params.slug}`} className="hover:text-blue-600">
            {categoryName}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium capitalize">{subcategoryName}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 capitalize">{subcategoryName}</h1>

          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không có sản phẩm nào trong danh mục này.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
