import React from 'react'
import { AiOutlineCloudServer, AiFillApi } from 'react-icons/ai'
import { BsSpeedometer } from 'react-icons/bs'
import { MdOutlineTextsms, MdArchitecture, MdOutlineSecurity } from 'react-icons/md'
import { VscDebugAltSmall } from 'react-icons/vsc'

const solutionTag = [
  {
    name: 'Transactional SMS Integration',
    icon: <MdOutlineTextsms />,
  },
  {
    name: 'Application Performance Monitoring',
    icon: <BsSpeedometer />,
  },
  {
    name: 'API Integration Solutions',
    icon: <AiFillApi />,
  },
  {
    name: 'Reduce Cloud Costs',
    icon: <AiOutlineCloudServer />,
  },
  {
    name: 'Cloud Migration Solutions',
    icon: <AiOutlineCloudServer />,
  },
  {
    name: 'Software Architecture Audit',
    icon: <MdArchitecture />,
  },
  {
    name: 'Code Debugging',
    icon: <VscDebugAltSmall />,
  },
  {
    name: 'Security Audit',
    icon: <MdOutlineSecurity />,
  },
]
export function PopularSolutionTags() {
  return (
    <div className="max-w-screen-lg px-2 mx-auto">
      <div className="mb-8 text-2xl font-bold text-center text-black">Popular Solution Tags</div>
      <div className="flex flex-col space-y-4 md:hidden">
        {solutionTag.slice(0, 4).map((solution, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center px-10 py-16 space-y-2 transition duration-500 ease-in-out border-2 rounded cursor-pointer hover:border-blue-500"
          >
            <div className="text-4xl text-blue-500">{solution.icon}</div>
            <div className="text-lg font-medium text-center">{solution.name}</div>
          </div>
        ))}
      </div>
      <div className="hidden gap-4 md:grid md:grid-cols-4">
        {solutionTag.map((solution, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center px-10 py-16 space-y-2 transition duration-500 ease-in-out border-2 rounded cursor-pointer hover:border-blue-500"
          >
            <div className="text-4xl text-blue-500">{solution.icon}</div>
            <div className="text-lg font-medium text-center">{solution.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
