import React,{useEffect, useState} from 'react';

import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./TransfersCompanyModal.module.sass";
import {Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TablePagination from "@mui/material/TablePagination";

const TransfersCompanyModal = ({open,setOpen}) => {
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const [upcoming,setUpcoming]=useState(true)

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
    const headers=[
        {
            label: '№',
            action: 'id'
        },
        {
            label:'DATE, TIME',
            action:'dateTime'
        },
        {
            label:'PRICE',
            action:'orice'
        },

    ]
    const [rows, setRows] = useState([{
        id: 255,
        dateTime: '16/07/2022 14:25',
        price:125
    },
        {
            id: 256,
            dateTime: '16/07/2022 18:30',
            price:110
        },{
            id: 257,
            dateTime: '18/07/2022 12:30',
            price:180
        },])
    const [order, setOrder] = useState('ASC')
    const [headerType, setHeaderType] = useState(null)
    const sorting = (col) => {
        if (order === 'ASC') {
            const sorted = [...rows].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1)
            setRows(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...rows].sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
            setRows(sorted)
            setOrder('ASC')
        }
    }
    const sortingNumber = (col) => {
        if (order === 'ASC') {
            const sorted = [...rows].sort((a, b) => a[col] > b[col] ? 1 : -1)
            setRows(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...rows].sort((a, b) => a[col] < b[col] ? 1 : -1)
            setRows(sorted)
            setOrder('ASC')
        }
    }
    return (
        <Modal isOpen={open}
               onRequestClose={() => setOpen(prev => false)}
               style={customStyles}
               ariaHideApp={false}  >
            <CloseIcon style={{position:'absolute',top:20,right:20,color:windowInnerWidth>500?'white':'#566488',fontSize:38,cursor:'pointer'}} onClick={()=>setOpen(false)}/>
            <div className={styles.transfersDetailContainer}>
                <p className={styles.title}>Transfers Company №152</p>
                <div style={{display:'flex',flexDirection:'row',width:'100%',marginTop:40}}>
                    <p style={{width:'100%',paddingBottom:18,borderBottom:upcoming?'3px solid #4E7FF1':'1px solid rgba(0, 0, 0, 0.1)',color:upcoming?'#4E7FF1':'#566488',textAlign:'center',fontWeight:'700'}} onClick={()=>setUpcoming(true)}>UPCOMING</p>
                    <p style={{width:'100%',paddingBottom:18,borderBottom:!upcoming?'3px solid #4E7FF1':'1px solid rgba(0, 0, 0, 0.1)',color:!upcoming?'#4E7FF1':'#566488',textAlign:'center',fontWeight:'700'}} onClick={()=>setUpcoming(false)}>PAST</p>
                </div>
                <TableContainer   >
                    <Table sx={{
                        maxWidth:1440,
                        width:'100%',
                        boxShadow: 'none',
                        backgroundColor: 'none',
                        borderSpacing: '0 15px',
                        borderCollapse: 'separate'
                    }} style={{boxShadow: 'none'}} aria-label="simple table">
                        <TableHead sx={{backgroundColor: 'white', boxShadow: 'none', borderBottom: 'none'}}>
                            <TableRow style={{borderBottom: 'none'}}>
                                {headers.map((item,index)=>{
                                    return (
                                        <TableCell align="left" key={item.action}
                                                   style={{borderBottom: 'none', color: headerType===item.action?'#566488':'#A3AEC9', fontWeight: '700'}}>
                                            <div className={styles.rowContainer} style={{gap:10,cursor:'pointer'}} onClick={(prev) => {
                                                if (item.action){
                                                    if (headerType === prev) {
                                                        item.action === 'price'||item.action === 'id'? sortingNumber(item.action) : sorting(item.action)
                                                    } else {
                                                        setHeaderType(item.action)
                                                        item.action === 'price'||item.action === 'id'? sortingNumber(item.action) : sorting(item.action)
                                                    }
                                                }
                                            }}><p style={{whiteSpace:"nowrap",fontSize:12}} >{item.label}</p>
                                                {item.action&&<div style={{display: 'flex', flexDirection: 'column'}}><KeyboardArrowUpIcon
                                                    style={{fontSize: 12,color:headerType===item.action?order==='ASC'?'#A3AEC9':'#566488':'#A3AEC9'}}/><KeyboardArrowDownIcon style={{fontSize: 12,color:headerType===item.action?order!=='ASC'?'#A3AEC9':'#566488':'#A3AEC9'}}/>
                                                </div>}
                                            </div>
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody style={{background: 'white'}}>
                            {rows.map((row) => (
                                <TableRow
                                    style={{background: 'white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.02)'}}
                                    key={row?.id}
                                >
                                    <TableCell component="th" scope="row" style={{
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10,
                                        backgroundColor: '#F1F5FF',
                                        borderBottom: 'none'
                                    }}>
                                        <p style={{color: '#566488'}}>{row.id}</p>
                                    </TableCell>
                                    <TableCell component="th" scope="row"
                                               className={styles.tableCell}>

                                        <p className={styles.transferTableText} style={{color:'#4E7FF1',textDecoration:'underline',width:'max-content'}}>{row.dateTime}</p>
                                    </TableCell>

                                    <TableCell scope="row" align="left" style={{
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                        backgroundColor: '#F1F5FF',
                                        borderBottom: 'none'
                                    }}>
                                        <p className={styles.transferTableText}>€{row.price}</p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
        </Modal>
    );
};

export default TransfersCompanyModal;
