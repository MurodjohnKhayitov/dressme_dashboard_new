import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowTopIcons,
  GoBackIcons,
  MenuCloseIcons,
  SearchIcon,
  StarLabel,
  MapLocationIcon,
  DeleteIcon,
} from "../../../../assets/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import InputMask from "react-input-mask";
import { YMaps, Map, ZoomControl, GeolocationControl } from "react-yandex-maps";

import { BiCheckDouble } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { clsx } from "clsx";
import "../LocationAddById/yandexmapsStore.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PuffLoader from "react-spinners/PuffLoader";

import { useHttp } from "../../../../hook/useHttp";
import { FaCheck } from "react-icons/fa6";
import LoadingForSeller from "../../../Loading/LoadingFor";
import imageCompression from "browser-image-compression";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";
import { BackBtn } from "../../../backBtn/backBtn";
import { dressRegionList } from "../../../../hook/RegionList";


export default function LocationMapCity() {
  const { request } = useHttp();
  const [regionList, setRegionList] = useContext(dressRegionList)

  const { t } = useTranslation("locations");
  const [languageDetector] = useContext(LanguageDetectorDress);

  const [state, setState] = useState({
    idAddress: "",
    idAssistantMessenger: "",
    idAssistantName: "",
    assistantNameFirstTg: "",
    assistantNameSecondTg: "",
    idAssistantPhone: "",
    idAssistantPhoneCode: "+998",
    idSecondAssistantMessegner: "",
    idSecondAssistantName: "",
    idSecondAssistantPhone: "",
    idSecondAssistantPhoneCode: "+998",
    idLongitudeById: "",
    idLatitudeById: "",
    idShopId: "",
    idRegionId: "",
    idSupRregionId: "",
    idImageOne: "",
    idImageTwo: "",
    idImageThree: "",
    idWorkTimeFrom: "",
    idWorkTimeTo: "",
    // ---------------
    getRegionList: "",
    //------forImg
    pictureBgFile1: "",
    pictureBgView1: "",
    pictureBgView2: "",
    pictureBgFile2: "",
    pictureBgTest2: "",
    pictureBgView3: "",
    pictureBgFile3: "",
    pictureBgTest3: "",
    // ----
  });
  const [checkConfirmData, setCheckConfirmData] = useState();
  const [loaderEdit, setLoaderEdit] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [hideDeleteIcons, setHideDeleteIcons] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [openStoreList, setOpenStoreList] = useState(false);

  async function handleLocationImageOne(event) {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setState({
        ...state,
        pictureBgFile1: compressedFile,
        pictureBgView1: URL.createObjectURL(event.target.files[0]),
      });
    } catch (error) {
      throw new Error(error || "something wrong");

    }
  }

  const [pictureFile2, setPictureFile2] = useState("");
  const [pictureView2, setPictureView2] = useState("");

  async function handleLocationImageTwo(event) {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setPictureFile2(compressedFile);
      setPictureView2(URL.createObjectURL(event.target.files[0]));
    } catch (error) {
      throw new Error(error || "something wrong");

    }
  }

  async function handleLocationImageThree(event) {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setState({
        ...state,
        pictureBgFile3: compressedFile,
        pictureBgView3: URL.createObjectURL(event.target.files[0]),
      });
    } catch (error) {
      throw new Error(error || "something wrong");

    }
  }

  const [isSendedLocation, setIsSendedLocation] = useState(true);
  const [forMaps, setForMaps] = useState({
    title: "",
    center: [],
    zoom: 12,
  });
  const { id } = useParams();
  const NewId = id.replace(":", "");

  const navigate = useNavigate();

  const url = "https://api.dressme.uz/api/seller";

  const deleteProductByAddress = useMutation(() => {
    return request({
      url: `/shops/locations/${NewId}`,
      method: "DELETE",
      token: true,
    });
  });

  function onLocaTionDelete() {
    setLoader(true);
    setHideDeleteIcons(true);
    deleteProductByAddress.mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message) {
            setSuccessMessage(res?.message);
            setLoader(false);
            // onRefetch()
            setTimeout(() => {
              setDeleteModal(false);
              navigate("/locations-store");
            }, 2000);
          }
        },
        onError: (err) => {
          throw new Error(err || "something wrong");
        },
      }
    );
  }

  // // ------------GET  location id?-----------------
  const { refetch } = useQuery(
    ["location_index_id"],
    () => {
      return request({ url: `/shops/locations/${NewId}`, token: true });
    },
    {
      onSuccess: (res) => {
        if (res?.errors && res?.message) {
          toast.error(`${res?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }); setLoaderEdit(false);
        } else if (res?.location) {
          setCheckConfirmData(res?.location)
          setState({
            ...state,
            idAddress: res?.location?.address,
            assistantNameFirstTg: res?.location?.assistant_messenger,
            idAssistantName: res?.location?.assistant_name,
            assistantNameSecondTg: res?.location?.second_assistant_messenger,
            idSecondAssistantName: res?.location?.second_assistant_name,
            idLecondAssistantPhone: res?.location?.second_assistant_phone,
            idLongitudeById: res?.location?.longitude,
            idLatitudeById: res?.location?.latitude,
            idShopId: res?.location?.shop_id,
            idRegionId: res?.location?.region_id,
            idSupRregionId: res?.location?.sub_region_id,
            idWorkTimeFrom: res?.location?.work_time_from,
            idWorkTimeTo: res?.location?.work_time_to,
            // -

            idAssistantPhone:
              res?.location?.assistant_phone &&
              res?.location?.assistant_phone?.slice(4, 13),
            // -

            idSecondAssistantPhone:
              res?.location?.second_assistant_phone &&
              res?.location?.second_assistant_phone?.slice(4, 13),
            // --------ForImg
            pictureBgView1: res?.location?.url_image_path_one,
            // pictureBgView2: res?.location?.url_image_path_two,
            pictureBgTest2: res?.location?.url_image_path_two,
            pictureBgView3: res?.location?.url_image_path_three,
            pictureBgTest3: res?.location?.url_image_path_three,
          });
          setPictureView2(res?.location?.url_image_path_two);
          setForMaps({
            ...forMaps,
            title: res?.location?.address,
            center: [
              parseFloat(res?.location?.latitude?.slice(0, 9)),
              parseFloat(res?.location?.longitude?.slice(0, 9)),
            ],
          });
          setLoaderEdit(false);
        }
      },
      onError: (err) => {
        setLoaderEdit(false);
        throw new Error(err || "something wrong");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const [backImgUploadModal, setBackImgUploadModal] = useState(false);
  const [backImgOrder, setBackImgOrder] = useState("");
  const [openRegionModal, setOpenRegionModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const accordionCityList = (id) => {
    if (activeIndex == id) {
      setActiveIndex(0);
    } else {
      setActiveIndex(id);
    }
  };
  // ----------phone Number----------1
  const assistantPhoneNumberFirst =
    state.idAssistantPhoneCode +
    state?.idAssistantPhone
      ?.split("-")
      ?.join("")
      ?.split(")")
      ?.join("")
      ?.split("(")
      ?.join("")
      ?.split(" ")
      ?.join("");
  const assistantPhoneNumberSecond =
    state?.idAssistantPhoneCode +
    state?.idSecondAssistantPhone
      ?.split("-")
      ?.join("")
      ?.split(")")
      ?.join("")
      ?.split("(")
      ?.join("")
      ?.split(" ")
      ?.join("")

  const AssistantPhoneConfirm = state?.idSecondAssistantPhone
    ?.split("-")
    ?.join("")
    ?.split(")")
    ?.join("")
    ?.split("(")
    ?.join("")
    ?.split(" ")
    ?.join("");


  // -------------------------------------------Maps---------------------------------
  const mapOptions = {
    modules: ["geocode", "SuggestView"],
    defaultOptions: { suppressMapOpenBlock: true },
  };

  const [mapConstructor, setMapConstructor] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);

  const handleSubmit = () => {
    setForMaps({
      ...forMaps,
      title: forMaps?.title,
      center: [mapRef.current.getCenter()[0], mapRef.current.getCenter()[1]],
    });

    setIsSendedLocation(false);
  };
  // reset state & search
  const handleReset = () => {
    setForMaps({ ...forMaps, title: "" });
    searchRef.current.value = "";
  };

  // search popup
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add(
        "select",
        function (e) {
          const selectedName = e.get("item").value;
          mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            setForMaps((prevState) => ({ ...prevState, center: newCoords }));
          });
        }
      );
    }
  }, [mapConstructor]);

  // change title
  const handleBoundsChange = (e) => {
    setIsSendedLocation(true);

    const newCoords = mapRef.current.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get("text");
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = forMaps.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setForMaps((prevState) => ({ ...prevState, title: foundAddress }));
      }
    });
  };

  // -------------------------------------------Maps---------------------------------

  const handleEditLocation = () => {
    setLoaderEdit(true);
    let form = new FormData();
    forMaps?.title !== checkConfirmData?.address && form.append("address", forMaps?.title);
    form.append("latitude", forMaps?.center[0]);
    form.append("longitude", forMaps?.center[1]);
    form.append("shop_id", state?.idShopId);
    state?.idRegionId !== checkConfirmData?.region_id && form.append("region_id", state?.idRegionId);
    state?.idSupRregionId !== checkConfirmData?.sub_region_id && form.append("sub_region_id", state?.idSupRregionId);
    state?.idWorkTimeFrom !== checkConfirmData?.work_time_from && form.append("work_time_from", state?.idWorkTimeFrom);
    state?.idWorkTimeTo !== checkConfirmData?.work_time_to && form.append("work_time_to", state?.idWorkTimeTo);
    state?.idAssistantName !== checkConfirmData?.assistant_name && form.append("assistant_name", state?.idAssistantName);
    assistantPhoneNumberFirst !== checkConfirmData?.assistant_phone && form.append("assistant_phone", assistantPhoneNumberFirst);
    state?.assistantNameFirstTg !== checkConfirmData?.assistant_messenger &&
      form.append("assistant_messenger", state?.assistantNameFirstTg);
    state?.assistantNameSecondTg !== checkConfirmData?.second_assistant_messenger &&
      form.append("second_assistant_messenger", state?.assistantNameSecondTg);
    state?.idSecondAssistantName !== checkConfirmData?.second_assistant_name &&
      form.append("second_assistant_name", state?.idSecondAssistantName);
    assistantPhoneNumberSecond !== checkConfirmData?.second_assistant_phone && AssistantPhoneConfirm?.length > 0 && form.append("second_assistant_phone", assistantPhoneNumberSecond);

    state?.pictureBgFile1 &&
      form.append("shop_photo_one", state?.pictureBgFile1);
    pictureFile2 && form.append("shop_photo_two", pictureFile2);
    state?.pictureBgFile3 &&
      form.append("shop_photo_three", state?.pictureBgFile3);

    return fetch(`${url}/shops/locations/edit/${NewId}`, {
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
        window.scrollTo({
          top: 0,
        });
        setLoaderEdit(false);
        if (res?.errors && res?.message) {
          toast.error(`${res?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (res?.message) {
          toast.success(`${res?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          refetch();
          // navigate('/locations-store')
        }
      })
      .catch((err) => {
        setLoaderEdit(false);
        throw new Error(err || "something wrong");
      });
  };
  function onUserDeleteBackgroundImg2() {
    if (state?.pictureBgTest2) {
      let form = new FormData();
      setLoader(true);
      setHideDeleteIcons(true);
      pictureView2 && form.append("image_two", 1);
      return fetch(`${url}/shops/locations/${NewId}/delete-location-photo`, {
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
            setLoader(false);
          } else if (res?.message) {
            setSuccessMessage(res?.message);
            setLoader(false);
            refetch();
            setTimeout(() => {
              setBackImgUploadModal(false);
              setHideDeleteIcons(false);
            }, 1000);
          }
        })
        .catch((err) => {
          throw new Error(err || "something wrong");
        });
    }
    if (!state?.pictureBgTest2) {
      setPictureView2("");
      // setPictureTest2("");
      setBackImgUploadModal(false);
    }
  }
  function onUserDeleteBackgroundImg3() {
    if (state?.pictureBgTest3) {
      let form = new FormData();
      setLoader(true);
      setHideDeleteIcons(true);
      state?.pictureBgView3 && form.append("image_three", 1);
      return fetch(`${url}/shops/locations/${NewId}/delete-location-photo`, {
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
            setLoader(false);
          } else if (res?.message) {
            setSuccessMessage(res?.message);
            setLoader(false);
            refetch();
            setTimeout(() => {
              setBackImgUploadModal(false);
              setHideDeleteIcons(false);
            }, 1000);
          }
        })
        .catch((err) => {
          throw new Error(err || "something wrong");
        });
    }

    if (!state?.pictureBgTest3) {
      setState({ ...state, pictureBgFile3: "", pictureBgView3: "" });
    }
  }

  // For DropUp
  useEffect(() => {
    if (openRegionModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openRegionModal]);

  const handleInputAdminNameFirst = (e) => {
    if (e.target.value) {
      setState({
        ...state,
        idAssistantName:
          e.target.value?.charAt(0).toUpperCase() + e.target.value?.slice(1),
      });
    } else {
      setState({ ...state, idAssistantName: null });
    }
  };
  const handleInputAdminNameSecond = (e) => {
    if (e.target.value) {
      setState({
        ...state,
        idSecondAssistantName:
          e.target.value?.charAt(0).toUpperCase() + e.target.value?.slice(1),
      });
    } else {
      setState({ ...state, idSecondAssistantName: null });
    }
  };
  const handleInputAdminNameFirstTg = (e) => {
    if (e.target.value) {
      setState({
        ...state,
        assistantNameFirstTg: e.target.value,
      });
    } else {
      setState({ ...state, assistantNameFirstTg: null });
    }
  };
  const handleInputAdminNameSecondTg = (e) => {
    if (e.target.value) {
      setState({ ...state, assistantNameSecondTg: e.target.value });
    } else {
      setState({ ...state, assistantNameSecondTg: null });
    }
  };
  return (
    <div>
      {loaderEdit ? (
        <LoadingForSeller />
      ) : (
        <div className="w-full md:px-10 ">
          <div className="w-full max-w-[920px] mx-auto mt-6 md:mt-12 mb-[30px]">
            <div
              onClick={() => {
                setOpenRegionModal(false);
              }}
              className={`fixed inset-0 z-[99999] cursor-pointer duration-200 w-full h-[100vh] bg-black opacity-50
         ${openRegionModal ? "" : "hidden"}`}
            ></div>
            <section
              onClick={() => {
                setDeleteModal(false);
                setOpenStoreList(false);
                setSuccessMessage(null);
                // setDeleteMessage(null)
                // setHideProductList(false)
                setBackImgUploadModal(false);
              }}
              className={`fixed inset-0 z-[99999] duration-200 w-full h-[100vh] bg-black opacity-50
         ${deleteModal || openStoreList || backImgUploadModal ? "" : "hidden"}`}
            ></section>
            <div
              className={`max-w-[440px] md:max-w-[600px] h-fit fixed px-3 md:px-6  py-2 md:py-4 bg-white rounded-b-none md:rounded-b-l rounded-t-lg mx-auto w-full duration-500 z-[999999] md:top-[50%] left-1/2 right-1/2 translate-x-[-50%] md:translate-y-[-50%] overflow-hidden ${openRegionModal
                ? " bottom-0 md:flex flex-col"
                : "md:hidden bottom-[-1500px] z-[-10]"
                }`}
            >
              <div className="w-full flex items-center justify-between font-AeonikProMedium">
                <span className="text-black text-lg not-italic font-AeonikProMedium">
                  {t("choose_region")}
                </span>
                <span
                  className="select-none cursor-pointer"
                  onClick={() => setOpenRegionModal(false)}
                >
                  <MenuCloseIcons colors="#a1a1a1" />
                </span>
              </div>

              <div className="w-full overflow-auto  flex flex-col gap-y-4 pt-3  overflow-x-hidden mt-3 h-[50vh] md:h-[60vh] VerticelScroll pr-2  ">
                {regionList?.regions ? (
                  regionList?.regions?.map((data, index) => {
                    return (
                      <div key={data?.id} className={`w-full  h-fit ${data?.id === 2 ? "" : "opacity-50"} `}>
                        <div
                          onClick={data?.id === 2
                            ? () => {
                              accordionCityList(data?.id);
                            }
                            : null}
                          className="w-full cursor-pointer flex items-center pr-1 justify-between border-b border-[#F0F0F0] "
                        >
                          <span className="text-[#303030] text-base md:text-lg not-italic font-AeonikProRegular">
                            {languageDetector?.typeLang === "ru" &&
                              data?.name_ru}
                            {languageDetector?.typeLang === "uz" &&
                              data?.name_uz}
                          </span>
                          <span
                            className={`${activeIndex == data?.id
                              ? "rotate-[0deg]"
                              : "rotate-[180deg]"
                              } `}
                          >
                            <ArrowTopIcons colors={"#a1a1a1"} />
                          </span>
                        </div>

                        <div
                          className={`w-full grid grid-cols-3 xs:grid-cols-3 duration-[400ms]
                             ${activeIndex == data?.id
                              ? "openAccardion"
                              : "CloseAccardion"
                            } `}
                        >
                          {data?.sub_regions?.map((item) => {
                            return (
                              <div
                                key={item?.id}
                                className="flex items-center px-[2px] gap-x-[4px] cursor-pointer"
                              >
                                <label
                                  htmlFor={item?.name_ru}
                                  className="flex items-center gap-x-[6px]"
                                >
                                  <input
                                    type="radio"
                                    id={item?.name_ru}
                                    name="type_work"
                                    value={item?.region_id || ""}
                                    checked={state?.idSupRregionId == item?.id}
                                    className="border border-borderColor  cursor-pointer  flex items-center justify-center"
                                    onChange={(e) => {
                                      setState({
                                        ...state,
                                        idRegionId: e.target.value,
                                        idSupRregionId: item?.id,
                                      });
                                    }}
                                    required
                                  />
                                  <span className="text-[#303030]  cursor-pointer text-[13px] md:text-[15px]  not-italic font-AeonikProRegular">
                                    {languageDetector?.typeLang === "ru" &&
                                      item?.name_ru}
                                    {languageDetector?.typeLang === "uz" &&
                                      item?.name_uz}
                                  </span>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="w-full h-full flex flex-col items-center justify-center text-[14px] md:text-base ">
                    {t("loading_data")}
                  </p>
                )}
              </div>
              <div className="w-full flex items-center justify-end mt-2">
                <span
                  onClick={() => setOpenRegionModal(false)}
                  className="cursor-pointer text-textBlueColor text-base md:text-lg not-italic font-AeonikProMedium"
                >
                  {t("ready")}
                </span>
              </div>
            </div>
            {/* Delete Product Of Pop Confirm */}
            <section
              className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[100000] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${deleteModal
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
                    <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                      <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                        <FaCheck size={30} color="#009B17" />
                      </span>
                      <span className="text-base not-italic font-AeonikProMedium">
                        {SuccessMessage}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
                  <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                    <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                      <DeleteIcon width={30} />
                    </span>
                  </span>
                  <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                    {t("sure")}?
                  </span>
                </div>
              )}
              <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
                <button
                  onClick={() => setDeleteModal(false)}
                  type="button"
                  className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[38px] md:h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => onLocaTionDelete()}
                  type="button"
                  className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[38px] md:h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
                >
                  {t("delete")}
                </button>
              </div>
            </section>
            {/* Background Img Edit */}
            {backImgUploadModal && backImgOrder && (
              <div className="max-w-[440px] md:max-w-[650px] h-fit w-full fixed z-[100000]  left-1/2 right-1/2 top-[50%] translate-x-[-50%] translate-y-[-50%]  flex items-center  justify-center mx-auto ">
                {/* </div> */}

                {backImgOrder === 1 && (
                  <div className="relative z-[100001]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className={`flex items-center justify-between  pb-3`}>
                      <div className="w-fit flex items-center">
                        <span className="text-black text-sm md:text-lg not-italic font-AeonikProRegular leading-5">
                          {t("select_photo")}
                        </span>
                      </div>
                      <button
                        className="py-2"
                        type="button"
                        onClick={() => setBackImgUploadModal(false)}
                      >
                        <MenuCloseIcons colors={"#a1a1a1"} />
                      </button>
                    </div>
                    <div className="w-full  h-[40vh] md:h-[50vh] flex items-center justify-center border border-searchBgColor rounded-lg overflow-hidden">
                      {hideDeleteIcons ? (
                        <div className="w-full flex items-center justify-center">
                          {loader && hideDeleteIcons ? (
                            <PuffLoader
                              color={"#007DCA"}
                              size={80}
                              loading={true}
                            />
                          ) : (
                            <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                              <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                <FaCheck size={30} color="#009B17" />
                              </span>
                              <span className="text-base not-italic font-AeonikProMedium">
                                {SuccessMessage}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : state?.pictureBgView1 ? (
                        <img
                          src={state?.pictureBgView1}
                          alt="backImg"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <span className="leading-none text-sm md:text-base md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                          {t("photo")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between  pt-2">
                      <label
                        htmlFor={"imageOne1"}
                        className="w-fit flex items-center justify-center cursor-pointer  active:scale-95 text-textBlueColor  text-sm md:text-base font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imageOne1"}
                          type="file"
                          name="fileUpload1"
                          onChange={handleLocationImageOne}
                          accept=" image/*"
                        />
                        {state?.pictureBgView1
                          ? t("change_photo")
                          : t("upload_a_photo")}
                      </label>
                      <button
                        onClick={() => setBackImgUploadModal(false)}
                        className="w-fit h-fit flex items-end justify-end text-sm md:text-base select-none active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"
                      >
                        {t("cancel")}
                      </button>
                    </div>
                  </div>
                )}
                {backImgOrder === 2 && (
                  <div className="relative z-[100001]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className={`flex items-center justify-between  pb-3`}>
                      <div className="w-fit flex items-center">
                        <span className="text-black text-sm md:text-base not-italic font-AeonikProRegular leading-5">
                          {t("select_photo")}
                        </span>
                      </div>
                      <button
                        className="py-2"
                        type="button"
                        onClick={() => setBackImgUploadModal(false)}
                      >
                        <MenuCloseIcons colors={"#a1a1a1"} />
                      </button>
                    </div>
                    <div className="w-full h-[40vh] md:h-[50vh] flex items-center justify-center border border-searchBgColor rounded-lg overflow-hidden">
                      {hideDeleteIcons ? (
                        <div className="w-full flex items-center justify-center">
                          {loader && hideDeleteIcons ? (
                            <PuffLoader
                              color={"#007DCA"}
                              size={80}
                              loading={true}
                            />
                          ) : (
                            <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                              <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                <FaCheck size={30} color="#009B17" />
                              </span>
                              <span className="text-base not-italic font-AeonikProMedium">
                                {SuccessMessage}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : pictureView2 ? (
                        <img
                          src={pictureView2}
                          alt="backImg"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <span className="leading-none text-[12px]  md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                          {t("photo")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between  pt-2">
                      <label
                        htmlFor={"imageTwo2"}
                        className="w-fit   flex items-center justify-center text-sm md:text-lg cursor-pointer active:scale-95 text-textBlueColor   font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imageTwo2"}
                          type="file"
                          name="fileUpload2"
                          onChange={handleLocationImageTwo}
                          accept=" image/*"
                        />
                        {pictureView2 ? t("change_photo") : t("upload_a_photo")}
                      </label>
                      {pictureView2 ? (
                        <button
                          onClick={() => onUserDeleteBackgroundImg2()}
                          className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-sm md:text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"
                        >
                          {t("delete")}
                        </button>
                      ) : (
                        <button
                          onClick={() => setBackImgUploadModal(false)}
                          className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-sm md:text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"
                        >
                          {t("cancel")}
                        </button>
                      )}
                    </div>
                  </div>
                )}
                {backImgOrder === 3 && (
                  <div className="relative z-[100001]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className={`flex items-center justify-between  pb-3`}>
                      <div className="w-fit flex items-center">
                        <span className="text-black text-sm md:text-lg not-italic font-AeonikProRegular leading-5">
                          {t("select_photo")}
                        </span>
                      </div>
                      <button
                        className="py-2"
                        type="button"
                        onClick={() => setBackImgUploadModal(false)}
                      >
                        <MenuCloseIcons colors={"#a1a1a1"} />
                      </button>
                    </div>
                    <div className="w-full h-[40vh] md:h-[50vh] flex items-center justify-center border border-searchBgColor rounded-lg overflow-hidden">
                      {hideDeleteIcons ? (
                        <div className="w-full flex items-center justify-center">
                          {loader && hideDeleteIcons ? (
                            <PuffLoader
                              color={"#007DCA"}
                              size={80}
                              loading={true}
                            />
                          ) : (
                            <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                              <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                <FaCheck size={30} color="#009B17" />
                              </span>
                              <span className="text-base not-italic font-AeonikProMedium">
                                {SuccessMessage}
                              </span>
                            </div>
                          )}
                        </div>
                      ) : state?.pictureBgView3 ? (
                        <img
                          src={state?.pictureBgView3}
                          alt="backImg"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <span className="leading-none text-[12px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                          {t("photo")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between  pt-2">
                      <label
                        htmlFor={"imagethree3"}
                        className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor  text-sm md:text-lg font-AeonikProMedium"
                      >
                        <input
                          className="hidden"
                          id={"imagethree3"}
                          type="file"
                          name="fileUpload3"
                          onChange={handleLocationImageThree}
                          accept=" image/*"
                        />
                        {state?.pictureBgView3
                          ? t("change_photo")
                          : t("upload_a_photo")}
                      </label>
                      {state?.pictureBgView3 ? (
                        <button
                          onClick={() => onUserDeleteBackgroundImg3()}
                          className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-sm md:text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"
                        >
                          {t("delete")}
                        </button>
                      ) : (
                        <button
                          onClick={() => setBackImgUploadModal(false)}
                          className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-sm md:text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"
                        >
                          {t("cancel")}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="my-4 ">
              <div className="flex items-center justify-center mb-6">
                <div className="md:hidden absolute left-[16px]">
                  <BackBtn />
                </div>
                <div className="text-center text-lg md:text-[35px] font-AeonikProMedium  w-[75%] ll:w-fit md:px-0">
                  {t("edit_locations")}
                </div>
              </div>
              <div className=" px-4 md:px-0 w-full flex items-center justify-end md:justify-between mb-2 md:mb-3 md:pb-0 pb-[8px] md:border-0 border-b border-borderColor">
                <div className="hidden md:block">
                  <BackBtn />
                </div>
                <div className="flex items-center gap-x-[8px] xs:gap-x-[15px]">
                  <button
                    onClick={() => setDeleteModal(true)}
                    // onClick={onLocaTionDelete}
                    className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[13px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
                  >
                    {t("delete")}
                  </button>
                </div>
              </div>
              {/* Location of Maps edit page */}
              <div className="h-[400px]">
                <div className={`w-full `}>
                  <div className={"mapRoot"}>
                    <YMaps
                      query={{
                        apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21",
                        lang: "uz",
                      }}
                    >
                      <Map
                        className={` overflow-hidden w-full h-full`}
                        {...mapOptions}
                        state={{
                          center: forMaps?.center,
                          zoom: forMaps?.zoom,
                          title: forMaps?.title,
                        }}
                        // defaultState={forMaps}
                        onLoad={setMapConstructor}
                        onBoundsChange={handleBoundsChange}
                        instanceRef={mapRef}
                      >
                        <div className="h-fit p-1 md:p-[10px] absolute top-2 z-40 gap-x-5 mx-1 md:mx-2 backdrop-blur-sm bg-yandexNavbar left-0 right-0 flex items-center justify-between border px-1 md:px-3 rounded-lg">
                          <label
                            htmlFor="ForSearch"
                            className="w-[100%] h-full flex items-center justify-between bg-white  border border-textLightColor px-1 md:px-3 rounded-lg"
                          >
                            <input
                              ref={searchRef}
                              placeholder={t("enter_address")}
                              id="ForSearch"
                              name="search"
                              className={`w-full outline-none text-sm font-AeonikProMedium mr-3 h-10  rounded-lg ${!Boolean(forMaps?.title?.length) ? "" : "hidden"
                                }`}
                            />

                            <div
                              className={clsx(["titleBox"], {
                                ["titleBox_show"]: Boolean(
                                  forMaps?.title?.length
                                ),
                              })}
                            >
                              <p className=" w-[90%] "> {forMaps?.title} </p>
                            </div>

                            {forMaps?.title?.length ? (
                              <button
                                onClick={handleReset}
                                className="cursor-pointer flex items-center h-10 justify-center "
                              >
                                <GrClose className="pointer-events-none" />
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="cursor-pointer flex items-center h-10 justify-center "
                              >
                                <SearchIcon />
                              </button>
                            )}
                          </label>
                          {forMaps?.title?.length ? (
                            <button
                              type="button"
                              className="w-[40px] md:w-[150px] h-10 border cursor-pointer active:scale-95 px-3  flex items-center justify-center bg-textBlueColor text-white rounded-lg text-sm font-AeonikProMedium"
                              onClick={handleSubmit}
                              disabled={Boolean(!forMaps.title.length)}
                            >
                              {isSendedLocation ? (
                                <>
                                  {" "}
                                  <span className="md:flex hidden md:text-[16px]">
                                    {t("confirm")}
                                  </span>
                                  <span className="md:hidden flex">OK</span>
                                </>
                              ) : (
                                <span>
                                  <BiCheckDouble size={30} />
                                </span>
                              )}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="w-[40px] md:w-[150px] h-10 px-3  flex items-center justify-center bg-borderColor text-textLightColor rounded-lg text-sm font-AeonikProMedium"
                            >
                              <span className="md:flex hidden">
                                {t("confirm")}
                              </span>
                              <span className="md:hidden flex">OK</span>{" "}
                            </button>
                          )}
                        </div>
                        <span className={"placemark"}>
                          <MapLocationIcon color="primary" />
                        </span>
                        <ZoomControl
                          options={{
                            float: "right",
                            position: { bottom: 200, right: 10, size: "small" },
                            size: "small",
                          }}
                        />{" "}
                        <GeolocationControl
                          options={{
                            float: "right",
                            position: { bottom: 60, right: 10 },
                            size: "small",
                          }}
                        />
                      </Map>
                    </YMaps>
                  </div>
                </div>
              </div>
              <div className=" px-4 md:px-0  flex mt-[10px] justify-between items-centers gap-x-[5px] ls:gap-x-[10px] md:gap-[80px] mb-[25px] ">
                <div className=" w-full md:w-[31%]  h-[75px] md:h-[150px] flex items-center justify-center rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setBackImgOrder(1);
                      setBackImgUploadModal(true);
                    }}
                    className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center "
                  >
                    {state?.pictureBgView1 ? (
                      <img
                        src={state?.pictureBgView1}
                        alt="backImg"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="leading-none  text-[11px] xs:text-[12px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                        {t("photo_location")}
                      </span>
                    )}
                  </button>
                </div>
                <div className=" w-full md:w-[31%]  h-[75px] md:h-[150px] flex items-center justify-center rounded-lg">
                  {state?.pictureBgView1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setBackImgOrder(2);
                        setBackImgUploadModal(true);
                      }}
                      className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center"
                    >
                      {pictureView2 ? (
                        <img
                          src={pictureView2}
                          alt="backImg"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="leading-none text-[11px] xs:text-[12px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                          {t("photo_location")}
                        </span>
                      )}
                    </button>
                  ) : (
                    <div className="h-full w-full text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-[#b5b5b5] ">
                      <span className="leading-none text-[11px] flex md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-[#b5b5b5] text-[#b5b5b5]">
                        {t("photo_location")}
                      </span>
                    </div>
                  )}
                </div>
                <div className=" w-full md:w-[31%]  h-[75px] md:h-[150px] flex items-center justify-center rounded-lg">
                  {pictureView2 ? (
                    <button
                      onClick={() => {
                        setBackImgOrder(3);
                        setBackImgUploadModal(true);
                      }}
                      type="button"
                      className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center "
                    >
                      {state?.pictureBgView3 ? (
                        <img
                          src={state?.pictureBgView3}
                          alt="backImg"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="leading-none text-[11px] xs:text-[12px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                          {t("photo_location")}
                        </span>
                      )}
                    </button>
                  ) : (
                    <div className="h-full border rounded-lg  w-full text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-[#b5b5b5] ">
                      <span className="leading-none text-[11px] flex md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-[#b5b5b5] text-[#b5b5b5]">
                        {t("photo_location")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full  px-4 md:px-0  ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4  ">
                  <div className="w-full  md:hidden block">
                    <div className="w-full h-fit flex justify-center ">
                      {/* Region INput  */}
                      <div className={"w-full "}>
                        <label htmlFor="selectRegion">
                          <span className="flex items-center text-[#303030] text-[13px] md:text-base not-italic font-AeonikProMedium leading-4 tracking-[0,16px] ">
                            {t("choose_region")}{" "}
                            <span className="ml-[5px]">
                              <StarLabel />
                            </span>
                          </span>
                          <div
                            onClick={() => setOpenRegionModal(true)}
                            className="w-full h-[38px] md:h-11 mt-[6px] md:mt-[10px] px-[15px] flex items-center justify-between rounded md:rounded-lg cursor-pointer border border-searchBgColor"
                          >
                            <span className=" w-full h-[38px] md:h-11 flex items-center not-italic font-AeonikProRegular text-[#B5B5B5] text-[13px] md:text-base leading-4 ">
                              {!state?.idRegionId &&
                                !state?.idSupRregionId &&
                                `${t("choose_region")}`}

                              {regionList?.regions
                                ?.filter((e) => e.id == state?.idRegionId)
                                .map((item, index) => {
                                  return (
                                    <span
                                      key={index}
                                      className="flex items-center text-[#000] text-[13px] md:text-base font-AeonikProRegular"
                                    >
                                      {languageDetector?.typeLang === "ru" &&
                                        item?.name_ru}
                                      {languageDetector?.typeLang === "uz" &&
                                        item?.name_uz}
                                      ,
                                      {item?.sub_regions
                                        ?.filter(
                                          (i) => i.id == state?.idSupRregionId
                                        )
                                        .map((data, index) => {
                                          return (
                                            <span
                                              key={index}
                                              className="ml-1 font-AeonikProRegular"
                                            >
                                              {languageDetector?.typeLang ===
                                                "ru" && data?.name_ru}
                                              {languageDetector?.typeLang ===
                                                "uz" && data?.name_uz}
                                            </span>
                                          );
                                        })}
                                    </span>
                                  );
                                })}
                            </span>
                            <span className="rotate-[180deg]">
                              <ArrowTopIcons colors={"#a1a1a1"} />
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <label htmlFor="fname" className="w-full    ">
                    <p className="w-full text-[13px] font-AeonikProMedium md:text-base flex items-center mb-[2px] md:mb-[10px]">
                      {t("name_admin")}{" "}
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center border border-borderColor h-[38px] md:h-[45px] rounded md:rounded-lg w-full md:max-w-[287px] text-base font-AeonikProMedium">
                      <input
                        type="text"
                        name="fname"
                        value={state?.idAssistantName || ""}
                        onChange={handleInputAdminNameFirst}
                        placeholder={t("name_admin")}
                        className="w-full outline-none text-[13px] md:text-[16px] font-AeonikProRegular px-2"
                      />
                    </div>
                  </label>
                  <label htmlFor="fname1" className="w-full   ">
                    <p className="w-full text-[13px] md:text-base font-AeonikProMedium flex items-center mb-[10px]">
                      {t("name_admin_two")}
                    </p>
                    <div className="w-full flex items-center border border-borderColor h-[38px] md:h-[45px] rounded md:rounded-lg md:max-w-[287px]   text-base font-AeonikProMedium">
                      <input
                        type="text"
                        name="fname2"
                        value={state?.idSecondAssistantName || ""}
                        onChange={handleInputAdminNameSecond}
                        placeholder={t("name_admin_two")}
                        className="w-full outline-none text-[13px] md:text-[16px] font-AeonikProRegular px-2 placeholder-text-[12px] placeholder-font-AeonikProRegular"
                      />
                    </div>
                  </label>
                  <div className="w-full  hidden md:block">
                    <div className="w-full h-fit flex justify-center ">
                      {/* Region INput  */}
                      <div className={"w-full hidden md:block"}>
                        <label htmlFor="selectRegion">
                          <span className="flex items-center text-[#303030] text-[13px] md:text-base not-italic font-AeonikProMedium leading-4 tracking-[0,16px] ">
                            {t("choose_region")}
                          </span>
                          <div
                            onClick={() => setOpenRegionModal(true)}
                            className="w-full h-[38px] md:h-11 mt-[6px] md:mt-[10px] px-[15px] flex items-center justify-between rounded md:rounded-lg cursor-pointer border border-searchBgColor"
                          >
                            <span className=" w-full h-[38px] md:h-11 flex items-center not-italic font-AeonikProRegular text-[#B5B5B5] text-[13px] md:text-base leading-4 ">
                              {!state?.idRegionId &&
                                !state?.idSupRregionId &&
                                `${t("choose_region")}`}

                              {regionList?.regions
                                ?.filter((e) => e.id == state?.idRegionId)
                                .map((item, index) => {
                                  return (
                                    <span
                                      key={index}
                                      className="flex items-center text-[#000] text-[13px] md:text-base font-AeonikProRegular"
                                    >
                                      {languageDetector?.typeLang === "ru" &&
                                        item?.name_ru}
                                      {languageDetector?.typeLang === "uz" &&
                                        item?.name_uz}
                                      ,
                                      {item?.sub_regions
                                        ?.filter(
                                          (i) => i.id == state?.idSupRregionId
                                        )
                                        .map((data, index) => {
                                          return (
                                            <span
                                              key={index}
                                              className="ml-1 font-AeonikProRegular"
                                            >
                                              {languageDetector?.typeLang ===
                                                "ru" && data?.name_ru}
                                              {languageDetector?.typeLang ===
                                                "uz" && data?.name_uz}
                                            </span>
                                          );
                                        })}
                                    </span>
                                  );
                                })}
                            </span>
                            <span className="rotate-[180deg]">
                              <ArrowTopIcons colors={"#a1a1a1"} />
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <label htmlFor="phone1" className="w-full ">
                    <div className="text-[13px] md:text-base font-AeonikProMedium flex items-center mb-[10px]">
                      {t("number_admin")}
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="mt-[6px] h-[38px] md:h-11 flex items-center justify-center overflow-hidden border border-searchBgColor rounded md:rounded-lg">
                      <div className="ss:w-[35%] md:w-[30%] h-[38px] md:h-11 flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                        <div className="w-[40px] flex items-center outline-none h-full select-none mx-2 not-italic font-AeonikProRegular text-[13px] md:text-base leading-4 text-black">
                          {" "}
                          {state?.idAssistantPhoneCode}
                        </div>
                      </div>
                      <div className="w-[65%] md:w-[70%] h-[42px] overflow-hidden font-AeonikProRegular">
                        <InputMask
                          mask="(99) 999-99-99"
                          name="phone"
                          value={state?.idAssistantPhone || ""}
                          onChange={(e) =>
                            setState({
                              ...state,
                              idAssistantPhone: e.target.value,
                            })
                          }
                          className={`w-full px-4 outline-none font-AeonikProRegular h-full not-italic ${state?.idAssistantPhone
                            ? "font-AeonikProMedium"
                            : null
                            } text-[13px] md:text-base leading-4 text-black font-AeonikProRegular`}
                          placeholder={"(99) 999-99-99"}
                        ></InputMask>
                      </div>
                    </div>
                  </label>
                  <label htmlFor="phone2" className="w-full ">
                    <div className="text-[13px] md:text-base font-AeonikProMedium flex items-center mb-[10px]">
                      {t("number_admin")}
                      <span className="ml-[5px]">{/* <StarLabel /> */}</span>
                    </div>

                    <div className="mt-[6px] flex items-center justify-center overflow-hidden border border-searchBgColor rounded md:rounded-lg h-[38px] md:h-11">
                      <div className="w-[35%] md:w-[30%] flex items-center justify-center cursor-pointer border-r border-searchBgColor overflow-hidden">
                        <div className="w-[40px] flex items-center outline-none h-full select-none mx-2 not-italic font-AeonikProRegular leading-4 text-black text-[13px] md:text-base">
                          {" "}
                          {state?.idAssistantPhoneCode}
                        </div>
                      </div>
                      <div className="w-[65%] md:w-[70%] h-[38px] md:h-11 overflow-hidden">
                        <InputMask
                          mask="(99) 999-99-99"
                          name="phone2"
                          value={state?.idSecondAssistantPhone || ""}
                          onChange={(e) =>
                            setState({
                              ...state,
                              idSecondAssistantPhone: e.target.value,
                            })
                          }
                          className={`w-full px-4 outline-none font-AeonikProRegular h-full not-italic ${state?.idSecondAssistantPhone
                            ? "font-AeonikProMedium"
                            : null
                            } text-[13px] md:text-base leading-4 text-black`}
                          placeholder={"(99) 999-99-99"}
                        ></InputMask>
                      </div>
                    </div>
                  </label>
                  <div className="w-full ">
                    <div className="text-[13px] md:text-base font-AeonikProMedium flex items-center   mb-[10px]">
                      {t("work_time")}
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="w-full flex  items-center">
                      {" "}
                      <span className="w-fit text-[13px] md:text-base flex items-center font-AeonikProRegular">
                        {t("before")}
                      </span>
                      <input
                        className="without_ampm mr-5 ml-[5px]  outline-none w-[45%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-[38px] md:h-11  rounded-lg md:w-[80px] text-[13px] md:text-[14px] font-AeonikProRegular "
                        type="time"
                        min="00:00"
                        max="23:59"
                        name="startTime"
                        pattern="[0-2][0-9]:[0-5][0-9]"
                        value={state?.idWorkTimeFrom || ""}
                        onChange={(e) =>
                          setState({ ...state, idWorkTimeFrom: e.target.value })
                        }
                        required
                      />
                      <span className="w-fit text-[13px] md:text-base flex items-center font-AeonikProRegular">
                        {t("after")}
                      </span>
                      <input
                        className="without_ampm mr-5 ml-[5px]  outline-none w-[45%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-[38px] md:h-11 rounded-lg md:w-[80px] text-[13px] md:text-[14px] font-AeonikProRegular "
                        type="time"
                        min="00:00"
                        max="23:59"
                        name="endTime"
                        pattern="[0-2][0-9]:[0-5][0-9]"
                        value={state?.idWorkTimeTo || ""}
                        onChange={(e) =>
                          setState({ ...state, idWorkTimeTo: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div htmlFor="telegrem1" className=" w-full    ">
                    <p className="text-[13px] md:text-base font-AeonikProMedium flex items-center mb-[10px]">
                      {t("number_admin_tg")}
                    </p>
                    <div className="relative flex flex-col items-center h-10  w-full text-base font-AeonikProMedium">
                      <input
                        type="text"
                        name="telegrem1"
                        placeholder={"@Username "}
                        value={state?.assistantNameFirstTg || ""}
                        onChange={handleInputAdminNameFirstTg}
                        className="w-full outline-none text-[13px] md:text-[14px] h-[38px] md:h-[42px] border border-borderColor rounded-lg font-AeonikProRegular px-2"
                      />
                      {!state?.assistantNameFirstTg && <p className="select-none  text-[#b5b5b5] flex items-center absolute right-2 z-[10]   h-full text-[14px] font-AeonikProRegular">
                        {t("not_necessary")}
                      </p>}
                    </div>
                  </div>
                  <div htmlFor="telegrem2" className=" w-full    ">
                    <p className="text-[13px] md:text-base font-AeonikProMedium flex items-center mb-[10px]">
                      {t("number_admin_tg_two")}
                    </p>
                    <div className="relative flex flex-col items-center h-10  w-full text-base font-AeonikProMedium">
                      <input
                        type="text"
                        name="telegrem2"
                        placeholder={"@Username"}
                        value={state?.assistantNameSecondTg || ""}
                        onChange={handleInputAdminNameSecondTg}
                        className="w-full outline-none text-[13px] md:text-[14px] h-[38px] md:h-[42px] border border-borderColor rounded-lg font-AeonikProRegular px-2"
                      />
                      {!state?.assistantNameSecondTg && <p className="select-none  text-[#b5b5b5] flex items-center absolute right-2 z-[10]   h-full text-[14px] font-AeonikProRegular">
                        {t("not_necessary")}
                      </p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-[50px]  px-4 md:px-0 ">
                <button
                  onClick={() => handleEditLocation()}
                  className="w-full md:w-fit h-[42px] flex items-center font-AeonikProMedium justify-center md:px-[100px]  bg-textBlueColor text-white rounded md:rounded-lg active:scale-95"
                >
                  {t("save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// export default LocationMapCity;
// export default React.memo(LocationMapCity);
