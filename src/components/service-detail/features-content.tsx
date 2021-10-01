import { useState } from 'react'
import { Switch } from '../switch'
import { Button } from '../button'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import { Carousel } from '../carousel/carousel'
import { Asset } from '../../types/asset'

type ServiceDetailFeatureProps = {
  service: Asset
}

function FeaturesContentComponent({ service }: ServiceDetailFeatureProps) {
  if (typeof service === 'undefined') return null

  let showedCount = 0
  const isVoted = false // upvoted status for testing without api.
  const defaultShowCount = 10
  const [isCon, setIsCon] = useState(false)
  const [viewMore, setViewMore] = useState(false)
  const logoUrl = service.logo_url ?? ''
  const attributes = service.attributes ?? []

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
          {attributes.length > 0 &&
            attributes.map((attribute) => {
              if (viewMore) {
                if (isCon)
                  return (
                    <div className="mt-2" key={attribute.name}>
                      <Button
                        size="small"
                        className={
                          attribute.is_con
                            ? isVoted
                              ? 'self-start text-background-light bg-text-error border-text-error'
                              : 'self-start text-text-error border-text-error'
                            : isVoted
                            ? 'self-start text-background-light bg-success border-success'
                            : 'self-start text-success border-success'
                        }
                        icon={
                          <HiChevronUp
                            className={
                              attribute.is_con
                                ? isVoted
                                  ? 'text-background-light'
                                  : 'text-text-error'
                                : isVoted
                                ? 'text-background-light'
                                : 'text-success'
                            }
                          />
                        }
                      >
                        {Number(attribute.upvotes_count) ? Number(attribute.upvotes_count) : 0}
                      </Button>
                      <span className="ml-2 text-sm text-black">{attribute.name}</span>
                    </div>
                  )
                else if (!attribute.is_con)
                  return (
                    <div className="mt-2" key={attribute.name}>
                      <Button
                        size="small"
                        className={
                          isVoted
                            ? 'self-start text-background-light bg-primary'
                            : 'self-start text-black border-text-tertiary'
                        }
                        icon={<HiChevronUp className={isVoted ? 'text-background-light' : 'text-black'} />}
                      >
                        {Number(attribute.upvotes_count) ? Number(attribute.upvotes_count) : 0}
                      </Button>
                      <span className="ml-2 text-sm text-black">{attribute.name}</span>
                    </div>
                  )
              } else {
                if (showedCount < defaultShowCount) {
                  if (isCon) {
                    showedCount++
                    return (
                      <div className="mt-2" key={attribute.name}>
                        <Button
                          size="small"
                          className={
                            attribute.is_con
                              ? isVoted
                                ? 'self-start text-background-light bg-text-error border-text-error'
                                : 'self-start text-text-error border-text-error'
                              : isVoted
                              ? 'self-start text-background-light bg-success border-success'
                              : 'self-start text-success border-success'
                          }
                          icon={
                            <HiChevronUp
                              className={
                                attribute.is_con
                                  ? isVoted
                                    ? 'text-background-light'
                                    : 'text-text-error'
                                  : isVoted
                                  ? 'text-background-light'
                                  : 'text-success'
                              }
                            />
                          }
                        >
                          {Number(attribute.upvotes_count) ? Number(attribute.upvotes_count) : 0}
                        </Button>
                        <span className="ml-2 text-sm text-black">{attribute.name}</span>
                      </div>
                    )
                  } else if (!attribute.is_con) {
                    showedCount++
                    return (
                      <div className="mt-2" key={attribute.name}>
                        <Button
                          size="small"
                          className={
                            isVoted
                              ? 'self-start text-background-light bg-primary'
                              : 'self-start text-black border-text-tertiary'
                          }
                          icon={<HiChevronUp className={isVoted ? 'text-background-light' : 'text-black'} />}
                        >
                          {Number(attribute.upvotes_count) ? Number(attribute.upvotes_count) : 0}
                        </Button>
                        <span className="ml-2 text-sm text-black">{attribute.name}</span>
                      </div>
                    )
                  }
                }
              }
            })}
        </div>
        {attributes.length > 0 && (showedCount === 0 || showedCount >= defaultShowCount) ? (
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
        ) : (
          ''
        )}
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

export const FeaturesContent = FeaturesContentComponent
