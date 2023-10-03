import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const POST = async (req) => { // Changed parameter name from NextRequest to req
    try {
        const body = await req.json(); // Changed NextRequest to req
        const { email ,displayName} = body.user;
        const userToken = { // Changed variable name from User_token to userToken
            Email: email,
            name:displayName
        }
        const token = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: '1d' });
        const res = new NextResponse({}); // Initialize NextResponse with an empty object
        // Set the "Token" cookie in the response
        res.cookies.set("Token", token, { httpOnly: true });

        return res;
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};