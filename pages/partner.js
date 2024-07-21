import React, {useEffect, useState} from 'react';
import Layer from "../components/Layer";
import styles from '../styles/BecomeOurPartner.module.sass'
import TextField from "@mui/material/TextField";
import {Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CheckEmailModal from "../components/CheckEmail/CheckEmailModal";
import SignInModal from "../components/SignIn/SignInModal";
import {useTaxiContext} from "./_app";
import {loadToken} from "../utils/storage";
import {useRouter} from "next/router";
import { NextResponse, NextRequest } from 'next/server'
const BecomeOurPartner = () => {
    const [errorEmail,setErrorEmail]=useState(false)
    const [render,setRender]=useState(false)
    const [errorPhone,setErrorPhone]=useState(false)
    const [errorName,setErrorName]=useState(false)
    const [errorPassword,setErrorPassword]=useState(false)
    const [errorRetryPassword,setErrorRetryPassword]=useState(false)
    const [addNumber,setAddNumber]=useState(false)
    const [language,setLanguage]=useState('')
    const [country,setCountry]=useState('')
    const [showPassword,setShowPassword]=useState(false)
    const [showRetryPassword,setShowRetryPassword]=useState(false)
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const [windowInnerHeight, setWindowInnerHeight] = useState('');
    const [email,setEmail]=useState('')
    const [phone,setPhone]=useState('')
    const [name,setName]=useState('')
    const [companyName,setCompanyName]=useState('')
    const [companyRegisterNumber,setCompanyRegisterNumber]=useState('')
    const [companyRegisterAddress,setCompanyRegisterAddress]=useState('')
    const [companyVatNumber,setCompanyVatNumber]=useState('')
    const [companyCity,setCompanyCity]=useState('')
    const [companyZipCode,setCompanyZipCode]=useState('')
    const [password,setPassword]=useState('')
    const [retryPassword,setRetryPassword]=useState('')
    const [errorRegister,setErrorRegister]=useState('')
    const {checkEmail,setCheckEmail,signIn,setSignIn,checkMe,verifyEmail,register}=useTaxiContext()
    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };
const router=useRouter()
    const handleClickShowPassword = () => {
       setShowPassword(!showPassword)
    };
    const handleClickShowRetryPassword = () => {
        setShowRetryPassword(!showRetryPassword)
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    useEffect( () => {
        const token = loadToken()
         checkMe(token).then(res=>{
             if (res.data?.isAccepted) {
                 setRender(false)
                 router.push('/home')
             }else setRender(true)
         })

    }, []);

    const registerUser=async () => {
        if (validateEmail(email)) {
            // const aboutCompany = {
            //     companyName: companyName,
            //     registerNumber: companyRegisterNumber,
            //     vatNumber: companyVatNumber,
            //     registerAddress: companyRegisterAddress,
            //     country: country,
            //     city: companyCity,
            //     zipCode: companyZipCode
            // }
            // const basicInfo = {
            //     name: name,
            //     email: email,
            //     vatNumber: companyVatNumber,
            //     password: password,
            //     phone: phone,
            //     language: language,
            //
            // }
            const token = await register({
                companyName: companyName,
                registerNumber: companyRegisterNumber,
                vatNumber: companyVatNumber,
                registerAddress: companyRegisterAddress,
                country: country,
                city: companyCity,
                zipCode: companyZipCode
            }, {
                name: name,
                email: email,
                vatNumber: companyVatNumber,
                password: password,
                phone: phone,
                language: language,

            })

            if(token.status==='Success'&&token.data){
                setErrorRegister('')
                const check=await checkMe(token.data)

                if(check.status==='Success'&&!check.data?.isAccepted){
                        setCheckEmail(true)
                        verifyEmail(token.data)
                      }else if(check.status==='Success'&&check.data?.isAccepted){
                        setCheckEmail(false)
                        setSignIn(true)
                      }
            }else if(token.status==='Error'){
                setErrorRegister(token.text)
            }
        }
    }
    return (
        <Layer partner={true} >
            {checkEmail&&<CheckEmailModal open={checkEmail} setOpen={setCheckEmail} />}
            {signIn&&<SignInModal open={signIn} setOpen={setSignIn} />}
            <div className={styles.wrapper}>
            <div className={styles.container}  >
                <div className={styles.formContainer}>
                    <div className={styles.formBlock} style={{borderBottom:'1px solid rgba(0, 0, 0, 0.1)',paddingBottom:60}}>
                        <div className={styles.formTitle}>
                            <div className={styles.formNumber}>
                                <p>1</p>
                            </div>
                            <p>Your basic information</p>
                        </div>
                        <div className={styles.inputsBlock}>
                            <div style={{position:'relative',width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
                            <TextField id="outlined-basic" error={errorName} label="Full name*" variant="outlined" style={{width:'100%' }} value={name} onChange={(e)=>setName(e.target.value)} />
                                {errorName&&<img src="/error.svg" style={{position:'absolute',right:10,top:20}}/>}
                                {errorName&&<p style={{alignSelf:'flex-end',color:'red'}}>Required</p>}
                            </div>
                            <div style={{position:'relative',width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
                                <TextField error={errorEmail} id="outlined-basic" label="Email*" variant="outlined" style={{width:'100%' }} value={email} onChange={(e)=>setEmail(e.target.value)}  />
                                {errorEmail&&<img src="/error.svg" style={{position:'absolute',right:10,top:20}}/>}
                                {errorEmail&&<p style={{alignSelf:'flex-end',color:'red'}}>Required</p>}
                            </div>
                            <FormControl   variant="outlined" error={errorPassword}>
                                <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password} onChange={(e)=>setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {errorPassword?<img src="/error.svg"  />:showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password*"
                                />
                                {errorPassword&&<p style={{alignSelf:'flex-end',color:'red'}}>Required</p>}
                            </FormControl>
                            <FormControl   variant="outlined"  error={errorRetryPassword}>
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password*</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showRetryPassword ? 'text' : 'password'}

                                    value={retryPassword} onChange={(e)=>setRetryPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowRetryPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {errorRetryPassword?<img src="/error.svg"  />:showRetryPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password*"
                                />
                                {errorRetryPassword&&<p style={{alignSelf:'flex-end',color:'red'}}>{retryPassword&&retryPassword!==password?"Passwords dont match":"Required"}</p>}
                            </FormControl>
                            <div id='white' style={{position:'relative',width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
                                <PhoneInput
                                    country={'fr'}
                                    specialLabel='Phone number*'
                                    inputStyle={{width:'100%',borderColor:errorPhone?'red':'rgba(0, 0, 0, 0.3)'}}
                                    containerStyle={{color:errorPhone?'red':'rgba(0, 0, 0, 0.6)'}}
                                    value={phone}
                                    onChange={(e)=>setPhone(e)}
                                />
                                {errorPhone&&<img src="/error.svg" style={{position:'absolute',right:10,top:20}}/>}
                                {errorPhone&&<p style={{alignSelf:'flex-end',color:'red'}}>Required</p>}
                            </div>

                            <Box sx={{ width:'100%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Languages spoken</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={language}
                                        label="Languages spoken"
                                        onChange={(e)=>setLanguage(e.target.value)}>
                                        <MenuItem value={'uk'}>Українська</MenuItem>
                                        <MenuItem value={'rus'}>Русский</MenuItem>
                                        <MenuItem value={'en'}>English</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className={styles.formBlock}  >
                        <div className={styles.formTitle}>
                            <div className={styles.formNumber}>
                                <p>2</p>
                            </div>
                            <p>Information about the company</p>
                        </div>
                        <div className={styles.inputsBlock}>
                            <TextField id="outlined-basic" label="Company name" variant="outlined" onChange={(e)=>setCompanyName(e.target.value)}/>
                            <TextField id="outlined-basic" label="Company registration number" variant="outlined" onChange={(e)=>setCompanyRegisterNumber(e.target.value)}/>
                            <TextField id="outlined-basic" label="VAT number" variant="outlined" onChange={(e)=>setCompanyVatNumber(e.target.value)}/>
                            <TextField id="outlined-basic" label="Company registration address" variant="outlined" onChange={(e)=>setCompanyRegisterAddress(e.target.value)}/>

                            <Box sx={{ width:'100%' }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={country}
                                        label="Country"
                                        onChange={(e)=>setCountry(e.target.value)}>
                                        <MenuItem value={'Ukraine'}>Украина</MenuItem>
                                        <MenuItem value={'Poland'}>Польша</MenuItem>
                                        <MenuItem value={'England'}>England</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField id="outlined-basic" label="City" variant="outlined" onChange={(e)=>setCompanyCity(e.target.value)}/>
                            <TextField id="outlined-basic" label="Zip Code" variant="outlined" onChange={(e)=>setCompanyZipCode(e.target.value)}/>
                        </div>
                    </div>

                    <div className={styles.submitBlock}>
                        <p>By clicking “Submit” you accept our <a style={{color:'#4E7FF1',cursor:'pointer'}}>Terms and Conditions and Privacy policy.</a></p>
                        {errorRegister&&<p style={{color:'red',fontSize:20}}>{errorRegister}</p>}
                        <div className={styles.submitButton} onClick={  () => {
                            // await fetch("http://localhost:3001/send", {
                            //     method: "POST",
                            //     mode: 'no-cors',
                            //     headers: {"Content-Type": "application/json"},
                            //
                            // })
                            //     .then(response => (response.json())).then(json => (console.log(json)))
                            !email ? setErrorEmail(true) : setErrorEmail(false)
                            !phone ? setErrorPhone(true) : setErrorPhone(false)
                            !name ? setErrorName(true) : setErrorName(false)
                            !password ? setErrorPassword(true) : setErrorPassword(false)
                            password !== retryPassword || !retryPassword ? setErrorRetryPassword(true) : setErrorRetryPassword(false)

                            if (email && phone && name && password && password === retryPassword) {
                                setErrorName(false)
                                setErrorRetryPassword(false)
                                setErrorPassword(false)
                                setErrorPhone(false)
                                setErrorEmail(false)
                                registerUser()
                            }

                        }}>
                            <p>SUBMIT</p>
                            <ArrowRightAltIcon style={{color:'white'}}/>
                        </div>
                    </div>
                    <div className={styles.loginHideBlock}>
                        <p>Already a partner?</p>
                        <div className={styles.loginHideButton} onClick={()=>setSignIn(true)}>
                            <p>LOGIN</p>
                            <img src={"/lock.svg"}/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </Layer>
    );
};

export default BecomeOurPartner;
