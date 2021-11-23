import React, { useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import { BsShare, BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Popover from '@mui/material/Popover'
import ReactTooltip from 'react-tooltip'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Typography from '@mui/material/Typography'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'
import { toggleUpVoteSolution, toggleDownVoteSolution } from '@taggedweb/queries/solution'
import { SolutionDetailMobileSidebar } from '../solution-detail-sidebar'
import { SolutionFAQ } from './index'
import { UpvoteUser } from '../upvote-user'
import { Button } from '../button'

type SolutionDetailIntroductionProps = {
  introductionData: {
    id: number
    slug: string
    tag: { name: string; slug: string }
    title: string
    upvoted_count: number
    users_count: number
    provide_organization: { name: string; logo_url: string | null; website: string | null }
    overview_description: string
    scope_of_work_description: string
    sidebar_info: { price: number; features: { name: string }[] }
    questions: { title: string; primary_answer: string }[]
    my_solution_vote: number | null
  }
}

function SolutionDetailIntroductionComponent({ introductionData }: SolutionDetailIntroductionProps) {
  const [votedByMe, setVotedByMe] = useState(introductionData.my_solution_vote)
  const [isLoadingUpvote, setIsLoadingUpvote] = useState(false)
  const [upvotesCount, setUpvotesCount] = useState(introductionData.upvoted_count)
  const { asPath } = useRouter()

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
            usersCount={introductionData.users_count}
            toggleUpvote={setToggleUpvotedByMe}
            className="hidden mt-2 md:flex"
          />
          <div className="flex items-center justify-between mt-4 md:hidden">
            <UpvoteUser
              isLoading={isLoadingUpvote}
              isVotedByMe={votedByMe}
              upvotesCount={upvotesCount}
              usersCount={introductionData.users_count}
              toggleUpvote={setToggleUpvotedByMe}
            />
            <div className="flex space-x-2">
              <div className="p-1 border border-solid rounded-md border-border-default">
                <img
                  src="https://s3-alpha-sig.figma.com/img/439e/fbad/d7071737e5895ae4fc5638fce3ef9d7d?Expires=1637539200&Signature=Z4Zxj2A8~d-~jzhWTQHMlbrjY8X3PxwvJ-YvhooQ90OQeYSoZWUDxsWlCgZvtl1dhJ7~stlijY9cic~BrnD0Uqdmz~~1MwMEgQsqrcs1Oz6Gi~Yc4hssrMNvpg2elR4ItWu349hWWwI~-mUlTv6YugkxaU3AuzROJtlKAoDfX8dXvmZvCYFenzEhK-k3tTTSviW2ynIAVzBDCFBlt9QqA0SWFS6by65ff7NilgzUbsryJCsLlbqmrsHcODbqxWoICPW9oQ09C3o48-sb60LEWl-w2hbaE2mkYvLVQdpCg7zXwd878AN~Tz3ebm5C0WFbjK9gjtkLARBxLg3ykHIfuA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  alt="diamond"
                  className="w-8"
                />
              </div>
              <div className="p-1 border border-solid rounded-md border-border-default">
                <img
                  src="https://s3-alpha-sig.figma.com/img/c955/3ecf/e57798dfb2637c0280d36e30d747befc?Expires=1637539200&Signature=VPWp5Nb2vNzRd2tth4B9~X9R2MOxmVxVu9orXKRI0BLAPXChgrExUYcksMn6exW6C-6q47NOa2QXcDCc8dGrDwoRGwye19BK5oPRVCwLie9Rm3cAonu0MA3npHwSuFzJZKbAknMraHr1sk5OSZicnjHbpnKWi3JyzB6KeF8-qPN2Sf0aJGDMpJoDy3Hk~IsfbbBge7NdEZJkItFyqeCp7QHwMq7aWFXhDPP-Xt440CFVk-fWG7hLcBO6NgdKCIZGrhcVdBIdkrbZAGbFsVNqQ9Y~7GcEkzn2T7xT31SbQb3LqE1Z9o35r-mOBl08X~MIeuMgqHebLoi7MnjQgvNUXA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  alt="webflow"
                  className="w-8"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="self-start hidden space-x-2 md:flex">
          <div className="p-1 border border-solid rounded-md border-border-default">
            <img
              src="https://s3-alpha-sig.figma.com/img/439e/fbad/d7071737e5895ae4fc5638fce3ef9d7d?Expires=1637539200&Signature=Z4Zxj2A8~d-~jzhWTQHMlbrjY8X3PxwvJ-YvhooQ90OQeYSoZWUDxsWlCgZvtl1dhJ7~stlijY9cic~BrnD0Uqdmz~~1MwMEgQsqrcs1Oz6Gi~Yc4hssrMNvpg2elR4ItWu349hWWwI~-mUlTv6YugkxaU3AuzROJtlKAoDfX8dXvmZvCYFenzEhK-k3tTTSviW2ynIAVzBDCFBlt9QqA0SWFS6by65ff7NilgzUbsryJCsLlbqmrsHcODbqxWoICPW9oQ09C3o48-sb60LEWl-w2hbaE2mkYvLVQdpCg7zXwd878AN~Tz3ebm5C0WFbjK9gjtkLARBxLg3ykHIfuA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt="diamond"
              className="w-8"
            />
          </div>
          <div className="p-1 border border-solid rounded-md border-border-default">
            <img
              src="https://s3-alpha-sig.figma.com/img/c955/3ecf/e57798dfb2637c0280d36e30d747befc?Expires=1637539200&Signature=VPWp5Nb2vNzRd2tth4B9~X9R2MOxmVxVu9orXKRI0BLAPXChgrExUYcksMn6exW6C-6q47NOa2QXcDCc8dGrDwoRGwye19BK5oPRVCwLie9Rm3cAonu0MA3npHwSuFzJZKbAknMraHr1sk5OSZicnjHbpnKWi3JyzB6KeF8-qPN2Sf0aJGDMpJoDy3Hk~IsfbbBge7NdEZJkItFyqeCp7QHwMq7aWFXhDPP-Xt440CFVk-fWG7hLcBO6NgdKCIZGrhcVdBIdkrbZAGbFsVNqQ9Y~7GcEkzn2T7xT31SbQb3LqE1Z9o35r-mOBl08X~MIeuMgqHebLoi7MnjQgvNUXA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt="webflow"
              className="w-8"
            />
          </div>
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
          <button className="inline-flex items-center justify-center px-2 py-1 mr-2 space-x-4 text-sm border rounded-md border-primary text-primary">
            <BiHeart className="text-primary text-[1.4rem]" />
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
