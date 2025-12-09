import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import Script from "next/script"
import "@/styles/globals.css"
import { Navbar } from "@/shared/ui/navbar"
import { ReactQueryProvider } from "@/lib/react-query/provider"
import { InquiryProvider } from "@/features/inquiry/inquiry-context"
import { InquirySidebar } from "@/features/inquiry/components/inquiry-sidebar"
import { InquiryQuestionDialog } from "@/features/inquiry/components/inquiry-question-dialog"

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
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${GeistSans.variable} font-sans`}>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const initialTheme = theme || systemTheme;
                  if (initialTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error initializing theme:', e);
                }
              })();
            `,
          }}
        />
        <ReactQueryProvider>
          <InquiryProvider>
            <Navbar />
            {children}
            <InquirySidebar />
            <InquiryQuestionDialog />
          </InquiryProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}

