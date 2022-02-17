import { GetServerSidePropsResult, GetServerSidePropsContext, NextApiHandler, NextApiRequest } from 'next'

export type WithSessionApiHandler = (handler: NextApiHandler) => NextApiHandler

export type WithSessionSSRHandler = <P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) => (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<P>>

export type SessionRequest = NextApiRequest | GetServerSidePropsContext['req']
