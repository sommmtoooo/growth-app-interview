import { NextRequest, NextResponse } from "next/server";
import dbConnection from "@/lib/mongodb";
import LightBulb from "@/models/LightBulb";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { get_light_bulb_status, toggle_light_bulb_status } from "@/lib/openai";

export async function GET(req: NextRequest) {
  try {
    await dbConnection();
    const session = await getServerSession(options);

    // Would Call GPT 4o Mini Over Here And Pass The values To The get_light_bulb
    const response = await get_light_bulb_status(session.user.id, "Turned On");
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong, try again later :(" });
  }
}



export async function POST(req: NextRequest) {
  // const { prompt } = req.json()
  try {
    await dbConnection();
    const session = await getServerSession(options);

    // Would Call GPT 4o Mini Over Here And Pass The values To The get_light_bulb
    const response = await toggle_light_bulb_status(session.user.id, "Turning on flash", true);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong, try again later :(" });
  }
}
