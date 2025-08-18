import AdminSidebar from "../../components/admin/AdminSidebar"
import AdminHeader from "../../components/admin/AdminHeader"

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
