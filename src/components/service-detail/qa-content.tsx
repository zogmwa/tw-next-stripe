import React, { useState } from 'react'
import { ServiceQuestion } from '../service-questions'
import { Asset } from '../../types/asset'

type ServiceDetailQAProps = {
  service: Asset
}

function QaContentComponent({ service }: ServiceDetailQAProps) {
  if (typeof service === 'undefined') return null

  let serviceQuestions = service.questions

  return <ServiceQuestion serviceQuestions={serviceQuestions} />
}

export const QaContent = QaContentComponent
