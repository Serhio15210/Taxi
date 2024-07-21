import React, {useEffect, useState} from 'react';

import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AddNewDestinationModal.module.sass";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveIcon from '@mui/icons-material/Save';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useAdminContext} from "../../providers/AdminProvider";
import Swal from "sweetalert2";
const AddNewDestinationModal = ({open,setOpen,change,setChange}) => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const [from,setFrom]=useState('')
    const [to,setTo]=useState('')
    const [economy,setEconomy]=useState('')
    const [economyPlus,setEconomyPlus]=useState('')
    const [business,setBusiness]=useState('')
    const [vip,setVip]=useState('')
    const [van,setVan]=useState('')
    const [businessVan,setBusinessVan]=useState('')
    const {getBookingTransfers,addBookingTransfer}=useAdminContext()
    // const addBookingTransfer = useAddBookingTransfer()
    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)
    }, [])
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
            padding:windowInnerWidth>500?"60px 40px":20,
            background: windowInnerWidth>500?'rgba(36, 48, 79, 0.8)':'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
    };

    const addDestination=()=>{
        console.log(to,from)
        if (to&&from&&economy&&economyPlus&&vip&&business&&van&&businessVan) {

            addBookingTransfer({
                  "to": to,
                  "from": from,
                  "p1": economy,
                  "p2": economyPlus,
                  "p3": business,
                  "p4": vip,
                  "p5": van,
                  "p6": businessVan
              }
            ).then(res=>{
                if (res?.status==='succes'){
                    setChange(!change)
                    Swal.fire(
                      {
                          title: `Destination added`,
                          confirmButtonColor: 'rgba(83, 233, 80, 1)',
                          icon: "success",
                          background: 'white'
                      }).then(res => {
                        res.isConfirmed && setOpen(false)
                    })
                }
            })

        }
    }
    return (
      <Modal isOpen={open}
             onRequestClose={() => setOpen(prev => false)}
             style={customStyles}
             ariaHideApp={false}  >
          <CloseIcon style={{position:'absolute',top:20,right:20,color:windowInnerWidth>500?'white':'#566488',fontSize:38,cursor:'pointer'}} onClick={()=>setOpen(false)}/>
          <div  className={styles.addContainer}>
              <p className={styles.title}>Add new destination</p>
              <div className={styles.inputRow}>
                  <FormControl sx={{ width:'100%' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">From</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="From"
                        value={from}
                        onChange={(e)=>setFrom(e.target.value)}
                      />
                  </FormControl>
                  <FormControl sx={{ width:'100%' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">To</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="To"
                        value={to}
                        onChange={(e)=>setTo(e.target.value)}
                      />
                  </FormControl>
              </div>
              <p style={{color:'#24304F',fontWeight:600}}>Prices by car type:</p>
              <div className={styles.inputRow}>
                  <FormControl sx={{ width:'100%' }} variant="outlined"  >
                      <InputLabel htmlFor="outlined-adornment-password">Economy</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="Economy"
                        type="number"
                        value={economy}
                        onChange={(e)=>{
                            setEconomy(e.target.value)
                        }}
                      />
                  </FormControl>
                  <FormControl sx={{ width:'100%' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Economy +</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="Economy +"
                        type="number"
                        value={economyPlus}
                        onChange={(e)=>setEconomyPlus(e.target.value)}
                      />
                  </FormControl>
              </div>
              <div className={styles.inputRow}>
                  <FormControl sx={{ width:'100%' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Business</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="Business"
                        type="number"
                        value={business}
                        onChange={(e)=>setBusiness(e.target.value)}
                      />
                  </FormControl>
                  <FormControl sx={{ width:'100%' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">VIP</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="VIP"
                        type="number"
                        value={vip}
                        onChange={(e)=>setVip(e.target.value)}
                      />
                  </FormControl>
              </div>
              <div className={styles.inputRow}>
                  <FormControl sx={{ width:'100%' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">VAN</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="VAN"
                        value={van}
                        type="number"
                        onChange={(e)=>setVan(e.target.value)}
                      />
                  </FormControl>
                  <FormControl sx={{ width:'100%' }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Business VAN</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="Business VAN"
                        value={businessVan}
                        type="number"
                        onChange={(e)=>setBusinessVan(e.target.value)}
                      />
                  </FormControl>
              </div>
              <div className={styles.buttonsRow}>
                  <div className={styles.cancelButton} onClick={()=>setOpen(false)}>
                      <KeyboardArrowLeftIcon/>
                      <p>Cancel</p>
                  </div>
                  <div className={styles.saveButton} onClick={()=>{
                      addDestination()
                  }}>
                      <SaveIcon/>
                      <p>Save</p>
                  </div>
              </div>
          </div>

      </Modal>
    );
};

export default AddNewDestinationModal;
