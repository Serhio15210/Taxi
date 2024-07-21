import React, {useEffect, useState} from 'react';
import styles from "../../styles/Driver.module.sass";
import HomeLayer from "../../components/HomeLayer/HomeLayer";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {useRouter} from "next/router";
import {useTaxiContext} from "../_app";
import Swal from "sweetalert2";
const AddNewVehicle = () => {
    const [errorModel,setErrorModel]=useState(false)
    const [vehicleClass,setVehicleClass]=useState('')
    const [brandModal,setBrandModal]=useState('')
    const [year,setYear]=useState('')
    const [color,setColor]=useState('')
    const [license,setLicense]=useState('')
    const [carte, setCarte] = useState({})
    const [carteFile, setCarteFile] = useState({})
    const [insurance, setInsurance] = useState({})
    const [insuranceFile, setInsuranceFile] = useState({})
    const [errorClass, setErrorClass] = useState('')
    const [errorYear, setErrorYear] = useState(false)
    const [errorColor, setErrorColor] = useState(false)
    const [errorLicense, setErrorLicense] = useState(false)
    const [errorCarte, setErrorCarte] = useState(false)
    const [errorInsurance, setErrorInsurance] = useState(false)

    const {addVehicle}=useTaxiContext()
    const router=useRouter()
    const addNewVehicle=()=>{
        addVehicle({vehicleClass,brandModal,year,color,license,carte,insurance}).then(res=>{
            if(res.data?.status==='Success'){
                Swal.fire(
                  {
                      title: `Vehicle added!`,
                      confirmButtonColor: 'rgba(83, 233, 80, 1)',
                      icon:"success"
                  })
                setCarte({})
                setCarteFile({})
                setInsuranceFile({})
                setInsurance({})
                setBrandModal('')
                setVehicleClass('')
                setYear('')
                setLicense('')
                setColor('')
            }

        })
    }

    const setNewInsurance=(e)=>{
        e.preventDefault()
        setInsuranceFile(URL.createObjectURL(e.target.files[0]))
        setInsurance(e.target.files[0])

    }
    const setNewCarte=(e)=>{
        e.preventDefault()
        setCarteFile(URL.createObjectURL(e.target.files[0]))
        setCarte(e.target.files[0])

    }

    return (
        <HomeLayer>
            <div className={styles.container}>
                <div className={styles.headerRow} style={{gap:40}}>
                    <div className={styles.backButton} onClick={()=>router.back()}>
                        <KeyboardBackspaceIcon style={{color:'#8B97B7'}}/>
                        <p>Back</p>
                    </div>
                    <p className={styles.title}>New vehicle details</p>
                </div>
                <div className={styles.newVehicleContainer}>
                    <div className={styles.vehicleInputs}>
                    <Box sx={{ width:'100%',zIndex:0 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{fontSize:14}}>Choose vehicle class</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={vehicleClass}
                                onChange={(e)=>setVehicleClass(e.target.value)}
                                label="Choose vehicle class"
                                error={errorClass}
                                 >
                                <MenuItem value={'economy'}>Economy</MenuItem>
                                <MenuItem value={'economy+'}>Economy+</MenuItem>
                                <MenuItem value={'business'}>Business</MenuItem>
                                <MenuItem value={'vip'}>VIP</MenuItem>
                                <MenuItem value={'van'}>VAN</MenuItem>
                                <MenuItem value={'businessVan'}>Business Van</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                        <TextField id="outlined-basic" error={errorModel} label={<p style={{fontSize:14}}>Brand / Model</p>} variant="outlined" style={{width:'100%',zIndex:0 }} value={brandModal} onChange={(e)=>setBrandModal(e.target.value)}   />

                        <TextField id="outlined-basic" error={errorYear} label={<p style={{fontSize:14}}>Year</p>} variant="outlined" style={{width:'100%',zIndex:0 }}    value={year} onChange={(e)=>setYear(e.target.value)}/>
                        <TextField id="outlined-basic" error={errorColor} label={<p style={{fontSize:14}}>Color</p>} variant="outlined" style={{width:'100%',zIndex:0 }}  value={color} onChange={(e)=>setColor(e.target.value)}  />
                        <TextField id="outlined-basic" error={errorLicense} label={<p style={{fontSize:14}}>License Plate</p>} variant="outlined" style={{width:'100%',zIndex:0 }}   value={license} onChange={(e)=>setLicense(e.target.value)} />
                    </div>
                    <div className={styles.vehicleDocuments}>
                        <p className={styles.title}>Car`s documents</p>
                        <div className={styles.pickRow} style={{gap:15}}>

                                <label htmlFor="file-upload" className={`custom-file-upload ${styles.documentPickItem}`} style={{backgroundColor:carte?.name?'#EFF4FE':'transparent',borderColor:errorCarte&&!carte?.name?'red':'#A3AEC9'}}>
                                    <i className="fa fa-cloud-upload" style={{position:'absolute'}}></i>
                                    {carte?.name&&<div className={styles.rowContainer} style={{gap:15}}>
                                        <InsertDriveFileIcon style={{color:'#566488'}}/>
                                        <p style={{color:'#566488',textDecoration:'underline'}}>{carte?.name}</p>
                                    </div>}
                                <input
                                      id="file-upload" type="file"
                                    style={{display:'none'}}  onChange={(e) => setNewCarte(e)}/>
                                    {!carte?.name&&<AddCircleOutlineOutlinedIcon style={{color:errorCarte?'red':'#566488',fontSize:40}}/>}
                                    <p style={{fontWeight:carte?.name?'700':'400',color:errorCarte&&!carte?.name?'red':'#566488'}}>Carte grise</p>
                                </label>

                            <label htmlFor="file-upload2" className={`custom-file-upload ${styles.documentPickItem}`} style={{backgroundColor:insurance?.name?'#EFF4FE':'transparent',borderColor:errorInsurance&&!insurance?.name?'red':'#A3AEC9'}}>
                                <i className="fa fa-cloud-upload" style={{position:'absolute'}}></i>
                                {insurance?.name&&<div className={styles.rowContainer} style={{gap:15}}>
                                    <InsertDriveFileIcon style={{color:'#566488'}}/>
                                    <p style={{color:'#566488',textDecoration:'underline'}}>{insurance?.name}</p>
                                </div>}
                                <input
                                    id="file-upload2" type="file"
                                    style={{display:'none'}}  onChange={(e)=> setNewInsurance(e)}/>
                                {!insurance?.name&&<AddCircleOutlineOutlinedIcon style={{color:errorInsurance?'red':'#566488',fontSize:40}}/>}
                                <p style={{fontWeight:insurance?.name?'700':'400',color:errorInsurance&&!insurance?.name?'red':'#566488'}}>Insurance</p>
                            </label>

                        </div>
                        <div className={styles.addVehicleButton} style={{width:'48%'}}  onClick={()=>{
                            setErrorClass(!vehicleClass)
                            setErrorColor(!color)
                            setErrorYear(!year)
                            setErrorModel(!brandModal)
                            setErrorLicense(!license)
                            setErrorInsurance(!insurance?.name)
                            setErrorCarte(!carte?.name)
                            vehicleClass&&color&&year&&brandModal&&license&&insurance?.name&&carte?.name&&addNewVehicle()

                        }}>
                            <p>SUBMIT</p>
                            <ArrowRightAltIcon style={{color:'white'}}/>

                        </div>
                    </div>
                </div>

            </div>

        </HomeLayer>
    );
};

export default AddNewVehicle;
