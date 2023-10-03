'use client'
import React, { useContext } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const resetPasswardEmail = () => {
  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/user/resetEmail', {values});
      if (response.status === 200) {
        console.log('Email genrated link successfully');
        toast.success('Link Sent! please check ');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
      <div className='App'>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
        <Form
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input placeholder='Please input your email!' />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send reset email
            </Button>
          </Form.Item>
        </Form >
      </div >
    </>)
}

export default resetPasswardEmail