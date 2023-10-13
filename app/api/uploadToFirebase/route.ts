import { db } from "@/lib/db";
import { uploadToFirebase } from "@/lib/firebase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { noteId } = await req.json();
        const note = await db.note.findUnique({
            where: {
                id: noteId
            }
        })
        if (!note || !note.imageUrl) {
        return new NextResponse("Note or Note.imageUrl not found",{status:400});
        }
        const firebase_url = await uploadToFirebase(note.imageUrl,note.name)

        
        await db.note.update({
            where:{
                id : noteId,
            },
            data:{
                imageUrl : firebase_url,
            }
        })
        return new NextResponse('success', {status: 200})
    } catch (error) {
        console.error(error)
        return new NextResponse('error', {status: 500})
    }
}