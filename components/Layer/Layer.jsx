import React from "react";
import styles from './Layer.module.sass';
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";


export const Layer = ({children, firstPage,partner}) => {
    return (
        <div style={{maxWidth:1920,width:'100%',margin:'0 auto',alignItems:'center',height:'100%',backgroundColor:'white'}} >

            <Header firstPage={firstPage} partner={partner}/>
            {children}
            <Footer firstPage={firstPage} />
        </div>
    )
}
