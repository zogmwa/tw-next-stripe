import React, { useState, useEffect } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { MdExpandMore } from 'react-icons/md'
import { Button } from '../button'
import { MAX_COMPARE_COUNT } from '../../utils/constants'

type CompareAccordianProps = {
  checkedList: { name: string; slug: string; logo_url: string }[]
  onServiceRemove: (compareList) => void
}
function CompareAccordianComponent({ checkedList = [], onServiceRemove }: CompareAccordianProps) {
  const router = useRouter()
  const [compareList, setCompareList] = useState(checkedList)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState<string | false>('panel1')
  useEffect(() => {
    setCompareList(checkedList)
  }, [checkedList])
  useEffect(() => {
    if (compareList.length > MAX_COMPARE_COUNT) {
      setError('You can compare at most 3 services.')
    } else {
      setError('')
    }
  }, [compareList])
  const handleCompare = () => {
    if (compareList.length < 2) {
      toast.error('You should check at least 2 service.', {
        id: 'compare-list-length-error',
      })
    } else if (compareList.length > MAX_COMPARE_COUNT) {
      toast.error('You can compare at most 3 services.', {
        id: 'compare-list-length-error',
      })
    } else {
      const services = compareList.map((item) => item.slug)
      const compareParams = services.join('-vs-')
      router.push(
        {
          pathname: `/compare/${compareParams}`,
        },
        undefined,
        {
          shallow: true,
        },
      )
    }
  }

  const handleExpand = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }
  return (
    <>
      {compareList.length === 0 ? undefined : (
        <div className="fixed bottom-0 right-0 z-50 w-full bg-white border rounded-md shadow-lg md:w-1/3">
          <Accordion expanded={expanded === 'panel1'} onChange={handleExpand('panel1')}>
            <AccordionSummary expandIcon={<MdExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
              <div className="text-lg font-semibold text-center">Compare Services</div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="flex flex-col justify-start my-2 divide-y divide">
                  {compareList.map((service, index) => (
                    <div key={index} className="flex items-start justify-start w-full py-2 space-x-4">
                      <div className="font-semibold">{index + 1}.</div>
                      <div className="flex flex-row items-start justify-start flex-1 space-x-2">
                        <img src={service.logo_url} alt="Software Logo" width="30" className="rounded" />
                        <div className="text-base font-medium">{service.name}</div>
                      </div>
                      <div
                        className="mr-2 cursor-pointer"
                        onClick={() => {
                          const checkedList = compareList
                          const newList = checkedList.filter((item) => item.slug !== service.slug)
                          setCompareList(newList)
                          onServiceRemove(newList)
                        }}
                      >
                        <AiFillCloseCircle />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row">
                  <div className="flex-1" />
                  <div
                    className="flex items-center justify-end cursor-pointer"
                    onClick={() => {
                      setCompareList([])
                      onServiceRemove([])
                    }}
                  >
                    Remove all <AiFillCloseCircle className="ml-2" />
                  </div>
                </div>
                <div className="text-red-500">{error}</div>
                <div className="my-4">
                  <Button buttonType="primary" className="w-full" onClick={handleCompare}>
                    Compare
                  </Button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </>
  )
}

export const CompareAccordian = CompareAccordianComponent
