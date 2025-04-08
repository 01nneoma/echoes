import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Echoes - Music Discovery Across Time",
  description: "Discover music connections across different time periods",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          body {
            font-family: "Helvetica", sans-serif;
            background-color: #151515;
          }
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
