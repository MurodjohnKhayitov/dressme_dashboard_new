import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import { FaCheck } from "react-icons/fa6";
import {

  AddIconsCircle,
  CheckIcons,
  DeleteIcon,
  MenuCloseIcons,
} from "../../../../../assets/icons";
import { Checkbox, List } from "antd";
import { useMutation, useQuery, } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHttp } from "../../../../../hook/useHttp";
import axios from "axios";
import { dressMainData } from "../../../../../hook/ContextTeam";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../../language/LanguageItem";
import { dressRegionList } from "../../../../../hook/RegionList";
import axiosInstance from "../../../../Authentication/AxiosIntance";
const url = "https://api.dressme.uz/api/seller";
const { REACT_APP_BASE_URL } = process.env;

function LocationItem({ data, onRefetch, allCheckedList, searchName }) {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [regionList, setRegionList] = useContext(dressRegionList)

  const { t } = useTranslation("locations");
  const [languageDetector] = useContext(LanguageDetectorDress);

  const { request } = useHttp()
  const [moreMobile, setMoreMobile] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [hideDeleteIcons, setHideDeleteIcons] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // --------------
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const [getIdShopLocation, setGetIdShopLocation] = useState(null);
  const [loader, setLoader] = useState(false);
  // ------------
  const [openStoreList, setOpenStoreList] = useState(false);
  const [hideProductList, setHideProductList] = useState(false);

  // ------------
  const [statusModal, setStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  // ------------

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await axios.get(`${REACT_APP_BASE_URL}/products/get-product-info`, {
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //           "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
  //         }
  //       });
  //       if (data?.status >= 200 && data?.status < 300) {
  //         setDressInfo({ ...dressInfo, getProductInfo: data?.data })
  //       }

  //     } catch (error) {

  //     }
  //   };
  //   if (!dressInfo?.getProductInfo) {
  //     fetchData();
  //   }
  // }, []);
  const fetchDataShopLocation = async (customHeaders) => {
    try {
      const response = await axiosInstance.get("/products/get-product-info", {
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
  useQuery(['seller_product_getInfo'], () => fetchDataShopLocation(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        setDressInfo({ ...dressInfo, getProductInfo: data?.data })
      }
    },
    onError: (error) => {
      throw new Error(error || "something wrong");
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });


  const navigate = useNavigate();
  const goProductDetailEdit = (id, locationId) => {
    setDressInfo({ ...dressInfo, locationIdAddProduct: locationId })
    navigate(`/products/location/${id}`);
  };

  const goMapCity = (id) => {
    navigate(`/locations-store/city/${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/${id}`);
  };

  const [checked, setChecked] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  useEffect(() => {
    data?.products?.map(item => {
      if (checked?.length >= 1) {
        if (checked.includes(item?.id)) {
          allCheckedList(checked, data?.id)
        }
      }
      if (checked?.length < 1) {
        allCheckedList(checked, null)
      }
    })
  }, [checked])

  useEffect(() => {
    if (data?.products?.length) {
      setIndeterminate(checked.length && checked.length !== data?.products?.length);
      setCheckAll(checked.length === data?.products?.length);
      // allCheckedList(checked)
    }
  }, [checked]);

  const onCheckAllChange = (e) => {
    setChecked(e.target.checked ? data?.products?.map((item) => item.id) : []);
    setCheckAll(e.target.checked);
  };
  // // ------------GET  Has Magazin ?-----------shops/locations/:id------
  const deleteProductByAddress = useMutation(() => {
    return request({ url: `/products/${deleteId}/${getIdShopLocation}`, method: "DELETE", token: true });
  });
  function onProductAddressDelete() {
    setLoader(true)
    setHideDeleteIcons(true)
    deleteProductByAddress.mutate({},
      {
        onSuccess: res => {
          if (res?.message) {
            setSuccessMessage(res?.message)
            setLoader(false)
            onRefetch()
            setTimeout(() => {
              setDeleteModal(false)
            }, 1000);

          }
        },
        onError: err => {
          throw new Error(err || "something wrong");
        }
      })
  }

  // ---------Callback----
  useEffect(() => {
    if (deleteModal || openStoreList) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [deleteModal, openStoreList]);
  useEffect(() => {
    setHideDeleteIcons(false)
    setHideProductList(false)
  }, [deleteModal, openStoreList]);

  function onHandleStatus(productId) {
    setStatusModal(true)
    data?.products?.map(item => {
      if (item?.id == productId) {
        setStatusMessage(item?.status_reason)
      }
    })

  }

  function addNewProductId() {
    setDressInfo({ ...dressInfo, locationIdAddProduct: data?.id });
    navigate(`/products/location/add/${Number(data?.shop_id)}`);
  }
  return (
    <div className="w-full ">
      <ToastContainer
        style={{ zIndex: "1000", top: "80px" }}
        position="top-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-full">
        <section
          onClick={() => {
            setDeleteModal(false);
            setOpenStoreList(false);
            setDeleteMessage(null);
            setSuccessMessage(null);
            setHideProductList(false);
            setStatusModal(false);
          }}
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${deleteModal || openStoreList || statusModal ? "" : "hidden"}`}
        ></section>
        <div className=" w-full gap-y-1 flex-col md:hidden flex items-center justify-between">
          <div className=" w-full flex items-center justify-between">
            <div className="flex">
              <Checkbox
                defaultChecked={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}

                className={`idCheck flex mr-[8px] items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center w-[20px] h-[20px] `}
              ></Checkbox>
              <div className="text-black text-[12px]   not-italic flex items-center font-AeonikProMedium mr-[20px]">
                {regionList?.regions
                  ?.filter((e) => e?.id == data?.region_id)
                  ?.map((values, index) => {
                    return (
                      <div key={index}>
                        {values?.name_ru},
                        {values?.sub_regions?.filter((e) => e?.id == data?.sub_region_id)?.map((valueSub) => {
                          return (
                            <span key={valueSub?.id} className="px-1">{valueSub?.name_ru}
                              ,
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                <span className="hidden md:flex items-center ml-1   ">
                  ({data?.address})
                </span>
                {data?.products?.length > 1 && (
                  <span className="text-black text-[13px] md:text-base not-italic font-AeonikProMedium ml-1   ">
                    ({data?.products?.length})
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => addNewProductId()}
              className="active:scale-95 cursor-pointer active:opacity-70 flex items-center gap-x-[4px]"
            >
              <span className="hidden xs:flex text-addWearColorText text-[12px] not-italic font-AeonikProMedium">
                {t("add_cloth")}
              </span>
              <span className="  xs:hidden flex">
                <AddIconsCircle size={25} />
              </span>
              <span className="hidden xs:flex">
                <AddIconsCircle />
              </span>
            </button>
          </div>
          <div className="w-full flex items-center md:hidden pl-[25px]">
            <span className=" text-[13px]  not-italic  flex items-center font-AeonikProMedium">
              {data?.address}
            </span>
          </div>
        </div>
        {/* ---------------------------------------- */}
        {/*status Modal */}
        <section
          className={` max-w-[440px] md:max-w-[750px] w-full flex-col  h-fit  bg-white mx-auto fixed py-4 md:py-6 px-6 rounded-t-lg md:rounded-b-lg z-[201] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${statusModal
            ? " bottom-0 md:flex"
            : "md:hidden bottom-[-800px] z-[-10]"
            }`}
        >
          <button
            onClick={() => setStatusModal(false)}
            type="button"
            className="absolute  right-3 top-3 w-5 h-5 "
          >
            <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
          </button>
          <div className="w-full h-fit flex items-center justify-center mb-2">
            <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
              {t("cause")}
            </p>
          </div>
          {statusMessage ? (
            <div className="w-full p-4 border border-borderColor rounded-lg flex flex-col gap-y-[10px] h-[300px]  overflow-hidden">
              {statusMessage}
            </div>
          ) : (
            <div className="w-full flex text-[#b5b5b5] items-center justify-center border border-borderColor rounded-lg  h-[300px]  overflow-hidden  ">
              {t("no_reason")}
            </div>
          )}
        </section>
        {/* Delete Product Of Pop Confirm */}
        <section
          className={` max-w-[440px] md:max-w-[550px] w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${deleteModal
            ? " bottom-0 md:flex"
            : "md:hidden bottom-[-800px] z-[-10]"
            }`}
        >
          <button
            onClick={() => setDeleteModal(false)}
            type="button"
            className="absolute  right-3 top-3 w-5 h-5 "
          >
            <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
          </button>
          {hideDeleteIcons ? (
            <div className="w-full flex items-center justify-center">
              {loader && hideDeleteIcons ? (
                <PuffLoader
                  // className={styles.loader1}
                  color={"#007DCA"}
                  size={80}
                  loading={true}
                />
              ) : (
                <>
                  <div className="w-full hidden md:flex gap-y-2 flex-col items-center justify-center ">
                    <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                      <FaCheck size={30} color="#009B17" />
                    </span>
                    <span className="text-base not-italic font-AeonikProMedium">
                      {SuccessMessage}
                    </span>
                  </div>
                  <div className="w-full md:hidden flex gap-y-2 flex-col items-center justify-center ">
                    <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                      <FaCheck size={20} color="#009B17" />
                    </span>
                    <span className="text-[14px] not-italic font-AeonikProMedium">
                      {SuccessMessage}
                    </span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="hidden md:flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
                <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                  <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                    <DeleteIcon width={30} />
                  </span>
                </span>
                <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                  {t("sure")}?
                </span>
              </div>
              <div className="md:hidden flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
                <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                  <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                    <DeleteIcon width={20} />
                  </span>
                </span>
                <span className=" text-black text-base  not-italic font-AeonikProMedium text-center">
                  {t("sure")}?
                </span>
              </div>
            </>
          )}
          <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
            <button
              onClick={() => setDeleteModal(false)}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[38px] md:h-[42px]  text-center text-[14px] md:text-base not-italic font-AeonikProMedium"
            >
              {t("cancel")}
            </button>
            <button
              onClick={() => onProductAddressDelete()}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor hover:text-white text-[#FF4747] bg-white hover:bg-[#FF4747]  h-[38px] md:h-[42px] px-4  text-center text-[14px] md:text-base not-italic font-AeonikProMedium"
            >
              {t("remove_from_address")}
            </button>
          </div>
        </section>
        <section className="hidden md:flex items-center justify-between"></section>
        {data?.products?.length !== 0 && (
          <div className="w-full hidden md:flex flex-col">
            <div className="w-full  my-3 hidden md:flex flex-col items-center text-tableTextTitle">
              <div className="w-full  h-[70px] flex items-center">
                <Checkbox
                  defaultChecked={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                  style={{ width: "26px", height: "26px" }}
                  className={`idCheck flex mr-[8px] items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center !min-w-[24px] !min-h-[24px] `}
                ></Checkbox>
                <div className="w-full h-full flex items-center justify-between border rounded-[8px]  border-lightBorderColor">
                  <p className="w-[5%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                    No:
                  </p>
                  <p className="w-[14%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                    {t("photo")}
                  </p>
                  <p className="w-[18%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center    ">
                    {t("name_of_product")}
                  </p>

                  <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                    {t("type")}
                  </p>
                  <p className="w-[11%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                    {t("date")}
                  </p>
                  <p className="w-[13%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                    {t("price_of_product")}
                  </p>

                  <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   "></p>
                  <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                    {t("delete")}
                  </p>
                  <p className="w-[11%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center    ">
                    {t("status")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {data?.products?.length !== 0 ? (
          <Checkbox.Group
            style={{ width: "100%" }}
            // checked={AllSelectCheckedAction || checked}
            value={checked}
            onChange={(checkedValues) => {
              setChecked(checkedValues);
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data?.products}
              className="w-full"
            >
              {data?.products
                ?.filter((e) =>
                  languageDetector?.typeLang === "ru" ? e?.name_ru?.toLowerCase()?.includes(searchName?.toLowerCase()) :
                    e?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase())
                )
                ?.map((itemValue, index) => {
                  return (
                    <List.Item key={index} className="w-full  mt-6  ">
                      <div className="w-full flex flex-col  items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
                        <div className="flex flex-col w-full">
                          <div className="w-full flex h-full items-center  ">
                            <div className="w-full flex h-[100px]  hidden md:flex items-center  ">
                              <Checkbox
                                value={itemValue?.id}
                                checked={checked}
                              />
                              <div className="w-full h-full py-2 ml-2  flex items-center justify-between rounded-[8px] border  border-lightBorderColor">
                                <p className="w-[5%]  h-full  flex items-center justify-center  ">
                                  {index + 1}
                                </p>
                                <p className="w-[14%]  h-full flex items-center justify-center   ">
                                  <span className="w-[110px] h-[140px] border  border-lightBorderColor rounded-lg overflow-hidden">
                                    <img src={itemValue?.photos[0]?.url_photo || "nodate"} alt={"noImg"}
                                      className=" w-[110px] h-full object-cover"
                                    />
                                  </span>
                                </p>
                                <div className="w-[18%]  h-full break-all px-1 overflow-hidden  flex items-center  justify-center   ">
                                  <p className="w-full   break-words text-center text-weatherWinterColor flex items-center justify-center text-base not-italic font-AeonikProMedium">
                                    {languageDetector?.typeLang === "ru" &&
                                      itemValue?.name_ru}
                                    {languageDetector?.typeLang === "uz" &&
                                      itemValue?.name_uz}
                                  </p>
                                </div>


                                <p key={index}
                                  className="w-[10%]  h-full  px-1 flex items-center justify-center  "
                                >
                                  {languageDetector?.typeLang === "ru" && itemValue?.type?.name_ru}
                                  {languageDetector?.typeLang === "uz" && itemValue?.type?.name_uz}
                                </p>

                                <p className="w-[11%] h-full   px-1 flex items-center justify-center  ">
                                  {itemValue?.created_at ||
                                    "created_at"}
                                </p>
                                <p className="w-[13%] h-full  px-1 flex items-center justify-center  ">
                                  {itemValue?.cost?.discount_price > 999 ? Number(itemValue?.cost?.discount_price)?.toLocaleString()?.split(",").join(" ") : itemValue?.cost?.discount_price ||
                                    itemValue?.cost?.price > 999 ? Number(itemValue?.cost?.price)?.toLocaleString()?.split(",").join(" ") : itemValue?.cost?.price}
                                  <span className="ml-[6px] text-[14px]">
                                    {t("PRsumm")}
                                  </span>
                                </p>
                                <div className="w-[11%] h-full  px-1 flex items-center justify-center  ">
                                  <button
                                    onClick={() =>
                                      goProductDetailEdit(
                                        itemValue?.id,
                                        data?.id
                                      )
                                    }
                                    className="text-[18px] text-weatherWinterColor w-full text-center"
                                  >
                                    {t("more_details")}
                                  </button>
                                </div>

                                <div className="w-[10%]  h-full  flex items-center justify-center  ">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDeleteModal(true);
                                      setDeleteId(itemValue?.id);
                                      setGetIdShopLocation(data?.id);
                                    }}
                                    className="w-fit flex justify-center cursor-auto"
                                  >
                                    <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#D2D2D2] hover:text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
                                      <DeleteIcon
                                        width={
                                          30
                                        }
                                      />
                                    </span>
                                  </button>
                                </div>
                                {itemValue?.status ===
                                  "approved" && (
                                    <p className="w-[11%] h-fit  flex items-center justify-center   ">
                                      <span className="min-w-[110px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[3px]  rounded-full ">
                                        {t("approved")}
                                      </span>
                                    </p>
                                  )}
                                {itemValue?.status ===
                                  "declined" && (
                                    <p
                                      onClick={() =>
                                        onHandleStatus(itemValue?.id)

                                      }
                                      className="w-[11%] h-fit cursor-pointer flex items-center  justify-center  "
                                    >
                                      <span className="min-w-[110px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[3px]  rounded-full">
                                        {t("declined")}
                                      </span>
                                    </p>
                                  )}
                                {itemValue?.status ===
                                  "pending" && (
                                    <p className="w-[11%] h-fit  flex items-center justify-center   ">
                                      <span className="min-w-[110px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[3px]  rounded-full ">
                                        {t("pending")}
                                      </span>
                                    </p>
                                  )}
                                {itemValue?.status ===
                                  "updated" && (
                                    <p className="w-[11%] h-fit  flex items-center justify-center     ">
                                      <span className="min-w-[110px] text-center text-[#007DCA] bg-bgUpdate font-AeonikProRegular py-[3px]  rounded-full ">
                                        {t("updated")}
                                      </span>
                                    </p>
                                  )}

                              </div>
                            </div>
                            {/* For Mobile Device */}

                            <div
                              key={itemValue?.id}
                              className="border rounded-xl border-[##F2F2F2] p-[10px] mb-3 md:hidden w-full"
                            >
                              <div className="mb-2">
                                <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                                  <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                  <span className="text-[14px] text-checkboxBorder">
                                    {index + 1}
                                  </span>
                                  <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                </div>
                              </div>

                              <div className="mb-3 h-[148px]  ">
                                <figure className="w-full h-full rounded-lg overflow-hidden">
                                  <span className="h-[138px] mx-auto w-[108px] bg-white  flex items-center justify-center  overflow-hidden rounded-[12px] border  border-lightBorderColor">
                                    <img src={itemValue?.photos[0]?.url_photo || "nodate"} alt={"noImg"} className="w-full h-full object-cover" />
                                  </span>
                                </figure>
                              </div>

                              <div className="mb-6">

                                <div className="w-full grid grid-cols-3 gap-4  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px] mb-[8px]">
                                  <div className="w-full flex items-center justify-center ">
                                    {t("name_product")}
                                  </div>
                                  <div className="w-full flex items-center justify-center ">
                                    {t("status")}
                                  </div>
                                  <div className="w-full flex items-center justify-center ">
                                    {t("price_of_product")}
                                  </div>
                                </div>
                                <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[11px] items-center">
                                  <div className="w-full break-all  overflow-hidden  ">
                                    <p className="w-full  break-all  text-weatherWinterColor  text-center text-[11px] xs:text-[13px] md:text-base not-italic font-AeonikProMedium">
                                      {languageDetector?.typeLang === "ru" && itemValue?.name_ru}
                                      {languageDetector?.typeLang === "uz" && itemValue?.name_uz}
                                    </p>
                                  </div>
                                  {itemValue?.status ===
                                    "approved" && (
                                      <div className="w-full h-fit  flex items-center justify-center  ">
                                        <span className="w-[100px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[3px]  rounded-full ">
                                          {t("approved")}
                                        </span>
                                      </div>
                                    )}
                                  {itemValue?.status ===
                                    "declined" && (
                                      <div
                                        onClick={() =>
                                          onHandleStatus(
                                            itemValue?.id,
                                          )
                                        }
                                        className="w-full h-fit cursor-pointer flex items-center  justify-center"
                                      >
                                        <span className="w-[100px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[3px]  rounded-full">
                                          {t("declined")}
                                        </span>
                                      </div>
                                    )}
                                  {itemValue?.status ===
                                    "pending" && (
                                      <div className="w-full h-fit  flex items-center justify-center ">
                                        <span className="w-[100px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[3px]  rounded-full ">
                                          {t("pending")}
                                        </span>
                                      </div>
                                    )}
                                  {itemValue?.status ===
                                    "updated" && (
                                      <div className="w-full h-fit  flex items-center justify-center   ">
                                        <span className="w-[100px] text-center text-[#007DCA] bg-bgUpdate font-AeonikProRegular py-[3px]  rounded-full ">
                                          {t("updated")}
                                        </span>
                                      </div>
                                    )}
                                  {/* <div className="w-full"> {itemValue?.money} сум </div> */}
                                  <div className="w-full h-full  flex items-center justify-center  text-[11px] xs:text-[13px] md:text-base not-italic font-AeonikProMedium">
                                    {itemValue?.cost?.discount_price > 999 ? Number(itemValue?.cost?.discount_price)?.toLocaleString()?.split(",").join(" ")
                                      : itemValue?.cost?.discount_price || itemValue?.cost?.price > 999 ?
                                        Number(itemValue?.cost?.price)?.toLocaleString()?.split(",").join(" ") : itemValue?.cost?.price}
                                    <span className="ml-[6px]  text-[11px] xs:text-[13px] md:text-base not-italic font-AeonikProMedium">
                                      {t("currency")}
                                    </span>
                                  </div>
                                </div>


                              </div>
                              {moreMobile == itemValue?.id && (
                                <div className="mb-6">
                                  <div className="w-full grid grid-cols-3 gap-4  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px] gap-x-[10px] mb-[8px]">
                                    <div className="w-full flex items-center justify-center ">
                                      {t("type")}
                                    </div>
                                    <div className="w-full"></div>

                                    <div className="w-full flex items-center justify-center ">
                                      {" "}
                                      {t("date")}
                                    </div>
                                  </div>


                                  <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[11px] items-center">

                                    <div
                                      key={
                                        index
                                      }
                                      className="w-full h-full  flex items-center justify-center "
                                    >
                                      {languageDetector?.typeLang === "ru" && itemValue?.type?.name_ru}
                                      {languageDetector?.typeLang === "uz" && itemValue?.type?.name_uz}
                                    </div>
                                    <div className="w-full"></div>
                                    {/* <div className="w-full"> {itemValue?.money} сум </div> */}
                                    <div className="w-full h-full  flex items-center justify-center  text-[11px] xs:text-[13px] md:text-base not-italic font-AeonikProMedium">
                                      {itemValue?.created_at ||
                                        "created_at"}
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center justify-center">

                                <button
                                  onClick={() =>
                                    goProductDetailEdit(
                                      itemValue?.id,
                                      data?.id
                                    )
                                  } className="text-[#007DCA] bg-[#E8F5FD] text-center w-[100%] py-2 rounded-lg text-[13px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                >
                                  {t("more_details")}
                                </button>
                              </div>
                              <div className="w-full grid grid-cols-3 gap-4   mt-[18px]">
                                <div className={`w-full cursor-pointer  bg-white border-checkboxBorder  flex items-center justify-start rounded mr-[8px]`}>
                                  <div className={` flex items-center justify-center `}>
                                    <Checkbox value={itemValue?.id} checked={checked} />
                                  </div>
                                </div>
                                {moreMobile !==
                                  itemValue?.id ? (
                                  <button
                                    onClick={() =>
                                      setMoreMobile(
                                        itemValue?.id
                                      )
                                    }
                                    className="w-full text-textBlueColor text-[13px] font-AeonikProMedium"
                                  >

                                    {t("more")}...
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      setMoreMobile()
                                    }
                                    className="w-full text-textBlueColor text-[13px] font-AeonikProMedium"
                                  >
                                    {t("less")}...
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeleteModal(true);
                                    setDeleteId(itemValue?.id);
                                    setGetIdShopLocation(data?.id);
                                  }}
                                  className="w-full flex justify-end text-red-600 text-[11px] font-AeonikProMedium">
                                  {t("delete")}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  );
                })}
            </List>
          </Checkbox.Group>
        ) : (
          <div className="w-full h-[100px] rounded-lg border flex items-center justify-center mt-5">
            <span className="text-[#D2D2D2] font-AeonikProRegular text-xl">
              {t("no_product")}
            </span>
          </div>
        )
        }
      </div >
      {/* )
      })} */}
    </div >
  );
}
export default React.memo(LocationItem)
