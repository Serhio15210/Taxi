import React, {useEffect, useState} from 'react';
import 'react-phone-input-2/lib/material.css'
import {useRouter} from "next/router";
import {useTaxiContext} from "../../_app";
import Swal from "sweetalert2";
import HomeLayer from "../../../components/HomeLayer/HomeLayer";
import styles from "../../../styles/Driver.module.sass";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-input-2";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const EditDriver= () => {
  const [errorModel,setErrorModel]=useState(false)
  const [fullName,setFullName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [license, setLicense] = useState({})
  const [licensePhoto, setLicensePhoto] = useState('')
  const [proCardPhoto, setProCardPhoto] = useState('')
  const [proCard, setProCard] = useState({})
  const router=useRouter()
  const {deleteDriver,getDriverById,addDriver,editDriver}=useTaxiContext()
  const {query}=useRouter()
  useEffect(() => {
     getDriverById(query.id).then(res=>{
        setFullName(res?.data?.data?.FullName)
        setEmail(res?.data?.data?.Email)
        setPhone(res?.data?.data?.Phone)
        setProCardPhoto(res?.data?.data?.ProCard)
        setLicensePhoto(res?.data?.data?.License)
     })
  }, [query.id]);
  const editSelectDriver=()=>{
    editDriver({fullName,email,phone,driverId:query.id}).then(res=>{
      if(res.data?.status==='Success'){
        Swal.fire(
          {
            title: `Driver changed!`,
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
          <p className={styles.title}>Driver №{query.id}</p>
        </div>
        <div className={styles.newVehicleContainer}>
          <div className={styles.vehicleInputs}>

            <TextField id="outlined-basic" error={errorModel} label={<p style={{fontSize:14}}>Full name</p>} variant="outlined" style={{width:'100%',zIndex:0 }} value={fullName} onChange={(e)=>setFullName(e.target.value)}   />
            <TextField id="outlined-basic" error={errorModel} label={<p style={{fontSize:14}}>Email</p>} variant="outlined" style={{width:'100%',zIndex:0 }}   value={email} onChange={(e)=>setEmail(e.target.value)} />
            <PhoneInput
              country={'fr'}
              specialLabel=''
              inputStyle={{width:'100%',borderColor:'rgba(0, 0, 0, 0.3)'}}
              containerStyle={{color:'rgba(0, 0, 0, 0.6)'}}
              value={phone} onChange={(e)=>setPhone(e)}
            />
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
              <label htmlFor="file-upload" className={`custom-file-upload ${styles.documentPickItem}`} style={{backgroundColor:license?.name?'#EFF4FE':'transparent'}}>
                {licensePhoto?<img src={`http://194.163.142.233:3005/static/${licensePhoto}`} style={{borderRadius:10,objectFit:'cover',
                  position: 'absolute',
                  width: '100%',
                  height: '100%'}}/>:<AddCircleOutlineOutlinedIcon style={{color:'#566488',fontSize:40}}/> }
                <p style={{fontWeight:license?.name?'700':'400'}}>License</p>
              </label>
                 <p style={{fontWeight:'700'}}>License</p>
               </div>
               <div style={{maxWidth: 225,
                 display:'flex',
                 flexDirection:'column',
                 alignItems:'center',
                 gap:10,
                 width: '100%',
               }}>
              <label htmlFor="file-upload2" className={`custom-file-upload ${styles.documentPickItem}`} style={{backgroundColor:proCard?.name?'#EFF4FE':'transparent'}}>
                {proCardPhoto?<img src={`http://194.163.142.233:3005/static/${proCardPhoto}`} style={{borderRadius:10,objectFit:'cover',
                  position: 'absolute',
                  width: '100%',
                  height: '100%'}}/>:<AddCircleOutlineOutlinedIcon style={{color:'#566488',fontSize:40}}/>}
              </label>
                 {proCardPhoto&&!proCard?.name&&<p style={{fontWeight:'700'}}>Pro Card</p>}
               </div>

            </div>
            <div className={styles.addVehicleButton} style={{width:'48%'}} onClick={()=>{
               editSelectDriver()
            }} >
              <p>SUBMIT</p>
              <ArrowRightAltIcon style={{color:'white'}}/>

            </div>
          </div>
        </div>

      </div>

    </HomeLayer>
  )
}

  export default EditDriver;
