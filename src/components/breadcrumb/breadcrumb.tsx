import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type BreadcrumbComponentProps = {
  breadcrumbs: { name: string; url: string; is_selected: boolean }[]
  copyUrl?: string
  className?: string
  mobileAct?: boolean
}

export default function BreadcrumbComponent({
  breadcrumbs,
  copyUrl,
  className,
  mobileAct = true,
}: BreadcrumbComponentProps) {
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 1500)
    }
  }, [isCopied])

  const handleClick = (url) => {
    router.push(url)
  }

  return (
    <div className={clsx('flex items-center space-x-2 ', className)}>
      <Breadcrumbs separator={<MdOutlineKeyboardArrowRight className="text-sm" />} aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb) => {
          if (breadcrumb.is_selected) {
            return (
              <Typography key={breadcrumb.name} sx={{ color: '#000' }}>
                {mobileAct ? (
                  <>
                    <span className="hidden md:flex">{breadcrumb.name}</span>
                    <span className="flex md:hidden">Solution</span>
                  </>
                ) : (
                  <span>{breadcrumb.name}</span>
                )}
              </Typography>
            )
          } else {
            return (
              <Link
                underline="hover"
                key={breadcrumb.name}
                color="#2563EB"
                href={breadcrumb.url}
                onClick={() => handleClick(breadcrumb.url)}
              >
                <a>{breadcrumb.name}</a>
              </Link>
            )
          }
        })}
      </Breadcrumbs>
      {copyUrl && (
        <div className="relative">
          <CopyToClipboard text={copyUrl} onCopy={() => setIsCopied(true)}>
            <img alt="copy-link" src="/images/copy-link.png" className="w-4 h-4 cursor-pointer" />
          </CopyToClipboard>
          {isCopied ? <span className="absolute text-xs text-blue-600 -top-4 -right-2">Copied.</span> : null}
        </div>
      )}
    </div>
  )
}

export const Breadcrumb = BreadcrumbComponent
