import React, {createContext, useContext} from 'react';
import useAxios from "../hooks/useAxios";
import {ReactQueryDevtools} from "react-query/devtools";
import {QueryClientProvider} from "react-query";
import {AdminContext} from "./AdminProvider";
import {loadToken} from "../utils/storage";
export const BookingContext = createContext()
const BookingProvider = ({children}) => {
  const axios=useAxios()
  const getBooks = () => {
    const token = loadToken()
    return axios.post("/partner/getBooks", {},{
      headers: {
        'Authorization': token,
      }
  })
  }
  const getMyBooks = () => {
    const token = loadToken()
    return axios.post("/partner/getMyBooks", {},{
      headers: {
        'Authorization': token,
      }
    })
  }
  const acceptBook = (id) => {
    const token = loadToken()
    return axios.post("/partner/acceptBook", {"_id":id},{
      headers: {
        'Authorization': token,
      }
    })
  }
  return (

      <BookingContext.Provider value={{getBooks,acceptBook,getMyBooks}}>
        {children}
      </BookingContext.Provider>


  );
};
export const useBookingContext = () => {
  const auth = useContext(BookingContext);
  if (auth == null) {
    throw new Error("useBookingContext() called outside of a BookingProvider?");
  }
  return auth;
};
export default BookingProvider;