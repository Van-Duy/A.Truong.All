import "./globals.css"
import { Providers } from "./providers"

export const metadata = {
  title: "Shopping Admin",
  description: "E-commerce admin panel",
  generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
