import React, {useState} from 'react';
import styles from "../styles/BookTransfer.module.sass";
import GroupIcon from "@mui/icons-material/Group";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useRouter} from "next/router";
import {useTaxiContext} from "../pages/_app";


const VehicleMobile = () => {
    const {passengers, setPassengers,baggage, setBaggage,price,setPrice,vehicle,setVehicle,classPrice,setClassPrice} = useTaxiContext()

    const router=useRouter()
    const [selectVehicle,setSelectVehicle]=useState({name: '',
        passengers:1,
        baggage:0,
        price:0,
        img:''})
    const vehicles = [
        {
            name: 'Economy',
            passengers:4,
            baggage:3,
            price:85.00,
            img:'/economy.svg'
        },
        {
            name: 'Economy +',
            passengers:4,
            baggage:4,
            price:120.00,
            img:'/economy+.svg'
        },
        {
            name: 'Business',
            passengers:3,
            baggage:2,
            price:120.00,
            img:'/business.svg'
        },
        {
            name: 'VIP',
            passengers:3,
            baggage:2,
            price:187.00,
            img:'/vip.svg'
        },
        {
            name: 'Van',
            passengers:6,
            baggage:6,
            price:101.00,
            img:'/van.svg'
        },
        {
            name: 'Business Van',
            passengers:6,
            baggage:6,
            price:125.00,
            img:'/businessVan.svg'
        }
    ]
    return (
        <div className={styles.vehicleMobileClass}>
            <p className={styles.title}>Vehicle Class</p>
            <div className={styles.vehicleMobileRow}>
                <div className={styles.passengerMobileRow}>
                    <GroupIcon style={{color: '#A3AEC9'}}/>
                    <p>Passengers</p>
                </div>
                <div className={styles.passengerMobileCount}>
                    <div className={styles.countButton}
                         onClick={() => passengers > 1 && setPassengers(passengers - 1)}>
                        <RemoveIcon style={{fontSize: 15}}/>
                    </div>
                    <p>{passengers}</p>
                    <div className={styles.countButton} style={{backgroundColor:  passengers<6?'#4E7FF1':'grey'}}
                         onClick={() => passengers<6&&setPassengers(passengers + 1)}>
                        <AddIcon style={{fontSize: 15, color: 'white'}}/>
                    </div>
                </div>
            </div>
            <div className={styles.vehicleMobileRow}>
                <div className={styles.passengerMobileRow}>
                    <img src="/suitcase.svg"/>
                    <p>Suitcases</p>
                </div>
                <div className={styles.passengerMobileCount}>
                    <div className={styles.countButton}
                         onClick={() => baggage > 1 && setBaggage(baggage - 1)}>
                        <RemoveIcon style={{fontSize: 15}}/>
                    </div>
                    <p>{baggage}</p>
                    <div className={styles.countButton} style={{backgroundColor:  baggage<6?'#4E7FF1':'grey'}}
                         onClick={() => baggage<6&&setBaggage(baggage + 1)}>
                        <AddIcon style={{fontSize: 15, color: 'white'}}/>
                    </div>
                </div>
            </div>
            <div className={styles.vehiclesMobileColumn}>
                {vehicles.map((item,index)=>{
                    return (
                        <div className={styles.vehicleMobileItem} style={{position:'relative'}} key={index} onClick={()=>{
                            if (item.passengers>=passengers&&item.baggage>=baggage){
                                setSelectVehicle(item)
                                setPrice(item.price)
                                setVehicle(item.name)
                                setClassPrice(item.price)
                                // setPassengers(1)
                                // setBaggage(0)
                            }
                        }}>
                            <div style={{backgroundColor:baggage>item.baggage||passengers>item.passengers?'rgba(0,0,0,.5)':'transparent',position:'absolute',width:'100%',height:'100%',zIndex:5,left:0,borderRadius:10}}/>

                            <div className={styles.firstRow}>
                                <div className={styles.radio} style={{marginRight:0}}>
                                    {selectVehicle.name===item.name&&<div style={{backgroundColor: '#4E7FF1', width: 13, height: 13, borderRadius: 10}}/>}
                                </div>

                                <div className={styles.vehicleMobileInfo}>
                                    <p className={styles.itemName}>{item.name}</p>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:16}}>
                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',color:'#566488' ,gap:7}}>
                                            <img src="/group.svg"/>
                                            <p style={{fontSize:14}}>{item.passengers}</p>
                                        </div>
                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',color:'#566488',fontSize:14,gap:7}}>
                                            <img src="/suitcase.svg"/>
                                            <p style={{fontSize:14}}>{item.baggage}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:3}}>
                                <img src={item.img} className={styles.mobileImg}/>
                                <p className={styles.itemPrice}>{item.price}</p>
                            </div>

                        </div>
                    )
                })}
            </div>
            <div className={styles.nextButton} style={{backgroundColor:selectVehicle.name?'#2DD792':'grey',cursor:selectVehicle.name?'pointer':'default',marginBottom:40}} onClick={()=>selectVehicle.name&&router.push('/book-transfer/step-2')}>
                <p style={{display:'flex',alignItems:'center',gap:10}}>NEXT <ArrowForwardIcon/></p>
            </div>
        </div>
    );
};

export default VehicleMobile;
