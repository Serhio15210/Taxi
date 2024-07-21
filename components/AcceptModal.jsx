import React, {useEffect, useState} from 'react';
import styles from "./AskQuestionModal.module.sass"
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Modal from "react-modal";
import WestIcon from '@mui/icons-material/West';
const AcceptModal = ({open,setOpen}) => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');

    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)

    }, [])
    const customStyles = {
        overlay: {
            zIndex: 100,
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
                <img src={"/accept.svg"}/>
                <p className={styles.title} style={{textAlign:'center'}}>You have <span>accepted</span> the order</p>

                <div className={styles.askButton} onClick={()=>setOpen(false)}>
                    <p style={{display:'flex',alignItems:'center',gap:10,textTransform:'uppercase'}}><WestIcon/>back to order list </p>
                </div>
            </div>

        </Modal>
    );
};

export default AcceptModal;
