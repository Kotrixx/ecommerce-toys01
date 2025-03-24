'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const slides = [
  {
    id: 1,
    image: '/img/slides/gokussj.jpg',
    alt: 'Goku SSJ',
  },
  {
    id: 2,
    image: '/img/slides/spiderman.jpg',
    alt: 'Spider-Man',
  },
  {
    id: 3,
    image: '/img/slides/payday2.jpg',
    alt: 'Luffy One Piece',
  },
  {
    id: 4,
    image: '/img/slides/reddead.jpeg',
    alt: 'Batman DC',
  },
]

export default function Carousel() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="rounded-lg shadow-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-[400px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
