import React, {useEffect, useState} from "react";
import styles from './Footer.module.sass';

import {useRouter} from "next/router";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const Footer = ({firstPage}) => {
    const router =useRouter()
    const [windowInnerWidth, setWindowInnerWidth] = useState('');

    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)

    }, [])
    return (
        <div className={styles.container} style={{backgroundColor:firstPage?'#F1F5FF':'white',display:!firstPage&&windowInnerWidth<800?'none':'flex'}}>
            <div className={styles.content}>
                {/*<img src="/arrow-ap.svg" alt="" className={styles.app} onClick={() => window.scrollTo(0,0)}/>*/}
                <div style={{flexDirection:'column',display:'flex',gap:30}}>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <img src="/logoWhite.svg" alt=""/>
                        <span><p style={{color:'#4E7FF1',fontWeight:'700',fontSize:30}}>easy</p><p style={{color:'#2DD792',fontWeight:'700',fontSize:30}}>transfer</p></span>
                    </div>

                    <span   className={styles.copywriting}>© 2022 copywriting</span>
                </div>

                <div className={styles.infoContent}>
                <div className={styles.info}>
                    <p>ABOUT</p>
                    <span onClick={()=>router.push('/buy-instagram-likes')}>Home</span>
                    <span onClick={()=>router.push('/buy-instagram-followers')}>Blog</span>
                    <span onClick={()=>router.push('/buy-instagram-views')}>Partners</span>
                    <span onClick={()=>router.push('/buy-instagram-comments')}>Book Transfer</span>
                    <span onClick={()=>router.push('/buy-instagram-comments')}>About Us</span>
                    <span onClick={()=>router.push('/buy-instagram-comments')}>Reviews</span>
                    <span onClick={()=>router.push('/buy-instagram-comments')}>Contact Us</span>
                </div>

                <div className={styles.info}>
                    <p>EASY TRANSFER</p>
                    <span onClick={()=>router.push('/contact')}>Privacy Policy</span>
                    <span onClick={()=>router.push('/support')}>Terms and conditions</span>
                    <span onClick={()=>router.push('/terms')}>Help Center</span>
                    <span onClick={()=>router.push('/terms')}>Partner Login</span>
                </div>

                <div className={styles.info}>
                    <p>Popular destinations</p>
                    <span onClick={()=>router.push('/blog')}>Nice→Monaco</span>
                    <span onClick={()=>router.push('/blog')}>Nice→Paris</span>
                    <span onClick={()=>router.push('/blog')}>Nice→Cannes</span>
                    <span onClick={()=>router.push('/blog')}>Nice→Saint Tropez</span>
                    <span onClick={()=>router.push('/blog')}>Nice→Sainte Maxime</span>
                    <span onClick={()=>router.push('/blog')}>Nice→Milan</span>
                </div>
                </div>


            </div>
            <div className={styles.copyBlock} onClick={() => window.scrollTo(0,0)}>
                <span   className={styles.copywritingDown}>© 2022 copywriting</span>
                <div className={styles.buttonUp}>
                    <KeyboardArrowUpIcon style={{fontSize:25,margin:'auto'}}/>
                </div>
            </div>
        </div>
    )
}
