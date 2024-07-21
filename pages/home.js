import React, {useEffect, useState} from 'react';
import HomeLayer from "../components/HomeLayer/HomeLayer";
import styles from "../styles/Driver.module.sass"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddMobileVehicle from "../components/MobileAddItems/AddMobileVehicle";
import AddMobileDriver from "../components/MobileAddItems/AddMobileDriver";
import {useRouter} from "next/router";
import {useTaxiContext} from "./_app";
import Swal from "sweetalert2";
import Link from "next/link";
import {loadToken} from "../utils/storage";

const Home = () => {
  const [changeData,setChangeData]=useState(false)
  const router=useRouter()
  const {getVehicles,getDrivers,deleteDriver,deleteVehicle, checkMe,user, setUser}=useTaxiContext()
  const [vehicles,setVehicles]=useState([])
  const [drivers,setDrivers]=useState([])
  const deleteSelectDriver=(id)=>{
    Swal.fire({
      title: 'Delete this driver?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
    }).then((result) => {

      if (result.isConfirmed) {
        deleteDriver(id).then(res=>{
          if(res.data?.status==='Success'){
            setChangeData(!changeData)
            Swal.fire(
              {
                title: `Driver deleted!`,
                confirmButtonColor: 'rgba(83, 233, 80, 1)',
                icon:"success"
              })

          }

        })
      }
    })

  }
  const deleteSelectVehicle=(id)=>{
    Swal.fire({
      title: 'Delete this vehicle?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
    }).then((result) => {

      if (result.isConfirmed) {
        deleteVehicle(id).then(res=>{
          if(res.data?.status==='Success'){
            setChangeData(!changeData)
            Swal.fire(
              {
                title: `Vehicle deleted!`,
                confirmButtonColor: 'rgba(83, 233, 80, 1)',
                icon:"success"
              })
          }
        })
      }
    })
  }

  useEffect(()=>{
    getVehicles().then(res=>{
      setVehicles(res.data.data)
    })
    getDrivers().then(res=>{
      setDrivers(res.data.data)
    })

  },[changeData])
  const [windowInnerWidth, setWindowInnerWidth] = useState('');

  useEffect( () => {
    if (window) setWindowInnerWidth(window.screen.width)


  }, []);
  return (
    <HomeLayer>
      {vehicles.length===0&&drivers.length===0?<div className={styles.container}>
          <p className={styles.title}>Car driver</p>
          <p style={{fontSize:16,color:'#566488',marginTop:20}}>Add information about the car and driver using the buttons below:</p>
          <div className={styles.buttonsContainer} style={{marginTop:20,gap:20}}>
            <div className={styles.addVehicleButton} onClick={()=>router.push('/home/add-new-vehicle')}>
              <AddOutlinedIcon style={{color:'white'}}/>
              <p>ADD NEW VEHICLE</p>
            </div>
            <div className={styles.addVehicleButton} style={{backgroundColor:'#4E7FF1'}} onClick={()=>router.push('/home/add-new-driver')}>
              <AddOutlinedIcon style={{color:'white'}}/>
              <p>ADD NEW DRIVER</p>
            </div>
          </div>
        </div>:
        <div className={styles.container}>
          <div className={styles.titleRowContainer}>
            <div>
              <p className={styles.title}>Vehicle</p>
              <p style={{fontSize:16,color:'#566488',marginTop:20}}>Add information about your vehicle.</p>
            </div>
            {windowInnerWidth>500&&<div className={styles.addVehicleButton} onClick={()=>router.push('/home/add-new-vehicle')}>
              <AddOutlinedIcon style={{color:'white'}}/>
              <p>ADD NEW VEHICLE</p>
            </div>}
          </div>
          {windowInnerWidth>800?<TableContainer component={Paper} style={{background:'none',marginTop:50,marginBottom:50}}>
            <Table sx={{ minWidth: 650,boxShadow:'none',backgroundColor:'none',borderSpacing:'0 15px',borderCollapse:'separate' }}  style={{boxShadow:'none'}} aria-label="simple table">
              {vehicles.length>0&&<TableHead sx={{backgroundColor:'#F1F5FF',boxShadow:'none',borderBottom:'none'}}>
                <TableRow  style={{borderBottom:'none'}}>
                  <TableCell align="left" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>NAME</TableCell>
                  <TableCell align="left" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>YEAR</TableCell>
                  <TableCell align="center" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>LICENSE PLATE</TableCell>
                  <TableCell align="center" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>COLOR</TableCell>
                  <TableCell align="center" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>CAR TYPE</TableCell>
                  <TableCell align="center" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>STATE</TableCell>
                  <TableCell align="center" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>ACTION</TableCell>
                </TableRow>
              </TableHead>}
              <TableBody   style={{background:'white'}}>
                {vehicles?.map((row) => (
                  <TableRow
                    style={{background:'white',boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.02)'}}
                    key={row?._id}

                  >
                    <TableCell component="th" scope="row" style={{borderTopLeftRadius:10,borderBottomLeftRadius:10,backgroundColor:'white',borderBottom:'none'}}>
                      <p style={{color:'#566488'}}>{row?.BrandModel}</p>
                    </TableCell>
                    <TableCell component="th" scope="row" style={{backgroundColor:'white',borderBottom:'none'}}>
                      <p style={{color:'#566488'}}>{row?.Year}</p>
                    </TableCell>

                    <TableCell   scope="row" align="center" style={{backgroundColor:'white',borderBottom:'none'}}>
                      <p style={{color:'#566488'}}>{row?.License}</p>
                    </TableCell>
                    <TableCell align="center" style={{backgroundColor:'white',borderBottom:'none'}}> <p style={{color:'#566488'}}>{row.Color}</p> </TableCell>
                    <TableCell align="center" style={{backgroundColor:'white',borderBottom:'none'}}><p style={{color:'#566488'}}>{row?.Class}</p>  </TableCell>
                    <TableCell align="center" style={{backgroundColor:'white',borderBottom:'none'}}>
                      <div style={{display:'flex',flexDirection:'row',gap:20 ,alignItems:'flex-end',justifyContent:'center'}}>
                        <div style={{width:20,height:20,borderRadius:50,background:row.state==='Verified'?'#2DD792':'#FF9900',border: `7px solid ${row?.Status==='Verified'?"#D4F3E7":"#FFD79B"}`}}/>
                        <p style={{color:row?.Status==='Verified'?'#2DD792':'#FF9900',textTransfrom:'capitalize'}}>{row?.Status}</p> </div> </TableCell>
                    <TableCell   scope="row" align="center" style={{borderTopRightRadius:10,borderBottomRightRadius:10,backgroundColor:'white',borderBottom:'none'}}>
                      <div style={{display:'flex',flexDirection:'row',gap:5 ,alignItems:'flex-end',justifyContent:'center'}}>
                        <Link href={`/home/vehicle/${row?._id}`}><div className={styles.actionItem}><EditOutlinedIcon style={{color:'#566488',cursor:'pointer'}}/></div></Link>
                        <div className={styles.actionItem} onClick={()=>{
                          deleteSelectVehicle(row?._id)
                        }}><DeleteOutlineIcon style={{color:'#566488',cursor:'pointer'}}/></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>:vehicles.length!==0?<div className={styles.mobileItemsRow}>
            {vehicles.map((item,index)=>{
              return (
                <AddMobileVehicle item={item} key={index} deleteSelectVehicle={deleteSelectVehicle}/>
              )
            })}
          </div>:<></>}
          {windowInnerWidth<500&&<div className={styles.addVehicleButton} style={{marginBottom:40,marginTop:20}} onClick={()=>router.push('/home/add-new-vehicle')}>
            <AddOutlinedIcon style={{color:'white'}}/>
            <p>ADD NEW VEHICLE</p>
          </div>}
          <div className={styles.titleRowContainer}>
            <div>
              <p className={styles.title}>Driver</p>
              <p style={{fontSize:16,color:'#566488',marginTop:20,maxWidth:394}}>Add information about the driver who will carry out the transportation.</p>
            </div>
            {windowInnerWidth>500&&<div className={styles.addVehicleButton} style={{backgroundColor:'#4E7FF1'}} onClick={()=>router.push('/home/add-new-driver')}>
              <AddOutlinedIcon style={{color:'white'}}/>
              <p>ADD NEW DRIVER</p>
            </div>}
          </div>

          {windowInnerWidth>800?<TableContainer component={Paper} style={{background:'none',marginTop:50,marginBottom:50 }}>
            <Table sx={{ minWidth: 650,boxShadow:'none',backgroundColor:'none',borderSpacing:'0 15px',borderCollapse:'separate' }}  style={{boxShadow:'none'}} aria-label="simple table">
              {drivers.length>0&&<TableHead sx={{backgroundColor:'#F1F5FF',boxShadow:'none',borderBottom:'none'}}>
                <TableRow  style={{borderBottom:'none'}}>
                  <TableCell align="left" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>NAME</TableCell>
                  <TableCell align="center" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>PHONE NUMBER</TableCell>
                  <TableCell align="left" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>EMAIL</TableCell>
                  <TableCell align="left" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>STATE</TableCell>
                  <TableCell align="center" style={{borderBottom:'none',color:'#566488',fontWeight:'700'}}>ACTION</TableCell>
                </TableRow>
              </TableHead>}
              <TableBody   style={{background:'white'}}>
                {drivers?.map((row) => (
                  <TableRow
                    style={{background:'white',boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.02)'}}
                    key={row?._id}

                  >
                    <TableCell component="th" scope="row" style={{borderTopLeftRadius:10,borderBottomLeftRadius:10,backgroundColor:'white',borderBottom:'none'}}>
                      <p style={{color:'#566488'}}>{row?.FullName}</p>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center" style={{backgroundColor:'white',borderBottom:'none'}}>
                      <p style={{color:'#566488'}}>{row?.Phone}</p>
                    </TableCell>

                    <TableCell   scope="row" align="left" style={{backgroundColor:'white',borderBottom:'none'}}>
                      <a style={{color:'#4E7FF1',textDecoration:'underline'}}>{row?.Email}</a>
                    </TableCell>

                    <TableCell align="left" scope="row" style={{backgroundColor:'white',borderBottom:'none'}}>
                      <div style={{display:'flex',flexDirection:'row',gap:20 ,alignItems:'flex-start' }}>
                        <div style={{width:20,height:20,borderRadius:50,background:row.state==='Verified'?'#2DD792':'#FF9900',border: `7px solid ${row?.Status==='Verified'?"#D4F3E7":"#FFD79B"}`}}/>
                        <p style={{color:row?.Status==='Verified'?'#2DD792':'#FF9900',textTransfrom:'capitalize'}}>{row?.Status}</p> </div> </TableCell>
                    <TableCell   scope="row" align="center" style={{borderTopRightRadius:10,borderBottomRightRadius:10,backgroundColor:'white',borderBottom:'none'}}>
                      <div style={{display:'flex',flexDirection:'row',gap:5 ,alignItems:'flex-end',justifyContent:'center'}}>
                        <Link href={`/home/driver/${row?._id}`}><div className={styles.actionItem}><EditOutlinedIcon style={{color:'#566488',cursor:'pointer'}}/></div></Link>
                        <div className={styles.actionItem} onClick={()=>{
                          deleteSelectDriver(row?._id)
                        }}><DeleteOutlineIcon style={{color:'#566488',cursor:'pointer'}}/></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>:drivers.length!==0?<div className={styles.mobileItemsRow}>
            { drivers.map((item,index)=>{
              return (
                <AddMobileDriver item={item} key={index} deleteSelectDriver={deleteSelectDriver}/>
              )
            })}
          </div>:<></>}
          {windowInnerWidth<500&&<div className={styles.addVehicleButton} style={{marginBottom:40,marginTop:20,backgroundColor:'#4E7FF1'}} onClick={()=>router.push('/home/add-new-driver')}>
            <AddOutlinedIcon style={{color:'white'}}/>
            <p>ADD NEW DRIVER</p>
          </div>}
        </div>
      }
    </HomeLayer>
  );
};

export default Home;
