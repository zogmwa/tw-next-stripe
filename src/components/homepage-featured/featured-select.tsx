import React from 'react'

type FeaturedSelectProps = {
  featuredList: {
    name: string
    services: { id: number; name: string; logo_url: string; slug: string }[]
  }[]
  selected: string
  onSelect: Function
}

function FeaturedSelectComponent({ featuredList, selected, onSelect }: FeaturedSelectProps) {
  return (
    <div className="px-4 md:flex md:flex-col md:w-64">
      {featuredList.map((item) => (
        <div
          className={
            item.name === selected
              ? 'py-1 my-1 px-4 bg-primary rounded-md text-white cursor-pointer'
              : 'py-1 my-1 px-4 cursor-pointer text-text-secondary'
          }
          key={item.name}
          onClick={() => onSelect(item.name)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export const FeaturedSelect = FeaturedSelectComponent
