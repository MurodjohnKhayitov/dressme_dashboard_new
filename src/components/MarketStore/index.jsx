import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";
import { HelperData } from "../../hook/HelperDataStore";
import { SellerRefresh } from "../../hook/SellerRefreshToken";
import { dressRegionList } from "../../hook/RegionList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShopList } from "../../hook/ShopList";
import axiosInstance from "../Authentication/AxiosIntance";
const { REACT_APP_BASE_URL } = process.env;


export default function MarketStore() {
   const [shopList, setShopList] = useContext(ShopList)
 
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // const fetchData = async (customHeaders) => {
  //   try {
  //     const response = await axiosInstance.get("/shops", {
  //       headers: customHeaders,
  //     });
  //     const status = response.status;
  //     const data = response.data;

  //     return { data, status };
  //   } catch (error) {
  //     const status = error.response ? error.response.status : null;
  //     return { error, status };
  //   }
  // };
  // const customHeaders = {
  //   "Content-type": "application/json; charset=UTF-8",
  //   Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`, // Add other headers as needed
  // };
  // useQuery(["seller_shops_list_index"], () => fetchData(customHeaders), {
  //   onSuccess: (data) => {
  //     if (data?.status >= 200 && data?.status < 300) {
  //       setShopList(data?.data)
  //     }
  //   },
  //   onError: (error) => {
  //     throw new Error(error || "something wrong");
  //   },
  //   keepPreviousData: true,
  //   refetchOnWindowFocus: false,
  // });
  return (
    <div className="mb-10">
      <Outlet />
    </div>
    // <div>{!addStore ? <MyMarket /> : <AddStore onClick={toggleAdd} />}</div>
  );
}
