"use client"

import Link from "next/link"
import { Facebook, Youtube, MessageCircle, Smartphone, Monitor } from "lucide-react"

export default function UserFooter() {
  const customerSupport = [
    { title: "Hotline: 1900-6035", subtitle: "(1000 đ/phút, 8-21h kể cả T7, CN)" },
    { title: "Các câu hỏi thường gặp" },
    { title: "Gửi yêu cầu hỗ trợ" },
    { title: "Hướng dẫn đặt hàng" },
    { title: "Phương thức vận chuyển" },
    { title: "Chính sách kiểm hàng" },
    { title: "Chính sách đổi trả" },
    { title: "Hướng dẫn trả góp" },
    { title: "Chính sách hàng nhập khẩu" },
    { title: "Hỗ trợ khách hàng: hotro@tiki.vn" },
    { title: "Báo lỗi bảo mật: security@tiki.vn" },
  ]

  const aboutTiki = [
    { title: "Giới thiệu Tiki" },
    { title: "Tiki Blog" },
    { title: "Tuyển dụng" },
    { title: "Chính sách bảo mật thanh toán" },
    { title: "Chính sách bảo mật thông tin cá nhân" },
    { title: "Chính sách giải quyết khiếu nại" },
    { title: "Điều khoản sử dụng" },
    { title: "Giới thiệu Tiki Xu" },
    { title: "Tiếp thị liên kết cùng Tiki" },
    { title: "Bán hàng doanh nghiệp" },
    { title: "Điều kiện vận chuyển" },
  ]

  const partnership = [{ title: "Quy chế hoạt động Sàn GDTMĐT" }, { title: "Bán hàng cùng Tiki" }]

  const paymentMethods = [
    { name: "Visa", logo: "💳" },
    { name: "Mastercard", logo: "💳" },
    { name: "JCB", logo: "💳" },
    { name: "ATM", logo: "🏧" },
    { name: "COD", logo: "💰" },
    { name: "Installment", logo: "📊" },
    { name: "VNPay", logo: "🏦" },
    { name: "MoMo", logo: "📱" },
    { name: "ZaloPay", logo: "💙" },
  ]

  const certifications = [
    { name: "Đã thông báo", logo: "🏛️" },
    { name: "Đã xác minh", logo: "✅" },
    { name: "DMCA Protected", logo: "🛡️" },
  ]

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Customer Support */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2">
              {customerSupport.map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                    {item.title}
                  </Link>
                  {item.subtitle && <div className="text-xs text-gray-500">{item.subtitle}</div>}
                </li>
              ))}
            </ul>
          </div>

          {/* About Tiki */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Về Tiki</h3>
            <ul className="space-y-2">
              {aboutTiki.map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partnership */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Hợp tác và liên kết</h3>
            <ul className="space-y-2">
              {partnership.map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-blue-600">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-3">Chứng nhận bởi</h4>
              <div className="flex space-x-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-lg">{cert.logo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Phương thức thanh toán</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {paymentMethods.map((method, index) => (
                <div key={index} className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-sm">{method.logo}</span>
                </div>
              ))}
            </div>

            <h4 className="font-semibold text-gray-800 mb-3">Dịch vụ giao hàng</h4>
            <div className="bg-blue-600 text-white px-3 py-2 rounded font-bold text-lg">TIKINOW</div>
          </div>

          {/* Connect & Download */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Kết nối với chúng tôi</h3>
            <div className="flex space-x-3 mb-6">
              <Link href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Facebook className="w-4 h-4 text-white" />
              </Link>
              <Link href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Youtube className="w-4 h-4 text-white" />
              </Link>
              <Link href="#" className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </Link>
            </div>

            <h4 className="font-semibold text-gray-800 mb-3">Tải ứng dụng trên điện thoại</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                  <div className="w-12 h-12 bg-black text-white text-xs flex flex-col items-center justify-center">
                    <div className="w-8 h-8 bg-white"></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Link href="#" className="bg-black text-white px-3 py-1 rounded text-xs flex items-center space-x-1">
                    <Smartphone className="w-3 h-3" />
                    <span>App Store</span>
                  </Link>
                  <Link href="#" className="bg-black text-white px-3 py-1 rounded text-xs flex items-center space-x-1">
                    <Monitor className="w-3 h-3" />
                    <span>Google Play</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Công ty TNHH TI KI</h3>
          <p className="text-sm text-gray-600 mb-2">
            Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần
            đầu vào ngày 06/01/2010.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Hotline: 1900 6035</strong>
          </p>
        </div>
      </div>
    </footer>
  )
}
