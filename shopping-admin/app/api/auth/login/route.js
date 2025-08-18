import { NextResponse } from "next/server"

// Mock users data - in real app, this would be in database
const users = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    email: "user@example.com",
    phone: "0901234567",
    password: "123456", // In real app, this would be hashed
    dateOfBirth: "1990-01-01",
    gender: "male",
    avatar: "/placeholder.svg?height=100&width=100&text=User",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    createdAt: "2023-01-01",
  },
]

export async function POST(request) {
  try {
    const { email, phone, password } = await request.json()

    // Find user by email or phone
    const user = users.find((u) => (email && u.email === email) || (phone && u.phone === phone))

    if (!user) {
      return NextResponse.json({ error: "Tài khoản không tồn tại" }, { status: 401 })
    }

    if (user.password !== password) {
      return NextResponse.json({ error: "Mật khẩu không chính xác" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Đăng nhập thành công",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
