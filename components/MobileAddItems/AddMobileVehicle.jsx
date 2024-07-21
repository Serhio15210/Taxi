import React from 'react';
import styles from "./MobileAddItems.module.sass"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";
const AddMobileVehicle = ({item,deleteSelectVehicle}) => {
    return (
        <div className={styles.itemContainer}>
            <div className={styles.itemRow}>
                <p className={styles.itemInfo}>NAME</p>
                <p className={styles.itemText} >{item?.BrandModel}</p>
            </div>
            <div className={styles.itemRow}>
                <p className={styles.itemInfo}>YEAR</p>
                <p className={styles.itemText} >{item?.Year}</p>
            </div>
            <div className={styles.itemRow}>
                <p className={styles.itemInfo}>LICENSE PLATE</p>
                <p className={styles.itemText} >{item?.License}</p>
            </div>
            <div className={styles.itemRow}>
                <p className={styles.itemInfo}>COLOR</p>
                <p className={styles.itemText} >{item?.Color}</p>
            </div>
            <div className={styles.itemRow}>
                <p className={styles.itemInfo}>CAR TYPE</p>
                <p className={styles.itemText} >{item?.Class}</p>
            </div>
            <div className={styles.itemRow}>
                <p className={styles.itemInfo}>STATE</p>
                <div style={{display:'flex',flexDirection:'row',gap:20 ,alignItems:'flex-end',justifyContent:'center'}}>
                    <div style={{width:20,height:20,borderRadius:50,background:item.state==='Verified'?'#2DD792':'#FF9900',border: `7px solid ${item?.Status==='Verified'?"#D4F3E7":"#FFD79B"}`}}/>
                    <p style={{color:item?.Status==='Verified'?'#2DD792':'#FF9900',textTransfrom:'capitalize'}}>{item?.Status}</p> </div>
            </div>
            <div style={{display:'flex',flexDirection:'row',gap:15 ,alignItems:'flex-end',justifyContent:'center'}}>
                <Link href={`/home/vehicle/${item?._id}`}><div className={styles.actionItem}><EditOutlinedIcon style={{color:'#566488',cursor:'pointer'}}/></div></Link>
                <div className={styles.actionItem} onClick={()=>{
                    deleteSelectVehicle(item?._id)
                }}><DeleteOutlineIcon style={{color:'#566488',cursor:'pointer'}}/></div>
            </div>
        </div>
    );
};

export default AddMobileVehicle;
