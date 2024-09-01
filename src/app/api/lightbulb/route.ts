import { NextRequest, NextResponse } from "next/server";
import dbConnection from "@/lib/mongodb";
import LightBulb from "@/models/LightBulb";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";


export async function GET(req: NextRequest) {
    try {
        await dbConnection()
        const session = await getServerSession(options)

        const lightbulb = await LightBulb.findOne({ userId: session?.user?.id })


        return NextResponse.json({success: true, data: {
            status: lightbulb.status
        }})

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Hey There' });
    }
}