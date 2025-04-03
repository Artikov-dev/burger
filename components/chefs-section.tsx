"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Chef {
  id: number
  name: string
  role: string
  image: string
}

export default function ChefsCarousel() {
  const chefs: Chef[] = [
    {
      id: 1,
      name: "Tolqinov  Botir",
      role: "Oshpaz Yordamchisi",
      image: "/jigaa.png",
    },
    {
      id: 2,
      name: "Abdusalomova  Mashura",
      role: "Girgitton",
      image: "/jiga-qizi.png",
    },
    {
      id: 3,
      name: "Nodira Kurbanova",
      role: "Girgitton",
      image: "/jiga-qizi.png",
    },
    {
      id: 4,
      name: "Isoyeva  Sultonposhsho",
      role: "chef",
      image: "/jiga-qizi.png",
    },
    {
      id: 5,
      name: "Tolqinova  Aliya",
      role: "Oshpaz yordamchisi",
      image: "/jiga-qizi.png",
    },
    {
      id: 6,
      name: "Xalilov Ibrohim",
      role: "Manajer",  
      image: "/jigaa.png",
    },
  ]

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)")
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Determine how many items to show based on screen size
  const itemsPerView = isDesktop ? 3 : isTablet ? 2 : 1

  return (
    <section aria-labelledby="chefs-heading" className="py-12 bg-[#f8f1e4]">
      <div className="container-custom max-w-6xl mx-auto px-4">
        <h2
          id="chefs-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F54B3B] mb-5 text-center"
        >
          Oshpazlarimiz haqida
        </h2>

        <p className="text-lg md:text-xl text-[#F54B3B] mb-14 max-w-[464px] px-4 mx-auto text-center">
          Bizning mazali burgerlarimizni tayyorlaydigan iqtidorli oshpazlarimiz bilan tanishing. Bizning oshpazlarimiz har bir taomga yillar davomida to'plangan tajriba va ishtiyoqni olib keladi.
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {chefs.map((chef) => (
              <CarouselItem key={chef.id} className={`basis-full md:basis-1/2 lg:basis-1/3`}>
                <div className="p-2">
                  <Card className="border-none bg-transparent shadow-none">
                    <CardContent className="flex flex-col items-center gap-5 p-6">
                      <img
                        src={chef.image || "/placeholder.svg"}
                        alt={`${chef.name} - ${chef.role} at Burger Business`}
                        className="w-[180px] h-[180px] rounded-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <h3 className="text-2xl md:text-3xl font-bold text-[#F54B3B] uppercase text-center">
                        {chef.name}
                      </h3>
                      <p className="text-sm md:text-base font-semibold text-[#F54B3B] mb-0">
                        {chef.role}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-[#F54B3B]/80 hover:bg-[#F54B3B] text-white hover:text-white" />
          <CarouselNext className="right-2 bg-[#F54B3B]/80 hover:bg-[#F54B3B] text-white hover:text-white" />
        </Carousel>
      </div>
    </section>
  )
}