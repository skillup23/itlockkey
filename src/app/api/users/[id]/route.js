import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { email, name, password } = await request.json();

    const updateData = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true, // Возвращает обновленный документ
      runValidators: true, // Запускает валидаторы схемы
    }).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Пользовател не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Пользователь успешно изменен",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
