import React, { useContext, useEffect, useState } from "react";

import RouterList from "./root/RouterList";
import { Navigate } from "react-router-dom";
import axiosInstance from "./components/Authentication/AxiosIntance";
import { useQuery } from "@tanstack/react-query";
import { SellerMainData } from "./hook/SellerUserContext";


function App() {
  const [sellerInformation, setSellerInformation] = useContext(SellerMainData);
  const access_token = localStorage.getItem("DressmeUserToken") ? localStorage.getItem("DressmeUserToken") : null;
  console.log(sellerInformation, 'sellerInformation');
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
  useQuery(["get_profile_app"], () => !sellerInformation && access_token && fetchData(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        setSellerInformation(data?.data)
      }
    },
    onError: (error) => {
      throw new Error(error || "something wrong");
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (
      localStorage.getItem("i18nextLng") === "en-US" ||
      localStorage.getItem("i18nextLng") === "en-UZ"
    ) {
      localStorage.setItem("i18nextLng", "ru");
      window.location.reload();
    }
  }, []);

  // if (!access_token) {
  //   return <Navigate to="/login-seller" replace />;
  // }


  return (
    <div>
      {/* <NavbarDashboard /> */}
      <RouterList />
    </div>
  );
}

export default App;
