import React, { useState, useEffect } from 'react'
import { useUserContext } from '../../hooks/use-user'
import { Asset } from '../../types/asset'
import {
  fetchAttributeVotes,
  toggleUpVoteAttribute,
  toggleDownVoteAttribute,
  fetchUpvotedAttributes,
} from '../../queries/service'
import { HighlightContent } from '../service-highlights'

type ServiceDetailFeatureProps = {
  service: Asset
}

function HighlightContentComponent({ service }: ServiceDetailFeatureProps) {
  if (typeof service === 'undefined') return null
  
  const [attributeVotesList, setAttributeVotesList] = useState([])
  const { authVerified } = useUserContext()
  const [attributes, setAttributes] = useState(service.attributes ?? [])
  const [isLoading, setIsLoading] = useState(false)
  const [clickedAttribute, setClickedAttribute] = useState(0)

  useEffect(() => {
    async function getVotedAttribute() {
      if (!authVerified) return

      const attributeVotes = await fetchAttributeVotes()
        if (attributeVotes) {
          let upVotedAttributes = attributeVotes.filter((item) => item.asset === service.id)
          setAttributeVotesList(upVotedAttributes)
      }
    }

    getVotedAttribute()
  }, [])

  const upvoteAttribute = async (attribute) => {
    if (!authVerified) return

    setClickedAttribute(attribute.id)
    setIsLoading(true)
    let data = null
    const selectedAttributeVote = attributeVotesList.find(
      (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
    )

    if (typeof selectedAttributeVote === 'undefined')
      data = await toggleUpVoteAttribute(service.id, attribute.id)
    else data = await toggleDownVoteAttribute(selectedAttributeVote.id)

    if (data) {
      const updatedAttributes = await fetchUpvotedAttributes(service?.slug)
      let updatedAssetAttributes = []
      let updatedUpvotedAttributes = []
      updatedAttributes.map(item => {
        updatedAssetAttributes.push({
          id: item.id,
          asset: service?.id,
          name: item.name,
          upvotes_count: item.upvotes_count,
          is_con: item.is_con,
        })
        if (item.my_asset_attribute_vote)
          updatedUpvotedAttributes.push({
            id: item.my_asset_attribute_vote,
            attribute: item.id,
            asset: service?.id,
          })
      })
      setAttributes(updatedAssetAttributes)
      setAttributeVotesList(updatedUpvotedAttributes)
    }
    setClickedAttribute(0)
    setIsLoading(false)
  }

  const logoUrl = service.logo_url ?? ''

  return (
    <>
      <HighlightContent 
        attributeVotesList={attributeVotesList}
        attributes={attributes}
        isLoading={isLoading}
        clickedAttribute={clickedAttribute}
        upvoteAttribute={upvoteAttribute}
        logoUrl={logoUrl}
      />
    </>
  )
}

export const HighlightSection = HighlightContentComponent
