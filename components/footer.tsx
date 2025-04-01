"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="bg-[#222] text-white py-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Burger Business</h3>
            <p className="mb-4">
              Serving delicious gourmet burgers since 2010. Visit one of our locations or order online.
            </p>
            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.2, color: "#1877F2" }}>
                <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
                  <Facebook size={24} />
                  <span className="sr-only">Facebook</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, color: "#1DA1F2" }}>
                <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
                  <Twitter size={24} />
                  <span className="sr-only">Twitter</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.2, color: "#E1306C" }}>
                <Link href="#" className="hover:text-red-400 transition-colors" aria-label="Instagram">
                  <Instagram size={24} />
                  <span className="sr-only">Instagram</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <ul className="space-y-2">
              {["History", "Our Team", "Brand Guidelines", "Terms & Conditions", "Privacy Policy"].map((item, i) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href="#" className="hover:underline">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {["How to Order", "Our Product", "Order Status", "Promo", "Payment Method"].map((item, i) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href="#" className="hover:underline">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Other</h3>
            <ul className="space-y-2">
              {["Contact Us", "Help", "Privacy"].map((item, i) => (
                <motion.li key={item} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Link href="#" className="hover:underline">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-8 pt-8 border-t border-gray-700 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Burger Business. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

