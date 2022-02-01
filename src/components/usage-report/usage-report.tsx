/* eslint-disable array-callback-return */
import React, { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import { UsageReportColumn } from './'
import { Button } from '../button'
import { Modal } from '../Modal'
import { Input } from '../input'

type UsageReportComponentProps = {
  usage_reports: any[]
  className?: string
}

function UsageReportComponent({ usage_reports, className }: UsageReportComponentProps) {
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

  const handleSave = () => {
    setIsClickedSave(true)
    let isSubmit = false
    // eslint-disable-next-line array-callback-return
    usageReports.map((report) => {
      if (report.date && report.time) isSubmit = true
      else isSubmit = false
    })

    if (isSubmit) {
      // TODO: handle submit.
      console.log('submit')
    } else {
      console.log('valid check')
    }
    setTimeout(() => setIsClickedSave(false), 100)
  }

  useEffect(() => {
    if (usage_reports.length === 0) {
      setUsageReports([{ id: new Date().getTime(), date: new Date(), time: 0 }])
    } else {
      const initUsageReports = []
      // eslint-disable-next-line array-callback-return
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
        />
      ))}
      <div className="flex flex-row items-center self-end space-x-2">
        <span
          className="text-sm text-primary hover:underline hover:cursor-pointer"
          onClick={() => setIsGoogleImport(true)}
        >
          Import Google Sheet
        </span>
        <span
          className="text-sm text-primary hover:underline hover:cursor-pointer"
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
          <div className="flex flex-row justify-end mt-2 space-x-2">
            <Button onClick={() => setIsGoogleImport(false)}>Cancel</Button>
            <Button className="!bg-primary" textClassName="!text-text-on-surface" onClick={() => {}}>
              Import
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export const UsageReport = UsageReportComponent
