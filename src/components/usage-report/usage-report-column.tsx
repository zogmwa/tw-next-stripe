/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai'
import { Input } from '../input'

type UsageReportColumnComponentProps = {
  usageReports: any[]
  usageReport: any
  className?: string
  index: number
  addNewReport: Function
  deleteReport: Function
  isSave: boolean
  setUsageReports: React.Dispatch<React.SetStateAction<any[]>>
  currentPeriodStart?: string | null
  currentPeriodEnd?: string | null
}

function UsageReportColumnComponent({
  usageReports,
  usageReport,
  className,
  index,
  addNewReport,
  deleteReport,
  isSave,
  setUsageReports,
  currentPeriodStart,
  currentPeriodEnd,
}: UsageReportColumnComponentProps) {
  const [usageDate, setUsageDate] = useState(new Date(usageReport.date))
  const [logTime, setLogTime] = useState(usageReport.tracked_hours)
  const [errorDate, setErrorDate] = useState('')
  const [errorLogTime, setErrorLogTime] = useState('')

  useEffect(() => {
    if (isSave) {
      let hasError = false
      if (!usageDate) {
        setErrorDate('This field is invalid.')
        hasError = true
      }
      if (!logTime) {
        setErrorLogTime('This field is invalid.')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        hasError = true
      }
    }
  }, [isSave])

  return (
    <div className={clsx('flex flex-row space-x-2 items-center relative pr-10', className)}>
      <div className="flex flex-col w-full md:flex-row">
        <div className="flex flex-row items-center w-full">
          <span className="mr-2 text-sm font-semibold text-text-primary">Date: </span>
          <div className="flex flex-col w-full">
            <DatePicker
              className={clsx(
                'flex text-sm border rounded-md border-border-default px-4 py-2 text-text-primary w-full ',
                errorDate ? '!border-red-600' : '',
              )}
              dateFormat="yyyy/MM/dd"
              selected={usageDate}
              selectsRange={false}
              startDate={new Date(currentPeriodStart)}
              endDate={new Date(currentPeriodEnd)}
              onChange={(date) => {
                setUsageDate(date.setHours(23, 59, 59))
                setUsageReports([
                  ...usageReports.slice(0, index),
                  { id: usageReport.id, date: date, tracked_hours: usageReport.tracked_hours },
                  ...usageReports.slice(index + 1),
                ])
              }}
            />
            {errorDate && <span className="mt-1 text-xs text-error">{errorDate}</span>}
          </div>
        </div>
        <div className="flex flex-row items-center w-full mt-2 md:mt-0 md:ml-2">
          <span className="mr-2 text-sm font-semibold text-text-primary">Hours: </span>
          <Input
            className="w-full"
            errorMessage={errorLogTime}
            type="number"
            defaultValue={0}
            min={0}
            value={Number(logTime)}
            onChange={(e) => {
              setLogTime(e.target.value)
              setUsageReports([
                ...usageReports.slice(0, index),
                { id: usageReport.id, date: usageReport.date, tracked_hours: e.target.value },
                ...usageReports.slice(index + 1),
              ])
            }}
          />
        </div>
      </div>
      <div className="absolute right-0 flex flex-row">
        <AiOutlinePlus
          className="font-semibold text-green-600 cursor-pointer text-md"
          onClick={() => addNewReport(index)}
        />
        <AiOutlineClose
          className="font-semibold text-red-600 cursor-pointer text-md"
          onClick={() => deleteReport(index)}
        />
      </div>
    </div>
  )
}

export const UsageReportColumn = UsageReportColumnComponent
