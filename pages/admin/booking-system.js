import React, {useEffect, useMemo, useState} from 'react';

import AdminLayer from "../../components/AdminLayer/AdminLayer";
import styles from "../../styles/Admin.module.sass";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  Box,
  FormControl, MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import countryList from 'react-select-country-list'
import Select from 'react-select'
import createCache from '@emotion/cache'
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import AddNewDestinationModal from "../../components/AddNewDestination/AddNewDestinationModal";
import {useQuery} from "react-query";
import useAxios from "../../hooks/useAxios";
import {useAdminContext} from "../../providers/AdminProvider";
import EditDestination from "../../components/EditDestination/EditDestinationModal";
import EditDestinationModal from "../../components/EditDestination/EditDestinationModal";
import Swal from "sweetalert2";

const BookingSystem = () => {
  const axios = useAxios()
  const {getBookingTransfers, useDeleteBookingTransfer, getBookingTransfersSelect,deleteBookingTransfer} = useAdminContext()
  const [countryFrom, setCountryFrom] = useState('')
  const [countryTo, setCountryTo] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [changeSelect, setChangeSelect] = useState(false)
  const [change,setChange] = useState(false)
  const options = useMemo(() => countryList().getData(), [])
  const [rows, setRows] = useState([])
  const [rowsLength, setRowsLength] = useState(5)
  const [selectList, setSelectList] = useState({from:[],to:[]})
  const [page, setPage] = React.useState(0);
  const [skip, setSkip] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const {data, isLoading, isError, error, isFetching} = useQuery('bookingSystemTransfers', () => {
  //   return getBookingTransfers({"to":countryTo?.value,"from":countryFrom?.value}).then(res => {
  //     setRows(res)
  //     setChangeSelect(!changeSelect)
  //   })
  // })
  // useEffect(()=>{
  //   getBookingTransfers().then(res => {
  //     setRows(res)
  //   })
  // },[change])
  const deleteSelectItem=()=>{
    deleteBookingTransfer(selectItem?._id).then(res=>{
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
  useEffect(()=>{
    getBookingTransfersSelect().then(res => {
      let from=[]
      let to=[]
      res?.from?.map(item => from.push({value: item, label: item}))
      res?.to?.map(item => to.push({value: item, label: item}))
      setSelectList({
        from: from,
        to: to
      })

    })

  },[rows])
  useEffect(()=>{
    getBookingTransfers().then(res => {
      setRowsLength(res?.length)
      setCountryFrom('')
      setCountryTo('')
    })
  },[change])


      useEffect(() => {
        getBookingTransfers({"to":countryTo?.value,"from":countryFrom?.value,limit:rowsPerPage,skip:skip}).then(res => {

          setRows(res)
        })

      }, [countryFrom,countryTo,rowsPerPage,change,skip])
      const [selectItem, setSelectItem] = useState({})
      const changeHandlerFrom = value => {
        setCountryFrom(value)
      }
      const changeHandlerTo = value => {
        setCountryTo(value)
      }
      const headers = [
        {
          label: '№',
          action: 'id'
        },
        {
          label: 'FROM',
          action: 'From'
        },
        {
          label: 'TO',
          action: 'To'
        },
        {
          label: 'ECONOMY',
          action: 'p1'
        }
        ,
        {
          label: 'ECONOMY +',
          action: 'p2'
        }
        ,
        {
          label: 'BUSINESS',
          action: 'p3'
        }
        ,
        {
          label: 'VIP',
          action: 'p4'
        }
        ,
        {
          label: 'VAN',
          action: 'p5'
        }
        ,
        {
          label: 'BUSINESS VAN',
          action: 'p6'
        }
        ,
        {
          label: 'ACTION',
          action: ''
        }
      ]

      const [order, setOrder] = useState('ASC')
      const [headerType, setHeaderType] = useState('')
      const sorting = (col) => {
        if (order === 'ASC') {
          const sorted = [...rows].sort((a, b) => a[col]?.toLowerCase() > b[col].toLowerCase() ? 1 : -1)
          setRows(sorted)
          setOrder('DSC')
        }
        if (order === 'DSC') {
          const sorted = [...rows].sort((a, b) => a[col]?.toLowerCase() < b[col].toLowerCase() ? 1 : -1)
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



      const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

      const handleChangePage = (event, newPage) => {
        console.log(newPage,rowsPerPage)
        setPage(newPage);
        newPage>page?setSkip(rowsPerPage):setSkip((prev)=>prev-rowsPerPage)
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      return (
        <AdminLayer>
          {openDelete && <DeleteModal open={openDelete} setOpen={setOpenDelete} deletingItem={selectItem} setChange={setChange} change={change} deleteFunc={deleteSelectItem}/>}
          {openAdd && <AddNewDestinationModal open={openAdd} setOpen={setOpenAdd} setChange={setChange} change={change}/>}
          {openEdit && <EditDestinationModal open={openEdit} setOpen={setOpenEdit} selectItem={selectItem} setChange={setChange} change={change}/>}
          <div className={styles.container}>
            <div className={styles.pageHeader}>
              <div style={{display: 'flex', alignItems: 'center', gap: 20, flexDirection: 'row'}}>
                <div className={styles.headerImg}>
                  <img src={'/bookingSystem.svg'}/>
                </div>
                <p className={styles.headerTitle}>Booking System</p>
              </div>
              <div className={styles.exitBlock}>
                <p>Exit</p>
                <LogoutIcon style={{color: '#A3AEC9'}}/>
              </div>
            </div>
            <div className={styles.searchRow}>
              <div className={styles.selectRow}>
                <Select options={selectList?.from} value={countryFrom} placeholder='From' onChange={changeHandlerFrom}
                        className={styles.select}/>
                <Select options={selectList?.to} value={countryTo} placeholder='To' onChange={changeHandlerTo}
                        className={styles.select}/>

                {/*<Box  className={styles.select}>*/}

                {/*    <FormControl fullWidth>*/}

                {/*        <Select*/}
                {/*            id="demo-simple-select"*/}

                {/*            label=""*/}
                {/*            style={{color:'#73809E',paddingLeft:33,paddingRight:30}}*/}
                {/*        >*/}
                {/*            {options.map(item=><MenuItem value={item.value} style={{color:'#73809E'}}>{item.label}</MenuItem>)}*/}
                {/*            /!*<MenuItem value={'Jul 2022'} style={{color:'#73809E'}}> Jul 2022</MenuItem>*!/*/}
                {/*            /!*<MenuItem value={'Jun 2022'} style={{color:'#73809E'}}>Jun 2022 </MenuItem>*!/*/}
                {/*            /!*<MenuItem value={'May 2022'} style={{color:'#73809E'}}>May 2022 </MenuItem>*!/*/}
                {/*        </Select>*/}
                {/*    </FormControl>*/}
                {/*</Box>*/}
              </div>
              <div className={styles.downloadButton} onClick={() => setOpenAdd(true)}>
                <AddIcon style={{color: 'white'}}/>
                <p>Add</p>
              </div>
            </div>
            <TableContainer style={{marginTop: 40}}>
              <Table sx={{
                minWidth: 700,
                maxWidth: 1440,
                width: '100%',
                boxShadow: 'none',
                backgroundColor: 'none',
                borderSpacing: '0 15px',
                borderCollapse: 'separate'
              }} style={{boxShadow: 'none'}} aria-label="simple table">
                <TableHead sx={{backgroundColor: '#F1F5FF', boxShadow: 'none', borderBottom: 'none'}}>
                  <TableRow style={{borderBottom: 'none'}}>
                    {headers.map((item, index) => {
                      return (
                        <TableCell align="left" key={item.action}
                                   style={{
                                     borderBottom: 'none',
                                     color: headerType === item.action ? '#566488' : '#A3AEC9',
                                     fontWeight: '700'
                                   }}>
                          <div className={styles.rowContainer} style={{gap: 10, cursor: 'pointer'}} onClick={(prev) => {
                            if (item.action) {
                              if (headerType === prev) {
                                item.action !== 'from' && item.action !== 'to' ? sortingNumber(item.action) : sorting(item.action)
                              } else {
                                setHeaderType(item.action)
                                item.action !== 'from' && item.action !== 'to' ? sortingNumber(item.action) : sorting(item.action)
                              }
                            }
                          }}><p style={{whiteSpace: "nowrap", fontSize: 12}}>{item.label}</p>
                            {item.action && <div style={{display: 'flex', flexDirection: 'column'}}><KeyboardArrowUpIcon
                              style={{
                                fontSize: 12,
                                color: headerType === item.action ? order === 'ASC' ? '#A3AEC9' : '#566488' : '#A3AEC9'
                              }}/><KeyboardArrowDownIcon style={{
                              fontSize: 12,
                              color: headerType === item.action ? order !== 'ASC' ? '#A3AEC9' : '#566488' : '#A3AEC9'
                            }}/>
                            </div>}
                          </div>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody style={{background: 'white'}}>
                  {rows?.map((row, index) => (
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
                        <p style={{color: '#566488'}}>{index + 1}</p>
                      </TableCell>
                      <TableCell component="th" scope="row"
                                 style={{backgroundColor: 'white', borderBottom: 'none'}}>
                        <p style={{color: '#566488'}}>{row?.From}</p>
                      </TableCell>
                      <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}><p
                        style={{color: '#566488', whiteSpace: 'nowrap'}}>{row?.To}</p>
                      </TableCell>
                      <TableCell scope="row" align="left"
                                 style={{backgroundColor: 'white', borderBottom: 'none'}}>
                        <p style={{color: '#566488'}}>€{row?.p1}</p>
                      </TableCell>
                      <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}><p
                        style={{color: '#566488'}}>€{row?.p2}</p></TableCell>
                      <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}>

                        <p style={{color: '#566488'}}>€{row?.p3}</p></TableCell>
                      <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}>

                        <p style={{color: '#566488'}}>€{row?.p4}</p></TableCell>
                      <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}>

                        <p style={{color: '#566488'}}>€{row?.p5}</p></TableCell>
                      <TableCell align="left" style={{backgroundColor: 'white', borderBottom: 'none'}}>

                        <p style={{color: '#566488'}}>€{row?.p6}</p></TableCell>
                      <TableCell scope="row" align="left" style={{
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: 'white',
                        borderBottom: 'none'
                      }}>
                        <div className={styles.rowContainer}>
                          <div className={styles.tableEditButton} onClick={() => {
                            setSelectItem(row)
                            setOpenEdit(true)
                          }}>
                            <EditOutlinedIcon/>
                            <div className={styles.messageText}>
                              <img src={"/messagePolygon.svg"} style={{position: 'absolute', top: -10}}/>
                              <p>Edit</p>
                            </div>
                          </div>
                          <div className={styles.tableDeleteButton} onClick={() => {
                            setSelectItem(row)
                            setOpenDelete(true)
                          }}>
                            <DeleteOutlineOutlinedIcon/>
                            <div className={styles.messageText}>
                              <img src={"/messagePolygon.svg"} style={{position: 'absolute', top: -10}}/>
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

    export default BookingSystem;
