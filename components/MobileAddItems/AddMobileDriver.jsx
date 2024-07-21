import React from 'react';
import styles from "./MobileAddItems.module.sass";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";

const AddMobileDriver = ({item,deleteSelectDriver}) => {
    return (
        <div className={styles.itemContainer}>
            <div className={styles.itemRow}>
                <p className={styles.itemInfo}>NAME</p>
                <p className={styles.itemText} >{item?.FullName}</p>
            </div>
            <div className={styles.itemRow}>
                <p className={styles.itemInfo}>PHONE NUMBER</p>
                <p className={styles.itemText} >{item?.Phone}</p>
            </div>
            <div className={styles.itemRow}>
                <p className={styles.itemInfo}>EMAIL</p>
                <a className={styles.itemText} style={{color:'#4E7FF1'}}>{item?.Email}</a>
            </div>

            <div className={styles.itemRow}>
                <p className={styles.itemInfo}>STATE</p>
                <div style={{display:'flex',flexDirection:'row',gap:20 ,alignItems:'flex-end',justifyContent:'center'}}>
                    <div style={{width:20,height:20,borderRadius:50,background:item?.Status==='Verified'?'#2DD792':'#FF9900',border: `7px solid ${item?.Status==='Verified'?"#D4F3E7":"#FFD79B"}`}}/>
                    <p style={{color:item?.Status==='Verified'?'#2DD792':'#FF9900',textTransfrom:'capitalize'}}>{item?.Status}</p> </div>
            </div>
            <div style={{display:'flex',flexDirection:'row',gap:15 ,alignItems:'flex-end',justifyContent:'center'}}>
                <Link href={`/home/driver/${item?._id}`}><div className={styles.actionItem}  ><EditOutlinedIcon style={{color:'#566488',cursor:'pointer'}}/></div></Link>
                <div className={styles.actionItem} onClick={()=>deleteSelectDriver(item?._id)}><DeleteOutlineIcon style={{color:'#566488',cursor:'pointer'}}/></div>
            </div>
        </div>
    );
};

export default AddMobileDriver;
