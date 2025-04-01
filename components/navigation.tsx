"use client"

import type React from "react"

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
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Searching",
      description: `Searching for: ${searchQuery}`,
    })
    setSearchQuery("")
    setIsSearchOpen(false)
  }

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Product", href: "#" },
    { name: "Promo", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ]

  return (
<header className="relative w-full text-white">

      {/* Desktop Navigation */}
      <motion.nav
        className={`hidden md:flex justify-between items-center w-full p-5 ${isScrolled ? "fixed top-0 left-0 z-50 bg-black/80 backdrop-blur-sm transition-all duration-300" : "absolute top-0 left-0 z-10 shadow-[inset_0px_50px_50px_-10px_rgba(0,0,0,1),inset_0px_100px_100px_-50px_rgba(0,0,0,0.5),inset_0px_150px_150px_-100px_rgba(0,0,0,0.2)]"}`}
        aria-label="Main navigation"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container-custom flex justify-between items-center w-full">
          <motion.div className="flex items-center text-2xl font-bold" whileHover={{ scale: 1.05 }}>
            <Burger className="mr-2 text-white" size={30} aria-hidden="true" />
            <span>Burger Business</span>
          </motion.div>

          <ul className="flex items-center">
            {menuItems.map((item, i) => (
              <motion.li
                key={item.name}
                className="mx-4"
                custom={i}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.1 }}
              >
                <Link
                  href={item.href}
                  className="text-white uppercase font-semibold text-xl hover:text-[#F64B3C] transition-colors relative group"
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F64B3C] group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                </Link>
              </motion.li>
            ))}
            <motion.li className="mx-4" variants={menuItemVariants} custom={5} initial="hidden" animate="visible">
              <AnimatePresence mode="wait">
                {isSearchOpen ? (
                  <motion.form
                    key="searchForm"
                    onSubmit={handleSearch}
                    className="flex items-center"
                    role="search"
                    aria-label="Site search"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="h-8 w-32 bg-transparent border-white text-white placeholder:text-gray-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search the site"
                    />
                    <Button type="submit" variant="ghost" size="icon" className="ml-1" aria-label="Submit search">
                      <Search className="h-4 w-4 text-white" aria-hidden="true" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsS earchOpen(false)}
                      aria-label="Close search"
                    >
                      <X className="h-4 w-4 text-white" aria-hidden="true" />
                    </Button>
                  </motion.form>
                ) : (
                  <motion.button
                    key="searchButton"
                    onClick={() => setIsSearchOpen(true)}
                    className="text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Open search"
                  >
                    <Search className="h-5 w-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.li>
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden flex justify-between items-center p-4 ${isScrolled ? "fixed bg-black/90" : "fixed bg-black/80"} top-0 left-0 w-full z-50 transition-all duration-300`}
        aria-label="Mobile navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container-custom flex justify-between items-center w-full">
          <motion.div
            className="flex items-center text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Burger className="mr-2 text-white" size={24} aria-hidden="true" />
            <span className="text-red-500">Burger Business</span>
          </motion.div>

          <Sheet>
            <SheetTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white bg-transparent border-none"
                aria-label="Open menu"
              >
                <Menu size={24} aria-hidden="true" />
              </motion.button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/90 text-white">
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" className="text-white" aria-label="Close menu">
                  <X size={24} aria-hidden="true" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4 mt-8">
                {["Home", "Menu", "Chefs", "Contact"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <Link href="#" className="text-lg font-medium py-2 hover:text-[#F64B3C] transition-colors">
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <motion.form
                  onSubmit={handleSearch}
                  className="flex items-center mt-4"
                  role="search"
                  aria-label="Mobile site search"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="h-10 bg-transparent border-white text-white placeholder:text-gray-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search the site"
                  />
                  <Button type="submit" variant="ghost" size="icon" className="ml-1" aria-label="Submit search">
                    <Search className="h-4 w-4 text-white" aria-hidden="true" />
                  </Button>
                </motion.form>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>
    </header>
  )
}

