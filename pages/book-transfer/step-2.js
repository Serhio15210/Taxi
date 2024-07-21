import React, {useEffect, useState} from 'react';
import styles from "../../styles/Step2.module.sass";
import PhoneInput from "react-phone-input-2";
import {Layer} from "../../components/Layer/Layer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useRouter} from "next/router";
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupIcon from "@mui/icons-material/Group";
import 'react-phone-input-2/lib/material.css'
import {useTaxiContext} from "../_app";

const Step2 = () => {
  const router = useRouter()
  const [errorEmail, setErrorEmail] = useState(false)
  const [addNumber, setAddNumber] = useState(false)
  const [windowInnerWidth, setWindowInnerWidth] = useState('');
  const [windowInnerHeight, setWindowInnerHeight] = useState('');

  const {
    passengers,
    setPassengers,
    baggage,
    setBaggage,
    price,
    vehicle,
    setVehicle,
    from,
    to,
    bookingTime,
    bookingDate,
    passengerName,
    setPassengerName,
    passengerEmail,
    setPassengerEmail,
    passengerPhone,
    setPassengerPhone,
    passengerAdditionalPhone,
    setPassengerAdditionalPhone
  } = useTaxiContext()

  useEffect(() => {
    if (window) {
      setWindowInnerWidth(window.screen.width)
      setWindowInnerHeight(window.screen.height)
    }

  }, [])
  useEffect(()=>{
    passengerPhone&&localStorage.setItem('passengerPhone',passengerPhone)
    if (addNumber){
      passengerAdditionalPhone&&localStorage.setItem('passengerAdditionalPhone',passengerAdditionalPhone)
    }else {
      localStorage.removeItem('passengerAdditionalPhone')
    }

    passengerName&&localStorage.setItem('passengerName',passengerName)
    passengerEmail&&localStorage.setItem('passengerEmail',passengerEmail)
  },[passengerName,passengerEmail,passengerPhone,passengerAdditionalPhone,addNumber])
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  return (
    <Layer>
      <div className={styles.wrapper}>

        <div className={'container'} style={{paddingTop: 50, position: "relative", height: '100%'}}>
          <div className={styles.step}>
            <div className={styles.backButton} onClick={() => router.back()}>
              <ArrowBackIcon/>
              <p>Back</p>
            </div>
            <p>Step 2 of 4</p>
          </div>
          <div className={styles.detailsContainer}>
            <div className={styles.detailBlock}>
              <p className={styles.title}>Passenger Details</p>
              <div className={styles.detailInputs}>

                <TextField id="outlined-basic" label="Full name*" variant="outlined" value={passengerName} onChange={(e) => setPassengerName(e.target.value)}/>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}>
                  <TextField error={errorEmail} id="outlined-basic" label="Email*" variant="outlined"
                             style={{width: '100%'}} value={passengerEmail} onChange={(e) => setPassengerEmail(e.target.value)}/>
                  {errorEmail && <img src="/error.svg" style={{position: 'absolute', right: 10, top: 20}}/>}
                  {errorEmail && <p style={{alignSelf: 'flex-end', color: 'red'}}>Required</p>}
                </div>

                <PhoneInput
                  country={'fr'}
                  specialLabel='Phone number*'
                  inputStyle={{width: '100%', backgroundColor: 'transparent', overflow: 'hidden'}}
                  value={passengerPhone} onChange={(e) => setPassengerPhone(e)}
                />
                {!addNumber && <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 12,
                  color: '#4E7FF1',
                  alignItems: 'center',
                  cursor: 'pointer'
                }} onClick={() => setAddNumber(true)}>
                  <AddIcon/>
                  <p style={{borderBottom: '1px dashed #4E7FF1'}}>Additional phone number</p>
                </div>}
                {addNumber && <PhoneInput
                  country={'fr'}
                  specialLabel='Phone number*'
                  inputStyle={{width: '100%'}}
                  value={passengerAdditionalPhone} onChange={(e) => setPassengerAdditionalPhone(e)}
                />}
              </div>
              <div className={styles.nextButton} onClick={() => {
                if (validateEmail(passengerEmail)) {
                  setErrorEmail(false)
                  router.push('/book-transfer/step-3')
                } else {
                  setErrorEmail(true)
                }

              }}>
                <p style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 14}}>NEXT <ArrowForwardIcon/></p>
              </div>
            </div>
            <div className={styles.summaryBlock}>
              <p className={styles.title}>Summary</p>
              <div className={styles.summaryInfo}>
                {bookingDate &&
                  <p>{new Date(bookingDate).getDay()},{new Date(bookingDate).toLocaleString('en', {month: 'short'})}, {bookingTime}</p>}
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15}}>
                  <img src="/summaryRoutes.svg" width={16} height={58}/>
                  <div style={{display: 'flex', gap: 21, flexDirection: 'column'}}>
                    <p>{from.value || from}</p>
                    <p>{to.value || to}</p>
                  </div>
                </div>
                <div className={styles.pricesBlock}>
                  <div className={styles.priceItem}>
                    <div style={{display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                      <img src="/car.svg"/>
                      <p>{vehicle} Class</p>
                    </div>
                    <p>€{price}</p>
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
          </div>
        </div>
      </div>
    </Layer>
  );
};

export default Step2;
