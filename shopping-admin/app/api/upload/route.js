import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request) {
  try {
    const data = await request.formData()
    const file = data.get("file")

    if (!file) {
      return NextResponse.json({ error: "Không có file được upload" }, { status: 400 })
    }

    // Kiểm tra định dạng file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File phải là hình ảnh" }, { status: 400 })
    }

    // Kiểm tra kích thước file (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File quá lớn (tối đa 5MB)" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Tạo tên file unique
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const fileName = `${timestamp}_${originalName}`

    // Đường dẫn lưu file
    const uploadDir = join(process.cwd(), "public", "uploads")
    const filePath = join(uploadDir, fileName)

    // Tạo thư mục uploads nếu chưa có
    try {
      await writeFile(filePath, buffer)
    } catch (error) {
      // Nếu thư mục không tồn tại, tạo thư mục
      const { mkdir } = await import("fs/promises")
      await mkdir(uploadDir, { recursive: true })
      await writeFile(filePath, buffer)
    }

    // Trả về URL của file
    const fileUrl = `/uploads/${fileName}`

    return NextResponse.json({
      url: fileUrl,
      message: "Upload thành công",
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Lỗi server khi upload file" }, { status: 500 })
  }
}
