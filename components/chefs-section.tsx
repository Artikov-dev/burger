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
      name: "AIDEN HUNTER",
      role: "Founder",
      image: "/jigaa.png",
    },
    {
      id: 2,
      name: "ETHEL RAMSEY",
      role: "Co-Founder",
      image: "/jiga-qizi.png",
    },
    {
      id: 3,
      name: "FANNIE STEWART",
      role: "Co-Founder",
      image: "/jiga-qizi.png",
    },
    {
      id: 4,
      name: "GORDON RAMSAY",
      role: "Head Chef",
      image: "/jiga-qizi.png",
    },
    {
      id: 5,
      name: "JULIA CHILD",
      role: "Executive Chef",
      image: "/jiga-qizi.png",
    },
    {
      id: 6,
      name: "AIDEN HUNTER",
      role: "Founder",
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
          Our Chefs
        </h2>

        <p className="text-lg md:text-xl text-[#F54B3B] mb-14 max-w-[464px] px-4 mx-auto text-center">
          Meet the talented culinary experts behind our delicious burgers. Our chefs bring years of experience and
          passion to every dish.
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
                      <h3 className="text-2xl md:text-3xl font-bold text-[#F54B3B] uppercase">
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