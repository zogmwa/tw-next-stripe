import React from 'react'
import Link from 'next/link'
import { topTags } from '@tw/utils/top-tags'

function Page404() {
  const length = topTags.length

  return (
    <>
      <div className="flex flex-col py-20 md:flex-col">
        <p className="p-6 font-normal text-center text-8xl text-text-secondary">404</p>
        <p className="p-6 text-3xl font-light text-center">Sorry, this URL does not exist or is no longer available.</p>
        <p className="p-6 text-2xl font-light text-center text-text-secondary">
          Perhaps you were looking for one of the following pages:
        </p>
        <div className="flex grid flex-row grid-cols-2 gap-20 p-4 font-semibold list-none justify-items-stretch ">
          <div className="flex-1 px-6 justify-self-end">
            {topTags.slice(0, length / 2 + 1).map((tag) => {
              return (
                <li key={tag.slug}>
                  <Link href={`/search/${tag.slug}`} passHref>
                    <a
                      href="/#"
                      className="text-black hover:underline focus:ring-white focus:outline-none focus:border-white"
                    >
                      {tag.value}
                    </a>
                  </Link>
                </li>
              )
            })}
          </div>
          <div className="flex-1 px-6 justify-self-start">
            {topTags.slice(length / 2 + 1, length).map((tag) => {
              return (
                <li key={tag.slug}>
                  <Link href={`/search/${tag.slug}`} passHref>
                    <a
                      href="/#"
                      className="text-black hover:underline focus:ring-white focus:outline-none focus:border-white"
                    >
                      {tag.value}
                    </a>
                  </Link>
                </li>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page404
