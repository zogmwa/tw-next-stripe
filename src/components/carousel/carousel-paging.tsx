import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

type CarouselPaging = {
  images?: { asset: number; url: string }[]
}

const PrevArrow = (props) => {
  const { className, onClick } = props
  return (
    <div className={`flex items-center rounded-md ${className}`} onClick={onClick}>
      <HiChevronLeft className="text-3xl rounded-md text-text-secondary bg-border-default hover:text-black" />
    </div>
  )
}
const NextArrow = (props) => {
  const { className, onClick } = props
  return (
    <div className={`flex items-center rounded-md ${className}`} onClick={onClick}>
      <HiChevronRight className="text-3xl rounded-md text-text-secondary bg-border-default hover:text-black" />
    </div>
  )
}

function CarouselPagingComponent({ images }: CarouselPaging) {
  const [sliderNav, setSliderNav] = useState(null)
  const [sliderThumb, setSliderThumb] = useState(null)
  const [mainSlider, setMainSlider] = useState(null)
  const [thumbSlider, setThumbSlider] = useState(null)

  useEffect(() => {
    setSliderNav(mainSlider)
    setSliderThumb(thumbSlider)
  })

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
  }

  const settingsThumbs = {
    slidesToShow: 2.99,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '30px',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.999,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="carousel-custom-paging">
      <div className="slider-wrapper">
        <div className="show-slider-wrap">
          <Slider {...settingsMain} asNavFor={sliderThumb} ref={(slider) => setMainSlider(slider)}>
            {images.map((image, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <div className="flex items-center justify-center overflow-hidden border rounded-lg border-border-default bg-background-light">
                  <img className="w-auto max-h-[400px]" src={image.url} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex justify-between thumbnail-slider-wrap">
          <PrevArrow
            onClick={() => {
              mainSlider.slickNext()
              thumbSlider.slickNext()
            }}
          />
          <Slider {...settingsThumbs} asNavFor={sliderNav} ref={(slider) => setThumbSlider(slider)} className="w-9/12">
            {images.map((image, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <div className="flex items-center justify-center px-2 overflow-hidden md:px-6">
                  <img className="w-full h-full border rounded-lg border-border-default" src={image.url} />
                </div>
              </div>
            ))}
          </Slider>
          <NextArrow
            onClick={() => {
              mainSlider.slickPrev()
              thumbSlider.slickPrev()
            }}
          />
        </div>
      </div>
    </div>
  )
}
export const CarouselPaging = CarouselPagingComponent
