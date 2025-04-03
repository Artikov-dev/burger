"use client"

import { motion } from "framer-motion"

export default function Testimonial() {
  return (
    <section
      aria-labelledby="testimonial-heading"
      className="py-16 bg-[url('/hero-img-burger.png')] bg-cover bg-center text-white"
    >
      <div className="container-custom">
        <motion.div
          className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.h2
            id="testimonial-heading"
            className="text-3xl md:text-4xl font-normal mb-6 font-['Calistoga']"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
           Sultonkabirov Abdulloh
          </motion.h2>
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-lg md:text-2xl font-bold font-['Archivo']">
              "O'zbekona burgerlar shunchaki ajoyib! Ingredientlarning sifati va ta'mi tengi yo'q. Men bir necha yildirki, muntazam mijozman va hech qachon xafa bo'lmading."
            </p>
            <footer className="mt-4 text-sm md:text-base">
              <cite>- Alimov Odil, Sodiq Mijoz</cite>
            </footer>
          </motion.blockquote>
        </motion.div>
      </div>
    </section>
  )
}
