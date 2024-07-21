import '../styles/globals.sass'
import {createContext, useContext, useEffect, useState} from "react";
import useAxios from "../hooks/useAxios";
import {loadToken, removeToken, saveToken} from "../utils/storage";
import AdminProvider from "../providers/AdminProvider";
import BookingProvider from "../providers/BookingProvider";

export const MeContext = createContext()

function MyApp({Component, pageProps}) {
  const [passengerEmail,setPassengerEmail]=useState('')
  const [passengerName,setPassengerName]=useState('')
  const [passengerPhone,setPassengerPhone]=useState('')
  const [passengerAdditionalPhone,setPassengerAdditionalPhone]=useState('')
  const [checkEmail, setCheckEmail] = useState(false)
  const [signIn, setSignIn] = useState(false)
  const [price, setPrice] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [returnTrip, setReturnTrip] = useState(false)
  const [classPrice, setClassPrice] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [passengers, setPassengers] = useState(1)
  const [baggage, setBaggage] = useState(0)
  const [flightNumber, setFlightNumber] = useState('')
  const [sign, setSign] = useState(false)
  const [child, setChild] = useState(false)
  const [bottle, setBottle] = useState(false)
  const [stop, setStop] = useState(false)
  const [stopText, setStopText] = useState('')
  const [time, setTime] = useState(false)
  const [comment, setComment] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [childCount, setChildCount] = useState(1)
  const [bottleCount, setBottleCount] = useState(1)
  const [extraServices, setExtraServices] = useState([])
  const [user, setUser] = useState({})
  const [bookingTransfer, setBookingTransfer] = useState({})
  const offers = [{
    time: '8:30 pm',
    date: 'July 2, 2022',
    number: '10078158',
    from: 'Nice Côte d`Azur Airport (NCE), Rue Costes et Bellonte, 06206 Nice France',
    routeLength: '64 км',
    routeTime: '54 мин',
    to: 'Costes et Bellonte',
    vehicleType: 'Economy',
    passengers: 2,
    baggage: 3,
    extra: ['I require a child seat', 'Meet me with a sign'],
    cost: 150,
    message: true
  }, {
    time: '8:30 pm',
    date: 'July 2, 2022',
    number: '10078157',
    from: 'Nice Côte d`Azur Airport (NCE),',
    routeLength: '25 км',
    routeTime: '20 мин',
    to: 'Rue Costes et Bellonte, 06206 Nice France',
    vehicleType: 'Economy +',
    passengers: 4,
    baggage: 4,
    extra: [],
    cost: 110,
    message: false
  }, {
    time: '8:30 pm',
    date: 'July 2, 2022',
    number: '10078156',
    from: 'Nice Côte d`Azur Airport (NCE), Rue Costes et Bellonte, 06206 Nice France',
    routeLength: '72 км',
    routeTime: '60 мин',
    to: 'Costes et Bellonte',
    vehicleType: 'Economy',
    passengers: 1,
    baggage: 2,
    extra: ['A bottle of water'],
    cost: 170,
    message: false
  }]
  const [token, setToken] = useState('')
  const axios = useAxios()
  const checkBottle = () => {
    return extraServices.filter(item => item.name === 'A bottle of water').length !== 0
  }
  const checkChild = () => {
    return extraServices.filter(item => item.name === 'A child seat').length !== 0
  }
  const checkExtraTime = () => {
    return extraServices.filter(item => item.name === 'Extra waiting time').length !== 0
  }
  const checkExtraStop = () => {
    return extraServices.filter(item => item.name === 'Extra stop').length !== 0
  }
  useEffect(()=>{

    setPassengerName(localStorage.getItem('passengerName')||'')
    setPassengerEmail(localStorage.getItem('passengerEmail')||'')
    setPassengerPhone(localStorage.getItem('passengerPhone')||'')
    setPassengerAdditionalPhone(localStorage.getItem('passengerAdditionalPhone')||'')
    setFrom(localStorage.getItem('from')||'')
    setTo(localStorage.getItem('to')||'')
    setBookingDate(localStorage.getItem('bookingDate')||'')
    setBookingTime(localStorage.getItem('bookingTime')||'')
    setReturnTime(localStorage.getItem('returnTime')||'')
    setReturnDate(localStorage.getItem('returnDate')||'')
    setFlightNumber(localStorage.getItem('flightNumber')||'')
    setPassengers(parseInt(localStorage.getItem('passengers'))||1)
    setBaggage(parseInt(localStorage.getItem('baggage'))||0)
    setVehicle(localStorage.getItem('vehicle')||'')
    setClassPrice(parseInt(localStorage.getItem('classPrice'))||null)
    setPrice(parseInt(localStorage.getItem('price'))||null)
    setSign(localStorage.getItem('sign')==='true')
    setChildCount(parseInt(localStorage.getItem('childCount'))||1)
    setBottleCount(parseInt(localStorage.getItem('bottleCount'))||1)
    setStop(localStorage.getItem('stop')||false)
    setStopText(localStorage.getItem('stopText')||'')
    setTime(localStorage.getItem('time')==='true')
    setChild(localStorage.getItem('child')==='true')
    setBottle(localStorage.getItem('bottle')==='true')
    setComment(localStorage.getItem('comment')==='true')
    setCommentText(localStorage.getItem('commentText')||'')
    setExtraServices(localStorage.getItem('extraServices')||[])
  },[])

  useEffect(()=>{
    if (child&&!checkChild()){
      setExtraServices((prev)=>prev.concat([{
        name: 'A child seat',
        price: 3 * childCount,
        count: childCount
      }]))
    }
    if (bottle&&!checkBottle()){
      setExtraServices((prev)=>prev.concat([{
        name: 'A bottle of water',
        price: 2 * bottleCount,
        count: bottleCount
      }]))
    }
    if (stop&&!checkExtraStop()){
      setExtraServices((prev)=>prev.concat([{
        name: 'Extra stop',
        price: 15
      }]))
    }
    if (time&&!checkExtraTime()){
      setExtraServices((prev)=>prev.concat([{
        name: 'Extra waiting time',
        price: 30
      }]))
    }
  },[child,bottle,stop])
  const makeBooking=(data)=>{
    console.log(bookingDate)
    return axios.post('/user/makeBooking', {
      Passengers: passengers,
      Suitcases: baggage,
      TypeCar: vehicle,
      BookInfo: {
        From: from.value||from,
        To: to.value||to,
        bookingDate: bookingDate,
        bookingTime: bookingTime,
        returnTrip: returnTrip,
        returnTime:returnTime,
        returnDate:returnDate,
        Price:price,
      },
      PassengerDetails:{
        name:passengerName,
        email:passengerEmail,
        phone:passengerPhone,
        additionalPhone:passengerAdditionalPhone
      },
      Personalize:{
        flightNumber:flightNumber,
        signService:sign,
        childSeat:child?childCount:0,
        waterBottle:bottle?bottleCount:0,
        extraStop:stop,
        extraTime:time,
        comment:comment?commentText:''
      }
    }).then(res => {
      return res.data
    })
  }
  const payBook=(id)=>{
    return axios.post('/user/payBook', {
      '_id':id
    }).then(res => {
      return res.data
    })
  }
  const getUserTransferSelect=()=>{
    return axios.post('/user/getTransfersSelect', {}).then(res => {
      return res.data
    })
  }
  const register = (aboutCompany, basicInfo) => {

    return axios.post('/partner/register', {
      'AboutCompany': aboutCompany,
      'BasicInformation': basicInfo,
      'Email': basicInfo?.email,
      'Password': basicInfo?.password
    }).then(res => {

        return res.data
      }
    )
  }
   const checkMe = (token) => {

    return axios.post('/partner/checkMe', {}, {
      headers: {
        'Authorization': token
      }
    }).then(res => {

      return res.data
    })
  }
  const verifyEmail = (token) => {
    return axios.post('/partner/VerifyEmail', {}, {
      headers: {
        'Authorization': token
      }
    }).then(res => {
      return res.data
    })
  }
  const login = (email, password) => {
    return axios.post('/partner/login', {
      'Email': email,
      'Password': password
    },).then(res => {
      setToken(res.data.data)
      saveToken(res.data.data)
      return res.data
    })
  }
  const logOut = () => {
    removeToken()
    setToken('')
  }

  const changeCompanyInfo = (aboutCompany) => {
    return axios.post('/partner/changeCompanyInfo', {
      'AboutCompany': aboutCompany,
    },{
      headers: {
        'Authorization': token
      }
    })
  }
  const changeMyInfo = (basicInfo) => {
    return axios.post('/partner/changeMyInfo', {
      'BasicInformation': basicInfo,
      'Email': basicInfo?.email,
    },{
      headers: {
        'Authorization': token
      }
    })
  }
  const getDrivers = () => {
    const token = loadToken()
    return axios.post('/partner/getDriver', {},{
      headers: {
        'Authorization': token
      }
    })
  }
  const getVehicles = () => {
    const token = loadToken()
    return axios.post('/partner/getVehicle', {},{
      headers: {
        'Authorization': token
      }
    })
  }
  const addVehicle = (data) => {

    const token = loadToken()

    const formData = new FormData();
    formData.append("Class", data.vehicleClass)
    formData.append("BrandModel", data.brandModal)
    formData.append("Year", data?.year);
    formData.append("Color", data?.color);
    formData.append("License", data?.license);
    formData.append("CarteGrise", data?.carte);
    formData.append("Insurance", data?.insurance);
    return axios.post('/partner/addVehicle', formData,{
      headers: {
        'Authorization': token,
        "Content-Type": "multipart/form-data"
      }
    })

  }
  const addDriver = (data) => {

    const token = loadToken()

    const formData = new FormData();
    formData.append("FullName", data.fullName)
    formData.append("Email", data.email)
    formData.append("Phone", data?.phone);
    formData.append("License", data?.license);
    formData.append("ProCard", data?.proCard);
    return axios.post('/partner/addDriver', formData,{
      headers: {
        'Authorization': token,
        "Content-Type": "multipart/form-data"
      }
    })
  }
  const deleteDriver = (id) => {
    console.log(id)
    const token = loadToken()

    return axios.post('/partner/deleteDriver', {
      'driverID':id
    },{
      headers: {
        'Authorization': token,
      }
    })
  }
  const deleteVehicle = (id) => {

    const token = loadToken()

    return axios.post('/partner/deleteVehicle', {
      'vehicleID':id
    },{
      headers: {
        'Authorization': token,
      }
    })
  }
  const getVehicleById = (id) => {

    const token = loadToken()

    return axios.post('/partner/getVehById', {
      '_id':id
    },{
      headers: {
        'Authorization': token,
      }
    })
  }
  const getDriverById = (id) => {

    const token = loadToken()

    return axios.post('/partner/getDriverById', {
      '_id':id
    },{
      headers: {
        'Authorization': token,
      }
    })
  }
  const editDriver = (editData) => {

    const token = loadToken()

    return axios.post('/partner/editDriver', {
      FullName:editData?.fullName,
      Email:editData?.email,
      Phone:editData?.phone,
      driverID:editData?.driverId
    },{
      headers: {
        'Authorization': token,
      }
    })
  }
  const editVehicle = (editData) => {

    const token = loadToken()

    return axios.post('/partner/editVehicle', {
      vehicleID:editData?.vehicleId,
      Class:editData?.vehicleClass,
      BrandModel:editData?.brandModal,
      Year:editData?.year,
      Color:editData?.color,
      License:editData?.license
    },{
      headers: {
        'Authorization': token,
      }
    })
  }
useEffect(()=>{
  const tokenLoad = loadToken()
  setToken(tokenLoad)
},[])
  return <MeContext.Provider value={{
    passengerName,
    setPassengerName,
    passengerEmail,
    setPassengerEmail,
    passengerPhone,
    setPassengerPhone,
    passengerAdditionalPhone,
    setPassengerAdditionalPhone,
    price,
    setPrice,
    classPrice,
    setClassPrice,
    vehicle,
    setVehicle,
    passengers,
    setPassengers,
    baggage,
    setBaggage,
    sign,
    setSign,
    child,
    setChild,
    bottle,
    setBottle,
    stop,
    setStop,
    time,
    setTime,
    comment,
    setComment
    ,flightNumber, setFlightNumber,
    childCount,
    setChildCount,
    bottleCount,
    setBottleCount,
    extraServices,
    setExtraServices,
    commentText,setCommentText,stopText,setStopText,
    offers,
    register,
    checkEmail,
    setCheckEmail,
    signIn,
    setSignIn,
    from, setFrom,
    to,setTo,
    bookingDate,setBookingDate,
    bookingTime,setBookingTime,
    returnTrip,setReturnTrip,
    returnTime, setReturnTime,
    returnDate,setReturnDate,
    bookingTransfer,setBookingTransfer,
    getUserTransferSelect,
    makeBooking,
    payBook,
    checkMe,
    verifyEmail,
    login,
    changeMyInfo,
    changeCompanyInfo,
    getVehicles,
    getDrivers,
    addVehicle,
    addDriver,
    deleteVehicle,
    deleteDriver,
    getDriverById,
    getVehicleById,
    logOut,
    editDriver,
    editVehicle,
    user, setUser
  }}>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
    <link href="https://fonts.googleapis.com/css2?family=Anek+Latin:wght@200&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
    <link rel="stylesheet" type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"/>
    <script async src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <AdminProvider>
    <BookingProvider>
      <Component {...pageProps} />
    </BookingProvider>

  </AdminProvider>

  </MeContext.Provider>
}

export const useTaxiContext = () => {
  const auth = useContext(MeContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};
export default MyApp
