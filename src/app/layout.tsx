import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import "@/styles/globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Richard 3D",
  description: "Aplicación moderna con Next.js, TypeScript y Supabase",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${GeistSans.variable} font-sans`}>{children}</body>
    </html>
  )
}

