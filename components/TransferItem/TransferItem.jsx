import React from 'react';
import styles from './TransferItem.module.sass'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const TransferItem = ({item}) => {
    return (
        <div className={styles.itemBlock} style={{backgroundColor:item.background}}>
            <img src={'/transferItemImg.svg'} style={{position:'absolute',right:0,bottom:0,borderBottomRightRadius:10}}/>
            <div>
                <p className={styles.title}>Economy</p>
                <p  >{item.procent} assigned</p>
            </div>
            <div style={{ width: 75, height: 75 }}>
                <CircularProgressbar value={parseInt(item.procent.replace('%',''))} text={item.procent} styles={buildStyles({

                    pathColor: `white`,
                    textColor: 'white',
                    trailColor: '#D9D9D9',
                    backgroundColor: 'white',
                })}/>
            </div>


        </div>
    );
};

export default TransferItem;
