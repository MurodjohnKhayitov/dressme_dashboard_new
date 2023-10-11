import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { MenuCloseIcons } from "../../../assets/icons";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function NoLocations() {
  const [openSelect, setOpenSelect] = useState(true);

  const url = "https://api.dressme.uz/api/seller"


  // ------------GET HAS SHOP ?-----------------
  useQuery(["shops"], () => {
    return fetch(`${url}/shops`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",

        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },

    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        // console.log(res, "res");
      },
      onError: (err) => {
        // console.log(err, "err");
      },
      // keepPreviousData: true,
      // refetchOnWindowFocus: false,
    }
  )

  // // ------------GET METHOD Region-----------------
  // const { isLoading } = useQuery(["get region"], () => {
  //   return fetch(`${url}/regions`).then(res => res.json())
  // },
  //   {
  //     onSuccess: (res) => {
  //       setState({ ...state, getRegionList: res })
  //     },
  //     onError: (err) => {
  //       console.log(err, "err");
  //     },
  //     keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
  //     refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
  //   }
  // )

  // ------------POST METHOD-----------------
  // const { mutate } = useMutation(() => {
  //   return fetch(`${url}/register`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },

  //     body: parseInt(state?.seller_type_id) >= 3 ?
  //       JSON.stringify({
  //         name: state?.firstName,
  //         surname: state?.lastName,
  //         email: state?.email,
  //         password: state?.password,
  //         password_confirmation: state?.confirmPassword,
  //         phone: sendMessagePhoneNumber,
  //         card_number: BankCard,
  //         seller_type_id: state?.seller_type_id,
  //         region_id: state?.region,
  //         sub_region_id: state?.sub_region,
  //         company_name: state?.company_name,
  //       }) : JSON.stringify({
  //         name: state?.firstName,
  //         surname: state?.lastName,
  //         email: state?.email,
  //         password: state?.password,
  //         password_confirmation: state?.confirmPassword,
  //         phone: sendMessagePhoneNumber,
  //         card_number: BankCard,
  //         seller_type_id: state?.seller_type_id,
  //         region_id: state?.region,
  //         sub_region_id: state?.sub_region,
  //       })

  //   }).then((res) => res.json())
  // })




  return (
    <div className="w-full h-[calc(100vh-200px)]  flex items-center justify-center">
      {openSelect ? (
        <div className="w-fit h-fit flex flex-col justify-center items-center gap-y-[50px]">
          <p className="text-red-500 text-2xl not-italic font-AeonikProRegular">
            У вас пока нет локации !
          </p>
          <button
            onClick={() => setOpenSelect(false)}
            className="px-7 active:scale-95  active:opacity-70 cursor-pointer py-3 rounded-lg flex items-center justify-center bg-textBlueColor text-white text-lg not-italic font-AeonikProMedium"
          >
            Добавить локацию
          </button>
        </div>
      ) : (
        <div className="fixed inset-0 z-10 ">
          <div
            className="fixed cursor-pointer inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setOpenSelect(true)}
          ></div>
          <div className="flex items-center min-h-screen justify-center">
            <div className="relative w-[440px] py-[5px] h-[350px] rounded-[20px] bg-white overflow-hidden">
              <div className="absolute top-4 right-4 ">
                <button type="button" onClick={() => setOpenSelect(true)}>
                  <MenuCloseIcons colors={"#A5A5A5"} />
                </button>
              </div>
              <div className="w-full h-fit flex items-center justify-center py-5 border-b border-borderColor2">
                <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
                  Прикрепить к магазину
                </p>
              </div>
              <div className="w-full px-[10px] py-[30px] flex flex-col gap-y-[10px]">
                <Link
                  to={"/store/location-add"}
                  className="w-full py-[10px] flex items-center justify-center rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg"
                >
                  <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                    {" "}
                    Nike
                  </span>
                </Link>
                <Link
                  to={"/store/location-add"}
                  className="w-full py-[10px] flex items-center justify-center rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg"
                >
                  <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                    {" "}
                    Nike Kids
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
