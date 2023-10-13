"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import EditorMenubar from './EditorMenubar'
import { Button } from '../ui/button'
import { Text } from '@tiptap/extension-text'
import { useDebounce } from '@/lib/useDebounce'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { NoteType } from '@/types'
import { useCompletion } from 'ai/react'

type Props = {
  note: NoteType
}
const Editor = ({ note }: Props) => {
  const [editorState, setEditorState] = useState(note.editorState || `<h2>${note.name}</h2>`)
  
  const { complete, completion } = useCompletion({
    api: '/api/AIcompletion'
  })
  

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/saveNotes', {
        noteId: note.id,
        editorState
      })
      return response.data;
    },
  })

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        'Shift-a': () => {
          console.log('Activated shift-a');
          const prompt = this.editor.getText().split(' ').slice(-30).join(' ')
          complete(prompt)
          return true
        }
      }
    }
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML())
    }
  })

 const lastCompletion = useRef('')

  useEffect(() => {
    if(!editor || !completion) return
    const difference = completion.slice(lastCompletion.current.length)
    lastCompletion.current = completion
    editor.commands.insertContent(difference)
    
  }, [completion,editor])


  const debounceEditorState = useDebounce(editorState, 800)

  useEffect(() => {
    console.log(debounceEditorState)
    if (debounceEditorState === '') {
      return
    }
    saveNote.mutate(undefined, {
      onSuccess: data => {
        console.log("success update!", data)
      },
      onError: error => {
        console.log(error)
      }
    })

  }, [debounceEditorState])
  return (
    <>
      <div className='flex justify-between'>
        {editor && <EditorMenubar editor={editor} />}
        <Button>
          {saveNote.isLoading ? 'Saving..' : 'Saved'}
        </Button>
      </div>
      <div className='prose prose-sm w-full mt-4'>
        <EditorContent editor={editor} />
        <div className='h-4'></div>
        <span className='text-sm'>
          Tip: Press {' '}
          <kbd className='px-2 py-1.5 font-semibold text-xs bg-gray-100 border border-gray-200 rounded-lg'>
            Shift + A
          </kbd>{' '}
          for AI auto-completion
        </span>
      </div>
    </>
  )
}

export default Editor
