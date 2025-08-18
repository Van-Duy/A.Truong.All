import { NextResponse } from "next/server"

// Mock cart data - in real app, this would be stored in database or session
const cartItems = []

export async function POST(request) {
  try {
    const newItem = await request.json()

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.productId === newItem.productId &&
        item.color?.name === newItem.color?.name &&
        item.storage?.size === newItem.storage?.size,
    )

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cartItems[existingItemIndex].quantity += newItem.quantity
    } else {
      // Add new item to cart
      cartItems.push({
        id: Date.now(),
        ...newItem,
      })
    }

    return NextResponse.json({
      message: "Item added to cart",
      cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    })
  } catch (error) {
    console.error("Add to cart error:", error)
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
  }
}
