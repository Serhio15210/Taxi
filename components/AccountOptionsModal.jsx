import React, {useEffect, useState} from 'react';

import {useRouter} from "next/router";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./HomeLayer/HomeLayer.module.sass";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";


const AccountOptionsModal = ({open,setOpen}) => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');

    const router=useRouter()
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
            background: 'rgba(36, 48, 79, 0.8)',
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
                <div style={{width:'100%',height:'100%'}} onClick={()=>setOpen(false)}>
                    <div style={{background:'white',padding:'20px 40px',position:'absolute',width:'100%',bottom:0,left:0,display:'flex',gap:30,flexDirection:'column'}}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
                            <div>
                                <p style={{color:' #24304F',fontWeight:'600',fontSize:20}}>Lucas Bernard</p>
                                <p style={{fontSize:15,color:'#9BA5C0'}}>info@gmail.com</p>
                            </div>
                            <div style={{maxWidth:45,width:45,height:45,borderRadius:50,backgroundColor:'#2DD792',display:'flex',alignItems:'center',justifyContent:'center',color:'white',textAlign:'center'}}>
                                <p style={{color:'white',textAlign:'center'}}>L</p>
                            </div>
                        </div>
                        <div style={{width:'100%',display:'flex',flexDirection:'column',gap:20}}>

                            <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:15,borderBottom:'1px solid rgba(139, 151, 183, 0.21)',paddingBottom:20}} onClick={()=>router.push('/account')}>
                                <PersonOutlineIcon style={{color:'#A3AEC9'}}/>
                                <p style={{color:'#566488'}}>My account</p>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:15}}>
                                <PowerSettingsNewIcon style={{color:'#A3AEC9'}}/>
                                <p style={{color:'#566488'}}>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>

        </Modal>
    );
};

export default AccountOptionsModal;
