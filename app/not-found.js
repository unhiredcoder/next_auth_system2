import Image from 'next/image';
import React from 'react';
import Page404 from './public/svgviewer-output.svg'
import style from'./styles/notfound.module.css'; // Import your pagenotfound CSS file
import Link from 'next/link';



const NotFound = () => {
    return (
        <body className={style.body}>
        <div className={style.wrapper}>
            <div className={style.landingPage}>
                <div style={{ textAlign: 'center' }} className={style.icon__download}>
                    <Image className={style.svg} src={Page404} alt='404 page' width={200} height={200} />
                </div>
                <h1 className={style.h1}> 404 Error.</h1>
                <p className={style.p}> We can't find the page you're looking for.</p>
                <Link href='/login' className={style.btn}>Back to home</Link>
            </div>
        </div>
        </body>
    );
};

export default NotFound;
