import { NextRequest, NextResponse } from "next/server";
import User from '../../modals/user.js'; // Assuming your model is named "User"
import bcrypt from 'bcrypt';
import Connection from "@/app/database/config";

Connection()

export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();
        const { name, Email, password } = body;
        
        if (!Email || !name || !password) {
            return new NextResponse("Name, Email, and password are required!", {
                status: 400,
            });
        }

        // Check if the Email already exists
        const existingUser = await User.findOne({ Email });

        if (existingUser) {
            return new NextResponse("Email already exists!", { status: 400 });
        }
        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            Email,
            password: hashedPassword,
        });

        // Save the new user to the database
        // Save the new user to the database
        await newUser.save();

        return new NextResponse({newUser},{ status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
