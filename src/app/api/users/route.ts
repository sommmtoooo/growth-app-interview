import dbConnection from "@/lib/mongodb";
import User from "@/models/User";
import { verifyPayload } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { success: false, message: "Username and password are required." },
      { status: 400 },
    );
  }

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return NextResponse.json(
        { sucess: false, message: "Invalid Credentials" },
        { status: 401 },
      );
    }

    const validate_password = await verifyPayload(existingUser.password, password)
    if (!validate_password)
      return NextResponse.json(
        { sucess: false, message: "Invalid Credentials" },
        { status: 401 },
      );

    return Response.json({ success: true, user: existingUser });
  } catch (error) {
    return Response.json({ success: false, message: `${error}` });
  }
}
