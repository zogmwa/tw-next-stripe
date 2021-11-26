import React from 'react'
import { useRouter } from 'next/router'
import { TopSaasTags } from '@taggedweb/utils/top-tags'
import { DynamicHeader } from '@taggedweb/components/dynamic-header'

export default function Software() {
  const router = useRouter()

  return (
    <>
      <DynamicHeader />
      <div className="flex flex-col max-w-screen-lg mx-auto">
        <h4 className="self-start my-4 text-lg font-semibold text-text-primary">TOP SOFTWARE TAGS</h4>
        <div className="flex flex-col space-y-2">
          {TopSaasTags.map((tag) => (
            <div
              className="flex items-center px-4 py-2 space-x-2 border border-solid rounded-md cursor-pointer border-border-default"
              key={tag.slug}
              onClick={() => router.push(`/softwares/${tag.slug}`)}
            >
              <span>
                {tag.name}
                {tag.description && ':'}
              </span>
              <span>{tag.description}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
