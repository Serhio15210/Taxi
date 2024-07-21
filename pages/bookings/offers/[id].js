import React, {useEffect, useState} from 'react';
import styles from "../../../styles/Driver.module.sass";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import HomeLayer from "../../../components/HomeLayer/HomeLayer";
import {useRouter} from "next/router";
import {useTaxiContext} from "../../_app";
import TransferItem from "../../../components/bookingItems/TransferItem";


const Transfer = () => {
    const router=useRouter()
    const {offers}=useTaxiContext()
    const [item,setItem]=useState({})
    useEffect(()=>{
        setItem(offers.filter(offer=>offer.number===router.query?.id)[0])
    },[router.query?.id])
    return (
        <HomeLayer>
            <div className={styles.container}>
                <div className={styles.headerRow} style={{gap:40}}>
                    <div className={styles.backButton} onClick={()=>router.back()}>
                        <KeyboardBackspaceIcon style={{color:'#8B97B7'}}/>
                        <p>Back</p>
                    </div>
                    <p className={styles.title}>Transfer №{router.query?.id}</p>
                </div>
                <TransferItem item={item}/>
            </div>
        </HomeLayer>
    );
};

    export default Transfer;
