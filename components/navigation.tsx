"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { BeefIcon as Burger, Menu, X, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

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
      <nav className="container-custom flex justify-between items-center py-4">
        {/* Logo */}
        <motion.div className="flex items-center text-2xl font-bold text-white" whileHover={{ scale: 1.05 }}>
          <Burger className="mr-2 text-white" size={30} aria-hidden="true" />
          <span>Burger Business</span>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          {["Home", "Product", "Promo", "About", "Contact"].map((item, i) => (
            <motion.li key={item} whileHover={{ scale: 1.1 }}>
              <Link href="#" className="text-white text-lg hover:text-[#F64B3C] transition-all">{item}</Link>
            </motion.li>
          ))}

          {/* Search */}
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.form
                key="searchForm"
                onSubmit={handleSearch}
                className="flex items-center border border-white rounded-lg px-2"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  type="search"
                  placeholder="Search..."
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
              </motion.form>
            ) : (
              <motion.button
                key="searchButton"
                onClick={() => setIsSearchOpen(true)}
                className="text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </ul>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-white md:hidden">
              <Menu size={24} />
            </motion.button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/90 text-white">
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsSearchOpen(false)}>
                <X size={24} />
              </Button>
            </div>
            <nav className="flex flex-col space-y-6 mt-8">
              {["Home", "Menu", "Chefs", "Contact"].map((item, i) => (
                <motion.div key={item} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
                  <Link href="#" className="text-lg font-medium py-2 hover:text-[#F64B3C] transition-colors">{item}</Link>
                </motion.div>
              ))}
              <motion.form onSubmit={handleSearch} className="flex items-center mt-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="h-10 bg-transparent text-white placeholder-gray-300 border-none focus:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="ghost" size="icon" className="text-white">
                  <Search className="h-4 w-4" />
                </Button>
              </motion.form>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
