import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
    const openai = new OpenAI({
        apiKey: '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'
    })
    const { prompt } = await req.json()
    // return NextResponse.json({message: prompt})

    if (prompt) {


        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: 'system', content: 'You are a helpful assistant who replies ( yes or no )?' },
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
            return NextResponse.json(completion.choices[0])
        } catch (error) { return NextResponse.json({ success: false, 'message': error?.message }) }
    } else {
        return NextResponse.json({ 'message': 'provide a prompt' })
    }

}


export async function GET(req: NextRequest) {
    return NextResponse.json({ 'status': true, data: tr })
}