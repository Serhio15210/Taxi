import React, {useEffect, useState} from 'react';

import HomeLayer from "../../components/HomeLayer/HomeLayer";
import styles from "../../styles/Driver.module.sass";
import OfferItem from "../../components/bookingItems/OfferItem";
import {useTaxiContext} from "../_app";
import Link from "next/link";
import {useRouter} from "next/router";
import AcceptModal from "../../components/AcceptModal";
import {useBookingContext} from "../../providers/BookingProvider";


const Offers = () => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const {getBooks}=useBookingContext()
    const [offers,setOffers]=useState([])
    const [change,setChange]=useState(false)
    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)
        getBooks().then(res=>{

            setOffers(res?.data?.data)
        })
    }, [change])
    const router=useRouter()
    // const {offers}=useTaxiContext()

    return (
        <HomeLayer>

            <div className={styles.container}>
                <p className={styles.titleOffer}  >{'Bookings'}</p>
                <p className={styles.titleMobile}  >{'Offers'}</p>
                <div className={styles.bookingNavigation}>
                    <p   style={{borderColor: '#4E7FF1' ,color: '#4E7FF1' }}>offers</p>
                    <p onClick={()=>router.replace('/bookings/upcoming')} style={{borderColor: 'transparent',color: '#566488'}}>upcoming</p>
                     <p onClick={()=>router.replace('/bookings/payouts')}   style={{borderColor: 'transparent',color: '#566488'}}>payouts</p>
                </div>
                <div className={styles.bookingRowContainer}>
                    {offers?.map((item,index)=>{
                        return (
                            <OfferItem item={item} url={`offers`} key={index} setChange={setChange} change={change}/>
                        )
                    })}
                </div>
            </div>
        </HomeLayer>
    );
};

export default Offers;
