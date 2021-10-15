/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { BsChevronUp } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai'
import { GrShare } from 'react-icons/gr'
import numeral from 'numeral'
import { useUserContext } from '../../hooks/use-user'
import { toggleUsedByStatus, toggleUpVoteAsset, toggleDownVoteAsset } from '../../queries/service'
import { TruncatedDescription } from '../truncated-description'
import { Button } from '../button'
import { Asset } from '../../types/asset'
import { Checkbox } from '../checkbox'
import { ServiceLogo } from '../service-logo'

type ServiceDetailCardProps = {
  service: Asset
  onToggleCompare?: (bool: any) => void
}

function ServiceDetailCardComponent({ service, onToggleCompare }: ServiceDetailCardProps) {
  const onCompare = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggleCompare) {
      onToggleCompare((event.target as HTMLInputElement).checked)
    }
  }

  if (typeof service === 'undefined') return null

  const [isLoadingUsedByMe, setIsLoadingUsedByMe] = useState(false)
  const [isLoadingUpvote, setIsLoadingUpvote] = useState(false)
  const [usedByMe, setUsedByMe] = useState(service?.used_by_me ?? false)
  const [votedByMe, setVotedByMe] = useState(service?.my_asset_vote)
  const [upvotesCount, setUpvotesCount] = useState(service?.upvotes_count)
  const router = useRouter()
  const { slug } = router?.query ? (router.query as { slug: string }) : ('' as unknown as { slug: string })
  const rating = numeral(Number(service.avg_rating ?? 0)).format('0.[0]')
  const user = useUserContext()
  const { authVerified } = user

  const setToggleUsedByState = async () => {
    if (!authVerified) return

    setIsLoadingUsedByMe(true)
    const resultStatus = await toggleUsedByStatus(slug, !usedByMe)
    setIsLoadingUsedByMe(false)
    if (resultStatus !== null) {
      setUsedByMe(resultStatus)
    }
  }

  const setToggleUpvotedByMe = async () => {
    if (!authVerified) return

    setIsLoadingUpvote(true)
    const upvotesCounts = upvotesCount
    if (votedByMe) {
      const votedByMeStatus = await toggleDownVoteAsset(votedByMe, service?.slug)
      if (votedByMeStatus) {
        setVotedByMe(null)
        setUpvotesCount(upvotesCounts - 1) // TODO: we need to get the accurate upvote count from API
      }
    } else {
      const votedByMeStatus = await toggleUpVoteAsset(service?.id)
      if (votedByMeStatus) {
        setVotedByMe(votedByMeStatus.id)
        setUpvotesCount(upvotesCounts + 1) // TODO: we need to get the accurate upvote count from API
      }
    }
    setIsLoadingUpvote(false)
  }

  return (
    <div className="flex flex-col pt-4 space-y-3 md:flex-row md:space-x-8 md:space-y-0 service-detail-card">
      <div className="flex items-start justify-start w-full space-x-4 md:space-x-8">
        <div className="flex flex-col items-center justify-start space-y-3">
          <ServiceLogo
            serviceName={service?.name}
            serviceId={service.id}
            logoUrl={service.logo_url}
            owned={service?.is_owned ?? false}
          />
          <div className="flex items-center space-x-2">
            <Checkbox onChange={onCompare} />
            <div className="text-xs uppercase text-text-tertiary">Compare</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-start space-x-2">
            <h1 className="text-base font-medium text-text-primary">{service.name}</h1>
            <a
              href={service.affiliate_link ? service.affiliate_link : service.website ?? '#'}
              target={service.affiliate_link || service.website ? '_blank' : ''}
              className="self-center"
              rel="noreferrer"
            >
              <Button
                className="hidden md:inline-flex"
                size="small"
                icon={<GrShare className="gr-primary gr-icon-share" />}
              >
                Visit Website
              </Button>
            </a>
            <div className="hidden md:flex md:items-center md:cursor-pointer md:space-x-2">
              <AiOutlineInfoCircle className="text-primary" />
              <span className="text-xs text-primary">Own this Service?</span>
            </div>
          </div>
          {service.short_description ? (
            <TruncatedDescription description={service.short_description} />
          ) : service.description ? (
            <TruncatedDescription description={service.description.substring(0, 200)} />
          ) : null}
          <div className="flex mt-2 space-x-2 text-sm sm:space-x-4 md:divide-x">
            <div className="flex items-end space-x-2">
              <AiOutlineStar className="self-center text-primary" />
              <span>{rating}</span>
              <span className="text-xs text-text-secondary">
                {Number(numeral(service.reviews_count).format('0.[0]a')) === 0
                  ? 'No Review'
                  : `${numeral(service.reviews_count).format('0.[0]a')} Reviews`}
              </span>
            </div>
            <div className="flex items-end space-x-2 md:pl-4">
              <BsChevronUp className="self-center text-primary" />
              <span>{service.upvotes_count}</span>
              <span className="text-xs text-text-secondary">{numeral(service.users_count).format('0.[0]a')} Users</span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap mb-5">
            {service.tags.map((tag) => {
              return (
                <Button key={tag.slug} buttonType="tag" size="small" className="mt-2 mr-2">
                  {tag.name}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 md:flex-col md:justify-start md:items-center md:space-x-0 md:space-y-4">
        <a
          href={service.website ?? '#'}
          target={service.website ? '_blank' : ''}
          className="self-center"
          rel="noreferrer"
        >
          <Button
            className="inline-flex w-40 md:hidden"
            size="small"
            icon={<GrShare className="gr-primary gr-icon-share" />}
          >
            Visit Website
          </Button>
        </a>
        <div className="flex items-center justify-center w-40 space-x-2 cursor-pointer md:hidden">
          <AiOutlineInfoCircle className="text-primary" />
          <span className="text-xs text-primary">Own this Service?</span>
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-4 md:flex-col md:justify-start md:items-center md:space-x-0 md:space-y-4">
        <Button
          className="inline-flex w-40 md:hidden"
          loading={isLoadingUsedByMe}
          loadingClassName={!usedByMe ? 'text-primary' : 'text-background-light'}
          buttonType={usedByMe ? 'primary' : 'default'}
          onClick={() => setToggleUsedByState()}
          disabled={isLoadingUsedByMe}
        >
          I&apos;ve used this
        </Button>
        <Button
          className="w-40 space-x-2"
          buttonType={votedByMe ? 'primary' : 'default'}
          icon={<BsChevronUp className={votedByMe ? 'self-center text-white' : 'self-center text-primary'} />}
          loading={isLoadingUpvote}
          loadingClassName={votedByMe ? 'text-background-light' : 'text-primary'}
          onClick={() => setToggleUpvotedByMe()}
        >
          {`Upvote ${upvotesCount}`}
        </Button>
        <Button
          className="hidden w-40 md:inline-flex"
          loading={isLoadingUsedByMe}
          loadingClassName={!usedByMe ? 'text-primary' : 'text-background-light'}
          buttonType={usedByMe ? 'primary' : 'default'}
          onClick={() => setToggleUsedByState()}
          disabled={isLoadingUsedByMe}
        >
          I&apos;ve used this
        </Button>
      </div>
    </div>
  )
}

export const ServiceDetailCard = ServiceDetailCardComponent
