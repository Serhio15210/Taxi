import React, {useEffect, useState} from 'react';

import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./TransferInfoModal.module.sass";
import 'react-phone-input-2/lib/material.css'
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteModal from "../DeleteModal/DeleteModal";
import {useRouter} from "next/router";
const TransferInfoModal = ({open, setOpen,transfer}) => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const [openDelete,setOpenDelete]=useState(false)
    const [returnTrip,setReturnTrip]=useState(false)
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
            width: '100%',
            height: '100%',
            padding: windowInnerWidth > 500 ? "60px 40px" : 20,
            background: windowInnerWidth > 500 ? 'rgba(36, 48, 79, 0.8)' : 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',


        },
    };
    return (
        <Modal isOpen={open}
               onRequestClose={() => setOpen(prev => false)}
               style={customStyles}
               ariaHideApp={false}>
            {openDelete&&<DeleteModal open={openDelete} setOpen={setOpenDelete}/>}
            <CloseIcon style={{
                position: 'absolute',
                top: 20,
                right: 20,
                color: windowInnerWidth > 500 ? 'white' : '#566488',
                fontSize: 38,
                cursor: 'pointer'
            }} onClick={() => setOpen(false)}/>
            <div className={styles.transferInfoContainer}>
                <div className={styles.firstBlock}>
                    <p className={styles.title}>Transfers №{transfer.id}</p>
                    <p style={{color: '#566488'}}>{transfer.transferDate}</p>
                    <div className={styles.route}>
                        <div className={styles.firstRoute}><img src={"/routeCircle.svg"}
                                                                className={styles.routeImgTop}/>
                            <div className={styles.from}>
                                <p className={styles.to}>Nice Côte d`Azur Airport (NCE), Rue Costes et Bellonte, 06206
                                    Nice France</p>

                            </div>

                        </div>
                        <div className={styles.lastRoute}><img src={"/routeCircleLast.svg"}
                                                               className={styles.routeImgLast}/>
                            <p className={styles.to}>Costes et Bellonte</p>

                        </div>
                    </div>

                    <div className={styles.passengerInfo}>
                        <p className={styles.transferTimeTitle}>Passenger information:</p>
                        <div className={styles.countPassengerInfo} style={{gap: 30}}>
                            <div className={styles.rowContainer} style={{gap: 15, color: '#24304F', fontWeight: '600'}}>
                                <GroupIcon style={{color: '#A3AEC9'}}/>
                                <p>2 persons</p>
                            </div>
                            <div className={styles.rowContainer} style={{gap: 15, color: '#24304F', fontWeight: '600'}}>
                                <WorkIcon style={{color: '#A3AEC9'}}/>
                                <p>3 bags</p>
                            </div>
                            <div className={styles.rowContainer} style={{gap: 15, color: '#24304F', fontWeight: '600'}}>
                                <img src={"/car.svg"}/>
                                <p>Economy</p>
                            </div>
                        </div>
                        <div className={styles.passengerMessage}>
                            <p className={styles.title}>Message:</p>
                            <p>Nous aurons un chien de petite taille calme dans un sac de transport</p>
                        </div>

                        <div className={styles.rowContainer} style={{gap: 25}}>
                            <img src={'/document.svg'}/>
                            <div>
                                <p style={{fontWeight: '600', color: '#24304F'}}>Meet me with a sign</p>
                                <p style={{color: '#566488', marginTop: 5}}>Airport Sign: Ann Wolf</p>
                            </div>
                        </div>
                        <div className={styles.rowContainer} style={{gap: 25}}>
                            <img src={'/child.svg'}/>
                            <div>
                                <p style={{fontWeight: '600', color: '#24304F'}}>I require a child seat</p>

                            </div>
                        </div>
                        <div className={styles.rowContainer} style={{gap: 25}}>
                            <img src={'/bottle.svg'}/>
                            <div>
                                <p style={{fontWeight: '600', color: '#24304F'}}>A bottle of water: 1</p>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.secondBlock}>
                    <p className={styles.title}>Passenger information:</p>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                        <p style={{fontWeight: '600', color: '#24304F'}}>{transfer.name}</p>
                        <p style={{color: '#566488'}}>1-(618)312-3065</p>
                        <p style={{color: '#4E7FF1', textDecoration: 'underline'}}>example@gmail.com</p>
                    </div>
                </div>
                <div className={styles.secondBlock}>
                    <p className={styles.title}>Company:</p>
                    <div className={styles.rowContainer} style={{gap:25}}>
                    <p style={{color: '#4E7FF1', textDecoration: 'underline'}}>{transfer.company}</p>
                        <div className={styles.grayButton}>
                            <p>Unassign</p>

                        </div>
                    </div>
                </div>
                <div className={styles.secondBlock} style={{border:'none'}}>
                    <p className={styles.title}>Price:</p>
                    <div className={styles.rowContainer} style={{gap:25}}>
                        <p style={{fontWeight: '600', color: '#24304F',fontSize:24}}>€ {transfer.price}</p>
                        <div className={styles.grayButton}>
                            <p>Generate Invoice</p>
                            <ChevronRightIcon/>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonsRow}>
                    <div className={styles.grayButton} style={{background: '#2DD792',
                        boxShadow: '0px 10px 40px rgba(45, 215, 146, 0.22)',color:'white',maxWidth:100,width:'100%',gap:5}} onClick={()=>{
                            router.push(`/admin/transfers/${transfer.id}`,)
                        setOpen(false)
                    }}>
                        <ModeEditOutlineOutlinedIcon style={{fontSize:18}}/>
                        <p style={{color:'white'}}>Edit</p>
                    </div>
                    <div className={styles.grayButton} style={{background: '#F35046',
                        boxShadow: '0px 10px 40px rgba(243, 80, 70, 0.22)',color:'white',maxWidth:100,width:'100%'}} onClick={()=>setOpenDelete(true)}>
                        <DeleteOutlineOutlinedIcon style={{fontSize:18}}/>
                        <p style={{color:'white'}}>Delete</p>
                    </div>
                </div>
            </div>

        </Modal>
    );
};

export default TransferInfoModal;
