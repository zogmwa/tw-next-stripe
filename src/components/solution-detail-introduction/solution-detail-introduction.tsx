import React from 'react'
import Link from 'next/link'
import { IoIosArrowUp } from 'react-icons/io'
import { BiHeart } from 'react-icons/bi'
import { BsShare } from 'react-icons/bs'
import { Button } from '../button'

type SolutionDetailIntroductionProps = {
  introductionData: {
    tag: { name: string; slug: string }
    title: string
    upvoted_count: number
    users_count: number
    provide_organization: { name: string; logo_url: string | null }
    overview_description: string[]
    scope_of_work_description: string
  }
}

function SolutionDetailIntroductionComponent({ introductionData }: SolutionDetailIntroductionProps) {
  const unitlist = ['', 'K', 'M', 'G']
  function kFormater(number) {
    const sign = Math.sign(number)
    let unit = 0
    while (Math.abs(number) > 999) {
      unit = unit + 1
      number = Math.floor(Math.abs(number) / 100) / 10
    }
    return sign * number + unitlist[unit]
  }

  return (
    <div className="flex flex-col space-y-4 divide-y flex-fol divide-solid divide-border-default">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <Link href={`/search/${introductionData.tag.slug}`} prefetch={false} key={introductionData.tag.slug}>
            <a className="inline-flex mt-2 mr-2">
              <Button buttonType="tag" size="small">
                {introductionData.tag.name}
              </Button>
            </a>
          </Link>
          <h2 className="mt-2 text-3xl font-bold">{introductionData.title}</h2>
          <div className="flex items-center mt-4 space-x-2">
            <IoIosArrowUp className="text-primary" />
            <span className="text-xl">{kFormater(introductionData.upvoted_count)}</span>
            <span className="self-end text-xs text-text-secondary pb-[0.2rem]">
              {kFormater(introductionData.users_count)} users
            </span>
          </div>
        </div>
        <div className="flex self-start space-x-2">
          <div className="p-1 border border-solid rounded-md border-border-default">
            <img
              src="https://s3-alpha-sig.figma.com/img/439e/fbad/d7071737e5895ae4fc5638fce3ef9d7d?Expires=1637539200&Signature=Z4Zxj2A8~d-~jzhWTQHMlbrjY8X3PxwvJ-YvhooQ90OQeYSoZWUDxsWlCgZvtl1dhJ7~stlijY9cic~BrnD0Uqdmz~~1MwMEgQsqrcs1Oz6Gi~Yc4hssrMNvpg2elR4ItWu349hWWwI~-mUlTv6YugkxaU3AuzROJtlKAoDfX8dXvmZvCYFenzEhK-k3tTTSviW2ynIAVzBDCFBlt9QqA0SWFS6by65ff7NilgzUbsryJCsLlbqmrsHcODbqxWoICPW9oQ09C3o48-sb60LEWl-w2hbaE2mkYvLVQdpCg7zXwd878AN~Tz3ebm5C0WFbjK9gjtkLARBxLg3ykHIfuA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt="diamond"
              className="w-8 h-8"
            />
          </div>
          <div className="p-1 border border-solid rounded-md border-border-default">
            <img
              src="https://s3-alpha-sig.figma.com/img/c955/3ecf/e57798dfb2637c0280d36e30d747befc?Expires=1637539200&Signature=VPWp5Nb2vNzRd2tth4B9~X9R2MOxmVxVu9orXKRI0BLAPXChgrExUYcksMn6exW6C-6q47NOa2QXcDCc8dGrDwoRGwye19BK5oPRVCwLie9Rm3cAonu0MA3npHwSuFzJZKbAknMraHr1sk5OSZicnjHbpnKWi3JyzB6KeF8-qPN2Sf0aJGDMpJoDy3Hk~IsfbbBge7NdEZJkItFyqeCp7QHwMq7aWFXhDPP-Xt440CFVk-fWG7hLcBO6NgdKCIZGrhcVdBIdkrbZAGbFsVNqQ9Y~7GcEkzn2T7xT31SbQb3LqE1Z9o35r-mOBl08X~MIeuMgqHebLoi7MnjQgvNUXA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
              alt="webflow"
              className="w-8 h-8"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4">
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
          <Button icon={<BsShare className="text-primary" />}>Share</Button>
        </div>
      </div>
      <div className="flex flex-col pt-6">
        <h4 className="font-bold text-md">Overview</h4>
        {introductionData.overview_description.map((overview, index) => (
          <div className="mt-3 text-sm text-text-secondary" key={index}>
            {overview}
          </div>
        ))}
      </div>
      <div className="flex flex-col pt-6">
        <h4 className="font-bold text-md">Scope of Work</h4>
        <div className="mt-3 text-sm text-text-secondary">{introductionData.scope_of_work_description}</div>
      </div>
    </div>
  )
}

export const SolutionDetailIntroduction = SolutionDetailIntroductionComponent
