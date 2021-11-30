import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { AiOutlineCopy } from 'react-icons/ai'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { CopyToClipboard } from 'react-copy-to-clipboard'

type BreadcrumbComponentProps = {
  breadcrumbs: { name: string; url: string; is_selected: boolean; }[]
  copyUrl: string
}

export default function BreadcrumbComponent({ breadcrumbs, copyUrl }: BreadcrumbComponentProps) {
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
    <div className="flex items-center space-x-2">
      <Breadcrumbs separator={<MdOutlineKeyboardArrowRight className="text-sm" />} aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb) => {
          if (breadcrumb.is_selected) {
            return (
              <Typography key={breadcrumb.name} sx={{ color: '#000' }}>
                <span className="hidden md:flex">{breadcrumb.name}</span>
                <img src="/images/webflow.png" alt="word" className="flex md:hidden w-[2rem]" />
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
                {breadcrumb.name}
              </Link>
            )
          }
        })}
      </Breadcrumbs>
      <CopyToClipboard
        text={copyUrl}
        onCopy={() => setIsCopied(true)}>
        <AiOutlineCopy />
      </CopyToClipboard>
      {isCopied ? <span className="text-sm text-red-600">Copied.</span> : null}
    </div>
  )
}

export const Breadcrumb = BreadcrumbComponent
