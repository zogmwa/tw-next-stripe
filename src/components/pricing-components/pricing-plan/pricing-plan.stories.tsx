import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { ServicePricing } from './pricing-plan'

export default {
  title: 'General/ServicePricing',
  component: ServicePricing,
} as Meta

const priceplans = [
  {
    name: 'Premium Per Month',
    summary: '',
    currency: '$',
    price: '999',
    per: 'Month',
    features: [''],
  },
  {
    name: 'Premium Per Year',
    summary: '',
    currency: '$',
    price: '9999',
    per: 'Year',
    features: [''],
  },
  {
    name: 'Premium Per day',
    summary: '',
    currency: '$',
    price: '99',
    per: 'Day',
    features: [''],
  },
  {
    name: 'Basic Per Month',
    summary: '',
    currency: '$',
    price: '999',
    per: 'Month',
    features: [''],
  },
  {
    name: 'Basic Per Year',
    summary: '',
    currency: '$',
    price: '9999',
    per: 'Year',
    features: [''],
  },
  {
    name: 'Basic Per day',
    summary: '',
    currency: '$',
    price: '99',
    per: 'Day',
    features: [''],
  },
]

export function DefaultServicePricingCard() {
  return <ServicePricing priceplans={priceplans} />
}
