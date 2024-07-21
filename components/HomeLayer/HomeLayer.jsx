import React, {useState,useEffect} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import styles from "./HomeLayer.module.sass"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AccountOptionsModal from "../AccountOptionsModal";
import {useTaxiContext} from "../../pages/_app";
import {loadToken} from "../../utils/storage";
const HomeLayer = ({children}) => {

    const router = useRouter()

    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const [openWrapperMenu, setOpenWrapperMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [doc, setDoc] = useState({});
    const [openNotification, setOpenNotification] = useState(false);
    const [unreadDocuments,setUnreadDocuments]=useState([])
    const {logOut,user,setUser,checkMe}=useTaxiContext()
    useEffect( () => {
        if (window) setWindowInnerWidth(window.screen.width)
        const token = loadToken()
        checkMe(token).then(res=>{
            setUser(res.data)
        })

    }, []);
    return (
        <div className={styles.wrapper}>
            {windowInnerWidth<500&&open&&<AccountOptionsModal open={open} setOpen={setOpen}/>}
            <div className={`${styles.wrapperMenu} ${openWrapperMenu && styles.active}`} onClick={()=>setOpenWrapperMenu(!openWrapperMenu)}  >
                {openWrapperMenu&&<CloseIcon style={{color:'white',position:'absolute',left:10,top:10,zIndex:5,fontSize:40}} onClick={()=>setOpenWrapperMenu(!openWrapperMenu)} />}
                <div style={{display:'flex',flexDirection:'column' ,gap:40,alignItems:'flex-start'}}>
                    {openWrapperMenu&&<Link href={'/home'}><div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:25}}><img src={router.route.split('/home')[0] === '' ?'/carDriverWhite.svg':'/carDriver.svg'}/><p style={{color:router.route.split('/home')[0] === '' ?'white':'#AEC3FA'}}>CAR DRIVER</p></div></Link>}
                    {openWrapperMenu&&<Link href={'/account'}><div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:25}}><PersonOutlineIcon style={{color:router.route.split('/account')[0] === '' ?'white':'#AEC3FA',fontSize:30}}/><p style={{color:router.route.split('/account')[0] === '' ?'white':'#AEC3FA'}}>ACCOUNT</p></div></Link>}
                    {openWrapperMenu&&<Link href={'/bookings/offers'}><div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:25}}><EventAvailableOutlinedIcon style={{color:router.route.split('/bookings')[0] === '' ?'white':'#AEC3FA',fontSize:30}}/><p style={{color:router.route.split('/bookings')[0] === '' ?'white':'#AEC3FA'}}>BOOKINGS</p></div></Link>}

                </div>


            </div>
            <div className={`${styles.navbar} ${openMenu ? styles.active : ''}`}>
                <div style={{display:'flex',flexDirection:'row',gap:20,alignItems:'center',marginBottom:60 }}>
                    {openMenu&&<p className={styles.menuButton}>  <CloseIcon style={{color:'black',fontSize:40}} onClick={() => setOpenMenu(prev => !prev)}/></p>}
                    <div  className={styles.logoBlock}   >
                        <Link href={'/home'} ><img src="/logoWhite.svg" alt="" width={40} height={40}/></Link>
                        <Link href={'/home'} ><span><p className={styles.logoText1}>easy</p><p className={styles.logoText2}>transfer</p></span></Link>
                    </div>
                </div>

                <Link href='/home'>

                    <div className={`${styles.navitem} ${router.route.split('/home')[1] === '' ? styles.active : ''}`}>
                        {/*<img src="/users.svg"/>*/}
                        <img src={router.route.split('/home')[1] === '' ?'/carDriverActive.svg':'/carDriver.svg'}   />
                        <p>{'CAR DRIVER'}</p>
                    </div>
                </Link>
                <Link href='/account'>
                    <div className={`${styles.navitem} ${router.route.split('/account')[1] === '' ? styles.active : ''}`}>
                        {/*<img src="/users.svg"/>*/}
                        <PersonOutlineIcon style={{color:router.route.split('/account')[1] === '' ?'black':'#AEC3FA',fontSize:30}}/>
                        <p>{'ACCOUNT'}</p>
                    </div>
                </Link>
                <Link href='/bookings/offers'>

                    <div className={`${styles.navitem} ${router.route.split('/bookings')[0] === '' ? styles.active : ''}`}>
                        {/*<img src="/users.svg"/>*/}
                        <EventAvailableOutlinedIcon style={{color:router.route.split('/bookings')[0] === '' ?'black':'#AEC3FA',fontSize:30}}/>
                        <p>{'BOOKINGS'}</p>
                        <div style={{backgroundColor:'#4E7FF1',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',width:27,height:20}}>
                            <p style={{color:'white'}}>3</p>
                        </div>
                    </div>
                </Link>



            <div className={styles.navbarHelpContainer}>
                <div style={{width:38,height:2,backgroundColor:'#A7B1C9'}}/>
                <p>Need Help?</p>
                <div>
                    <p style={{color:'rgba(86, 100, 136, 0.5)'}}>info@easytransfer.com</p>
                    <p style={{textDecoration:'underline',color:'#1C60FF',cursor:'pointer',marginTop:3}}>Visit Help Center</p>
                </div>
            </div>
            </div>
            <div className={styles.header}>

                <div style={{display:'flex',flexDirection:'row',gap:20,alignItems:'center' }}>
                 <MenuIcon style={{color:'black',fontSize:40}} onClick={() => setOpenMenu(prev => !prev)}/>
                <div  className={styles.logoBlock} style={{marginBottom:0}} >
                            <Link href={'/'} ><img src="/logoWhite.svg" alt="" width={40} height={40}/></Link>
                            <Link href={'/'} ><span><p className={styles.logoText1}>easy</p><p className={styles.logoText2}>transfer</p></span></Link>
                        </div>
                </div>

                <div   className={styles.headerNameBlock} onClick={()=>setOpen(!open)}>

                     <p>Hi, {user?.BasicInformation?.name}</p>
                        <div style={{maxWidth:45,width:45,height:45,borderRadius:50,backgroundColor:'#2DD792',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
                            <p   className={styles.avatarLetter}>L</p>
                        </div>
                    {open?<ArrowDropUpIcon   style={{color:'#566488'}}/>:<ArrowDropDownIcon   style={{color:'#566488'}}/>}
                    {open&&<div className={styles.headerOptions}>
                        <img src={'/polygonUp.svg'} style={{position:'absolute',top:-10}}/>
                        <div onClick={()=>router.push('/account')}>
                            <PersonOutlineIcon style={{color:'#A3AEC9'}}/>
                            <p style={{color:'#566488'}}>My account</p>
                        </div>
                        <div onClick={()=>{
                        logOut()
                        router.replace('/partner')
                        }
                        }>
                            <PowerSettingsNewIcon style={{color:'#A3AEC9'}}/>
                            <p style={{color:'#566488'}}>Logout</p>
                        </div>
                    </div>}
                </div>

            </div>


            {children}
            <div className={styles.helpMobileContainer}>
                <div className={styles.helpContent}>
                    <div className={styles.helpText}>
                        <p style={{color:'#566488',fontWeight:'600'}} id='title'>Need Help?</p>
                        <p style={{color:'rgba(86, 100, 136, 0.5)' }}>info@easytransfer.com</p>
                    </div>
                    <div className={styles.backButton}>
                        <p>Visit Help Center</p>
                        <ArrowRightAltIcon style={{color:'#8B97B7'}}/>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Link href='/bookings/offers'>
                <div className={styles.footerItem}>
                    <EventAvailableOutlinedIcon style={{color:router.route.split('/offers')[1] === '' ?'white':'rgba(255, 255, 255, 0.7)',fontSize:30}}/>
                    <p style={{color:router.route.split('/offers')[1] === '' ?'white':'rgba(255, 255, 255, 0.7)'}} >OFFERS</p>
                </div></Link>
                <Link href='/bookings/upcoming'>
                <div className={styles.footerItem}>
                    <img src={router.route.split('/upcoming')[1] === '' ?"/locationsWhite.svg":"/locations.svg"} width={30} height={30}/>
                    <p  style={{color:router.route.split('/upcoming')[1] === '' ?'white':'rgba(255, 255, 255, 0.7)'}}>UPCOMING</p>
                </div></Link>
                <Link href='/bookings/payouts'><div className={styles.footerItem}>
                    <img src={router.route.split('/payouts')[1] === '' ?"/walletWhite.svg":"/wallet.svg"} width={30} height={30}/>
                    <p  style={{color:router.route.split('/payouts')[1] === '' ?'white':'rgba(255, 255, 255, 0.7)'}}>PAYOUTS</p>
                </div></Link>
            </div>

        </div>
    );
};

export default HomeLayer;
