import { NextRequest, NextResponse } from "next/server";
import Connection from "@/app/database/config";

Connection()

export const GET = async (NextRequest) => {
    try {
        const res = NextResponse.json({ message: "Logout successfully!" }, { status: 200 })
        res.cookies.set("Token", "", { httpOnly: true,expiresIn: new Date(0)})
        return res;
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
