import { NextResponse } from "next/server"

// Mock users data - in real app, this would be in database
const users = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    email: "user@example.com",
    phone: "0901234567",
    password: "123456",
    dateOfBirth: "1990-01-01",
    gender: "male",
    avatar: "/placeholder.svg?height=100&width=100&text=User",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    createdAt: "2023-01-01",
  },
]

let nextUserId = 2

export async function POST(request) {
  try {
    const userData = await request.json()

    // Check if email already exists
    const existingUser = users.find((u) => u.email === userData.email)
    if (existingUser) {
      return NextResponse.json({ error: "Email đã được sử dụng" }, { status: 400 })
    }

    // Check if phone already exists
    const existingPhone = users.find((u) => u.phone === userData.phone)
    if (existingPhone) {
      return NextResponse.json({ error: "Số điện thoại đã được sử dụng" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: nextUserId++,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      password: userData.password, // In real app, hash this password
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      avatar: "/placeholder.svg?height=100&width=100&text=User",
      address: "",
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      message: "Đăng ký thành công",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
