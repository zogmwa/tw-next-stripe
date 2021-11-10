import React, { useState, useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiChevronUp, HiChevronDown } from 'react-icons/hi'
import toast from 'react-hot-toast'
import { TiImageOutline } from 'react-icons/ti'
import ReactTooltip from 'react-tooltip'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FiAlertTriangle } from 'react-icons/fi'
import { Switch } from '../switch'
import { Button } from '../button'
import { Carousel } from '../carousel/carousel'
import { AddAHighlight } from '../add-a-highlight'
import { LinkUsedByCompanies } from '../editable-components/editable-usedbycompanies/link-usedbycompanies'
import { Modal } from '../Modal'
import { ShowEditable } from '../editable-components'
import { useUserContext } from '../../hooks/use-user'

function HighlightContentComponent({
  attributeVotesList,
  attributes,
  isLoading,
  clickedAttribute,
  upvoteAttribute,
  addAttributeName,
  setAddAttributeName,
  addAttributeCon,
  setAddAttributeCon,
  addAttributeAction,
  addAttributeNameErrorMessage,
  customerOrganizations,
  editAllowed,
  onChange,
}) {
  const [isCon, setIsCon] = useState(false)
  const [viewMore, setViewMore] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOrganizationOpen, setIsOrganizationOpen] = useState(false)
  const [unlinkAttribute, setUnlinkAttribute] = useState(null)
  const [isConfirm, setIsConfirm] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const user = useUserContext()
  const { authVerified } = user

  function authCheck() {
    if (!authVerified) {
      toast.error('Please login to Add a Highlight.')
    } else {
      setIsOpen(!isOpen)
    }
  }

  useEffect(() => {
    if (isSubmit) {
      const unlinkedAttrubutesIds = []
      const unlinkedAttributes = attributes.filter((attribute) => attribute !== unlinkAttribute)
      unlinkedAttributes.map((attribute) => unlinkedAttrubutesIds.push({ name: attribute.name }))
      setIsSubmit(false)
      setUnlinkAttribute(null)
      onChange({ attributes: unlinkedAttrubutesIds })
    }
  }, [isSubmit])

  const handleUpvoteAttribute = (attribute) => {
    if (typeof upvoteAttribute === 'function') upvoteAttribute(attribute)
  }

  const defaultShowCount = 10

  attributes.sort((attributeA, attributeB) => {
    return Number(attributeB.upvotes_count) - Number(attributeA.upvotes_count)
  })

  let tempAttributes = attributes
  let tempConAttributes = attributes
  if (!isCon) tempConAttributes = attributes.filter((attribute) => attribute.is_con === isCon)
  if (!viewMore) tempAttributes = tempConAttributes.slice(0, 10)

  const coustmerLength = Math.ceil(customerOrganizations.length / 4)
  const showCustomers = []
  for (let i = 0; i < coustmerLength; i++) {
    showCustomers.push([])
    for (let j = 0; j < 4; j++) {
      if (customerOrganizations[i * 4 + j]) {
        showCustomers[i].push(customerOrganizations[i * 4 + j])
      }
    }
  }

  return (
    <div className="ml-3 md:mt-10">
      <div className="flex justify-between">
        <div className="md:flex md:justify-start">
          <h1 className="text-base font-medium text-text-primary">Highlights</h1>
          <Switch.Group className="mt-2 md:mt-0 md:ml-2">
            <Switch enabled={isCon} setEnabled={setIsCon} />
            <Switch.Label>{isCon ? 'Show cons as well' : 'Show cons too'}</Switch.Label>
          </Switch.Group>
        </div>
        <Button
          size="small"
          className="self-start bg-primary"
          textClassName="text-white"
          icon={<AiOutlinePlus className="text-white" />}
          onClick={authCheck}
        >
          Add a Highlight
        </Button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} isModalOverflow={true}>
          <AddAHighlight
            setIsOpen={setIsOpen}
            addAttributeName={addAttributeName}
            setAddAttributeName={setAddAttributeName}
            addAttributeCon={addAttributeCon}
            setAddAttributeCon={setAddAttributeCon}
            addAttributeAction={addAttributeAction}
            addAttributeNameErrorMessage={addAttributeNameErrorMessage}
          />
        </Modal>
      </div>
      <div className="mt-6 md:mt-2">
        <div className="md:grid md:grid-cols-2">
          {tempAttributes.map((attribute, index) => {
            if (isCon) {
              return (
                <div className="mt-2" key={index}>
                  <Button
                    size="small"
                    className={
                      attribute.is_con
                        ? typeof attributeVotesList.find(
                            (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                          ) !== 'undefined'
                          ? 'self-start text-background-light bg-text-error border-text-error'
                          : 'self-start text-text-error border-text-error'
                        : typeof attributeVotesList.find(
                            (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                          ) !== 'undefined'
                        ? 'self-start text-background-light bg-success border-success'
                        : 'self-start text-success border-success'
                    }
                    icon={
                      <HiChevronUp
                        className={
                          attribute.is_con
                            ? typeof attributeVotesList.find(
                                (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                              ) !== 'undefined'
                              ? 'text-background-light'
                              : 'text-text-error'
                            : typeof attributeVotesList.find(
                                (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                              ) !== 'undefined'
                            ? 'text-background-light'
                            : 'text-success'
                        }
                      />
                    }
                    loading={isLoading && clickedAttribute === attribute.id}
                    loadingClassName={
                      typeof attributeVotesList.find(
                        (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                      ) !== 'undefined'
                        ? 'text-background-light w-3 h-3'
                        : 'text-primary w-3 h-3'
                    }
                    onClick={() => handleUpvoteAttribute(attribute)}
                    disabled={isLoading}
                  >
                    {Number(attribute.upvotes_count) ? Number(attribute.upvotes_count) : 0}
                  </Button>
                  <span className="ml-2 text-sm text-text-secondary">{attribute.name}</span>
                  {editAllowed && (
                    <RiDeleteBin5Line
                      className="inline ml-2 text-sm text-red-600 cursor-pointer"
                      onClick={() => {
                        setUnlinkAttribute(attribute)
                        setIsConfirm(true)
                      }}
                    />
                  )}
                </div>
              )
            } else {
              return (
                <div className="mt-2" key={attribute.name}>
                  <Button
                    size="small"
                    className={
                      typeof attributeVotesList.find(
                        (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                      ) !== 'undefined'
                        ? 'self-start text-background-light bg-primary'
                        : 'self-start text-text-secondary border-text-tertiary'
                    }
                    textClassName={
                      typeof attributeVotesList.find(
                        (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                      ) !== 'undefined'
                        ? 'text-background-light'
                        : 'text-text-secondary'
                    }
                    icon={
                      <HiChevronUp
                        className={
                          typeof attributeVotesList.find(
                            (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                          ) !== 'undefined'
                            ? 'text-background-light'
                            : 'text-text-secondary'
                        }
                      />
                    }
                    loading={isLoading && clickedAttribute === attribute.id}
                    loadingClassName={
                      typeof attributeVotesList.find(
                        (upVotedAttribute) => upVotedAttribute.attribute === attribute.id,
                      ) !== 'undefined'
                        ? 'text-background-light w-3 h-3'
                        : 'text-primary w-3 h-3'
                    }
                    onClick={() => handleUpvoteAttribute(attribute)}
                    disabled={isLoading}
                  >
                    {Number(attribute.upvotes_count) ? Number(attribute.upvotes_count) : 0}
                  </Button>
                  <span className="ml-2 text-sm text-text-secondary">{attribute.name}</span>
                  {editAllowed && (
                    <RiDeleteBin5Line
                      className="inline ml-2 text-sm text-red-600 cursor-pointer"
                      onClick={() => {
                        setUnlinkAttribute(attribute)
                        setIsConfirm(true)
                      }}
                    />
                  )}
                </div>
              )
            }
          })}
          <Modal isOpen={isConfirm} setIsOpen={setIsConfirm} isModalOverflow={true}>
            <>
              <div className="text-center">
                <FiAlertTriangle className="inline text-4xl text-yellow-600" />
              </div>
              <div className="my-4 text-center">
                Highlight <b>{unlinkAttribute && unlinkAttribute.name}</b> will be remove from service with upvote
                counts. Are you sure?
              </div>
              <div className="flex flex-row-reverse">
                <Button
                  className="ml-4"
                  buttonType="default"
                  type="submit"
                  onClick={() => {
                    setIsConfirm(false)
                    setIsSubmit(false)
                    setUnlinkAttribute(null)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  buttonType="primary"
                  type="submit"
                  onClick={() => {
                    setIsConfirm(false)
                    setIsSubmit(true)
                  }}
                >
                  OK
                </Button>
              </div>
            </>
          </Modal>
        </div>
        {tempAttributes.length > 0 &&
        attributes.length !== defaultShowCount &&
        tempConAttributes.length > defaultShowCount ? (
          viewMore ? (
            <div
              className="flex self-start w-24 px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
              onClick={() => setViewMore(false)}
            >
              Load less
              <HiChevronUp className="self-center ml-2 text-text-tertiary" />
            </div>
          ) : (
            <div
              className="flex self-start w-24 px-0 mt-2 text-sm border-0 cursor-pointer text-text-tertiary"
              onClick={() => setViewMore(true)}
            >
              Load more
              <HiChevronDown className="self-center ml-2 text-text-tertiary" />
            </div>
          )
        ) : null}
      </div>
      <div className="mt-6 md:mt-4">
        {editAllowed ? (
          <div className="flex items-center">
            <ShowEditable onEdit={() => setIsOrganizationOpen(true)}>
              <h1 className="text-base font-medium text-text-primary">Used by Compaines like</h1>
            </ShowEditable>
            <Modal isOpen={isOrganizationOpen} setIsOpen={setIsOrganizationOpen} isModalOverflow={true} size="4xl">
              <LinkUsedByCompanies
                setIsOpen={setIsOrganizationOpen}
                customerOrganizations={customerOrganizations}
                onSubmit={onChange}
              />
            </Modal>
          </div>
        ) : (
          <h1 className="text-base font-medium text-text-primary">Used by Compaines like</h1>
        )}
        <Carousel buttonsShown={false} className="mt-2" itemsContainerClassName="border-none">
          {showCustomers.map((showCustomer, index) => (
            <Carousel.Item className="aspect-h-8 md:aspect-h-3" key={index}>
              <div className="grid content-around w-full h-full grid-cols-2 md:content-center md:grid-cols-4 justify-items-center">
                {showCustomer.map((item) => {
                  if (item.logo_url) {
                    return (
                      <div
                        className="flex items-center justify-center w-full h-full p-2"
                        title={item.name}
                        key={item.name}
                      >
                        <img src={item.logo_url} alt={item.name} data-for={`tooltip${item.name}`} data-tip />
                        <ReactTooltip
                          id={`tooltip${item.name}`}
                          type="light"
                          place="right"
                          border={true}
                          borderColor="text-grey-200"
                        >
                          {item.name}
                        </ReactTooltip>
                      </div>
                    )
                  } else {
                    return (
                      <div
                        className="flex items-center justify-around w-full h-full p-2"
                        title={item.name}
                        key={item.name}
                      >
                        <TiImageOutline className="text-4xl" data-for={`tooltip${item.name}`} data-tip />
                        <span
                          className="text-2xl italic tracking-wide text-text-secondary"
                          data-for={`tooltip${item.name}`}
                          data-tip
                        >
                          {item.name}
                        </span>
                        <ReactTooltip
                          id={`tooltip${item.name}`}
                          type="light"
                          place="right"
                          border={true}
                          borderColor="text-grey-200"
                        >
                          {item.name}
                        </ReactTooltip>
                      </div>
                    )
                  }
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export const HighlightContent = HighlightContentComponent
