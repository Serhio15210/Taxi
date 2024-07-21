import React, {useEffect, useState} from 'react';

import styles from "./CompanyDetailModal.module.sass"
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
const CompanyDetailModal = ({open,setOpen,company}) => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');


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
            alignItems: 'center',



        },
    };
    return (
        <Modal isOpen={open}
               onRequestClose={() => setOpen(prev => false)}
               style={customStyles}
               ariaHideApp={false}  >
            <CloseIcon style={{position:'absolute',top:20,right:20,color:windowInnerWidth>500?'white':'#566488',fontSize:38,cursor:'pointer'}} onClick={()=>setOpen(false)}/>
            <div className={styles.detailContainer}>
                <p className={styles.title}>{company?.company}</p>
                <p style={{color:'#566488'}}>ID {company?.id}</p>
                <div className={styles.detailRow} style={{background:'#EFF4FE'}}>
                    <p style={{width:'40%',textAlign:'right',color:'#73809E'}}>Full Name:</p>
                    <p style={{width:'50%',fontWeight:600,color:'#24304F'}}>{company?.name}</p>
                </div>
                <div className={styles.detailRow}  >
                    <p style={{width:'40%',textAlign:'right',color:'#73809E'}}>Phone:</p>
                    <p style={{width:'50%',fontWeight:600,color:'#24304F'}}>+33 654 874 5874</p>
                </div>
                <div className={styles.detailRow} style={{background:'#EFF4FE'}}>
                    <p style={{width:'40%',textAlign:'right',color:'#73809E'}}>Email:</p>
                    <a href='info@gmail.com' style={{width:'50%',fontWeight:600,color:'#4E7FF1',cursor:'pointer',textDecoration:'underline'}}>info@gmail.com</a>
                </div>
                <div className={styles.detailRow}  >
                    <p style={{width:'40%',textAlign:'right',color:'#73809E'}}>Car:</p>
                    <p style={{width:'50%',fontWeight:600,color:'#24304F'}}>Mercedes C Class 2018 </p>
                </div>
                <div className={styles.detailRow} style={{background:'#EFF4FE'}}>
                    <p style={{width:'40%',textAlign:'right',color:'#73809E'}}>Car plate number:</p>
                    <p style={{width:'50%',fontWeight:600,color:'#24304F'}}>DZ-875-FZ</p>
                </div>
            </div>
        </Modal>
    );
};

export default CompanyDetailModal;
