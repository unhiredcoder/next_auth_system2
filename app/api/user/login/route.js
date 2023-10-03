import { NextRequest, NextResponse } from "next/server";
import User from '../../modals/user.js'; // Assuming your model is named "User"
import bcrypt from 'bcrypt';
import Connection from "@/app/database/config";
import jwt from 'jsonwebtoken'


Connection()

export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();
        const { Email, password } = body;

        if (!Email || !password) {
            return new NextResponse("Email & password are required!", {
                status: 400,
            });
        }

        // Check if the Email already exists
        const existingUser = await User.findOne({ Email });

        if (!existingUser) {
            return new NextResponse("User doesn't exists!", { status: 400 });
        }
        // Hash the password using bcrypt
        const validpass = await bcrypt.compare(password, existingUser.password);
        if (!validpass) {
            return new NextResponse("Incorrect Password", { status: 400 });
        }

        const User_token = {
            Email: existingUser.Email,
            id: existingUser._id
        }
        const token = jwt.sign(User_token, process.env.JWT_SECRET, { expiresIn: '1d' })
        const res = NextResponse.json(existingUser)
        res.cookies.set("Token", token, { httpOnly: true })
        return res;
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
