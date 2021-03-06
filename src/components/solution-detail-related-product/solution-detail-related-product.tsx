import React from 'react'
import Link from 'next/link'
import { Carousel } from '../carousel/carousel'
import { ServiceLogo } from '../service-logo'

function SolutionDetailRelatedProductComponent({ relatedProducts }) {
  const relatedProductsLength = Math.ceil(relatedProducts.length / 4)
  const showRelatedProducts = []
  for (let i = 0; i < relatedProductsLength; i++) {
    showRelatedProducts.push([])
    for (let j = 0; j < 4; j++) {
      if (relatedProducts[i * 4 + j]) {
        showRelatedProducts[i].push(relatedProducts[i * 4 + j])
      }
    }
  }
  return (
    <>
      <Carousel buttonsShown={false} className="mt-2" itemsContainerClassName="border-none h-full">
        {showRelatedProducts.map((relatedSoftwares, index) => (
          <Carousel.Item className="!aspect-h-16 md:!aspect-h-3" key={index}>
            <div className="grid content-around w-full h-full grid-cols-2 md:content-center md:grid-cols-4 justify-items-center">
              {relatedSoftwares.map((software, index) => (
                <div key={index} className="w-full h-full p-2 md:p-4">
                  <Link href={`/software/${software.slug}`}>
                    <a>
                      <div className="flex flex-col items-center py-4 space-y-6 bg-white border border-solid rounded-md cursor-pointer border-border-default">
                        <ServiceLogo
                          logoUrl={software.logo_url}
                          owned={false}
                          serviceSlug={software.slug}
                          serviceName={software.name}
                        />
                        <span className="text-md text-text-primary">{software.name}</span>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export const SolutionDetailRelatedProduct = SolutionDetailRelatedProductComponent
