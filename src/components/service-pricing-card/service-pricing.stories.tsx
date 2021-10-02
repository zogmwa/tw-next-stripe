import React, {useState} from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServicePricingCard } from './service-pricing-card'
import { PricingSelectNameMobile } from './pricing-select-name-mobile'

const plans = [
  {
    "asset": 2,
    "name": "Essentials",
    "summary": "For marketers who want to build relationships and grow sales with more email sends, customized branding, and 24/7 support.",
    "currency": "USD",
    "price": "9.99",
    "per": "Month",
    "features": ""
  },
  {
    "asset": 2,
    "name": "Premium",
    "summary": "For high-volume senders who want all marketing features and phone support",
    "currency": "USD",
    "price": "299",
    "per": "Month",
    "features": "For upto 10,000 contacts.\r\n\r\nEverything in Standard, plus:\r\n- Advanced Segmentation\r\n- Multivariate Testing\r\n- Comparative Reporting\r\n- Unlimited Seats & Role-Based Access\r\n- Phone Support"
  },
  {
    "asset": 2,
    "name": "Standard",
    "summary": "For advanced businesses that want more automations and data-powered tools.",
    "currency": "USD",
    "price": "14.99",
    "per": "Month",
    "features": "With 500 contacts, For additional number of contacts pricing may vary.\r\n\r\nEverything in Essentials, plus:\r\n- Customer Journey Builder + Branching Points\r\n- Send Time Optimization\r\n- Behavioral Targeting\r\n- Custom Templates\r\n- Dynamic Content"
  }
]

export default {
  title: 'General/PricingCard',
  component: ServicePricingCard,
} as Meta

export function DefaultPricingCard() {
  const [selectedItem, setSelectedItem] = useState(0)

  return (
    <>
      <PricingSelectNameMobile pricePlans={plans} selected={selectedItem} onSelected={setSelectedItem} />
      <ServicePricingCard pricePlans={plans} selected={selectedItem} onSelected={setSelectedItem} />
    </>
  )
}
