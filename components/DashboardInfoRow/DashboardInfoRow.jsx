import React, {useState} from 'react';
import styles from "../../styles/Admin.module.sass";
import {Box, FormControl, MenuItem, Select} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";


const DashboardInfoRow = () => {
    const [month,setMonth]=useState('Jul 2022')
    return (
        <div className={styles.dashboardInfoRow}>
            <div className={styles.dashboardPayments}>
                <div className={styles.transfersMonth}>
                    <Box sx={{ width:'100%',zIndex:0,position:'relative',display:'flex',alignItems:'center'}}>
                        <CalendarMonthIcon style={{position:'absolute',margin:'auto',left:12,color:'#73809E'}}/>
                        <FormControl fullWidth>

                            <Select
                                id="demo-simple-select"
                                value={month}
                                defaultValue={month}
                                onChange={(e)=>setMonth(e.target.value)}
                                label=""
                                style={{color:'#73809E',paddingLeft:33,paddingRight:30}}
                            >
                                <MenuItem value={'Jul 2022'} style={{color:'#73809E'}}> Jul 2022</MenuItem>
                                <MenuItem value={'Jun 2022'} style={{color:'#73809E'}}>Jun 2022 </MenuItem>
                                <MenuItem value={'May 2022'} style={{color:'#73809E'}}>May 2022 </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div className={styles.countBlock}>
                        <p>125</p>
                        <span>Transfers/month</span>
                    </div>
                </div>
                <div className={styles.paymentsMonth}>
                    <p className={styles.title}>Paiments/month:</p>
                    <div className={styles.paymentRow}>
                        <div className={styles.rowContainer} style={{gap:10}}>
                            <AccountBalanceWalletIcon style={{color:'#9CA6BE'}}/>
                            <p>Brut:</p>
                        </div>
                        <p className={styles.paymentTitle}>€10,000</p>
                    </div>
                    <div className={styles.paymentRow}>
                        <div className={styles.rowContainer} style={{gap:10}}>
                            <AccountBalanceWalletIcon style={{color:'#9CA6BE'}}/>
                            <p>Com:</p>
                        </div>
                        <p className={styles.paymentTitle}>€2,000</p>
                    </div>
                </div>
            </div>
            <div className={styles.clientsBlock}>
                <div className={styles.rowContainer} style={{gap:10,borderBottom:'1px solid rgba(0, 0, 0, 0.08)',padding: 23,width:'100%'}}>
                    <div className={styles.infoImgBlock}>
                        <PersonIcon style={{color:'#4E7FF1'}}/>
                    </div>
                    <p>Clients</p>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',width:'100%'}}>
                    <p className={styles.countTitle}   >1575</p>
                </div>

            </div>
            <div className={styles.companiesBlock}>
                <div className={styles.companiesTitleRow}>
                    <div className={styles.rowContainer} style={{gap:10}}>
                        <div className={styles.infoImgBlock}>
                            <BusinessCenterIcon style={{color:'#4E7FF1'}}/>
                        </div>
                        <p>Companies:</p>
                    </div>
                    <div className={styles.exitBlock}>
                        <p style={{color:'#A3AEC9'}}>View All</p>
                    </div>
                </div>
                <div className={styles.rowContainer} style={{width:'100%'}}>
                    <div className={styles.companiesStatusCount} style={{borderRight:'1px solid rgba(0, 0, 0, 0.08)'}}>
                        <p className={styles.countTitle}   >75</p>
                        <div className={styles.rowContainer} style={{gap:10}}>
                            <div style={{width:20,height:20,borderRadius:50,background:'#FF9900',border: `7px solid #FFD79B`}}/>
                            <p style={{color:'#FF9900'}}>Pending</p>
                        </div>
                    </div>
                    <div className={styles.companiesStatusCount}  >
                        <p className={styles.countTitle}   >32</p>
                        <div className={styles.rowContainer} style={{gap:10}}>
                            <div style={{width:20,height:20,borderRadius:50,background:'#2DD792',border: `7px solid #D4F3E7`}}/>
                            <p style={{color:'#1FC17F'}}>Accepted</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardInfoRow;
