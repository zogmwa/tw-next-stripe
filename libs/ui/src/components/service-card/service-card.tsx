import React, { forwardRef } from 'react'
// import Image from 'next/image'
import { BsChevronUp } from 'react-icons/bs'
import { AiFillStar, AiOutlineCheckCircle } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { GiWireframeGlobe } from 'react-icons/gi'
import { Button } from '../button'
import { Asset } from '../../types/asset'

type serviceCardProps = {
  asset: Asset
  isChecked: (bool: any) => void
}

function ServiceCardComponent(props: serviceCardProps) {
  const { asset, isChecked } = props
  const onCompare = (event: React.SyntheticEvent) => {
    isChecked((event.target as HTMLInputElement).checked)
  }
  const truncate = () => {
    if (asset.short_description) return asset.short_description
    else {
      const str = asset.description
      return str.length > 75 ? str.substring(0, 170) + ' ...see more' : str
    }
  }
  return (
    <div className="flex flex-col md:flex-row w-full md:space-x-8 py-4 px-4">
      {/* {mobile view starts} */}
      {/* {logo, heading and description starts} */}
      <div className="flex items-start justify-start space-x-4 md:hidden">
        <img src={asset.logo_url} alt="Web Service" className="w-20 rounded-md" />
        <div className="flex-1 flex flex-col items-start">
          <h1 className="text-xl font-bold">{asset.name}</h1>
          <div className="text-gray-600 dark:text-gray-200 text-base hover:text-black">{truncate()}</div>
        </div>
      </div>
      {/* {logo, heading and description ends} */}
      {/* { tags start } */}
      <div className="flex flex-row items-start flex-wrap mt-2 mb-3 md:hidden">
        {asset.tags.map((tag) => {
          return (
            <Button
              key={tag.slug}
              style={{ fontSize: '100%', background: '#F3F4F6', color: '#6B7280', border: 'none' }}
              className="mr-2 mt-2"
            >
              {tag.name}
            </Button>
          )
        })}
      </div>
      {/* {tags end}   */}
      {/* {upvotes and rating starts} */}
      <div className="mb-2 flex items-start justify-between md:hidden">
        <div className="flex items-center space-x-1">
          <GiWireframeGlobe className="text-primary" />
          <p className="text-gray-500">Globally Available</p>
        </div>
        <div className="flex items-center space-x-1">
          <FiUsers className="text-primary" />
          <p className="pl-0.5 text-gray-500">2k Users</p>
        </div>
      </div>
      <div className="flex items-start justify-between md:hidden">
        <div className="flex items-center space-x-2">
          <AiFillStar className="text-primary" />
          <p className="pl-0.5">
            <span className="text-xl font-bold">8.1</span> /10
          </p>
        </div>
        <p className="text-gray-500">3.1K{'  '}Reviews</p>
      </div>
      {/* {upvotes and rating ends} */}
      {/* {mobile view ends} */}
      <div className="hidden md:flex flex-col space-y-2 items-center justify-start w-20 md:w-28 md:justify-center">
        <img src={asset.logo_url} alt="Web Service" className="w-full rounded-md object-contain max-w-2xl" />
        <div className="flex items-center space-x-2">
          <input type="checkbox" id={asset.id.toString()} onClick={onCompare} />
          <p>Compare</p>
        </div>
      </div>
      <div className="flex-1 hidden md:flex flex-col justify-left">
        <h1 className="text-xl font-bold">{asset.name}</h1>
        <div className="text-gray-600 dark:text-gray-200 text-base hover:text-black">{truncate()}</div>
        <div className="flex flex-row flex-wrap mt-2 mb-3">
          {asset.tags.map((tag) => {
            return (
              <Button
                key={tag.slug}
                style={{ fontSize: '100%', background: '#F3F4F6', color: '#6B7280', border: 'none' }}
                className="mr-2 mt-2"
              >
                {tag.name}
              </Button>
            )
          })}
        </div>
        <div className="hidden md:flex items-center space-x-3 md:space-x-6">
          <div className="flex items-center space-x-1">
            <BsChevronUp className="text-primary" />
            <p className="text-gray-500">{asset.upvotes_count}</p>
          </div>
          <div className="flex items-center space-x-1">
            <FiUsers className="text-primary" />
            <p className="pl-0.5 text-gray-500">2k Users</p>
          </div>
          <p className="text-gray">|</p>
          <div className="flex items-center space-x-1">
            <AiOutlineCheckCircle className="text-primary" />
            <p className="pl-0.5 text-gray-500">Free Trial</p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col space-y-2 items-center justify-center">
        <div className="flex items-center space-x-2">
          <AiFillStar className="text-primary" />
          <p className="pl-0.5">
            <span className="text-xl font-bold">8.1</span> /10
          </p>
        </div>
        <p className="text-gray-500">3.1K Reviews</p>
      </div>
    </div>
  )
}

export const ServiceCard = forwardRef(ServiceCardComponent)
