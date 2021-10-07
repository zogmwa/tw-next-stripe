import React, { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { useUserContext } from '../../hooks/use-user'
import { Switch } from '../switch'
import { Button } from '../button'
import { Carousel } from '../carousel/carousel'
import { Asset } from '../../types/asset'
import { fetchService, fetchVotedAttributes, fetchUpVoteAttribute, fetchDownVoteAttribute } from '../../queries/service'

type ServiceDetailFeatureProps = {
  service: Asset
}

function HighlightContentComponent({ service }: ServiceDetailFeatureProps) {
  if (typeof service === 'undefined') return null
  const [isCon, setIsCon] = useState(false)
  const [viewMore, setViewMore] = useState(false)
  const [votedAttributesList, setVotedAttributesList] = useState([])
  const { authVerified } = useUserContext()
  const [attributes, setAttributes] = useState(service.attributes ?? [])
  const [isLoading, setIsLoading] = useState(false)
  const [clickedAttribute, setClickedAttribute] = useState(0)

  useEffect(() => {
    async function getVotedAttribute() {
      const data = await fetchVotedAttributes()
      if (data) {
        let upVotedAttributes = data.filter((item) => item.asset === service.id)
        setVotedAttributesList(upVotedAttributes.filter((item) => item.is_upvote === true))
      }
    }

    getVotedAttribute()
  }, [])

  const upvoteAttribute = async (attribute) => {
    setClickedAttribute(attribute.id)
    setIsLoading(true)
    let data = null
    const selectedAttribute = votedAttributesList.find(
      (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
    )

    if (typeof selectedAttribute === 'undefined' || !selectedAttribute.is_upvote)
      data = await fetchUpVoteAttribute(service.id, attribute.id, true)
    else data = await fetchDownVoteAttribute(selectedAttribute.id)

    if (typeof data !== 'undefined') {
      const updatedService = await fetchService(`${service.slug}?asset=${service.slug}`, authVerified)
      if (typeof service !== 'undefined') {
        setAttributes(updatedService.attributes ?? [])
        const updatedVotedAttributes = await fetchVotedAttributes()
        if (updatedVotedAttributes) setVotedAttributesList(updatedVotedAttributes)
      }
    }
    setClickedAttribute(0)
    setIsLoading(false)
  }

  const defaultShowCount = 10
  const logoUrl = service.logo_url ?? ''

  let tempAttributes = attributes
  if (!isCon) tempAttributes = attributes.filter((attribute) => attribute.is_con === isCon)
  if (!viewMore) tempAttributes = tempAttributes.slice(0, 10)

  return (
    <div className="ml-3 md:mt-10">
      <div className="flex justify-between">
        <div className="md:flex md:justify-start">
          <h1 className="text-base font-medium text-text-primary">Highlights</h1>
          <Switch.Group className="mt-2 md:mt-0 md:ml-2">
            <Switch enabled={isCon} setEnabled={setIsCon} />
            <Switch.Label>{isCon ? 'Show cons as well' : 'Show cons too'}</Switch.Label>
          </Switch.Group>
        </div>
        <Button
          size="small"
          className="self-start text-white bg-primary"
          icon={<AiOutlinePlus className="text-white" />}
        >
          Add Highlight
        </Button>
      </div>
      <div className="mt-6 md:mt-2">
        <div className="md:grid md:grid-cols-2">
          {tempAttributes.map((attribute) => {
            if (isCon) {
              return (
                <div className="mt-2" key={attribute.name}>
                  <Button
                    size="small"
                    className={
                      attribute.is_con
                        ? typeof votedAttributesList.find(
                            (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                          ) !== 'undefined'
                          ? 'self-start text-background-light bg-text-error border-text-error'
                          : 'self-start text-text-error border-text-error'
                        : typeof votedAttributesList.find(
                            (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                          ) !== 'undefined'
                        ? 'self-start text-background-light bg-success border-success'
                        : 'self-start text-success border-success'
                    }
                    icon={
                      <HiChevronUp
                        className={
                          attribute.is_con
                            ? typeof votedAttributesList.find(
                                (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                              ) !== 'undefined'
                              ? 'text-background-light'
                              : 'text-text-error'
                            : typeof votedAttributesList.find(
                                (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                              ) !== 'undefined'
                            ? 'text-background-light'
                            : 'text-success'
                        }
                      />
                    }
                    loading={isLoading && clickedAttribute === attribute.id}
                    loadingClassName={
                      typeof votedAttributesList.find(
                        (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                      ) !== 'undefined'
                        ? 'text-background-light w-3 h-3'
                        : 'text-primary w-3 h-3'
                    }
                    onClick={() => upvoteAttribute(attribute)}
                    disabled={isLoading}
                  >
                    {Number(attribute.upvotes_count) ? Number(attribute.upvotes_count) : 0}
                  </Button>
                  <span className="ml-2 text-sm text-text-secondary">{attribute.name}</span>
                </div>
              )
            } else {
              return (
                <div className="mt-2" key={attribute.name}>
                  <Button
                    size="small"
                    className={
                      typeof votedAttributesList.find(
                        (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                      ) !== 'undefined'
                        ? 'self-start text-background-light bg-primary'
                        : 'self-start text-text-secondary border-text-tertiary'
                    }
                    textClassName={
                      typeof votedAttributesList.find(
                        (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                      ) !== 'undefined'
                        ? 'text-background-light'
                        : 'text-text-secondary'
                    }
                    icon={
                      <HiChevronUp
                        className={
                          typeof votedAttributesList.find(
                            (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                          ) !== 'undefined'
                            ? 'text-background-light'
                            : 'text-text-secondary'
                        }
                      />
                    }
                    loading={isLoading && clickedAttribute === attribute.id}
                    loadingClassName={
                      typeof votedAttributesList.find(
                        (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                      ) !== 'undefined'
                        ? 'text-background-light w-3 h-3'
                        : 'text-primary w-3 h-3'
                    }
                    onClick={() => upvoteAttribute(attribute)}
                    disabled={isLoading}
                  >
                    {Number(attribute.upvotes_count) ? Number(attribute.upvotes_count) : 0}
                  </Button>
                  <span className="ml-2 text-sm text-text-secondary">{attribute.name}</span>
                </div>
              )
            }
          })}
        </div>
        {tempAttributes.length > 0 &&
        attributes.length !== defaultShowCount &&
        tempAttributes.length >= defaultShowCount ? (
          viewMore ? (
            <div
              className="flex self-start w-24 px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
              onClick={() => setViewMore(false)}
            >
              Load less
              <HiChevronUp className="self-center ml-2 text-text-tertiary" />
            </div>
          ) : (
            <div
              className="flex self-start w-24 px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
              onClick={() => setViewMore(true)}
            >
              Load more
              <HiChevronDown className="self-center ml-2 text-text-tertiary" />
            </div>
          )
        ) : null}
      </div>
      <div className="mt-6 md:mt-4">
        <h1 className="text-base font-medium text-text-primary">Used by Compaines like</h1>
        <Carousel buttonsShown={false} className="mt-2" itemsContainerClassName="border-none">
          <Carousel.Item className="aspect-h-16 md:aspect-h-3">
            <div className="grid content-center grid-cols-2 md:grid-cols-4 justify-items-center">
              <img src={logoUrl} className="m-2" />
              <img src={logoUrl} className="m-2" />
              <img src={logoUrl} className="m-2" />
              <img src={logoUrl} className="m-2" />
            </div>
          </Carousel.Item>
          <Carousel.Item className="aspect-h-16 md:aspect-h-3">
            <div className="grid content-center grid-cols-2 md:grid-cols-4 justify-items-center">
              <img src={logoUrl} className="m-2" />
              <img src={logoUrl} className="m-2" />
              <img src={logoUrl} className="m-2" />
              <img src={logoUrl} className="m-2" />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  )
}

export const HighlightContent = HighlightContentComponent
