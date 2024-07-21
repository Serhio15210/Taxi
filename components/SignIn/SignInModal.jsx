import React, {useEffect,useState} from 'react';
import CloseIcon from "@mui/icons-material/Close";
import styles from "./SignInModal.module.sass";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {useRouter} from "next/router";
import {useTaxiContext} from "../../pages/_app";


const SignInModal = ({open,setOpen}) => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const [errorEmail,setErrorEmail]=useState(false)
    const [errorPassword,setErrorPassword]=useState(false)
    const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const [errorLogin,setErrorLogin]=useState('')
    const [showPassword,setShowPassword]=useState(false)
    const router=useRouter()
    const {login}=useTaxiContext()
    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)

    }, [])
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const customStyles = {
        overlay: {
            zIndex: 14,
            background: 'rgba(0,0,0,.5)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            width:'100%',
            height:'100%',
            padding:windowInnerWidth>500?"65px 40px":20,
            background: windowInnerWidth>500?'rgba(36, 48, 79, 0.8)':'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',



        },
    };
    const loginUser=async () => {
        const res = await login(email, password)

        if (res?.status==='Success'){
            setErrorPassword(false)
            setErrorEmail(false)
            setErrorLogin('')
            router.push('/home')
        }else {
            setErrorLogin(res.text)
        }

    }
    return (
        <Modal isOpen={open}
               onRequestClose={() => setOpen(prev => false)}
               style={customStyles}
               ariaHideApp={false}  >
            <CloseIcon style={{position:'absolute',top:20,right:20,color:windowInnerWidth>500?'white':'#566488',fontSize:38,cursor:'pointer'}} onClick={()=>setOpen(false)}/>
            <div className={styles.signContainer}>
                <p className={styles.title}>Sign in</p>
                <div className={styles.loginBlock}>
                    <img src={'/polygonUp.svg'} style={{position:'absolute',top:-10}}/>
                    {errorLogin&&<p style={{color:'red',fontSize:20}}>{errorLogin}</p>}
                    <div style={{position:'relative',width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
                        <TextField error={errorEmail} id="outlined-basic" label="Email*" variant="outlined" style={{width:'100%' }} value={email} onChange={(e)=>setEmail(e.target.value)}  />
                        {errorEmail&&<img src="/error.svg" style={{position:'absolute',right:10,top:20}}/>}
                        {errorEmail&&<p style={{alignSelf:'flex-end',color:'red'}}>Required</p>}
                    </div>

                    <FormControl   variant="outlined" error={errorPassword} style={{width:'100%',marginBottom:windowInnerWidth>500?45:0}}>
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

                    <div className={styles.loginButton} onClick={()=>{
                        email?setErrorEmail(false):setErrorEmail(true)
                        password?setErrorPassword(false):setErrorPassword(true)
                        if (email&&password){
                            loginUser()

                        }
                    }}>
                        <p>LOGIN</p>
                        <ArrowRightAltIcon style={{color:'white'}}/>
                    </div>
                </div>
                <p className={styles.forgotPassword}>Forgot your password?</p>
            </div>

        </Modal>
    );
};

export default SignInModal;
