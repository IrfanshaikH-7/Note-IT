
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from "next/link"
import React from 'react'
import { Button } from '@/components/ui/button'
import { clerk } from '@/lib/clerk-server'
import Editor from '@/components/Editor/Editor'
import DeleteButton from '@/components/DeleteButton'

type Props = {
    params: {
        noteId: string
    }
}
const page = async({params : {noteId}}: Props) => {
  const{ userId } = await auth()
  if(!userId) return redirect('dashboard')
  const note = await db.note.findUnique({
    where: {
      id: noteId,
      userId: userId
    }
  })
  if(!note){
    redirect('dashboard')
  }

  const user = await clerk.users.getUser(userId) 

  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-4xl mx-auto'>
          <div className='border shadow-xl border-stone-200 rounded-lg p-4 flex items-center'>
            <Link href='/dashboard'>
                <Button className='bg-green-600' size='sm'>Back</Button>
            </Link>
            <div className='w-3'></div>
            <span className='font-semibold'>{user.firstName} {user.lastName}</span>
            <span className='inline-block mx-1'>/</span>
            <span className='text-stone-500 font-semibold'>{note.name}</span>
            <div className='ml-auto'>
              <DeleteButton noteId={note.id} />
            </div>
          </div>

          <div className='h-4'></div>
          <div className='border-stone-200 shadow-xl border-lg px-16 py-8 w-full'>
              <Editor note={note}/>
          </div>
      </div>
    </div>
  )
}

export default page