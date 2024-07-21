import React, {useEffect, useState} from 'react';

import HomeLayer from "../../components/HomeLayer/HomeLayer";
import styles from "../../styles/Driver.module.sass";
import OfferItem from "../../components/bookingItems/OfferItem";
import UpcomingItem from "../../components/bookingItems/UpcomingItem";
import Link from "next/link";
import {useRouter} from "next/router";
import {useBookingContext} from "../../providers/BookingProvider";

const Upcoming = () => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const {getMyBooks}=useBookingContext()
    const [offers,setOffers]=useState([])
    const [change,setChange]=useState(false)
    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)
        getMyBooks().then(res=>{

            setOffers(res?.data?.data)
        })
    }, [change])
    const router=useRouter()
    // const offers=[{
    //     time:'8:30 pm',
    //     date:'July 2, 2022',
    //     number:'10078158',
    //     from:'Nice Côte d`Azur Airport (NCE), Rue Costes et Bellonte, 06206 Nice France',
    //     routeLength:'64 км',
    //     routeTime:'54 мин',
    //     to:'Costes et Bellonte',
    //     vehicleType:'Economy',
    //     passengers:2,
    //     baggage:3,
    //     extra:['I require a child seat','Meet me with a sign'],
    //     cost:150,
    //     message:true
    // },{
    //     time:'8:30 pm',
    //     date:'July 2, 2022',
    //     number:'10078157',
    //     from:'Nice Côte d`Azur Airport (NCE),',
    //     routeLength:'25 км',
    //     routeTime:'20 мин',
    //     to:'Rue Costes et Bellonte, 06206 Nice France',
    //     vehicleType:'Economy +',
    //     passengers:4,
    //     baggage:4,
    //     extra:[],
    //     cost:110,
    //     message:false
    // } ]
    return (
        <HomeLayer>
            <div className={styles.container}>
                <p className={styles.titleOffer}  >{'Bookings'}</p>
                <p className={styles.titleMobile}  >{'Upcoming'}</p>
                <div className={styles.bookingNavigation}>
                     <p onClick={()=>router.replace('/bookings/offers')} style={{borderColor: 'transparent' ,color: '#566488' }}>offers</p>
                    <p  style={{borderColor: '#4E7FF1',color: '#4E7FF1'}}>upcoming</p>
                    <p onClick={()=>router.replace('/bookings/payouts')}  style={{borderColor: 'transparent',color: '#566488'}}>payouts</p>
                </div>
                <div className={styles.bookingRowContainer}>
                    {offers.map((item,index)=>{
                        return (
                            <UpcomingItem item={item} key={index} setChange={setChange} change={change}/>
                        )
                    })}
                </div>
            </div>
        </HomeLayer>
    );
};

export default Upcoming;
