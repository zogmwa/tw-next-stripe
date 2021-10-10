import { IncomingMessage, ServerResponse } from 'http'
import { ParsedUrlQuery } from 'querystring'
import { NextApiRequest, NextApiResponse, GetServerSidePropsResult, PreviewData } from 'next'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import { Session } from 'next-iron-session'

export type NextIronRequest = NextApiRequest & { session: Session }
export type NextIronHandler = (req: NextIronRequest, res: NextApiResponse) => void | Promise<void>

export type WithSessionApiHandler = (
  handler: NextIronHandler,
) => (req: NextIronRequest, res: NextApiResponse) => void | Promise<void>

export type GetIronServerSidePropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> = {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
    session: Session
  }
  res: ServerResponse
  params?: Q
  query: ParsedUrlQuery
  preview?: boolean
  previewData?: PreviewData
  resolvedUrl: string
  locale?: string
  locales?: string[]
  defaultLocale?: string
}

export type GetIronServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
> = (context: GetIronServerSidePropsContext<Q>) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>

export type WithSessionSSRHandler = (handler: GetIronServerSideProps) => GetIronServerSideProps
