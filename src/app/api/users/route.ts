import dbConnection from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnection();
  try {
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

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

    await User.create({
      username,
      password,
    });
    return Response.json({ succes: true, message: "User Created" });
  } catch (error) {
    return Response.json({ succes: false, message: `${error}` });
  }
}
