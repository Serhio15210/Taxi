import React,{useEffect, useState} from 'react';

import AdminLayer from "../../components/AdminLayer/AdminLayer";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import AddNewDestinationModal from "../../components/AddNewDestination/AddNewDestinationModal";
import CompanyDetailModal from "../../components/CompanyDetailModal/CompanyDetailModal";
import styles from "../../styles/Admin.module.sass";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from '@mui/icons-material/Close';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table, TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead,
    TableRow
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TablePagination from "@mui/material/TablePagination";
import {useRouter} from "next/router";
import CompanyPayoutsModal from "../../components/CompanyPayouts/CompanyPayoutsModal";
import TransfersCompanyModal from "../../components/TransfersCompanyModal/TransfersCompanyModal";
import Swal from "sweetalert2";
import {useAdminContext} from "../../providers/AdminProvider";

const Companies = () => {
    const [status,setStatus]=useState('')
    const router=useRouter()
    const [openDelete,setOpenDelete]=useState(false)
    const [openCompanyDetail,setOpenCompanyDetail]=useState(false)
    const [openDetail,setOpenDetail]=useState(false)
    const {getCompanies,deleteCompany,changeCompanyStatus}=useAdminContext()
    const [change,setChange] = useState(false)
    const [skip, setSkip] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsLength, setRowsLength] = useState(5)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectItem, setSelectItem] = useState({})
    const [rows, setRows] = useState([])
    const [filterRows,setFilterRows]=useState([])
    const [order, setOrder] = useState('ASC')
    const [headerType, setHeaderType] = useState(null)
    const [banedItems,setBanedItems]=useState([])
    const deleteSelectItem=()=>{
        deleteCompany(selectItem?._id).then(res=>{
            console.log(res)
            if (res?.status==='succes'){
                setChange(!change)
                Swal.fire(
                  {
                      title: `Deleted`,
                      confirmButtonColor: 'rgba(83, 233, 80, 1)',
                      icon: "success",
                      background: 'white'
                  })
                setOpenDelete(false)
            }
        })
    }
    const changeStatus=(_id,status)=>{
        changeCompanyStatus(_id,status).then(res=>{
            if (res?.status==='succes'){
                setChange(!change)
            }
        })
    }
    const headers=[
        {
            label: '№',
            action: '_id'
        },
        {
            label:'COMPANY NAME',
            action:'companyName'
        },
        {
            label:'CITY',
            action:'city'
        },
        {
            label:'TRANSFERS',
            action:'transfers'
        }
        ,
        {
            label:'STATUS',
            action:'Status'
        }
        ,
        {
            label:'PROFIT',
            action:'profit'
        },
        {
            label:'PAYOUTS',
            action:'payouts'
        }

        ,
        {
            label:'ACTION',
            action:''
        }
    ]

    const sorting = (col) => {
        if (order === 'ASC') {
            const sorted = [...filterRows].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1)
            setFilterRows(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...filterRows].sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
            setFilterRows(sorted)
            setOrder('ASC')
        }
    }
    const sortingBookInfo = (col) => {

        if (order === 'ASC') {
            const sorted = [...rows].sort((a, b) => a.BookInfo[col]?.toLowerCase() > b.BookInfo[col]?.toLowerCase() ? 1 : -1)
            setFilterRows(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...rows].sort((a, b) => a.BookInfo[col]?.toLowerCase() < b.BookInfo[col]?.toLowerCase() ? 1 : -1)
            setFilterRows(sorted)
            setOrder('ASC')
        }
    }
    const sortingCompanyInfo = (col) => {

        if (order === 'ASC') {
            const sorted = [...rows].sort((a, b) => a.AboutCompany[col]?.toLowerCase() > b.AboutCompany[col]?.toLowerCase() ? 1 : -1)
            setFilterRows(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...rows].sort((a, b) => a.AboutCompany[col]?.toLowerCase() < b.AboutCompany[col]?.toLowerCase() ? 1 : -1)
            setFilterRows(sorted)
            setOrder('ASC')
        }
    }
    const sortingNumber = (col) => {

        if (order === 'ASC') {
            const sorted = [...rows].sort((a, b) => a[col] > b[col] ? 1 : -1)

            setFilterRows(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...rows].sort((a, b) => a[col] < b[col] ? 1 : -1)

            setFilterRows(sorted)
            setOrder('ASC')
        }
    }


    const handleChangePage = (event, newPage) => {

        setPage(newPage);
        newPage>page?setSkip(rowsPerPage):setSkip((prev)=>prev-rowsPerPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [query,setQuery]=useState('')

    useEffect(()=>{

        getCompanies().then(res => {
            setRowsLength(res?.data?.data.length)

        })
    },[change])
    useEffect(()=>{
        getCompanies({status:status!=='All'?status:'',limit:rowsPerPage,skip:skip}).then(res => {
            // console.log(res)
            setRows(res?.data?.data)
            setFilterRows(res?.data?.data)
        })
        setQuery('')
    },[status,change,skip,rowsPerPage])
    useEffect(()=>{
        query&&setFilterRows(rows.filter(item=>item?.AboutCompany?.companyName.toLowerCase().includes(query.toLowerCase())||item?._id.toString().includes(query)))
    },[query])
    return (
        <AdminLayer>
            {openDelete&&<DeleteModal open={openDelete} setOpen={setOpenDelete} deleteFunc={deleteSelectItem} deletingItem={selectItem} setChange={setChange} change={change}/>}
            {openCompanyDetail&&<TransfersCompanyModal open={openCompanyDetail} setOpen={setOpenCompanyDetail}/>}

            {openDetail&&<CompanyPayoutsModal open={openDetail} setOpen={setOpenDetail}/>}
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 20, flexDirection: 'row'}}>
                        <div className={styles.headerImg}>
                            <img src={'/companies.svg'}/>
                        </div>
                        <p className={styles.headerTitle}>Companies</p>
                    </div>

                    <div className={styles.exitBlock} onClick={()=>router.replace('/')}>
                        <p>Exit</p>
                        <LogoutIcon style={{color: '#A3AEC9'}}/>
                    </div>
                </div>
                <div className={styles.searchRow}>

                    <FormControl fullWidth className={styles.statusSelect} style={{height:40}}>
                        <InputLabel id="demo-simple-select-label" style={{top:-6}}>Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            style={{height:40,color:'#A3AEC9'}}
                            onChange={(e)=>setStatus(e.target.value)}
                        >
                            <MenuItem value={'Panding'}>Panding</MenuItem>
                            <MenuItem value={'Active'}>Accepted</MenuItem>
                            <MenuItem value={'Banned'}>Banned</MenuItem>
                            <MenuItem value={'All'}>All</MenuItem>

                        </Select>
                    </FormControl>
                    <div className={styles.inputButtonRow} style={{justifyContent:'flex-end'}}>
                        <div className={styles.inputSearch}  >
                            <SearchIcon style={{color: '#A3AEC9'}}/>
                            <input placeholder="Search by name,id" value={query} onChange={(e)=>setQuery(e.target.value)}/>
                        </div>
                        <div className={styles.downloadButton} onClick={()=>router.push('/admin/companies/add-company')} >
                            <AddIcon style={{color: 'white'}}/>
                            <p>Add Company</p>
                        </div>
                    </div>
                </div>
                <TableContainer  style={{marginTop:40}}>
                    <Table sx={{
                        minWidth:700,
                        maxWidth:1440,
                        width:'100%',
                        boxShadow: 'none',
                        backgroundColor: 'none',
                        borderSpacing: '0 15px',
                        borderCollapse: 'separate'
                    }} style={{boxShadow: 'none'}} aria-label="simple table">
                        <TableHead sx={{backgroundColor: '#F1F5FF', boxShadow: 'none', borderBottom: 'none'}}>
                            <TableRow style={{borderBottom: 'none'}}>
                                {headers.map((item,index)=>{
                                    return (
                                        <TableCell align="left" key={item.action}
                                                   style={{borderBottom: 'none', color: headerType===item.action?'#566488':'#A3AEC9', fontWeight: '700'}}>
                                            <div className={styles.rowContainer} style={{gap:10,cursor:'pointer'}} onClick={(prev) => {
                                                if (item.action){
                                                    if (headerType === prev) {
                                                        item.action==='companyName'||item.action==='city'?sortingCompanyInfo(item.action):item.action === 'profit'||item.action === 'id'? sortingNumber(item.action) : sorting(item.action)
                                                    } else {
                                                        setHeaderType(item.action)
                                                        item.action==='companyName'||item.action==='city'?sortingCompanyInfo(item.action):item.action === 'profit'||item.action === 'id'? sortingNumber(item.action) : sorting(item.action)
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
                            {filterRows?.map((row) => (
                                <TableRow
                                    style={{background: 'white', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.02)'}}
                                    key={row?._id}
                                >
                                    <TableCell component="th" scope="row" style={{
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10,
                                        backgroundColor: 'white',
                                        borderBottom: 'none'
                                    }}>
                                        <p style={{color: '#566488'}}>{row?._id}</p>
                                    </TableCell>
                                    <TableCell component="th" scope="row"
                                               className={styles.tableCell}>
                                        {row?.AboutCompany?.companyName?.length>11&&<div className={styles.messageText}>
                                            <img src={"/messagePolygon.svg"} style={{position:'absolute',top:-10}}/>
                                            <p >{row?.AboutCompany?.companyName}</p>
                                        </div>}
                                        <p className={styles.transferTableText} style={{width:92,color:'#4E7FF1',textDecoration:'underline'}}>{row?.AboutCompany?.companyName}</p>
                                    </TableCell>
                                    <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}><p
                                        className={styles.transferTableText}>{row?.AboutCompany?.city}</p>
                                    </TableCell>
                                    <TableCell scope="row" align="left"
                                               style={{backgroundColor: 'white', borderBottom: 'none'}}>
                                        <p className={styles.transferTableText} style={{color:'#4E7FF1',textDecoration:row?.transfers>0?'underline':'none',cursor:'pointer'}} onClick={()=>row?.transfers>0&&setOpenCompanyDetail(true)}>{row?.transfers>0?row?.transfers:'—'}</p>
                                    </TableCell>

                                    <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}>

                                        <p className={styles.transferTableText} style={{background:row?.Status==='Active'?'#D4F3E7':'#FFEED5',borderRadius:3,color:row?.Status==='Active'?'#1FC17F':'#FF9900',textAlign:'center',padding:'5px 8px'}}>{row?.Status}</p></TableCell>
                                    <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}><p
                                        className={styles.transferTableText}>{row?.profit>0?`€${row?.profit}`:'—'}</p></TableCell>
                                    <TableCell align="center" className={styles.tableCell}>

                                        {row.payouts?<div className={styles.exitBlock} style={{textAlign:'center' }} onClick={()=>setOpenDetail(true)}>
                                             <p>Show</p>
                                         </div>:'—'}
                                    </TableCell>

                                    <TableCell scope="row" align="left" style={{
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                        backgroundColor: 'white',
                                        borderBottom: 'none'
                                    }}>
                                        <div className={styles.rowContainer}  >
                                            <div className={styles.exitBlock} style={{background:banedItems.includes(row.id)?'#E7EBF8':'transparent',gap:5,padding:'10px 15px',width:78,marginRight:5 }} onClick={()=>{
                                                changeStatus(row?._id,row?.Status==='Banned'?"Panding":row?.Status==='Panding'?'Active':'Banned')
                                            }}>
                                                <p>{row?.Status==='Banned'?'Unban':row?.Status==='Panding'?'Activate':'Ban'}</p>
                                                {row?.Status!=='Banned'&&row?.Status!=='Panding'&&<CloseIcon style={{fontSize:18}}/>}
                                            </div>
                                            <div className={styles.tableEditButton}>
                                                <EditOutlinedIcon/>
                                                <div className={styles.messageText}>
                                                    <img src={"/messagePolygon.svg"} style={{position:'absolute',top:-10}}/>
                                                    <p>Edit</p>
                                                </div>
                                            </div>
                                            <div className={styles.tableDeleteButton} onClick={()=>setOpenDelete(true)}>
                                                <DeleteOutlineOutlinedIcon/>
                                                <div className={styles.messageText}>
                                                    <img src={"/messagePolygon.svg"} style={{position:'absolute',top:-10}}/>
                                                    <p>Delete</p>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter  >
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',

                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />

                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </AdminLayer>
    );
};

export default Companies;
