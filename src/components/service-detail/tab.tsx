import React, { Fragment } from 'react'
import { Tab as HeadlessuiTab } from '@headlessui/react'
import clsx from 'clsx'

function ServiceDetailTabComponent({ elements }) {
  return (
    <div className="block md:hidden">
      <HeadlessuiTab.Group as="div" className="mt-2">
        <div className="border-b border-gray-200">
          <HeadlessuiTab.List className="flex px-4 -mb-px space-x-8 overflow-x-auto tablist">
            {elements.map((item) => (
              <HeadlessuiTab
                key={`service-detail-tablist-${item.id}`}
                className={({ selected }) =>
                  clsx(
                    (() => {
                      if (selected) {
                        return 'text-primary border-primary'
                      } else {
                        return 'text-gray-900 border-transparent'
                      }
                    })(),
                    'flex-1 whitespace-nowrap py-2 px-1 border-b-2 text-sm font-medium focus:outline-none focus:ring-0 focus:ring-offset-0 min-w-min',
                  )
                }
              >
                {item.name}
              </HeadlessuiTab>
            ))}
          </HeadlessuiTab.List>
        </div>
        <HeadlessuiTab.Panels as={Fragment}>
          {elements.map((item) => (
            <HeadlessuiTab.Panel key={`service-detail-tabpanel-${item.id}`} className="px-4 pt-10 pb-8 space-y-10">
              <div>{item.content}</div>
            </HeadlessuiTab.Panel>
          ))}
        </HeadlessuiTab.Panels>
      </HeadlessuiTab.Group>
    </div>
  )
}

export const ServiceDetailTab = ServiceDetailTabComponent
