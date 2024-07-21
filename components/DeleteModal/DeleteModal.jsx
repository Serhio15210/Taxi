import React, {useEffect, useState} from 'react';

import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
 import styles from "./DeleteModal.module.sass"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useAdminContext} from "../../providers/AdminProvider";
import Swal from "sweetalert2";
const DeleteModal = ({open,setOpen,deletingItem,setChange,change,deleteFunc}) => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const {getBookingTransfers,deleteBookingTransfer}=useAdminContext()
    // const deleteBookingTransfer = useDeleteBookingTransfer()
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
            <div  className={styles.deleteContainer}>
                <img src={"/deleteModalImg.svg"}/>
                <p  className={styles.title}>Are you sure you want
                    to delete this destination?</p>
                <div className={styles.buttonsRow}>
                    <div className={styles.cancelButton} onClick={()=>setOpen(false)}>
                            <KeyboardArrowLeftIcon/>
                            <p>Cancel</p>
                    </div>
                    <div className={styles.deleteButton} onClick={()=>{
                        deleteFunc()
                    }}>
                        <DeleteOutlineOutlinedIcon/>
                        <p>Yes,delete</p>
                    </div>
                </div>
            </div>

        </Modal>
    );
};

export default DeleteModal;
