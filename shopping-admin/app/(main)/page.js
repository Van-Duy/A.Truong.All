
"use client"

import { useState, useEffect } from "react"
import UserSidebar from "@/components/user/UserSidebar"
import ProductCard from "@/components/user/ProductCard"

// Mock data
const flashSaleProducts = [
    {
        id: 1,
        name: "Bình giữ nhiệt Lock&Lock Vacuum Bottle LHC4145 - 470ml",
        price: 343800,
        originalPrice: 450000,
        image: "/placeholder.svg?height=200&width=200&text=Bình+giữ+nhiệt",
        rating: 4.5,
        reviewCount: 1250,
        freeShip: true,
        justOpened: true,
        isOfficial: true,
    },
    {
        id: 2,
        name: "Máy pha cà phê Espresso De'Longhi Stilosa EC260.BK",
        price: 39000,
        originalPrice: 65000,
        image: "/placeholder.svg?height=200&width=200&text=Máy+pha+cà+phê",
        rating: 4.8,
        reviewCount: 890,
        freeShip: true,
        justOpened: true,
        isOfficial: true,
    },
    {
        id: 3,
        name: "Bộ nồi chảo chống dính Elmich EL-3246",
        price: 137700,
        originalPrice: 220000,
        image: "/placeholder.svg?height=200&width=200&text=Bộ+nồi+chảo",
        rating: 4.6,
        reviewCount: 567,
        freeShip: true,
        justOpened: true,
    },
    {
        id: 4,
        name: "Bộ 3 nồi áp suất đa năng Elmich 2.5L + 4L + 6L",
        price: 399000,
        originalPrice: 850000,
        image: "/placeholder.svg?height=200&width=200&text=Nồi+áp+suất",
        rating: 4.7,
        reviewCount: 234,
        freeShip: true,
        justOpened: true,
        isOfficial: true,
    },
    {
        id: 5,
        name: "Chảo chống dính đáy từ Elmich EL-3728 28cm",
        price: 434700,
        originalPrice: 580000,
        image: "/placeholder.svg?height=200&width=200&text=Chảo+chống+dính",
        rating: 4.4,
        reviewCount: 445,
        freeShip: true,
        justOpened: true,
    },
    {
        id: 6,
        name: "Máy xay sinh tố Philips HR2118",
        price: 39000,
        originalPrice: 65000,
        image: "/placeholder.svg?height=200&width=200&text=Máy+xay+sinh+tố",
        rating: 4.3,
        reviewCount: 678,
        freeShip: true,
        justOpened: true,
    },
]

const brands = [
    { name: "1980Books khao deal Giảm đến 35%", image: "/placeholder.svg?height=100&width=100&text=1980Books" },
    { name: "Gia dụng Châu Âu Coupon 150K", image: "/placeholder.svg?height=100&width=100&text=Elmich" },
    { name: "Freeship toàn sàn Ưu đãi khủng đến 80K", image: "/placeholder.svg?height=100&width=100&text=TikiVIP" },
    { name: "Vạn deal bất ngờ Coupon đến 40K", image: "/placeholder.svg?height=100&width=100&text=Intel" },
    { name: "Cộng mua cộng giảm Giảm đến 30%", image: "/placeholder.svg?height=100&width=100&text=Microsoft" },
    { name: "Coupon giảm 120K Mua là có quà", image: "/placeholder.svg?height=100&width=100&text=Nestle" },
]

const hotProducts = [
    {
        id: 7,
        name: "Sữa Tắm Old Spice Captain 473ml",
        price: 129000,
        originalPrice: 180000,
        image: "/placeholder.svg?height=200&width=200&text=Old+Spice",
        rating: 4.5,
        reviewCount: 890,
        freeShip: true,
        fastDelivery: true,
    },
    {
        id: 8,
        name: "Son Dưỡng Chống Nứt Nẻ Kesalan Patharan",
        price: 59000,
        originalPrice: 89000,
        image: "/placeholder.svg?height=200&width=200&text=Son+dưỡng",
        rating: 4.7,
        reviewCount: 456,
        freeShip: true,
    },
]

const quickActions = [
    { icon: "8.8", title: "Siêu sale 8.8", color: "bg-red-500" },
    { icon: "🎯", title: "Deal riêng 50% TikiVIP", color: "bg-blue-500" },
    { icon: "🔥", title: "Tiki sáng ngày rẻ", color: "bg-orange-500" },
    { icon: "🏆", title: "Combo siêu tiết kiệm", color: "bg-yellow-500" },
    { icon: "📈", title: "Tiki Trading", color: "bg-green-500" },
    { icon: "🎫", title: "Coupon siêu hot", color: "bg-purple-500" },
    { icon: "🎒", title: "Back to School", color: "bg-indigo-500" },
    { icon: "🏪", title: "Xả kho giảm nửa giá", color: "bg-pink-500" },
    { icon: "📚", title: "Top Sách bán chạy", color: "bg-teal-500" },
    { icon: "💊", title: "Điện máy giảm 50%", color: "bg-cyan-500" },
]

export default function ShopPage() {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 38, seconds: 34 })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 }
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
                }
                return prev
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex gap-6">
                {/* Sidebar */}
                <UserSidebar />

                {/* Main content */}
                <div className="flex-1">
                    {/* Hero banners */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="relative rounded-lg overflow-hidden">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JdcYQoagDC3zkyG1XZLrO16Vu9ni9E.png"
                                alt="Deal Elmich đại to"
                                className="w-full h-48 object-cover"
                            />
                        </div>
                        <div className="relative rounded-lg overflow-hidden">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JdcYQoagDC3zkyG1XZLrO16Vu9ni9E.png"
                                alt="Định Dưỡng Vững Vàng"
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-10 gap-4 mb-6">
                        {quickActions.map((action, index) => (
                            <div key={index} className="text-center">
                                <div
                                    className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2`}
                                >
                                    {action.icon}
                                </div>
                                <p className="text-xs text-gray-600 leading-tight">{action.title}</p>
                            </div>
                        ))}
                    </div>

                    {/* Flash Sale */}
                    <div className="bg-white rounded-lg shadow-sm mb-6">
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <h2 className="text-xl font-bold text-red-500">Flash Sale</h2>
                                    <div className="flex items-center space-x-2">
                                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                                            {String(timeLeft.hours).padStart(2, "0")}
                                        </div>
                                        <span className="text-red-500 font-bold">:</span>
                                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                                            {String(timeLeft.minutes).padStart(2, "0")}
                                        </div>
                                        <span className="text-red-500 font-bold">:</span>
                                        <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                                            {String(timeLeft.seconds).padStart(2, "0")}
                                        </div>
                                    </div>
                                </div>
                                <button className="text-blue-500 hover:text-blue-600 font-medium">Xem tất cả</button>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-6 gap-4">
                                {flashSaleProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Popular brands */}
                    <div className="bg-white rounded-lg shadow-sm mb-6">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Thương hiệu nổi bật</h2>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-6 gap-4">
                                {brands.map((brand, index) => (
                                    <div
                                        key={index}
                                        className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                                    >
                                        <img
                                            src={brand.image || "/placeholder.svg"}
                                            alt={brand.name}
                                            className="w-16 h-16 mx-auto mb-2 object-contain"
                                        />
                                        <p className="text-xs text-gray-600 leading-tight">{brand.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hot foreign products */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-800">Hàng ngoại giá hot</h2>
                                <button className="text-blue-500 hover:text-blue-600 font-medium">Xem tất cả</button>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-6 gap-4">
                                {hotProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
