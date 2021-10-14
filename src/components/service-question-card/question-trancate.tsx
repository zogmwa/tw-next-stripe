import React, { useState } from 'react'
import clsx from 'clsx'
import { convertFromHTML, EditorState, convertToRaw, ContentState } from 'draft-js'
import { MAX_DESCRIPTION_LENGTH } from '../../utils/constants'
import htmlToDraft from 'html-to-draftjs'
import dynamic from 'next/dynamic'

// https://github.com/jpuri/html-to-draftjs/issues/83#issuecomment-835709922
// let htmlToDraft = null
// if (typeof window === 'object') {
//   htmlToDraft = require('html-to-draftjs').default
// }

// const htmlToDraft = dynamic(() => import('html-to-draftjs'), {ssr: false})

type TruncatedDescriptionProps = {
  description: string
  maxLength?: number
  className?: string
  style?: React.CSSProperties
}

function serverDOMBuilder (html) {
  // const jsdom = require('jsdom')
  // const { JSDOM } = jsdom

  // const { document: jsdomDocument, HTMLElement, HTMLAnchorElement } = (new JSDOM(`<!DOCTYPE html>`)).window
  // // HTMLElement and HTMLAnchorElement needed on global for convertFromHTML to work
  // global.HTMLElement = HTMLElement
  // global.HTMLAnchorElement = HTMLAnchorElement

  // const doc = jsdomDocument.implementation.createHTMLDocument('foo')
  // doc.documentElement.innerHTML = html
  // const body = doc.getElementsByTagName('body')[0]
  // return body
}

function stateFromHTML (html) {
  // if DOMBuilder is undefined convertFromHTML will use the browser dom,
  //  hence we set DOMBuilder to undefined when document exist
  let DOMBuilder = typeof document === 'undefined' ? serverDOMBuilder : undefined
  const blocksFromHTML = convertFromHTML(html, DOMBuilder)
  return ContentState.createFromBlockArray(
     blocksFromHTML.contentBlocks,
     blocksFromHTML.entityMap,
   )
}

export function QuestionTruncated({
  description,
  maxLength = MAX_DESCRIPTION_LENGTH,
  className,
  style,
}: TruncatedDescriptionProps) {
  const [renderFull, setRenderFull] = useState(false)
  const isOverFlowingText = description?.length >= maxLength

  
  // const truncate = (editorState, charCount) => {
  //   const contentState = editorState.getCurrentContent();
  //   const blocks = contentState.getBlockMap();

  //   let count = 0;
  //   let isTruncated = false;
  //   const truncatedBlocks = [];
  //   blocks.forEach((block) => {
  //     if (!isTruncated) {
  //       const length = block.getLength();
  //       if (count + length > charCount) {
  //         isTruncated = true;
  //         const truncatedText = block.getText().slice(0, charCount - count);
  //         const state = ContentState.createFromText(`${truncatedText}...`);
  //         truncatedBlocks.push(state.getFirstBlock());
  //       } else {
  //         truncatedBlocks.push(block);
  //       }
  //       count += length + 1;
  //     }
  //   });

  //   if (isTruncated) {
  //     const state = ContentState.createFromBlockArray(truncatedBlocks);
  //     return EditorState.createWithContent(state);
  //   }

  //   return editorState;
  // }
  
  // const contentBlock = htmlToDraft((<p></p>))
  // // if (contentBlock) {
  //   const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //   const editorState = EditorState.createWithContent(contentState);
  //   const description1 = truncate(editorState, 100)
  // }
  console.log(stateFromHTML(description))


  return (
    <div
      className={clsx(renderFull ? 'space-y-1' : '', 'text-sm text-text-secondary', className)}
      style={style}
    >
      <div
        className="text-sm text-text-secondary" 
        dangerouslySetInnerHTML={{__html: description}} />
      {/* {renderFull ? (
      ) : (
        <Truncate
          className="text-sm text-text-secondary"
          lines={1}
          dangerouslySetInnerHTML={{
          __html: description
          }} />
      )} */}
      <button
        onClick={() => {
          setRenderFull((prevState) => !prevState)
        }}
        className="text-xs cursor-pointer text-text-tertiary"
      >
        {isOverFlowingText ? (renderFull === false ? 'See More...' : 'See Less') : ''}
      </button>
    </div>
  )
}
