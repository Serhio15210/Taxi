import headerStyles from '../components/Layer/Header/Header.module.sass'
import styles from '../styles/Home.module.sass'

import React, {useEffect, useRef, useState} from "react";
import Switch from "react-switch";
import RoomIcon from '@mui/icons-material/Room';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CalendarModal from "../components/Calendar/CalendarModal";
import AskQuestionModal from "../components/AskQuestionModal";

import Offer from "../components/Offer";
import Reviews from "../components/Reviews";
import Layer from '../components/Layer'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RouteHeader from "../components/RouteHeader";


export default function Home() {
    const [value, setValue] = useState(new Date('2018-01-01T00:00:00.000Z'));
    const [returnTrip, setReturnTrip] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [from, setFrom] = useState(true);
    const reactSwipeEl = useRef(null)
    const [date, setDate] = useState(new Date());
    const reactSwipeReviewEl = useRef()
    const [scroll, setScroll] = useState(0)
    const [scrollReview, setScrollReview] = useState(0)
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const [openContact, setOpenContact] = useState(false);
    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)

    }, [])
    useEffect(() => {

        scroll === 0 ? reactSwipeEl.current.scrollTo({left: -260, behavior: 'smooth'}) :
            reactSwipeEl.current.scrollTo({left: scroll, behavior: 'smooth'})
    }, [scroll])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    const list = [{
        id: 'monaco',
        name: 'Nice→Monaco',
        price: '90€',
        img: '/monaco.png'

    },
        {
            id: 'paris',
            name: 'Nice→Paris',
            price: '995€',
            img: '/cannes.png'

        },
        {
            id: 'cannes',
            name: 'Nice→Cannes',
            price: '80€',
            img: '/cannes.png'

        },
        {
            id: 'cannes',
            name: 'Nice→Cannes',
            price: '80€',
            img: '/cannes.png'

        },
        {
            id: 'saintTropez',
            name: 'Nice→Saint-Tropez',
            price: '2000€',
            img: '/saintTropez.png'

        },
        {
            id: 'milan',
            name: 'Nice→Milan',
            price: '7000€',
            img: 'milan.png'

        },

    ]

    return (
        // <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Layer firstPage={true}>
            {openCalendar &&
                <CalendarModal open={openCalendar} setOpen={setOpenCalendar} date={date} setDate={setDate}/>}
            {openContact && <AskQuestionModal setOpen={setOpenContact} open={openContact}/>}
            <div className={`container ${styles.fadeContainer}`} style={{marginTop: 140}}>
                 <RouteHeader openCalendar={openCalendar} setOpenCalendar={setOpenCalendar} />
                <p> * I agree to the <a style={{color: '#4E7FF1', cursor: 'pointer', textDecoration: 'underline'}}>terms
                    and conditions</a></p>

                <div className={styles.headerText}>
                    <p>You can book transfer from Monaco to Nice Airport, Nice-ville train station or Port Lympa to the
                        Promenade des Anglais, your private driver in Nice will take you where you want and when you
                        want. </p>
                    <p>You can easily book a transfer to the Nice airport to be in time for your flight or to get to the
                        destination of your choice with comfort.</p>
                </div>
                <Offer/>

            </div>
            <div className={styles.bookingContainer}>
                <div className={`${styles.bookingBlock} ${styles.fadeContainer}`}>
                    <img src="/polygon.svg" style={{marginTop: -40}}/>
                    <p className={styles.title}>Book your Nice Airport taxi in <span>few steps</span></p>
                    <p className={styles.text}>From Nice Airport, our private driver or our taxi in Nice can perform any
                        transfer in the
                        Côte-d`Azur region, from Marseille to Nice. </p>
                    <div className={styles.bookingRow}>
                        <div className={styles.bookingItem}>
                            <div className={styles.bookingNumber}>
                                <p>1</p>
                            </div>
                            <p className={styles.bookingText}>You can easily <b style={{color: 'black'}}>book online
                                your Taxi</b> Nice Airport with only few clicks. </p>
                        </div>
                        <div className={styles.bookingItem}>
                            <div className={styles.bookingNumber}>
                                <p>2</p>
                            </div>
                            <p className={styles.bookingText}>Easy Transfer’s cab in Nice vehicle will be <b
                                style={{color: 'black'}}>waiting for
                                you</b> at the address indicated or at the Nice Airport to perform your transfer.</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className={`${styles.bookingMap} ${styles.fadeContainer}`}>
                {windowInnerWidth > 800 && <img src="/mapp.png" style={{
                    marginTop: -100,
                    maxWidth: 775,
                    width: '100%',
                    marginLeft: -100,
                    maxHeight: 800,
                    height: '100%',
                    float: 'right'
                }}/>
                }
                <div className={styles.bookingInfo} style={{float: 'left'}}>
                    <p>If you wish to travel from Nice Airport to Monaco without any stress, remember to book your
                        Nice taxi in advance. </p>
                    <div className={styles.bookingBoldText}>
                        <div style={{width: 10, backgroundColor: '#4E7FF1'}}/>
                        <p>On your request, our driver can wait you for your transfer from Nice Airport with a
                            personalized welcome sign to bring you to many destinations.</p>
                    </div>
                    <p>You may wish to book your Taxi Nice Monaco, Monaco Saint Tropez taxi or a private driver Nice
                        Airport to Saint Tropez. We also can provide you booster seats on simple requests, to
                        facilitate your transfer Cannes Saint Tropez.</p>
                </div>


            </div>
            {windowInnerWidth < 800 && <img src='/mapMobile.png' className={styles.mapMobile}/>}
            <div className={`${styles.priceContainer} ${styles.fadeContainer}`}>
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
                        <button  onClick={() => {
                            if (reactSwipeEl.current) {
                                reactSwipeReviewEl.current?.scrollTo({left: reactSwipeEl.current.scrollLeft-=360, behavior: 'smooth'})
                            }
                        }}>
                            <ArrowBackIcon/>
                        </button>
                        <button
                             onClick={() => {
                                 if (reactSwipeEl.current) {

                                     reactSwipeReviewEl.current?.scrollTo({left: reactSwipeEl.current.scrollLeft+=360, behavior: 'smooth'})
                                 }
                             }}>
                            <ArrowForwardIcon/>
                        </button>
                    </div>
                </div>


            </div>


            <div className={styles.slider} ref={reactSwipeEl}>


                {list.map((item, index) => {
                    return (
                        <div className={styles.slider_box} key={index}>
                            <img src={item.img} alt=""/>
                            <div className={styles.hoverItem}>
                                <NorthEastIcon/>
                            </div>
                            <div className={styles.itemPrice}>{item.price}</div>
                            <div className={styles.item_road}><RoomIcon/>{item.name}</div>

                        </div>
                    )
                })}
                {/*</Slider>*/}

            </div>

            {/*</div>*/}
            <div className={'container'}>
                <div className={styles.transferBlock}>
                    <div className={styles.transferInfo}>
                        <p className={styles.title}><span>Choose</span> Easy Transfer for your </p>
                        <div style={{backgroundColor: '#FFD601', width: 46, height: 3}}/>
                        <p className={styles.text}>Easy Transfer can ensures your travel between Nice airport to Monaco,
                            book your taxi Cannes Nice or allocate you a private driver in Nice for a perfect comfort
                            and complete safety during your journey. A fast transport service with our private taxi
                            between Nice Côte d`Azur airport and Saint Tropez.<br/><br/>

                            We offer the best transfers, at low prices and a high quality service, from Monaco to Cannes
                            and all the destinations of the Franco-Italian Riviera. Our service is available 24 hours a
                            day, 7 days a week. </p>
                    </div>
                    {windowInnerWidth > 800 ? <img src="/transfer.png" width={600} height={640}/> :
                        <img src="/transferMobile.png" width='100%'/>}
                </div>
                <div className={styles.missBlock}>
                    <p className={styles.events}>events</p>
                    <img src="/miss.png" width={575} height={486}/>

                    <div className={styles.missInfo} style={{alignSelf: 'center'}}>

                        <p className={styles.title}>Don`t <span>miss!</span></p>
                        <div style={{backgroundColor: '#FFD601', width: 46, height: 3}}/>
                        <p className={styles.text}>Easy Transfer can ensures your travel between Nice airport to Monaco,
                            book your taxi Cannes Nice or allocate you a private driver in Nice for a perfect comfort
                            and complete safety during your journey. A fast transport service with our private taxi
                            between Nice Côte d`Azur airport and Saint Tropez.<br/><br/>

                            We offer the best transfers, at low prices and a high quality service, from Monaco to Cannes
                            and all the destinations of the Franco-Italian Riviera. Our service is available 24 hours a
                            day, 7 days a week. </p>
                    </div>

                </div>
                <div className={styles.missItemsBlock}>
                    <div className={styles.item}>
                        <div className={styles.itemImg}>
                            <p><img src="/driverWhite.svg" width={26} height={26}/></p>
                        </div>
                        <div className={styles.itemText}>
                            <p>Address Pickup in Nice, Cannes or Monaco</p>
                            <span>You will have at your side a private driver who knows the city and the region to perfection. We will do what is necessary, at no extra charge, to choose the most pleasant route and the smoothest roads for you. We will be attentive to provide you with a quality service with a professional and discreet driver.</span>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemImg}>
                            <p><img src="/planeWhite.svg" width={26} height={26}/></p>
                        </div>
                        <div className={styles.itemText}>
                            <p>Nice Airport Transfer</p>
                            <span>Your private taxi driver will be waiting for you at Nice Airport (NCE) in the arrivals area with a sign displaying your name. In case your flight is delayed, our drivers will be informed of any changes to ensure your safe transfer to your destination.</span>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemImg}>
                            <p><RoomIcon style={{fontSize: 26, color: '#4E7FF1'}}/></p>
                        </div>
                        <div className={styles.itemText}>
                            <p>Long Distance Transfer</p>
                            <span>Easy Transfer is specialized in long-distance transport. With our experience and our knowledge, we intervene for all your transport needs during your professional events, tourist stays or private trips. If you wish to book a taxi from Nice to Milan, taxi Nice to Madrid or beyond, just make a call!</span>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemImg}>
                            <p><img src="/helmWhite.svg" width={26} height={26}/></p>
                        </div>
                        <div className={styles.itemText}>
                            <p>Taxi tours in Nice</p>
                            <span>Our private taxi driver in Nice takes you to discover the most beautiful places on the Côte d’Azur. Our driver will follow the itinerary you have defined or, if you wish, we can offer you tourist circuits by taxi in Nice, Cannes, Monaco or Saint Tropez.</span>
                        </div>
                    </div>
                </div>
                <div style={{alignSelf: 'center', width: 162, height: 3, backgroundColor: '#4E7FF1', margin: 'auto'}}/>
                <p className={styles.wantText}>If you want a comfortable and stress-free transfer from the city of Nice
                    or throughout the Region,
                    France or Italy, look no further than an airport cab in Nice, Easy Transfer! </p>

            </div>
            <div className={styles.benefitsContainer}>
                <div className={styles.benefitsBlock}>
                    <img src="/polygon.svg" style={{position: 'absolute', top: -40}}/>
                    <div className={styles.benefitInfoBlock}>
                        <div className={styles.benefitInfoText}>
                            <p className={styles.title}>Easy Transfer <span>benefits</span> to book our </p>
                            <div style={{backgroundColor: '#FFD601', width: 46, height: 3}}/>
                            <p className={styles.text}>Easy Transfer offers you a fully personalized service with a taxi
                                in
                                Nice, on the Côte-d`Azur and any destination on request. You will have at your disposal
                                a
                                private driver in Nice with a recent and well-maintained vehicle. </p>
                            <div className={styles.boldText}>
                                <div style={{width: 10, backgroundColor: '#4E7FF1'}}/>
                                <p>On your request, our driver can wait you for your transfer from Nice Airport with a
                                    personalized welcome sign to bring you to many destinations.</p>
                            </div>
                            <p className={styles.text}>You may wish to book your Taxi Nice Monaco, Monaco Saint Tropez
                                taxi
                                or a private driver Nice Airport to Saint Tropez. We also can provide you booster seats
                                on
                                simple requests, to facilitate your transfer Cannes Saint Tropez.</p>
                        </div>
                        <img src="/benefit.png" width={518} height={720}/>
                    </div>
                    <div className={styles.benefitsItemsBlock}>
                        <div className={styles.item}>
                            <div className={styles.itemImg}>
                                <p><img src="/label.svg" width={26} height={26}/></p>
                            </div>
                            <div className={styles.itemText}>
                                <p>Best Taxi prices in Nice</p>
                                <span>Our rates are all inclusive and without surprises. Whenever you need a taxi from Nice Airport to Cannes, Monaco or Fréjus. Taxes, tolls and gratuity are included in the price given.</span>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemImg}>
                                <p><img src="/noHiddenCosts.svg" width={40} height={40}/></p>
                            </div>
                            <div className={styles.itemText}>
                                <p>No hidden costs</p>
                                <span>Our cab rates are fixed and known in advance, with all charges included. No unpleasant surprises at the end of the trip! Your private driver will take care of everything from Nice airport: the transfer trip, the address of your destination, any stops or stopovers... Enjoy your journey with peace of mind!</span>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemImg}>
                                <p><img src="/safe.svg" width={26} height={26}/></p>
                            </div>
                            <div className={styles.itemText}>
                                <p>Safe transfer in Nice, Cannes and Monaco</p>
                                <span>We carefully select our private drivers to ensure you the best experience. Our transfer taxi in Nice have a private driver’s diploma, medical aptitude, fluency in communicating with three languages: French, English and Russian. They are aware of the meaning of a top-of-the-range service: Courteous, Attentive, Helpful and Discreet.</span>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemImg}>
                                <p><img src="/time.svg" width={26} height={26}/></p>
                            </div>
                            <div className={styles.itemText}>
                                <p>Available 24h/24 & 7j/7</p>
                                <span>Your private driver in Nice, Cannes, Monaco, Antibes and Saint Tropez available at any time and for any distance on request.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'container'}>
                <div className={styles.speaksBlock}>
                    <img src="/speaks.png" width={636} height={652}/>
                    <div className={styles.infoText}>
                        <p className={styles.title}>You are the one who <span>speaks</span> the best about our</p>
                        <div style={{backgroundColor: '#FFD601', width: 46, height: 3}}/>
                        <p className={styles.text} style={{fontWeight: '600'}}>With our experience and know-how, we
                            already have many customers who
                            are satisfied to have traveled with our cab in Nice and who share their experience. </p>
                        <p className={styles.text}>If you want to walk in the old town of Nice, take a taxi trip to
                            Cannes, Monaco or even Milan, you can quickly call us and we’ll find the best private driver
                            in the Cote d’Azur for you. Do you want to discover or rediscover the Promenade des Anglais,
                            have a hot coffee in the Casino of Monte Carlo, or just take a taxi from Cannes to Saint
                            Tropez? We will get you to your destination without you having to worry about parking and
                            traffic. We will make you discover sumptuous places that will be a source of inspiration and
                            relaxation.</p>


                    </div>
                </div>
            </div>
            <Reviews/>
            <div className={'container'}>
                <div className={styles.guestionsContainder}>
                    <div className={styles.infoText}>
                        <p className={styles.title}><span>Any questions</span> regarding your </p>
                        <div style={{backgroundColor: '#FFD601', width: 46, height: 3}}/>
                        <p className={styles.text}>
                            Ask us for all the information on any particular transfer or service. We`ll get back to you
                            as soon as possible. Bringing you all the information and explanations is our duty.<br/>

                            You can also inquire directly by chat, using the WhatsApp application or send us an SMS.
                        </p>
                        <div className={styles.buttonsRow}>
                            <div className={styles.questionButton} style={{
                                backgroundColor: '#4E7FF1',
                                boxShadow: '0px 10px 40px rgba(78, 127, 241, 0.27)'
                            }} onClick={() => setOpenContact(true)}>
                                <p>Ask a Question<ArrowForwardIcon/></p>
                            </div>
                            <div className={styles.questionButton} style={{
                                backgroundColor: '#2DD792',
                                boxShadow: '0px 10px 40px rgba(45, 220, 134, 0.27)'
                            }}>
                                <p>Ask a Question<img src="/watsapp.svg"
                                                      style={{marginLeft: 14, width: 30, height: 30}}/></p>
                            </div>
                        </div>
                    </div>
                    <img src="/question.png" width={595} height={554}/>
                </div>
            </div>
        </Layer>

    )
}
