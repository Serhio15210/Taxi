import React, {useState} from 'react';
import styles from "../styles/Driver.module.sass";
import HomeLayer from "../components/HomeLayer/HomeLayer";
import OfferItem from "../components/bookingItems/OfferItem";

const Bookings = () => {

    const [selectType,setSelectType]=useState('offers')
    const offers=[{
        time:'8:30 pm',
        date:'July 2, 2022',
        number:'10078158',
        from:'Nice Côte d`Azur Airport (NCE), Rue Costes et Bellonte, 06206 Nice France',
        routeLength:'64 км',
        routeTime:'54 мин',
        to:'Costes et Bellonte',
        vehicleType:'Economy',
        passengers:2,
        baggage:3,
        extra:['I require a child seat','Meet me with a sign'],
        cost:150,
        message:true
    }]
    return (
        <HomeLayer>
            <div className={styles.container}>
                <p className={styles.title}>Bookings</p>
                <div className={styles.bookingNavigation}>
                    <p onClick={()=>setSelectType('offers')} style={{borderColor:selectType==='offers'?'#4E7FF1':'transparent',color:selectType==='offers'?'#4E7FF1':'#566488'}}>offers</p>
                    <p onClick={()=>setSelectType('upcoming')} style={{borderColor:selectType==='upcoming'?'#4E7FF1':'transparent',color:selectType==='upcoming'?'#4E7FF1':'#566488'}}>upcoming</p>
                    <p onClick={()=>setSelectType('payouts')} style={{borderColor:selectType==='payouts'?'#4E7FF1':'transparent',color:selectType==='payouts'?'#4E7FF1':'#566488'}}>payouts</p>
                </div>
                <div className={styles.bookingRowContainer}>
                    {offers.map((item,index)=>{
                        return (
                            <OfferItem item={item} key={index}/>
                        )
                    })}
                </div>
        </div>
        </HomeLayer>
    );
};

export default Bookings;
