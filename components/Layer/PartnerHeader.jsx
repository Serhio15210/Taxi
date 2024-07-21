import React, {useState} from 'react';
import styles from './Layer.module.sass';
import AskQuestionModal from "../AskQuestionModal";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import StarIcon from "@mui/icons-material/Star";

import {useRouter} from "next/router";
import SignInModal from "../SignIn/SignInModal";
const PartnerHeader = () => {
    const [returnTrip, setReturnTrip] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const [signIn, setSignIn] = useState(false);


    const router =useRouter()
    return (
        <div className={`${styles.containerBlack}`}>
            {signIn&&<SignInModal open={signIn} setOpen={setSignIn} />}
            {openContact&&<AskQuestionModal setOpen={setOpenContact} open={openContact}/>}
            {/*<div  className={styles.menu}>*/}
            {/*    <button className={styles.burger_menu} onClick={() => setOpenMenu(prev => !prev)}>{!openMenu ? <img src="/menu.svg" alt=""/> : <img src="/close.svg" alt=""/>}</button>*/}

            {/*</div>*/}
            <div className={`${styles.wrapper} ${openMenu && styles.active}`}  >
                {openMenu&&<CloseIcon style={{color:'white',position:'absolute',right:10,top:10,zIndex:5,fontSize:40}} onClick={()=>setOpenMenu(!openMenu)} />}
                {openMenu&&<Link href={'/'}><p>HOME</p></Link>}
                {openMenu&&<Link href={'/book-transfer'} ><p>BOOK TRANSFER</p></Link>}
                {openMenu&&<Link href={'/'} ><p>ABOUT US</p></Link>}
                {openMenu&&<Link href={'/'} ><p>REVIEWS</p></Link>}
                {openMenu&& <p onClick={()=>{
                    setOpenMenu(false)
                    setOpenContact(true)
                }}>CONTACT US</p> }

            </div>
            <div className={styles.content}>
                <div className={styles.menu}  >
                    <div  className={styles.logoBlock}>
                        <Link href={'/'} >{<img src="/logo.svg" alt="" width={54} height={53}/>}</Link>
                        <Link href={'/'} ><span><p className={styles.logoText1}>easy</p><p className={styles.logoText2}>transfer</p></span></Link>
                    </div>
                    <div className={styles.burger_menu} onClick={()=>setOpenMenu(!openMenu)} style={{zIndex:openMenu?1:7}}>
                        <MenuIcon style={{color:'white',margin:'auto' ,fontSize:40}}/>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',gap:50,alignItems:'center'}}>

                        <Link href={'/'} ><span className={`${styles.white} ${router.route.split('/')[1] === '' ? styles.hover : ''}`}><p>HOME</p></span></Link>
                        <Link href={'/book-transfer'} ><span className={`${styles.white} ${router.route.split('/')[1] === 'book-transfer' ? styles.hover : ''}`}>BOOK TRANSFER</span></Link>
                        <Link href={'/'} ><span className={styles.white}>ABOUT US</span></Link>
                        <Link href={'/'} ><span className={styles.white}>REVIEWS</span></Link>
                        <span className={styles.white} onClick={()=>setOpenContact(true)}>CONTACT US</span>
                    </div>

                </div>
                <div className={styles.textBlock}>
                <div className={styles.textContent}>
                    <p style={{color:'#AEB8D0'}}><Link href={'/'}><span style={{cursor:'pointer'}}>Home</span></Link>  /  Become our partner</p>
                    <p className={styles.title}>Become our <span style={{color:'#FFD601'}}>partner</span></p>
                    <div className={styles.gapLine}/>
                    <p  className={styles.text}>Easy Transfer gives you the best transfers you can get on the market. We are looking for motivated drivers and reliable transportation companies that are willing to increase their efficiency. Be ready to be constantly rewarded and let’s work together!</p>

                </div>
                <div className={styles.loginBlock}>
                    <p>Already a partner?</p>
                    <div className={styles.loginButton} onClick={()=>setSignIn(true)}>
                        <p>LOGIN</p>
                        <img src={"/lock.svg"}/>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerHeader;
