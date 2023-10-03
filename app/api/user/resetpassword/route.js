import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import Connection from "@/app/database/config.js";
import User from '../../modals/user';
import bcrypt from 'bcrypt';


Connection();

export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();
        const { id, token, newPassword } = body.allvalues;
        console.log("🚀 ~ file: route.js:13 ~ POST ~ body:", body)
        const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
            return new NextResponse('User Not Found', { status: 404 });
        }
        jwt.verify(token, "secret");
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        await User.findByIdAndUpdate({ _id: id }, { $set: { password: hashedPassword } });
        return NextResponse.json({ message: 'Updated successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error updating password:', error);
        return new NextResponse.json({ message: 'Error updating password' }, { status: 500 });
    }
}
