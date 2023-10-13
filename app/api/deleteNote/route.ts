import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const { noteId } = await req.json();
    await db.note.delete({
        where: {
            id : noteId,
        }
    })
    return new NextResponse('Note Deleted', {status: 200})
}