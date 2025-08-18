import { NextResponse } from "next/server"

// Mock cart data - in real app, this would be stored in database or session
let cartItems = []

export async function GET() {
  return NextResponse.json({
    items: cartItems,
    total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
  })
}

export async function POST(request) {
  try {
    const body = await request.json()

    if (body.action === "clear") {
      cartItems = []
      return NextResponse.json({ message: "Cart cleared" })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Cart Error:", error)
    return NextResponse.json({ error: "Failed to process cart action" }, { status: 500 })
  }
}
