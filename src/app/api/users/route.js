import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}).select("-password"); // Исключаем пароль из ответа
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
