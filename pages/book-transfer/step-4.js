import React, {useState} from 'react';
import styles from "../../styles/Step2.module.sass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Layer} from "../../components/Layer/Layer";
import {useRouter} from "next/router";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {useTaxiContext} from "../_app";
import {loadToken, saveToken} from "../../utils/storage";

const Step4 = () => {
  const router = useRouter()
  const {

    setPassengerName,

    setPassengerEmail,

    setPassengerPhone,

    setPassengerAdditionalPhone,
    price,
    setPrice,
    classPrice,

    vehicle,
    setVehicle,
    passengers,
    setPassengers,
    baggage,
    setBaggage,

    setSign,

    setChild,

    setBottle,

    setStop,

    setTime,

    setComment
    , setFlightNumber,

    setChildCount,

    setBottleCount,
    extraServices,
    setExtraServices,
    setCommentText,setStopText,

    from, setFrom,
    to,setTo,
    bookingDate,setBookingDate,
    bookingTime,setBookingTime,
    setReturnTrip,
    setReturnTime,
    setReturnDate,
    payBook,
    makeBooking,
  } = useTaxiContext()
  const [openExtra, setOpenExtra] = useState(false)


  return (
    <Layer>
      <div className={styles.wrapper}>

        <div className={'container'}
             style={{paddingTop: 50, position: "relative", alignItems: 'center', justifyContent: 'center'}}>
          <div className={styles.step}>
            <div className={styles.backButton} onClick={() => router.back()}>
              <ArrowBackIcon/>
              <p>Back</p>
            </div>
            <p>Step 4 of 4</p>
          </div>
          <div className={styles.step4SummaryContainer}>
            <p className={styles.summaryTitle}>Summary</p>
            <div className={styles.summaryInfoBlock}>
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
                  <p>€{classPrice}</p>
                </div>
                {extraServices?.length !== 0 && <div className={styles.priceItem}>
                  <div
                    style={{display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'flex-start', width: '100%'}}>
                    <img src="/extraServices.svg"/>
                    <div style={{width: '100%'}}>
                      <p style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                         onClick={() => setOpenExtra(!openExtra)}>Extra services {openExtra ? <KeyboardArrowUpIcon/> :
                        <KeyboardArrowDownIcon/>}</p>
                      {openExtra &&
                        <div className={styles.extraInfo}>
                          {extraServices?.map((item, index) => {
                            return (
                              <div className={styles.extraItem} key={index}>
                                <span>{item.name} {item.count ? `x${item.count}` : ''}</span>
                                <span>€{item.price}</span>
                              </div>
                            )
                          })
                          }
                        </div>
                      }
                    </div>

                  </div>
                  <p>{extraServices?.length}</p>
                </div>}
                <div className={styles.priceItem}>
                  <div style={{display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                    <img src="/group.svg"/>
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
              <div className={styles.result}>
                <p>Total</p>
                <p style={{color: '#4E7FF1'}}>€{price}</p>
              </div>
            </div>
            <div className={styles.nextButton} style={{maxWidth: 660, width: '100%'}} onClick={() => {
              makeBooking().then(res=>{
                if (res?.status==='Success'){
                  payBook(res?._id).then(pay=>{
                    if (pay?.status==='Success') {
                      let token = loadToken()
                      if (token) {
                        localStorage.clear()
                        saveToken(token)
                      } else {
                        localStorage.clear()
                      }
                      setBottle(false)
                      setChild(false)
                      setBottleCount(1)
                      setBaggage(0)
                      setPassengers(1)
                      setExtraServices([])
                      setChildCount(1)
                      setBookingDate('')
                      setBookingTime('')
                      setFrom('')
                      setTo('')
                      setReturnTime('')
                      setReturnDate('')
                      setReturnTrip(false)
                      setStop(false)
                      setStopText('')
                      setTime(false)
                      setComment(false)
                      setCommentText('')
                      setSign(false)
                      setFlightNumber('')
                      setPassengerName('')
                      setPassengerEmail('')
                      setPassengerPhone('')
                      setPassengerAdditionalPhone('')
                      setPrice('')
                      setVehicle('')
                      router.push('/')
                    }
                  })

                }
              })

            }}>
              <p style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14
              }}>PAYMENT<AccountBalanceWalletIcon/></p>
            </div>
            <p style={{alignSelf: 'flex-start', color: '#566488', marginBottom: 100}}>By clicking `Payment` or `Request`
              you agree with <a style={{color: '#4E7FF1', textDecoration: 'underline'}}>Terms & Conditions</a>. </p>
          </div>

        </div>
      </div>
    </Layer>
  );
};

export default Step4;
