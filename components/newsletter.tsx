"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Bell, CheckCircle2 } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Iltimos, elektron pochta manzilingizni kiriting.",
        variant: "destructive",
      })
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Error",
        description: "Iltimos, to‘g‘ri elektron pochta manzilingizni kiriting.",
        variant: "destructive",
      })
      return
    }

    if (!phone.trim()) {
      toast({
        title: "Error",
        description: "SMS bildirishnomalari uchun telefon raqamingizni kiriting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate SMS notification
      console.log(`SMS yuborildi ${phone}: Burger Business yangiliklariga obuna bo‘lgansiz! Rahmat!`)

      setIsSuccess(true)

      toast({
        title: "Muvaffaqiyat!",
        description: `Obuna bo‘lish uchun rahmat! Biz ${email} manzilingizga tasdiqlash xabarini va telefoningizga SMS yubordik.`,
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("")
        setPhone("")
        setIsSuccess(false)
      }, 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="newsletter-heading" className="py-12 bg-[#FCE8D5] text-center relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 id="newsletter-heading" className="text-3xl md:text-4xl font-bold text-[#E63946] mb-4">
     <span className="font-bold">Yangilanishlar</span>
          </h2>
          <p className="text-lg text-[#E63946] mb-2">
          Yangi menyu mahsulotlari, aksiyalar va tadbirlar haqida yangilanishlarni olish uchun axborot byulletenimizga obuna bo'ling.
          </p>
          <p className="text-lg text-[#E63946] mb-6">
          Maxsus takliflar va eksklyuziv chegirmalar haqida birinchi bo'lib xabar toping, email va SMS orqali.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-green-500 mb-4"
              >
                <CheckCircle2 size={60} />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-medium text-[#E63946]"
              >
          Obuna  bolganiz uchun rahmat!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center mt-2 text-[#E63946]"
              >
                <Bell className="mr-2" size={16} />
                <p>SMS bildirishnomasi sizning telefoningizga yuborildi</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto"
              aria-labelledby="newsletter-form-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <span id="newsletter-form-heading" className="sr-only">
              Yangiliklarimizga obuna bo'ling!
              </span>
              <div className="w-full space-y-4">
                <Input
                  type="email"
                  placeholder="Email manzilingiz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12"
                  disabled={isSubmitting}
                  aria-label="Email adresizni kiriting"
                  aria-required="true"
                />
                <Input
                  type="tel"
                  placeholder="Telefon raqamingiz (SMS uchun)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12"
                  disabled={isSubmitting}
                  aria-label="SMS xabarnomalar uchun telefon raqami"
                  aria-required="true"
                />
              </div>
              <Button
                type="submit"
                className="bg-[#E63946] hover:bg-[#d12836] text-white w-full md:w-auto h-12"
                disabled={isSubmitting}
                aria-label="Yangiliklar byulleteniga obuna bo'ling"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  "Obuna bo'ling"
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        {}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#E63946] opacity-10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))} */}
        </div>
      </div>
    </section>
  )
}

