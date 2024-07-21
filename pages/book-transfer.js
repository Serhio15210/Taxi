import React, {useEffect, useState} from 'react';
import {Layer} from "../components/Layer/Layer";
import styles from "../styles/BookTransfer.module.sass"
import GroupIcon from '@mui/icons-material/Group';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VehicleMobile from "../components/VehicleMobile";
import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/material.css'
import Link from "next/link";
import {useRouter} from "next/router";
import {useTaxiContext} from "./_app";

const BookTransfer = () => {
  const {
    passengers,
    setPassengers,
    baggage,
    setBaggage,
    price,
    setPrice,
    vehicle,
    setVehicle,
    classPrice,
    setClassPrice,
    from,
    to,
    bookingTime,
    bookingDate
  } = useTaxiContext()

  const [windowInnerWidth, setWindowInnerWidth] = useState('');
  const router = useRouter()
  const [selectVehicle, setSelectVehicle] = useState({
    name: '',
    passengers: 1,
    baggage: 0,
    price: 0,
    img: ''
  })
  useEffect(() => {
    if (window) setWindowInnerWidth(window.screen.width)

  }, [])


  const vehicles = [
    {
      name: 'Economy',
      passengers: 4,
      baggage: 3,
      price: 85.00,
      img: '/economy.svg'
    },
    {
      name: 'Economy +',
      passengers: 4,
      baggage: 4,
      price: 120.00,
      img: '/economy+.svg'
    },
    {
      name: 'Business',
      passengers: 3,
      baggage: 2,
      price: 120.00,
      img: '/business.svg'
    },
    {
      name: 'VIP',
      passengers: 3,
      baggage: 2,
      price: 187.00,
      img: '/vip.svg'
    },
    {
      name: 'Van',
      passengers: 6,
      baggage: 6,
      price: 101.00,
      img: '/van.svg'
    },
    {
      name: 'Business Van',
      passengers: 6,
      baggage: 6,
      price: 125.00,
      img: '/businessVan.svg'
    }
  ]
  useEffect(()=>{
    setSelectVehicle(vehicles.filter(item=>item.name===vehicle)[0])
    classPrice&&localStorage.setItem('classPrice',classPrice)
    price&&localStorage.setItem('price',price)
  },[classPrice,price])
  return (
    <Layer>
      <div className={styles.wrapper}>

        <div className={'container'} style={{paddingTop: 50}}>
          <p className={styles.step}>Step 1 of 4</p>
          {windowInnerWidth > 500 ? <div className={styles.vehicleClass}>
              <div className={styles.vehicleBlock}>
                <p className={styles.title}>Vehicle Class</p>
                <div className={styles.vehicleDetailsRow}>
                  <div className={styles.passengerRow}>
                    <GroupIcon style={{color: '#A3AEC9'}}/>
                    <p>Passengers</p>
                  </div>
                  <div className={styles.passengerCount}>
                    <div className={styles.countButton}
                         onClick={() => {
                          if(passengers > 1) {
                            localStorage.setItem('passengers',passengers-1)
                            setPassengers(passengers - 1)
                          }
                         }}>
                      <RemoveIcon style={{fontSize: 15}}/>
                    </div>
                    <p>{passengers}</p>
                    <div className={styles.countButton} style={{backgroundColor: passengers < 6 ? '#4E7FF1' : 'grey'}}
                         onClick={() => {
                           if(passengers < 6) {
                             localStorage.setItem('passengers',passengers+1)
                             setPassengers(passengers + 1)}
                         }}>
                      <AddIcon style={{fontSize: 15, color: 'white'}}/>
                    </div>
                  </div>
                  <div className={styles.passengerRow}>
                    <img src="/suitcase.svg"/>
                    <p>Suitcases</p>
                  </div>
                  <div className={styles.passengerCount}>
                    <div className={styles.countButton}
                         onClick={() => {
                           if (baggage > 0){
                             localStorage.setItem('baggage',baggage-1)
                             setBaggage(baggage - 1)
                           }
                         }}>
                      <RemoveIcon style={{fontSize: 15}}/>
                    </div>
                    <p>{baggage}</p>
                    <div className={styles.countButton} style={{backgroundColor: baggage < 6 ? '#4E7FF1' : 'grey'}}
                         onClick={() => {
                           if(baggage < 6){
                             localStorage.setItem('baggage',baggage+1)
                             setBaggage(baggage + 1)

                           }
                         }}>
                      <AddIcon style={{fontSize: 15, color: 'white'}}/>
                    </div>
                  </div>
                </div>
                <div className={styles.vehiclesColumn}>
                  {vehicles.map((item, index) => {
                    return (
                      <div className={styles.vehicleItem} style={{position: 'relative'}} key={index} onClick={() => {
                        if (item.passengers >= passengers && item.baggage >= baggage) {
                          setSelectVehicle(item)
                          setPrice(item.price)
                          setVehicle(item.name)
                          setClassPrice(item.price)
                          localStorage.setItem('vehicle',item.name)
                          // setPassengers(1)
                          // setBaggage(0)
                        }

                      }}>
                        <div style={{
                          backgroundColor: baggage > item.baggage || passengers > item.passengers ? 'rgba(0,0,0,.5)' : 'transparent',
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          zIndex: 5,
                          left: 0,
                          borderRadius: 10
                        }}/>

                        <div className={styles.itemFirstRow}>
                          <div className={styles.radio}>
                            {vehicle === item.name &&
                              <div style={{backgroundColor: '#4E7FF1', width: 13, height: 13, borderRadius: 10}}/>}
                          </div>
                          <img src={item.img} className={styles.vehicleImg}/>
                          <div className={styles.vehicleInfo}>
                            <p className={styles.itemName}>{item.name}</p>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16}}>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                color: '#566488',
                                fontSize: 14,
                                gap: 7
                              }}>
                                <GroupIcon style={{color: '#A3AEC9'}}/>
                                <p>{item.passengers}</p>
                              </div>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                color: '#566488',
                                fontSize: 14,
                                gap: 7
                              }}>
                                <img src="/suitcase.svg"/>
                                <p>{item.baggage}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className={styles.itemPrice}>€{parseFloat(item.price)}</p>
                      </div>
                    )
                  })}
                </div>
                <div className={styles.nextButton} style={{
                  backgroundColor: selectVehicle?.name ? '#2DD792' : 'grey',
                  cursor: selectVehicle?.name ? 'pointer' : 'default'
                }} onClick={() => selectVehicle?.name && router.push('/book-transfer/step-2')}>
                  <p style={{display: 'flex', alignItems: 'center', gap: 10}}>NEXT <ArrowForwardIcon/></p>
                </div>
              </div>
              <div className={styles.summaryBlock}>
                <p className={styles.title}>Summary</p>
                <div className={styles.summaryInfo}>
                  <p>{new Date(bookingDate).getDate()},{new Date(bookingDate).toLocaleString('en', { month: 'short' })}, {bookingTime}</p>
                  <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15}}>
                    <img src="/summaryRoutes.svg" width={16} height={58}/>
                    <div style={{display: 'flex', gap: 21, flexDirection: 'column'}}>
                      <p>{from?.value || from}</p>
                      <p>{to?.value || to}</p>
                    </div>
                  </div>
                  <div className={styles.pricesBlock}>
                    <div className={styles.priceItem}>
                      <div style={{display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                        <img src="/car.svg"/>
                        <p>{vehicle} Class</p>
                      </div>
                      <p>{selectVehicle?.price}</p>
                    </div>
                    <div className={styles.priceItem}>
                      <div style={{display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                        <GroupIcon/>
                        <p>Passengers</p>
                      </div>
                      <p>{passengers}</p>
                    </div>
                    <div className={styles.priceItem}>
                      <div style={{display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                        <img src="/suitcase.svg"/>
                        <p>Suitcases</p>
                      </div>
                      <p>{baggage}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.result}>
                  <p>Total</p>
                  <p style={{color: '#4E7FF1'}}>€{price}</p>
                </div>
              </div>
            </div> :
            <VehicleMobile/>
          }

        </div>
      </div>
    </Layer>
  );
};

export default BookTransfer;
