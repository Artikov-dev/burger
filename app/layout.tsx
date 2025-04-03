import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Business Burger | Mazali Gourmet Burgerlar",
  description:
    "Cheeseburger, double burger, tovuqli burger, baliqli burger, achchiq burger, BBQ burger, veg burger va boshqa mazali burgerlar Business Burger menyusida!",
  keywords: [
    "cheeseburger",
    "double burger",
    "tovuq burger",
    "baliqli burger",
    "achchiq burger",
    "BBQ burger",
    "veg burger",
    "klassik burger",
    "Angus burger",
    "smash burger",
  ],
  authors: [{ name: "Ozbekona Burger" }],
  creator: "Ozbekona Burger",
  publisher: "Ozbekona Burger",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL("https://www.example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.example.com",
    title: "Business Burger | Mazali Gourmet Burgerlar",
    description:
      "Cheeseburger, double burger, tovuqli burger, baliqli burger, achchiq burger, BBQ burger, veg burger va boshqa mazali burgerlar Ozbekona Burger menyusida!",
    siteName: "Business Burger",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Business Burger - Mazali Gourmet Burgerlar",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Business Burger | Mazali Gourmet Burgerlar",
  //   description:
  //     "Cheeseburger, double burger, tovuqli burger, baliqli burger, achchiq burger, BBQ burger, veg burger va boshqa mazali burgerlar Business Burger menyusida!",
  //   images: ["https://burger-mqqo.vercel.app/twitter-image.jpg"],
  //   creator: "@businessburger",
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "food",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
