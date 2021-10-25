import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

type CarouselCustomPaging = {
  images?: { asset: number; url: string }[]
}

const PrevArrow = (props) => {
  const { className, onClick } = props
  return (
    <div className={`flex items-center rounded-md cursor-pointer ${className}`} onClick={onClick}>
      <HiChevronLeft className="rounded-full text-md text-text-secondary bg-border-default hover:text-black" />
    </div>
  )
}
const NextArrow = (props) => {
  const { className, onClick } = props
  return (
    <div className={`flex items-center rounded-md cursor-pointer ${className}`} onClick={onClick}>
      <HiChevronRight className="rounded-full text-md text-text-secondary bg-border-default hover:text-black" />
    </div>
  )
}

function CarouselCustomPagingComponent({ images }: CarouselCustomPaging) {
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
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav',
    prevArrow: (
      <PrevArrow
        onClick={() => {
          mainSlider.slickNext()
          thumbSlider.slickNext()
        }}
      />
    ),
    nextArrow: (
      <NextArrow
        onClick={() => {
          mainSlider.slickPrev()
          thumbSlider.slickPrev()
        }}
      />
    ),
  }

  const settingsThumbs = {
    slidesToShow: 2.99,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
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
    <div className="p-6 carousel-custom-paging">
      <div className="slider-wrapper">
        <div className="show-slider-wrap">
          <Slider {...settingsMain} asNavFor={sliderThumb} ref={(slider) => setMainSlider(slider)} className="flex">
            {images.map((image, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <div className="flex items-center justify-center overflow-hidden border rounded-lg border-border-default bg-background-light">
                  <img className="w-auto max-h-[400px]" src={image.url} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex justify-center thumbnail-slider-wrap">
          <Slider {...settingsThumbs} asNavFor={sliderNav} ref={(slider) => setThumbSlider(slider)} className="w-9/12">
            {images.map((image, index) => (
              <div key={index} className="aspect-w-16 aspect-h-9">
                <div className="flex items-center justify-center px-2 overflow-hidden">
                  <img className="w-full h-full border rounded-lg border-border-default" src={image.url} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export const CarouselCustomPaging = CarouselCustomPagingComponent
