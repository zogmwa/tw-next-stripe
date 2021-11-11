/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { BsChevronUp } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai'
import { GrShare } from 'react-icons/gr'
import numeral from 'numeral'
import { Formik } from 'formik'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'
import Link from 'next/link'
import { useUserContext } from '@taggedweb/hooks/use-user'
import { toggleUsedByStatus, toggleUpVoteAsset, toggleDownVoteAsset, claimOwnershipToAsset } from '@taggedweb/queries/service'
import { Asset } from '@taggedweb/types/asset'
import { phoneRegex } from '@taggedweb/utils/constants'
import { TruncatedDescription } from '../truncated-description'
import { Button } from '../button'
import { Checkbox } from '../checkbox'
import { ServiceLogo } from '../service-logo'
import {
  EditableServiceLogo,
  EditableServiceName,
  EditableServiceDescription,
  ShowEditable,
} from '../editable-components'
import { Modal } from '../Modal'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { LinkTags } from '../editable-components/editable-tags/link-tags'

const OwnTheServiceFormSchema = yup.object().shape({
  email: yup.string().email().required('Please enter a valid email'),
  mobile: yup.string().min(7, 'too short').matches(phoneRegex, 'Please enter a valid number'),
  information: yup.string().required('Please share some details'),
})

type ServiceDetailCardProps = {
  service: Asset
  onToggleCompare?: (bool: any) => void
  editAllowed?: boolean
  onChange?: Function
}

