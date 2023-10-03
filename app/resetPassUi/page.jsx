'use client'
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function UpdatePassword() {
    const [id, setId] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter()
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const token = params.get('token');
        setId(id);
        setToken(token);

        axios.get(`/api/user/verify/${id}/${token}`)
            .then(response => {
                console.log("🚀 ~ file: page.jsx:23 ~ useEffect ~ response:", response)
                if (response.status !== 200) {
                    router.push('/404');
                }
            })
            .catch(error => {
                console.log("🚀 ~ file: page.jsx:30 ~ useEffect ~ error:", error)
                router.push('/404');
            });
    }, []);


    const onFinish = async (values) => {
        const newPassword = values.newPassword;
        const allvalues = {
            newPassword,
            id,
            token
        }
        try {
            const response = await axios.post("/api/user/resetpassword", { allvalues });
            if (response.status == 200) {
                router.push('/login')
                toast.success('Password Updated');
            }
        } catch (error) {
            router.push('/404')
            toast.error('Something went wrong!');
            console.log('Password Update failed:', error);
        }
    };


    return (
        <div className='App'>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <h1 style={{ textAlign: 'center' }}>Password Reset</h1>
            <br />
            <Form name="resetPassword" onFinish={onFinish}>
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your new password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('The two passwords do not match!')
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Reset Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}