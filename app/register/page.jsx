'use client'
import React, { useEffect } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase.js';
import toast, { Toaster } from 'react-hot-toast';

const register = () => {
  const router = useRouter();

  // Add a state variable to check if it's running on the client
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true); // Set isClient to true when the component mounts (client-side)
  }, []);

  const onFinish = async (values) => {
    if (isClient) {
      try {
        const response = await axios.post("/api/user/register", values); // Removed "api" prefix to make the request relative
        if (response.status === 201) {
          localStorage.setItem('userData', JSON.stringify(response.data));
          router.push('/login');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  async function handlegoogleLogin() {
    if (isClient) {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = {
          name: result.user.displayName,
          Email: result.user.email,
        };

        const response = await axios.post("/api/user/google-login", { user });
        if (response.status === 200) {
          console.log(user);
          const result = localStorage.setItem('userData', JSON.stringify(user));
          router.push("/profile");
          toast.success('Logged In successfully');
        }
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    }
  }

  return (
    <div className='App'>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Form onFinish={onFinish} autoComplete="on">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input autoComplete='on' />
        </Form.Item>
        <Form.Item
          label="Email"
          name="Email"
          rules={[
            {
              required: true,
              message: 'Please input your Email',
            },
          ]}
        >
          <Input autoComplete='on' prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password autoComplete='on' prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType='submit'>Submit</Button>
        </Form.Item>
        <Typography style={{ textAlign: 'center', marginTop: '-20px' }}>or</Typography>
        <Form.Item><Button onClick={handlegoogleLogin} block > {<GoogleOutlined />}Login with google</Button></Form.Item>
        <Link href='/login'>
          Alredy have an account ?
        </Link>
      </Form>
    </div>
  )
}

export default register;

