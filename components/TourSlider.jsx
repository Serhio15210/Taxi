import React from 'react';
import styles from "../styles/Home.module.sass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TourSlider = () => {

    return (
        <div className={styles.priceContainer}>
            <p className={styles.title}>A quick <span>look on the prices</span> depending on the departure
                destination</p>
            <p className={styles.prices}>price</p>
            <div style={{backgroundColor: '#FFD601', width: 46, height: 3}}/>
            <div className={styles.hideButtons}>
                <p className={styles.text}>If you are looking for a Taxi Nice Airport, we can provide you with
                    attractive prices starting <b style={{color: 'black'}}>from 35€ </b>
                    in you are located in Nice. You can also benefit a 5% price reduction by booking your return
                    trip.

                </p>
                <div className={styles.sliderButtons}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 52,
                        height: 52,
                        backgroundColor: 'white',
                        border: '2px solid #3CE894',
                        borderRadius: 50,
                        color: '#3CE894',
                        cursor: 'pointer'
                    }}>
                        <ArrowBackIcon/>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 52,
                        height: 52,
                        backgroundColor: 'white',
                        border: '2px solid #3CE894',
                        borderRadius: 50,
                        color: '#3CE894',
                        cursor: 'pointer'
                    }}>
                        <ArrowForwardIcon/>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default TourSlider;
