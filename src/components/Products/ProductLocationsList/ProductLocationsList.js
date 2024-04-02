import React, { useState, useContext, useEffect } from "react";
import {
  AddIconsCircle,
  AddLocationIcon,
  DeleteIcon,
  GoBackIcons,
  MenuCloseIcons,
  SearchIcon,
} from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../hook/useHttp";
import LoadingForSeller from "../../Loading/LoadingFor";
import PuffLoader from "react-spinners/PuffLoader";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { dressMainData } from "../../../hook/ContextTeam";
import axios from "axios";
import { FiCheck } from "react-icons/fi";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../language/LanguageItem";
import { dressRegionList } from "../../../hook/RegionList";
import { GetProductList } from "../../../hook/GetProductList";
import axiosInstance from "../../Authentication/AxiosIntance";
import { BiCheckDouble } from "react-icons/bi";

const { REACT_APP_BASE_URL } = process.env;
const url = "https://api.dressme.uz/api/seller";

export default function ProductLocationsList() {
  const { request } = useHttp();
  const { t } = useTranslation("product");
  const [languageDetector] = useContext(LanguageDetectorDress);
  const [getProductList, setGetProductList] = useContext(GetProductList)

  const [searchName, setSearchName] = useState("");
  const [state, setState] = useState({
    getProductList: "",
    getProductCategory: "",
    onSuccessMessaage: "",
    onErrorMessage: "",
    onErrorTitle: "",
    getShopLocationId: "",
    getCheckListItem: "",
    loader: false,
    openSelectModal: false,
    hideProductList: false,
    // -----------
    openDeleteModal: false,
    shopId: null,
    shopMarketId: "",
  });
  const [moreMobile, setMoreMobile] = useState('');
  const [shopLocationIdList, setShopLocationIdList] = useState();
  const [getProductInfo, setGetProductInfo] = useState(null);
  // ------------
  const [statusModal, setStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  // ------------
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
  const [getIdProduct, setGetIdProduct] = useState(null);
  const [hideProductList, setHideProductList] = useState(false);
  // ------------
  // const [hideProductList, setHideProductList] = useState(false);

  const [locationIsOneMore, setLocationIsOneMore] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [addresNewId, setAddresNewId] = useState();

  function allCheckedList(addressId, productId, marketId) {
    setState({ ...state, shopId: productId, shopMarketId: marketId });
    setCheckedList([]);
    setAddresNewId(addressId);
    getProductList?.products_locations?.map((item) => {
      item?.shop_locations?.map((data) => {
        if (Number(data?.id) === Number(addressId)) {
          data?.products?.map((value) => {
            setCheckedList((checkedList) => [...checkedList, value?.id]);
          });
        }
      });
    });
  }

  const allUnCheckedList = () => {
    setAddresNewId();
    setCheckedList([]);
  };

  const checkListItem = (itemId, addId, marketId, productId) => {
    setState({ ...state, shopMarketId: marketId });

    if (!addresNewId) {
      setAddresNewId(addId);
      if (!checkedList.includes(itemId)) {
        setCheckedList((checkedList) => [...checkedList, itemId]);
      }
      if (checkedList.includes(itemId)) {
        setCheckedList(checkedList?.filter((e) => e !== itemId));
      }
    }
    if (addresNewId === addId) {
      if (!checkedList.includes(itemId)) {
        setCheckedList((checkedList) => [...checkedList, itemId]);
      }
      if (checkedList.includes(itemId)) {
        setCheckedList(checkedList?.filter((e) => e !== itemId));
      }
    }
    if (addresNewId > 0 && addresNewId !== addId) {
      setCheckedList([]);
      setAddresNewId(addId);
      if (!checkedList.includes(itemId)) {
        setCheckedList((checkedList) => [...checkedList, itemId]);
      }
      if (checkedList.includes(itemId)) {
        setCheckedList(checkedList?.filter((e) => e !== itemId));
      }
    }
  };

  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [regionList, setRegionList] = useContext(dressRegionList)
  const fetchDataRegion = async () => {
    try {
      const response = await axios.get(`${url}/regions`)
      const status = response.status;
      const data = response.data;

      return { data, status };
    } catch (error) {
      const status = error.response ? error.response.status : null;
      return { error, status };
    }
  };
  useQuery(["get_regionIn_product"], () => fetchDataRegion(), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        setRegionList(data?.data);
      }
    },
    onError: (error) => {
      throw new Error(error || "something wrong");
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  }
  );

  const fetchData = async (customHeaders) => {
    try {
      const response = await axios.get(
        `${REACT_APP_BASE_URL}/products/locations`,
        {
          headers: customHeaders,
        }
      );
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
  const { refetch } = useQuery(["seller_getProductList_list1"], () => fetchData(customHeaders),
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          // setDressInfo({ ...dressInfo, getProductList: data?.data });
          setGetProductList(data?.data)
        }
        if (data?.status === 401) {
        }
      },
      onError: (error) => {
        if (error?.response?.status === 401) {
        }
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  function addByLocation(itemId, locationId, shopId) {
    setState({ ...state, shopMarketId: shopId });
    setAddresNewId(locationId);
    setGetIdProduct(itemId);
    setDeleteMessage(null);
    setSuccessMessage(null);
    setGetIdShopLocation(null);
    setHideProductList(false)
  }

  const onSendPeoductSeveralSelect = () => {
    setState({ ...state, loader: true, hideProductList: true });
    setHideProductList(true);
    let form = new FormData();
    form.append("location_id", state?.getShopLocationId);
    checkedList?.map((e, index) => {
      form.append("product_ids[]", checkedList[index]);
    });
    return fetch(`${url}/shops/locations/products/add-selected`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
        "Accept-Language": languageDetector?.typeLang,

      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.problems?.length !== 0 && res?.message) {
          setState({
            ...state,
            onErrorMessage: res,
            onErrorTitle: res?.message,
            loader: false,
          });
        } else if (res?.errors && res?.message) {
          setState({
            ...state,
            onErrorMessage: res?.errors?.location_id,
            loader: false,
          });
        } else if (res?.problems?.length == 0 && res?.message) {
          setState({
            ...state,
            onSuccessMessaage: res?.message,
            getShopLocationId: null,
            loader: false,
          });
          setTimeout(() => {
            refetch();
            setState({ ...state, openSelectModal: false });
          }, 2000);
        }
      })
      .catch((err) => {
        throw new Error(err || "something wrong");
      });
  };
  const onDeleteSeveralSelect = () => {
    setState({ ...state, loader: true, hideProductList: true });
    setHideProductList(true);
    let form = new FormData();
    form.append("location_ids[]", addresNewId);
    checkedList?.map((e, index) => {
      form.append("product_ids[]", checkedList[index]);
    });
    return fetch(`${url}/products/massive-delete-products`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
        "Accept-Language": languageDetector?.typeLang,

      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.errors && res?.message) {
          setState({ ...state, onErrorMessage: res?.errors, loader: false });
        } else if (res?.message) {
          setState({
            ...state,
            onSuccessMessaage: res?.message,
            loader: false,
          });
          setTimeout(() => {
            refetch();
            setState({ ...state, openDeleteModal: false });
            setHideProductList(false);
          }, 2000);
        }
      })
      .catch((err) => {
        throw new Error(err || "something wrong");
      });
  };
  // ----------------------ListItem--------
  const deleteProductById = useMutation(() => {
    return request({
      url: `/products/${deleteId}/${0}`,
      method: "DELETE",
      token: true,
    });
  });

  function onProductDelete() {
    setLoader(true);
    setHideDeleteIcons(true);
    deleteProductById.mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message) {
            setSuccessMessage(res?.message);
            setLoader(false);
            refetch();
            setTimeout(() => {
              setDeleteModal(false);
            }, 1000);
          }
        },
        onError: (err) => {
          throw new Error(err || "something wrong");
        },
      }
    );
  }
  const deleteProductByAddress = useMutation(() => {
    return request({
      url: `/products/${deleteId}/${getIdShopLocation}`,
      method: "DELETE",
      token: true,
    });
  });

  function onProductAddressDelete() {
    setLoader(true);
    setHideDeleteIcons(true);
    deleteProductByAddress.mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message) {
            setSuccessMessage(res?.message);
            setLoader(false);
            refetch();
            setTimeout(() => {
              setDeleteModal(false);
            }, 1000);
          }
        },
        onError: (err) => {
          throw new Error(err || "something wrong");
        },
      }
    );
  }

  const postAddProductId = useMutation(() => {
    return request({
      url: `/shops/locations/products/add`,
      method: "POST",
      token: true,
      body: {
        product_id: getIdProduct,
        shop_location_id: getIdShopLocation,
      },
    });
  });

  const sendAddProductById = () => {
    setLoader(true);
    setHideProductList(true);
    postAddProductId?.mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message && res?.errors) {
            setDeleteMessage(res?.message);
            setLoader(false);
          } else if (res?.message) {
            setSuccessMessage(res?.message);
            setGetIdShopLocation("");
            setLoader(false);
            refetch();
            setTimeout(() => {
              setOpenStoreList(false);
              setHideProductList(false);
            }, 1000);
          }
        },
        onError: (err) => {
          throw new Error(err || "something wrong");
        },
      }
    );
  };


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

  useQuery(['seller_product_getInfo_productlist'], () => fetchDataShopLocation(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        setGetProductInfo(data?.data);
      }
    },
    onError: (error) => {
      throw new Error(error || "something wrong");
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  // products
  const navigate = useNavigate();
  function openMarketEditPage(id) {
    navigate(`/store/market-list/${id}`);
  }

  function addNewProductId(locationId, shopId) {
    setDressInfo({
      ...dressInfo,
      locationIdAddProduct: locationId,
      ProductFilterType: null,
    });
    navigate(`/products/location/add/${shopId}`);
  }
  const goProductDetailEdit = (id, locationId) => {
    setDressInfo({ ...dressInfo, locationIdAddProduct: locationId });
    navigate(`/products/location/${id}`);
  };



  useEffect(() => {
    if (!state?.openSelectModal) {
      setState({
        ...state,
        onSuccessMessaage: null,
        onErrorTitle: null,
        onErrorMessage: null,
      });
      setHideProductList(false);
    }
    // return () => {
    //   setState({
    //     ...state,
    //     onSuccessMessaage: null,
    //     onErrorTitle: null,
    //     onErrorMessage: null,
    //   });
    //   setHideProductList(false);
    // }
  }, [state?.openSelectModal]);

  useEffect(() => {
    if (!deleteModal) {
      setHideDeleteIcons(false);
      setSuccessMessage(null);
    }
  }, [deleteModal]);

  const [shopIdList, setShopIdList] = useState([]);
  useEffect(() => {
    return () => {
      setSearchName("")
      setShopIdList()
    }
  }, [languageDetector?.typeLang])
  useEffect(() => {
    setShopIdList([]);
    if (languageDetector?.typeLang === "ru") {
      getProductList?.products_locations?.map((value1) => {
        value1?.shop_locations?.map((value2) => {
          if (searchName?.trim()) {
            value2?.products
              ?.filter((e) => e?.name_ru?.toLowerCase()?.includes(searchName?.trim()?.toLowerCase()))
              ?.map((value3) => {
                if (!shopIdList?.includes(value3?.shop_id)) {
                  setShopIdList((shopIdList) => [
                    ...shopIdList,
                    Number(value3?.shop_id),
                  ]);
                }
              });
          } else if (!searchName?.trim()) {
            setShopIdList((shopIdList) => [...shopIdList, Number(value1?.id)]);
          }
        });
      })
    }
    if (languageDetector?.typeLang === "uz") {
      getProductList?.products_locations?.map((value1) => {
        value1?.shop_locations?.map((value2) => {
          if (searchName?.trim()) {
            value2?.products
              ?.filter((e) => e?.name_uz?.toLowerCase()?.includes(searchName?.trim()?.toLowerCase()))
              ?.map((value3) => {
                if (searchName?.trim()) {
                  if (!shopIdList?.includes(value3?.shop_id)) {
                    setShopIdList((shopIdList) => [
                      ...shopIdList,
                      Number(value3?.shop_id),
                    ]);
                  }
                }
              });
          } else if (!searchName?.trim()) {
            setShopIdList((shopIdList) => [...shopIdList, Number(value1?.id)]);
          }
        });
      })
    }
    const checkProduct = getProductList?.products_locations?.some(item => {
      return item?.shop_locations?.length >= 2
    })
    setLocationIsOneMore(checkProduct)
  }, [getProductList?.products_locations, searchName, languageDetector?.typeLang]);

  function onHandleStatus(productId, locationid, shopId) {
    setStatusModal(true);

    getProductList?.products_locations?.map((value1) => {
      if (value1?.id == shopId) {
        value1?.shop_locations?.map((value2) => {
          if (value2?.id == locationid) {
            value2?.products?.map((value3) => {
              if (value3?.id == productId) {
                setStatusMessage(value3?.status_reason);
              }
            });
          }
        });
      }
    });
  }
  // For DropUp
  useEffect(() => {
    if (
      deleteModal ||
      openStoreList ||
      state?.openSelectModal ||
      state?.openDeleteModal ||
      statusModal
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [
    deleteModal ||
    openStoreList ||
    state?.openSelectModal ||
    state?.openDeleteModal ||
    statusModal
  ]);

  return (
    <div className="relative w-full  md:px-10">
      {/* Navbar */}
      <div className="fixed md:static top-0 w-[calc(100%-32px)]   md:w-full z-[10] bg-white flex justify-start items-center md:justify-between md:border-b border-borderColor py-4  ">
        <section className="hidden md:flex">
          <p className="text-black text-2xl not-italic font-AeonikProMedium ">
            {t("PRproduct")}
          </p>
        </section>
        <section className="w-full flex md:hidden">
          <div className="w-full flex items-center">
            <div className="absolute flex items-center justify-start cursor-pointer ">
              <MobileHumburgerMenu />
            </div>
            <p className="w-full text-center text-black text-2xl not-italic font-AeonikProMedium">
              {t("PRproduct")}
            </p>
          </div>
        </section>
        <section className="w-full md:w-fit hidden md:flex items-center justify-between md:justify-static ">
          <div className="w-full md:w-[400px] flex items-center justify-between md:justify-static gap-x-[15px]">
            <label
              htmlFor="searchStore"
              className=" w-full h-10 overflow-hidden border cursor-pointer  border-lightBorderColor flex items-center rounded-lg"
            >
              <input
                type="text"
                name="s"
                id="searchStore"
                value={searchName}
                onChange={(e) => setSearchName(e?.target?.value)}
                className="w-full h-full outline-0 px-[10px]"
                placeholder={t("PRsearch")}
              />
              <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
                <SearchIcon />
              </span>
            </label>
          </div>
        </section>
      </div>
      <section
        onClick={() => {
          setDeleteModal(false);
          setOpenStoreList(false);
          setDeleteMessage(null);
          setSuccessMessage(null);
          setHideProductList(false);
          setStatusModal(false);
          setState({
            ...state,
            onSuccessMessaage: null,
            onErrorTitle: null,
            onErrorMessage: null,
            openSelectModal: false,
            hideProductList: false,
            openDeleteModal: false,
          });
          // setShopLocationIdList();
        }}
        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${deleteModal ||
            openStoreList ||
            state?.openSelectModal ||
            state?.openDeleteModal ||
            statusModal
            ? ""
            : "hidden"
          }`}
      ></section>

      {/*status Modal */}
      <section
        className={` max-w-[440px] md:max-w-[750px] mx-auto w-full flex-col  h-fit  bg-white mx-auto fixed px-2 py-4 md:py-6 px-6 rounded-t-lg md:rounded-b-lg z-[115] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${statusModal
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
            {t("PRcause")}
          </p>
        </div>
        {statusMessage ? (
          <div className="w-full p-4 border border-borderColor rounded-lg flex flex-col gap-y-[10px] h-[300px]  overflow-hidden  ">
            {statusMessage}
          </div>
        ) : (
          <div className="w-full flex text-[#b5b5b5] items-center justify-center border border-borderColor rounded-lg  h-[300px]  overflow-hidden  ">
            {t("PRnoCause")}
          </div>
        )}
      </section>
      {/* Add the Several selected products to the new one */}
      <section
        className={` max-w-[440px] md:max-w-[750px] mx-auto w-full flex-col  h-fit  bg-white mx-auto fixed px-2 py-4 md:py-6 px-6 rounded-t-lg md:rounded-b-lg z-[115] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.openSelectModal
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => {
            setHideProductList(false);
            setState({
              ...state,
              onSuccessMessaage: null,
              onErrorTitle: null,
              onErrorMessage: null,
              openSelectModal: false,
              hideProductList: false,
            });
          }}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 "
        >
          <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
        </button>
        <div className="w-full h-fit flex items-center justify-center py-4 mb-1 border-b border-borderColor2">
          <p className="text-tableTextTitle2 text-lg md:text-2xl not-italic font-AeonikProMedium  ">
            {t("PRaddToLocation")}
          </p>
        </div>
        <div className="w-full  flex flex-col gap-y-[10px] h-[300px]  overflow-hidden  ">
          {hideProductList ? (
            <div className="w-full h-full flex items-center justify-center">
              {state?.loader && hideProductList ? (
                <PuffLoader color={"#007DCA"} size={80} loading={true} />
              ) : (
                <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                  {state?.onErrorMessage ? (
                    <>
                      <span className="hidden md:flex flex-col items-center justify-center p-2">
                        <span className="text-base md:text-2xl not-italic font-AeonikProMedium">
                          {state?.onErrorMessage?.message}
                        </span>
                        <MdError size={45} color="#FF4343" />
                      </span>
                      <span className="md:hidden flex flex-col items-center justify-center p-2">
                        <span className="text-base md:text-2xl not-italic font-AeonikProMedium">
                          {state?.onErrorMessage?.message}
                        </span>
                        <MdError size={35} color="#FF4343" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="border-2 border-[#009B17] rounded-full hidden md:flex items-center justify-center p-2">
                        <FaCheck size={30} color="#009B17" />
                      </span>
                      <span className="border-2 border-[#009B17] rounded-full md:hidden flex items-center justify-center p-2">
                        <FaCheck size={20} color="#009B17" />
                      </span>
                    </>
                  )}
                  {state?.onErrorMessage ? (
                    <div className="w-fit flex flex-col overflow-hidden item-center justify-center gap-y-2">
                      <span className="text-[14px] md:text-[18px] not-italic font-AeonikProMedium">
                        {state?.onErrorMessage?.problems?.message?.ru}
                      </span>
                      <div className="w-full overflow-auto flex flex-col VerticelScroll item-center justify-center gap-y-2  h-[170px]">
                        {state?.onErrorMessage?.problems?.products?.map(
                          (item, index) => {
                            return (
                              <div
                                key={index}
                                className={`w-min-[200px] w-full  mx-auto my-1 flex items-center p-[2px] rounded-[4px]  justify-start gap-x-1   `}
                              >
                                <span className="text-[14px] md:text-[16px]">{index + 1}</span>
                                )
                                <p className="text-black text-[14px] md:text-[16px] not-italic flex items-center font-AeonikProMedium mr-[20px]">
                                  {languageDetector?.typeLang === "ru" && item?.name_ru}
                                  {languageDetector?.typeLang === "uz" && item?.name_uz}
                                </p>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-center">
                      {/* <span className="text-2xl not-italic font-AeonikProMedium">{state?.onErrorTitle}</span> */}
                      <span className="text-lg md:text-2xl not-italic font-AeonikProMedium">
                        {state?.onSuccessMessaage}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full overflow-y-auto VerticelScroll">
              {getProductList?.products_locations?.map(
                (item, index) => {
                  return (
                    <div key={index}>
                      {checkedList?.length > 0 ? (
                        Number(state?.shopMarketId) === Number(item?.id) && (
                          <div className="w-full cursor-pointer mt-2  ">
                            {item?.shop_locations?.length >= 1 && (
                              <div className="w-full py-[10px] flex items-center flex-col justify-center rounded-[5px]">
                                <span className=" hidden md:block text-textBlueColor text-lg md:text-2xl not-italic font-AeonikProMedium">
                                  {" "}
                                  {item?.name}
                                </span>
                                {item?.shop_locations?.map((data, index) => {
                                  return (
                                    <div key={index} className=" ">
                                      {data?.id !== addresNewId && (
                                        <div
                                          onClick={() =>
                                            setState({
                                              ...state,
                                              getShopLocationId: data?.id,
                                            })
                                          }
                                          className={`w-full my-1 flex items-center  p-[2px] rounded-[4px] items-center justify-between gap-x-1  ${state?.getShopLocationId == data?.id
                                            ? "bg-LocationSelectBg bg-LocationSelectBg"
                                            : "hover:bg-LocationSelectBg focus:bg-LocationSelectBg"
                                            }  `}
                                        >
                                          <div className="w-[90%] flex  gap-x-2">
                                            <span className="text-[14px] md:text-[17px] ">
                                              {index + 1}
                                              <span className="ml-[2px]">)</span>
                                            </span>

                                            <span className="text-black text-[14px] md:text-[17px] not-italic flex items-center font-AeonikProMedium mr-[20px]">
                                              {data?.address}
                                            </span>
                                          </div>
                                          {state?.getShopLocationId == data?.id && <span>
                                            <span className="md:flex hidden">
                                              <BiCheckDouble size={30} color="#007DCA" />
                                            </span>
                                            <span className="flex md:hidden">
                                              <BiCheckDouble size={20} color="#007DCA" />
                                            </span>
                                          </span>}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )
                      ) : (
                        <div className="w-full cursor-pointer mt-2">
                          {item?.shop_locations?.length >= 1 && (
                            <div className="w-full py-[10px] flex items-center flex-col justify-center rounded-[5px]">
                              <span className=" hidden md:block text-textBlueColor text-lg md:text-2xl not-italic font-AeonikProMedium">
                                {" "}
                                {item?.name}
                              </span>
                              {item?.shop_locations?.map((data, index) => {
                                return (
                                  <div
                                    key={index}
                                    onClick={() =>
                                      setState({
                                        ...state,
                                        getShopLocationId: data?.id,
                                      })
                                    }
                                    className={`w-full my-1 flex items-center p-[2px] rounded-[4px]  justify-between gap-x-1  ${state?.getShopLocationId == data?.id
                                      ? "bg-LocationSelectBg bg-LocationSelectBg"
                                      : "hover:bg-LocationSelectBg focus:bg-LocationSelectBg"
                                      }  `}
                                  >
                                    <div className="flex w-[100%]">
                                      <span className="text-[14px] md:text-[17px]">
                                        {index + 1}
                                        <span className="ml-[2px]">)</span>
                                      </span>

                                      <p className="text-black text-[14px] md:text-[17px] not-italic flex items-center font-AeonikProMedium mr-[20px]">
                                        {data?.address}
                                      </p>
                                    </div>

                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
        {!state?.onErrorMessage &&
          !state?.onSuccessMessaage &&
          !state?.onErrorTitle && (
            <div className="w-full flex items-center justify-between mt-5 gap-x-2">
              <button
                onClick={() => setState({ ...state, openSelectModal: false })}
                type="button"
                className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[38px] md:h-[42px] px-4  text-center text-[16px] md:text-xl not-italic font-AeonikProMedium"
              >
                {t("PRcancel")}
              </button>
              <button
                onClick={onSendPeoductSeveralSelect}
                type="button"
                className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[38px] md:h-[42px] px-4  text-center text-[16px] md:text-xl not-italic font-AeonikProMedium"
              >
                {t("PRready")}
              </button>
            </div>
          )}
      </section>
      {/* Delete Product Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.openDeleteModal
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => setState({ ...state, openDeleteModal: false })}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 "
        >
          <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
        </button>
        {hideProductList ? (
          <div className="w-full flex items-center justify-center">
            {state?.loader && hideProductList ? (
              <PuffLoader color={"#007DCA"} size={80} loading={true} />
            ) : (
              <>
                <div className="w-full hidden md:flex gap-y-2 flex-col items-center justify-center ">
                  <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                    <FaCheck size={30} color="#009B17" />
                  </span>
                  <span className="text-base not-italic font-AeonikProMedium">
                    {state?.onSuccessMessaage}
                  </span>
                </div>
                <div className="w-full md:hidden flex gap-y-2 flex-col items-center justify-center ">
                  <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                    <FaCheck size={20} color="#009B17" />
                  </span>
                  <span className="text-[14px] not-italic font-AeonikProMedium">
                    {state?.onSuccessMessaage}
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
              <span className="flex items-center text-black text-base xs:text-xl not-italic font-AeonikProMedium text-center">
                {t("PRsure")}<span>?</span>
              </span>
            </div>
            <div className="md:hidden flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
              <span className="w-10 h-[38px] rounded-full border border-[#a2a2a2] flex items-center justify-center">
                <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                  <DeleteIcon width={20} />
                </span>
              </span>
              <span className="flex items-center text-black text-base xs:text-xl not-italic font-AeonikProMedium text-center">
                {t("PRsure")}<span>?</span>
              </span>
            </div>
          </>
        )}
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
          <button
            onClick={() => setState({ ...state, openDeleteModal: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[38px] md:h-[42px] px-4  text-center text-[14px] md:text-base not-italic font-AeonikProMedium"
          >
            {t("PRcancel")}
          </button>
          <button
            onClick={onDeleteSeveralSelect}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[38px] md:h-[42px] px-4  text-center text-[14px] md:text-base not-italic font-AeonikProMedium"
          >
            {t("PRremoveByAddress")}
          </button>
        </div>
      </section>

      {/* ---------------------------------------- */}
      {/* Delete Product Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${deleteModal
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => {
            // setShopLocationIdList();
            setDeleteModal(false);
          }}
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
              <span className="flex items-center text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                {t("PRsure")}<span>?</span>
              </span>
            </div>
            <div className="md:hidden flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
              <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                  <DeleteIcon width={20} />
                </span>
              </span>
              <span className="flex items-center text-black text-base xs:text-xl not-italic font-AeonikProMedium text-center">
                {t("PRsure")}<span>?</span>
              </span>
            </div>
          </>
        )}
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
          {shopLocationIdList?.length > 1 ? (
            <button
              onClick={() => onProductDelete()}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[38px] md:h-[42px] px-4  text-center text-[14px] md:text-base not-italic font-AeonikProMedium"
            >
              {t("PRremoveEverwhere")}
            </button>
          ) : (
            <button
              onClick={() => setDeleteModal(false)}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[38px] md:h-[42px] px-4  text-center text-[14px] md:text-base not-italic font-AeonikProMedium"
            >
              {t("PRcancel")}
            </button>
          )}
          <button
            onClick={() => onProductAddressDelete()}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[38px] md:h-[42px] px-4  text-center text-[14px] md:text-base not-italic font-AeonikProMedium"
          >
            {t("PRremoveByAddress")}
          </button>
        </div>
      </section>
      {/* Add the selected products to the new one */}
      <section
        className={` max-w-[440px]   md:max-w-[750px] mx-auto w-full flex-col  h-fit  bg-white mx-auto fixed px-2 py-4 md:py-6 px-6 rounded-t-lg md:rounded-b-lg z-[114] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${openStoreList
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => {
            setOpenStoreList(false);
            setDeleteMessage(null);
            setSuccessMessage(null);
            setHideProductList(false);
          }}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 "
        >
          <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
        </button>
        <div className="w-full h-fit flex items-center justify-center py-4 mb-1 border-b border-borderColor2">
          <p className="text-tableTextTitle2 text-lg md:text-2xl not-italic font-AeonikProMedium">
            {t("PRaddToLocation")}
          </p>
        </div>
        <div className="w-full  flex flex-col gap-y-[10px] h-[300px]  overflow-hidden  ">
          {hideProductList ? (
            <div className="w-full h-full flex items-center justify-center">
              {loader && hideProductList ? (
                <PuffLoader
                  // className={styles.loader1}
                  color={"#007DCA"}
                  size={80}
                  loading={true}
                />
              ) : (
                <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                  {deleteMessage ? (
                    <>
                      <span className=" hidden md:flex items-center justify-center p-2">
                        <MdError size={35} color="#FF4343" />
                      </span>
                      <span className="md:hidden flex items-center justify-center p-2">
                        <MdError size={25} color="#FF4343" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="border-2 border-[#009B17] rounded-full hidden md:flex items-center justify-center p-2">
                        <FaCheck size={30} color="#009B17" />
                      </span>
                      <span className="border-2 border-[#009B17] rounded-full md:hidden flex items-center justify-center p-2">
                        <FaCheck size={20} color="#009B17" />
                      </span>
                    </>
                  )}
                  <span className="text-2xl not-italic font-AeonikProMedium">
                    {deleteMessage ? deleteMessage : SuccessMessage}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full overflow-y-auto VerticelScroll">
              {getProductList?.products_locations?.filter(e => e?.shop_locations?.length > 0 || state?.shopMarketId == e?.id)?.map(
                (item, index) => {
                  return (
                    <div key={index} className="w-full cursor-pointer mt-2 b ">
                      {
                        Number(state?.shopMarketId) === Number(item?.id) && (
                          <div className="w-full py-[10px] gap-y-2 flex items-center flex-col justify-center rounded-[5px]  ">
                            <span className="  block text-textBlueColor text-lg md:text-2xl not-italic font-AeonikProMedium  ">
                              {item?.name}
                            </span>
                            <div className="flex flex-col gap-y-1">
                              {item?.shop_locations?.map((data, index) => {
                                return (
                                  <div
                                    key={index}
                                    onClick={() => setGetIdShopLocation(data?.id)}
                                    className={`w-full  flex items-center   rounded-[4px]   justify-center gap-x-1  ${getIdShopLocation == data?.id
                                      ? "bg-LocationSelectBg bg-LocationSelectBg"
                                      : "hover:bg-LocationSelectBg focus:bg-LocationSelectBg"
                                      }  `}
                                  >
                                    {data?.id !== addresNewId && (
                                      <div className="flex items-center gap-x-1 ">
                                        <span className="text-[14px] md:text-[17px]">
                                          {index + 1}
                                        </span>
                                        )
                                        <span className="text-black text-[14px] md:text-[17px] not-italic leading-4 flex items-center font-AeonikProMedium mr-[20px]">
                                          {data?.address}
                                        </span>
                                      </div>
                                    )}
                                    {getIdShopLocation == data?.id && <span>
                                      <span className="md:flex hidden">
                                        <BiCheckDouble size={30} color="#007DCA" />
                                      </span>
                                      <span className="flex md:hidden">
                                        <BiCheckDouble size={20} color="#007DCA" />
                                      </span>
                                    </span>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
        {!deleteMessage && !SuccessMessage && (
          <div className="w-full flex items-center justify-between mt-5 gap-x-2">
            <button
              onClick={() => setOpenStoreList(false)}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[38px] md:h-[42px] px-4  text-center text-base md:text-xl not-italic font-AeonikProMedium"
            >
              {t("PRcancel")}
            </button>
            <button
              onClick={sendAddProductById}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-lg duration-200 border border-textBlueColor text-textBlueColor bg-white hover:text-white hover:bg-textBlueColor h-[38px] md:h-[42px] px-4  text-center text-base md:text-xl not-italic font-AeonikProMedium"
            >
              {t("PRready")}
            </button>
          </div>
        )}
      </section>
      {/* Search Section For Mobile */}
      <div className="flex md:hidden items-center justify-between border-t md:border-0 border-borderColor pt-3 md:pt-0 md:mt-3">
        <section className="w-full md:w-fit flex items-center justify-between md:justify-static gap-x-6 md:gap-x-[15px]">
          <label
            htmlFor="searchStore"
            className="w-full md:max-w-[400px] h-10 overflow-hidden border  border-lightBorderColor flex items-center rounded-lg"
          >
            <input
              type="text"
              name="s"
              id="searchStore"
              value={searchName}
              onChange={(e) => setSearchName(e?.target?.value)}
              className="w-full h-full outline-0 px-[10px]"
              placeholder="Поиск"
            />
            <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
              <SearchIcon />
            </span>
          </label>
        </section>
      </div>
      {/* {isLoading ?
        <LoadingForSeller />
        : */}
      <div className=" w-full md:mb-0 mb-10 md:mt-0 mt-10">
        {/* Up Title */}
        <div className="flex items-center justify-center py-7 relative w-full border-b border-borderColor md:border-none">
          <p className="hidden md:block text-xl font-AeonikProMedium absolute left-0">
            {t("PRtotal")}: (
            {getProductList?.total_products_amount})
          </p>

          <div className="w-full md:w-fit flex items-center justify-between absolute right-0">
            <div className="flex items-center md:mr-6 font-AeonikProRegular text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
              {t("PRselected")}{" "}
              <span className="block md:hidden font-AeonikProMedium">:</span>
            </div>
            {locationIsOneMore && <div className="w-fit  ">
              {checkedList?.length >= 1 && shopLocationIdList?.length > 1 ? (
                <button
                  type="button"
                  onClick={() => setState({ ...state, openSelectModal: true, getShopLocationId: null })}
                  className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-[12px] ll:text-sm md:text-lg text-addLocationTextcolor  active:scale-95  active:opacity-70
              
              `}
                >
                  <span className="mr-[5px]">
                    <AddLocationIcon width={20} />
                  </span>
                  {t("PRaddToLocation")}
                </button>
              ) : (
                <button
                  type="button"
                  className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-[12px] ll:text-sm md:text-lg text-[#D2D2D2] cursor-not-allowed`}
                >
                  <span className="mr-[5px]">
                    <AddLocationIcon width={20} />
                  </span>
                  {t("PRaddToLocation")}
                </button>
              )}
            </div>}

            {checkedList?.length >= 1 ? (
              <button
                type="button"
                onClick={() => setState({ ...state, openDeleteModal: true })}
                className={`pl-[6px] md:pl-3 flex items-center font-AeonikProRegular text-[12px] ll:text-sm md:text-lg text-deleteColor active:scale-95  active:opacity-70`}
              >
                <span className="mr-[5px]">
                  <DeleteIcon width={20} />
                </span>
                {t("PRdelete")}
              </button>
            ) : (
              <button
                type="button"
                className={`pl-[6px] md:pl-3 flex items-center font-AeonikProRegular text-[12px] ll:text-sm md:text-lg text-[#D2D2D2] cursor-not-allowed`}
              >
                <span className="mr-[5px]">
                  <DeleteIcon width={20} />
                </span>
                {t("PRdelete")}
              </button>
            )}
          </div>
        </div>
        <div className="w-full my-4"></div>

        {getProductList?.products_locations
          ?.filter((e) => shopIdList?.includes(e?.id))
          ?.map((item, index) => {
            return (
              <div key={index} className="mt-6   ">
                <div>
                  {index === 0 && (
                    <div className="flex justify-end items-center md:justify-between mx-auto ">
                      <div className="w-full md:w-fit flex items-center justify-between md:justify-normal mt-4 md:mt-0 ">
                        <p className="flex md:hidden text-sm font-AeonikProMedium mb-5 ">
                          {t("PRtotal")}: ( {getProductList?.total_products_amount} )
                        </p>
                      </div>
                    </div>
                  )}
                  {checkedList?.length > 0 ? (
                    Number(state?.shopMarketId) === Number(item?.id) && (
                      <div className="flex items-center w-full ">
                        {item?.shop_locations?.length !== 0 && (
                          <div className="w-full  md:my-6  ">
                            <button
                              type="button"
                              onClick={() => openMarketEditPage(item?.id)}
                              className="w-fit mx-auto   flex items-center justify-center mb-5 cursor-pointer   "
                            >
                              <span className=" block text-textBlueColor text-xl md:text-2xl not-italic font-AeonikProMedium">
                                {item?.name}{" "}
                              </span>
                            </button>
                            <div className="flex flex-col  gap-y-7">

                              {item?.shop_locations
                                ?.filter((e) =>
                                  searchName ? languageDetector?.typeLang === "ru" ?
                                    e?.products?.some((item) => item?.name_ru?.toLowerCase()?.includes(searchName?.toLowerCase())) :
                                    e?.products?.some((item) => item?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase()))
                                    : e
                                )
                                ?.map((resData, index) => {
                                  return (
                                    <div key={index} className="w-full ">
                                      <div className="w-full ">
                                        <div className="mx-auto font-AeonikProRegular text-[16px] ">
                                          <section className="flex flex-col gap-y-1 items-center justify-between  md:mt-2  ">
                                            <div className="w-full md:w-fit flex items-center justify-between md:justify-start">
                                              <div className=" cursor-pointer bg-white flex items-center gap-x-2">
                                                {checkedList?.length ===
                                                  resData?.products?.length &&
                                                  addresNewId === resData?.id ? (
                                                  <button
                                                    onClick={() =>
                                                      allUnCheckedList()
                                                    }
                                                    className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622] bg-fullBlue  justify-center"
                                                  >
                                                    <FiCheck color={"#ffffff"} />
                                                  </button>
                                                ) : (
                                                  <button
                                                    onClick={() => {
                                                      setCheckedList([]);
                                                      allCheckedList(
                                                        resData?.id,
                                                        item?.id,
                                                        resData?.shop_id
                                                      );
                                                      setShopLocationIdList(
                                                        item?.shop_locations
                                                      );
                                                    }}
                                                    className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center"
                                                  ></button>
                                                )}
                                                <p className="text-black text-[13px] md:text-base not-italic flex items-center font-AeonikProMedium mr-[20px]">
                                                  {regionList?.regions
                                                    ?.filter(
                                                      (e) =>
                                                        e?.id ==
                                                        resData?.region_id
                                                    )
                                                    ?.map((values, index) => {
                                                      return (
                                                        <div key={index}>
                                                          {languageDetector?.typeLang === "ru" && values?.name_ru}
                                                          {languageDetector?.typeLang === "uz" && values?.name_uz},
                                                          {values?.sub_regions?.filter((e) => e?.id == resData?.sub_region_id)?.map((valueSub) => {
                                                            return (
                                                              <span key={valueSub?.name_ru} className="px-1">
                                                                {languageDetector?.typeLang === "ru" && valueSub?.name_ru}
                                                                {languageDetector?.typeLang === "uz" && valueSub?.name_uz},
                                                              </span>
                                                            );
                                                          })}
                                                        </div>
                                                      );
                                                    })}
                                                  <span className="hidden md:flex items-center ml-1   ">
                                                    ({resData?.address})
                                                  </span>
                                                  {resData?.products_count >= 1 && (
                                                    <span className="text-black  text-[13px] md:text-base not-italic font-AeonikProMedium ml-1   ">
                                                      ({resData?.products_count})
                                                    </span>
                                                  )}
                                                </p>
                                              </div>
                                              <button
                                                onClick={() =>
                                                  addNewProductId(
                                                    resData?.id,
                                                    resData?.shop_id
                                                  )
                                                }
                                                className="active:scale-95  active:opacity-70 flex items-center gap-x-[4px]"
                                              >
                                                <span className="  xs:hidden flex">
                                                  <AddIconsCircle size={25} />
                                                </span>
                                                <span className="hidden xs:flex">
                                                  <AddIconsCircle />
                                                </span>
                                                <span className="hidden xs:flex text-addWearColorText  text-[13px] md:text-base not-italic font-AeonikProMedium">
                                                  {t("PRaddWear")}
                                                </span>
                                              </button>
                                            </div>
                                            <div className="w-full flex items-center md:hidden  pl-[25px]">
                                              <span className=" text-[13px] text-black not-italic  flex items-center font-AeonikProMedium">
                                                {resData?.address}
                                              </span>
                                            </div>
                                          </section>
                                          {resData?.products?.length !== 0 && (
                                            <div className="w-full hidden md:flex flex-col  ">
                                              <div className="w-full  my-3 hidden md:flex flex-col items-center text-tableTextTitle">
                                                <div className="w-full  h-[70px] flex items-center">
                                                  <div className="w-full h-full flex items-center">
                                                    <p className="min-w-[24px] min-h-[24px] bg-white mr-[8px]"></p>
                                                    <div className="w-full h-full flex items-center justify-between border rounded-[8px]  border-lightBorderColor">
                                                      <p className="w-[5%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                                                        No:
                                                      </p>
                                                      <p className="w-[14%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                                                        {t("PRphoto")}
                                                      </p>
                                                      <p className="w-[18%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center    ">
                                                        {t("PRproductName")}
                                                      </p>

                                                      <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                                                        {t("PRtype")}
                                                      </p>
                                                      <p className="w-[11%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                                                        {t("PRdate")}
                                                      </p>
                                                      <p className="w-[13%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                                                        {t("PRprice")}
                                                      </p>
                                                      <p className="w-[11%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   "></p>
                                                      {item?.shop_locations
                                                        ?.length > 1 ? (
                                                        <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                                                          {t("PRadd")}
                                                        </p>
                                                      ) : (
                                                        <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   "></p>
                                                      )}
                                                      <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center   ">
                                                        {t("PRdelete")}
                                                      </p>
                                                      <p className="w-[11%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center    ">
                                                        {t("PRstatus")}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                          {resData?.products?.length > 0 ? (
                                            <div className="flex flex-col gap-y-[52px] mt-5  ">
                                              {resData?.products?.filter((e) =>
                                                searchName ?
                                                  languageDetector?.typeLang === "ru" ?
                                                    e?.name_ru?.toLowerCase()?.includes(searchName?.toLowerCase()) :
                                                    e?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase())
                                                  :
                                                  e
                                              )
                                                ?.map((itemValue, index) => {
                                                  return (
                                                    <div
                                                      key={index}
                                                      className="w-full "
                                                    >
                                                      <div className="w-full   flex flex-col items-center text-tableTextTitle">
                                                        <div className="w-full flex flex-col  items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
                                                          <div className="flex flex-col w-full">
                                                            <div className="w-full hidden md:flex h-[100px]  items-center">
                                                              <div className="w-full h-full flex items-center">
                                                                <div>
                                                                  <p
                                                                    onClick={() => {
                                                                      setShopLocationIdList(
                                                                        item?.shop_locations
                                                                      );
                                                                      checkListItem(
                                                                        itemValue?.id,
                                                                        resData?.id,
                                                                        resData?.shop_id
                                                                      );
                                                                    }}
                                                                  >
                                                                    {checkedList?.includes(
                                                                      itemValue?.id
                                                                    ) &&
                                                                      addresNewId ===
                                                                      Number(
                                                                        resData?.id
                                                                      ) ? (
                                                                      <button className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#D2D2D2] bg-fullBlue  justify-center">
                                                                        <FiCheck
                                                                          color={
                                                                            "#ffffff"
                                                                          }
                                                                        />
                                                                      </button>
                                                                    ) : (
                                                                      <button className="w-[18px] h-[18px] md:w-[25px] md:h-[25px]  idCheck flex items-center rounded-[6px] overflow-hidden border border-[#D2D2D2]   justify-center"></button>
                                                                    )}
                                                                  </p>
                                                                </div>
                                                                <div className="w-full h-full py-2 ml-2  flex items-center justify-between rounded-[8px] border  border-lightBorderColor">
                                                                  <p className="w-[5%] h-full  flex items-center justify-center  ">
                                                                    {index + 1}
                                                                  </p>
                                                                  <p className="w-[14%] h-full flex items-center justify-center   ">
                                                                    <span className="w-[110px] h-[140px] bg-white  flex items-center justify-center  overflow-hidden rounded-[12px] border  border-lightBorderColor">
                                                                      <img
                                                                        src={
                                                                          itemValue
                                                                            ?.photos[0]
                                                                            ?.url_photo ||
                                                                          "nodate"
                                                                        }
                                                                        alt={
                                                                          "noImg"
                                                                        }
                                                                        className="w-[110px] h-full object-cover"
                                                                      />
                                                                    </span>
                                                                  </p>
                                                                  <div className="w-[18%] h-full break-all px-1 overflow-hidden  flex items-center  justify-center   ">
                                                                    <p className="w-full  break-all  text-center text-weatherWinterColor flex items-center justify-center  text-base not-italic font-AeonikProMedium">
                                                                      {languageDetector?.typeLang === "ru" && itemValue?.name_ru}
                                                                      {languageDetector?.typeLang === "uz" && itemValue?.name_uz}
                                                                    </p>
                                                                  </div>


                                                                  <p
                                                                    key={
                                                                      index
                                                                    }
                                                                    className="w-[10%] h-full  px-1 flex items-center justify-center  "
                                                                  >

                                                                    {languageDetector?.typeLang === "ru" && itemValue?.type?.name_ru}
                                                                    {languageDetector?.typeLang === "uz" && itemValue?.type?.name_uz}
                                                                  </p>

                                                                  <p className="w-[11%] h-full  px-1 flex items-center justify-center  ">
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
                                                                          resData?.id
                                                                        )
                                                                      }
                                                                      className="text-[18px] text-weatherWinterColor w-full text-center"
                                                                    >
                                                                      {t("PRmore")}
                                                                    </button>
                                                                  </div>
                                                                  {item?.shop_locations?.length > 1 ? (
                                                                    <div
                                                                      className={`w-[10%] h-full  flex items-center justify-center  `}
                                                                    >
                                                                      <button
                                                                        onClick={() => {
                                                                          addByLocation(
                                                                            itemValue?.id,
                                                                            resData?.id,
                                                                            resData?.shop_id
                                                                          );
                                                                        }}
                                                                        type="button"
                                                                        className="w-full flex justify-center cursor-auto"
                                                                      >
                                                                        <span
                                                                          onClick={() =>
                                                                            setOpenStoreList(
                                                                              true
                                                                            )
                                                                          }
                                                                          className="cursor-pointer active:scale-95  active:opacity-70 text-[#D2D2D2] hover:text-[#F4A622] transition-colors duration-[0.2s] ease-linear"
                                                                        >
                                                                          <AddLocationIcon
                                                                            width={
                                                                              30
                                                                            }
                                                                          />
                                                                        </span>
                                                                      </button>
                                                                    </div>
                                                                  ) : (
                                                                    <p
                                                                      className={`w-[10%] h-full  flex items-center justify-center  `}
                                                                    ></p>
                                                                  )}
                                                                  <div className="w-[10%] h-full  flex items-center justify-center  ">
                                                                    <button
                                                                      type="button"
                                                                      onClick={() => {
                                                                        setDeleteModal(
                                                                          true
                                                                        );
                                                                        setDeleteId(
                                                                          itemValue?.id
                                                                        );
                                                                        setGetIdShopLocation(
                                                                          resData?.id
                                                                        );
                                                                        setShopLocationIdList(
                                                                          item?.shop_locations
                                                                        );
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
                                                                          onHandleStatus(
                                                                            itemValue?.id,
                                                                            resData?.id,
                                                                            resData?.shop_id
                                                                          )
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
                                                            </div>
                                                            {/* For Mobile Device */}
                                                            <div
                                                              key={itemValue?.id}
                                                              className="border rounded-xl border-[##F2F2F2] p-[10px] md:hidden w-full"                                                            >
                                                              <div className="mb-2">
                                                                <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                                                                  <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                                                  <span className="text-checkboxBorder">
                                                                    {index + 1}
                                                                  </span>
                                                                  <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                                                </div>
                                                              </div>

                                                              <div className="mb-3 h-[148px]">
                                                                <figure className="w-full h-full rounded-lg overflow-hidden">
                                                                  <span className="h-[138px] mx-auto w-[108px] bg-white  flex items-center justify-center  overflow-hidden rounded-[12px] border  border-lightBorderColor">
                                                                    <img
                                                                      src={
                                                                        itemValue
                                                                          ?.photos[0]
                                                                          ?.url_photo ||
                                                                        "nodate"
                                                                      }
                                                                      alt={
                                                                        "noImg"
                                                                      }
                                                                      className="w-full h-full object-cover"
                                                                    />
                                                                  </span>
                                                                </figure>
                                                              </div>

                                                              <div className="mb-6">
                                                                <div className="w-full grid grid-cols-3 gap-4  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px] mb-[8px]">
                                                                  <div className="w-full flex items-center justify-center ">
                                                                    {t("PRproductName2")}
                                                                  </div>
                                                                  <div className="w-full flex items-center justify-center ">
                                                                    {t("PRstatus")}
                                                                  </div>
                                                                  <div className="w-full flex items-center justify-center ">
                                                                    {t("PRprice")}
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
                                                                            resData?.id,
                                                                            resData?.shop_id
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
                                                                      {t("PRsumm")}
                                                                    </span>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              {moreMobile ==
                                                                itemValue?.id && (
                                                                  <div className="mb-6">
                                                                    <div className="w-full grid grid-cols-3 gap-4  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px] gap-x-[10px] mb-[8px]">
                                                                      <div className="w-full flex items-center justify-center ">
                                                                        {t("PRtype")}
                                                                      </div>
                                                                      <div className="w-full"></div>

                                                                      <div className="w-full flex items-center justify-center ">
                                                                        {" "}
                                                                        {t("PRdate")}
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

                                                              <div className={`flex items-center  ${item?.shop_locations?.length > 1 ? "justify-between" : "justify-center"} `}>
                                                                {item?.shop_locations?.length > 1 ?
                                                                  <button
                                                                    onClick={() => {
                                                                      setOpenStoreList(true)
                                                                      addByLocation(
                                                                        itemValue?.id,
                                                                        resData?.id,
                                                                        resData?.shop_id
                                                                      );
                                                                    }}
                                                                    className="text-[#ED7925] bg-[#FDF1E8] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                                                  >
                                                                    {t("PRaddToLocation")}
                                                                  </button> : null}
                                                                <button
                                                                  onClick={() =>
                                                                    goProductDetailEdit(
                                                                      itemValue?.id,
                                                                      resData?.id
                                                                    )
                                                                  }
                                                                  className="text-[#007DCA] bg-[#E8F5FD] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                                                >
                                                                  {t("PRmore")}
                                                                </button>
                                                              </div>

                                                              <div className="w-full grid grid-cols-3 gap-4   mt-[18px]">
                                                                <div
                                                                  className="w-full flex items-center gap-x-2"
                                                                  onClick={() => {
                                                                    setShopLocationIdList(
                                                                      item?.shop_locations
                                                                    );
                                                                    checkListItem(
                                                                      itemValue?.id,
                                                                      resData?.id,
                                                                      resData?.shop_id
                                                                    );
                                                                  }}
                                                                >
                                                                  {checkedList?.includes(
                                                                    itemValue?.id
                                                                  ) &&
                                                                    addresNewId ===
                                                                    Number(
                                                                      resData?.id
                                                                    ) ? (
                                                                    <button className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#D2D2D2]  bg-fullBlue  justify-center">
                                                                      <FiCheck
                                                                        color={
                                                                          "#ffffff"
                                                                        }
                                                                      />
                                                                    </button>
                                                                  ) : (
                                                                    <button className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#D2D2D2]    justify-center"></button>
                                                                  )}
                                                                  <span className="text-[#b5b5b5] text-[13px] font-AeonikProMedium">
                                                                    {t("PRselect2")}
                                                                  </span>
                                                                </div>
                                                                {moreMobile !==
                                                                  itemValue?.id ? (
                                                                  <button
                                                                    onClick={() =>
                                                                      setMoreMobile(
                                                                        itemValue?.id
                                                                      )
                                                                    }
                                                                    className="w-full flex items-center justify-center text-textBlueColor text-[13px] font-AeonikProMedium"
                                                                  >
                                                                    {t("PRmore2")}...
                                                                  </button>
                                                                ) : (
                                                                  <button
                                                                    onClick={() =>
                                                                      setMoreMobile()
                                                                    }
                                                                    className="w-full items-center justify-center text-textBlueColor text-[13px] font-AeonikProMedium"
                                                                  >
                                                                    {t("PRless")}...
                                                                  </button>
                                                                )}
                                                                <button
                                                                  type="button"
                                                                  onClick={() => {
                                                                    setDeleteModal(
                                                                      true
                                                                    );
                                                                    setDeleteId(
                                                                      itemValue?.id
                                                                    );
                                                                    setGetIdShopLocation(
                                                                      resData?.id
                                                                    );
                                                                    setShopLocationIdList(
                                                                      item?.shop_locations
                                                                    );
                                                                  }}
                                                                  className="w-full flex justify-end text-red-600 text-[11px] font-AeonikProMedium"
                                                                >
                                                                  {t("PRdelete")}
                                                                </button>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                            </div>
                                          ) : (
                                            <div className="w-full h-[100px] rounded-lg border flex items-center justify-center mt-2 md:mt-5">
                                              <span className="text-[#D2D2D2] font-AeonikProRegular text-sm md:text-xl">
                                                {t("PRnoProduct")}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="flex items-center w-full  ">
                      {item?.shop_locations?.length !== 0 && (
                        <div className="w-full  md:my-6  ">
                          <button
                            type="button"
                            onClick={() => openMarketEditPage(item?.id)}
                            className="w-fit mx-auto    flex items-center justify-center mb-6 cursor-pointer"
                          >
                            <span className="  md:block text-textBlueColor text-xl md:text-2xl not-italic font-AeonikProMedium ">
                              {item?.name}{" "}
                            </span>
                          </button>
                          <div className="   flex flex-col gap-y-7">

                            {item?.shop_locations
                              ?.filter((location) =>
                                searchName
                                  ? languageDetector?.typeLang === "ru" ?
                                    location?.products?.some((item) => item?.name_ru?.toLowerCase()?.includes(searchName?.toLowerCase())) :
                                    location?.products?.some((item) => item?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase()))
                                  : location
                              )
                              ?.map((resData, index) => {
                                return (
                                  <div key={index} className="w-full   ">
                                    <div className="w-full   ">
                                      <div className="mx-auto font-AeonikProRegular text-[16px] ">
                                        <section className="flex flex-col gap-y-1 items-center justify-between  md:mt-2">
                                          <div className="w-full md:w-fit flex items-center justify-between md:justify-start">
                                            <div className=" cursor-pointer bg-white flex items-center gap-x-2">
                                              {checkedList?.length ===
                                                resData?.products?.length &&
                                                addresNewId === resData?.id ? (
                                                <button
                                                  onClick={() =>
                                                    allUnCheckedList()
                                                  }
                                                  className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622] bg-fullBlue  justify-center"
                                                >
                                                  <FiCheck color={"#ffffff"} />
                                                </button>
                                              ) : (
                                                <button
                                                  onClick={() => {
                                                    setCheckedList([]);
                                                    allCheckedList(
                                                      resData?.id,
                                                      item?.id,
                                                      resData?.shop_id
                                                    );
                                                    setShopLocationIdList(
                                                      item?.shop_locations
                                                    );
                                                  }}
                                                  className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center"
                                                ></button>
                                              )}
                                              <div className="text-black text-[13px] md:text-base not-italic  flex items-center font-AeonikProMedium mr-[20px]">
                                                {regionList?.regions?.filter((e) => e?.id == resData?.region_id)?.map((values, index) => {
                                                  return (
                                                    <div key={index}>
                                                      {languageDetector?.typeLang === "ru" && values?.name_ru}
                                                      {languageDetector?.typeLang === "uz" && values?.name_uz},
                                                      {values?.sub_regions?.filter((e) => e?.id == resData?.sub_region_id)?.map((valueSub) => {
                                                        return (
                                                          <span key={valueSub?.name_ru} className="px-1">
                                                            {languageDetector?.typeLang === "ru" && valueSub?.name_ru}
                                                            {languageDetector?.typeLang === "uz" && valueSub?.name_uz},
                                                          </span>
                                                        );
                                                      })}
                                                    </div>
                                                  );
                                                })}
                                                <span className="hidden md:flex items-center ml-1">
                                                  ({resData?.address})
                                                </span>
                                                {resData?.products_count >= 1 && (
                                                  <span className="text-black text-[13px] md:text-base not-italic font-AeonikProMedium ml-1   ">
                                                    ({resData?.products_count})
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                            <button
                                              onClick={() =>
                                                addNewProductId(
                                                  resData?.id,
                                                  resData?.shop_id
                                                )
                                              }
                                              className="active:scale-95  active:opacity-70 flex items-center gap-x-[4px]"
                                            >
                                              <span className="  xs:hidden flex">
                                                <AddIconsCircle size={25} />
                                              </span>
                                              <span className="hidden xs:flex">
                                                <AddIconsCircle />
                                              </span>
                                              <span className="hidden xs:flex text-addWearColorText text-[13px] md:text-base not-italic font-AeonikProMedium">
                                                {t("PRaddWear")}
                                              </span>
                                            </button>
                                          </div>
                                          <div className="w-full flex items-center md:hidden  pl-[25px]">
                                            <span className=" text-[13px]  not-italic  flex items-center font-AeonikProMedium">
                                              {resData?.address}
                                            </span>
                                          </div>
                                        </section>
                                        {resData?.products?.length !== 0 && (
                                          <div className="w-full hidden md:flex flex-col">
                                            <div className="w-full  my-3 hidden md:flex flex-col items-center text-tableTextTitle">
                                              <div className="w-full  h-[70px] flex items-center">
                                                <p className="min-w-[24px] min-h-[24px] bg-white mr-[8px]"></p>
                                                <div className="w-full h-full flex items-center justify-between border rounded-[8px]  border-lightBorderColor">
                                                  <p className="w-[5%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  ">
                                                    No:
                                                  </p>
                                                  <p className="w-[14%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  ">
                                                    {t("PRphoto")}
                                                  </p>
                                                  <p className="w-[18%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  ">
                                                    {t("PRproductName")}
                                                  </p>

                                                  <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  ">
                                                    {t("PRtype")}
                                                  </p>
                                                  <p className="w-[11%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  ">
                                                    {t("PRdate")}
                                                  </p>
                                                  <p className="w-[13%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  ">
                                                    {t("PRprice")}
                                                  </p>
                                                  <p className="w-[11%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  "></p>
                                                  {item?.shop_locations?.length >
                                                    1 ? (
                                                    <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  ">
                                                      {t("PRadd")}
                                                    </p>
                                                  ) : (
                                                    <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  "></p>
                                                  )}
                                                  <p className="w-[10%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  ">
                                                    {t("PRdelete")}
                                                  </p>
                                                  <p className="w-[11%] h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center  ">
                                                    {t("PRstatus")}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {resData?.products?.length > 0 ? (
                                          <div className="flex flex-col gap-y-[30px] md:gap-y-[52px] mt-5  ">
                                            {resData?.products
                                              ?.filter((e) =>
                                                searchName ?
                                                  languageDetector?.typeLang === "ru" ?
                                                    e?.name_ru?.toLowerCase()?.includes(searchName?.toLowerCase()) :
                                                    e?.name_uz?.toLowerCase()?.includes(searchName?.toLowerCase())
                                                  :
                                                  e
                                              )
                                              ?.map((itemValue, index) => {
                                                return (
                                                  <div
                                                    key={index}
                                                    className="w-full "
                                                  >
                                                    <div className="w-full   flex flex-col items-center text-tableTextTitle">
                                                      <div className="w-full flex flex-col  items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
                                                        <div className="flex flex-col w-full ">
                                                          <div className="w-full  h-[100px]  items-center  hidden md:flex">
                                                            <div className="w-full h-full flex items-center">
                                                              <div>
                                                                <p
                                                                  onClick={() => {
                                                                    setShopLocationIdList(
                                                                      item?.shop_locations
                                                                    );
                                                                    checkListItem(
                                                                      itemValue?.id,
                                                                      resData?.id,
                                                                      resData?.shop_id
                                                                    );
                                                                  }}
                                                                >
                                                                  {checkedList?.includes(
                                                                    itemValue?.id
                                                                  ) &&
                                                                    addresNewId ===
                                                                    Number(
                                                                      resData?.id
                                                                    ) ? (
                                                                    <button className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#D2D2D2]  bg-fullBlue  justify-center">
                                                                      <FiCheck
                                                                        color={
                                                                          "#ffffff"
                                                                        }
                                                                      />
                                                                    </button>
                                                                  ) : (
                                                                    <button className="w-[18px] h-[18px] md:w-[25px] md:h-[25px]  idCheck flex items-center rounded-[6px] overflow-hidden border border-[#D2D2D2]    justify-center"></button>
                                                                  )}
                                                                </p>
                                                              </div>
                                                              <div className="w-full h-full py-2 ml-2  flex items-center justify-between rounded-[8px] border  border-lightBorderColor">
                                                                <p className="w-[5%] h-full  flex items-center justify-center ">
                                                                  {index + 1}
                                                                </p>
                                                                <p className="w-[14%]  px-1 h-full flex items-center justify-center">
                                                                  <span className="w-[110px] h-[140px] bg-white  flex items-center justify-center  overflow-hidden rounded-[12px] border  border-lightBorderColor">
                                                                    <img
                                                                      src={
                                                                        itemValue
                                                                          ?.photos[0]
                                                                          ?.url_photo ||
                                                                        "nodate"
                                                                      }
                                                                      alt={
                                                                        "noImg"
                                                                      }
                                                                      className="w-[110px] h-full object-cover"
                                                                    />
                                                                  </span>
                                                                </p>
                                                                <div className="w-[18%]  px-1 h-full break-all  overflow-hidden  flex items-center  justify-center">
                                                                  <p className="w-full  break-all  text-center text-weatherWinterColor flex items-center justify-center  text-base not-italic font-AeonikProMedium">
                                                                    {languageDetector?.typeLang === "ru" && itemValue?.name_ru}
                                                                    {languageDetector?.typeLang === "uz" && itemValue?.name_uz}
                                                                  </p>
                                                                </div>


                                                                <p
                                                                  key={
                                                                    index
                                                                  }
                                                                  className="w-[10%] h-full  px-1 flex items-center justify-center "
                                                                >
                                                                  {languageDetector?.typeLang === "ru" && itemValue?.type?.name_ru}
                                                                  {languageDetector?.typeLang === "uz" && itemValue?.type?.name_uz}
                                                                </p>

                                                                <p className="w-[11%] h-full  px-1 flex items-center justify-center ">
                                                                  {itemValue?.created_at ||
                                                                    "created_at"}
                                                                </p>

                                                                <p className="w-[13%] h-full  px-1 flex items-center justify-center ">
                                                                  {itemValue?.cost
                                                                    ?.discount_price >
                                                                    999
                                                                    ? Number(
                                                                      itemValue
                                                                        ?.cost
                                                                        ?.discount_price
                                                                    )
                                                                      ?.toLocaleString()
                                                                      ?.split(
                                                                        ","
                                                                      )
                                                                      .join(" ")
                                                                    : itemValue
                                                                      ?.cost
                                                                      ?.discount_price ||
                                                                      itemValue
                                                                        ?.cost
                                                                        ?.price >
                                                                      999
                                                                      ? Number(
                                                                        itemValue
                                                                          ?.cost
                                                                          ?.price
                                                                      )
                                                                        ?.toLocaleString()
                                                                        ?.split(
                                                                          ","
                                                                        )
                                                                        .join(" ")
                                                                      : itemValue
                                                                        ?.cost
                                                                        ?.price}
                                                                  <span className="ml-[6px] text-[14px]">
                                                                    {t("PRsumm")}
                                                                  </span>
                                                                </p>
                                                                <div className="w-[11%] h-full  px-1 flex items-center justify-center ">
                                                                  <button
                                                                    onClick={() =>
                                                                      goProductDetailEdit(
                                                                        itemValue?.id,
                                                                        resData?.id
                                                                      )
                                                                    }
                                                                    className="text-[18px] text-weatherWinterColor w-full text-center"
                                                                  >
                                                                    {t("PRmore")}
                                                                  </button>
                                                                </div>
                                                                {item
                                                                  ?.shop_locations
                                                                  ?.length > 1 ? (
                                                                  <div className="w-[10%] h-full  flex items-center justify-center ">
                                                                    <button
                                                                      onClick={() =>
                                                                        addByLocation(
                                                                          itemValue?.id,
                                                                          resData?.id,
                                                                          resData?.shop_id
                                                                        )
                                                                      }
                                                                      type="button"
                                                                      className="w-full flex justify-center cursor-auto"
                                                                    >
                                                                      <span
                                                                        onClick={() =>
                                                                          setOpenStoreList(
                                                                            true
                                                                          )
                                                                        }
                                                                        className="cursor-pointer active:scale-95  active:opacity-70 text-[#D2D2D2] hover:text-[#F4A622] transition-colors duration-[0.2s] ease-linear"
                                                                      >
                                                                        <AddLocationIcon
                                                                          width={
                                                                            30
                                                                          }
                                                                        />
                                                                      </span>
                                                                    </button>
                                                                  </div>
                                                                ) : (
                                                                  <p
                                                                    className={`w-[10%] h-full  flex items-center justify-center `}
                                                                  ></p>
                                                                )}
                                                                <div className="w-[10%] h-full  flex items-center justify-center ">
                                                                  <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                      setDeleteModal(
                                                                        true
                                                                      );
                                                                      setDeleteId(
                                                                        itemValue?.id
                                                                      );
                                                                      setGetIdShopLocation(
                                                                        resData?.id
                                                                      );
                                                                      setShopLocationIdList(
                                                                        item?.shop_locations
                                                                      );
                                                                    }}
                                                                    className="w-fit flex justify-center cursor-auto"
                                                                  >
                                                                    <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#D2D2D2] hover:text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
                                                                      <DeleteIcon
                                                                        width={30}
                                                                      />
                                                                    </span>
                                                                  </button>
                                                                </div>
                                                                {itemValue?.status ===
                                                                  "approved" && (
                                                                    <p className="w-[11%] h-fit  flex items-center justify-center  ">
                                                                      <span className="min-w-[110px] text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[3px]  rounded-full ">
                                                                        {t("approved")}
                                                                      </span>
                                                                    </p>
                                                                  )}
                                                                {itemValue?.status ===
                                                                  "declined" && (
                                                                    <p
                                                                      onClick={() =>
                                                                        onHandleStatus(
                                                                          itemValue?.id,
                                                                          resData?.id,
                                                                          resData?.shop_id
                                                                        )
                                                                      }
                                                                      className="w-[11%] h-fit cursor-pointer flex items-center  justify-center"
                                                                    >
                                                                      <span className="min-w-[110px] text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[3px]  rounded-full">
                                                                        {t("declined")}
                                                                      </span>
                                                                    </p>
                                                                  )}
                                                                {itemValue?.status ===
                                                                  "pending" && (
                                                                    <p className="w-[11%] h-fit  flex items-center justify-center ">
                                                                      <span className="min-w-[110px] text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[3px]  rounded-full ">
                                                                        {t("pending")}
                                                                      </span>
                                                                    </p>
                                                                  )}
                                                                {itemValue?.status ===
                                                                  "updated" && (
                                                                    <p className="w-[11%] h-fit  flex items-center justify-center   ">
                                                                      <span className="min-w-[110px] text-center text-[#007DCA] bg-bgUpdate font-AeonikProRegular py-[3px]  rounded-full ">
                                                                        {t("updated")}
                                                                      </span>
                                                                    </p>
                                                                  )}
                                                              </div>
                                                            </div>
                                                          </div>
                                                          {/* For Mobile Device */}
                                                          <div
                                                            key={itemValue?.id}
                                                            className="border rounded-xl border-[##F2F2F2] p-[10px] md:hidden w-full"
                                                          >
                                                            <div className="mb-2">
                                                              <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                                                                <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                                                <span className="text-checkboxBorder">
                                                                  {index + 1}
                                                                </span>
                                                                <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                                                              </div>
                                                            </div>

                                                            <div className="mb-3 h-[148px]">
                                                              <figure className="w-full h-full rounded-lg overflow-hidden">
                                                                <span className="h-[138px] mx-auto w-[108px] bg-white  flex items-center justify-center  overflow-hidden rounded-[12px] border  border-lightBorderColor">
                                                                  <img
                                                                    src={
                                                                      itemValue
                                                                        ?.photos[0]
                                                                        ?.url_photo ||
                                                                      "nodate"
                                                                    }
                                                                    alt={"noImg"}
                                                                    className="w-full h-full object-cover"
                                                                  />
                                                                </span>
                                                              </figure>
                                                            </div>

                                                            <div className="mb-6">
                                                              <div className="w-full  grid grid-cols-3 gap-4  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px]   mb-[8px]">
                                                                <div className="w-full flex items-center justify-center   ">
                                                                  {t("PRproductName2")}
                                                                </div>
                                                                <div className="w-full flex items-center justify-center   ">
                                                                  {t("PRstatus")}
                                                                </div>
                                                                <div className="w-full flex items-center justify-center   ">
                                                                  {t("PRprice")}
                                                                </div>
                                                              </div>

                                                              <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[11px] items-center">
                                                                <div className="w-full break-all  overflow-hidden  ">
                                                                  <p className="w-full  break-all  text-weatherWinterColor text-center   text-[11px] xs:text-[13px] md:text-base not-italic font-AeonikProMedium">

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
                                                                          resData?.id,
                                                                          resData?.shop_id
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
                                                                  {itemValue?.cost
                                                                    ?.discount_price >
                                                                    999
                                                                    ? Number(
                                                                      itemValue
                                                                        ?.cost
                                                                        ?.discount_price
                                                                    )
                                                                      ?.toLocaleString()
                                                                      ?.split(
                                                                        ","
                                                                      )
                                                                      .join(" ")
                                                                    : itemValue
                                                                      ?.cost
                                                                      ?.discount_price ||
                                                                      itemValue
                                                                        ?.cost
                                                                        ?.price >
                                                                      999
                                                                      ? Number(
                                                                        itemValue
                                                                          ?.cost
                                                                          ?.price
                                                                      )
                                                                        ?.toLocaleString()
                                                                        ?.split(
                                                                          ","
                                                                        )
                                                                        .join(" ")
                                                                      : itemValue
                                                                        ?.cost
                                                                        ?.price}
                                                                  <span className="ml-[6px]  text-[11px] xs:text-[13px] md:text-base not-italic font-AeonikProMedium">
                                                                    {t("PRsumm")}
                                                                  </span>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            {moreMobile ==
                                                              itemValue?.id && (
                                                                <div className="mb-6">
                                                                  <div className="w-full grid grid-cols-3 gap-4  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[12px]   mb-[8px]">
                                                                    {/* <div className="w-full flex items-center justify-center  ">
                                                                      {t("PRrandomCode")}
                                                                    </div> */}
                                                                    <div className="w-full flex items-center justify-center  ">
                                                                      {t("PRtype")}
                                                                    </div>
                                                                    <div className="w-full"></div>

                                                                    <div className="w-full flex items-center justify-center  ">
                                                                      {" "}
                                                                      {t("PRdate")}
                                                                    </div>
                                                                  </div>

                                                                  <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[11px] items-center">
                                                                    {/* <div className="w-full break-all  overflow-hidden  ">
                                                                      <p className="w-full  break-all  text-weatherWinterColor   text-[11px] xs:text-[13px] md:text-base not-italic font-AeonikProMedium">
                                                                        {itemValue?.sku ||
                                                                          "sku"}
                                                                      </p>
                                                                    </div> */}

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

                                                            <div className={`flex items-center  ${item?.shop_locations?.length > 1 ? "justify-between" : "justify-center"} `}>
                                                              {item?.shop_locations?.length > 1 ?
                                                                <button
                                                                  onClick={() => {
                                                                    setOpenStoreList(true)
                                                                    addByLocation(
                                                                      itemValue?.id,
                                                                      resData?.id,
                                                                      resData?.shop_id
                                                                    );
                                                                  }}
                                                                  className="text-[#ED7925] bg-[#FDF1E8] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                                                >
                                                                  {t("PRaddToLocation")}
                                                                </button> : null}
                                                              <button
                                                                onClick={() =>
                                                                  goProductDetailEdit(
                                                                    itemValue?.id,
                                                                    resData?.id
                                                                  )
                                                                }
                                                                className="text-[#007DCA] bg-[#E8F5FD] text-center w-[45%] py-2 rounded-lg text-[11px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                                                              >
                                                                {t("PRmore")}
                                                              </button>
                                                            </div>

                                                            <div className="w-full  grid grid-cols-3 gap-4 flex items-center justify-between mt-[18px]">
                                                              <div
                                                                className="w-full flex items-center flex justify-start gap-x-2"
                                                                onClick={() => {
                                                                  setShopLocationIdList(
                                                                    item?.shop_locations
                                                                  );
                                                                  checkListItem(
                                                                    itemValue?.id,
                                                                    resData?.id,
                                                                    resData?.shop_id
                                                                  );
                                                                }}
                                                              >
                                                                {checkedList?.includes(
                                                                  itemValue?.id
                                                                ) &&
                                                                  addresNewId ===
                                                                  Number(
                                                                    resData?.id
                                                                  ) ? (
                                                                  <button className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#D2D2D2]  bg-fullBlue  justify-center">
                                                                    <FiCheck
                                                                      color={
                                                                        "#ffffff"
                                                                      }
                                                                    />
                                                                  </button>
                                                                ) : (
                                                                  <button className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] idCheck flex items-center rounded-[6px] overflow-hidden border border-[#D2D2D2]    justify-center"></button>
                                                                )}
                                                                <span className="text-[#b5b5b5] text-[13px] font-AeonikProMedium">
                                                                  {t("PRselect2")}
                                                                </span>
                                                              </div>
                                                              {moreMobile !==
                                                                itemValue?.id ? (
                                                                <button
                                                                  onClick={() =>
                                                                    setMoreMobile(
                                                                      itemValue?.id
                                                                    )
                                                                  }
                                                                  className="w-full flex justify-center text-textBlueColor text-[13px] font-AeonikProMedium"
                                                                >
                                                                  {t("PRmore2")}...
                                                                </button>
                                                              ) : (
                                                                <button
                                                                  onClick={() =>
                                                                    setMoreMobile()
                                                                  }
                                                                  className="w-full flex justify-center text-textBlueColor text-[13px] font-AeonikProMedium"
                                                                >
                                                                  {t("PRless")}...
                                                                </button>
                                                              )}
                                                              <button
                                                                type="button"
                                                                onClick={() => {
                                                                  setDeleteModal(
                                                                    true
                                                                  );
                                                                  setDeleteId(
                                                                    itemValue?.id
                                                                  );
                                                                  setGetIdShopLocation(
                                                                    resData?.id
                                                                  );
                                                                  setShopLocationIdList(
                                                                    item?.shop_locations
                                                                  );
                                                                }}
                                                                className="w-full flex justify-end text-red-600 text-[11px] font-AeonikProMedium"
                                                              >
                                                                {t("PRdelete")}
                                                              </button>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                          </div>
                                        ) : (
                                          <div className="w-full h-[100px] rounded-lg border flex items-center justify-center mt-2 md:mt-5">
                                            <span className="text-[#D2D2D2] font-AeonikProRegular text-sm md:text-xl">
                                              {t("PRnoProduct")}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
