import React, { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import {
  ArrowTopIcons,
  CircleNextIcon,
  CreditCardNumber,
  DeleteIcon,
  DownArrowAntd,
  MenuCloseIcons,
  SuccessIconsForMail,
  UserMailIcon,
} from "../../../../assets/icons";
import "../../SellerAuthentication/SignUp/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileHumburgerMenu from "../../../Navbar/mobileHamburgerMenu/MobileMenu";
import EditPassword from "./EditPassword/EditPassword";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { dressMainData } from "../../../../hook/ContextTeam";
import axios from "axios";
import { SellerMainData } from "../../../../hook/SellerUserContext";
import { SellerRefresh } from "../../../../hook/SellerRefreshToken";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";
import { dressRegionList } from "../../../../hook/RegionList";
import LoadingForSeller from "../../../Loading/LoadingFor";
import axiosInstance from "../../AxiosIntance";
const { REACT_APP_BASE_URL } = process.env;

function EditProfilePage() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [sellerInformation, setSellerInformation] = useContext(SellerMainData);
  const [sellerRefreshToken] = useContext(SellerRefresh);

  const { t } = useTranslation("profil");
  const [languageDetector] = useContext(LanguageDetectorDress);
  const [regionList, setRegionList] = useContext(dressRegionList)

  const navigate = useNavigate();

  const [state, setState] = useState({
    sellerFname: "",
    sellerLname: "",
    sellerEmail: "",
    sellerCardNumber: "",
    sellerRegionId: "",
    sellerSubRegionId: "",
    sellerTypeId: "",
    sellerStatus: "",
    sellerPhoneCode: "+998",
    sellerPhoneNum: "",
    companyName: "",
    // -------------
    validateConfirm: true,
    eyesShow: true,
    requestPerson: true,
    // ------Regions Get -----
    getRegionList: "",
    // ------ Get Profile-----
    getProfileList: "",
    // ------ Get getSellerList-----
    getSellerList: "",
    // -----region Modal-----
    openModalRegions: false,
    // ----popConfirmDelete
    popConfirmDelete: false,
    sellerTypes: null,
    sellerUpdateInput: false,
    sellerUpdateEmail: false,
    sellerEmailModal: false,
    sellerEmailConfirm: false,

    sendingLoader: false,
    isCheckInput: false,
    statusModal: false
  });
  const [openEditModal, setOpenEditModal] = useState(false);

  // -------------------------------------
  const togglePassword = React.useCallback(() => setOpenEditModal(false), []);
  // -------------------------------------
  const url = "https://api.dressme.uz/api/seller";

  useEffect(() => {
    setState({
      ...state,
      sellerFname: sellerInformation?.name,
      sellerLname: sellerInformation?.surname,
      sellerEmail: sellerInformation?.email,
      sellerCardNumber: sellerInformation?.card_number,
      sellerRegionId: sellerInformation?.region_id,
      sellerSubRegionId: sellerInformation?.sub_region_id,
      sellerTypeId: sellerInformation?.seller_type_id,
      sellerTypes:
        sellerInformation?.seller_type_id >= 3
          ? "ENTITY"
          : "INDIVIDUAL",
      companyName: sellerInformation?.company?.name,
      sellerStatus: sellerInformation?.status,
      sellerPhoneNum:
        sellerInformation?.phone &&
        sellerInformation?.phone.slice(4, 13),
    });
  }, [sellerInformation]);

  // ------------GET METHOD Region-----------------

  const fetchDataRegion = async (customHeadersRegion) => {
    try {
      const response = await axios.get(`${url}/regions`, {
        headers: customHeadersRegion,
      });
      const status = response.status;
      const data = response.data;

      return { data, status };
    } catch (error) {
      const status = error.response ? error.response.status : null;
      return { error, status };
    }
  };

  const customHeadersRegion = {
    "Content-type": "application/json; charset=UTF-8",
    'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`, // Add other headers as needed
  };
  useQuery(["get_regionInProfile"], () => fetchDataRegion(customHeadersRegion), {
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
  const { refetch, isLoading } = useQuery(["get_profile_list2"], () => fetchData(customHeaders), {
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

  // -----------------------Seller Delete---------------
  const { mutate } = useMutation(() => {
    return fetch(`${url}/delete`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
        "Accept-Language": languageDetector?.typeLang,

      },
    }).then((res) => res.json());
  });

  const onUserDelete = () => {
    mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message) {
            localStorage.removeItem('RefreshUserToken')
            localStorage.removeItem('DressmeUserToken')
            navigate("/signup-seller");
            window.location.reload();
            setState({ ...state, popConfirmDelete: false });
            toast.warn(`${res?.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        },
        onError: (err) => {
          throw new Error(err || "something wrong");
        },
      }
    );
  };

  const [activeIndex, setActiveIndex] = useState();
  const accordionCityList = (id) => {
    if (activeIndex == id) {
      setActiveIndex(0);
    } else {
      setActiveIndex(id);
    }
  };

  const assistantPhoneNumberFirst =
    state.sellerPhoneCode +
    state?.sellerPhoneNum
      ?.split("-")
      ?.join("")
      ?.split(")")
      ?.join("")
      ?.split("(")
      ?.join("")
      ?.split(" ")
      ?.join("");
  const card1 = state?.sellerCardNumber?.split("-");
  const BankCard = card1?.join("");

  const UpdateSeller = () => {
    setState({ ...state, isCheckInput: true });
    if (
      state?.sellerTypes === "ENTITY" &&
      state?.companyName &&
      state?.sellerTypeId >= 3
    ) {
      setState({ ...state, sendingLoader: true });
      let form = new FormData();
      form.append("name", state?.sellerFname);
      form.append("surname", state?.sellerLname);
      sellerInformation?.phone !== assistantPhoneNumberFirst && form.append("phone", assistantPhoneNumberFirst);
      sellerInformation?.card_number !== BankCard && form.append("card_number", BankCard);
      form.append("seller_type_id", state?.sellerTypeId);
      state?.companyName && form.append("company_name", state?.companyName);
      form.append("region_id", state?.sellerRegionId);
      form.append("sub_region_id", state?.sellerSubRegionId);

      return fetch(`${url}/update-seller-info`, {
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
            setState({
              ...state,
              sendingLoader: false,
              isCheckInput: false,
              sellerUpdateInput: false,
            });
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
            setState({
              ...state,
              sendingLoader: false,
              isCheckInput: false,
              sellerUpdateInput: false,
            });
          }
        })
        .catch((err) => {
          setState({
            ...state,
            sendingLoader: false,
            isCheckInput: false,
            sellerUpdateInput: false,
          });
          toast.error(`${err}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
    if (state?.sellerTypes === "INDIVIDUAL" && state?.sellerTypeId < 3) {
      setState({ ...state, sendingLoader: true });
      let form = new FormData();
      form.append("name", state?.sellerFname);
      form.append("surname", state?.sellerLname);
      sellerInformation?.phone !== assistantPhoneNumberFirst && form.append("phone", assistantPhoneNumberFirst);
      sellerInformation?.card_number !== BankCard && form.append("card_number", BankCard);
      form.append("seller_type_id", state?.sellerTypeId);
      form.append("region_id", state?.sellerRegionId);
      form.append("sub_region_id", state?.sellerSubRegionId);
      return fetch(`${url}/update-seller-info`, {
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
            setState({
              ...state,
              sendingLoader: false,
              isCheckInput: false,
              sellerUpdateInput: false,
            });
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
            setState({
              ...state,
              sendingLoader: false,
              isCheckInput: false,
              sellerUpdateInput: false,
            });
          }
        })
        .catch((err) => {
          setState({
            ...state,
            sendingLoader: false,
            isCheckInput: false,
            sellerUpdateInput: false,
          });
          toast.error(`${err}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

  const dataMutateEmail = useMutation(() => {
    return fetch(`${url}/update-seller-email`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": languageDetector?.typeLang,
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
      body: JSON.stringify({ email: state?.sellerEmail }),
    }).then((res) => res.json());
  });
  const UpdateEmailSeller = () => {
    setState({ ...state, sendingLoader: true });
    dataMutateEmail.mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message && res?.errors) {
            setState({
              ...state,
              sendingLoader: false,
              sellerUpdateEmail: false,
            });
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
            setState({
              ...state,
              sendingLoader: false,
              sellerUpdateEmail: false,
              sellerEmailModal: false,
              sellerEmailConfirm: true,
            });
          }
        },
        onError: (err) => {
          setState({
            ...state,
            sendingLoader: false,
            sellerUpdateEmail: false,
          });
          toast.error(`${err}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      }
    );
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    // document.title = "Pедактировать профиль";
  }, []);
  //  pending
  return (
    <div className="w-full h-fit md:h-[100vh]  flex flex-col gap-y-4 md:gap-y-[40px] items-center justify-center px-4 md:px-0">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-full flex items-center justify-start md:hidden mt-4">
        <span>
          {" "}
          <MobileHumburgerMenu />
        </span>{" "}
      </div>{" "}
      <div
        onClick={() => {
          setOpenEditModal(false);
          setState({
            ...state,
            popConfirmDelete: false,
            openModalRegions: false,
            sellerEmailConfirm: false,
            sellerEmailModal: false,
            statusModal: false
          });
          setDressInfo({ ...dressInfo, logOutSeller: false });
          // setState({...state, openModalRegions: false })
        }}
        className={`fixed inset-0 z-[112] cursor-pointer duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.popConfirmDelete ||
            openEditModal ||
            state?.openModalRegions ||
            state?.sellerEmailModal ||
            state.statusModal

            ? ""
            : "hidden"
          }`}
      ></div>

      <div
        onClick={() => {
          navigate("/login-seller");
          setState({ ...state, sellerEmailConfirm: false });
        }}
        className={`fixed inset-0 z-[112] cursor-pointer duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.sellerEmailConfirm ? "" : "hidden"}`}
      ></div>
      {/* Confirm Email Confirm Modal */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.sellerEmailConfirm
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <div className="flex items-center w-full justify-end">
          <button
            type="button"
            className="select-none  cursor-pointer"
            onClick={() => {
              navigate("/login-seller");
              setState({ ...state, sellerEmailConfirm: false });
            }}
          >
            <MenuCloseIcons colors="#a1a1a1" />
          </button>
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          <button className="flex p-4 items-center justify-center rounded-full mt-4 bg-[#D8EDFF]">
            <SuccessIconsForMail />
          </button>
          <p className="text-[#1F1F1F] text-3xl not-italic font-AeonikProMedium mt-5">
            {t("emailSent")}
          </p>
          <p className="text-[#8B8B8B] text-xl not-italic font-AeonikProRegular mt-[30px]">
            {t("checkEmail")}
          </p>
        </div>
      </section>
      {/* Confirm Email Update */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.sellerEmailModal
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <div className="flex items-center w-full justify-end">
          <button
            type="button"
            className="select-none  cursor-pointer"
            onClick={() => setState({ ...state, sellerEmailModal: false })}
          >
            <MenuCloseIcons colors="#a1a1a1" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
          <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
            {t("areYouSure")}
          </span>
          <span className=" text-[#a2a2a2] text-base xs:text-lg not-italic font-AeonikProMedium text-center">
            {t("updeteText")}
          </span>
        </div>
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
          <button
            onClick={() => setState({ ...state, sellerEmailModal: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[38px] md:h-[48px] px-4  text-center text-base not-italic font-AeonikProMedium"
          >
            {t("cancel")}
          </button>
          {state?.sendingLoader ? (
            <button
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-white bg-textBlueColor  h-[38px] md:h-[48px] px-4  text-center text-base not-italic font-AeonikProMedium"
            >
              <ClipLoader
                className="h-full py-[2px]"
                color={"#fff"}
                size={40}
                loading={true}
              />
            </button>
          ) : (
            <button
              onClick={() => UpdateEmailSeller()}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-white bg-textBlueColor  h-[38px] md:h-[48px] px-4  text-center text-base not-italic font-AeonikProMedium"
            >
              {t("update")}
            </button>
          )}
        </div>
      </section>
      {/* Delete Account Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.popConfirmDelete
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            className="select-none  cursor-pointer"
            onClick={() => setState({ ...state, popConfirmDelete: false })}
          >
            <MenuCloseIcons colors="#a1a1a1" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
          <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
            <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
              <DeleteIcon width={30} />
            </span>
          </span>
          <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
            {t("areYouSure")}
          </span>
          <span className=" text-[#a2a2a2] text-base xs:text-lg not-italic font-AeonikProMedium text-center">
            {t("deleteText")}
          </span>
        </div>
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
          <button
            onClick={() => setState({ ...state, popConfirmDelete: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[38px] md:h-[48px] px-4  text-center text-base not-italic font-AeonikProMedium"
          >
            {t("cancel")}
          </button>
          <button
            onClick={onUserDelete}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[38px] md:h-[48px] px-4  text-center text-base not-italic font-AeonikProMedium"
          >
            {t("dell")}
          </button>
        </div>
      </section>
      {/* ---password change----- */}
      <section
        className={`fixed  max-w-[440px] md:max-w-[550px] mx-auto w-full md:w-auto z-[113] bottom-0 md:bottom-auto  duration-300 overflow-hidden ${openEditModal ? "" : "hidden z-0"
          }`}
      >
        <EditPassword onClick={togglePassword} />
      </section>
      {
        state?.sellerStatus === "pending" && (
          <div className="max-w-[800px] w-full  text-center flex items-center md:justify-center">
            <span className="text-black text-[16px] md:text-3xl not-italic md:font-AeonikProMedium  font-AeonikProRegular tracking-[1px]">
              {t("soonText")}
            </span>
          </div>
        )
      }

      {
        isLoading ? <LoadingForSeller /> :
          <div className="max-w-[800px] w-full h-fit flex flex-col gap-y-4 ">
            <div className="flex items-center gap-x-4  md:px-[30px]  ">
              <div>
                <p className="w-fit h-full flex items-center  text-[#3F6175] text-base  not-italic font-AeonikProMedium justify-center    ">
                  {t("status")}:
                </p>
              </div>
              {sellerInformation?.status ===
                "approved" && (
                  <p className="w-[120px] h-fit  flex items-center justify-center   ">
                    <span className="min-w-[110px] text-center text-[#4FB459] bg-bgApproved text-[14px] md:text-base font-AeonikProRegular py-[3px]  rounded-full ">
                      {t("approved")}
                    </span>
                  </p>
                )}
              {sellerInformation?.status ===
                "declined" && (
                  <p
                    className="w-[120px] h-fit   flex items-center  justify-center  "
                  >
                    <span className="min-w-[110px] text-center text-[#FF4A4A] bg-bgDecline text-[14px] md:text-base font-AeonikProRegular py-[3px]  rounded-full">
                      {t("declined")}
                    </span>
                  </p>
                )}
              {sellerInformation?.status ===
                "pending" && (
                  <p className="w-[120px] h-fit  flex items-center justify-center   ">
                    <span className="min-w-[110px] text-center text-[#F1B416] bg-bgPending text-[14px] md:text-base font-AeonikProRegular py-[3px]  rounded-full ">
                      {t("pending")}
                    </span>
                  </p>
                )}
              {sellerInformation?.status ===
                "updated" && (
                  <p className="w-[120px] h-fit  flex items-center justify-center     ">
                    <span className="min-w-[110px] text-center text-[#007DCA] bg-bgUpdate text-[14px] md:text-base font-AeonikProRegular py-[3px]  rounded-full ">
                      {t("updated")}
                    </span>
                  </p>
                )}
            </div>
            {sellerInformation?.status ===
              "declined" && <div className="w-full   md:px-[30px] gap-x-4 flex  items-center ">
                <p className="w-fit h-full flex items-center  text-[#3F6175] text-[14px] md:text-base  not-italic font-AeonikProMedium justify-center    ">
                  {t("Pcause")}:
                </p>
                <p className="text-[13px] md:text-[14px]   not-italic font-AeonikProMedium">{sellerInformation?.status_reason}</p>
              </div>}
            <div className="max-w-[800px] w-full h-fit border border-lightBorderColor flex flex-col gap-y-6 rounded-[12px] p-4 md:p-[30px]  ">
              {/* title */}
              <div className="w-full flex items-center justify-between ">
                <span className="text-black text-[20px] md:text-2xl not-italic font-AeonikProMedium leading-6">
                  {t("myInfo")}
                </span>
                <button
                  onClick={() => setState({ ...state, popConfirmDelete: true })}
                  className="h-5 flex items-center text-[14px] xs:text-base not-italic font-AeonikProRegular leading-5"
                >
                  {/* <VerticalMenuIcons className="h-full" /> */}
                  <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                    <DeleteIcon width={30} />
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 w-full h-fit ">
                {/* Name */}
                <div className="w-full h-fit ">
                  <div className="not-italic font-AeonikProRegular text-sm md:text-base leading-4 text-black  tracking-[0,16px] ">
                    {t("name")}
                  </div>
                  <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
                    <input
                      className=" outline-none	text-[12px] xs:text-[14px] md:text-base w-full h-[38px] md:h-[48px] placeholder-not-italic placeholder-font-AeonikProMedium md:placeholder-text-base placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
                      type="text"
                      name="fname"
                      placeholder={t("name")}
                      value={state?.sellerFname || ""}
                      onChange={(e) =>
                        setState({
                          ...state,
                          sellerFname: e.target.value,
                          sellerUpdateInput: true,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                {/*  surname */}
                <div className="w-full h-fit ">
                  <div className="not-italic font-AeonikProRegular text-sm md:text-base leading-4 text-black  tracking-[0,16px] ">
                    {t("surname")}
                  </div>
                  <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
                    <input
                      className=" outline-none	text-[12px] xs:text-[14px] md:text-base w-full h-[38px] md:h-[48px] placeholder-not-italic placeholder-font-AeonikProMedium md:placeholder-text-base placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
                      type="text"
                      name="lname"
                      placeholder={t("surname")}
                      value={state?.sellerLname || ""}
                      onChange={(e) =>
                        setState({
                          ...state,
                          sellerLname: e.target.value,
                          sellerUpdateInput: true,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                {/* Mail */}
                <div className="w-full h-fit  ">
                  <div className=" flex items-center justify-between w-full">
                    <div className="not-italic font-AeonikProRegular text-sm md:text-base leading-4 text-black  tracking-[0,16px] ">
                      {t("email")}
                    </div>
                    {state?.sellerUpdateEmail ? (
                      <button
                        type="button"
                        onClick={() => setState({ ...state, sellerEmailModal: true })}
                        className={
                          " text-textBlueColor not-italic font-AeonikProRegular text-sm leading-4  tracking-[0,16px] hover:underline"
                        }
                      >
                        {t("updateEmail")}
                      </button>
                    ) : (
                      <span
                        className={
                          " text-[#b5b5b5] not-italic font-AeonikProRegular text-sm leading-4   tracking-[0,16px] "
                        }
                      >
                        {t("updateEmail")}
                      </span>
                    )}
                  </div>
                  <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
                    <input
                      className=" outline-none	text-[12px] xs:text-[14px] md:text-base w-full h-[38px] md:h-[48px] placeholder-not-italic placeholder-font-AeonikProMedium md:placeholder-text-base placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
                      type="email"
                      name="email"
                      placeholder={t("emailPlaceholder")}
                      value={state?.sellerEmail || ""}
                      onChange={(e) =>
                        setState({
                          ...state,
                          sellerEmail: e.target.value,
                          sellerUpdateEmail: true,
                        })
                      }
                      required
                    />
                    <span>
                      <UserMailIcon />
                    </span>{" "}
                  </div>
                </div>
                {/* Номер */}
                <div className="w-full h-fit ">
                  <div className="not-italic font-AeonikProRegular text-sm md:text-base leading-4 text-black  tracking-[0,16px] ">
                    {t("phone")}
                  </div>
                  <div className="mt-[6px] flex items-center justify-center overflow-hidden border border-searchBgColor rounded-lg">
                    <div className="ss:w-[35%] md:w-[30%] box-border	 h-[38px] md:h-[48px] flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                      <span className="w-[40px] outline-none flex items-center h-[38px] md:h-[48px] select-none  not-italic font-AeonikProRegular text-[12px] xs:text-[14px] md:text-base leading-4 text-black">
                        {state?.sellerPhoneCode}
                      </span>
                    </div>
                    <div className="ss:w-[65%] md:w-[70%] h-[38px] md:h-[48px] overflow-hidden">
                      <InputMask
                        mask="(99) 999-99-99"
                        name="phone"
                        value={state?.sellerPhoneNum || ""}
                        onChange={(e) =>
                          setState({
                            ...state,
                            sellerPhoneNum: e.target.value,
                            sellerUpdateInput: true,
                          })
                        }
                        className={`w-full px-4 outline-none font-AeonikProRegular h-full not-italic ${state?.sellerPhoneNum ? "font-AeonikProMedium" : null
                          } text-[12px] xs:text-[14px] md:text-base leading-4 text-black`}
                        placeholder={"(99) 999-99-99"}
                      ></InputMask>
                    </div>
                  </div>
                </div>
                {/* Выберите регион, */}
                <div className="w-full h-fit flex justify-center ">
                  <div
                    className={`max-w-[440px] w-full md:max-w-[600px] h-fit fixed    px-3 md:px-6  py-2 md:py-4 bg-white rounded-b-none md:rounded-b-lg	 rounded-t-lg  mx-auto w-full duration-500 z-[113] md:top-[50%] left-1/2 right-1/2 translate-x-[-50%] md:translate-y-[-50%] overflow-hidden ${state?.openModalRegions
                      ? " bottom-0 md:flex flex-col"
                      : "md:hidden bottom-[-1500px] z-[-10]"
                      }`}
                  >
                    <div className="w-full flex items-center justify-between  ">
                      <span className="text-black text-base   md:text-2xl not-italic font-AeonikProMedium">
                        {t("selectRegion")}
                      </span>
                      <button
                        type="button"
                        className="select-none  cursor-pointer"
                        onClick={() => {
                          setState({ ...state, openModalRegions: false });
                        }}
                      >
                        <MenuCloseIcons colors="#a1a1a1" />
                      </button>
                    </div>

                    <div className="w-full overflow-auto  flex flex-col gap-y-4 pt-3  overflow-x-hidden mt-3 h-[50vh] md:h-[60vh] VerticelScroll pr-2 ">
                      {regionList?.regions ? (
                        regionList?.regions?.map((data, index) => {
                          return (
                            <div key={data?.id} className={`w-full  h-fit  flex flex-col items-center ${data?.id === 2 ? "" : "opacity-50"}`}>
                              <div
                                onClick={data?.id === 2
                                  ? () => {
                                    accordionCityList(data?.id);
                                  }
                                  : null} className="w-full cursor-pointer flex items-center pr-1 justify-between border-b border-[#F0F0F0] "
                              >
                                <span className="text-[#303030] text-[14px] md:text-lg not-italic font-AeonikProRegular">
                                  {languageDetector?.typeLang === "ru" && data?.name_ru}
                                  {languageDetector?.typeLang === "uz" && data?.name_uz}
                                </span>
                                <span
                                  className={`${Number(activeIndex) === Number(data?.id)
                                    ? "rotate-[0deg]"
                                    : "rotate-[180deg]"
                                    } `}
                                >
                                  <ArrowTopIcons colors={"#a1a1a1"} />
                                </span>
                              </div>

                              <div
                                className={`w-full grid grid-cols-2 xs:grid-cols-3 duration-[400ms]
                             ${Number(activeIndex) === Number(data?.id)
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
                                        htmlFor={item?.name_uz}
                                        className="flex items-center gap-x-[6px]"
                                      >
                                        <input
                                          type="radio"
                                          id={item?.name_uz}
                                          name="type_work"
                                          value={item?.region_id || ""}
                                          checked={
                                            Number(state?.sellerSubRegionId) ===
                                            Number(item?.id)
                                          }
                                          className="border border-borderColor  cursor-pointer  flex items-center justify-center"
                                          onChange={(e) => {
                                            setState({
                                              ...state,
                                              sellerRegionId: e.target.value,
                                              sellerSubRegionId: item?.id,
                                              sellerUpdateInput: true,
                                            });
                                          }}
                                          required
                                        />
                                        <span className="text-[#303030]  cursor-pointer text-[13px] md:text-[15px]   not-italic font-AeonikProRegular">
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
                        <p className="w-full h-full flex flex-col items-center justify-center">
                          {t("loading")}
                        </p>
                      )}
                    </div>
                    <div className="w-full flex items-center justify-end  mt-2">
                      <span
                        onClick={() => {
                          setState({ ...state, openModalRegions: false });
                        }}
                        className="cursor-pointer text-textBlueColor text-base md:text-lg not-italic font-AeonikProMedium"
                      >
                        {t("ready")}
                      </span>
                    </div>
                  </div>

                  {/* Region INput  */}
                  <div className={"w-full"}>
                    <label htmlFor="selectRegion1">
                      <span className="flex items-center text-[#303030] text-sm md:text-base not-italic font-AeonikProRegular leading-4 tracking-[0,16px] ">
                        {t("selectRegion")}
                      </span>
                      <div
                        onClick={() => {
                          setState({ ...state, openModalRegions: true });
                        }}
                        className="w-full h-[38px] md:h-[48px] mt-[6px] px-[15px] flex items-center justify-between rounded-lg cursor-pointer border border-searchBgColor"
                      >
                        <span className=" w-full h-[38px] md:h-[48px] flex items-center not-italic font-AeonikProRegular text-[#B5B5B5] ll:text-[14px] sm:text-[16px] text-base leading-4 ">
                          {!state?.sellerRegionId &&
                            !state?.sellerSubRegionId &&
                            t("selectRegion")}
                          {state?.sellerRegionId && state?.sellerSubRegionId && (
                            <div className="flex items-center">
                              {regionList?.regions
                                ?.filter(
                                  (e) =>
                                    Number(e.id) === Number(state?.sellerRegionId)
                                )
                                .map((item) => {
                                  return (
                                    <div key={item?.name_uz} className="flex items-center text-[#000] text-[14px] md:text-base">
                                      {languageDetector?.typeLang === "ru" &&
                                        item?.name_ru}
                                      {languageDetector?.typeLang === "uz" &&
                                        item?.name_uz}
                                      ,
                                      {item?.sub_regions?.filter(e => Number(e?.id) === Number(state?.sellerSubRegionId))?.map((data) => {
                                         return (
                                          <span key={data?.id} className="ml-1 text-[14px] md:text-base ">
                                            {languageDetector?.typeLang === "ru" && data?.name_ru}
                                            {languageDetector?.typeLang === "uz" && data?.name_uz}
                                          </span>
                                        );
                                      })}
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                        </span>
                        <span className=" iconArrow ">
                          <DownArrowAntd colors={"#a1a1a1"} />
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                {/*  CardNumber */}
                <div className="w-full  h-fit   ">
                  <span className="flex items-center text-[#303030] text-sm md:text-base not-italic font-AeonikProRegular  leading-4 tracking-[0,16px] ">
                    {t("cardNumber")}
                  </span>
                  <div className="mt-[6px] gap-x-[10px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
                    {/* CredtCardicons */}
                    <span>
                      <CreditCardNumber />
                    </span>
                    <InputMask
                      value={state?.sellerCardNumber}
                      mask="9999-9999-9999-9999"
                      name="credit-card-number"
                      className="outline-none	  w-full h-[38px] md:h-[48px]  text-black  not-italic font-AeonikProRegular placeholder-text-[#B5B5B5] text-[12px] xs:text-[14px] md:text-base leading-4"
                      onChange={(e) =>
                        setState({
                          ...state,
                          sellerCardNumber: e.target.value,
                          sellerUpdateInput: true,
                        })
                      }
                      placeholder="0000-0000-0000-0000"
                    />
                  </div>
                </div>
                {/* Type */}
                <div className="w-full  md:pt-[3px]">
                  <div className="w-full justify-between flex ">
                    <span
                      onClick={() =>
                        setState({ ...state, sellerTypes: "INDIVIDUAL" })
                      }
                    >
                      <span
                        className={`${state?.sellerTypes === "INDIVIDUAL"
                          ? "text-fullBlue"
                          : "text-[#b5b5b5]"
                          } w-full justify-start cursor-pointer flex items-center text-[12px] md:text-sm not-italic font-AeonikProRegular  leading-4 tracking-[0,16px]`}
                      >
                        {t("individual")}
                      </span>
                    </span>
                    <span
                      onClick={() => setState({ ...state, sellerTypes: "ENTITY" })}
                    >
                      <span
                        className={`${state?.sellerTypes === "ENTITY"
                          ? "text-fullBlue"
                          : "text-[#b5b5b5]"
                          } w-full justify-start cursor-pointer flex items-center text-[12px] md:text-sm not-italic font-AeonikProRegular  leading-4 tracking-[0,16px] whitespace-nowrap	`}
                      >
                        {t("company")}
                      </span>
                    </span>
                  </div>

                  {state?.sellerTypes === "ENTITY" && (
                    <div className="w-full flex flex-col h-fit  mt-[6px] ">
                      {/* Имя организации */}
                      <div className="w-full h-fit  ">
                        <div
                          className={` w-full flex items-center  rounded-lg ${state?.isCheckInput && !state?.companyName
                            ? "border border-[#FFB8B8] "
                            : "border border-searchBgColor"
                            }`}
                        >
                          <input
                            className="outline-none  text-[14px] md:text-base px-[16px] rounded-lg w-full h-[38px] md:h-[48px] placeholder-not-italic placeholder-font-AeonikProMedium md:placeholder-text-base placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
                            type="text"
                            name="companyName"
                            placeholder={t("companyName")}
                            value={state?.companyName}
                            onChange={(e) =>
                              setState({
                                ...state,
                                companyName: e?.target?.value,
                                sellerUpdateInput: true,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {state?.sellerTypes === "INDIVIDUAL" && (
                    <div className="w-full flex items-center ">
                      <Select
                        className="h-[38px] md:h-[48px]  text-[14px] md:text-base z-[0] flex items-center rounded-lg w-full focus:border border-searchBgColor cursor-pointer"
                        placeholder={t("type")}
                        optionFilterProp="children"
                        onChange={(e) =>
                          setState({
                            ...state,
                            sellerTypeId: e,
                            sellerUpdateInput: true,
                          })
                        }
                        value={dressInfo?.typeList?.individual
                          ?.filter((e) => e?.id == state?.sellerTypeId)
                          ?.map((item) => {
                            return languageDetector?.typeLang === "ru"
                              ? item?.name_ru
                              : item?.name_uz;
                          })}
                        size="large"
                        options={dressInfo?.typeList?.individual?.map((item) => {
                          return {
                            value: item?.id,
                            label:
                              languageDetector?.typeLang === "ru"
                                ? item?.name_ru
                                : item?.name_uz,
                          };
                        })}
                      />
                    </div>
                  )}
                </div>
                {state?.sellerTypes === "ENTITY" &&
                  <div className={` w-full flex flex-col   `}>
                    <span className="w-full  box-border flex text-[#303030] text-sm md:text-base not-italic font-AeonikProRegular tracking-[0,16px]">
                      {t("type")}
                    </span>
                    <div className={`w-full mt-[6px] profileSelect flex items-center    ${state?.isCheckInput && state?.sellerTypes === "ENTITY"
                      ? "border border-[#FFB8B8] bg-[#FFF6F6] "
                      : "  "
                      }
              `}>

                      <Select
                        className="  flex items-center text-[14px] md:text-base z-[0] focus:border border-searchBgColor rounded-lg w-full cursor-pointer "
                        placeholder={t("type")}
                        optionFilterProp="children"
                        onChange={(e) => {
                          setState({
                            ...state,
                            sellerTypeId: e,
                            sellerUpdateInput: true,
                          });
                        }}
                        value={dressInfo?.typeList?.company
                          ?.filter((e) => e?.id == state?.sellerTypeId)
                          ?.map((item) => {
                            return languageDetector?.typeLang === "ru"
                              ? item?.name_ru
                              : item?.name_uz;
                          })}
                        // size="large"
                        options={dressInfo?.typeList?.company?.map((item) => {
                          return {
                            value: item?.id,
                            label:
                              languageDetector?.typeLang === "ru"
                                ? item?.name_ru
                                : item?.name_uz,
                          };
                        })}
                      />
                    </div>
                    {/* <div
                className={`w-full mt-[6px]   overflow-hidden rounded-lg border border-green-600
              ${state?.isCheckInput && state?.sellerTypes === "ENTITY"
                    ? "border border-[#FFB8B8] bg-[#FFF6F6] "
                    : " "
                  }
              `}
              >
                <Select
                  className=" h-full  border border-red-600  text-[14px] md:text-base z-[0] flex items-center rounded-lg w-full focus:border border-searchBgColor cursor-pointer"
                  placeholder={t("type")}
                  // style={{ height: 42 }}
                  optionFilterProp="children"
                  onChange={(e) => {
                    setState({
                      ...state,
                      sellerTypeId: e,
                      sellerUpdateInput: true,
                    });
                  }}
                  value={dressInfo?.typeList?.company
                    ?.filter((e) => e?.id == state?.sellerTypeId)
                    ?.map((item) => {
                      return languageDetector?.typeLang === "ru"
                        ? item?.name_ru
                        : item?.name_uz;
                    })}
                  // size="large"
                  options={dressInfo?.typeList?.company?.map((item) => {
                    return {
                      value: item?.id,
                      label:
                        languageDetector?.typeLang === "ru"
                          ? item?.name_ru
                          : item?.name_uz,
                    };
                  })}
                />
              </div> */}
                  </div>
                }

                {/* EditPassword */}
                <div
                  className={`w-full  flex items-center   xs:mt-5  ${state?.sellerTypes === "ENTITY" ? "justify-start" : "justify-end"
                    }`}
                >
                  <button
                    onClick={() => setOpenEditModal(true)}
                    className={
                      " text-textBlueColor flex items-center text-sm md:text-base not-italic font-AeonikProRegular hover:underline"
                    }
                  >
                    {t("editPassword")}
                  </button>
                </div>
              </div>

              {/* Button */}
              <div className="w-full  flex items-center justify-between gap-x-6 mt-7">
                {state?.sellerUpdateInput ? (
                  state?.sendingLoader ? (
                    <button
                      type="button"
                      onClick={() => UpdateSeller()}
                      className="w-full active:scale-95  active:opacity-70 h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center bg-weatherWinterColor"
                    >
                      <ClipLoader
                        className="h-full py-[2px]"
                        color={"#fff"}
                        size={40}
                        loading={true}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => UpdateSeller()}
                      className="w-full active:scale-95  active:opacity-70 h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center bg-weatherWinterColor"
                    >
                      <span className="text-center text-base text-white not-italic font-AeonikProMedium">
                        {t("save")}
                      </span>
                      <span>
                        <CircleNextIcon />
                      </span>
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    className="w-full  h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center opacity-30 bg-weatherWinterColor"
                  >
                    <span className="text-center text-base text-white not-italic font-AeonikProMedium">
                      {t("save")}
                    </span>
                    <span>
                      <CircleNextIcon />
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
      }
    </div >
  );
}
export default React.memo(EditProfilePage);
