import React, {useState} from 'react';
import styles from "./OfferItem.module.sass";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import CheckIcon from "@mui/icons-material/Check";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CallIcon from '@mui/icons-material/Call';
import {useRouter} from "next/router";

const UpcomingItem = ({item}) => {
    const [showMessage,setShowMessage]=useState(false)
    const router=useRouter()
    return (
        <div className={styles.relativeContainer}>
            <div className={styles.offerContainer} onClick={()=>router.push(`/bookings/offers/${item?.number}`)}>
                <div className={styles.offerRoute}>
                    <div className={styles.routeTimeRow}>
                        <p>{item?.BookInfo?.bookingTime}</p>
                        <div>
                            <p>{new Date(item?.BookInfo?.bookingDate).getDay()} {new Date(item?.BookInfo?.bookingDate).toLocaleString('en', {month: 'short'})},{new Date(item?.BookInfo?.bookingDate).getFullYear()}</p>
                            <p style={{
                                color: '#A3AEC9',
                                fontSize: 14,
                                textAlign: 'right',
                                fontWeight: '400',
                                marginTop: 9
                            }}>№{item?._id?.substring(0,10)}</p>
                        </div>

                    </div>
                    <div className={styles.routeInfo}>
                        <div className={styles.route}>
                            <div className={styles.firstRoute}><img src={"/routeCircle.svg"}
                                                                    className={styles.routeImgTop}/>
                                <div className={styles.from}>
                                    <p className={styles.title}>{item?.BookInfo?.From?.value}</p>
                                    {/*<div className={styles.rowContainer} style={{gap: 20}}>*/}
                                    {/*    <div className={styles.rowContainer} style={{gap: 5, color: '#A3AEC9'}}>*/}
                                    {/*        <img src={"/routeLength.svg"} width={14} height={14}/>*/}
                                    {/*        <p>{item.routeLength}</p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={styles.rowContainer} style={{gap: 5, color: '#A3AEC9'}}>*/}
                                    {/*        <WatchLaterIcon style={{color: '#A3AEC9', fontSize: 18}}/>*/}
                                    {/*        <p>≈ {item.routeTime}</p>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>

                            </div>
                            <div className={styles.lastRoute}><img src={"/routeCircleLast.svg"}
                                                                   className={styles.routeImgLast}/>
                                <p className={styles.to}>{item?.BookInfo?.To?.value}</p>

                            </div>
                        </div>
                    </div>

                </div>
                <div className={styles.vehicleInfo}>
                    <div className={styles.rowContainer} style={{justifyContent: 'space-between',gap:15}}>
                        <div className={styles.rowContainer} style={{gap: 15}}>
                            <img src={"/car.svg"}/>
                            <p style={{fontWeight: '700'}}>{item?.TypeCar}</p>
                        </div>
                        <div className={styles.rowContainer} style={{gap: 25}}>
                            <div className={styles.rowContainer} style={{gap: 10}}>
                                <GroupIcon style={{color: '#A3AEC9'}}/>
                                <p style={{fontWeight: '700'}}>{item?.Passengers}</p>
                            </div>
                            <div className={styles.rowContainer} style={{gap: 10}}>
                                <WorkIcon style={{color: '#A3AEC9'}}/>
                                <p style={{fontWeight: '700'}}>{item?.Suitcases}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.extraBlock}>
                        {/*{item.extra.map((extra,index)=>{*/}
                        {/*    return (*/}
                        {item?.Personalize?.childSeat>0&&<div className={styles.rowContainer} style={{gap: 15,color: '#A3AEC9'}} >
                            <CheckIcon style={{color:'#4E7FF1'}}/>
                            <p>I require a child seat</p>
                        </div>}
                        {item?.Personalize?.waterBottle>0&&<div className={styles.rowContainer} style={{gap: 15,color: '#A3AEC9'}} >
                            <CheckIcon style={{color:'#4E7FF1'}}/>
                            <p>A bottle of water</p>
                        </div>}
                        {item?.Personalize?.signService&&<div className={styles.rowContainer} style={{gap: 15,color: '#A3AEC9'}} >
                            <CheckIcon style={{color:'#4E7FF1'}}/>
                            <p>Meet me with a sign</p>
                        </div>}
                        {item?.Personalize?.extraTime&&<div className={styles.rowContainer} style={{gap: 15,color: '#A3AEC9'}} >
                            <CheckIcon style={{color:'#4E7FF1'}}/>
                            <p>Extra waiting time</p>
                        </div>}
                        {item?.Personalize?.extraStop&&<div className={styles.rowContainer} style={{gap: 15,color: '#A3AEC9'}} >
                            <CheckIcon style={{color:'#4E7FF1'}}/>
                            <p>Extra stop</p>
                        </div>}
                        {/*    )*/}
                        {/*})}*/}
                    </div>
                    <div className={styles.costBlock}>
                        <p className={styles.cost}>€ {item?.BookInfo?.Price}</p>
                        <div className={styles.rowContainer} style={{gap:20}}>
                            {item?.Personalize?.comment&&<div className={styles.message} onMouseMove={()=>setShowMessage(true)} onMouseOut={()=>setShowMessage(false)}>

                                <ChatBubbleIcon style={{color:'#BFC7DD'}}/>
                                <div className={styles.messageCount}>
                                    <p>1</p>
                                </div>
                            </div>}
                            <div className={styles.call}>
                                <CallIcon style={{color:'white'}}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {showMessage&&<div className={styles.messageUpcomingText}>
                <img src={"/messagePolygon.svg"} style={{position:'absolute',top:-10}}/>
                <p>{item?.Personalize?.comment}</p>
            </div>}
        </div>
    );
};

export default UpcomingItem;
