import React, {useState} from 'react';

import {useRouter} from "next/router";
import HomeLayer from "../../components/HomeLayer/HomeLayer";
import styles from "../../styles/Driver.module.sass";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css'
import Swal from "sweetalert2";
import {useTaxiContext} from "../_app";
const AddNewDriver = () => {
    const [errorName,setErrorName]=useState(false)
    const [errorPhone,setErrorPhone]=useState(false)
    const [errorEmail,setErrorEmail]=useState(false)
    const [errorLicense,setErrorLicense]=useState(false)
    const [errorCard,setErrorCard]=useState(false)
    const [fullName,setFullName]=useState('')
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [license, setLicense] = useState({})
    const [proCard, setProCard] = useState({})
    const router=useRouter()
    const {addDriver}=useTaxiContext()
    const addNewDriver=()=>{
        addDriver({fullName,email,phone,license,proCard}).then(res=>{
            if(res.data?.status==='Success'){
                Swal.fire(
                  {
                      title: `Driver added!`,
                      confirmButtonColor: 'rgba(83, 233, 80, 1)',
                      icon:"success"
                  })
                setProCard({})
                setLicense({})
                setFullName('')
                setPhone('')
                setEmail('')
            }

        })
    }
    return (
        <HomeLayer>
            <div className={styles.container}>
                <div className={styles.headerRow} style={{gap:40}}>
                    <div className={styles.backButton} onClick={()=>router.back()}>
                        <KeyboardBackspaceIcon style={{color:'#8B97B7'}}/>
                        <p>Back</p>
                    </div>
                    <p className={styles.title}>New driver details</p>
                </div>
                <div className={styles.newVehicleContainer}>
                    <div className={styles.vehicleInputs}>

                        <TextField id="outlined-basic" error={errorName} label={<p style={{fontSize:14}}>Full name</p>} variant="outlined" style={{width:'100%',zIndex:0 }} value={fullName} onChange={(e)=>setFullName(e.target.value)}   />
                        <TextField id="outlined-basic" error={errorEmail} label={<p style={{fontSize:14}}>Email</p>} variant="outlined" style={{width:'100%',zIndex:0 }}   value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <PhoneInput
                            country={'fr'}
                            specialLabel=''
                            inputStyle={{width:'100%',borderColor:errorPhone&&!phone?'red':'rgba(0, 0, 0, 0.3)'}}
                            containerStyle={{color:'rgba(0, 0, 0, 0.6)'}}
                            value={phone} onChange={(e)=>setPhone(e)}
                        />
                    </div>
                    <div className={styles.vehicleDocuments}>
                        <p className={styles.title}>Car`s documents</p>
                        <div className={styles.pickRow} style={{gap:15}}>
                            <label htmlFor="file-upload" className={`custom-file-upload ${styles.documentPickItem}`} style={{backgroundColor:license?.name?'#EFF4FE':'transparent',borderColor:errorLicense&&!license?.name?'red':'#A3AEC9'}}>
                                <i className="fa fa-cloud-upload" style={{position:'absolute'}}></i>
                                {license?.name&&<div className={styles.rowContainer} style={{gap:15}}>
                                    <InsertDriveFileIcon style={{color:'#566488'}}/>
                                    <p style={{color:'#566488',textDecoration:'underline'}}>{license?.name}</p>
                                </div>}
                                <input
                                    id="file-upload" type="file"
                                    style={{display:'none'}}  onChange={(e) => setLicense(e.target.files[0])}/>
                                {!license?.name&&<AddCircleOutlineOutlinedIcon style={{color:errorLicense?'red':'#566488',fontSize:40}}/>}
                                <p style={{fontWeight:license?.name?'700':'400',color:errorLicense&&!license?.name?'red':'#566488'}}>License</p>
                            </label>

                            <label htmlFor="file-upload2" className={`custom-file-upload ${styles.documentPickItem}`} style={{backgroundColor:proCard?.name?'#EFF4FE':'transparent',borderColor:errorCard&&!proCard?.name?'red':'#A3AEC9'}}>
                                <i className="fa fa-cloud-upload" style={{position:'absolute'}}></i>
                                {proCard?.name&&<div className={styles.rowContainer} style={{gap:15}}>
                                    <InsertDriveFileIcon style={{color:'#566488'}}/>
                                    <p style={{color:'#566488',textDecoration:'underline'}}>{proCard?.name}</p>
                                </div>}
                                <input
                                    id="file-upload2" type="file"
                                    style={{display:'none'}}  onChange={(e) => setProCard(e.target.files[0])}/>
                                {!proCard?.name&&<AddCircleOutlineOutlinedIcon style={{color:errorCard?'red':'#566488',fontSize:40}}/>}
                                <p style={{fontWeight:proCard?.name?'700':'400',color:errorCard&&!proCard?.name?'red':'#566488'}}>Pro Card</p>
                            </label>
                        </div>
                        <div className={styles.addVehicleButton} style={{width:'48%'}} onClick={()=>{
                            setErrorName(!fullName)
                            setErrorPhone(!phone)
                            setErrorEmail(!email)
                            setErrorLicense(!license?.name)
                            setErrorCard(!proCard?.name)
                             fullName&&phone&&email&&license?.name&&proCard?.name&&addNewDriver()
                        }} >
                            <p>SUBMIT</p>
                            <ArrowRightAltIcon style={{color:'white'}}/>

                        </div>
                    </div>
                </div>

            </div>

        </HomeLayer>
    );
};

export default AddNewDriver;
