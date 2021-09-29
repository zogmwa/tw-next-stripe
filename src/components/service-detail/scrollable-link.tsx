import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import NextLink from 'next/link'
import React, { Children } from 'react'

const ScrollableLink = ({ children, activeClassName, href }) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''
  const className =
    asPath.endsWith(href)
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <NextLink 
      href={href}
    >
      {React.cloneElement(child, {
        className: className || null,
      })}
    </NextLink>
  )
}

ScrollableLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
}

export default ScrollableLink
