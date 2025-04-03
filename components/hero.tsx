"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import OrderModal from "./order-modal"

export default function Hero() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const handleOrderNow = () => {
    setIsOrderModalOpen(true)
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative h-[90dvh] w-full flex items-center justify-center overflow-hidden bg-[url('/back.png')] bg-cover bg-center bg-no-repeat z-0 min-h-[600px] md:min-h-[1080px]"
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="container-custom h-full flex items-center px-4 sm:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-start justify-center w-full max-w-[600px] text-left z-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-6xl lg:text-[89px] font-bold text-white mb-4 sm:mb-6 md:mb-14 leading-tight"
          >
            50% gacha keshbek qo‘lga kiriting!
          </h1>
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white mb-6 max-w-[529px]">
            Bizning mazali burgerlarimizdan bahramand bo‘ling va birinchi buyurtmangizda 50% gacha naqd pul qaytishini oling. Taklif cheklangan vaqtda amal qiladi!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleOrderNow}
              className="bg-[#F64B3C] hover:bg-[#f01c2d] text-white rounded-full py-3 sm:py-4 md:py-6 px-6 sm:px-10 md:px-20 text-base sm:text-lg md:text-xl lg:text-2xl font-normal"
              aria-label="Order now and get cashback"
            >
              Buyurtma berish
            </Button>
          </motion.div>

          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={() => setIsOrderModalOpen(false)}
            productName="Special Burger"
          />
        </motion.div>
      </div>
    </section>
  )
}