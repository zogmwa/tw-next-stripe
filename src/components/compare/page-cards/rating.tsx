/* eslint-disable array-callback-return */
import React from 'react'
import { MdStar } from 'react-icons/md'
import numeral from 'numeral'
import { IoIosArrowUp } from 'react-icons/io'
import { Asset } from '../../../types/asset'
import { ServiceCollapse } from '../../collapse'
import { MarkProgress } from '../../styled-mark-progress'
import clsx from 'clsx'

type CompareServiceRatingProps = {
  services: Asset[]
}

function CompareServiceRatingComponent({ services }: CompareServiceRatingProps) {
  const serviceCount = services.length

  // const marks = [
  //   {
  //     name: 'Features',
  //     mark: 8.6,
  //   },
  //   {
  //     name: 'Ease of Use',
  //     mark: 8.5,
  //   },
  //   {
  //     name: 'Value for Mone',
  //     mark: 7.1,
  //   },
  //   {
  //     name: 'Coustomer Support',
  //     mark: 7.1,
  //   },
  // ]

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

  let highestasset = 0
  let highestRate = 0
  services.map((service) => {
    if (Number(service.avg_rating) > highestRate) {
      highestasset = service.id
      highestRate = Number(service.avg_rating)
    }
  })

  return (
    <ServiceCollapse title="Rating">
      <div className="grid grid-cols-1 p-1 divide-y md:hidden divide-border-default justify-items-around divide-solid">
        {services.map((service) => (
          <div className="flex flex-col p-2" key={service.id}>
            <h2 className="text-black text-md text-semibold">{service.name} Rating</h2>
            <div className="flex justify-center h-[0.7rem] mt-2">
              {highestasset === service.id && (
                <span className="flex self-center px-1 py-[0.1rem] text-[0.5rem] rounded-xl bg-secondary text-primary">
                  HIGHEST RATED
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 mt-4 divide-x divide divide-border-default">
              <div className="flex flex-col items-center p-2">
                <MdStar className="text-primary" />
                <span className="text-lg text-text-primary text-bold">
                  {numeral(Number(service.avg_rating ?? 0)).format('0.[0]')}
                </span>
                <span className="text-sm text-text-secondary">
                  {service.reviews_count ? kFormater(service.reviews_count) : 'No'} reviews
                </span>
              </div>
              <div className="flex flex-col items-center p-2">
                <IoIosArrowUp className="text-primary" />
                <span className="text-lg text-text-primary text-bold">{service?.upvotes_count ?? 0}</span>
                <span className="text-sm text-text-secondary">
                  {service.users_count ? kFormater(service.users_count) : 'No'} users
                </span>
              </div>
            </div>
            {/* <div className="flex flex-col mt-4 mb-2 md:items-center">
              {marks.map((item, index) => (
                <MarkProgress
                  key={index}
                  className="mt-2 md:min-w-min"
                  labelClassName="md:w-80 w-56 text-xs"
                  progressClassName="w-full"
                  markClassName="md:min-w-min w-20 text-xs"
                  mark={item.mark}
                  topMark={10}
                  height={12}
                  label={item.name}
                />
              ))}
            </div> */}
          </div>
        ))}
      </div>
      <div
        className={clsx(
          'hidden md:grid md:grid-flow-col',
          (() => {
            switch (serviceCount) {
              case 3: {
                return 'md:grid-cols-3'
              }
              default: {
                return 'md:grid-cols-2'
              }
            }
          })(),
          'divide-x divide-border-default justify-items-around divide-solid',
        )}
      >
        {services.map((service) => (
          <div className="flex flex-col p-2" key={service.id}>
            <h2 className="text-black text-md text-semibold">{service.name} Rating</h2>
            <div className="flex justify-center h-[0.7rem] mt-2">
              {highestasset === service.id && (
                <span className="flex self-center px-1 py-[0.1rem] text-[0.5rem] rounded-xl bg-secondary text-primary">
                  HIGHEST RATED
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 mt-4 divide-x divide divide-border-default">
              <div className="flex flex-col items-center p-2">
                <MdStar className="text-primary" />
                <span className="text-lg text-text-primary text-bold">
                  {numeral(Number(service.avg_rating ?? 0)).format('0.[0]')}
                </span>
                <span className="text-sm text-text-secondary">
                  {service.reviews_count ? kFormater(service.reviews_count) : 'No'} reviews
                </span>
              </div>
              <div className="flex flex-col items-center p-2">
                <IoIosArrowUp className="text-primary" />
                <span className="text-lg text-text-primary text-bold">{service?.upvotes_count ?? 0}</span>
                <span className="text-sm text-text-secondary">
                  {service.users_count ? kFormater(service.users_count) : 'No'} users
                </span>
              </div>
            </div>
            {/* <div className="flex flex-col mt-4 mb-2 md:items-center">
              {marks.map((item, index) => (
                <MarkProgress
                  key={index}
                  className="mt-2"
                  labelClassName="w-56 text-xs"
                  progressClassName="w-full"
                  markClassName="md:min-w-min w-20 text-xs"
                  mark={item.mark}
                  topMark={10}
                  height={12}
                  label={item.name}
                />
              ))}
            </div> */}
          </div>
        ))}
      </div>
    </ServiceCollapse>
  )
}

export const CompareServiceRating = CompareServiceRatingComponent
