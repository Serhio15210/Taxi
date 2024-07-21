import React, {useEffect, useMemo, useState} from 'react';

import countryList from "react-select-country-list";
import AdminLayer from "../../components/AdminLayer/AdminLayer";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import AddNewDestinationModal from "../../components/AddNewDestination/AddNewDestinationModal";
import styles from "../../styles/Admin.module.sass";
import LogoutIcon from "@mui/icons-material/Logout";

import AddIcon from "@mui/icons-material/Add";
import {
    FormControl, InputLabel,
    MenuItem,
    Table,Select,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CompanyDetailModal from "../../components/CompanyDetailModal/CompanyDetailModal";
import {useRouter} from "next/router";
import TransferInfoModal from "../../components/TransferInfoModal/TransferInfoModal";
import {useAdminContext} from "../../providers/AdminProvider";
import Swal from "sweetalert2";
const Transfers = () => {
    const [status,setStatus]=useState('')

    const [openDelete,setOpenDelete]=useState(false)
    const [openAdd,setOpenAdd]=useState(false)
    const [openDetail,setOpenDetail]=useState(false)
    const [openTransferInfo,setOpenTransferInfo]=useState(false)
    const {getBooks,deleteBook}=useAdminContext()
    const [change,setChange] = useState(false)
    const [skip, setSkip] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsLength, setRowsLength] = useState(5)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectItem, setSelectItem] = useState({})
    const deleteSelectItem=()=>{
        deleteBook(selectItem?._id).then(res=>{
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
    const headers=[
        {
            label: '№',
            action: '_id'
        },
        {
            label:'CLIENT NAME',
            action:'name'
        },
        {
            label:'CITY',
            action:'To'
        },
        {
            label:'TRANSFER DATE',
            action:'bookingDate'
        }
        ,
        {
            label:'CATEGORY',
            action:'TypeCar'
        }
        ,
        {
            label:'STATUS',
            action:'Status'
        }
        ,
        {
            label:'COMPANY',
            action:'company'
        }
        ,
        {
            label:'PRICE',
            action:'Price'
        }
        ,
        {
            label:'ACTION',
            action:''
        }
    ]
    const [rows, setRows] = useState([])
    const [filterRows, setFilterRows] = useState([])
    useEffect(()=>{

        getBooks().then(res => {
            setRowsLength(res?.data?.data.length)

        })
    },[change])
    useEffect(() => {
        getBooks({status:status!=='All'?status:'',limit:rowsPerPage,skip:skip}).then(res => {
            // console.log(res)
            setRows(res?.data?.data)
            setFilterRows(res?.data?.data)
        })
        setQuery('')
    }, [status,rowsPerPage,change,skip])
    const [order, setOrder] = useState('ASC')
    const [headerType, setHeaderType] = useState(null)
    const sorting = (col) => {
        if (order === 'ASC') {
            const sorted = [...rows].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1)
            setFilterRows(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...rows].sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
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
    const sortingPassengerInfo = (col) => {

        if (order === 'ASC') {
            const sorted = [...rows].sort((a, b) => a.PassengerDetails[col]?.toLowerCase() > b.PassengerDetails[col]?.toLowerCase() ? 1 : -1)
            setFilterRows(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...rows].sort((a, b) => a.PassengerDetails[col]?.toLowerCase() < b.PassengerDetails[col]?.toLowerCase() ? 1 : -1)
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
    const router=useRouter()

    const [query,setQuery]=useState('')
    const [selectTransfer,setSelectTransfer]=useState({})
        // useEffect(()=>{
        //     status&&status!=='All'?setFilterRows(rows.filter(item=>item.status===status)):setFilterRows(rows)
        //     setQuery('')
        // },[status])
    useEffect(()=>{
         query&&setFilterRows(rows.filter(item=>item?.PassengerDetails?.name.toLowerCase().includes(query.toLowerCase())||item._id.toString().includes(query)))
    },[query])
    return (
        <AdminLayer>
            {openDelete&&<DeleteModal open={openDelete} setOpen={setOpenDelete} change={change} setChange={setChange} deletingItem={selectItem} deleteFunc={deleteSelectItem}/>}
            {openAdd&&<AddNewDestinationModal open={openAdd} setOpen={setOpenAdd}/>}
            {openDetail&&<CompanyDetailModal open={openDetail} setOpen={setOpenDetail} company={selectTransfer}/>}
            {openTransferInfo&&<TransferInfoModal open={openTransferInfo} setOpen={setOpenTransferInfo} transfer={selectTransfer}/>}
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 20, flexDirection: 'row'}}>
                        <div className={styles.headerImg}>
                            <img src={'/transfers.svg'}/>
                        </div>
                        <p className={styles.headerTitle}>Transfers</p>
                    </div>

                    <div className={styles.exitBlock} onClick={()=>router.replace('/')}>
                        <p>Exit</p>
                        <LogoutIcon style={{color: '#A3AEC9'}}/>
                    </div>
                </div>
                <div className={styles.searchRow}>

                    <FormControl fullWidth className={styles.statusSelect}>
                        <InputLabel id="demo-simple-select-label" style={{top:-6}}>Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            style={{height:40,color:'#A3AEC9'}}
                            onChange={(e)=>setStatus(e.target.value)}
                        >
                            <MenuItem value={'Assigned'}>Assigned</MenuItem>
                            <MenuItem value={'Unassigned'}>Unassigned</MenuItem>
                            <MenuItem value={'All'}>All</MenuItem>

                        </Select>
                    </FormControl>
                    <div className={styles.inputButtonRow} style={{justifyContent:'flex-end'}}>
                        <div className={styles.inputSearch}  >
                            <SearchIcon style={{color: '#A3AEC9'}}/>
                            <input placeholder="Search by name or id" value={query} onChange={(e)=>setQuery(e.target.value)}/>
                        </div>
                    <div className={styles.downloadButton} onClick={()=>router.push('/admin/transfers/add-transfer')}>
                        <AddIcon style={{color: 'white'}}/>
                        <p>Add Transfer</p>
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
                                                       item.action==='name'||item.action==='company'?sortingPassengerInfo(item.action):item.action==='bookingDate'||item.action==='To'?sortingBookInfo(item.action): item.action === 'Price'||item.action === '_id'? sortingNumber(item.action) : sorting(item.action)
                                                    } else {
                                                        setHeaderType(item.action)
                                                        item.action==='name'||item.action==='company'?sortingPassengerInfo(item.action):item.action==='bookingDate'||item.action==='To'?sortingBookInfo(item.action):item.action === 'Price'||item.action === '_id'? sortingNumber(item.action) : sorting(item.action)
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
                                    key={row?.id}
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
                                        {row?.PassengerDetails?.name.length>11&&<div className={styles.messageText}>
                                            <img src={"/messagePolygon.svg"} style={{position:'absolute',top:-10}}/>
                                            <p>{row?.PassengerDetails?.name}</p>
                                        </div>}
                                        <p className={styles.transferTableText} style={{width:92}}>{row?.PassengerDetails?.name}</p>
                                    </TableCell>
                                    <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}><p
                                        className={styles.transferTableText}>{row?.BookInfo?.To.value||row?.BookInfo?.To}</p>
                                    </TableCell>
                                    <TableCell scope="row" align="left"
                                               style={{backgroundColor: 'white', borderBottom: 'none'}}>
                                        <p className={styles.transferTableText}>{row?.BookInfo?.bookingTime}  {row?.BookInfo?.bookingDate.split('T')[0]}</p>
                                    </TableCell>
                                    <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}><p
                                        className={styles.transferTableText}>{row?.TypeCar}</p></TableCell>
                                    <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}>

                                        {row?.Status&&<p className={styles.transferTableText} style={{background:row?.Status==='Assigned'?'#D4F3E7':'#FBDDDB',borderRadius:3,color:row?.Status==='Assigned'?'#1FC17F':'#F35046',textAlign:'center',padding:'5px 8px'}}>{row?.Status}</p>}</TableCell>
                                    <TableCell align="left" className={styles.tableCell}>
                                        {row?.BookInfo?.company&&row?.BookInfo?.company.length>11&&<div className={styles.messageText}>
                                            <img src={"/messagePolygon.svg"} style={{position:'absolute',top:-10}}/>
                                            <p>{row?.BookInfo?.company}</p>
                                        </div>}
                                        <p className={styles.transferTableText} style={{color:'#4E7FF1',textDecoration:row.company?'underline':'none',width:98,cursor:'pointer'}} onClick={()=>{
                                            setSelectTransfer(row)
                                            setOpenDetail(true)
                                        }}>{row?.BookInfo?.company||'—'}</p></TableCell>
                                    <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}>

                                        <p className={styles.transferTableText}>€{row?.BookInfo?.Price}</p></TableCell>

                                    <TableCell scope="row" align="left" style={{
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                        backgroundColor: 'white',
                                        borderBottom: 'none'
                                    }}>
                                        <div className={styles.rowContainer}  >
                                            <div className={styles.tableCopyButton}>
                                                <ContentCopyIcon/>
                                                <div className={styles.messageText} style={{maxWidth:'max-content'}}>
                                                    <img src={"/messagePolygon.svg"} style={{position:'absolute',top:-10}}/>
                                                    <p>Copy Stripe code</p>
                                                </div>
                                            </div>
                                            <div className={styles.tableEditButton} onClick={()=>{
                                                setSelectTransfer(row)
                                                setOpenTransferInfo(true)
                                            }}>
                                                <EditOutlinedIcon/>
                                                <div className={styles.messageText}>
                                                    <img src={"/messagePolygon.svg"} style={{position:'absolute',top:-10}}/>
                                                    <p>Edit</p>
                                                </div>
                                            </div>
                                            <div className={styles.tableDeleteButton} onClick={()=>{
                                                setSelectItem(row)
                                                setOpenDelete(true)
                                            }}>
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
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                  rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                  count={rowsLength}
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

export default Transfers;
