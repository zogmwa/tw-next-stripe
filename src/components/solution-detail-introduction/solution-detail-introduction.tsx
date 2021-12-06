import React, { useState } from 'react'
import { BsBookmarkPlus, BsBookmarkCheckFill, BsShare, BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Popover from '@mui/material/Popover'
import ReactTooltip from 'react-tooltip'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Typography from '@mui/material/Typography'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'
import {
  toggleUpVoteSolution,
  toggleDownVoteSolution,
  toggleBookmarkSolution,
  toggleCancelBookmarkSolution,
} from '@taggedweb/queries/solution'
import { useRequireLogin } from '@taggedweb/hooks/use-require-login'
import { SolutionDetailMobileSidebar } from '../solution-detail-sidebar'
import { SolutionFAQ } from './index'
import { ServiceLogo } from '../service-logo'
import { UpvoteUser } from '../upvote-user'
import { Button } from '../button'
import { Spinner } from '../spinner'

type SolutionDetailIntroductionProps = {
  introductionData: {
    id: number
    slug: string
    assets: any[]
    tag: { name: string; slug: string }
    title: string
    upvoted_count: number
    booked_count: number
    provide_organization: { name: string; logo_url: string | null; website: string | null }
    overview_description: string
    scope_of_work_description: string
    sidebar_info: {
      primary_price: {
        id: number
        solution: number
        stripe_price_id: string
        price: string | number
        currency: string
        is_primary: boolean
      }
      price: number
      features: { id: string; name: string; tooltipContent: string }[]
      purchaseDisableOption: boolean
    }
    questions: { title: string; primary_answer: string }[]
    my_solution_vote: number | null
    my_solution_bookmark: number | null
  }
}

function SolutionDetailIntroductionComponent({ introductionData }: SolutionDetailIntroductionProps) {
  const { requireLoginBeforeAction } = useRequireLogin()
  const [votedByMe, setVotedByMe] = useState(introductionData.my_solution_vote)
  const [bookmarkByMe, setBookmarkByMe] = useState(introductionData.my_solution_bookmark)
  const [isLoadingBookmark, setIsLoadingBookmark] = useState(false)
  const [isLoadingUpvote, setIsLoadingUpvote] = useState(false)
  const [upvotesCount, setUpvotesCount] = useState(introductionData.upvoted_count)
  const { asPath } = useRouter()
  const router = useRouter()

  const setToggleUpvotedByMe = async () => {
    if (!isLoadingUpvote) {
      setIsLoadingUpvote(true)
      const upvotesCounts = upvotesCount
      if (votedByMe) {
        const votedByMeStatus = await toggleDownVoteSolution(votedByMe, introductionData.slug)
        if (votedByMeStatus) {
          setVotedByMe(null)
          setUpvotesCount(upvotesCounts - 1) // TODO: we need to get the accurate upvote count from API
        }
      } else {
        const votedByMeStatus = await toggleUpVoteSolution(introductionData.id)
        if (votedByMeStatus) {
          setVotedByMe(votedByMeStatus.id)
          setUpvotesCount(upvotesCounts + 1) // TODO: we need to get the accurate upvote count from API
        }
      }
      setIsLoadingUpvote(false)
    }
  }

  const setToggleBookmarkByMe = async () => {
    if (!isLoadingBookmark) {
      setIsLoadingBookmark(true)
      if (bookmarkByMe) {
        const bookmarkedByMeStatus = await toggleCancelBookmarkSolution(bookmarkByMe, introductionData.slug)
        if (bookmarkedByMeStatus) setBookmarkByMe(null)
      } else {
        const bookmarkedByMeStatus = await toggleBookmarkSolution(introductionData.id)
        if (bookmarkedByMeStatus) {
          console.log(bookmarkedByMeStatus)
          setBookmarkByMe(bookmarkedByMeStatus.id)
        }
      }
      setIsLoadingBookmark(false)
    }
  }

  return (
    <div className="flex flex-col w-full divide-y flex-fol divide-solid divide-border-default">
      <div className="flex justify-between p-4 md:px-0">
        <div className="flex flex-col">
          <a className="inline-flex">
            <Button buttonType="tag" size="small">
              {introductionData.tag.name}
            </Button>
          </a>
          <h2 className="mt-2 text-3xl font-bold">{introductionData.title}</h2>
          <UpvoteUser
            isLoading={isLoadingUpvote}
            isVotedByMe={votedByMe}
            upvotesCount={upvotesCount}
            usersCount={introductionData.booked_count}
            toggleUpvote={setToggleUpvotedByMe}
            className="hidden mt-2 md:flex"
          />
          <div className="flex items-center justify-between mt-4 md:hidden">
            <UpvoteUser
              isLoading={isLoadingUpvote}
              isVotedByMe={votedByMe}
              upvotesCount={upvotesCount}
              usersCount={introductionData.booked_count}
              toggleUpvote={setToggleUpvotedByMe}
            />
            <div className="flex min-w-[7rem] self-start justify-end space-x-2">
              {introductionData.assets.slice(0, 3).map((asset, key) => (
                <div key={`mobileServiceLogo${key}`} onClick={() => router.push(`/software/${asset.slug}`)}>
                  <ServiceLogo
                    serviceName={asset?.name}
                    serviceId={asset.id}
                    logoUrl={asset.logo_url}
                    className="!w-[2rem] !h-[2rem] p-1 border border-solid rounded-md border-border-default cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="self-start hidden md:flex min-w-[7rem] justify-end space-x-2">
          {introductionData.assets.slice(0, 3).map((asset, key) => (
            <div key={`mobileServiceLogo${key}`} onClick={() => router.push(`/software/${asset.slug}`)}>
              <ServiceLogo
                serviceName={asset?.name}
                serviceId={asset.id}
                logoUrl={asset.logo_url}
                className="!w-[2rem] !h-[2rem] p-1 border border-solid rounded-md border-border-default cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between p-4 md:px-0">
        <div className="flex items-center">
          {introductionData.provide_organization.logo_url ? (
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={introductionData.provide_organization.logo_url}
              alt={introductionData.provide_organization.name}
            />
          ) : (
            <div className="w-[40px] h-[40px] bg-text-secondary rounded-full" />
          )}
          <span className="pl-2 text-sm text-text-secondary">{introductionData.provide_organization.name}</span>
        </div>
        <div className="flex">
          <button
            className="inline-flex items-center justify-center px-2 py-1 mr-2 space-x-4 text-sm border rounded-md border-primary text-primary"
            onClick={requireLoginBeforeAction(() => setToggleBookmarkByMe())}
            disabled={isLoadingBookmark}
          >
            {isLoadingBookmark && <Spinner />}
            {bookmarkByMe ? (
              <BsBookmarkCheckFill className="text-primary text-[1.4rem]" />
            ) : (
              <BsBookmarkPlus className="text-primary text-[1.4rem]" />
            )}
          </button>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button icon={<BsShare className="text-primary" />} {...bindTrigger(popupState)}>
                  Share
                </Button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Typography sx={{ paddingY: '0.5rem', paddingX: '1rem' }}>
                    <div className="flex space-x-2">
                      <FacebookShareButton url={process.env.SITE_BASE_URL + asPath}>
                        <BsFacebook className="p-1 text-2xl rounded-full text-primary" />
                      </FacebookShareButton>
                      <LinkedinShareButton url={process.env.SITE_BASE_URL + asPath}>
                        <BsLinkedin className="p-1 text-2xl rounded-md text-primary" />
                      </LinkedinShareButton>
                      <TwitterShareButton url={process.env.SITE_BASE_URL + asPath}>
                        <BsTwitter className="p-1 text-2xl rounded-full text-primary" />
                      </TwitterShareButton>
                    </div>
                  </Typography>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
      </div>
      <SolutionDetailMobileSidebar detailInfo={introductionData.sidebar_info} className="md:hidden" />
      <div className="flex flex-col p-4 md:p-0">
        <div className="flex flex-col pt-2 md:pt-6">
          <h4 className="font-bold text-md">Overview</h4>
          <div
            className="mt-3 text-sm text-text-secondary"
            dangerouslySetInnerHTML={{
              __html: introductionData.overview_description,
            }}
          />
        </div>
        <div className="flex flex-col pt-2 md:pt-6">
          <h4 className="font-bold text-md">Scope of Work</h4>
          <div className="mt-3 text-sm text-text-secondary">{introductionData.scope_of_work_description}</div>
        </div>
        <div className="py-4">
          <SolutionFAQ questions={introductionData.questions} solutionSlug={introductionData.slug} />
        </div>
      </div>
      <ReactTooltip id="tooltip-upvote" type="light" place="top" border={true} borderColor="text-grey-200">
        Upvote Solution
      </ReactTooltip>
    </div>
  )
}

export const SolutionDetailIntroduction = SolutionDetailIntroductionComponent
