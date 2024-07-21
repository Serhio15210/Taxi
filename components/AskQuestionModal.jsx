import React, {useEffect, useState} from 'react';

import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./AskQuestionModal.module.sass"
const AskQuestionModal = ({open,setOpen}) => {

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
            <div  className={styles.askContainer}>
                <p className={styles.title}>Ask a <span>Question</span></p>
                <input placeholder="Your Name"/>
                <input placeholder="E-mail*"/>
                <textarea placeholder="Your question*"/>
                <div className={styles.askButton}>
                    <p style={{display:'flex',alignItems:'center',gap:10}}>SEND <ArrowForwardIcon/></p>
                </div>
            </div>

        </Modal>
    );
};

export default AskQuestionModal;
