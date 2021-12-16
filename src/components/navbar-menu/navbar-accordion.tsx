import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Link from 'next/link'

type MenuItemProps = {
  dropdownData: { name: string; slug: string }[]
  navItem: string
  expanded: string
  handleChange: any
  pathName: string
  isFooter?: boolean | false
  isNavbar?: boolean | false
}

export function NavAccordion({
  dropdownData,
  navItem,
  expanded,
  handleChange,
  pathName,
  isFooter,
  isNavbar,
}: MenuItemProps) {
  return (
    <div className={`${isNavbar && 'mx-2'} ${isFooter && 'w-full'}`}>
      <Accordion className="w-full shadow-none" expanded={expanded === navItem} onChange={handleChange(navItem)}>
        <div className="">
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography
              className={`${isFooter && 'font-sans text-sm font-bold text-gray-400'}`}
              sx={{ width: '100%', flexShrink: 0 }}
            >
              {navItem}
            </Typography>
          </AccordionSummary>
        </div>
        <AccordionDetails>
          {dropdownData.map((item) => {
            if (pathName !== 'compaines') {
              return (
                <Typography key={item.name}>
                  <Link href={`/${pathName}/${item.slug}`}>
                    <a>
                      <div
                        className={`${isNavbar && 'py-2 hover:bg-gray-200'} ${
                          isFooter && 'text-sm font-sans py-2 text-gray-800 hover:underline'
                        }`}
                      >
                        {item.name}
                      </div>
                    </a>
                  </Link>
                </Typography>
              )
            } else if (item.name === 'Careers') {
              return (
                <Typography key={item.name}>
                  <Link href="https://angel.co/company/taggedweb/jobs">
                    <div
                      className={` ${
                        isFooter && 'text-sm font-sans py-2 text-gray-800 hover:underline cursor-pointer'
                      }`}
                    >
                      {item.name}
                    </div>
                  </Link>
                </Typography>
              )
            } else {
              return (
                <Typography key={item.name}>
                  <Link href={`/${item.slug}`}>
                    <a>
                      <div
                        className={`${isNavbar && 'py-2 hover:bg-gray-200'} ${
                          isFooter && 'text-sm font-sans py-2 text-gray-800 hover:underline'
                        }`}
                      >
                        {item.name}
                      </div>
                    </a>
                  </Link>
                </Typography>
              )
            }
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
