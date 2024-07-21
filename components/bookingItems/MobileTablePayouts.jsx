import React from 'react';
import styles from "./OfferItem.module.sass"
const MobileTablePayouts = ({item,first,windowWidth}) => {
    return (
        <div style={{flexDirection:'column',gap:10}} className={styles.mobileTableContainer}>
            {first&&<div   className={styles.headerPayoutMobile}>
                <p style={{ textAlign:'left',textTransform:'uppercase',fontSize:12,color:'#A3AEC9',fontWeight:'700'}}>ride №</p>
                <p style={{minWidth:175,width:'max-content',textTransform:'uppercase',fontSize:12,color:'#A3AEC9',fontWeight:'700'}}>from city to city</p>
                <p style={{minWidth:50,width:'max-content' ,textAlign:'left',textTransform:'uppercase',fontSize:12,color:'#A3AEC9',fontWeight:'700'}}>amount</p>
                <p style={{minWidth:50,width:'max-content' ,textAlign:'center',textTransform:'uppercase',fontSize:12,color:'#A3AEC9',fontWeight:'700'}}>status</p>

            </div>}
            {item.routes.map((item,index)=>{
                return (
                    windowWidth>500?
                    <div style={{backgroundColor:'white',borderRadius:10,padding:25,display:"flex",flexDirection:'row',justifyContent:'space-between',alignItems:'center',maxWidth:490,width:'100%'}}>
                        <p>{item.rideNumber}</p>
                        <p style={{minWidth:175,width:'max-content'}}>{item.route}</p>
                        <p style={{minWidth:50,width:'max-content',backgroundColor:'white',textAlign:'left'}}>{item.amount}</p>
                        <div style={{minWidth:50,width:'max-content',backgroundColor:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <div style={{width:20,height:20,borderRadius:50,background:item.status==='Paid out'?'#2DD792':'#FF9900',border: `7px solid ${item.status==='Paid out'?"#D4F3E7":"#FFD79B"}`}}/>
                        </div>

                    </div>:
                        <div style={{backgroundColor:'white',borderRadius:10,padding:17,display:"flex",flexDirection:'column' ,alignItems:'center',maxWidth:490,width:'100%',gap:10}}>
                            <div className={styles.rowContainer} style={{justifyContent:'space-between',width:'100%',fontSize:14}}>
                                <p style={{color:'#24304F',fontWeight:'600'}}>{item.route}</p>
                                <p style={{color:'#24304F',fontWeight:'700'}}>{item.amount}</p>
                            </div>
                            <div className={styles.rowContainer} style={{justifyContent:'space-between',width:'100%',fontSize:14}}>
                            <div className={styles.rowContainer} style={{gap:20,fontSize:14}}>
                                <div style={{width:20,height:20,borderRadius:50,background:item.status==='Paid out'?'#2DD792':'#FF9900',border: `7px solid ${item.status==='Paid out'?"#D4F3E7":"#FFD79B"}`}}/>
                                 <p style={{color:item.status==='Paid out'?'#2DD792':'#FF9900',textTransfrom:'capitalize'}}>{item.status}</p>

                            </div>
                                <p style={{color:'#A3AEC9'}}>№{item.rideNumber}</p>
                            </div>

                        </div>
                )
            })}
        </div>
    );
};

export default MobileTablePayouts;
