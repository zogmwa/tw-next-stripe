import React, { useState } from 'react'
import { FeaturedSelect } from './featured-select'
import { FeaturedService } from './featured-service'

type HomepageFeaturedComponent = {
  featuredList: {
    name: string
    services: { id: number; name: string; logo_url: string; slug: string }[]
  }[]
}

function HomepageFeaturedComponent({ featuredList }: HomepageFeaturedComponent) {
  if (featuredList.length === 0) return null

  const [selectedItem, setSelectedItem] = useState(featuredList[0].name)

  const handleSelectedFeatureItem = (name) => {
    setSelectedItem(name)
  }

  return (
    <div className="md:flex">
      <FeaturedSelect
        featuredList={featuredList}
        selected={selectedItem}
        onSelect={(name) => handleSelectedFeatureItem(name)}
      />
      <FeaturedService featuredList={featuredList} selected={selectedItem} />
    </div>
  )
}

export const HomepageFeatured = HomepageFeaturedComponent
