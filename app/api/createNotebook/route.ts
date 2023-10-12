import { generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { userId } = auth();
    if(!userId){
        return new NextResponse("Unauthorize", {status:401})
    }
    const body =  await req.json()
    const{ name } = body

    const imgPrompt = await generateImagePrompt(name);
    console.log(imgPrompt)
    return new NextResponse('ok');
}