import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { PasswordReset } from './password-reset'

export default {
  title: 'General/PasswordResetModal',
  component: PasswordReset,
} as Meta

export function DefaultReviewModal() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        {/* eslint-disable-next-line */}
        <PasswordReset onEmailSubmit={async (values: { email: string }) => true} />
      </div>
    </>
  )
}
