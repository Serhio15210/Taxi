import React, {useEffect, useState} from 'react';
import styles from "../../styles/Driver.module.sass";

import {useRouter} from "next/router";
import HomeLayer from "../../components/HomeLayer/HomeLayer";
import PayoutItem from "../../components/bookingItems/PayoutItem";

const Payouts = () => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)

    }, [])
    const payouts=[{
        date:'20 July, 2022',
        cost:'€ 490',
        routes: [{
            rideNumber: '56456',
            route: 'Nice → Monaco → Nice',
            amount: '€ 340',
            status: 'Pending'
        },
            {
                rideNumber: '56451',
                route: 'Nice → Saint Tropez',
                amount: '€ 150',
                status: 'Paid out'
            }]
    },
        {
            date:'19 July, 2022',
            cost:'€ 830',
            routes: [{
                rideNumber: '56402',
                route: 'Nice → Milan',
                amount: '€ 170',
                status: 'Paid out'
            },{
                rideNumber: '56328',
                route: 'Nice → Paris',
                amount: '€ 210',
                status: 'Paid out'
            },{
                rideNumber: '56301',
                route: 'Nice → Cannes',
                amount: '€ 90',
                status: 'Paid out'
            },{
                rideNumber: '56294',
                route: 'Nice → Saint Tropez',
                amount: '€ 150',
                status: 'Paid out'
            },{
                rideNumber: '56205',
                route: 'Nice → Monaco',
                amount: '€ 210',
                status: 'Paid out'
            }]
        }]
    const router=useRouter()
    return (
        <HomeLayer>
            <div className={styles.container}>
                <p className={styles.titleOffer}  >{'Bookings'}</p>
                <p className={styles.titleMobile}  >{'Payouts'}</p>
                <div className={styles.bookingNavigation}>
                    <p onClick={()=>router.replace('/bookings/offers')} style={{borderColor: 'transparent' ,color: '#566488' }}>offers</p>
                    <p onClick={()=>router.replace('/bookings/upcoming')} style={{borderColor: 'transparent',color: '#566488'}}>upcoming</p>
                    <p    style={{borderColor: '#4E7FF1',color: '#4E7FF1'}}>payouts</p>
                </div>
            <div className={styles.payoutsContainer}>
                {payouts.map((item,index)=>{
                    return (
                        <PayoutItem item={item} key={index} first={index===0} last={index===payouts.length-1}/>
                    )
                })}
            </div>
        </div>
        </HomeLayer>
    );
};

export default Payouts;
