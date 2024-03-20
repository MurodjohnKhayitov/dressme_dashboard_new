import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SellerRefresh } from "./SellerRefreshToken";
import { dressMainData } from "./ContextTeam";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../components/Authentication/AxiosIntance";
export const SellerMainData = createContext();
const { REACT_APP_BASE_URL } = process.env;

export default function SellerUserContext({ children }) {
    const [sellerInformation, setSellerInformation] = useState(null);

    // setDressInfo({ ...dressInfo, sellerStatus: data?.status })

    const [sellerRefreshToken] = useContext(SellerRefresh)

    // const fetchDataSeller = async () => {
    //     try {
    //         const data = await axios.get(`${REACT_APP_BASE_URL}/profile`, {
    //             headers: {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //                 "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
    //             }
    //         });
    //         if (data?.status >= 200 && data?.status < 300) {
    //             setSellerInformation(data?.data)
    //         }

    //     } catch (error) {
    //         if (error?.response === 401) {
    //             sellerRefreshToken()
    //         }
    //     }
    // }
    const fetchData = async (customHeaders) => {
        try {
            const response = await axiosInstance.get("/profile", {
                headers: customHeaders,
            });
            const status = response.status;
            const data = response.data;

            return { data, status };
        } catch (error) {
            const status = error.response ? error.response.status : null;
            return { error, status };
        }
    };
    const customHeaders = {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`, // Add other headers as needed
    };
    useQuery(["get_profile_list3"], () => !sellerInformation && fetchData(customHeaders), {
        onSuccess: (data) => {
            if (data?.status >= 200 && data?.status < 300) {
                setSellerInformation(data?.data)
            }
        },
        onError: (error) => {

            // console.log(error, 'error profile')


            throw new Error(error || "something wrong");

        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    // useEffect(() => {
    //     if (localStorage.getItem('DressmeUserToken')) {
    //         fetchDataSeller()
    //     }
    // }, [])
    return (
        <SellerMainData.Provider value={[sellerInformation, setSellerInformation]}>
            {children}
        </SellerMainData.Provider>
    );
}
