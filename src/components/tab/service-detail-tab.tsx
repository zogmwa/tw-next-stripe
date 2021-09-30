import { Fragment } from 'react'
import { Tab as HeadlessuiTab } from '@headlessui/react'
import clsx from 'clsx'

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      content: (
        <h1>This is Women Content.</h1>
      )
    },
    {
      id: 'men',
      name: 'Men',
      content: (
        <div>This is Men Content.</div>
      )
    },
    {
      id: 'children',
      name: 'Children',
      content: (
        <span>This is Children Tag.</span>
      )
    },
    {
      id: 'parent',
      name: 'Parent',
      content: (
        <p>This is Parent Tag.</p>
      )
    },
  ]
}

function ServiceDetailTabComponent() {

  return (
    <div className="bg-white">
      <HeadlessuiTab.Group as="div" className="mt-2">
        <div className="border-b border-gray-200">
          <HeadlessuiTab.List className="-mb-px flex px-4 space-x-8">
            {navigation.categories.map((category) => (
              <HeadlessuiTab
                key={category.name}
                className={({ selected }) => clsx(
                  (() => {
                    if (selected) {
                      return 'text-primary border-primary';
                    } else {
                      return 'text-gray-900 border-transparent';
                    }
                  })(),
                  'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium focus:outline-none focus:ring-0 focus:ring-offset-0'
                )}
              >
                {category.name}
              </HeadlessuiTab>
            ))}
          </HeadlessuiTab.List>
        </div>
        <HeadlessuiTab.Panels as={Fragment}>
          {navigation.categories.map((category) => (
            <HeadlessuiTab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
              <div key={category.name}>
                {category.content}
              </div>
            </HeadlessuiTab.Panel>
          ))}
        </HeadlessuiTab.Panels>
      </HeadlessuiTab.Group>
    </div>
  )
}

export const ServiceDetailTab = ServiceDetailTabComponent