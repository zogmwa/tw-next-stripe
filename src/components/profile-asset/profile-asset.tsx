import React from 'react'
import { GrShare } from 'react-icons/gr'
import { TruncatedDescription } from '../truncated-description'
import { Button } from '../button'
import { Asset } from '../../types/asset'

type ProfileCardProps = {
  asset: Asset
}

function ProfileCardComponent({ asset }: ProfileCardProps) {
  return (
    <div className="flex flex-col px-4 py-4 space-y-3 md:flex-row md:space-x-8 md:space-y-0">
      <div className="flex items-start justify-start w-full space-x-8">
        <div className="flex flex-col items-center justify-start space-y-3">
          <img src={asset.logo_url} alt="Web Service" className="object-contain h-[72px] w-[72px] rounded-md" />
        </div>
        <div className="flex-1">
          <div className="flex justify-start space-x-2">
            <h1 className="text-base font-medium text-text-primary">{asset.name}</h1>
            <a
              href={asset.website ?? '#'}
              target={asset.website ? '_blank' : ''}
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
          </div>
          <TruncatedDescription description={asset.description} className="mb-2" />
          <div className="flex flex-row flex-wrap space-x-2">
            {asset.tags.map((tag) => {
              return (
                <Button key={tag.slug} buttonType="tag" size="small">
                  {tag.name}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProfileAsset = ProfileCardComponent
