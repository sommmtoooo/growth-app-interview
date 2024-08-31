import dbConnection from "@/lib/mongodb";
import LightBulb from "@/models/LightBulb";
import User from "@/models/User";
import { hashPayload } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: "Username and password are required." },
      { status: 400 },
    );
  }

  try {
    await dbConnection();
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return NextResponse.json(
        { sucess: false, message: "Username already exists." },
        { status: 400 },
      );
    }

    const user = await User.create({
      username,
      password: hashPayload(password),
    });

    await LightBulb.create({
      userId: user._id
    })
    
    return Response.json({ success: true, message: "User Created" });

  } catch (error) {
    return Response.json({ success: false, message: `${error}` });
  }
}
