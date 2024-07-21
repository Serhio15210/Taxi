import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import 'react-phone-input-2/lib/material.css'
import AdminLayer from "../../../components/AdminLayer/AdminLayer";
import styles from "../../../styles/Admin.module.sass";
import LogoutIcon from "@mui/icons-material/Logout";
import TextField from "@mui/material/TextField";
import Switch from "react-switch";
import CloseIcon from "@mui/icons-material/Close";
import PhoneInput from "react-phone-input-2";
import {FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SaveIcon from "@mui/icons-material/Save";
import GroupIcon from "@mui/icons-material/Group";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarModal from "../../../components/Calendar/CalendarModal";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {useTaxiContext} from "../../_app";
import headerStyles from "../../../components/Layer/Header/Header.module.sass";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
const AddTransfer = () => {
    const router=useRouter()
    const [active,setActive]=useState(true)
    const [emailError,setEmailError]=useState(false)
    const [priceError,setPriceError]=useState(false)
    const [toError,setToError]=useState(false)
    const [fromError,setFromError]=useState(false)
    const [dateError,setDateError]=useState(false)
    const [timeError,setTimeError]=useState(false)
    const [vehicleError,setVehicleError]=useState(false)
    const [passengers,setPassengers]=useState(1)
    const [baggage,setBaggage]=useState(0)
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openReturnCalendar, setOpenReturnCalendar] = useState(false);
    const [openExtra, setOpenExtra] = useState(false);
    const [passengerEmail,setPassengerEmail]=useState('')
    const [passengerName,setPassengerName]=useState('')
    const [passengerPhone,setPassengerPhone]=useState('')
    const [bookingDate, setBookingDate] = useState('')
    const [calendarDate, setCalendarDate] = useState('')
    const [calendarReturnDate, setCalendarReturnDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [bookingTime, setBookingTime] = useState('')
    const [returnTime, setReturnTime] = useState('')
    const [returnTrip, setReturnTrip] = useState(false)
    const [classPrice, setClassPrice] = useState('')
    const [commentText, setCommentText] = useState('')
    const [flightNumber, setFlightNumber] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [price, setPrice] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [returnFrom, setReturnFrom] = useState('')
    const [returnTo, setReturnTo] = useState('')
    const{getUserTransferSelect} =useTaxiContext()
    const [selectList, setSelectList] = useState({from:[],to:[]})
    useEffect(()=>{
        getUserTransferSelect().then(res => {
            // let from=[]
            // let to=[]
            // res?.from?.map(item => from.push({value: item, label: item}))
            // res?.to?.map(item => to.push({value: item, label: item}))
            setSelectList({
                from: res?.from,
                to: res?.to
            })

        })
    },[])
    const changeHandlerFrom = value => {
        setFrom(value.target.value)
    }
    const changeHandlerTo = value => {
        setTo(value.target.value)
    }
    const axios = useAxios()
    const makeBooking=()=>{
        if (bookingTime&&bookingDate&&passengerEmail&&to&&from&&price&&vehicle) {
            axios.post('/user/makeBooking', {
                Passengers: passengers,
                Suitcases: baggage,
                TypeCar: vehicle,
                BookInfo: {
                    From: from.value || from,
                    To: to.value || to,
                    bookingDate: bookingDate,
                    bookingTime: bookingTime,
                    returnTrip: returnTrip,
                    returnTime: returnTime,
                    returnDate: returnDate,
                    Price: price,
                },
                PassengerDetails: {
                    name: passengerName,
                    email: passengerEmail,
                    phone: passengerPhone,
                },
                Personalize: {
                    flightNumber: flightNumber,
                    comment: commentText
                }
            }).then(res => {
                if (res?.data?.status === 'Success') {
                    Swal.fire(
                      {
                          title: `Transfer Added`,
                          confirmButtonColor: 'rgba(83, 233, 80, 1)',
                          icon: "success",
                          background: 'white'
                      })
                    setBaggage(0)
                    setPassengers(1)
                    setBookingDate('')
                    setBookingTime('')
                    setFrom('')
                    setTo('')
                    setReturnTime('')
                    setReturnDate('')
                    setReturnTrip(false)
                    setReturnFrom('')
                    setReturnTo('')
                    setCommentText('')

                    setFlightNumber('')
                    setPassengerName('')
                    setPassengerEmail('')
                    setPassengerPhone('')

                    setPrice('')
                    setVehicle('')
                    setDateError(false)
                    setTimeError(false)
                    setPriceError(false)
                    setFromError(false)
                    setToError(false)
                    setVehicleError(false)
                    setEmailError(false)

                }
            })
        }else {
            !bookingDate&&setDateError(true)
            !bookingTime&&setTimeError(true)
            !from&&setFromError(true)
            !to&&setToError(true)
            !price&&setPriceError(true)
            !passengerEmail&&setEmailError(true)
            !vehicle&&setVehicleError(true)
        }

    }
    useEffect(()=>{
        calendarDate&&setBookingDate(calendarDate.toLocaleDateString('en-CA'))
    },[calendarDate])

    useEffect(()=>{
        calendarReturnDate&&setReturnDate(calendarReturnDate.toLocaleDateString('en-CA'))
    },[calendarReturnDate])
    return (
        <AdminLayer>
            {openCalendar &&
                <CalendarModal open={openCalendar} setOpen={setOpenCalendar} date={calendarDate} setDate={setCalendarDate}/>}
            {openReturnCalendar &&
              <CalendarModal open={openReturnCalendar} setOpen={setOpenReturnCalendar} date={calendarReturnDate} setDate={setCalendarReturnDate}/>}
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 20, flexDirection: 'row'}}>
                        <div className={styles.headerImg}>
                            <img src={'/transfers.svg'}/>
                        </div>
                        <p className={styles.headerTitle}>Transfers</p>
                    </div>

                    <div className={styles.exitBlock} onClick={()=>router.back()}>
                        <p>Exit</p>
                        <LogoutIcon style={{color: '#A3AEC9'}}/>
                    </div>
                </div>
                <div className={styles.addCompanyContainer}>
                    <p className={styles.title}>+ Add New Transfer</p>

                    <div>
                        <div className={styles.rowContainer} style={{gap:15,marginBottom:25}}>
                            <div className={styles.stepCircle}>
                                <p>1</p>
                            </div>
                            <p className={styles.stepTitle}>Client Information</p>
                        </div>
                        <div className={styles.addCompanyRow}>
                            <TextField id="outlined-basic" label="Full name" variant="outlined" className={styles.addInput} onChange={(e)=>setPassengerName(e.target.value)}/>

                            <div id='white' style={{width:'100%'}}>
                                <PhoneInput
                                    country={'fr'}
                                    style={{ color:'#A3AEC9'}}
                                    specialLabel='Phone number*'
                                    inputStyle={{width:'100%',backgroundColor:'transparent',overflow: 'hidden'}}
                                    onChange={(e)=>setPassengerPhone(e)}
                                />
                            </div>
                            <TextField id="outlined-basic" error={emailError} label="E-mail" variant="outlined" className={styles.addInput} onChange={(e)=>setPassengerEmail(e.target.value)}/>
                        </div>
                        <div className={styles.vehicleDetailsRow}>
                            <div className={styles.rowContainer} style={{gap:35}}>
                            <div className={styles.passengerRow}>
                                <GroupIcon style={{color: '#A3AEC9'}}/>
                                <p>Passengers</p>
                            </div>
                            <div className={styles.passengerCount}>
                                <div className={styles.countButton}
                                     onClick={() => passengers > 1 && setPassengers(passengers - 1)}>
                                    <RemoveIcon style={{fontSize: 15}}/>
                                </div>
                                <p>{passengers}</p>
                                <div className={styles.countButton} style={{backgroundColor: passengers<6?'#4E7FF1':'grey'}}
                                     onClick={() => passengers<6&&setPassengers(passengers + 1)}>
                                    <AddIcon style={{fontSize: 15, color: 'white'}}/>
                                </div>
                            </div>
                            </div>
                            <div className={styles.rowContainer} style={{gap:35}}>
                            <div className={styles.passengerRow}>
                                <img src="/suitcase.svg"/>
                                <p>Suitcases</p>
                            </div>
                            <div className={styles.passengerCount}>
                                <div className={styles.countButton}
                                     onClick={() => baggage > 0 && setBaggage(baggage - 1)}>
                                    <RemoveIcon style={{fontSize: 15}}/>
                                </div>
                                <p>{baggage}</p>
                                <div className={styles.countButton} style={{backgroundColor: baggage<6?'#4E7FF1':'grey'}}
                                     onClick={() => baggage<6&&setBaggage(baggage + 1)}>
                                    <AddIcon style={{fontSize: 15, color: 'white'}}/>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={styles.rowContainer} style={{gap:15,marginBottom:25}}>
                            <div className={styles.stepCircle}>
                                <p>2</p>
                            </div>
                            <p className={styles.stepTitle}>About the Transfer</p>
                        </div>
                        <div className={styles.addCompanyRow} style={{gridTemplateColumns:'1fr 1fr'}}>
                            <FormControl sx={{ width:'100%' }} variant="outlined" onClick={()=>setOpenCalendar(true)}>
                                {/*<InputLabel htmlFor="outlined-adornment-password">Business VAN</InputLabel>*/}
                                <OutlinedInput
                                    id="outlined-adornment-password"

                                    defaultValue={bookingDate}
                                    value={bookingDate}
                                    error={dateError}
                                    startAdornment={<InputAdornment position="start"><CalendarTodayIcon/></InputAdornment>}
                                />
                            </FormControl>
                            <div className={styles.routeInput} style={{position:'relative',borderColor:timeError?'red':'#CDD4E9'  }} id='timeWhite'>
                                {/*<img src="/clock.svg" style={{position:'absolute',right:10}}/>*/}
                                <AccessTimeIcon style={{position:'absolute',right:10,color:'#566488'}}/>
                                <input placeholder="To" type="time" style={{ color:timeError?'red':'#A3AEC9'}} value={bookingTime} onChange={(e)=>setBookingTime(e.target.value)}/>
                            </div>
                            <FormControl sx={{ width:'100%' }} variant="outlined"  >
                                <InputLabel  >Pickup Adress</InputLabel>

                                <Select  value={from} placeholder='From' error={fromError} onChange={changeHandlerFrom}

                                         startAdornment={<InputAdornment position="start"><LocationOnOutlinedIcon/></InputAdornment>}
                                >
                                    {selectList?.from.map((item,index)=>{
                                          return (<MenuItem value={item} key={index}>{item}</MenuItem>
                                          )
                                      }
                                    )}

                                </Select>
                            </FormControl>
                            <FormControl sx={{ width:'100%' }} variant="outlined"  >
                                <InputLabel  >Pickup Adress</InputLabel>

                                <Select  value={to} placeholder='To' error={toError} onChange={changeHandlerTo}

                                         startAdornment={<InputAdornment position="start"><LocationOnOutlinedIcon/></InputAdornment>}
                                >
                                    {selectList.to.map((item,index)=>{
                                          return (<MenuItem value={item} key={index}>{item}</MenuItem>
                                          )
                                      }
                                    )}

                                </Select>
                            </FormControl>


                        </div>
                        <div className={styles.rowContainer} style={{gap:10,marginTop:25}}>

                            <Switch checked={returnTrip} checkedIcon={false} uncheckedIcon={false}
                                    onChange={() => setReturnTrip(!returnTrip)} offColor='#E3EBFD'
                                    onColor='#4E7FF1' height={25} width={50} boxShadow='none'/>
                            <p style={{color:'#566488'}}>Return Trip</p>

                        </div>
                        {returnTrip&&<div className={styles.addCompanyRow} style={{gridTemplateColumns:'1fr 1fr',marginTop:25}}>
                            <FormControl sx={{ width:'100%' }} variant="outlined" onClick={()=>setOpenReturnCalendar(true)}>
                                {/*<InputLabel htmlFor="outlined-adornment-password">Business VAN</InputLabel>*/}
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    disabled
                                    defaultValue={returnDate}
                                    value={returnDate}
                                    startAdornment={<InputAdornment position="start"><CalendarTodayIcon/></InputAdornment>}
                                />
                            </FormControl>
                            <div className={styles.routeInput} style={{position:'relative'  }} id='timeWhite'>
                                {/*<img src="/clock.svg" style={{position:'absolute',right:10}}/>*/}
                                <AccessTimeIcon style={{position:'absolute',right:10,color:'#566488'}}/>
                                <input placeholder="To" type="time" style={{ color:'#A3AEC9'}} value={returnTime} onChange={(e)=>setReturnTime(e.target.value)}/>
                            </div>
                            <FormControl sx={{ width:'100%' }} variant="outlined"  >
                                <InputLabel  >Pickup Adress</InputLabel>

                                <Select  value={from} placeholder='From' onChange={(e)=>setReturnFrom(e.target.value)}

                                         startAdornment={<InputAdornment position="start"><LocationOnOutlinedIcon/></InputAdornment>}
                                >
                                    {selectList?.from.map((item,index)=>{
                                          return (<MenuItem value={item} key={index}>{item}</MenuItem>
                                          )
                                      }
                                    )}

                                </Select>
                            </FormControl>
                            <FormControl sx={{ width:'100%' }} variant="outlined"  >
                                <InputLabel  >Pickup Adress</InputLabel>

                                <Select  value={to} placeholder='To' onChange={(e)=>setReturnTo(e.target.value)}

                                         startAdornment={<InputAdornment position="start"><LocationOnOutlinedIcon/></InputAdornment>}
                                >
                                    {selectList.to.map((item,index)=>{
                                          return (<MenuItem value={item} key={index}>{item}</MenuItem>
                                          )
                                      }
                                    )}

                                </Select>
                            </FormControl>
                        </div>}
                    </div>
                    <div>
                        <div className={styles.rowContainer} style={{gap:15,marginBottom:25}}>
                            <div className={styles.stepCircle}>
                                <p>3</p>
                            </div>
                            <p className={styles.stepTitle}>Extra Services</p>
                            <div style={{border: '1px solid rgba(0, 0, 0, 0.1)',borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',color:'#AEB2BE',width:40,height:40}} onClick={()=>setOpenExtra(!openExtra)}>
                                {openExtra?<KeyboardArrowUpIcon/>:<KeyboardArrowDownIcon/>}
                            </div>
                        </div>
                        {openExtra&&<div className={styles.addCompanyRow} style={{gridTemplateColumns:'1fr 1fr'}}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Message"
                                multiline
                                maxRows={6}
                                className={styles.addInput}
                                value={commentText}
                                onChange={(e)=>setCommentText(e.target.value)}
                            />
                            <TextField id="outlined-basic" label="Fligh Number" variant="outlined" className={styles.addInput} value={flightNumber} onChange={(e)=>setFlightNumber(e.target.value)}/>
                            <FormControl fullWidth  >
                                <InputLabel id="demo-simple-select-label"  >Car class</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    error={vehicleError}
                                    label="Car class"
                                    style={{ color:'#A3AEC9'}}
                                    onChange={(e)=>setVehicle(e.target.value)}
                                >
                                    <MenuItem value={'Economy'}>Economy</MenuItem>
                                    <MenuItem value={'Economy+'}>Economy+</MenuItem>
                                    <MenuItem value={'Business'}>Business</MenuItem>
                                    <MenuItem value={'VIP'}>VIP</MenuItem>
                                    <MenuItem value={'VAN'}>VAN</MenuItem>
                                    <MenuItem value={'Business van'}>Business van</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Price" error={priceError} variant="outlined" className={styles.addInput} value={price} onChange={(e)=>setPrice(e.target.value)}/>
                        </div>}
                    </div>
                    <div className={styles.addTransferButtonRow}>
                        <div className={styles.exitBlock} onClick={()=>router.back()}>
                            <KeyboardArrowLeftIcon  />
                            <p>Cancel</p>
                        </div>
                        <div className={styles.saveButton} onClick={()=>makeBooking()} style={{marginTop:0}} >
                            <SaveIcon/>
                            <p>Save</p>
                        </div>
                </div>
                </div>

            </div>
        </AdminLayer>
    );
};

export default AddTransfer;
