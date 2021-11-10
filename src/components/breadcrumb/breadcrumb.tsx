import React from 'react'
import { useRouter } from 'next/router'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

type BreadcrumbComponentProps = {
  breadcrumbs: { name: string; url: string; is_selected: boolean }[]
}

export default function BreadcrumbComponent({ breadcrumbs }: BreadcrumbComponentProps) {
  const router = useRouter()

  const handleClick = (url) => {
    router.push(url)
  }

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator={<MdOutlineKeyboardArrowRight className="text-sm" />} aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb) => {
          if (breadcrumb.is_selected) {
            return (
              <Typography key={breadcrumb.name} sx={{ color: '#2563EB' }}>
                {breadcrumb.name}
              </Typography>
            )
          } else {
            return (
              <Link
                underline="hover"
                key={breadcrumb.name}
                color="black"
                href={breadcrumb.url}
                onClick={() => handleClick(breadcrumb.url)}
              >
                {breadcrumb.name}
              </Link>
            )
          }
        })}
      </Breadcrumbs>
    </Stack>
  )
}

export const Breadcrumb = BreadcrumbComponent
