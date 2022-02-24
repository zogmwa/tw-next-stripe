import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Card = ({ subTitle = '', title, description = '', imgSrc = '', href = '', linkTitle = '' }) => (
  <div className="p-4 md:w-1/2 max-w-[554px]">
    <div className="h-full overflow-hidden border border-border-default rounded-md box-shadow shadow-md">
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <a>
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center lg:h-48 md:h-36"
                width={544}
                height={306}
              />
            </a>
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center lg:h-48 md:h-36"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        {subTitle && <span className="mb-2 text-sm text-text-primary">{subTitle}</span>}
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
        {description && (
          <p className="mb-3 font-medium text-sm prose text-gray-500 max-w-none dark:text-gray-400">{description}</p>
        )}
        {href && (
          <Link href={href} aria-label={`Link to ${title}`}>
            <a className="mb-3 text-sm font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              {linkTitle} &rarr;
            </a>
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
