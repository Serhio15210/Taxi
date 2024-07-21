import React from 'react';
import styles from "../styles/Home.module.sass";
import RoomIcon from "@mui/icons-material/Room";

const Offer = () => {
    return (
        <div className={styles.offerContainer}>
            <p className={styles.title}>You have a <span>planned trip</span> to Nice? </p>
            {/*<div style={{backgroundColor: '#FFD601', width: '100%', height: 10,marginTop:-15}}/>*/}

            <div style={{backgroundColor: '#FFD601', width: 46, height: 3}}/>
            <p className={styles.text}>We offer you a simple and effective solution for your Nice Airport
                transfer with a private driver
                in Nice. We are a cab company in Nice which provide you with comfortable and pleasant transport
                for all your requests:
            </p>
            <div className={styles.offersBlock}>
                <div className={styles.offerItem}>
                    <div className={styles.offerImg}>
                        <p><RoomIcon style={{fontSize: 26}}/></p>
                    </div>
                    <div className={styles.offerText}>
                        <p>Local trips</p>
                        <span>Taxi from Nice to Cannes, Monaco to Saint Tropez and even a cab from Nice Airport</span>
                    </div>
                </div>
                <div className={styles.offerItem}>
                    <div className={styles.offerImg}>
                        <p><img src="/helm.svg" width={26} height={26}/></p>
                    </div>
                    <div className={styles.offerText}>
                        <p>Travel across France & Europe</p>
                        <span>We can ensure you trip Monaco to Milan.</span>
                    </div>
                </div>
                <div className={styles.offerItem}>
                    <div className={styles.offerImg}>
                        <p><img src="/cart.svg" width={26} height={26}/></p>
                    </div>
                    <div className={styles.offerText}>
                        <p>Transfer from Nice railway stations</p>
                        <span>Nice-Ville, Saint-Augustin & Nice Riquier</span>
                    </div>
                </div>
                <div className={styles.offerItem}>
                    <div className={styles.offerImg}>
                        <p><img src="/plane.svg" width={26} height={26}/></p>
                    </div>
                    <div className={styles.offerText}>
                        <p>Transfers from Airport</p>
                        <span>Nice-Côte-d`Azur</span>
                    </div>
                </div>
                <div className={styles.offerItem}>
                    <div className={styles.offerImg}>
                        <p><img src="/driver.svg" width={26} height={26}/></p>
                    </div>
                    <div className={styles.offerText}>
                        <p>Private driver services</p>
                        <span>Book your private driver in Nice for an hour, 2 or even more!</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offer;
