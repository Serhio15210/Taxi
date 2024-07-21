import React, {useEffect, useState} from 'react';
import AdminLayer from "../components/AdminLayer/AdminLayer";
import styles from "../styles/Admin.module.sass"
import LogoutIcon from '@mui/icons-material/Logout';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DashboardInfoRow from "../components/DashboardInfoRow/DashboardInfoRow";
import TransferItem from "../components/TransferItem/TransferItem";
const Admin = () => {
    const transfers=[
        {
            title:'Economy',
            procent:'75%',
            background:'#4E7FF1'

        },
        {
            title:'Economy +',
            procent:'81%',
            background: '#1FC17F'

        }
        ,
        {
            title:'Business',
            procent:'52%',
            background: '#F35046'

        }
        ,
        {
            title:'VIP',
            procent:'92%',
            background: '#1FC17F'

        }
        ,
        {
            title:'VAN',
            procent:'48%',
            background: '#F35046'

        },
        {
            title:'Business VAN',
            procent:'63%',
            background:'#4E7FF1'

        }

    ]

    return (
        <AdminLayer>
        <div className={styles.container}>
             <div className={styles.pageHeader}>
                 <div style={{display:'flex',alignItems:'center',gap:20,flexDirection:'row'}}>
                 <div className={styles.headerImg}>
                     <img src={'/dashboard.svg'}/>
                 </div>
                 <p className={styles.headerTitle}>Dashboard</p>
                 </div>
                 <div className={styles.exitBlock}>
                     <p>Exit</p>
                     <LogoutIcon style={{color:'#A3AEC9'}}/>
                 </div>
             </div>
             <DashboardInfoRow/>
            <div className={styles.transfersInfoBlock}>
                <div className={styles.rowContainer} style={{justifyContent:'space-between',width:'100%'}}>
                <div className={styles.rowContainer} style={{gap:10}}>
                    <div className={styles.infoImgBlock}>
                        <DirectionsCarIcon style={{color:'#4E7FF1'}}/>
                    </div>
                    <p className={styles.transferTitle}>Transfers: <span>356 858</span></p>
                </div>
                    <div className={styles.exitBlock}>
                        <p style={{color:'#A3AEC9'}}>View All</p>
                    </div>
                </div>
                <div className={styles.transfersItemsRow}>
                    {transfers.map((item,index)=>{
                        return (
                            <TransferItem key={index} item={item}/>
                        )
                    })}

                </div>
            </div>
        </div>
        </AdminLayer>
    );
};

export default Admin;
