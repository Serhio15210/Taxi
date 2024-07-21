import React,{useEffect, useState} from 'react';

import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-modal";
import styles from "./CompanyPayoutsModal.module.sass"
const CompanyPayoutsModal = ({open,setOpen}) => {
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
    const payouts=[{
        date:'20 July, 2022',
        price:490,
        routes:[
            {
                name:'Nice → Monaco → Nice',
                status:'Pending',
                cost: 340,
                number:'№ 56456'

            },
            {
                name:'Nice → Saint Tropez',
                status:'Paid out',
                cost: 150,
                number:'№ 56451'

            }
        ]
    },
        {
            date:'19 July, 2022',
            price:830,
            routes:[
                {
                    name:'Nice → Milan',
                    status:'Paid out',
                    cost: 170,
                    number:'№ 56402'

                },
                {
                    name:'Nice → Paris',
                    status:'Paid out',
                    cost: 210,
                    number:'№ 56328'

                },
                {
                    name:'Nice → Paris',
                    status:'Paid out',
                    cost: 210,
                    number:'№ 56328'

                },
                {
                    name:'Nice → Paris',
                    status:'Paid out',
                    cost: 210,
                    number:'№ 56328'

                },
                {
                    name:'Nice → Paris',
                    status:'Paid out',
                    cost: 210,
                    number:'№ 56328'

                },
                {
                    name:'Nice → Paris',
                    status:'Paid out',
                    cost: 210,
                    number:'№ 56328'

                },
                {
                    name:'Nice → Paris',
                    status:'Paid out',
                    cost: 210,
                    number:'№ 56328'

                }
            ]
        }]
    return (
        <Modal isOpen={open}
               onRequestClose={() => setOpen(prev => false)}
               style={customStyles}
               ariaHideApp={false}  >
            <CloseIcon style={{position:'absolute',top:20,right:20,color:windowInnerWidth>500?'white':'#566488',fontSize:38,cursor:'pointer'}} onClick={()=>setOpen(false)}/>
            <div className={styles.payoutsContainer}>
                <p className={styles.title}>Payouts</p>
                <div className={styles.payoutsItemsBlock}>
                    {payouts.map((item,index)=>{
                        return (
                            <div key={index}>
                                <div className={styles.itemHeaderRow}>
                                    <p>{item.date}</p>
                                    <p style={{color:'#566488',fontSize:18,fontWeight:400}}>€{item.price}</p>
                                </div>
                                <div className={styles.itemPayoutsBlock}>
                                    {item.routes.map((route,index)=>{
                                        return (
                                            <div key={index} className={styles.routeItem}>
                                                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                    <p style={{color:'#24304F',fontWeight:'700'}}>{route.name}</p>
                                                    <p style={{color:'#24304F',fontWeight:'700'}}>€{route.cost}</p>
                                                </div>
                                                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                                    <div style={{display:'flex',flexDirection:'row',gap:10 ,alignItems:'flex-end',justifyContent:'center'}}>
                                                        <div style={{width:20,height:20,borderRadius:50,background:route.status==='Paid out'?'#2DD792':'#FF9900',border: `7px solid ${route.status==='Paid out'?"#D4F3E7":"#FFD79B"}`}}/>
                                                        <p style={{color:route.status==='Paid out'?'#2DD792':'#FF9900',textTransfrom:'capitalize'}}>{route.status}</p> </div>
                                                    <p style={{color:'#A3AEC9',fontSize:14}}>{route.number}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Modal>
            );
};

export default CompanyPayoutsModal;
