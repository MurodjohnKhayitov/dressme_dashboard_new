import React, { useContext, useEffect, useState } from "react";

import RouterList from "./root/RouterList";
import { dressMainData } from "./hook/ContextTeam";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HelperData } from "./hook/HelperDataStore";
import { SellerRefresh } from "./hook/SellerRefreshToken";
const { REACT_APP_BASE_URL } = process.env;

function App() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [helperDatainform, setHelperDatainform] = useContext(HelperData);
  const [sellerRefreshToken] = useContext(SellerRefresh)

  useEffect(() => {
    const fetchDataRegions = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/regions`)
        if (data?.status >= 200 && data?.status < 300) {
          setDressInfo({ ...dressInfo, regionList: data?.data })
        }

      } catch (error) {
        if (error?.response?.status === 401) {
          sellerRefreshToken()
        }
      }
    };

    if (!dressInfo?.regionList) {
      fetchDataRegions();
    }

  }, []);

  const fetchData = async (customHeaders) => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/shops`, {
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
    'Content-type': 'application/json; charset=UTF-8',
    "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,    // Add other headers as needed
  };
  useQuery(['seller_shops_list'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        setHelperDatainform({ ...helperDatainform, shopsList: data?.data })
      }

      if (data?.status === 401) {
        sellerRefreshToken()
        fetchData()
      }
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        sellerRefreshToken()
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      {/* <NavbarDashboard /> */}
      <RouterList />

    </div>
  );
}

export default App;
