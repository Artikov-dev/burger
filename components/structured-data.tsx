export default function StructuredData() {
  const restaurantData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Business Burger",
    image: "https://www.businessburger.uz/images/burger-business.jpg",
    url: "https://www.businessburger.uz",
    telephone: "+998-90-123-45-67",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Burger ko‘chasi",
      addressLocality: "Toshkent",
      addressRegion: "Toshkent",
      postalCode: "100000",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.2995,
      longitude: 69.2401,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma"],
        opens: "10:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Shanba", "Yakshanba"],
        opens: "11:00",
        closes: "23:00",
      },
    ],
    servesCuisine: ["O‘zbekcha", "Fast Food", "Burgerlar", "Halal", "Street Food"],
    priceRange: "UZS",
    paymentAccepted: "Naqd, Plastik karta",
    currenciesAccepted: "UZS",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "512",
    },
    review: [
      {
        "@type": "Review",
        author: "Jamshid Karimov",
        datePublished: "2024-03-15",
        reviewBody: "Burgerlari juda mazali! Yetkazib berish tez va sifatli.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: "Nilufar Usmonova",
        datePublished: "2024-03-10",
        reviewBody: "Narxi o‘ziga yarasha, lekin shunaqa burgerni hech qayerda yemaganman!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4.8",
          bestRating: "5",
        },
      },
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Maxsus Burger",
        description: "Angus mol go‘shti, yangi sabzavotlar va maxsus sous bilan tayyorlangan mazali burger.",
        price: "35000",
        priceCurrency: "UZS",
        availability: "InStock",
      },
      {
        "@type": "Offer",
        name: "Mega Burger",
        description: "Ikki qavatli kotlet, eritilgan pishloq, qarsildoq mol go‘shti va maxsus sous.",
        price: "45000",
        priceCurrency: "UZS",
        availability: "InStock",
      },
      {
        "@type": "Offer",
        name: "Family Combo",
        description: "2 ta double burger, 2 ta fri kartoshka va 1 litr cola bonus!",
        price: "95000",
        priceCurrency: "UZS",
        availability: "InStock",
      },
    ],
    acceptsReservations: true,
    hasMenu: "https://www.businessburger.uz/menu",
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantData) }} />
}
