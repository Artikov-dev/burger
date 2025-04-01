"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BeefIcon as Burger } from "lucide-react"
import OrderModal from "./order-modal"

interface Package {
  id: number
  title: string
  price: string
  description: string
}

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const packages: Package[] = [
    {
      id: 1,
      title: "PACKAGE I",
      price: "$10.00",
      description: "Single burger with fries and a drink. Perfect for a quick meal.",
    },
    {
      id: 2,
      title: "PACKAGE II",
      price: "$20.00",
      description: "Two burgers with fries, onion rings, and two drinks. Great for sharing.",
    },
    {
      id: 3,
      title: "PACKAGE III",
      price: "$30.00",
      description: "Family meal with four burgers, large fries, onion rings, and four drinks.",
    },
  ]

  const handleOrderPackage = (pkg: Package) => {
    setSelectedPackage(pkg)
    setIsOrderModalOpen(true)
  }

  return (
    <section aria-labelledby="packages-heading" className="py-12 bg-[#F4E1C1]">
      <div className="container-custom">
        <motion.h2
          id="packages-heading"
          className="text-4xl md:text-5xl font-bold text-[#F54B3B] text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Popular Package
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md text-center h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#F54B3B] mb-4">{pkg.title}</h3>
              <Burger size={50} className="text-[#e16f23] mb-4" aria-hidden="true" />
              <p className="text-xl text-[#F54B3B] font-medium mb-4">{pkg.price}</p>
              <p className="text-[#F54B3B] mb-6 flex-grow">{pkg.description}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handleOrderPackage(pkg)}
                  className="bg-[#E63946] hover:bg-[#d12836] text-white rounded-full px-10 py-4 uppercase font-bold"
                  aria-label={`Order ${pkg.title} for ${pkg.price}`}
                >
                  ORDER NOW
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedPackage && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          productName={selectedPackage.title}
          productPrice={selectedPackage.price}
        />
      )}
    </section>
  )
}

