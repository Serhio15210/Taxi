import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import Modal from 'react-modal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import 'react-calendar/dist/Calendar.css'
import CloseIcon from '@mui/icons-material/Close';
import {useTaxiContext} from "../../pages/_app";
const CalendarModal = ({open, setOpen,date,setDate}) => {
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
            padding:"60px 40px",
            background: "rgba(36, 48, 79, 0.8)",
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
            <CloseIcon style={{position:'absolute',top:20,right:20,color:'white',fontSize:38,cursor:'pointer'}} onClick={()=>setOpen(false)}/>
            <div  >

                <Calendar onChange={(e)=>{

                    setDate(e)
                    setOpen(false)
                }} value={date} calendarType='US'  nextLabel={<ArrowForwardIcon/>} prevLabel={<ArrowBackIcon style={{margin:0}}/>} />

            </div>

        </Modal>
    );
};

export default CalendarModal;
