import React, { useState } from 'react'
// import dynamic from 'next/dynamic'
// import { EditorProps } from 'react-draft-wysiwyg'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { Button } from '../button'

// // https://github.com/jpuri/react-draft-wysiwyg/issues/893
// const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false })

function QuestionEditorComponent({ questionId, answerQuestionAction, clickedQuestionId, isLoading }) {
  const [editor, setEditor] = useState(null)

  return (
    <>
      <Editor
        editorState={editor}
        toolbarClassName="bg-primary"
        editorClassName="bg-white"
        onEditorStateChange={(editorState) => setEditor(editorState)}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
        }}
      />
      <Button
        className="inline-flex mt-1 bg-primary"
        textClassName="text-white"
        size="small"
        onClick={() => answerQuestionAction(draftToHtml(convertToRaw(editor.getCurrentContent())), questionId)}
        loading={clickedQuestionId === questionId && isLoading}
        loadingClassName="text-background-light w-3 h-3"
      >
        Post Answer
      </Button>
    </>
  )
}

export const QuestionEditor = QuestionEditorComponent
