import { ComponentType, FunctionComponent } from 'react'
import { NextApiResponse } from 'next'
import { GetIronServerSideProps, NextIronHandler, NextIronRequest } from './session'

export type WithApiAuthRequired = (
  handler: NextIronHandler,
  options?: { message?: string },
) => (req: NextIronRequest, res: NextApiResponse) => void | Promise<void>

export type WithPageAuthRequired = <P extends { [key: string]: any }>(
  Component: ComponentType<P>,
  options?: { redirectTo?: string; message?: string },
) => FunctionComponent<P>

export type WithSSRAuthRequired = (
  handler?: GetIronServerSideProps,
  options?: { message?: string; redirectTo?: string; showMessage?: boolean },
) => GetIronServerSideProps
