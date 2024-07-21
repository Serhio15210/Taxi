import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/Admin.module.sass";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminLayer from "../../components/AdminLayer/AdminLayer";
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EnhancedTable from "../../components/EnhancedTable";
import TablePagination from "@mui/material/TablePagination";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useRouter} from "next/router";
import XLSX from 'xlsx'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const Clients = () => {
    const tableRef = useRef(null);
    const headers=[
        {
            label: '№',
            action: 'id'
        },
        {
            label:'FULL NAME',
            action:'name'
        },
        {
            label:'PHONE',
            action:'phone'
        },
        {
            label:'TRANSFERS',
            action:'transfers'
        }
        ,
        {
            label:'LAST TRANSFER',
            action:'lastTransfer'
        }
        ,
        {
            label:'REGISTER DATE',
            action:'registration'
        }
        ,
        {
            label:'EMAIL',
            action:'email'
        }
    ]
    const [clients, setClients] = useState([{
        id: '123',
        name: 'Adam Denisov',
        phone: '1-(618)312-3065',
        transfers: 8,
        lastTransfer: '19:40 25/09/2022',
        registration: '12:15 24/09/2022',
        email: 'example@gmail.com'
    }, {
        id: '214',
        name: 'Alexa Richardson',
        phone: '7-(648)993-5934',
        transfers: 24,
        lastTransfer: '20:08 18/09/2022',
        registration: '13:24 18/09/2022',
        email: 'test@gmail.com'
    }, {
        id: '215',
        name: 'Alexa Richardson',
        phone: '7-(648)993-5934',
        transfers: 24,
        lastTransfer: '20:08 18/09/2022',
        registration: '13:24 18/09/2022',
        email: 'test@gmail.com'
    }, {
        id: '56',
        name: 'Anje Keizer',
        phone: '3-(459)237-2205',
        transfers: 0,
        lastTransfer: '—',
        registration: '18:41 01/08/2022',
        email: 'keizer@gmail.com'
    } , {
        id: '18',
        name: 'Ava Gregoraci',
        phone: '9-(091)354-5499',
        transfers: 316,
        lastTransfer: '09:04 21/10/2022',
        registration: '19:20 19/10/2022',
        email: 'avagregoraci@gmail.com'
    }, {
        id: '341',
        name: 'Cao Yu',
        phone: '4-(590)461-3734',
        transfers: 107,
        lastTransfer: '11:23 16/09/2022',
        registration: '13:46 15/09/2022',
        email: 'caoyu@gmail.com'
    }, {
        id: '333',
        name: 'Clarke Gillebert',
        phone: '1-(618)312-3065',
        transfers: 8,
        lastTransfer: '19:40 25/09/2022',
        registration: '12:15 24/09/2022',
        email: 'example@gmail.com'
    }])
    const [order, setOrder] = useState('ASC')
    const [headerType, setHeaderType] = useState('')
    const sorting = (col) => {
        if (order === 'ASC') {
            const sorted = [...clients].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1)
            setClients(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...clients].sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
            setClients(sorted)
            setOrder('ASC')
        }
    }
    const sortingNumber = (col) => {
        if (order === 'ASC') {
            const sorted = [...clients].sort((a, b) => a[col] > b[col] ? 1 : -1)
            setClients(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...clients].sort((a, b) => a[col] < b[col] ? 1 : -1)
            setClients(sorted)
            setOrder('ASC')
        }
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const router=useRouter()
    const [filterRows,setFilterRows]=useState(clients)
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [query,setQuery]=useState('')
    useEffect(()=>{
        query&&setClients(filterRows.filter(item=>item.name.toLowerCase().includes(query.toLowerCase())||item.id.toString().includes(query)||item.phone.includes(query)))
    },[query])

    return (
        <AdminLayer>
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 20, flexDirection: 'row'}}>
                        <div className={styles.headerImg}>
                            <img src={'/clients.svg'}/>
                        </div>
                        <p className={styles.headerTitle}>Clients</p>
                    </div>
                    <div className={styles.exitBlock} onClick={()=>router.replace('/')}>
                        <p>Exit</p>
                        <LogoutIcon style={{color: '#A3AEC9'}}/>
                    </div>
                </div>
                <div className={styles.searchRow}>
                    <div className={styles.inputSearch}>
                        <SearchIcon style={{color: '#A3AEC9'}}/>
                        <input placeholder="Search by first name, last name or phone" value={query} onChange={(e)=>setQuery(e.target.value)}/>
                    </div>

                    <div className={styles.downloadButton}  >
                        <ReactHTMLTableToExcel
                            className={styles.excelButton}
                            table="emp"
                            filename="ReportExcel"
                            sheet="Sheet"
                            buttonText="" />
                        <p>Download Excel</p>
                        <FileDownloadIcon style={{color: 'white'}}/>
                    </div>
                </div>

                <TableContainer  style={{marginTop:40}}>
                    <Table ref={tableRef} id='emp' sx={{
                        minWidth:700,
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
                                                if(headerType===prev){
                                                    item.action==='transfers'||item.action==='id'?sortingNumber(item.action): sorting(item.action)
                                                }else {
                                                    setHeaderType(item.action)
                                                    item.action==='transfers'||item.action==='id'?sortingNumber(item.action): sorting(item.action)
                                                }
                                            }}><p style={{whiteSpace:"nowrap"}} >{item.label}</p>
                                                <div style={{display: 'flex', flexDirection: 'column'}}><KeyboardArrowUpIcon
                                                    style={{fontSize: 12,color:headerType===item.action?order==='ASC'?'#A3AEC9':'#566488':'#A3AEC9'}}/><KeyboardArrowDownIcon style={{fontSize: 12,color:headerType===item.action?order!=='ASC'?'#A3AEC9':'#566488':'#A3AEC9'}}/>
                                                </div>
                                            </div>
                                        </TableCell>
                                    )
                                })}


                            </TableRow>
                        </TableHead>
                        <TableBody style={{background: 'white'}}>
                            {clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row,index) => (
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
                                        <p style={{color: '#566488'}}>{row.id}</p>
                                    </TableCell>
                                    <TableCell component="th" scope="row"
                                               style={{backgroundColor: 'white', borderBottom: 'none'}}>
                                        <p style={{color: '#566488'}}>{row.name}</p>
                                    </TableCell>
                                    <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}><p
                                        style={{color: '#4E7FF1', textDecoration: 'underline',whiteSpace:'nowrap'}}>{row.phone}</p>
                                    </TableCell>
                                    <TableCell scope="row" align="left"
                                               style={{backgroundColor: 'white', borderBottom: 'none'}}>
                                        <p style={{color: '#566488'}}>{row.transfers}</p>
                                    </TableCell>
                                    <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}><p
                                        style={{color: '#566488'}}>{row.lastTransfer}</p></TableCell>
                                    <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}>

                                        <p style={{color: '#566488'}}>{row.registration}</p></TableCell>
                                    <TableCell scope="row" align="left" style={{
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                        backgroundColor: 'white',
                                        borderBottom: 'none'
                                    }}>
                                        <a style={{color: '#4E7FF1', textDecoration: 'underline'}}>{row.email}</a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter  >
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}

                                    count={clients.length}
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

export default Clients;
