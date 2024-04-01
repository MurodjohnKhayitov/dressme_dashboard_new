import React, { useCallback, useContext, useEffect, useState } from "react";
import { DeleteIcon, InputCheckedTrueIcons, MenuCloseIcons, StarLabel } from "../../../../../assets/icons";
import AccessoriesAdd from "../Details/Accessories/AccessoriesAdd";
import HeadWearAdd from "../Details/HeadWear/HeadWearAdd";
import OutWearAdd from "../Details/OutWear/OutWearAdd";
import ShoesAdd from "../Details/Shoes/ShoesAdd";
import UnderAddWear from "../Details/UnderAddWear/UnderAddWear";
import { BiCheck } from "react-icons/bi";
import { ClipLoader, PuffLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { useHttp } from "../../../../../hook/useHttp";
import { MdError, MdNumbers } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { dressMainData } from "../../../../../hook/ContextTeam";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../../language/LanguageItem";
const url = "https://api.dressme.uz/api/seller";

function AllSizeModalEdit({ onClick, lastElement, ThisState, newProductId, AllCheckedSizeList, allColor, onRefetch, productsDataIdEdit }) {
  const { request } = useHttp()
  const { t } = useTranslation("product");
  const [languageDetector] = useContext(LanguageDetectorDress);

  // name_ru
  const [checkColor, setCheckColor] = useState(productsDataIdEdit?.colors[0]?.pivot?.id)
  const [addSizeColorById, setAddSizeColorById] = useState(null)
  const [openColorModal, setOpenColorModal] = useState(false)
  const [sendingLoader, setSendingLoader] = useState(false)
  const [allSizeOfListId, setAllSizeOfListId] = useState([])
  const [handlePivotColorId, setHandlePivotColorId] = useState(productsDataIdEdit?.colors[0]?.pivot?.color_id)
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  // ------------Delete------
  const [deleteId, setDeleteId] = useState(null)
  const [sizedeleteModal, setSizedeleteModal] = useState(false)
  const [hideToggleIcons, setHideToggleIcons] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  // ------------Delete------
  const [addNewColor, setAddNewColor] = useState(null);
  const [productId, setProductId] = useState(null);
  const [shopLocationId, setShopLocationId] = useState(null);

  const onHanldeColorModal = useCallback(() => setOpenColorModal(true), [])
  const onHandleDeleteSize = useCallback(() => setSizedeleteModal(true), [])

  function onDeleteId(childData) {
    setDeleteId(childData)
  }
  useEffect(() => {
    allColor?.filter(e => e?.id === lastElement)?.map(item => {
      setAddNewColor(item)
    })
  }, [lastElement])

  useEffect(() => {
    setCheckColor(productsDataIdEdit?.colors[0]?.pivot?.id)
    setHandlePivotColorId(productsDataIdEdit?.colors[0]?.pivot?.color_id)
    productsDataIdEdit?.shop_locations?.map(item => {
      if (Number(item?.id) === Number(dressInfo?.locationIdAddProduct)) {
        setProductId(item?.pivot?.product_id)
        setShopLocationId(item?.pivot?.shop_location_id)
      }
    })

  }, [productsDataIdEdit])

  function handleGetSizeCheckedList(childData, lastElementColorId) {
    setAllSizeOfListId(childData)
    AllCheckedSizeList(childData, lastElementColorId)
  }

  function onHandleCheckColor(id) {
    if (!checkColor) {
      setCheckColor(id)
    }
    if (checkColor !== id) {
      setCheckColor(id)
    }
  }
  function onHandleAddColorSize(id) {
    setAddSizeColorById(id)
  }

  const deleteSizeId = useMutation(() => {
    return request({
      url: `/products/${Number(deleteId)}/delete-product-size`, method: "POST",
      body: {
        product_id: Number(productId),
        color_id: Number(handlePivotColorId),
        shop_location_id: Number(shopLocationId)
      },
      token: true,
    });
  });

  function onHandleDeleteSizeById() {
    setLoader(true)
    setHideToggleIcons(true)
    deleteSizeId.mutate({},
      {
        onSuccess: (res) => {
          if (res?.message && res?.errors) {
            setErrorMessage(res?.message)
            setLoader(false)
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
          } else if (res?.message && !res?.errors) {
            setSuccessMessage(res?.message)
            setLoader(false)
            setTimeout(() => {
              setHideToggleIcons(false)
              setSizedeleteModal(false)
            }, 1000);
            onRefetch()
          }
        },
        onError: err => {
          toast.error(`${err?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoader(false)
          throw new Error(err || "something wrong");
        }
      })
  }

  const onHandleCopyAddSize = async () => {
    setSendingLoader(true)
    let form = new FormData();
    form.append("shop_location_id", Number(shopLocationId));
    form.append("color_id", addSizeColorById);
    allSizeOfListId?.forEach(item => {
      form.append("product_size_ids[]", item);
    })
    try {
      const res = await fetch(`${url}/products/${Number(productId)}/massive-add-product-sizes`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
          "Accept-Language": languageDetector?.typeLang,

        },
        body: form,
      });
      const res_1 = await res.json();
      if (res_1) {
        if (res_1?.errors && res_1?.message) {
          toast.error(`${res_1?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          onRefetch()
          setSendingLoader(false)
          setOpenColorModal(false)
        } else if (res_1?.message) {
          toast.success(`${res_1?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          onRefetch()
          setSendingLoader(false)
          setOpenColorModal(false)
        }
      }
    } catch (err) {
      toast.error(`${err}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      onRefetch()
      setSendingLoader(false)
      setOpenColorModal(false)
      throw new Error(err?.message || "something wrong");
    }

  }
   return (
    <div className="w-full max-w-[440px]   md:max-w-[820px] h-fit bg-white md:rounded-lg bg-white md:py-5 px-4   py-[6px] ls:py-2 ll:py-[10px] md:px-4 mx-auto rounded-t-lg md:rounded-0">
      <section
        onClick={() => {
          setOpenColorModal(false)
          setSizedeleteModal(false)
          setLoader(false)
          setHideToggleIcons(false)
          setSendingLoader(false)
        }}
        className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${openColorModal || sizedeleteModal ? "" : "hidden"}`}
      ></section>
      {/* Color Modal */}
      <div
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-2 py-2 rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${openColorModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"}`}>
        <div className="flex items-center justify-between border-b border-searchBgColor">
          <p className="pl-2">
            {t("APselectColor")}
          </p>
          <button
            className="py-2"
            type="button"
            onClick={() => {
              setSendingLoader(false)
              setOpenColorModal(false)
            }}
          >
            <MenuCloseIcons colors={"#a1a1a1"} />
          </button>
        </div>
        <div className="w-full px-2 py-4 gap-x-2 gap-y-4 grid gap-4 grid-cols-6 ">
          {lastElement ?

            null
            :
            productsDataIdEdit?.colors?.filter(e => e?.pivot?.id !== checkColor)?.map((data) => {
               return (
                <div
                  key={data?.id}
                  className={`flex flex-col items-center justify-center `}>
                  <div
                    className={` relative rounded-full md:rounded-[12px] overflow-hidden flex items-center justify-center  w-[30px] h-[30px] md:w-[65px] md:h-[40px] bg-[${data.hex
                      }] cursor-pointer ${data?.id == 2
                        ? "border border-setTexOpacity flex items-center justify-center"
                        : ""
                      }
                     `}
                  >
                    <div
                      onClick={() => onHandleAddColorSize(data?.pivot?.color_id)}
                      style={{ background: `${data.hex}` }}
                      className="w-full h-full flex items-center justify-center">
                      {addSizeColorById && Number(data?.pivot?.color_id) === Number(addSizeColorById) && Number(data?.id) !== 1 &&
                        <BiCheck size={28} color={"#000"} className="flex items-center justify-center" />}
                      {addSizeColorById && Number(data?.pivot?.color_id) === Number(addSizeColorById) && Number(data?.id) === 1 &&
                        <BiCheck size={28} color={"#fff"} className="flex items-center justify-center" />}
                    </div>
                  </div>
                  <span
                    className={`text-black text-center text-[12px] ll:text-[14px] not-italic font-AeonikProRegular  `}
                  >
                    {languageDetector?.typeLang === "ru" && data?.name_ru}
                    {languageDetector?.typeLang === "uz" && data?.name_uz}
                  </span>
                </div>
              );
            })}
        </div>
        <div className="flex items-center justify-end  gap-x-5">
          {lastElement ?
            null
            :
            <button
              type="button"
              onClick={onHandleCopyAddSize}
              className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-base md:text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
              {sendingLoader ?
                <ClipLoader
                  className="h-full py-[2px]"
                  color={"#007DCA"}
                  size={40}
                  loading={true}
                /> : t("TFadd")}
            </button>
          }
        </div>
      </div>
      {/* Color Delete Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${sizedeleteModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"}`}>
        <button
          onClick={() => {
            setLoader(false)
            setHideToggleIcons(false)
            setSizedeleteModal(false)
          }}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 ">
          <MenuCloseIcons
            className="w-full h-full"
            colors={"#a2a2a2"} />
        </button>

        {hideToggleIcons ?
          <div className="w-full h-full flex items-center justify-center">
            {loader && hideToggleIcons ?
              <PuffLoader
                color={"#007DCA"}
                size={80}
                loading={true}
              />
              :
              <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                {errorMessage ?
                  <span className="flex items-center justify-center p-2">
                    <MdError size={35} color="#FF4343" />
                  </span> :
                  <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                    <FaCheck size={30} color="#009B17" />
                  </span>}
                <span className="text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
              </div>
            }
          </div>
          :
          <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
            <span className="w-10 h-10 rounded-full border border-[#a2a2a2] hidden md:flex items-center justify-center">
              <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                <DeleteIcon width={30} />
              </span>
            </span>
            <span className="w-10 h-10 rounded-full border border-[#a2a2a2] md:hidden flex items-center justify-center">
              <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                <DeleteIcon width={30} />
              </span>
            </span>
            <span className=" flex items-center text-black text-base md:text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
              {t("PRsure")}<span>?</span>
            </span>
          </div>
        }

        {/* } */}
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">

          <button
            onClick={() => setSizedeleteModal(false)}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[38px] md:h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
            {t("PRcancel")}
          </button>
          <button
            onClick={() => onHandleDeleteSizeById()}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[38px] md:h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
            {t("PRdelete")}</button>
        </div>

      </section>
      <div className="w-full flex items-center justify-between md:pl-7 ">
        <div className="w-fit flex items-center gap-x-2">
          <span className="text-black text-md not-italic font-AeonikProRegular"> {t("APcolors")}:</span>
          {productsDataIdEdit?.colors?.map((data) => {
            return (
              <div onClick={() => {
                onHandleCheckColor(data?.pivot?.id)
                setHandlePivotColorId(data?.pivot?.color_id)
              }}
                key={data?.id}
                style={{ background: `${data.hex}` }}
                className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
              >
                <span
                  className={`w-[22px] h-[22px] rounded-full flex items-center justify-center`}
                >
                  {data?.pivot?.id === checkColor && data?.id !== 1 &&
                    < BiCheck size={28} color={"#000"} className="flex items-center justify-center" />
                  }
                  {data?.pivot?.id === checkColor && data?.id === 1 &&
                    < BiCheck size={28} color={"#fff"} className="flex items-center justify-center" />
                  }
                </span>
              </div>
            );
          })}
        </div>
        <button className="flex " type="button " onClick={onClick}>
          <MenuCloseIcons colors={"#a1a1a1"} />
        </button>
        {/* <label htmlFor="checkList" className="md:hidden flex items-center border border-borderColor rounded-lg overflow-hidden">
          <input name="checkList" type="checkbox" className="w-[20px] h-[20px] rounded-lg" />
        </label> */}
      </div>

      {/* All Cards */}
      <div className="w-full md:h-[694px]  overflow-hidden h-[600px] mt-4 md:mt-6 ">
        <div className="w-full h-full   flex flex-col gap-y-2   md:py-1 mb-5">
          {/* Filter Area */}
          <div className="w-full h-full ">
            {Number(productsDataIdEdit?.category_id) === 1 && <HeadWearAdd addNewColor={addNewColor} onClick={onClick} stateList={productsDataIdEdit} onRefetch={onRefetch} onDeleteId={onDeleteId} handleGetSizeCheckedList={handleGetSizeCheckedList} colorsList={productsDataIdEdit?.colors} ColorModal={onHanldeColorModal} DeleteSize={onHandleDeleteSize} pivotColorId={handlePivotColorId} checkColor={checkColor} />}
            {Number(productsDataIdEdit?.category_id) === 2 && <OutWearAdd addNewColor={addNewColor} onClick={onClick} stateList={productsDataIdEdit} onRefetch={onRefetch} onDeleteId={onDeleteId} handleGetSizeCheckedList={handleGetSizeCheckedList} colorsList={productsDataIdEdit?.colors} ColorModal={onHanldeColorModal} DeleteSize={onHandleDeleteSize} pivotColorId={handlePivotColorId} checkColor={checkColor} />}
            {Number(productsDataIdEdit?.category_id) === 3 && <UnderAddWear addNewColor={addNewColor} onClick={onClick} stateList={productsDataIdEdit} onRefetch={onRefetch} onDeleteId={onDeleteId} handleGetSizeCheckedList={handleGetSizeCheckedList} colorsList={productsDataIdEdit?.colors} ColorModal={onHanldeColorModal} DeleteSize={onHandleDeleteSize} pivotColorId={handlePivotColorId} checkColor={checkColor} />}
            {Number(productsDataIdEdit?.category_id) === 4 && <ShoesAdd addNewColor={addNewColor} onClick={onClick} stateList={productsDataIdEdit} onRefetch={onRefetch} onDeleteId={onDeleteId} handleGetSizeCheckedList={handleGetSizeCheckedList} colorsList={productsDataIdEdit?.colors} ColorModal={onHanldeColorModal} DeleteSize={onHandleDeleteSize} pivotColorId={handlePivotColorId} checkColor={checkColor} />}
            {Number(productsDataIdEdit?.category_id) === 5 && <AccessoriesAdd addNewColor={addNewColor} onClick={onClick} stateList={productsDataIdEdit} onRefetch={onRefetch} onDeleteId={onDeleteId} handleGetSizeCheckedList={handleGetSizeCheckedList} colorsList={productsDataIdEdit?.colors} ColorModal={onHanldeColorModal} DeleteSize={onHandleDeleteSize} pivotColorId={handlePivotColorId} checkColor={checkColor} />}
          </div>
        </div>
      </div>
    </div >
  );
}
export default React.memo(AllSizeModalEdit);

