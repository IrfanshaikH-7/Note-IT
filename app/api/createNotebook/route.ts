import { db } from "@/lib/db";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const runtime= "nodejs"

export async function POST(req: Request) {
    const { userId } = auth();
    if (!userId) {
        return new NextResponse("Unauthorize", { status: 401 })
    }
    const body = await req.json()
    const { name } = body

    const image_description = await generateImagePrompt(name);
  if (!image_description) {
    return new NextResponse("failed to generate image description", {
      status: 500,
    });
  }
    const imgUrl = await generateImage(image_description);
    if (!imgUrl || !imgUrl?.startsWith('https://')) {
        return new NextResponse(`Failed to get generated image`, { status: 500 });
    }

    const note = await db.note.create({
        data: {
            userId: userId,
            name: name,
            imageUrl: imgUrl,
        }
    })
    var note_id = note.id
    console.log(note_id)
    return NextResponse.json({note_id: note_id})
    
    console.log(image_description)
    return new NextResponse('ok');
}