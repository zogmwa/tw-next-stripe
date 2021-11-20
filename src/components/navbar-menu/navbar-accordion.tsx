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
}

export function NavAccordion({ dropdownData, navItem, expanded, handleChange }: MenuItemProps) {
  return (
    <div className="mx-2">
      <Accordion className="w-full shadow-none" expanded={expanded === navItem} onChange={handleChange(navItem)}>
        <div className="focus:bg-gray-100">
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{navItem}</Typography>
          </AccordionSummary>
        </div>
        <AccordionDetails>
          {dropdownData.map((item) => {
            if (item.slug !== '/') {
              return (
                <Typography key={item.name}>
                  <Link href={`/softwares/${item.slug}`}>
                    <a href="">
                      <div className="py-2 hover:bg-gray-100">{item.name}</div>
                    </a>
                  </Link>
                </Typography>
              )
            } else {
              return (
                <Typography key={item.name}>
                  <Link href={'/'}>
                    <a href="">
                      <div className="py-2 hover:bg-gray-100">{item.name}</div>
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
