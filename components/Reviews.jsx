import React, {useEffect, useRef, useState} from 'react';
import styles from "../styles/Home.module.sass";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import Slider from "react-slick";


const Reviews = () => {

    const [scrollReview, setScrollReview] = useState(0)
    const [windowInnerWidth, setWindowInnerWidth] = useState('');
    const reactSwipeReviewEl = useRef()
    const [taskMore, setTaskMore] = useState(null)
    useEffect(() => {
        if (window) setWindowInnerWidth(window.screen.width)

    }, [])
    useEffect(() => {
        if (windowInnerWidth>500) {
            scrollReview === 0 ? reactSwipeReviewEl.current.scrollTo({left: -360, behavior: 'smooth'}) :
                reactSwipeReviewEl.current.scrollTo({left: scrollReview, behavior: 'smooth'})
        }
    }, [scrollReview])
    const reviews = [{

        name: 'Nice→Monaco',
        text:'“I took a taxi from Nice to Cannes with Easy transfer. I wanted to be sure that we would not arrive late because I had a bad experience with conventional cabs. Thank to my private driver who too me from the Nice Airport to Cannes, we arrived at time and the transfer was very pleasant!”',
        img: '/review1.png'

    },
        {

            name: 'Nice→Paris',
            text:'“Business trip from Monaco to Nice, being in the provinces is sometimes difficult when it comes to Taxi or a private driver, but my Easy Transfer private driver was very PRO. Super driving, punctual, considerate and benevolent. \n' +
                'I recommend these services if you search for a taxi Monaco to Nice”',
            img: '/review2.png'

        },
        {

            name: 'Nice→Cannes',
            text:'“Easy Transfer picked a colleague and I up from the Nice Airport to Saint Tropez.Our taxi driver in Nice was friendly, helpful and very professional. He was the best driver we had in our month working in France and I wouldn’t hesitate to recommend them again”.',
            img: '/review3.png'

        },
        {

            name: 'Nice→Cannes',
            text:'“Easy Transfer picked a colleague and I up from the Nice Airport to Saint Tropez.Our taxi driver in Nice was friendly, helpful and very professional. He was the best driver we had in our month working in France and I wouldn’t hesitate to recommend them again”.',
            img: '/review3.png'

        },

    ]
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        style:{
            width:'100%',
            display:'flex',
            flexDirection:'row',
            gap:20
        }
    };
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                style={{display:'flex',alignItems:'center',justifyContent:'center',width:52,height:52,alignSelf:'center',backgroundColor:'#3CE894',borderRadius:50,padding:20,position:'absolute',left:-30,color:'white',zIndex:3}}
                onClick={onClick}
            >
                <ArrowBackIcon/>
            </div>
        );
    }
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                style={{display:'flex',alignItems:'center',justifyContent:'center',width:52,height:52,alignSelf:'center',backgroundColor:'#3CE894',borderRadius:50,padding:20,position:'absolute',right:-30,color:'white'}}
                onClick={onClick}
            >
                <ArrowForwardIcon/>
            </div>
        );
    }
    return (
        <div className={styles.reviewContainer}>
            <div className={styles.reviewBlock}>
            <img src="/polygon.svg" className={styles.polygon}/>

            <div className={styles.nav}>
                <img src="/commas.svg" className={styles.commasShow}/>
                <p className={styles.title}>
                    <img src="/commas.svg" className={styles.commas}/>
                    <span>Reviews</span></p>
                <div className={styles.sliderButtons}>
                    <div   onClick={() =>  setScrollReview(prev=>prev<360?0:prev - 360)}>
                        <ArrowBackIcon/>
                    </div>
                    <div   onClick={() =>  scrollReview/360<=(reviews.length-1)/2&&setScrollReview(prev=>prev===-360?360:prev + 360)}>
                        <ArrowForwardIcon/>
                    </div>
                </div>
            </div>


            {windowInnerWidth>500?<div className={styles.reviewSlider} ref={reactSwipeReviewEl}>

                {reviews.map((item, index) => {
                    return (
                        <div className={styles.slider_review} key={index}  >
                            <div>
                                <p className={taskMore !== index ? styles.text : styles.textMore}>{item.text}
                                </p>
                                {item.text.length>260&&<p style={{color:'#4E7FF1',textDecoration:'underline'}} onClick={()=> {

                                    taskMore===index?setTaskMore(null):setTaskMore(index)
                                }}>{taskMore===index?"Hide":"Read More"}</p>}
                            </div>

                            {taskMore!==index&&<div className={styles.item_rate}>

                                <img src={item.img} width={66} height={66}/>
                                <div style={{display:'flex',flexDirection:'column',gap:13}}>
                                    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                        <StarIcon style={{color:'#FFD601'}}/>
                                        <StarIcon style={{color:'#FFD601'}}/>
                                        <StarIcon style={{color:'#FFD601'}}/>
                                        <StarIcon style={{color:'#FFD601'}}/>
                                        <StarIcon style={{color:'#FFD601'}}/>
                                    </div>
                                    <p  className={styles.reviewName}>{item.name}</p>
                                </div>
                            </div>}
                        </div>
                    )
                })}
            </div>:
                <Slider {...settings}>
                    {reviews.map((item, index) => {
                        return (
                            <div className={styles.slider_review} key={index}  >
                                <div>
                                    <p className={taskMore !== index ? styles.text : styles.textMore}>{item.text}
                                    </p>
                                    {windowInnerWidth>500?item.text.length>260&&<p style={{color:'#4E7FF1',textDecoration:'underline'}} onClick={()=> {

                                        taskMore===index?setTaskMore(null):setTaskMore(index)
                                    }}>{taskMore===index?"Hide":"Read More"}</p>:
                                        item.text.length>250&&<p style={{color:'#4E7FF1',textDecoration:'underline'}} onClick={()=> {

                                            taskMore===index?setTaskMore(null):setTaskMore(index)
                                        }}>{taskMore===index?"Hide":"Read More"}</p>}
                                </div>

                                {taskMore!==index&&<div className={styles.item_rate}>

                                    <img src={item.img} width={66} height={66}/>
                                    <div style={{display:'flex',flexDirection:'column',gap:13}}>
                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                            <StarIcon style={{color:'#FFD601'}}/>
                                            <StarIcon style={{color:'#FFD601'}}/>
                                            <StarIcon style={{color:'#FFD601'}}/>
                                            <StarIcon style={{color:'#FFD601'}}/>
                                            <StarIcon style={{color:'#FFD601'}}/>
                                        </div>
                                        <p  className={styles.reviewName}>{item.name}</p>
                                    </div>
                                </div>}
                            </div>
                        )
                    })}
                </Slider>}
            </div>
        </div>
    );
};

export default Reviews;
