/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Asset } from '../../types/asset'
import {
  fetchAttributeVotes,
  toggleUpVoteAttribute,
  toggleDownVoteAttribute,
  fetchUpvotedAttributes,
  toggleAddAttribute,
} from '../../queries/service'
import { HighlightContent } from '../service-highlights'

type ServiceDetailFeatureProps = {
  service: Asset
}

function HighlightContentComponent({ service }: ServiceDetailFeatureProps) {
  if (typeof service === 'undefined') return null

  const [attributeVotesList, setAttributeVotesList] = useState([])
  const [attributes, setAttributes] = useState(service.attributes ?? [])
  const [isLoading, setIsLoading] = useState(false)
  const [clickedAttribute, setClickedAttribute] = useState(0)
  const [addAttributeName, setAddAttributeName] = useState('')
  const [addAttributeCon, setAddAttributeCon] = useState(false)
  const [addAttributeNameErrorMessage, setAddAttributeNameErrorMessage] = useState('')

  useEffect(() => {
    async function getVotedAttribute() {
      const attributeVotes = await fetchAttributeVotes()
      if (attributeVotes) {
        const upVotedAttributes = attributeVotes.filter((item) => item.asset === service.id)
        setAttributeVotesList(upVotedAttributes)
      }
    }

    getVotedAttribute()
  }, [service.id])

  const upvoteAttribute = async (attribute) => {
    setClickedAttribute(attribute.id)
    setIsLoading(true)
    let data = null
    const selectedAttributeVote = attributeVotesList.find(
      (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
    )

    if (typeof selectedAttributeVote === 'undefined') data = await toggleUpVoteAttribute(service.id, attribute.id)
    else data = await toggleDownVoteAttribute(selectedAttributeVote.id)

    // TODO: Will fix in next branch.
    if (data) {
      const updatedAttributes = await fetchUpvotedAttributes(service?.slug)
      const updatedAssetAttributes = []
      const updatedUpvotedAttributes = []
      // eslint-disable-next-line array-callback-return
      updatedAttributes.map((item) => {
        updatedAssetAttributes.push({
          id: item.id,
          asset: service?.id,
          name: item.name,
          upvotes_count: item.upvotes_count,
          is_con: item.is_con,
        })
        if (item.my_asset_attribute_vote) {
          updatedUpvotedAttributes.push({
            id: item.my_asset_attribute_vote,
            attribute: item.id,
            asset: service?.id,
          })
        }
      })
      setAttributes(updatedAssetAttributes)
      setAttributeVotesList(updatedUpvotedAttributes)
    }
    setClickedAttribute(0)
    setIsLoading(false)
  }

  const addAttributeAction = async () => {
    if (addAttributeName === '') {
      setAddAttributeNameErrorMessage('This field is not valid')
    } else {
      const addedAttribute = await toggleAddAttribute(addAttributeName, addAttributeCon)
      if (addedAttribute) {
        toast.success(`Added an attribute successfully.`)
        setAddAttributeNameErrorMessage('')
        setAddAttributeName('')
        setAddAttributeCon(false)
      }
    }
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
        addAttributeName={addAttributeName}
        setAddAttributeName={setAddAttributeName}
        addAttributeCon={addAttributeCon}
        setAddAttributeCon={setAddAttributeCon}
        addAttributeAction={addAttributeAction}
        addAttributeNameErrorMessage={addAttributeNameErrorMessage}
      />
    </>
  )
}

export const HighlightSection = HighlightContentComponent
