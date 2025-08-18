import { NextResponse } from "next/server"

// Mock cart data - in real app, this would be stored in database or session
const cartItems = []

export async function DELETE(request) {
  try {
    const { itemId } = await request.json()

    const itemIndex = cartItems.findIndex((item) => item.id === itemId)

    if (itemIndex >= 0) {
      cartItems.splice(itemIndex, 1)

      return NextResponse.json({
        message: "Item removed from cart",
        cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      })
    }

    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  } catch (error) {
    console.error("Remove from cart error:", error)
    return NextResponse.json({ error: "Failed to remove item from cart" }, { status: 500 })
  }
}
