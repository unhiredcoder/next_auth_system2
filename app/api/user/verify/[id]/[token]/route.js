import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const GET = async (next,content) => {
    const { token } = content.params;
    console.log("🚀 ~ file: route.js:6 ~ GET ~ token:", token)
    try {
        const tok=jwt.verify(token,process.env.JWT_SECRET);
        return NextResponse.json(({ message: 'Token Verified', tokenVerified: true }), { status: 200 });
    } catch (error) {
        console.error(error);
        const res = new NextResponse('Token Verification Failed', { status: 401 });
        return res;
    }
}

