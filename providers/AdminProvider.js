import React, {createContext, useContext} from 'react';
import {QueryClient, QueryClientProvider, useMutation, useQueryClient} from "react-query";
import useAxios from "../hooks/useAxios";
import {ReactQueryDevtools} from "react-query/devtools";
import {loadToken} from "../utils/storage";
export const AdminContext = createContext()
const queryClient = new QueryClient();
const AdminProvider = ({children}) => {
    const axios=useAxios()
    const getBookingTransfers=(data)=>{
        return axios.post("/admin/getTransfers",data)
            .then(data => {
                return data.data.data
            })
            .catch(err => {
                throw new Error(err)
            })
    }
  const getBookingTransfersSelect=()=>{
    return axios.post("/admin/getTransfersSelect")
      .then(data => {
        return data.data
      })
      .catch(err => {
        throw new Error(err)
      })
  }
  const deleteBookingTransfer = (id) => {
        return axios.post("/admin/dellTrasfer", {"_id": id})
          .then(res => res.data)
          .catch(err => {
            throw new Error(err)
          })
  }
  const editBookingTransfer = (data) => {
        return axios.post("/admin/editTransfer", data)
          .then(res => res.data)
          .catch(err => {
            throw new Error(err)
          })

  }

  const addBookingTransfer = (data) => {

        return axios.post("/admin/makeTrasfer", data)
          .then(res => res.data)
          .catch(err => {
            throw new Error(err)
          })
  }
  const getBooks = (data) => {
    const token = loadToken()
    return axios.post("/admin/getBooks", data,{
      headers: {
        'Authorization': token,
      }
    })
  }
  const deleteBook = (id) => {
    return axios.post("/admin/dellBook", {"_id": id})
      .then(res => res.data)
      .catch(err => {
        throw new Error(err)
      })
  }
  const getCompanies = (data) => {
    const token = loadToken()
    return axios.post("/admin/getCompanies", data,{
      headers: {
        'Authorization': token,
      }
    })
  }
  const deleteCompany = (id) => {
    return axios.post("/admin/dellCompany", {"_id": id})
      .then(res => res.data)
      .catch(err => {
        throw new Error(err)
      })
  }
  const changeCompanyStatus = (id,status) => {
    return axios.post("/admin/banunbanCompany", {"_id": id,"status":status})
      .then(res => res.data)
      .catch(err => {
        throw new Error(err)
      })
  }
    return (
        // <QueryClientProvider client={queryClient}>
        //     <ReactQueryDevtools initialIsOpen={false}/>
            <AdminContext.Provider value={{getCompanies,deleteCompany,changeCompanyStatus,getBooks,deleteBook,getBookingTransfers,getBookingTransfersSelect,deleteBookingTransfer,editBookingTransfer,addBookingTransfer}}>
                {children}
            </AdminContext.Provider>

        // </QueryClientProvider>
    );
};
export const useAdminContext = () => {
    const auth = useContext(AdminContext);
    if (auth == null) {
        throw new Error("useAuth() called outside of a AdminProvider?");
    }
    return auth;
};
export default AdminProvider;