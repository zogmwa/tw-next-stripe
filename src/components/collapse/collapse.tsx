import React, { ReactNode } from 'react'
import { styled } from '@mui/material/styles'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'

const Accordion = styled((props: AccordionProps) => <MuiAccordion defaultExpanded={true} {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 5,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }),
)

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<MdOutlineKeyboardArrowDown />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .03)' : 'rgba(0, 0, 0, .03)',
  fontColor: 'rgb(255, 255, 255)',
  paddingLeft: 4,
  '&.MuiAccordionSummary-root.Mui-expanded': {
    minHeight: 0,
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  '& .MuiAccordionSummary-content.Mui-expanded': {
    marginLeft: theme.spacing(1),
    marginTop: 12,
    marginBottom: 12,
  },
  '& .MuiAccordionSummary-content .MuiTypography-root': {
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 600,
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

type ServiceCollapseType = {
  title: string
  children: ReactNode
}

export default function ServiceCollapseComponent({ title, children }: ServiceCollapseType) {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

export const ServiceCollapse = ServiceCollapseComponent
