'use client'
import React from 'react';
import { Button } from './ui/button';
import { Delete } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Props = {
    noteId: string
}    

const DeleteButton = ({noteId} : Props) => {
    const router = useRouter()

    const deleteNote = useMutation({
        mutationFn:async () => {
            const response = await axios.post('/api/deleteNote',{
                noteId: noteId
            })
            return response.data
        }
    })
  return (
    <Button className='' variant='destructive' size='sm' onClick={() => {
        const confirmed = window.confirm(`Are you sure you want to delete this note ?` );
        if(!confirmed) return
        deleteNote.mutate(undefined, {
            onSuccess: () => {
                router.push('/dashboard')
            },
            onError: (error)=> {
                console.error(error)
            }
        })
    }}>
      <Delete />
    </Button>
  )
}
    
export default DeleteButton