function ServiceDetailCardComponent({
  service,
  onToggleCompare,
  editAllowed = false,
  onChange,
}: ServiceDetailCardProps) {
  const onCompare = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggleCompare) {
      onToggleCompare((event.target as HTMLInputElement).checked)
    }
  }

  if (typeof service === 'undefined') return null

  const [isLoadingUsedByMe, setIsLoadingUsedByMe] = useState(false)
  const [isLoadingUpvote, setIsLoadingUpvote] = useState(false)
  const [usedByMe, setUsedByMe] = useState(service?.used_by_me ?? false)
  const [votedByMe, setVotedByMe] = useState(service?.my_asset_vote)
  const [upvotesCount, setUpvotesCount] = useState(service?.upvotes_count)
  const [isTagsEdit, setIsTagsEdit] = useState(false)
  const router = useRouter()
  const { slug } = router?.query ? (router.query as { slug: string }) : ('' as unknown as { slug: string })
  const rating = numeral(Number(service.avg_rating ?? 0)).format('0.[0]')
  const user = useUserContext()
  const { authVerified } = user
  const [isOpenOwnServiceModal, setIsOpenOwnServiceModal] = useState(false)

  function authCheck() {
    if (!authVerified) {
      toast.error('Kindly log in to claim ownership')
    } else {
      setIsOpenOwnServiceModal(!isOpenOwnServiceModal)
    }
  }

  const setToggleUsedByState = async () => {
    if (!authVerified) return

    setIsLoadingUsedByMe(true)
    const resultStatus = await toggleUsedByStatus(slug, !usedByMe)
    setIsLoadingUsedByMe(false)
    if (resultStatus !== null) {
      setUsedByMe(resultStatus)
    }
  }

  const setToggleUpvotedByMe = async () => {
    if (!authVerified) return

    setIsLoadingUpvote(true)
    const upvotesCounts = upvotesCount
    if (votedByMe) {
      const votedByMeStatus = await toggleDownVoteAsset(votedByMe, service?.slug)
      if (votedByMeStatus) {
        setVotedByMe(null)
        setUpvotesCount(upvotesCounts - 1) // TODO: we need to get the accurate upvote count from API
      }
    } else {
      const votedByMeStatus = await toggleUpVoteAsset(service?.id)
      if (votedByMeStatus) {
        setVotedByMe(votedByMeStatus.id)
        setUpvotesCount(upvotesCounts + 1) // TODO: we need to get the accurate upvote count from API
      }
    }
    setIsLoadingUpvote(false)
  }

  return (
    <div className="flex flex-col pt-4 space-y-3 md:flex-row md:space-x-8 md:space-y-0 service-detail-card">
      <div className="flex items-start justify-start w-full space-x-4 md:space-x-8">
        <div className="flex flex-col items-center justify-start space-y-3">
          <div className="relative">
            {editAllowed ? (
              <EditableServiceLogo
                serviceName={service?.name}
                serviceId={service.id}
                logoUrl={service.logo_url}
                owned={service?.is_owned ?? false}
                onSubmit={(field, value) => onChange(field, value)}
              />
            ) : (
              <a
                href={service.affiliate_link ? service.affiliate_link : service.website ?? '#'}
                target={service.affiliate_link || service.website ? '_blank' : ''}
                rel="noreferrer"
              >
                <ServiceLogo
                  serviceName={service?.name}
                  serviceId={service.id}
                  logoUrl={service.logo_url}
                  owned={service?.is_owned ?? false}
                />
              </a>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox onChange={onCompare} />
            <div className="text-xs uppercase text-text-tertiary">Compare</div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-start space-x-2">
            <>
              {editAllowed ? (
                <EditableServiceName serviceName={service.name} onSubmit={(field, value) => onChange(field, value)} />
              ) : (
                <h1 className="text-base font-medium text-text-primary">{service.name}</h1>
              )}
            </>
            <a
              href={service.affiliate_link ? service.affiliate_link : service.website ?? '#'}
              target={service.affiliate_link || service.website ? '_blank' : ''}
              className="self-center"
              rel="noreferrer"
            >
              <Button
                className="hidden md:inline-flex"
                size="small"
                icon={<GrShare className="gr-primary gr-icon-share" />}
              >
                Visit Website
              </Button>
            </a>

            <a
              href="#"
              id="ownService"
              onClick={authCheck}
              className="hidden md:flex md:items-center md:cursor-pointer md:space-x-2"
            >
              <AiOutlineInfoCircle className="text-primary" />
              <span className="text-xs text-primary">Own this Service?</span>
            </a>
          </div>
          <div className="flex items-start">
            {editAllowed ? (
              <EditableServiceDescription
                serviceDescription={service.short_description ? service.short_description : service.description}
                onSubmit={(field, value) => onChange(field, value)}
              />
            ) : service.short_description ? (
              <TruncatedDescription description={service.short_description} />
            ) : service.description ? (
              <TruncatedDescription description={service.description.substring(0, 200)} />
            ) : null}
          </div>
          <div className="flex mt-2 space-x-2 text-sm sm:space-x-4 md:divide-x">
            <div className="flex items-end space-x-2">
              <AiOutlineStar className="self-center text-primary" />
              <span>{rating}</span>
              <span className="text-xs text-text-secondary">
                {Number(numeral(service.reviews_count).format('0.[0]a')) === 0
                  ? 'No Review'
                  : `${numeral(service.reviews_count).format('0.[0]a')} Reviews`}
              </span>
            </div>
            <div className="flex items-end space-x-2 md:pl-4">
              <BsChevronUp className="self-center text-primary" />
              <span>{service.upvotes_count}</span>
              <span className="text-xs text-text-secondary">{numeral(service.users_count).format('0.[0]a')} Users</span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap items-center mt-2 mb-5">
            {editAllowed ? (
              <ShowEditable onEdit={() => setIsTagsEdit(true)}>
                {service.tags.map((tag) => {
                  return (
                    <Link key={tag.slug} href={'../search/' + tag.slug}>
                      <Button buttonType="tag" size="small" className="mr-2">
                        {tag.name}
                      </Button>
                    </Link>
                  )
                })}
              </ShowEditable>
            ) : (
              <>
                {service.tags.map((tag) => {
                  return (
                    <Link key={tag.slug} href={'../search/' + tag.slug}>
                      <Button buttonType="tag" size="small" className="mt-2 mr-2">
                        {tag.name}
                      </Button>
                    </Link>
                  )
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 md:flex-col md:justify-start md:items-center md:space-x-0 md:space-y-4">
        <a
          href={service.website ?? '#'}
          target={service.website ? '_blank' : ''}
          className="self-center"
          rel="noreferrer"
        >
          <Button
            className="inline-flex w-40 md:hidden"
            size="small"
            icon={<GrShare className="gr-primary gr-icon-share" />}
          >
            Visit Website
          </Button>
        </a>
        <div className="flex items-center justify-center w-40 space-x-2 cursor-pointer md:hidden">
          <a href="#" id="ownService">
            <AiOutlineInfoCircle className="text-primary" />
            <span className="text-xs text-primary">Own this Service?</span>
          </a>
        </div>
      </div>
      <div className="flex flex-row justify-center space-x-4 md:flex-col md:justify-start md:items-center md:space-x-0 md:space-y-4">
        <Button
          className="inline-flex w-40 md:hidden"
          loading={isLoadingUsedByMe}
          loadingClassName={!usedByMe ? 'text-primary' : 'text-background-light'}
          buttonType={usedByMe ? 'primary' : 'default'}
          onClick={() => setToggleUsedByState()}
          disabled={isLoadingUsedByMe}
        >
          I&apos;ve used this
        </Button>
        <Button
          className="w-40 space-x-2"
          buttonType={votedByMe ? 'primary' : 'default'}
          icon={<BsChevronUp className={votedByMe ? 'self-center text-white' : 'self-center text-primary'} />}
          loading={isLoadingUpvote}
          loadingClassName={votedByMe ? 'text-background-light' : 'text-primary'}
          onClick={() => setToggleUpvotedByMe()}
        >
          {`Upvote ${upvotesCount}`}
        </Button>
        <Button
          className="hidden w-40 md:inline-flex"
          loading={isLoadingUsedByMe}
          loadingClassName={!usedByMe ? 'text-primary' : 'text-background-light'}
          buttonType={usedByMe ? 'primary' : 'default'}
          onClick={() => setToggleUsedByState()}
          disabled={isLoadingUsedByMe}
        >
          I&apos;ve used this
        </Button>
      </div>
      <Modal isOpen={isOpenOwnServiceModal} setIsOpen={setIsOpenOwnServiceModal}>
        <>
          <Formik
            initialValues={{ email: '', information: '', mobile: '', organizationName: '' }}
            validationSchema={OwnTheServiceFormSchema}
            onSubmit={async (values) => {
              const data = await claimOwnershipToAsset(service?.id, user, values)
              if (data) {
                toast.success('Claim submitted for review.')
              }
              setIsOpenOwnServiceModal(false)
            }}
          >
            {({ handleSubmit, values, handleChange, handleBlur, touched, errors, isSubmitting }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <label className="block mb-2 text-sm text-text-primary" htmlFor="email">
                    Email Id
                  </label>
                  <Input
                    placeholder="Enter email"
                    id="email"
                    className="mb-4"
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    errorMessage={touched.email ? errors.email : undefined}
                    success={touched.email && !errors.email}
                  />
                  {/* ToDo : Include Phone Number Masking */}
                  <label className="block mb-2 text-sm text-text-primary" htmlFor="mobile">
                    Mobile Number
                  </label>
                  <Input
                    placeholder="e.g. +919999999999"
                    id="mobile"
                    className="mb-4"
                    onChange={handleChange('mobile')}
                    onBlur={handleBlur('mobile')}
                    value={values.mobile}
                    errorMessage={touched.mobile ? errors.mobile : undefined}
                    success={touched.mobile && !errors.mobile}
                  />
                  <label className="block mb-2 text-sm text-text-primary" htmlFor="organizationName">
                    Organization Name
                  </label>
                  <Input
                    id="organizationName"
                    className="mb-4"
                    onChange={handleChange('organizationName')}
                    onBlur={handleBlur('organizationName')}
                    value={values.organizationName}
                    errorMessage={touched.organizationName ? errors.organizationName : undefined}
                    success={touched.organizationName && !errors.organizationName}
                  />
                  {/* Keeping it for form Design reference */}
                  {/* <label className="block mb-2 text-sm text-text-primary" htmlFor="organizationSize">
                    Organization Size
                  </label>
                  <Input
                    id="organizationSize"
                    className="mb-4"
                    onChange={handleChange('organizationSize')}
                    onBlur={handleBlur('organizationSize')}
                    value={values.organizationSize}
                    errorMessage={touched.organizationSize ? errors.organizationSize : undefined}
                    success={touched.organizationSize && !errors.organizationSize}
                  /> */}
                  <label className="block mb-2 text-sm text-text-primary" htmlFor="information">
                    Information
                  </label>
                  <Textarea
                    placeholder="Ensure the details you provide, help us verify the ownership."
                    id="information"
                    className="mb-4"
                    onChange={handleChange('information')}
                    onBlur={handleBlur('information')}
                    value={values.information}
                    errorMessage={touched.information ? errors.information : undefined}
                    success={touched.information && !errors.information}
                  />
                  <div className="flex items-center space-x-4">
                    <Button type="submit" buttonType="primary" loading={isSubmitting} disabled={isSubmitting}>
                      Submit
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </>
      </Modal>
      <Modal isOpen={isTagsEdit} setIsOpen={setIsTagsEdit} size="4xl">
        <LinkTags setIsOpen={setIsTagsEdit} onSubmit={onChange} tags={service.tags} />
      </Modal>
    </div>
  )
}

export const ServiceDetailCard = ServiceDetailCardComponent
