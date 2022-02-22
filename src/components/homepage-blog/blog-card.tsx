import React from 'react'
import Link from '@taggedweb/components/Link'

const Card = ({ title, description, href, readtime, imgSrc }) => {
  return (
    <div className="w-full p-4">
      <div className="h-full overflow-hidden bg-white border border-gray-500 rounded-md drop-shadow-md border-opacity-60 blog-card">
        {imgSrc && (
          <img
            alt={title}
            src={imgSrc}
            className="object-cover object-center lg:h-48 md:h-36"
            width={544}
            height={306}
          />
        )}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                <span className="text-black">{title}</span>
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="mb-3 prose text-gray-600 max-w-none">{description}</p>
          <p className="mb-3 prose text-gray-500 max-w-none">{readtime}</p>
          {href && (
            <Link
              href={href}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Read &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
