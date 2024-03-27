import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../hook/useHttp";
import LoadingForSeller from "../Loading/LoadingFor";
import axios from "axios";
import { SellerRefresh } from "../../hook/SellerRefreshToken";
import { ShopLocationProductList } from "../../hook/ShopLocationProductList";
import axiosInstance from "../Authentication/AxiosIntance";
const { REACT_APP_BASE_URL } = process.env;


export default function Products() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [sellerRefreshToken] = useContext(SellerRefresh);
  const [shopLocationProductList, setShopLocationProductList] = useContext(ShopLocationProductList);
  const [loader, setLoader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== 'products/location/:id') {
      setDressInfo({ ...dressInfo, nextPageShowForm: true });
    }
  }, [location.pathname]);

  const fetchData = async (customHeaders) => {
    setLoader(true);
      try {
      const response = await axiosInstance.get("/products/locations", {
        headers: customHeaders,
      });
      const status = response.status;
      const data = response.data;
      setLoader(false);
      return { data, status };
    } catch (error) {
      setLoader(false);
      const status = error.response ? error.response.status : null;
      return { error, status };
    }
  };

  const customHeaders = {
    'Content-type': 'application/json; charset=UTF-8',
    "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,    // Add other headers as needed
  };

  const { isLoading } = useQuery(['seller_location_list12'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        // setGetProductList(data?.data)
        data?.data?.products_locations?.forEach(item => {
          if (item?.shop_locations?.length >= 1) {
            setShopLocationProductList(item?.shop_locations);
          }
        });
      }
    },
    onError: (error) => {
      throw new Error(error || "something wrong");
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

   return (
    <main className="products w-full px-4 md:px-10 md:pb-5">
      {!isLoading ? <Outlet /> : <LoadingForSeller />}
    </main>
  );
}
