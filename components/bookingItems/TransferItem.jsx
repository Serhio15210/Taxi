import React, {useEffect, useState} from 'react';
import styles from "./OfferItem.module.sass"
import {useTaxiContext} from "../../pages/_app";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CallIcon from "@mui/icons-material/Call";
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
const TransferItem = ({item}) => {
    const extraItems={
        sign:'/document.svg',
        child:'/child.svg',
        bottle:'/bottle.svg'
    }
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)

    }, [])
    return (
        <div className={styles.transferContainer}>
            <div className={styles.transferRouteInfo}>
                <div>
                <div className={styles.transferTimeTitle}>
                    <p>{item?.date},{item?.time}</p>
                </div>
                <div className={styles.routeInfo}>
                    <div className={styles.route}>
                        <div className={styles.firstRoute}><img src={"/routeCircle.svg"}
                                                                className={styles.routeImgTop}/>
                            <div className={styles.from}>
                                <p className={styles.title}>{item?.from}</p>
                                <div className={styles.rowContainer} style={{gap: 20}}>
                                    <div className={styles.rowContainer} style={{gap: 5, color: '#A3AEC9'}}>
                                        <img src={"/routeLength.svg"} width={14} height={14}/>
                                        <p>{item?.routeLength}</p>
                                    </div>
                                    <div className={styles.rowContainer} style={{gap: 5, color: '#A3AEC9'}}>
                                        <WatchLaterIcon style={{color: '#A3AEC9', fontSize: 18}}/>
                                        <p>≈ {item?.routeTime}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={styles.lastRoute}><img src={"/routeCircleLast.svg"}
                                                               className={styles.routeImgLast}/>
                            <p className={styles.to}>{item?.to}</p>

                        </div>
                    </div>
                </div>
                </div>
                {windowInnerWidth>800&&<div className={styles.costCallRow}>
                    <div className={styles.rowContainer} style={{gap:20}}>
                        <div className={styles.call}>
                            <CallIcon style={{color:'white'}}/>
                        </div>
                        <p style={{fontSize:18,fontWeight:'600'}}>+33 633 45 00 16 <span style={{fontWeight:'400'}}>(Ann)</span></p>
                    </div>
                    <p style={{fontSize:24,fontWeight:'600'}}>€ {item?.cost}</p>
                </div>}
            </div>
            <div className={styles.passengerInfo}>
                <p className={styles.transferTimeTitle}>Passenger information:</p>
                <div className={styles.countPassengerInfo} style={{gap:30}}>
                    <div className={styles.rowContainer} style={{gap:15,color:'#24304F',fontWeight:'600'}}>
                        <GroupIcon style={{color:'#A3AEC9'}}/>
                        <p>{item?.passengers} persons</p>
                    </div>
                    <div className={styles.rowContainer} style={{gap:15,color:'#24304F',fontWeight:'600'}}>
                        <WorkIcon style={{color:'#A3AEC9'}}/>
                        <p>{item?.baggage} bags</p>
                    </div>
                    <div className={styles.rowContainer} style={{gap:15,color:'#24304F',fontWeight:'600'}}>
                        <img src={"/car.svg"}/>
                        <p>{item?.vehicleType}</p>
                    </div>
                </div>
                <div className={styles.passengerMessage}>
                    <p className={styles.title}>Message:</p>
                    <p  >Nous aurons un chien de petite taille calme dans un sac de transport</p>
                </div>
                {item?.extra?.map((extra,index)=>{
                    return (
                        <div className={styles.rowContainer} style={{gap:25}} key={index}>
                            <img src={extra.includes('sign')?extraItems.sign:extra.includes('child')?extraItems.child:extra.includes('bottle')?extraItems.bottle:''}/>
                            <div>
                                <p>{extra}</p>
                                {extra.includes('sign')&&<p style={{color:'#566488',marginTop:5}}>Airport Sign: Ann Wolf</p>}
                            </div>
                        </div>
                    )
                })}
            </div>
            {windowInnerWidth<800&&windowInnerWidth>500&&<div className={styles.costCallRow}>
                <div className={styles.rowContainer} style={{gap:20}}>
                    <div className={styles.call}>
                        <CallIcon style={{color:'white'}}/>
                    </div>
                    <p style={{fontSize:18,fontWeight:'600'}}>+33 633 45 00 16 <span style={{fontWeight:'400'}}>(Ann)</span></p>
                </div>
                <p style={{fontSize:24,fontWeight:'600'}}>€ {item?.cost}</p>
            </div>}
            {windowInnerWidth<500&&<div className={styles.costCallRowMobile}>
                <div className={styles.rowContainer} style={{gap:20,justifyContent:'space-between',width:'100%'}}>
                    <p style={{fontSize:24,fontWeight:'600'}}>€ {item?.cost}</p>
                    <div className={styles.call}>
                        <CallIcon style={{color:'white'}}/>
                    </div>


                </div>
                <p style={{fontSize:18,fontWeight:'600'}}>+33 633 45 00 16 <span style={{fontWeight:'400'}}>(Ann)</span></p>
            </div>}
        </div>
    );
};

export default TransferItem;
