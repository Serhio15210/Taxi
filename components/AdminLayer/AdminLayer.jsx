import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import styles from "./AdminLayer.module.sass"
import Link from "next/link";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
const AdminLayer = ({children}) => {
    const router = useRouter()

    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const [openWrapperMenu, setOpenWrapperMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [doc, setDoc] = useState({});
    const [openNotification, setOpenNotification] = useState(false);
    const [unreadDocuments,setUnreadDocuments]=useState([])

    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)
        console.log(router.route.includes('transfers'))
    }, [])
    return (
        <div className={styles.wrapper}>
            {/*<div style={{backgroundColor:'#4E7FF1',height:'100%',maxWidth:230,width:'100%',position:'fixed',left: 0,borderRadius:'0px 40px 40px 0px'}}>*/}
            <MenuIcon style={{position:'absolute',top:20,left:20,fontSize:30}} onClick={()=>setOpenMenu(true)}/>
            <div className={`${styles.navbar} ${openMenu ? styles.active : ''}`}>
                <img src={'/navBarBg.svg'} style={{position:'absolute',bottom:50}}/>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%' }}>
                    <CloseIcon className={styles.closeButton} onClick={()=>setOpenMenu(false)}/>
                    <div  className={styles.logoBlock}    >
                        <Link href={'/admin'} ><img src="/logo.svg" alt="" width={40} height={40}/></Link>
                        <Link href={'/admin'} ><span><p className={styles.logoText1}>easy</p><p className={styles.logoText2}>transfer</p></span></Link>
                    </div>
                </div>

            <div className={`${styles.navItem} ${router.route.split('/admin')[1] === '' ? styles.active : ''}`} onClick={()=>router.replace('/admin')}>
                <div className={styles.navItemImg}>
                    <img src={'/dashboard.svg'}/>
                </div>
                <p>Dashboard</p>
            </div>
                <div className={`${styles.navItem} ${router.route.split('/transfers')[1] === ''||router.route.includes('transfers') ? styles.active : ''}`} onClick={()=>router.replace('/admin/transfers')} >
                    <div className={styles.navItemImg}>
                        <img src={'/transfers.svg'}/>
                    </div>
                    <p>Transfers</p>
                </div>
                <div className={`${styles.navItem} ${router.route.split('/companies')[1] === ''||router.route.includes('companies') ? styles.active : ''}`} onClick={()=>router.replace('/admin/companies')}>
                    <div className={styles.navItemImg}>
                        <img src={'/companies.svg'}/>
                    </div>
                    <p>Companies</p>
                </div>
                <div className={`${styles.navItem} ${router.route.split('/booking-system')[1] === '' ? styles.active : ''}`} onClick={()=>router.replace('/admin/booking-system')}>
                    <div className={styles.navItemImg}>
                        <img src={'/bookingSystem.svg'}/>
                    </div>
                    <p>Booking system</p>
                </div>
                <div className={`${styles.navItem} ${router.route.split('/clients')[1] === '' ? styles.active : ''}`} onClick={()=>router.replace('/admin/clients')}>
                    <div className={styles.navItemImg}>
                        <img src={'/clients.svg'}/>
                    </div>
                    <p>Clients</p>
                </div>
            </div>

            {children}
        </div>
    );
};

export default AdminLayer;
