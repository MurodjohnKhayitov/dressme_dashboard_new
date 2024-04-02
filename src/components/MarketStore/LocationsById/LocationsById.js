import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import LoadingForSeller from "../../Loading/LoadingFor";
import { useHttp } from "../../../hook/useHttp";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../language/LanguageItem";
import { BackBtn } from "../../backBtn/backBtn";
import NoLocations from "../../MarketLocations/NoLocations/NoLocations";

export default function LocationsByIdShow() {
  const { request } = useHttp();
  const [state, setState] = useState({
    locationListId: "",
    locationIsCheck: false,
    loading: true,
    searchName: "",
  });

  const { t } = useTranslation("shops");
  const [languageDetector] = useContext(LanguageDetectorDress);

  const { id } = useParams();
  const newId = id?.replace(":", "");

  // ------------GET  Has Magazin ?-----------------
  useQuery(
    ["locations_index_id"],
    () => {
      return request({ url: `/shops/locations/shop/${newId}`, token: true });
    },
    {
      onSuccess: (res) => {
        if (res) {
          setState({
            ...state,
            locationListId: res,
            locationIsCheck: res?.locations_exist,
            loading: false,
          });
        }
      },
      onError: (err) => {
        setState({ ...state, loading: false });
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const navigate = useNavigate();
  const goMapCity = (id) => {
    navigate(`/locations-store/city/${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/${id}`);
  };
  const addLocationByMarket = () => {
    navigate(`/locations-store/${newId}`);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div>
      {state?.loading ? (
        <LoadingForSeller />
      ) : state?.locationIsCheck ? (
        <div className="w-full h-full px-4 md:px-10 ">
          <div className=" md:hidden pt-6 pb-3 border-b border-[#F2F2F2] mb-3 flex items-center justify-between">
            <BackBtn />
            <p className="text-black text-2xl not-italic font-AeonikProMedium text-center">
              {t("location")}
            </p>
            <div className="w-[30px]"></div>
          </div>
          <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor hidden md:block">
            <div className="flex justify-end items-center md:justify-between">
              <section className="hidden md:flex items-center">
                <div className="mr-5">
                  <BackBtn />
                </div>
                <p className="text-black text-2xl not-italic font-AeonikProMedium">
                  {t("location")}
                </p>
              </section>
            </div>
          </div>
          <div className="md:max-w-full w-full max-w-[440px] mx-auto   flex flex-col justify-center">

            <div className="md:mt-[16px] w-full  flex justify-between items-center ">
              <p className="text-black text-[18px] md:text-2xl not-italic font-AeonikProMedium my-4">
                {state?.locationListId?.locations[0]?.shop?.name}{" "}
                {state?.locationListId?.locations?.length > 1 && (
                  <span className="hidden md:inline">
                    ({state?.locationListId?.locations?.length})
                  </span>
                )}
              </p>
              <button
                onClick={addLocationByMarket}
                className="md:hidden p-2 flex items-center rounded-lg active:scale-95  active:opacity-70 justify-center bg-weatherWinterColor"
              >
                <span className="text-[11px]  text-white not-italic font-AeonikProMedium">
                  {t("add_location")}
                </span>
              </button>
            </div>
            {/* Table */}
            <div className="w-full    h-fit ">
              <div className="w-full mb-[10px] hidden md:block">
                <ul className="w-full h-full flex items-center justify-between bg-lightBgColor border md:rounded-xl">
                  <li className="w-[70px] pl-4">
                    <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle2">
                      No:
                    </span>
                  </li>
                  <li className="w-[200px] pl-4 mr-[60px]">
                    <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle2">
                      {t("photo")}
                    </span>
                  </li>
                  <div className="w-[calc(100%-230px)]  flex items-center justify-between">
                    <li className="w-[30%] ">
                      <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                        {t("region")}
                      </span>
                    </li>
                    <li className="w-[20%]">
                      <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                        {t("address")}
                      </span>
                    </li>
                    <li className="w-[20%]">
                      <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                        {t("work_time")}
                      </span>
                    </li>
                    <li className="w-[30%] flex items-center justify-end ">
                      <button
                        onClick={addLocationByMarket}
                        className="px-[30px] py-3 flex items-center rounded-lg active:scale-95  active:opacity-70 justify-center bg-weatherWinterColor"
                      >
                        <span className="text-sm  text-white not-italic font-AeonikProMedium">
                          {t("add_location")}
                        </span>
                      </button>
                    </li>
                  </div>
                </ul>
              </div>

              <div className="w-full h-full flex flex-col  md:rounded-xl overflow-auto rounded-xl md:border gap-y-[30px] md:gap-y-0  ">
                {state?.locationListId?.locations?.map((data, index) => {
                  return (
                    <div key={index}>
                      <ul className="w-full last:border-b-0  md:px-0 md:py-3 md:bg-lightBgColor overflow-hidden hidden md:flex items-center justify-between mb-[6px] md:mb-0 gap-x-5 md:gap-x-0 border-b  bg-lightBgColor">
                        <li className="w-[70px]  pl-4 flex items-center text-tableTextTitle2 text-lg not-italic font-AeonikProRegular">
                          {index + 1}
                        </li>
                        <li className="w-[200px] h-[100px] flex items-center mr-[60px] rounded-lg overflow-hidden border">
                          <img
                            className="w-[100%] h-[100%] object-cover rounded-lg  "
                            src={data?.url_image_path_one}
                            alt=""
                          />
                        </li>
                        <div className="w-[calc(100%-230px)] flex items-center justify-between">
                          <li className="md:w-[32%] h-full pr-5">
                            <p className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium">
                              {languageDetector?.typeLang === "ru" &&
                                data?.region?.name_ru}
                              {languageDetector?.typeLang === "uz" &&
                                data?.region?.name_uz}
                              ,
                              <span className="ml-[4px]">
                                {languageDetector?.typeLang === "ru" &&
                                  data?.sub_region?.name_ru}
                                {languageDetector?.typeLang === "uz" &&
                                  data?.sub_region?.name_uz}
                              </span>
                            </p>
                          </li>
                          <li className="md:w-[22%] h-full">
                            <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                              {data?.address || "address"}
                            </span>{" "}
                          </li>
                          <li className="md:w-[13%] h-full">
                            <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                              {data?.work_time_from || "startTime"} -{" "}
                              {data?.work_time_to || "endTime"}
                            </span>
                          </li>
                          <li className="md:w-[15%] h-full flex items-center justify-center text-center">
                            <button
                              onClick={() => goMapWear(data?.id)}
                              className="text-textBlueColor text-center hover:underline text-[11px] md:text-base not-italic font-AeonikProMedium"
                            >
                              {t("cloth")}
                            </button>
                          </li>
                          <li className="md:w-[25%] h-full flex items-center justify-center text-center">
                            <button
                              onClick={() => goMapCity(data?.id)}
                              className="text-textBlueColor text-center hover:underline text-[11px] md:text-base not-italic font-AeonikProMedium"
                            >
                              {t("more_details")}
                            </button>
                          </li>
                        </div>
                      </ul>

                      {/* Mobile */}
                      <div className="border rounded-xl border-[##F2F2F2] p-[10px]  md:hidden w-full ">
                        <div className="mb-2">
                          <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                            <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                            <span className="text-checkboxBorder">
                              {index + 1}
                            </span>
                            <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                          </div>
                        </div>
                        {/* <div className="mb-3 h-[208px]">
                          <figure className="w-full h-full rounded-lg overflow-hidden">
                            <img
                              className="w-[100%] h-[100%]  object-cover"
                              src={data?.url_image_path_one}
                              alt=""
                            />
                          </figure>
                        </div> */}
                        <div className="mb-3 max-h-[208px] h-full">
                          <figure className="w-full h-full border border-lightBorderColor rounded-lg overflow-hidden">
                            <img
                              className="w-[100%] h-[100%]  object-cover"
                              src={data?.url_image_path_one}
                              alt="data?.url_image_path_one"
                            />
                          </figure>
                        </div>
                        <div className="mb-2 mt-8">
                          <div className="border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-1 ll:px-[10px] py-[5px] flex text-[#3F6175] font-AeonikProMedium text-[13px] items-center mb-[8px]">
                            <div className="w-[24%] text-[#3F6175] text-[12px] not-italic font-AeonikProMedium pr-[10px]">
                              {t("region")}
                            </div>
                            <div className="w-[46%] text-[#3F6175] text-[12px] not-italic font-AeonikProMedium pr-[10px]">
                              {t("address")}
                            </div>
                            <div className="w-[30%] text-[#3F6175] text-[12px] text-center not-italic font-AeonikProMedium">
                              {t("work_time")}
                            </div>
                          </div>

                          <div className="px-1 ll:px-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[13px]">
                            <div className="pr-[5px] ll:pr-[10px] w-[24%] break-words  text-gray-700 text-[11px] not-italic font-AeonikProMedium">
                              {languageDetector?.typeLang === "ru" &&
                                data?.region?.name_ru}
                              {languageDetector?.typeLang === "uz" &&
                                data?.region?.name_uz}
                            </div>
                            <div className="relative pr-[5px] ll:pr-[10px] h-[60px] overflow-hidden  w-[46%] 	text-[11px] not-italic font-AeonikProMedium">
                              <div className="absolute ToogleOff left-0 w-full h-full z-[10] top-0"></div>

                              {data?.address}
                            </div>
                            <div className="w-[30%] flex  justify-center text-[11px] not-italic font-AeonikProMedium">
                              {data?.work_time_from || "startTime"} -{" "}
                              {data?.work_time_to || "endTime"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-x-[15px]">
                          <button
                            onClick={() => goMapWear(data?.id)}
                            className="text-[#ED7925] bg-[#FDF1E8] text-center w-[50%] h-[31px] py-2 rounded-lg text-[13px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                          >
                            <span className="mr-[5px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_1350_8602)">
                                  <path
                                    d="M12.3335 5.66683V12.3335M12.3335 12.3335V14.6668H3.66683V12.3335M12.3335 12.3335H14.6668V5.66683C14.6668 4.66683 14.0002 3.50016 13.0002 2.66683C12.0002 1.8335 10.0002 1.3335 10.0002 1.3335H6.00016C6.00016 1.3335 4.00016 1.8335 3.00016 2.66683C2.00016 3.50016 1.3335 4.66683 1.3335 5.66683V12.3335H3.66683M3.66683 12.3335V5.66683"
                                    stroke="#ED7925"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10 1.3335C10 1.86393 9.78929 2.37264 9.41421 2.74771C9.03914 3.12278 8.53043 3.3335 8 3.3335C7.46957 3.3335 6.96086 3.12278 6.58579 2.74771C6.21071 2.37264 6 1.86393 6 1.3335"
                                    stroke="#ED7925"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1350_8602">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                            {t("cloth")}
                          </button>
                          <button
                            onClick={() => goMapCity(data?.id)}
                            className="text-[#007DCA] bg-[#E8F5FD] text-center w-[50%] h-[31px] py-2 rounded-lg text-[13px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                          >
                            {t("more_details")}
                            <span className="ml-[5px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="8"
                                viewBox="0 0 16 8"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_1350_8461)">
                                  <path
                                    d="M5.80625 4.7502H1.25C1.0375 4.7502 0.859253 4.6782 0.715253 4.5342C0.571253 4.3902 0.499503 4.2122 0.500003 4.0002C0.500003 3.7877 0.572003 3.60945 0.716003 3.46545C0.860003 3.32145 1.038 3.2497 1.25 3.2502H5.80625L4.0625 1.4877C3.925 1.3502 3.853 1.1782 3.8465 0.971695C3.84 0.765195 3.912 0.587195 4.0625 0.437695C4.2 0.300195 4.375 0.231445 4.5875 0.231445C4.8 0.231445 4.975 0.300195 5.1125 0.437695L8.15 3.4752C8.3 3.6252 8.375 3.8002 8.375 4.0002C8.375 4.2002 8.3 4.3752 8.15 4.5252L5.1125 7.5627C4.975 7.70019 4.803 7.7722 4.5965 7.7787C4.39 7.78519 4.212 7.71319 4.0625 7.5627C3.925 7.4252 3.85625 7.25019 3.85625 7.03769C3.85625 6.82519 3.925 6.6502 4.0625 6.5127L5.80625 4.7502ZM9.5 7.7502C9.2875 7.7502 9.1095 7.67819 8.966 7.53419C8.8225 7.39019 8.7505 7.21219 8.75 7.0002C8.75 6.78769 8.822 6.60945 8.966 6.46545C9.11 6.32145 9.288 6.24969 9.5 6.2502H14.75C14.9625 6.2502 15.1408 6.3222 15.2848 6.4662C15.4288 6.6102 15.5005 6.7882 15.5 7.0002C15.5 7.2127 15.428 7.39094 15.284 7.53494C15.14 7.67894 14.962 7.7507 14.75 7.7502H9.5ZM9.5 1.7502C9.2875 1.7502 9.1095 1.6782 8.966 1.5342C8.8225 1.3902 8.7505 1.2122 8.75 1.0002C8.75 0.787695 8.822 0.609446 8.966 0.465446C9.11 0.321446 9.288 0.249695 9.5 0.250195H14.75C14.9625 0.250195 15.1408 0.322195 15.2848 0.466195C15.4288 0.610195 15.5005 0.788195 15.5 1.0002C15.5 1.2127 15.428 1.39095 15.284 1.53495C15.14 1.67895 14.962 1.7507 14.75 1.7502H9.5ZM11.75 4.7502C11.5375 4.7502 11.3593 4.6782 11.2153 4.5342C11.0713 4.3902 10.9995 4.2122 11 4.0002C11 3.7877 11.072 3.60945 11.216 3.46545C11.36 3.32145 11.538 3.2497 11.75 3.2502H14.75C14.9625 3.2502 15.1408 3.3222 15.2848 3.4662C15.4288 3.6102 15.5005 3.7882 15.5 4.0002C15.5 4.2127 15.428 4.39095 15.284 4.53495C15.14 4.67895 14.962 4.7507 14.75 4.7502H11.75Z"
                                    fill="#007DCA"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1350_8461">
                                    <rect
                                      width="15"
                                      height="7.54765"
                                      fill="white"
                                      transform="translate(0.5 0.231445)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh]    ">
          <div className="w-full h-fit px-4 md:px-10 ">
            <div className=" md:hidden pt-6 pb-3 border-b border-[#F2F2F2] mb-3 flex items-center justify-between">
              <BackBtn />
              <p className="text-black text-2xl not-italic font-AeonikProMedium text-center">
                {t("location")}
              </p>
              <div className="w-[30px]"></div>
            </div>
            <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor hidden md:block">
              <div className="flex justify-end items-center md:justify-between">
                <section className="hidden md:flex items-center">
                  <div className="mr-5">
                    <BackBtn />
                  </div>
                  <p className="text-black text-2xl not-italic font-AeonikProMedium">
                    {t("location")}
                  </p>
                </section>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full  ">
            <NoLocations menu={false} />
          </div>
          {/* <div className="w-fit h-fit flex flex-col justify-center items-center gap-y-[50px]">
            <p className="text-red-500 text-2xl not-italic font-AeonikProRegular">
              {t("no_location")}
            </p>
            <button
              onClick={addLocationByMarket}
              className="px-7 active:scale-95  active:opacity-70 cursor-pointer py-3 rounded-lg flex items-center justify-center bg-textBlueColor text-white text-lg not-italic font-AeonikProMedium"
            >
              {t("add_location")}
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}
