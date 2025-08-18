import { NextResponse } from "next/server"
import { getProducts } from "@/lib/products-data"

export async function GET(request, { params }) {
  try {
    const productId = Number.parseInt(params.id)
    const allProducts = getProducts()

    // Find the current product to get its category
    const currentProduct = allProducts.find((p) => p.id === productId)
    if (!currentProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get related products from the same category, excluding current product
    const relatedProducts = allProducts
      .filter((product) => product.categoryId === currentProduct.categoryId && product.id !== productId)
      .slice(0, 8) // Limit to 8 related products

    return NextResponse.json(relatedProducts)
  } catch (error) {
    console.error("Error fetching related products:", error)
    return NextResponse.json({ error: "Failed to fetch related products" }, { status: 500 })
  }
}
