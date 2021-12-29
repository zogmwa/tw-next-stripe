/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Asset } from '@taggedweb/types/asset'
import {
  fetchAttributeVotes,
  toggleUpVoteAttribute,
  toggleDownVoteAttribute,
  fetchUpvotedAttributes,
  toggleAddAttribute,
  linkAttributeToAsset,
} from '@taggedweb/queries/service'
import { HighlightContent } from '../service-highlights'

type ServiceDetailFeatureProps = {
  service: Asset
  editAllowed?: boolean
  onChange?: Function
  id?: string | ''
}

function HighlightContentComponent({
  service,
  editAllowed = false,
  onChange = () => {},
  id,
}: ServiceDetailFeatureProps) {
  if (typeof service === 'undefined') return null

  const [attributes, setAttributes] = useState(service.attributes ?? [])
  const [isLoading, setIsLoading] = useState(false)
  const [clickedAttribute, setClickedAttribute] = useState(0)
  const [addAttributeName, setAddAttributeName] = useState(null)
  const [addAttributeCon, setAddAttributeCon] = useState(false)
  const [addAttributeNameErrorMessage, setAddAttributeNameErrorMessage] = useState('')
  const customerOrganizations = service?.customer_organizations ?? []

  useEffect(() => {
    setAttributes(service.attributes)
  }, [service.attributes])

  const upvoteAttribute = async (attribute) => {
    setClickedAttribute(attribute.id)
    setIsLoading(true)
    let data = null

    if (attribute.my_asset_attribute_vote) data = await toggleDownVoteAttribute(attribute.my_asset_attribute_vote)
    else data = await toggleUpVoteAttribute(service.id, attribute.id)

    if (data) {
      const updatedAttributes = await fetchUpvotedAttributes(service?.slug)
      const updatedAssetAttributes = []
      // eslint-disable-next-line array-callback-return
      updatedAttributes.map((item) => {
        updatedAssetAttributes.push({
          id: item.id,
          asset: service?.id,
          name: item.name,
          upvotes_count: item.upvotes_count,
          is_con: item.is_con,
          my_asset_attribute_vote: item.my_asset_attribute_vote,
        })
      })
      setAttributes(updatedAssetAttributes)
    }
    setClickedAttribute(0)
    setIsLoading(false)
  }

  const addAttributeAction = async () => {
    let addedAttribute = null
    if (addAttributeName === null) {
      setAddAttributeNameErrorMessage('This field is not valid')
    } else {
      if (addAttributeName.value === '') {
        setAddAttributeNameErrorMessage('This field is not valid')
      } else {
        if (addAttributeName.id === 0) {
          addedAttribute = await toggleAddAttribute(service?.id, addAttributeName.label, addAttributeCon)
        } else {
          addedAttribute = await linkAttributeToAsset(service.slug, addAttributeName.id)
        }
        if (addedAttribute) {
          const conflictAttr = attributes.find((attribute) => attribute.id === addedAttribute.id)
          if (typeof conflictAttr === 'undefined') {
            const updatedAttributes = attributes
            updatedAttributes.push({
              id: addedAttribute.id,
              name: addedAttribute.name,
              is_con: addedAttribute.is_con,
              upvotes_count: addedAttribute.upvotes_count,
              my_asset_attribute_vote: addedAttribute.my_asset_attribute_vote,
            })
            setAttributes(updatedAttributes)
            toast.success('Added an attribute successfully.')
          } else {
            toast.success('This attribute already exist.')
          }
        }
        setAddAttributeNameErrorMessage('')
        setAddAttributeName(null)
        setAddAttributeCon(false)
      }
    }
  }

  return (
    <>
      <HighlightContent
        attributes={attributes}
        isLoading={isLoading}
        clickedAttribute={clickedAttribute}
        upvoteAttribute={upvoteAttribute}
        addAttributeName={addAttributeName}
        setAddAttributeName={setAddAttributeName}
        addAttributeCon={addAttributeCon}
        setAddAttributeCon={setAddAttributeCon}
        addAttributeAction={addAttributeAction}
        addAttributeNameErrorMessage={addAttributeNameErrorMessage}
        customerOrganizations={customerOrganizations}
        editAllowed={editAllowed}
        onChange={onChange}
        id={id}
      />
    </>
  )
}

export const HighlightSection = HighlightContentComponent
