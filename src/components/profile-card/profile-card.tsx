import React from 'react'
import { AiFillLinkedin, AiFillGoogleSquare, AiFillCheckCircle } from 'react-icons/ai'
import { Profile } from '@taggedweb/types/profile'
import { User } from '@taggedweb/types/user'
import { handleGoogleConnect, handleLinkedInConnect } from '@taggedweb/utils/login'
import { Button } from '../button'

type ProfileCardProps = { data: Partial<User & Profile> }

function ProfileCardComponent({ data }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center justify-start w-full py-4 space-x-4 sm:items-start sm:px-2 md:px-4 md:space-x-8 sm:flex-row">
      <div className="flex space-x-2 sm:mr-auto sm:space-x-4 md:space-x-8">
        <div className="flex flex-col items-center justify-start space-y-3">
          <img
            width={72}
            height={72}
            src={data.avatar ?? 'https://taggedweb.s3.amazonaws.com/static/images/avatars/default_person.png'}
            alt="Profile Image"
            className="object-cover h-[72px] w-[72px] rounded-md bg-secondary"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-bold sm:text-base text-text-primary">{`${data.first_name} ${data.last_name}`}</h1>
          <p className="mb-2 text-xs font-light sm:text-sm">{data.email} </p>
          <div className="flex flex-row flex-wrap mb-5 space-x-2">
            {data.organization ? (
              <Button buttonType="tag" size="small">
                {data.organization.name}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start space-x-0 space-y-2">
        {(data.social_accounts ?? []).includes('linkedin_oauth2') ? (
          <span className="w-full !border-[#0077B5] !flex px-4 py-2 rounded-md space-x-4 text-sm border inline-flex items-center justify-center text-[#0077B5] border-primary">
            <span className="font-medium">Connected to Linkedin</span>
            <AiFillCheckCircle size={20} className="text-[#00ee00]" />
          </span>
        ) : (
          <Button
            icon={<AiFillLinkedin size={20} />}
            buttonType="primary"
            iconPlacement="right"
            className="w-full !bg-[#0077B5] !border-[#0077B5] !flex"
            onClick={() => handleLinkedInConnect()}
          >
            Add your LinkedIn
          </Button>
        )}

        {(data.social_accounts ?? []).includes('google') ? (
          <span className="w-full !border-[#DB4437] !flex px-4 py-2 rounded-md space-x-4 text-sm border inline-flex items-center justify-center text-[#DB4437] border-primary">
            <span className="font-medium">Connected to Google</span>
            <AiFillCheckCircle size={20} className="text-[#00ee00]" />
          </span>
        ) : (
          <Button
            icon={<AiFillGoogleSquare size={20} />}
            buttonType="primary"
            iconPlacement="right"
            className="w-full !bg-[#DB4437] !border-[#DB4437] !flex"
            onClick={() => handleGoogleConnect()}
          >
            Add your Google
          </Button>
        )}
      </div>
    </div>
  )
}

export const ProfileCard = ProfileCardComponent
