import React from 'react'
import { useRouter } from 'next/router'
import { SearchBar } from '../components/search-bar'

export default function Home() {
  const router = useRouter()
  return (
    <div>
      <div className="flex items-center justify-center my-20">
        <div className="flex items-center justify-center w-1/2">
          <SearchBar
            onSubmit={(selectedTag) => {
              router.push(`/tags/${selectedTag}`)
            }}
          />
        </div>
      </div>
    </div>
  )
}
