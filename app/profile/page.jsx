'use client'
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import userpng from '../public/user-account-sign-up-4489360-3723267.png'
import Image from 'next/image';
import style from '../styles/profile.module.css'; // Import your pagenotfound CSS file



const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')

  async function logout() {
    try {
      const response = await axios.get('/api/user/logout');
      if (response.status === 200) {
        router.push('/login');
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('userData')
    if (user) {
      setUser(JSON.parse(user).name)
      setEmail(JSON.parse(user).Email)
    }
  }, [])

  return (
    <body className={style.body}>
      <div className={style.wrapper}>
        <div className={style.landingPage}>
          <div style={{ textAlign: 'center' }} className={style.download}>
            <Image className={style.svg} src={userpng} alt='404 page' width='auto' height='auto' />
          </div>
          <h1 className={style.h1}>🎉 Welcome 🎉</h1>
          <h2 className={style.h2}>{user}</h2>
          <p className={style.p}>{email}</p>
          <button className={style.btn} onClick={logout}>Logout</button>
        </div>
      </div>
    </body>
  );
};

export default Profile;