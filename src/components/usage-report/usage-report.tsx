import React, { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import { UsageReportColumn } from './'
import { Button } from '../button'
import { Modal } from '../Modal'
import { Input } from '../input'
import { TrackingTimeReport } from '@taggedweb/queries/user'
// import { fetchingGoogleSheet } from '@taggedweb/queries/user'

type UsageReportComponentProps = {
  usage_reports: any[]
  className?: string
  current_period_start?: string | null
  current_period_end?: string | null
  bookingId: string
}

function UsageReportComponent({
  usage_reports,
  className,
  current_period_start,
  current_period_end,
  bookingId,
}: UsageReportComponentProps) {
  const [usageReports, setUsageReports] = useState([])
  const [isClickedSave, setIsClickedSave] = useState(false)
  const [isGoogleImport, setIsGoogleImport] = useState(false)
  const [googleSheetUrl, setGoogleSheetUrl] = useState('')
  const [fileUploadOpen, setFileUploadOpen] = useState(false)
  const fileUploadInput = useRef(null)

  const AddNewReport = (index) => {
    setUsageReports((prevState) => [
      ...prevState.slice(0, index + 1),
      { id: new Date().getTime(), date: new Date(), time: 0 },
      ...prevState.slice(index + 1),
    ])
  }

  const DeleteReport = (index) => {
    if (usageReports.length > 1) {
      setUsageReports((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)])
    } else {
      setUsageReports([{ date: new Date(), time: 0 }])
    }
  }

  const handleSave = async () => {
    setIsClickedSave(true)
    let isSubmit = false
    usageReports.map((report) => {
      if (
        report.date &&
        new Date(current_period_start) <= report.date &&
        report.date <= new Date(current_period_end) &&
        report.time
      )
        isSubmit = true
      else isSubmit = false
    })

    if (isSubmit) {
      // TODO: handle submit.
      console.log('submit')
      const data = await TrackingTimeReport(usageReports, bookingId)
      console.log(data)
    } else {
      console.log('valid check')
    }
    setTimeout(() => setIsClickedSave(false), 100)
  }

  const readGoogleSheet = async () => {
    // TODO: Read Google sheet cell values.
    // const data = await fetchingGoogleSheet(googleSheetUrl)
  }

  useEffect(() => {
    if (usage_reports.length === 0) {
      setUsageReports([{ id: new Date().getTime(), date: new Date(), time: 0 }])
    } else {
      const initUsageReports = []
      usage_reports.map((report) => {
        initUsageReports.push({
          id: new Date(report.date).getTime(),
          date: report.date,
          time: report.time,
        })
      })
      setUsageReports(initUsageReports)
    }
  }, [usage_reports])

  useEffect(() => {
    if (fileUploadOpen) fileUploadInput.current.click()
  }, [fileUploadOpen])

  return (
    <div className={clsx('flex flex-col space-y-2 ', className)}>
      {usageReports.map((usageReport, index) => (
        <UsageReportColumn
          usageReports={usageReports}
          usageReport={usageReport}
          key={`usageReport${usageReport.id}`}
          index={index}
          addNewReport={AddNewReport}
          deleteReport={DeleteReport}
          isSave={isClickedSave}
          setUsageReports={setUsageReports}
          currentPeriodStart={current_period_start}
          currentPeriodEnd={current_period_end}
        />
      ))}
      <div className="flex flex-row space-x-2 items-center self-end">
        <span
          className="text-primary text-sm hover:underline hover:cursor-pointer"
          onClick={() => setIsGoogleImport(true)}
        >
          Import Google Sheet
        </span>
        <span
          className="text-primary text-sm hover:underline hover:cursor-pointer"
          onClick={() => {
            setFileUploadOpen(true)
            setTimeout(() => setFileUploadOpen(false), 100)
          }}
        >
          Upload Excel File
        </span>
        <Button className="self-end" onClick={handleSave}>
          Save
        </Button>
      </div>
      <input type="file" className="hidden" ref={fileUploadInput} />
      <Modal isOpen={isGoogleImport} setIsOpen={setIsGoogleImport} size="2xl" dialogTitle="Choose Google Sheet">
        <div className="flex flex-col">
          <Input value={googleSheetUrl} onChange={(e) => setGoogleSheetUrl(e.target.value)} />
          <div className="flex flex-row justify-between">
            <a
              className="text-sm hover:underline hover:cursor-pointer self-center"
              href="https://docs.google.com/spreadsheets/d/1PRikgG0gB1xqGCV7wrEg_89DsNjCnXtNPltXxaUbfoU/edit#gid=0"
              target="_blank"
            >
              Template Link
            </a>
            <div className="flex flex-row justify-end space-x-2 mt-2">
              <Button onClick={() => setIsGoogleImport(false)}>Cancel</Button>
              <Button className="!bg-primary" textClassName="!text-text-on-surface" onClick={() => readGoogleSheet()}>
                Import
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export const UsageReport = UsageReportComponent
