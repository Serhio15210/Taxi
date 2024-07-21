import React, {useEffect, useState} from 'react';
import styles from "../../styles/Step2.module.sass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useRouter} from "next/router";
import {Layer} from "../../components/Layer/Layer";
import Switch from "react-switch";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useTaxiContext} from "../_app";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Step3 = () => {
    const router = useRouter()
    const [openExtra, setOpenExtra] = useState(false)
    const {
        vehicle,
        setVehicle,
        sign,
        setSign,
        child,
        setChild,
        bottle,
        setBottle,
        stop,
        setStop,
        time,
        setTime,
        comment,
        setComment
        ,flightNumber, setFlightNumber,
        childCount,
        setChildCount,
        bottleCount,
        setBottleCount,
        extraServices,
        setExtraServices,
        setPrice,
        price,
        passengers,
        baggage,
        classPrice,setClassPrice,bookingDate,from,to,bookingTime,commentText,setCommentText,stopText,setStopText
    } = useTaxiContext()

    const checkExtraTime = () => {
        return extraServices.filter(item => item.name === 'Extra waiting time').length !== 0
    }
    const checkExtraStop = () => {
        return extraServices.filter(item => item.name === 'Extra stop').length !== 0
    }
    const checkBottle = () => {
        return extraServices.filter(item => item.name === 'A bottle of water').length !== 0
    }
    const checkChild = () => {
        return extraServices.filter(item => item.name === 'A child seat').length !== 0
    }
    useEffect(() => {
        !sign||!child||!bottle||!stop||!time||!comment&&setOpenExtra(false)
    }, [sign, child, bottle, stop, time, comment])
    useEffect(() => {
        setExtraServices(extraServices.map(item=>item.name==='A bottle of water'?{...item,count:bottleCount,price:2*bottleCount}:item))

    }, [bottleCount])
    useEffect(() => {
        setExtraServices(extraServices.map(item=>item.name==='A child seat'?{...item,count:childCount,price:3*childCount}:item))

    }, [childCount])
    // useEffect(()=>{
    //
    //
    //     if (comment){
    //         localStorage.setItem('commentText',commentText)
    //     }else {
    //         localStorage.removeItem('commentText')
    //     }
    //     if (stop){
    //         localStorage.setItem('stopText',stopText)
    //     }else {
    //         localStorage.removeItem('stopText')
    //     }
    //
    //     if (time){
    //         localStorage.setItem('sign',time)
    //     }else {
    //         localStorage.removeItem('time')
    //     }
    // },[stop,time,comment,commentText,stopText,sign,child,bottle])

    const saveData=()=>{
        localStorage.setItem('sign',sign)
        localStorage.setItem('child',child)
        localStorage.setItem('bottle',bottle)
        child&&localStorage.setItem('childCount',childCount)
        localStorage.setItem('flightNumber',flightNumber)
        bottle&&localStorage.setItem('bottleCount',bottleCount)
        stop&&localStorage.setItem('stopText',stopText)
         localStorage.setItem('time',time)
         localStorage.setItem('price',price)
         comment&&localStorage.setItem('commentText',commentText)
        router.push('/book-transfer/step-4')
    }

    return (
        <Layer>
            <div className={styles.wrapper}>

                <div className={'container'} style={{paddingTop: 50, position: "relative"}}>
                    <div className={styles.step}>
                        <div className={styles.backButton} onClick={() => router.back()}>
                            <ArrowBackIcon/>
                            <p>Back</p>
                        </div>
                        <p>Step 3 of 4</p>
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.detailBlock}>
                            <p className={styles.title}>Personalize your Transfer</p>
                            <div>
                                <p style={{color: '#566488'}}>Flight number according to the airline ticket*</p>
                                <input className={styles.step3Input} placeholder="E.g. DL9530" style={{marginTop: 13}} value={flightNumber} onChange={(e)=>setFlightNumber(e.target.value)}/>

                            </div>
                            <div className={styles.personColumn}>
                                <div className={styles.personalizeItem}>
                                    <div className={styles.personFirstRow}>
                                        <img src="/document.svg"/>
                                        <div className={styles.personText}>
                                            <p>Meet me with a sign</p>
                                            <span>Free meet-and-greet service</span>
                                        </div>
                                    </div>
                                    <Switch checked={sign} checkedIcon={false} uncheckedIcon={false}
                                            onChange={() => {


                                                setSign(!sign)
                                            }} offColor='#E3EBFD' onColor='#4E7FF1'
                                            height={25} width={46} boxShadow='none'/>
                                </div>
                                <div className={styles.personalizeItem}>
                                    <div className={styles.personFirstRow}>
                                        <img src="/child.svg"/>
                                        <div className={styles.personText}>
                                            <p>I require a child seat</p>
                                            <span>For an extra fee - 3.00€ per unit</span>
                                            {child && <div className={styles.passengerCount}>
                                                <div className={styles.countButton}
                                                     onClick={() => {
                                                         if (childCount > 1){

                                                             setChildCount(childCount - 1)
                                                             setPrice(price-3)
                                                         }

                                                     }}>
                                                    <RemoveIcon style={{fontSize: 15}}/>
                                                </div>
                                                <p>{childCount}</p>
                                                <div className={styles.countButton} style={{backgroundColor: '#4E7FF1'}}
                                                     onClick={() => {

                                                         setChildCount(childCount + 1)
                                                         setPrice(price+3)
                                                     }}>
                                                    <AddIcon style={{fontSize: 15, color: 'white'}}/>
                                                </div>
                                            </div>}
                                        </div>

                                    </div>
                                    <Switch checked={child} checkedIcon={false} uncheckedIcon={false}
                                            onChange={() => {

                                                setChild(!child)
                                                if (!checkChild()) {
                                                    setExtraServices([...extraServices, {
                                                        name: 'A child seat',
                                                        price: 3 * childCount,
                                                        count: childCount
                                                    }])
                                                    setPrice(price + 3 * childCount)
                                                } else {
                                                    setExtraServices(extraServices.filter(item => item.name !== 'A child seat'))
                                                    setPrice(price - 3 * childCount)
                                                    // setChildCount(1)
                                                }

                                            }} offColor='#E3EBFD' onColor='#4E7FF1'
                                            height={25} width={46} boxShadow='none'/>
                                </div>
                                <div className={styles.personalizeItem}>
                                    <div className={styles.personFirstRow}>
                                        <img src="/bottle.svg"/>
                                        <div className={styles.personText}>
                                            <p>A bottle of water</p>
                                            <span>2.00€ per unit, 500ml</span>
                                            {bottle && <div className={styles.passengerCount}>
                                                <div className={styles.countButton}
                                                     onClick={() => {
                                                         if (bottleCount > 1){

                                                             setBottleCount(bottleCount - 1)
                                                             setPrice(price-2)
                                                         }

                                                     }}>
                                                    <RemoveIcon style={{fontSize: 15}}/>
                                                </div>
                                                <p>{bottleCount}</p>
                                                <div className={styles.countButton} style={{backgroundColor: '#4E7FF1'}}
                                                     onClick={() => {

                                                         setBottleCount(bottleCount + 1)
                                                         setPrice(price+2)
                                                     }}>
                                                    <AddIcon style={{fontSize: 15, color: 'white'}}/>
                                                </div>
                                            </div>}
                                        </div>

                                    </div>
                                    <Switch checked={bottle} checkedIcon={false} uncheckedIcon={false}
                                            onChange={() => {


                                                setBottle(!bottle)
                                                if (!checkBottle()) {
                                                    setExtraServices([...extraServices, {
                                                        name: 'A bottle of water',
                                                        price: 2 * bottleCount,
                                                        count: bottleCount
                                                    }])
                                                    setPrice(price + 2 * bottleCount)
                                                } else {
                                                    setExtraServices(extraServices.filter(item => item.name !== 'A bottle of water'))
                                                    setPrice(price - 2 * bottleCount)
                                                    // setBottleCount(1)
                                                }

                                            }} offColor='#E3EBFD' onColor='#4E7FF1'
                                            height={25} width={46} boxShadow='none'/>
                                </div>
                                <div className={styles.personalizeItem} style={{flexDirection: 'column'}}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div className={styles.personFirstRow}>
                                            <img src="/extraStop.svg"/>
                                            <div className={styles.personText} style={{maxWidth: 500, width: '100%'}}>
                                                <p>Extra stop</p>
                                                <span>An additional fee is 15.00€</span>

                                            </div>

                                        </div>
                                        <Switch checked={stop} checkedIcon={false} uncheckedIcon={false}
                                                onChange={() => {
                                                    setStop(!stop)
                                                    if (!checkExtraStop()) {
                                                        setExtraServices([...extraServices, {
                                                            name: 'Extra stop',
                                                            price: 15
                                                        }])
                                                        setPrice(price + 15)
                                                    } else {
                                                        setExtraServices(extraServices.filter(item => item.name !== 'Extra stop'))
                                                        setPrice(price - 15)
                                                    }

                                                }} offColor='#E3EBFD' onColor='#4E7FF1'
                                                height={25} width={46} boxShadow='none'/>
                                    </div>
                                    {stop && <input className={styles.step3Input} style={{
                                        maxWidth: 500,
                                        width: '100%',
                                        marginTop: 10,
                                        alignSelf: 'center'
                                    }} placeholder="Type your address here (the same town)" value={stopText} onChange={(e)=>setStopText(e.target.value)}/>}

                                </div>
                                <div className={styles.personalizeItem}>
                                    <div className={styles.personFirstRow}>
                                        <img src="/extraTime.svg"/>
                                        <div className={styles.personText}>
                                            <p>Extra waiting time</p>
                                            <span>Instead of 1 hour the drivers wait 2 hours at the airport, an additional fee of 30.00€ applies</span>

                                        </div>

                                    </div>
                                    <Switch checked={time} checkedIcon={false} uncheckedIcon={false}
                                            onChange={() => {
                                                setTime(!time)
                                                if (!checkExtraTime()) {
                                                    setExtraServices([...extraServices, {
                                                        name: 'Extra waiting time',
                                                        price: 30
                                                    }])
                                                    setPrice(price + 30)
                                                } else {
                                                    setExtraServices(extraServices.filter(item => item.name !== 'Extra waiting time'))
                                                    setPrice(price - 30)

                                                }


                                            }} offColor='#E3EBFD' onColor='#4E7FF1'
                                            height={25} width={46} boxShadow='none'/>
                                </div>
                                <div className={styles.personalizeItem} style={{flexDirection: 'column'}}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <div className={styles.personFirstRow}>
                                            <img src="/comment.svg"/>
                                            <div className={styles.personText} style={{maxWidth: 500, width: '100%'}}>
                                                <p>Comment for driver</p>


                                            </div>

                                        </div>
                                        <Switch checked={comment} checkedIcon={false} uncheckedIcon={false}
                                                onChange={() => setComment(!comment)} offColor='#E3EBFD'
                                                onColor='#4E7FF1'
                                                height={25} width={46} boxShadow='none'/>
                                    </div>
                                    {comment && <textarea className={styles.step3Input} style={{
                                        maxWidth: 500,
                                        width: '100%',
                                        marginTop: 10,
                                        alignSelf: 'center'
                                    }} placeholder="Type your comment" value={commentText} onChange={(e)=>setCommentText(e.target.value)}/>}

                                </div>
                            </div>
                            <div className={styles.nextButton} onClick={() => {
                                 saveData()
                            }}>
                                <p style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    fontSize: 14
                                }}>NEXT <ArrowForwardIcon/></p>
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
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 20,
                                            alignItems: 'center'
                                        }}>
                                            <img src="/car.svg"/>
                                            <p>{vehicle} Class</p>
                                        </div>
                                        <p>€{classPrice}</p>
                                    </div>
                                    {extraServices?.length !== 0 && <div className={styles.priceItem}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 20,
                                            alignItems: 'flex-start',
                                            width: '100%'
                                        }}>
                                            <img src="/extraServices.svg"/>
                                            <div style={{width: '100%'}}>
                                                <p style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                                                   onClick={() => setOpenExtra(!openExtra)}>Extra services {openExtra ?
                                                    <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}</p>
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
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 20,
                                            alignItems: 'center'
                                        }}>
                                            <GroupIcon/>
                                            <p>Passengers</p>
                                        </div>
                                        <p>{passengers}</p>
                                    </div>
                                    <div className={styles.priceItem}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: 20,
                                            alignItems: 'center'
                                        }}>
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

export default Step3;
