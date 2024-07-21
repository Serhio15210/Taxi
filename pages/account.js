import React, {useEffect, useState} from 'react';
import styles from "../styles/Driver.module.sass";
import HomeLayer from "../components/HomeLayer/HomeLayer";
import TextField from "@mui/material/TextField";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css'
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import {useTaxiContext} from "./_app";
import {loadToken} from "../utils/storage";
import Swal from "sweetalert2";

const Account = () => {
  const [company, setCompany] = useState(true)
  const [fullName, setFullName] = useState('')
  const [regNumber, setRegNumber] = useState('')
  const [taxNumber, setTaxNumber] = useState('')
  const [vatNumber, setVatNumber] = useState('')
  const [regAddress, setRegAddress] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [code, setCode] = useState('')
  const [photo, setPhoto] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [change, setChange] = useState(false)
  const [windowInnerWidth, setWindowInnerWidth] = useState('');
  const {
    changeMyInfo,
    changeCompanyInfo,checkMe
  } = useTaxiContext()
  useEffect(() => {
    if (window) setWindowInnerWidth(window.screen.width)

  }, [])
  const changeCompany = async () => {
    const res = await changeCompanyInfo({
      companyName: fullName,
      registerNumber: regNumber,
      vatNumber: vatNumber,
      registerAddress: regAddress,
      country: country,
      city: city,
      zipCode: code
    })
    if (res?.data?.status==='Success'){
      setChange(!change)
      Swal.fire(
        {
          title: `Success`,
          confirmButtonColor: 'rgba(83, 233, 80, 1)',
          icon: "success",
          background: 'white'
        })
    }
  }
  const changeInfo = async () => {
    const res = await changeMyInfo({
      name: name,
      email: email,
      phone: phone,
    })
    if (res?.data?.status==='Success'){
      setChange(!change)
      Swal.fire(
        {
          title: `Success`,
          confirmButtonColor: 'rgba(83, 233, 80, 1)',
          icon: "success",
          background: 'white'
        })
    }
  }
  useEffect( () => {
    const token = loadToken()
    checkMe(token).then(res=>{
      if (res.data?.isAccepted) {
        setFullName(res?.data?.AboutCompany?.companyName)
        setRegNumber(res?.data?.AboutCompany?.registerNumber)
        setRegAddress(res?.data?.AboutCompany?.registerAddress)
        setVatNumber(res?.data?.AboutCompany?.vatNumber)
        setCode(res?.data?.AboutCompany?.zipCode)
        setCity(res?.data?.AboutCompany?.city)
        setCountry(res?.data?.AboutCompany?.country)
        setCountry(res?.data?.AboutCompany?.country)
        setName(res?.data?.BasicInformation?.name)
        setEmail(res?.data?.BasicInformation?.email)
        setPhone(res?.data?.BasicInformation?.phone)

      }
    })

  }, [change]);
  return (
    <HomeLayer>
      <div className={styles.container}>
        <p className={styles.title}>Registration details</p>
        <div style={{marginTop: 40}}>
          <div className={styles.rowContainer}>
            <div className={styles.detailHeader} style={{backgroundColor: company ? 'white' : 'transparent'}}
                 onClick={() => setCompany(true)}>
              <p style={{color: company ? '#566488' : '#4E7FF1'}}>COMPANY</p>
            </div>
            <div className={styles.detailHeader} style={{backgroundColor: !company ? 'white' : 'transparent'}}
                 onClick={() => setCompany(false)}>
              <p style={{color: !company ? '#566488' : '#4E7FF1'}}>PROFILE</p>
            </div>
          </div>

          {company ? <div className={styles.detailsContainer} style={{borderTopLeftRadius: 0}}>
              <div className={styles.detailsInputs}>
                <TextField id="outlined-basic" value={fullName} onChange={(e) => setFullName(e.target.value)}
                           label={<p style={{fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}}>Full name of the
                             Company or Sole Proprietor:</p>} variant="outlined" style={{width: '100%', zIndex: 0}}/>
                <TextField id="outlined-basic" value={regNumber} onChange={(e) => setRegNumber(e.target.value)}
                           label={<p style={{fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}}>Registration
                             number:</p>} variant="outlined" style={{width: '100%', zIndex: 0}}/>
                <TextField id="outlined-basic" value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)}
                           label={<p style={{fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}}>Taxpayer
                             identification number:</p>} variant="outlined" style={{width: '100%', zIndex: 0}}/>
                <TextField id="outlined-basic" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)}
                           label={<p style={{fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}}>VAT
                             identification number:</p>} variant="outlined" style={{width: '100%', zIndex: 0}}/>
                <TextField id="outlined-basic" value={regAddress} onChange={(e) => setRegAddress(e.target.value)}
                           label={<p style={{fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}}>Registration
                             address:</p>} variant="outlined" style={{width: '100%', zIndex: 0}}/>
                <TextField id="outlined-basic" value={country} onChange={(e) => setCountry(e.target.value)}
                           label={<p style={{fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}}>Country:</p>}
                           variant="outlined" style={{width: '100%', zIndex: 0}}/>
                <TextField id="outlined-basic" value={city} onChange={(e) => setCity(e.target.value)}
                           label={<p style={{fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}}>City:</p>}
                           variant="outlined" style={{width: '100%', zIndex: 0}}/>
                <TextField id="outlined-basic" value={code} onChange={(e) => setCode(e.target.value)}
                           label={<p style={{fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}}>Postal
                             code:</p>} variant="outlined" style={{width: '100%', zIndex: 0}}/>
              </div>
              <div className={styles.submitRow}>
                <div className={styles.addVehicleButton} style={{
                  backgroundColor: '#4E7FF1',
                  cursor: 'pointer'
                }} onClick={changeCompany}>

                  <p>SAVE</p>
                  <ArrowRightAltIcon style={{color: 'white'}}/>
                </div>
                <div className={styles.rowContainer} style={{gap: 25}}>
                  <p style={{color: '#A3AEC9', fontSize: 12, fontWeight: '700'}}>STATUS</p>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 50,
                    background: '#FF9900',
                    border: '7px solid #FFD79B'
                  }}/>
                  <p style={{color: '#FF9900', textTransfrom: 'capitalize'}}>Pending</p>

                </div>
              </div>
            </div> :

            <div className={styles.profileContainer}>
              <div className={styles.profileRow}>
                <div className={styles.profileInputs}>
                  <TextField id="outlined-basic" value={name} onChange={(e) => setName(e.target.value)}
                             label={<p style={{fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}}>Full
                               name:</p>} variant="outlined" style={{width: '100%', zIndex: 0}}/>
                  <div id='white'>
                    <PhoneInput
                      country={'fr'}
                      specialLabel='Phone number:'
                      inputStyle={{width: '100%', borderColor: 'rgba(0, 0, 0, 0.3)'}}
                      containerStyle={{color: 'rgba(0, 0, 0, 0.6)'}}
                      value={phone} onChange={(e) => setPhone(e)}
                    />
                  </div>
                  <TextField id="outlined-basic"
                             label={<p style={{fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis'}}>Email:</p>}
                             variant="outlined" style={{width: '100%', zIndex: 0}} value={email} onChange={()=>setEmail(e.target.value)}/>
                  {windowInnerWidth > 800 && <div className={styles.submitRow} style={{marginTop: 20}}>
                    <div className={styles.addVehicleButton} style={{
                      backgroundColor: '#4E7FF1',
                      cursor: 'pointer'
                    }} onClick={changeInfo}>

                      <p>SAVE</p>
                      <ArrowRightAltIcon style={{color: 'white'}}/>
                    </div>
                    <div className={styles.rowContainer} style={{gap: 25}}>
                      <p style={{color: '#A3AEC9', fontSize: 12, fontWeight: '700'}}>STATUS</p>
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: 50,
                        background: '#FF9900',
                        border: '7px solid #FFD79B'
                      }}/>
                      <p style={{color: '#FF9900', textTransfrom: 'capitalize'}}>Pending</p>

                    </div>
                  </div>}
                </div>
                <div className={styles.profilePhotoBlock}>
                  <div className={styles.photo} style={{
                    background: photo ? `url(${photo}) no-repeat 100%` : '#2DD792',
                    boxShadow: photo ? '0px 10px 40px rgba(78, 127, 241, 0.19)' : 'none',
                    backgroundSize: photo ? 'contain' : 'inherit'
                  }}>
                    {!photo && <p>L</p>}
                  </div>
                  <label htmlFor="file-upload-photo" className={`custom-file-upload ${styles.addPhotoInput}`}>
                    <i className="fa fa-cloud-upload" style={{position: 'absolute'}}></i>

                    <input
                      id="file-upload-photo" type="file"
                      style={{display: 'none'}} onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}/>
                    <CameraAltOutlinedIcon style={{color: '#8B97B7', fontSize: 25}}/>
                    <p>Upload a photo</p>
                  </label>
                </div>
              </div>
              {windowInnerWidth < 800 && <div className={styles.submitRow} style={{marginTop: 20}}>
                <div className={styles.addVehicleButton} style={{
                  backgroundColor: fullName && regNumber && regAddress && taxNumber && vatNumber && code && country && city ? '#4E7FF1' : '#C6CFE4',
                  cursor: fullName && regNumber && regAddress && taxNumber && vatNumber && code && country && city ? 'pointer' : 'default'
                }}>

                  <p>SAVE</p>
                  <ArrowRightAltIcon style={{color: 'white'}}/>
                </div>
                <div className={styles.rowContainer} style={{gap: 25}}>
                  <p style={{color: '#A3AEC9', fontSize: 12, fontWeight: '700'}}>STATUS</p>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 50,
                    background: '#FF9900',
                    border: '7px solid #FFD79B'
                  }}/>
                  <p style={{color: '#FF9900', textTransfrom: 'capitalize'}}>Pending</p>

                </div>
              </div>}
            </div>}
        </div>
      </div>
    </HomeLayer>
  );
};

export default Account;
