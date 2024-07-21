import React, {useState} from 'react';

import styles from "../../../styles/Admin.module.sass";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminLayer from "../../../components/AdminLayer/AdminLayer";
import {useRouter} from "next/router";
import TextField from "@mui/material/TextField";
import Switch from "react-switch";
import CloseIcon from "@mui/icons-material/Close";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/material.css'
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SaveIcon from "@mui/icons-material/Save";
const AddCompany = () => {
    const router=useRouter()
    const [active,setActive]=useState(true)
    const [ban,setBan]=useState(false)
    const [license,setLicense]=useState({})
    const [proCard,setProCard]=useState({})
    const [carRegistration,setCarRegistration]=useState({})
    const [insurance,setInsurance]=useState({})
    return (
        <AdminLayer>

            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 20, flexDirection: 'row'}}>
                        <div className={styles.headerImg}>
                            <img src={'/companies.svg'}/>
                        </div>
                        <p className={styles.headerTitle}>Companies</p>
                    </div>

                    <div className={styles.exitBlock} onClick={()=>router.back()}>
                        <p>Exit</p>
                        <LogoutIcon style={{color: '#A3AEC9'}}/>
                    </div>
                </div>
                <div className={styles.addCompanyContainer}>
                    <p className={styles.title}>+ Add New Company</p>
                    <div className={styles.addCompanyRow}>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" className={styles.addInput} />
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" className={styles.addInput} />
                        <div className={styles.activeButtonRow} style={{gap:30}} >
                            <div className={styles.rowContainer} style={{gap:10}}>
                                <p style={{color:active?'#24304F':'#A3AEC9',fontWeight:active?'600':'400',fontSize:15}}>Active</p>
                            <Switch checked={active} checkedIcon={false} uncheckedIcon={false}
                                    onChange={() => setActive(!active)} offColor='#E3EBFD'
                                    onColor='#4E7FF1' height={25} width={50} boxShadow='none'/>
                                <p style={{color:!active?'#24304F':'#A3AEC9',fontWeight:!active?'600':'400',fontSize:15}}>Unactive</p>
                            </div>
                            <div className={styles.exitBlock} style={{background:ban?'#E7EBF8':'transparent',gap:5,padding:'10px 15px',width:78,marginRight:5 }} onClick={()=>{
                                setBan(!ban)
                            }}>
                                <p>{ban?'Unban':'Ban'}</p>
                                {!ban&&<CloseIcon style={{fontSize:18}}/>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.rowContainer} style={{gap:15,marginBottom:25}}>
                            <div className={styles.stepCircle}>
                                <p>1</p>
                            </div>
                            <p className={styles.stepTitle}>Basic information</p>
                        </div>
                        <div className={styles.addCompanyRow}>
                            <TextField id="outlined-basic" label="Company Name" variant="outlined" className={styles.addInput}/>
                            <TextField id="outlined-basic" label="ID" variant="outlined" className={styles.addInput}/>
                           <div id='white' style={{width:'100%'}}>
                            <PhoneInput
                                country={'fr'}
                                style={{ color:'#A3AEC9'}}
                                specialLabel='Phone number*'
                                inputStyle={{width:'100%',backgroundColor:'transparent',overflow: 'hidden'}}
                            />
                           </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.rowContainer} style={{gap:15,marginBottom:25}}>
                            <div className={styles.stepCircle}>
                                <p>2</p>
                            </div>
                            <p className={styles.stepTitle}>Information about the company</p>
                        </div>
                        <div className={styles.addCompanyRow}>
                            <TextField id="outlined-basic" label="Company Registration Number" variant="outlined" className={styles.addInput}/>
                            <TextField id="outlined-basic" label="Company Registration Adress" variant="outlined" className={styles.addInput}/>
                            <TextField id="outlined-basic" label="VAT Number" variant="outlined" className={styles.addInput}/>
                        </div>
                    </div>
                    <div>
                        <div className={styles.rowContainer} style={{gap:15,marginBottom:25}}>
                            <div className={styles.stepCircle}>
                                <p>3</p>
                            </div>
                            <p className={styles.stepTitle}>Adress</p>
                        </div>
                        <div className={styles.addCompanyRow}>
                            <TextField id="outlined-basic" label="Country" variant="outlined" className={styles.addInput}/>
                            <TextField id="outlined-basic" label="City" variant="outlined" className={styles.addInput}/>
                            <TextField id="outlined-basic" label="Zip Code" variant="outlined" className={styles.addInput}/>
                        </div>
                    </div>
                    <div>
                        <div className={styles.rowContainer} style={{gap:15,marginBottom:25}}>
                            <div className={styles.stepCircle}>
                                <p>4</p>
                            </div>
                            <p className={styles.stepTitle}>Payment Information</p>
                        </div>
                        <div className={styles.addCompanyRow}>
                            <TextField id="outlined-basic" label="Stripe Connect ID" variant="outlined" className={styles.addInput}/>
                            <TextField id="outlined-basic" label="IBAN" variant="outlined" className={styles.addInput}/>
                            <TextField id="outlined-basic" label="SWIFT" variant="outlined" className={styles.addInput}/>
                        </div>
                    </div>
                    <div>
                        <div className={styles.rowContainer} style={{gap:15,marginBottom:25}}>
                            <div className={styles.stepCircle}>
                                <p>5</p>
                            </div>
                            <p className={styles.stepTitle}>Сar</p>
                        </div>
                        <div className={styles.addCompanyRow}>
                            <FormControl fullWidth  >
                                <InputLabel id="demo-simple-select-label"  >Car class</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"

                                    label="Car class"
                                    style={{ color:'#A3AEC9'}}

                                >
                                    <MenuItem value={'Economy'}>Economy</MenuItem>
                                    <MenuItem value={'Economy+'}>Economy+</MenuItem>
                                    <MenuItem value={'Business'}>Business</MenuItem>
                                    <MenuItem value={'VIP'}>VIP</MenuItem>
                                    <MenuItem value={'VAN'}>VAN</MenuItem>
                                    <MenuItem value={'Business van'}>Business van</MenuItem>

                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Brand and Model" variant="outlined" className={styles.addInput}/>
                            <FormControl fullWidth  >
                                <InputLabel id="demo-simple-select-label"  >Car year</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"

                                    label="Car year"
                                    style={{ color:'#A3AEC9'}}

                                >
                                    <MenuItem value={'2022'}>2022</MenuItem>
                                    <MenuItem value={'2021'}>2021</MenuItem>
                                    <MenuItem value={'2020'}>2020</MenuItem>

                                </Select>
                            </FormControl>
                            <FormControl fullWidth    >
                                <InputLabel id="demo-simple-select-label"  >Color</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"

                                    label="Color"
                                    style={{ color:'#A3AEC9'}}

                                >
                                    <MenuItem value={'Red'}>Red</MenuItem>
                                    <MenuItem value={'Black'}>Black</MenuItem>
                                    <MenuItem value={'White'}>White</MenuItem>

                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="Plate Number" variant="outlined" className={styles.addInput}/>

                        </div>
                    </div>
                    <div>
                        <div className={styles.rowContainer} style={{gap:15,marginBottom:25}}>
                            <div className={styles.stepCircle}>
                                <p>6</p>
                            </div>
                            <p className={styles.stepTitle}>Documents</p>
                        </div>
                        <div className={styles.documentsRow}>
                            <label htmlFor="license-upload" className={`custom-file-upload ${styles.documentPickItem}`} style={{backgroundColor:license?.name?'#EFF4FE':'transparent'}}>
                                <i className="fa fa-cloud-upload" style={{position:'absolute'}}></i>
                                {license?.name&&<div className={styles.rowContainer} style={{gap:15}}>
                                    <InsertDriveFileIcon style={{color:'#566488'}}/>
                                    <p style={{color:'#566488',textDecoration:'underline'}}>{license?.name}</p>
                                </div>}
                                <input
                                    id="license-upload" type="file"
                                    style={{display:'none'}}  onChange={(e) => setLicense(e.target.files[0])}/>
                                {!license?.name&&<AddCircleOutlineOutlinedIcon style={{color:'#566488',fontSize:40}}/>}
                                <p style={{fontWeight:license?.name?'700':'400'}}>License</p>
                            </label>
                            <label htmlFor="proCard-upload" className={`custom-file-upload ${styles.documentPickItem}`} style={{backgroundColor:proCard?.name?'#EFF4FE':'transparent'}}>
                                <i className="fa fa-cloud-upload" style={{position:'absolute'}}></i>
                                {proCard?.name&&<div className={styles.rowContainer} style={{gap:15}}>
                                    <InsertDriveFileIcon style={{color:'#566488'}}/>
                                    <p style={{color:'#566488',textDecoration:'underline'}}>{proCard?.name}</p>
                                </div>}
                                <input
                                    id="proCard-upload" type="file"
                                    style={{display:'none'}}  onChange={(e) => setProCard(e.target.files[0])}/>
                                {!proCard?.name&&<AddCircleOutlineOutlinedIcon style={{color:'#566488',fontSize:40}}/>}
                                <p style={{fontWeight:proCard?.name?'700':'400'}}>Pro Card</p>
                            </label>
                            <label htmlFor="registration-upload" className={`custom-file-upload ${styles.documentPickItem}`} style={{backgroundColor:carRegistration?.name?'#EFF4FE':'transparent'}}>
                                <i className="fa fa-cloud-upload" style={{position:'absolute'}}></i>
                                {carRegistration?.name&&<div className={styles.rowContainer} style={{gap:15}}>
                                    <InsertDriveFileIcon style={{color:'#566488'}}/>
                                    <p style={{color:'#566488',textDecoration:'underline'}}>{carRegistration?.name}</p>
                                </div>}
                                <input
                                    id="registration-upload" type="file"
                                    style={{display:'none'}}  onChange={(e) => setCarRegistration(e.target.files[0])}/>
                                {!carRegistration?.name&&<AddCircleOutlineOutlinedIcon style={{color:'#566488',fontSize:40}}/>}
                                <p style={{fontWeight:carRegistration?.name?'700':'400'}}>Car Registration</p>
                            </label>
                            <label htmlFor="insurance-upload" className={`custom-file-upload ${styles.documentPickItem}`} style={{backgroundColor:insurance?.name?'#EFF4FE':'transparent'}}>
                                <i className="fa fa-cloud-upload" style={{position:'absolute'}}></i>
                                {insurance?.name&&<div className={styles.rowContainer} style={{gap:15}}>
                                    <InsertDriveFileIcon style={{color:'#566488'}}/>
                                    <p style={{color:'#566488',textDecoration:'underline'}}>{insurance?.name}</p>
                                </div>}
                                <input
                                    id="insurance-upload" type="file"
                                    style={{display:'none'}}  onChange={(e) => setInsurance(e.target.files[0])}/>
                                {!insurance?.name&&<AddCircleOutlineOutlinedIcon style={{color:'#566488',fontSize:40}}/>}
                                <p style={{fontWeight:insurance?.name?'700':'400'}}>Insurance</p>
                            </label>
                        </div>
                        <div className={styles.saveButton} onClick={()=>router.back()} >
                            <SaveIcon/>
                            <p>Save</p>
                        </div>
                    </div>
                </div>

        </div>
        </AdminLayer>
    );
};

export default AddCompany;
