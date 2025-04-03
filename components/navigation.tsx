"use client"

import { useState, useEffect } from "react"
import { BeefIcon as Burger, Menu, X, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      toast({ title: "Search Error", description: "Please enter a search term", variant: "destructive" })
      return
    }
    toast({ title: "Searching", description: `Searching for: ${searchQuery}` })
    setSearchQuery("")
    setIsSearchOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black/80 backdrop-blur-lg">
      <nav className="container-custom flex justify-between items-center py-4 px-0.5!">
        {/* Logo */}
        <div className="flex items-center text-2xl font-bold text-white">
          <Burger className="mr-2 text-white" size={30} aria-hidden="true" />
          <span>O'zbekona Burgerlar</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          {["Asosiy", "Burgerlar", "Chegirmalar", "Biz haqimizda", "Bog'lanish"].map((item, i) => (
            <li key={item}>
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-white text-lg hover:text-[#F64B3C] transition-all"
              >
                {item}
              </Link>
            </li>
          ))}

          {/* Search */}
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center border border-white rounded-lg px-2">
              <Input
                type="search"
                placeholder="Qidirish..."
                className="bg-transparent text-white placeholder-gray-300 border-none focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="text-white">
                <Search className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="text-white">
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-white"
            >
              <Search className="h-5 w-5" />
            </button>
          )}
        </ul>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-white md:hidden">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/90 text-white">
            <nav className="flex flex-col space-y-6 mt-8">
              {["Asosiy", "Menu", "Oshpazlar", "Kontakt"].map((item, i) => (
                <div key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-lg font-medium py-2 hover:text-[#F64B3C] transition-colors"
                  >
                    {item}
                  </Link>
                </div>
              ))}
              <form onSubmit={handleSearch} className="flex items-center mt-4">
                <Input
                  type="search"
                  placeholder="Qidirish..."
                  className="h-10 bg-transparent text-white placeholder-gray-300 border-none focus:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="ghost" size="icon" className="text-white">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
