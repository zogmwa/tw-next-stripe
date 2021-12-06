import React from 'react'
import { BsShare, BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from 'react-share'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import ScrollableLink from '../scrollspy/scrollable-link'
import { Button } from '../button'

function ServiceDetailSidebarComponent({ elements }) {
  const { asPath } = useRouter()

  return (
    <div className="hidden mt-6 md:flex">
      <div className="w-52">
        <div className={elements.length === 7 ? 'sticky top-[4rem] h-60' : 'sticky top-[4rem] h-56'}>
          <nav
            className={
              elements.length === 7
                ? 'w-48 p-2 bg-white border border-solid rounded-md shadow h-52 lg:h-46 border-grey-200'
                : 'w-48 p-2 bg-white border border-solid rounded-md shadow h-48 lg:h-42 border-grey-200'
            }
          >
            {elements.map((item) => (
              <ScrollableLink
                href={`#scrollable-${item.id}`}
                key={item.id}
                activeClassName={'bg-secondary text-primary border-secondary font-semibold rounded-sm'}
              >
                <a
                  className="block mx-1 my-0.5 px-1 py-0.5 text-sm text-text-secondary font-sm cursor-pointer focus:ring-0 focus:ring-offset-0"
                  href={`#scrollable-${item.id}`}
                >
                  {item.name}
                </a>
              </ScrollableLink>
            ))}
          </nav>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div className="mt-2 text-center">
                <Button icon={<BsShare className="text-primary" />} {...bindTrigger(popupState)}>
                  Share
                </Button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Typography sx={{ paddingY: '0.5rem', paddingX: '1rem' }}>
                    <div className="flex space-x-2">
                      <FacebookShareButton url={process.env.SITE_BASE_URL + asPath}>
                        <BsFacebook className="p-1 text-2xl rounded-full text-primary" />
                      </FacebookShareButton>
                      <LinkedinShareButton url={process.env.SITE_BASE_URL + asPath}>
                        <BsLinkedin className="p-1 text-2xl rounded-md text-primary" />
                      </LinkedinShareButton>
                      <TwitterShareButton url={process.env.SITE_BASE_URL + asPath}>
                        <BsTwitter className="p-1 text-2xl rounded-full text-primary" />
                      </TwitterShareButton>
                    </div>
                  </Typography>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
      </div>
      <div className="w-full ml-4">
        <div id="scroll-element" className="my-2 ml-4">
          {elements.map((item) => (
            <div id={`scrollable-${item.id}`} key={item.id} style={{ scrollMarginTop: '4rem' }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const ServiceDetailSidebar = ServiceDetailSidebarComponent
