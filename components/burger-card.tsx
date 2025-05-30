"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import OrderModal from "./order-modal"

interface BurgerCardProps {
  title: string
  description: string
  imageSrc: string
  bgColor: string
  buttonColor: string
  textColor?: string
  reverse?: boolean
}

export default function BurgerCard({
  title,
  description,
  imageSrc,
  bgColor,
  buttonColor,
  textColor = "text-white",
  reverse = false,
}: BurgerCardProps) {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleOrderNow = () => {
    setIsOrderModalOpen(true)
  }

  return (
    <section
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
      className={`${bgColor} ${textColor}`}
    >
      <div className="container-custom">
        <motion.div
          className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center py-12 gap-6 md:gap-12`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="md:flex-1 flex justify-center"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.img
              src={imageSrc || "/placeholder.svg"}
              alt={`${title} - A delicious burger option`}
              className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full mb-6 md:mb-0"
              animate={{
                y: [0, -10, 0],
                boxShadow: isHovered ? "0px 20px 30px rgba(0, 0, 0, 0.3)" : "0px 10px 15px rgba(0, 0, 0, 0.2)",
              }}
              transition={{
                y: { repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" },
                boxShadow: { duration: 0.3 },
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </motion.div>

          <div className="md:flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h2
              id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
              className="text-4xl md:text-5xl lg:text-[75px] font-bold mb-6"
              initial={{ opacity: 0, x: reverse ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="text-lg md:text-2xl lg:text-[28px] mb-8 max-w-[542px]"
              initial={{ opacity: 0, x: reverse ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Mazali va shirin ta’mli burger! Yumshoq non orasida sersuv mol go‘shti, yangi sabzavotlar va maxsus sous bilan tayyorlangan. Burger ishqibozlari uchun ajoyib tanlov!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: reverse ? 0.95 : 1.05 }} //
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleOrderNow}
                className={`${buttonColor} rounded-full py-4 md:py-6 px-10 md:px-16 text-lg md:text-xl lg:text-2xl font-bold uppercase`}
                aria-label={`Order ${title} now`}
              >
                BUYURTMA BERISH
              </Button>
            </motion.div>

          </div>
        </motion.div>
      </div>

      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} productName={title} />
    </section>
  )
}