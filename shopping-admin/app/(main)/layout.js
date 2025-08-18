import UserHeader from "@/components/user/UserHeader"
import UserFooter from "@/components/user/UserFooter"

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      <main className="min-h-screen">{children}</main>
      <UserFooter />
    </div>
  )
} 