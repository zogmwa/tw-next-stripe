import React from 'react'
import { AiFillLinkedin, AiFillGoogleSquare } from 'react-icons/ai'
import { Button } from '../button'
import { Profile } from '../../types/profile'
import { User } from '../../types/user'

type ProfileCardProps = { data: Partial<User & Profile> }

function ProfileCardComponent({ data }: ProfileCardProps) {
  return (
    <div className="flex flex-col px-4 py-4 space-y-3 md:flex-row md:space-x-8 md:space-y-0">
      <div className="flex items-start justify-start w-full space-x-8">
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
          <h1 className="text-base font-bold text-text-primary">{`${data.first_name} ${data.last_name}`}</h1>
          <p className="mb-2 text-sm font-light">{data.email} </p>
          <div className="flex flex-row flex-wrap mb-5 space-x-2">
            {data.organization ? (
              <Button buttonType="tag" size="small">
                {data.organization.name}
              </Button>
            ) : null}
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-4 md:flex-col md:justify-start md:items-center md:space-x-0 md:space-y-2">
          <Button
            icon={<AiFillLinkedin size={20} />}
            buttonType="primary"
            iconPlacement="right"
            className="w-full !bg-[#0077B5] !border-[#0077B5] !flex"
            // onClick={connectLinkedIn}
          >
            Add your LinkedIn Profile
          </Button>
          <Button
            icon={<AiFillGoogleSquare size={20} />}
            buttonType="primary"
            iconPlacement="right"
            className="w-full !bg-[#DB4437] !border-[#DB4437] !flex"
            // onClick={connectGoogle}
          >
            Add your Google Profile
          </Button>
        </div>
      </div>
    </div>
  )
}

export const ProfileCard = ProfileCardComponent
