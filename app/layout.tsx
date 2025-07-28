// app/layout.tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import AifaNavBar from './aifa-nav-bar'
import Link from "next/link"
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'AIFA NAV BAR',
  description: 'Created with AIFA',
  generator: 'aifa.dev',
  icons: "/logo.png",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        
          <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <Link 
                    href="/" 
                    className="text-white font-bold text-xl hover:text-blue-400 transition-colors duration-150 cursor-pointer"
                  >
                    AIFA
                  </Link>
                </div>
                <div className="flex items-center ">
                  <AifaNavBar />
                </div>
              </div>
            </div>
          </header>
          
          
          <main className="pt-16 h-screen overflow-hidden">
            {children}
          </main>
          
          <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
