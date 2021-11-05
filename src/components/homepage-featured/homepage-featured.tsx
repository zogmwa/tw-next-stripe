import React, { useState } from 'react'
import { FeaturedSelect } from './featured-select'
import { FeaturedService } from './featured-service'

type HomepageFeaturedComponentProps = {
  featuredList: {
    name: string
    assets: { name: string; logo_url: string; slug: string }[]
  }[]
}

function HomepageFeaturedComponent({ featuredList }: HomepageFeaturedComponentProps) {
  if (featuredList.length === 0) return null

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
