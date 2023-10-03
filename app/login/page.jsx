'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Typography } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebase.js'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const router = useRouter();
  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = {
        name: result.user.displayName,
        Email: result.user.email
      }

      const response = await axios.post("/api/user/google-login", { user });
      if (response.status === 200) {
        console.log(user);
        const result = localStorage.setItem('userData', JSON.stringify(user));
        console.log("🚀 ~ file: page.jsx:40 ~ handlegoogleLogin ~ result:", result)
        router.push("/profile")
        toast.success('Logged In successfully')

      }

    } catch (error) {
      console.error("Error during Google login:", error);
    }
  }

  const [error, setError] = useState(""); // Initialize error message as an empty string.
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/user/login", values);
      if (response.status === 200) {
        localStorage.setItem('userData', JSON.stringify(response.data));
        router.push('/profile');
        toast.success('Logged In successfully')
      }
    } catch (error) {
      console.error(error);
      setError("Incorrect Email & password!");
    }
  };









  return (
    <div className='App'>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Form onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type='email' prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          help={error} // Display the error message here.
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType='submit'>Submit</Button>
        </Form.Item>
        <Typography style={{ textAlign: 'center', marginTop: '-20px' }}>or</Typography>
        <Form.Item><Button onClick={handleGoogleSignIn} block > {<GoogleOutlined />}Login with google</Button></Form.Item>
        <Typography>
          <Link href='/register'>
            Don't have an account?
          </Link> <br />
          <Link href='/resetPasswordEmail'>
            Forgot password ?
          </Link>
        </Typography>
      </Form>
    </div>
  );
};

export default Login;
