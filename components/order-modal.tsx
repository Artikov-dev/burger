"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle } from "lucide-react"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  productPrice?: string
}

export default function OrderModal({ isOpen, onClose, productName, productPrice }: OrderModalProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: "1",
    size: "ortacha",
    specialInstructions: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showConfetti, setShowConfetti] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.quantity || Number.parseInt(formData.quantity) < 1) {
      newErrors.quantity = "iltimos sonni to'g'ri kiriting"
    }

    if (!formData.specialInstructions) {
      newErrors.specialInstructions = "iltimos shartlarni qabul qilish muhim"
    }

    if (!formData.size) {
      newErrors.size = "iltimos hajmni tanlang "
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Ism  kiritish muhim"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email kiritish muhim"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Iltimos emailni to'g'ri kiriting"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefon raqami kiritish muhim"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Adress kiritish muhim"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "iltimos shartlarni qabul qilish muhim"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      handlePlaceOrder()
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const handlePlaceOrder = () => {
    // Show confetti and success animation
    setShowConfetti(true)
    setOrderComplete(true)

    // Send SMS notification (simulated)
    const smsMessage = `Buyurtmangiz uchun rahmat! Sizning ${productName} manzilingizga yetkazib beriladi`
    console.log(`Sms habar yuborildi ${formData.phone}: ${smsMessage}`)

    // Show toast after a delay to allow animation to play
    setTimeout(() => {
      toast({
        title: "Buyurtmangiz qabul qilindi",
        description: `Raxmat ${formData.name}! sizning ${productName} manzilingizga yetkazib beriladi.`,
        duration: 5000,
      })

      // Reset and close after animation completes
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          quantity: "1",
          size: "ortacha",
          specialInstructions: "",
          agreeToTerms: false,
        })
        setStep(1)
        setShowConfetti(false)
        setOrderComplete(false)
        onClose()
      }, 3000)
    }, 1000)
  }

  const handleCancel = () => {
    // Reset form and close modal
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      quantity: "1",
      size: "ortacha",
      specialInstructions: "",
      agreeToTerms: false,
    })
    setStep(1)
    setOrderComplete(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} />
        )}

        <AnimatePresence mode="wait">
          {orderComplete ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center py-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-green-500 mb-4"
              >
                <CheckCircle size={80} />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-center mb-2"
              >
            Buyurtma tasdiqlandi!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center text-gray-600"
              >
                Buyurtmangiz uchun rahmat. Tez orada SMS tasdiqlash xabari olasiz.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#E63946]">
                  {step === 1 ? "Buyurtma Tafsilotlari" : "Aloqa Ma'lumotlari"}
                </DialogTitle>
                <DialogDescription>
                  {step === 1 ? "O‘zlashtiring ${productName} buyurtmangiz" : "Iltimos, yetkazib berish ma'lumotlaringizni taqdim eting"}
                </DialogDescription>
              </DialogHeader>

              {step === 1 ? (
                <motion.div
                  className="grid gap-4 py-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product" className="text-right">
                    Burgerlar
                    </Label>
                    <div className="col-span-3 font-medium">
                      {productName} {productPrice && `- ${productPrice}`}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                 Soni
                    </Label>
                    <div className="col-span-3">
                      <Select value={formData.quantity} onValueChange={(value) => handleChange("quantity", value)}>
                        <SelectTrigger id="quantity" className={errors.quantity ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="size" className="text-right">
                      Kattaligi
                    </Label>
                    <div className="col-span-3">
                      <Select value={formData.size} onValueChange={(value) => handleChange("size", value)}>
                        <SelectTrigger id="size" className={errors.size ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="instructions" className="text-right">
                    Maxsus ko'rsatmalar
                    </Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special requests?"
                      className="col-span-3"
                      value={formData.specialInstructions}
                      onChange={(e) => handleChange("specialInstructions", e.target.value)}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="grid gap-4 py-4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                     Ism
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`col-span-3 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm mt-1">{errors.name}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`col-span-3 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm mt-1">{errors.email}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                   Telefon raqam
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={`col-span-3 ${errors.phone ? "border-red-500" : ""}`}
                    />
                    {errors.phone && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm mt-1">{errors.phone}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Addres
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className={`col-span-3 ${errors.address ? "border-red-500" : ""}`}

                    />
                    {errors.address && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm mt-1">{errors.address}</div>
                    )}
                  </div>  

                  <div className="grid grid-cols-4 items-center gap-4">
                    <div className="col-start-2 col-span-3 flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleChange("agreeToTerms", checked === true)}
                        className={errors.agreeToTerms ? "border-red-500" : ""}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                   Men shartlar va qoidalar bilan rozi bo'laman
                      </label>
                    </div>
                    {errors.agreeToTerms && (
                      <div className="col-start-2 col-span-3 text-red-500 text-sm mt-1">{errors.agreeToTerms}</div>
                    )}
                  </div>
                </motion.div>
              )}

              <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
                {step === 2 && (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Orqaga
                  </Button>
                )}
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 sm:flex-none">
                   Bekor qilish
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#E63946] hover:bg-[#d12836] flex-1 sm:flex-none"
                  >
                    {step === 1 ? "Keyingisi" : "Buyurtma berish"}
                  </Button>
                </div>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

