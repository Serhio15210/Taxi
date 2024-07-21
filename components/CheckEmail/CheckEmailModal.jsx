import React, {useEffect, useState} from 'react';

import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../AskQuestionModal.module.sass";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CheckEmailModal = ({open,setOpen}) => {

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
            padding:windowInnerWidth>500?"65px 40px":20,
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
            <div  className={styles.askContainer}>
                <img src={"/checkEmail.svg"}/>
                <p className={styles.title}>Check <span>e-mail</span></p>
                 <p style={{color:'#566488',fontSize:18,textAlign:'center'}}>An email with a link to enter the partner page was sent to the e-mail specified during registration.
                     If not, please check your spam folder.</p>
            </div>

        </Modal>
    );
};

export default CheckEmailModal;
