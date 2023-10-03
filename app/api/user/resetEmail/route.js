import jwt from 'jsonwebtoken';
import User from '../../modals/user'; // Update the path to your User model
import { NextResponse } from 'next/server';
import Connection from "@/app/database/config.js";
import nodemailer from 'nodemailer'


Connection();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  }
});
export const POST = async (NextRequest) => {

  try {
    const body = await NextRequest.json();
    const { email } = body.values;
    const oldUser = await User.findOne({ Email: email });

    if (!oldUser) {
      return new NextResponse.json({ status: 'User Not Exists!!' }, { status: 404 });
    }
    
    const token = jwt.sign({ Email: oldUser.Email, id: oldUser._id }, "secret", {
      expiresIn: '2m',
    });
    const Url = `${process.env.BASE_URL}/resetPassUi?id=${oldUser._id}&token=${token}`;
    console.log(Url);
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Password Reset Request:",
      text: "Act Fast! Link Expires in 2 Minutes",
      html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: auto; padding: 0;">
      <div style="max-width:100%; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); display: grid; place-content: center; border-radius: 5px;">
          <h1 style="color: #333; text-align: center;">Password Reset</h1>
          <p style="color: #555;text-align: center;">You have requested to reset your password. Click the button below to reset your password:</p>
          <a style="display: inline-block; padding: 10px 20px;text-align: center; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; margin-top: 20px;" href=${Url}>Reset Password</a>
          <p style="color: red; text-align: center;">⚠️ "Hurry up! You have only 2 minutes to reset your password." ⚠️</p>
          <p style="color: #555; margin-top: 10px; text-align: center;"> If you didn't request a password reset, please ignore this email.</p>
      </div>
  </body>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
        res.status(500).send('Link sending failed.');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Link sent successfully.');
      }
    });



    const res = NextResponse.json({ message: 'link gen successfully' }, {
      status: 200,
    });
    return res;
  } catch (error) {
    console.error('Error generating link:', error);
    return new NextResponse.json({ message: 'Internal Server Error' }, {
      status: 500, // Internal Server Error
    });
  }
}

