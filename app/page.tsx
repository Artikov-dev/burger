import Hero from "@/components/hero"
import ChefsSection from "@/components/chefs-section"
import BurgerCard from "@/components/burger-card"
import Statistics from "@/components/statistics"
import Packages from "@/components/packages"
import Testimonial from "@/components/testimonial"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import StructuredData from "@/components/structured-data"

export default function Home() {
  return (
    <main className="min-h-screen">
      <StructuredData />
      <Hero />
      <ChefsSection />
      <BurgerCard
        title="Mashhur Burger"
        description="Bizning imzo burgerimiz, premium Angus mol go‘shti, yangi sabzavotlar va maxfiy sous bilan tayyorlangan. Burger sevuvchilar uchun albatta tatib ko‘rish kerak!"
        imageSrc="/burger1.png"
        bgColor="bg-[#E63946]"
        buttonColor="bg-[#E63946] text-white border-[1px] border-white"
      />
      <BurgerCard
        title="Katta Burger"
        description="Ikkita kotletli burger, eritilgan pishloq, qarsildoq bekon va barcha qo‘shimchalar bilan. Katta ishtaha uchun ideal tanlov!"
        imageSrc="/burger1.png"
        bgColor="bg-[#F4E1C1]"
        buttonColor="bg-[#E63946] text-white"
        textColor="text-[#E63946]"
        reverse={true}
      />
      <Statistics />
      <Packages />
      <Testimonial />
      <Newsletter />
      <Footer />
    </main>
  )
}

