import React, {useEffect, useState} from 'react';
import headerStyles from "./Layer/Header/Header.module.sass";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Switch from "react-switch";
import Link from "next/link";
import {useRouter} from "next/router";
import {useTaxiContext} from "../pages/_app";
import styles from "../styles/Admin.module.sass";
import Select from "react-select";
import CalendarModal from "./Calendar/CalendarModal";


const RouteHeader = ({openCalendar, setOpenCalendar}) => {
    const {from, setFrom,to,setTo,bookingDate,bookingTime,setBookingDate,setBookingTime,returnTrip,setReturnTrip,getUserTransferSelect,returnDate,setReturnDate,setReturnTime,returnTime}=useTaxiContext()

    const router=useRouter()
    const [date, setDate] = useState(new Date());
    const [rotate, setRotate] = useState(false);
    const [openReturnCalendar, setOpenReturnCalendar] = useState(false);
    const [calendarDate, setCalendarDate] = useState('')
    const [calendarReturnDate, setCalendarReturnDate] = useState('')
    const [selectList, setSelectList] = useState({from:[],to:[]})
    const changeHandlerFrom = value => {
        setFrom(value)
    }
    const changeHandlerTo = value => {
        setTo(value)
    }
    const rotateDestination=()=>{
        setRotate(!rotate)
    }

    useEffect(()=>{
        getUserTransferSelect().then(res => {
            let from=[]
            let to=[]
            res?.from?.map(item => from.push({value: item, label: item}))
            res?.to?.map(item => to.push({value: item, label: item}))
            setSelectList({
                from: from,
                to: to
            })

        })
    },[])

    useEffect(()=>{

        from&&localStorage.setItem('from',from?.value)
        to&&localStorage.setItem('to',to?.value)
        bookingTime&&localStorage.setItem('bookingTime',bookingTime)
        bookingDate&&localStorage.setItem('bookingDate',bookingDate)
        localStorage.setItem('returnTrip',returnTrip)
        if (returnTrip){
            returnTime&&localStorage.setItem('returnTime',returnTime)
            returnDate&&localStorage.setItem('returnDate',returnDate)
        }else {
            localStorage.removeItem('returnTime')
            localStorage.removeItem('returnDate')
        }

    },[from,to,bookingDate,bookingTime,returnTime,returnDate,returnTrip])
    useEffect(()=>{
        calendarDate&&setBookingDate(calendarDate.toLocaleDateString('en-CA'))
    },[calendarDate])

    useEffect(()=>{
        calendarReturnDate&&setReturnDate(calendarReturnDate.toLocaleDateString('en-CA'))
    },[calendarReturnDate])
    return (
        <div className={headerStyles.routeRelative}>
            {openCalendar &&
              <CalendarModal open={openCalendar} setOpen={setOpenCalendar} date={calendarDate} setDate={setCalendarDate}/>}
            {openReturnCalendar &&
              <CalendarModal open={openReturnCalendar} setOpen={setOpenReturnCalendar} date={calendarReturnDate} setDate={setCalendarReturnDate}/>}
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div className={headerStyles.trapezoid}
                     style={{borderBottomColor: '#3868D9', color: 'white'}}
                     >
                    <p>From A-to-B</p>
                </div>
                {/*<div className={headerStyles.trapezoid}*/}
                {/*     style={{borderBottomColor: !from ? "white" : '#3868D9',}} onClick={() => setFrom(false)}>*/}
                {/*    <p style={{*/}
                {/*        margin: 'auto',*/}
                {/*        position: 'relative',*/}
                {/*        top: 17,*/}
                {/*        zIndex: 6,*/}
                {/*        color: !from ? "black" : 'white'*/}
                {/*    }}>Hourly ride</p>*/}
                {/*</div>*/}
            </div>
            <div className={headerStyles.route}>
                <div className={headerStyles.routeBlock}>

                    {rotate?<><div className={headerStyles.routeInput}>
                        <img src="/marker.svg" width={15} height={20}/>
                        <Select options={selectList?.from}  className={'inputBooking'} value={from} placeholder='From' onChange={changeHandlerFrom}
                        />
                    </div>
                    <img src="/routeArrows.svg" width={15} height={20} onClick={rotateDestination}/>
                    <div className={headerStyles.routeInput}>
                        <img src="/marker.svg" width={15} height={20}/>
                        <Select options={selectList?.to}  className={'inputBooking'} value={to} placeholder='To' onChange={changeHandlerTo}/>
                    </div>
                    </>:
                    <>
                        <div className={headerStyles.routeInput}>
                            <img src="/marker.svg" width={15} height={20}/>
                            <Select options={selectList?.to}  className={'inputBooking'} value={to} placeholder='To' onChange={changeHandlerTo}/>
                        </div>
                        <img src="/routeArrows.svg" width={15} height={20} onClick={rotateDestination}/>
                        <div className={headerStyles.routeInput}>
                            <img src="/marker.svg" width={15} height={20}/>
                            <Select options={selectList?.from}  className={'inputBooking'} value={from} placeholder='From' onChange={changeHandlerFrom}
                            />
                        </div>
                    </>}
                    <div className={headerStyles.dateRow}>
                        <div className={headerStyles.routeInput}
                             style={{gap: 20, width: '100', justifyContent: 'space-between'}}
                             onClick={() => setOpenCalendar(true)}>

                            <p style={{
                                fontSize: 14,
                                color: '#566488',
                                width: 100
                            }}>{bookingDate}</p>
                            <img src="/calendar.svg"/>
                        </div>
                        <div className={headerStyles.routeInput} style={{position:'relative',width:135 }}>
                            {/*<img src="/clock.svg" style={{position:'absolute',right:10}}/>*/}
                            <AccessTimeIcon style={{position:'absolute',right:10,backgroundColor:'#EFF4FE',color:'#566488'}}/>
                            <input placeholder="To" type="time" value={bookingTime} onChange={(e)=>setBookingTime(e.target.value)}/>
                        </div>
                    </div>
                    <div className={headerStyles.switchRow}>
                        <div className={headerStyles.switchBlock}>
                            <Switch checked={returnTrip} checkedIcon={false} uncheckedIcon={false}
                                    onChange={() => setReturnTrip(!returnTrip)} offColor='#E3EBFD'
                                    onColor='#2DD792' height={25} width={50} boxShadow='none'/>
                            <p style={{color: '#566488', fontSize: 16}}>Return Trip</p>
                        </div>
                        <button className={'buttonNext'} onClick={  () => {
                            router.push('/book-transfer')
                            // fetch("http://localhost:3001/send", {
                            //     method: "POST",
                            //     mode: 'no-cors',
                            //     headers: {"Content-Type": "application/json"},
                            //
                            // })
                            //     .then(response => (response.json())).then(json => (console.log(json)))
                        }}>
                            Next
                        </button>
                    </div>
                </div>
                <div className={headerStyles.dateHide}>
                    <div className={headerStyles.switchOutside}  >
                        <Switch checked={returnTrip} checkedIcon={false} uncheckedIcon={false}
                                onChange={() => setReturnTrip(!returnTrip)} offColor='#E3EBFD' onColor='#2DD792'
                                height={25} width={50} boxShadow='none'/>
                        <p style={{color: '#566488', fontSize: 16}}>Return Trip</p>
                    </div>
                    {returnTrip&&<div className={headerStyles.dateRow}>
                        <div className={headerStyles.routeInput}
                             style={{gap: 20, width: '100', justifyContent: 'space-between'}}
                             onClick={() => setOpenReturnCalendar(true)}>
                            <p style={{
                                fontSize: 14,
                                color: '#566488',
                                width: 100
                            }}>{returnDate}</p>
                            <img src="/calendar.svg"/>
                        </div>
                        <div className={headerStyles.routeInput} style={{position:'relative',width:135}}>
                            {/*<img src="/clock.svg" style={{position:'absolute',right:10}}/>*/}
                            <AccessTimeIcon style={{position:'absolute',right:10,backgroundColor:'#EFF4FE',color:'#566488'}}/>
                            <input placeholder="To" type="time" value={returnTime} onChange={(e)=>setReturnTime(e.target.value)}/>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default RouteHeader;
