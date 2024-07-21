import React, {useState} from "react";
import styles from './Header.module.sass';


import Link from 'next/link'
import {useRouter} from "next/router";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import headerStyles from "./Header.module.sass";
import Switch from "react-switch";
import AskQuestionModal from "../../AskQuestionModal";
import PartnerHeader from "../PartnerHeader";


export const Header = ({firstPage,partner}) => {
    const [returnTrip, setReturnTrip] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const router =useRouter()
    return (

        partner?<PartnerHeader/>:
        <div className={`${firstPage?styles.container:styles.containerWhite}`}>
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


            <div className={styles.menu} style={{backgroundColor:firstPage?'transparent':'white'}}>
            <div  className={styles.logoBlock}>
                <Link href={'/'} >{firstPage ? <img src="/logo.svg" alt="" width={54} height={53}/>: <img src="/logoWhite.svg" alt="" width={54} height={53}/>}</Link>
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

                {firstPage&&<div className={styles.textContent}>
            <p className={styles.title}>Book a transfer<br/> taxi in Nice</p>
                <div className={styles.gapLine}/>
                <p  className={styles.text}>Easy Transfer put all the efforts to ensure that your Nice Airport Taxi is a unique experience and a moment of tranquility. </p>
                <div className={styles.hideContainer}>

                <span/>
                <div className={styles.googleBlock}>
                    <div style={{display:'flex',flexDirection:'row',gap:20,alignItems:'center'}}>
                        <img src="/google.svg" width={82} height={26}/>
                        <p className={styles.rating}>5,0</p>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',gap:20,alignItems:'center'}}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <StarIcon className={styles.star}/>
                            <StarIcon className={styles.star}/>
                            <StarIcon className={styles.star}/>
                            <StarIcon className={styles.star}/>
                            <StarIcon className={styles.star}/>


                        </div>
                        <p  className={styles.reviews}>29 reviews</p>
                    </div>
                </div>
                </div>

                {/*<div className={headerStyles.routeRelative}>*/}
                {/*    <div style={{display:'flex',flexDirection:'row'}}>*/}
                {/*        <div className={headerStyles.trapezoid}>*/}
                {/*            <p  >From A-to-B</p>*/}
                {/*        </div>*/}
                {/*        <div className={headerStyles.trapezoid} style={{borderBottomColor:'#3868D9'}}>*/}
                {/*            <p style={{margin:'auto',position:'relative',top:17,zIndex:10,color:'white'}}>Hourly ride</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className={headerStyles.route}>*/}
                {/*        <div className={headerStyles.routeBlock}>*/}
                {/*            <div className={headerStyles.routeInput}>*/}
                {/*                <img src="/marker.svg" width={15} height={20}/>*/}
                {/*                <input  placeholder="From"/>*/}
                {/*            </div>*/}
                {/*            <img src="/routeArrows.svg" width={15} height={20}/>*/}
                {/*            <div className={headerStyles.routeInput}>*/}
                {/*                <img src="/marker.svg" width={15} height={20}/>*/}
                {/*                <input  placeholder="To"/>*/}
                {/*            </div>*/}
                {/*            <div className={headerStyles.dateRow}>*/}
                {/*                <div className={headerStyles.routeInput}     >*/}

                {/*                    <input  placeholder="To" type="date"/>*/}
                {/*                </div>*/}
                {/*                <div className={headerStyles.routeInput}   >*/}

                {/*                    <input  placeholder="To" type="date"/>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className={headerStyles.switchRow}>*/}
                {/*                <div className={headerStyles.switchBlock}>*/}
                {/*                    <Switch   checked={returnTrip} checkedIcon={false} uncheckedIcon={false} onChange={()=>setReturnTrip(!returnTrip)} offColor='#E3EBFD' onColor='#2DD792'    height={25} width={50}   boxShadow='none' />*/}
                {/*                    <p style={{color:'#566488',fontSize:16}}>Return Trip</p>*/}
                {/*                </div>*/}
                {/*                <button className={'buttonNext'}>*/}
                {/*                    Next*/}
                {/*                </button>*/}
                {/*            </div>*/}


                {/*        </div>*/}
                {/*        <div className={headerStyles.switchOutside}>*/}
                {/*            <Switch   checked={returnTrip} checkedIcon={false} uncheckedIcon={false} onChange={()=>setReturnTrip(!returnTrip)} offColor='#E3EBFD' onColor='#2DD792'    height={25} width={50}   boxShadow='none' />*/}
                {/*            <p style={{color:'#566488',fontSize:16}}>Return Trip</p>*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*</div>*/}
            </div>}

        </div>
        </div>
    )
}
