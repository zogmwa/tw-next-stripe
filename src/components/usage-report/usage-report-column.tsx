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
}: UsageReportColumnComponentProps) {
  const [usageDate, setUsageDate] = useState(usageReport.date)
  const [logTime, setLogTime] = useState(usageReport.usageTime)
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
        hasError = true
      }
    }
  }, [isSave])

  return (
    <div className={clsx('flex flex-row space-x-2 items-center relative pr-10', className)}>
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-row w-full items-center">
          <span className="text-sm font-semibold text-text-primary mr-2">Date: </span>
          <div className="flex flex-col w-full">
            <DatePicker
              className={clsx(
                'flex text-sm border rounded-md border-border-default px-4 py-2 text-text-primary w-full ',
                errorDate ? '!border-red-600' : '',
              )}
              dateFormat="yyyy/MM/dd"
              selected={usageDate}
              onChange={(date) => {
                setUsageDate(date)
                setUsageReports([
                  ...usageReports.slice(0, index),
                  { id: usageReport.id, date: date, time: usageReport.time },
                  ...usageReports.slice(index + 1),
                ])
              }}
            />
            {errorDate && <span className="mt-1 text-xs text-error">{errorDate}</span>}
          </div>
        </div>
        <div className="flex flex-row w-full items-center mt-2 md:mt-0 md:ml-2">
          <span className="text-sm font-semibold text-text-primary mr-2">Hours: </span>
          <Input
            className="w-full"
            errorMessage={errorLogTime}
            type="number"
            min={0}
            value={logTime}
            onChange={(e) => {
              setLogTime(e.target.value)
              setUsageReports([
                ...usageReports.slice(0, index),
                { id: usageReport.id, date: usageReport.date, time: e.target.value },
                ...usageReports.slice(index + 1),
              ])
            }}
          />
        </div>
      </div>
      <div className="absolute right-0 flex flex-row">
        <AiOutlinePlus
          className="text-md font-semibold text-green-600 cursor-pointer"
          onClick={() => addNewReport(index)}
        />
        <AiOutlineClose
          className="text-md font-semibold text-red-600 cursor-pointer"
          onClick={() => deleteReport(index)}
        />
      </div>
    </div>
  )
}

export const UsageReportColumn = UsageReportColumnComponent
