import React, {useEffect, useState} from 'react';
import styles from "./OfferItem.module.sass"
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CachedIcon from '@mui/icons-material/Cached';
import MobileTablePayouts from "./MobileTablePayouts";

const PayoutItem = ({item,first,last}) => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)

    }, [])
    return (
        <div className={styles.payoutItemContainer}>
            <div style={{marginTop:first?50:0}} className={styles.payoutDate}>
                <p className={styles.title}>{item.date}</p>
                <p  >{item.cost}</p>
            </div>
            <div className={styles.tablePayoutBlock}>
                {windowInnerWidth>800?<TableContainer component={Paper} style={{background:'none',marginTop:first?0:-40 }}>
                <Table sx={{ minWidth: 650,boxShadow:'none',backgroundColor:'none',borderSpacing:'0 15px',borderCollapse:'separate' }}  style={{boxShadow:'none'}} aria-label="simple table">
                     <TableHead sx={{backgroundColor:'#F1F5FF',boxShadow:'none',borderBottom:'none'}}>
                        <TableRow  style={{borderBottom:'none'}}>
                            <TableCell align={windowInnerWidth>800?"center":'left'} style={{borderBottom:'none',color:first?'#A3AEC9':'transparent',fontWeight:'700'}}>RIDE №</TableCell>
                            <TableCell align={windowInnerWidth>800?"center":'left'} style={{borderBottom:'none',color:first?'#A3AEC9':'transparent',fontWeight:'700'}}>FROM CITY TO CITY</TableCell>
                            <TableCell align='center' style={{borderBottom:'none',color:first?'#A3AEC9':'transparent',fontWeight:'700'}}>AMOUNT</TableCell>
                            <TableCell align='center' style={{borderBottom:'none',color:first?'#A3AEC9':'transparent',fontWeight:'700'}}>STATUS</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody   style={{background:'white' }}>
                        {item.routes?.map((row) => (
                            <TableRow
                                style={{background:'white',boxShadow:'0px 4px 10px rgba(0, 0, 0, 0.02)' }}
                                key={row?.rideNumber}

                            >
                                <TableCell component="th" scope="row" align="center" style={{borderTopLeftRadius:10,borderBottomLeftRadius:10,backgroundColor:'white',borderBottom:'none',width:windowInnerWidth>800?150:50,textAlign:windowInnerWidth>800?'center':'left' }}>
                                    <p style={{color:'#566488'}}>{row.rideNumber}</p>
                                </TableCell>
                                <TableCell component="th" scope="row" align="center"  style={{backgroundColor:'white',borderBottom:'none',display:windowInnerWidth>800?'flex':'' ,width:windowInnerWidth>800?300:100,paddingLeft:windowInnerWidth>800?100:0,justifyContent:'flex-start' }}>
                                    <div style={{display:'flex',flexDirection:'row',gap:15 ,alignItems:'flex-start',textAlign:'left'  }}>
                                        {windowInnerWidth>800&&<img src={'/marker.svg'}/>}<p style={{color:'#566488'}}>{row.route}</p>
                                    </div>

                                </TableCell>

                                <TableCell   scope="row" align={windowInnerWidth>1200?"left":'center'} style={{backgroundColor:'white',borderBottom:'none',width:windowInnerWidth>800?200:10 }}>
                                    <p style={{color:'#566488'}}>{row.amount}</p>
                                </TableCell>

                                <TableCell align="left" style={{backgroundColor:'white',borderBottom:'none',borderTopRightRadius:10,borderBottomRightRadius:10,width:windowInnerWidth>800?200:50}}>
                                    <div style={{display:'flex',flexDirection:'row',gap:5 ,alignItems:'flex-end',justifyContent:'center'}}>
                                    <div style={{width:20,height:20,borderRadius:50,background:row.status==='Paid out'?'#2DD792':'#FF9900',border: `7px solid ${row.status==='Paid out'?"#D4F3E7":"#FFD79B"}`}}/>
                                        {windowInnerWidth>800&&<p style={{color:row.status==='Paid out'?'#2DD792':'#FF9900',textTransfrom:'capitalize'}}>{row.status}</p>}

                                    </div>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>:<MobileTablePayouts item={item} first={first} windowWidth={windowInnerWidth}/>}
                {last&&<div className={styles.acceptButton} style={{maxWidth:185,gap:10,marginTop:windowInnerWidth>800?0:20}}>
                    <p>SHOW MORE</p>
                    <CachedIcon style={{color:'white'}}/>
                </div>}
            </div>
        </div>
    );
};

export default PayoutItem;
