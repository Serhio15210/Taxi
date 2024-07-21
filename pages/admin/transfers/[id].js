import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

import AdminLayer from "../../../components/AdminLayer/AdminLayer";
import CalendarModal from "../../../components/Calendar/CalendarModal";
import styles from "../../../styles/Admin.module.sass";
import LogoutIcon from "@mui/icons-material/Logout";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-input-2";
import GroupIcon from "@mui/icons-material/Group";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Switch from "react-switch";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SaveIcon from "@mui/icons-material/Save";
import {useTaxiContext} from "../../_app";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";


const EditTransfer = () => {

    const router=useRouter()
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
        ,
        childCount,
        setChildCount,
        bottleCount,
        setBottleCount,
        extraServices,
        setExtraServices,
        setPrice,
        price,

        classPrice,setClassPrice
    } = useTaxiContext()
    const [passengers,setPassengers]=useState(1)
    const [baggage,setBaggage]=useState(0)
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openExtra, setOpenExtra] = useState(false);
    const [date, setDate] = useState(new Date());
    const [returnTrip,setReturnTrip]=useState(false)
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
    return (
        <AdminLayer>
            {openCalendar &&
                <CalendarModal open={openCalendar} setOpen={setOpenCalendar} date={date} setDate={setDate}/>}
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
                    <p className={styles.title}>Edit Transfer №{router.query.id}</p>

                    <div>
                        <div className={styles.rowContainer} style={{gap:15,marginBottom:25}}>
                            <div className={styles.stepCircle}>
                                <p>1</p>
                            </div>
                            <p className={styles.stepTitle}>Client Information</p>
                        </div>
                        <div className={styles.addCompanyRow}>
                            <TextField id="outlined-basic" label="Full name" variant="outlined" className={styles.addInput}/>

                            <div id='white' style={{width:'100%'}}>
                                <PhoneInput
                                    country={'fr'}
                                    style={{ color:'#A3AEC9'}}
                                    specialLabel='Phone number*'
                                    inputStyle={{width:'100%',backgroundColor:'transparent',overflow: 'hidden'}}
                                />
                            </div>
                            <TextField id="outlined-basic" label="E-mail" variant="outlined" className={styles.addInput} />
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
                                    disabled
                                    defaultValue={`${date.toISOString().substr(0, 10)}`}
                                    value={`${date.toISOString().substr(0, 10)}`}
                                    startAdornment={<InputAdornment position="start"><CalendarTodayIcon/></InputAdornment>}
                                />
                            </FormControl>
                            <div className={styles.routeInput} style={{position:'relative'  }} id='timeWhite'>
                                {/*<img src="/clock.svg" style={{position:'absolute',right:10}}/>*/}
                                <AccessTimeIcon style={{position:'absolute',right:10,color:'#566488'}}/>
                                <input placeholder="To" type="time" style={{ color:'#A3AEC9'}}/>
                            </div>
                            <FormControl sx={{ width:'100%' }} variant="outlined"  >
                                <InputLabel htmlFor="outlined-adornment-password">Pickup Adress</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    style={{ color:'#A3AEC9'}}
                                    label='Pickup Adress'
                                    startAdornment={<InputAdornment position="start"><LocationOnOutlinedIcon/></InputAdornment>}
                                />
                            </FormControl>
                            <FormControl sx={{ width:'100%' }} variant="outlined"  >
                                <InputLabel htmlFor="outlined-adornment-password">Drop off Adress</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    style={{ color:'#A3AEC9'}}
                                    label='Drop off Adress'
                                    startAdornment={<InputAdornment position="start"><LocationOnOutlinedIcon/></InputAdornment>}
                                />
                            </FormControl>
                        </div>
                        <div className={styles.rowContainer} style={{gap:10,marginTop:25}}>

                            <Switch checked={returnTrip} checkedIcon={false} uncheckedIcon={false}
                                    onChange={() => setReturnTrip(!returnTrip)} offColor='#E3EBFD'
                                    onColor='#4E7FF1' height={25} width={50} boxShadow='none'/>
                            <p style={{color:'#566488'}}>Return Trip</p>
                        </div>
                        {returnTrip&&<div className={styles.addCompanyRow} style={{gridTemplateColumns:'1fr 1fr',marginTop:25}}>
                            <FormControl sx={{ width:'100%' }} variant="outlined" onClick={()=>setOpenCalendar(true)}>
                                {/*<InputLabel htmlFor="outlined-adornment-password">Business VAN</InputLabel>*/}
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    disabled
                                    defaultValue={`${date.toISOString().substr(0, 10)}`}
                                    value={`${date.toISOString().substr(0, 10)}`}
                                    startAdornment={<InputAdornment position="start"><CalendarTodayIcon/></InputAdornment>}
                                />
                            </FormControl>
                            <div className={styles.routeInput} style={{position:'relative'  }} id='timeWhite'>
                                {/*<img src="/clock.svg" style={{position:'absolute',right:10}}/>*/}
                                <AccessTimeIcon style={{position:'absolute',right:10,color:'#566488'}}/>
                                <input placeholder="To" type="time" style={{ color:'#A3AEC9'}}/>
                            </div>
                            <FormControl sx={{ width:'100%' }} variant="outlined"  >
                                <InputLabel htmlFor="outlined-adornment-password">Pickup Adress</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    style={{ color:'#A3AEC9'}}
                                    label='Pickup Adress'
                                    startAdornment={<InputAdornment position="start"><LocationOnOutlinedIcon/></InputAdornment>}
                                />
                            </FormControl>
                            <FormControl sx={{ width:'100%' }} variant="outlined"  >
                                <InputLabel htmlFor="outlined-adornment-password">Drop off Adress</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    style={{ color:'#A3AEC9'}}
                                    label='Drop off Adress'
                                    startAdornment={<InputAdornment position="start"><LocationOnOutlinedIcon/></InputAdornment>}
                                />
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
                        {openExtra&&
                           <> <div className={styles.personColumn}>
                                <div className={styles.personalizeItem}>
                                    <div className={styles.personFirstRow}  >
                                        <img src="/document.svg"/>
                                        <div className={styles.personText} style={{width:'100%'}}>
                                            <p>Meet me with a sign</p>
                                            <span>Free meet-and-greet service</span>
                                            {sign&&<TextField id="outlined-basic" label="Airport Sign" variant="outlined" className={styles.addInput}/>}
                                        </div>

                                    </div>
                                    <Switch checked={sign} checkedIcon={false} uncheckedIcon={false}
                                            onChange={() => setSign(!sign)} offColor='#E3EBFD' onColor='#4E7FF1'
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
                                                    setChildCount(1)
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
                                                    setBottleCount(1)
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
                                    }} placeholder="Type your address here (the same town)"/>}

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

                            </div>
                            <div className={styles.addCompanyRow} style={{gridTemplateColumns:'1fr 1fr'}}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Message"
                                multiline
                                maxRows={6}
                                className={styles.addInput}

                            />
                            <TextField id="outlined-basic" label="Fligh Number" variant="outlined" className={styles.addInput}/>
                            <FormControl fullWidth  >
                                <InputLabel id="demo-simple-select-label"  >Car class</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"

                                    label="Car class"
                                    style={{ color:'#A3AEC9'}}

                                >
                                    <MenuItem value={'Economy'}>Economy</MenuItem>
                                    <MenuItem value={'Economy+'}>Economy+</MenuItem>
                                    <MenuItem value={'Business'}>Business</MenuItem>
                                    <MenuItem value={'VIP'}>VIP</MenuItem>
                                    <MenuItem value={'VAN'}>VAN</MenuItem>
                                    <MenuItem value={'Business van'}>Business van</MenuItem>

                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Price" variant="outlined" className={styles.addInput}/>
                        </div></> }
                    </div>
                    <div className={styles.addTransferButtonRow}>

                        <div className={styles.saveButton} onClick={()=>router.back()} style={{marginTop:0}} >
                            <SaveIcon/>
                            <p>Save</p>
                        </div>
                        <div className={styles.saveButton} style={{background: '#F35046',
                            boxShadow: '0px 10px 40px rgba(243, 80, 70, 0.22)',color:'white',marginTop:0}}  >
                            <DeleteOutlineOutlinedIcon  />
                            <p style={{color:'white'}}>Delete</p>
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayer>
    );
};

    export default EditTransfer;
