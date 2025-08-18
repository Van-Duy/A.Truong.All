import { NextResponse } from "next/server"

// Mock cart data - in real app, this would be stored in database or session
const cartItems = []

export async function PUT(request) {
  try {
    const { itemId, quantity } = await request.json()

    const itemIndex = cartItems.findIndex((item) => item.id === itemId)

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cartItems.splice(itemIndex, 1)
      } else {
        cartItems[itemIndex].quantity = quantity
      }

      return NextResponse.json({
        message: "Cart updated",
        cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      })
    }

    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  } catch (error) {
    console.error("Update cart error:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}
