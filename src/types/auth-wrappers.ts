import { ComponentType, FunctionComponent } from 'react'
import { GetServerSideProps, NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export type WithApiAuthRequired = (
  handler: NextApiHandler,
  options?: { message?: string },
) => (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>

export type WithPageAuthRequired = <P extends { [key: string]: any }>(
  Component: ComponentType<P>,
  options?: { redirectTo?: string; message?: string },
) => FunctionComponent<P>

export type WithSSRAuthRequired = (
  handler?: GetServerSideProps,
  options?: { message?: string; redirectTo?: string; showMessage?: boolean },
) => GetServerSideProps
