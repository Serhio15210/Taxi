import React, {useEffect, useState} from 'react';

import {useTaxiContext} from "../../_app";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import HomeLayer from "../../../components/HomeLayer/HomeLayer";
import styles from "../../../styles/Driver.module.sass";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const EditVehicle = () => {
  const [errorModel,setErrorModel]=useState(false)
  const [vehicleClass,setVehicleClass]=useState('')
  const [brandModal,setBrandModal]=useState('')
  const [year,setYear]=useState('')
  const [color,setColor]=useState('')
  const [license,setLicense]=useState('')
  const [carte, setCarte] = useState({})
  const [cartePhoto, setCartePhoto] = useState('')
  const [insurance, setInsurance] = useState({})
  const [insurancePhoto, setInsurancePhoto] = useState('')
  const {addVehicle,editVehicle,getVehicleById}=useTaxiContext()
  const router=useRouter()
  const {query}=useRouter()
  useEffect(() => {
    getVehicleById(query.id).then(res=>{
      setVehicleClass(res?.data?.data?.Class)
      setBrandModal(res?.data?.data?.BrandModel)
      setColor(res?.data?.data?.Color)
      setYear(res?.data?.data?.Year)
      setLicense(res?.data?.data?.License)
      setCartePhoto(res?.data?.data?.CarteGrise)
      setInsurancePhoto(res?.data?.data?.Insurance)
    })
  }, [query.id]);
  const changeVehicle=()=>{
    editVehicle({vehicleClass,brandModal,year,color,license,vehicleId:query.id}).then(res=>{
      if(res.data?.status==='Success'){
        Swal.fire(
          {
            title: `Vehicle changed!`,
            confirmButtonColor: 'rgba(83, 233, 80, 1)',
            icon:"success"
          })

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
          <p className={styles.title}>Vehicle №{query.id}</p>
        </div>
        <div className={styles.newVehicleContainer}>
          <div className={styles.vehicleInputs}>
            <Box sx={{ width:'100%',zIndex:0 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" style={{fontSize:14}}>Vehicle class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={vehicleClass}
                  onChange={(e)=>setVehicleClass(e.target.value)}
                  label="Choose vehicle class"
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
            <TextField id="outlined-basic" error={errorModel} label={<p style={{fontSize:14}}>Year</p>} variant="outlined" style={{width:'100%',zIndex:0 }}    value={year} onChange={(e)=>setYear(e.target.value)}/>
            <TextField id="outlined-basic" error={errorModel} label={<p style={{fontSize:14}}>Color</p>} variant="outlined" style={{width:'100%',zIndex:0 }}  value={color} onChange={(e)=>setColor(e.target.value)}  />
            <TextField id="outlined-basic" error={errorModel} label={<p style={{fontSize:14}}>License Plate</p>} variant="outlined" style={{width:'100%',zIndex:0 }}   value={license} onChange={(e)=>setLicense(e.target.value)} />
          </div>
          <div className={styles.vehicleDocuments}>
            <p className={styles.title}>Car`s documents</p>
            <div className={styles.pickRow} style={{gap:15}}>
              <div style={{maxWidth: 225,
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                gap:10,
                width: '100%',
              }}>
                <div className={`${styles.documentPickItem}`}  >
                  {cartePhoto?<img src={`http://194.163.142.233:3005/static/${cartePhoto}`} style={{borderRadius:10,objectFit:'cover',
                    position: 'absolute',
                    width: '100%',
                    height: '100%'}}/>:<AddCircleOutlineOutlinedIcon style={{color:'#566488',fontSize:40}}/> }

                </div>
                <p style={{fontWeight:'700'}}>Carte grise</p>
              </div>

              <div style={{maxWidth: 225,
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                gap:10,
                width: '100%',
              }}>
                <div className={`${styles.documentPickItem}`}  >
                  {cartePhoto?<img src={`http://194.163.142.233:3005/static/${insurancePhoto}`} style={{borderRadius:10,objectFit:'cover',
                    position: 'absolute',
                    width: '100%',
                    height: '100%'}}/>:<AddCircleOutlineOutlinedIcon style={{color:'#566488',fontSize:40}}/> }

                </div>
                <p style={{fontWeight:'700'}}>Insurance</p>
              </div>

            </div>
            <div className={styles.addVehicleButton} style={{width:'48%'}}  onClick={()=>{
               changeVehicle()
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

  export default EditVehicle;
