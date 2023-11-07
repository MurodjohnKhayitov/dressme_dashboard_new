import { Popover, Select, Space, Switch, TreeSelect } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  AddIconsCircle1,
  ArrowRightIcon,
  DownloadIcon,
  InputCheckedTrueIcons,
  LoaderIcon,
  MenuCloseIcons,
  StarLabel,
} from "../../../../assets/icons";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HeadWearAdd from "./Details/HeadWear/HeadWearAdd";
import OutWearAdd from "./Details/OutWear/OutWearAdd";
import AccessoriesAdd from "./Details/Accessories/AccessoriesAdd";
import ShoesAdd from "./Details/Shoes/ShoesAdd";
import UnderAddWear from "./Details/UnderAddWear/UnderAddWear";
import ClothingSection from "./DetailsForMobile/ClothesSection/ClothingSection";
import SubClothingSection from "./DetailsForMobile/SubClothesSection/SubClothingSection";
import DressSeason from "./DetailsForMobile/DressSeason/DressSeason";
import ColourGroup from "./DetailsForMobile/ColourList/ColourGroup";
import GenderList from "./DetailsForMobile/GenderList/GenderList";
import DressType from "./DetailsForMobile/DressType/DressType";
import MakeCountry from "./DetailsForMobile/CountrySize/MakeCountry";
import ClothingCategory from "./DetailsForMobile/ClothingCategory/ClothingCategory";
import { useHttp } from "../../../../hook/useHttp";
import { dressMainData } from "../../../../hook/ContextTeam";
import TextFormAdd from "./TextFormGroup/TextFormAdd";
// import { DownOutlined } from '@ant-design/icons'


const { Option } = Select;
const url = "https://api.dressme.uz/api/seller";

const AddingProduct = () => {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  const { request } = useHttp();
  const [state, setState] = useState({
    buttonReviews: false,
    openDropModalButton: true,
    showColor: false,
    openSelect: false,
    // --------------
    ClothingSection: false,
    SubClothingSection: false,
    DressSeason: false,
    Colour: false,
    GenderModal: false,
    DressTypeModal: false,
    MakeCountryModal: false,
    ClothingCategoryModal: false,
    // --------------
    pictureBgFile1: "",
    pictureBgView1: "",
    pictureBgFile2: "",
    pictureBgView2: "",
    pictureBgFile3: "",
    pictureBgView3: "",
    pictureBgFile4: "",
    pictureBgView4: "",
    // ---------------
    shopId: '',
    shopLocationId: '',
    section_Id: [],
    sub_Section_Id: [],
    season_Id: [],
    color_Id: '',
    gender_Id: '',
    min_Age_Category: '',
    max_Age_Category: '',
    sku: '',
    category_Id: '',
    type_Id: '',
    producer_Id: '',
    photos1: [],
    amount: '',
    age: '',
    price: '',
    discount_percent: '',
    discount_price: '',

    // -----Details-----
    headWearList: '',
    outWearList: "",
    underWearList: '',
    shoesList: '',
    AccessoriesList: '',
    // -----TextForm-----
    textForm: ''

  });

  const [productsData, setProductsData] = useState({});

  function CallBackTextForm(childData) {
    setState({ ...state, textForm: childData })
  }
  function CallBackHeadWear(childData) {
    console.log(childData);
    setState({
      ...state,
      headWearList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    })
  }
  function CallBackOutWear(childData) {

    setState({
      ...state,
      outWearList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    })
  }
  function CallBackUnderWear(childData) {
    setState({
      ...state,
      underWearList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    })
  }
  function CallBackShoesWear(childData) {

    setState({
      ...state,
      shoesList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    })
  }
  function CallBackAccessoriesWear(childData) {

    setState({
      ...state,
      AccessoriesList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    })
  }

  function randomCode(len) {
    let p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    setState({
      ...state,
      sku: [...Array(len)].reduce((a) => a + p[~~(Math.random() * p.length)], "")
    }
    )
  }

  // ---------Callback----
  const ClothingSectionToggle = React.useCallback(
    () => setState({ ...state, ClothingSection: false }),
    []
  ); // ClothingSection
  const SubClothingSectionToggle = React.useCallback(
    () => setState({ ...state, SubClothingSection: false }),
    []
  ); // ClothingSection
  const DressSeasonToggle = React.useCallback(
    () => setState({ ...state, DressSeason: false }),
    []
  ); // ClothingSection
  const ColourListToggle = React.useCallback(
    () => setState({ ...state, Colour: false }),
    []
  ); // ClothingSection
  const GenderListToggle = React.useCallback(
    () => setState({ ...state, GenderModal: false }),
    []
  ); // ClothingSection
  const DressTypeToggle = React.useCallback(
    () => setState({ ...state, DressTypeModal: false }),
    []
  ); // ClothingSection
  const MakeCountryToggle = React.useCallback(
    () => setState({ ...state, MakeCountryModal: false }),
    []
  ); // ClothingSection
  const ClothingCategoryToggle = React.useCallback(
    () => setState({ ...state, ClothingCategoryModal: false }),
    []
  ); // ClothingSection

  // ---------Callback----
  useEffect(() => {
    if (
      state?.showColor ||
      state?.ClothingCategoryModal ||
      state?.ClothingSection ||
      state?.Colour ||
      state?.DressSeason ||
      state?.DressTypeModal ||
      state?.GenderModal ||
      state?.MakeCountryModal ||
      state?.SubClothingSection) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [
    state?.showColor,
    state?.ClothingCategoryModal,
    state?.ClothingSection,
    state?.Colour,
    state?.DressSeason,
    state?.DressTypeModal,
    state?.GenderModal,
    state?.MakeCountryModal,
    state?.SubClothingSection,

  ]);

  const handleLocationImageOne = (e) => {
    setState({
      ...state,
      photos1: e.target.files[0],
      pictureBgView1: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleLocationImage2 = (e) => {
    setState({
      ...state,
      pictureBgFile2: e.target.files[0],
      pictureBgView2: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleLocationImage3 = (e) => {
    setState({
      ...state,
      pictureBgFile3: e.target.files[0],
      pictureBgView3: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleLocationImage4 = (e) => {
    setState({
      ...state,
      pictureBgFile4: e.target.files[0],
      pictureBgView4: URL.createObjectURL(e.target.files[0]),
    });
  };

  const LocationAddSubmit = () => {
    console.log(
      state?.section_Id, "section_Id \n",
      state?.sub_Section_Id, "sub_Section_Id \n",
      state?.season_Id, "season_Id \n",
      state?.color_Id, "color_Id \n",
      state?.gender_Id, "gender_Id \n",
      state?.min_Age_Category, "min_Age_Category \n",
      state?.max_Age_Category, "max_Age_Category \n",
      state?.sku, "sku \n",
      state?.category_Id, "category_Id \n",
      state?.type_Id, "type_Id \n",
      state?.producer_Id, "producer_Id \n",
      state?.photos1, "photos1 \n",
      state?.headWearList, "headWearList \n",
      state?.outWearList, "outWearList \n",
      state?.underWearList, "underWearList \n",
      state?.shoesList, "shoesList \n",
      state?.AccessoriesList, "AccessoriesList \n",
      state?.textForm, "textForm \n",
    );
  }

  // -----------------------------------------------------------


  useQuery(
    ["products_get"],
    () => {
      return request({ url: "/products/get-product-info", token: true });
    },
    {
      onSuccess: (res) => {
        if (res) {
          setProductsData(res);
        }
      },
      onError: (err) => {
        console.log(err, "ERR PRODUCTS");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const toggleDropModalButton = () => {
    setState({ ...state, openDropModalButton: !state.openDropModalButton });
  };
  const newArray = []
  productsData?.sections?.filter(e => state?.section_Id?.includes(e?.id))?.map((data) => {
    return data?.sub_sections?.map(item => {
      newArray.push(item)
    })
  })
  // -----------------------------------------------------------

  const onSearch = (value) => {
    // console.log("search:", value);
  };


  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      if (getCurrentDimension().width < 758 && state?.showColor) {
        setState({ ...state, showColor: false });
      }
      setScreenSize(getCurrentDimension());
    };

    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);



  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [dressInfo?.nextPageShowForm]);





  const LocationAddSubmit1 = () => {
    // console.log(assistantPhoneNumberFirst, "assistantPhoneSecond ");

    let form = new FormData();
    form.append("shop_id", state?.shopId);
    form.append("shop_location_id", state?.shopLocationId);
    form.append("section_ids", state?.section_Id);
    form.append("sub_section_ids", state?.sub_Section_Id);//no R
    form.append("season_ids", state?.season_Id);
    form.append("color_ id", state?.color_Id);
    form.append("gender_id", state?.gender_Id);
    form.append("min_age_category", state?.min_Age_Category);
    form.append("max_age_category", state?.max_Age_Category);
    form.append("sku", state?.sku);
    form.append("category_id", state?.category_Id);
    form.append("type_id", state?.type_Id);
    form.append("producer_id", state?.producer_Id);
    form.append("photos[]", state?.photos1);//img
    // detailsForAll
    form.append("amount", state?.amount);
    form.append("age", state?.age);
    form.append("price", state?.price);
    form.append("discount_percent", state?.discount_percent);//no R
    form.append("discount_price", state?.discount_price);//no R
    // textForm
    form.append("brand_id", state?.textForm?.brand_id);//no R
    form.append("name_uz", state?.textForm?.name_Uz);
    form.append("name_ru", state?.textForm?.name_Ru);
    form.append("quality_uz", state?.textForm?.quality_Uz);
    form.append("quality_ru", state?.textForm?.quality_Ru);
    form.append("description_uz", state?.textForm?.description_Uz);
    form.append("description_ru", state?.textForm?.description_Ru);
    form.append("composition_uz", state?.textForm?.composition_Uz);//no R
    form.append("composition_ru", state?.textForm?.composition_Ru);//no R
    // HeadWear
    form.append("one_size", state?.headWearList?.oneSize);
    form.append("min_head_girth", state?.headWearList?.minHeadGirth);
    form.append("max_head_girth", state?.headWearList?.maxHeadGirth);
    // OutWear
    form.append("outwear_letter_size", state?.outWearList?.outWearLetterSize);
    form.append("min_outwear_size", state?.outWearList?.minOutWearSize);
    form.append("max_outwear_size", state?.outWearList?.maxOutWearSize);
    form.append("min_chest_girth", state?.outWearList?.minChestGirth);
    form.append("max_chest_girth", state?.outWearList?.maxChestGirth);
    form.append("min_outwear_waist_girth", state?.outWearList?.minOutWearWaistGirth);
    form.append("max_outwear_waist_girth", state?.outWearList?.maxOutWearWaistGirth);
    form.append("min_outwear_hip_girth", state?.outWearList?.minOutWearHipGirth);
    form.append("max_outwear_hip_girth", state?.outWearList?.maxOutWearHipGirth);
    // UnderWear
    form.append("underwear_letter_size", state?.underWearList?.underWearLetterSize);
    form.append("min_height", state?.underWearList?.minHeight);
    form.append("max_height", state?.underWearList?.maxHeight);
    form.append("min_underwear_size", state?.underWearList?.minUnderWearSize);
    form.append("max_underwear_size", state?.underWearList?.maxUnderWearSize);
    form.append("min_underwear_waist_girth", state?.underWearList?.minUnderwearWaistGirth);
    form.append("max_underwear_waist_girth", state?.underWearList?.maxUnderwearWaistGirth);
    form.append("min_underwear_hip_girth", state?.underWearList?.minUnderWearHipGirth);
    form.append("max_underwear_hip_girth", state?.underWearList?.maxUnderWearHipGirth);
    // FooterSize
    form.append("footwear_size", state?.shoesList?.footWearSize);
    form.append("min_foot_length", state?.shoesList?.minFootLength);
    form.append("max_foot_length", state?.shoesList?.maxFootLength);
    // Accessory
    form.append("accessory_letter_size", state?.AccessoriesList?.accessoryLetterSize);
    form.append("accessory_size", state?.AccessoriesList?.accessorySize);
    form.append("length", state?.AccessoriesList?.legnthAcc);
    form.append("width", state?.AccessoriesList?.widthAcc);


    return fetch(`${url}/products/store`, {
      method: "POST",
      headers: {
        'Accept': "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "ProductStore");


      })
      .catch((err) => console.log(err, "errImage"));
  };
  console.log(productsData?.shops, "shops");
  console.log(state?.shopId, "shop_id");
  console.log(state?.shopLocationId, "shopLocationId");
  productsData?.shops?.map(item => {
    item?.shop_locations?.map(data => {
      console.log(data, "data");
    })
    console.log(item, "shops-Location");

  })
  return (
    <div className="w-full h-fit ">
      {dressInfo?.nextPageShowForm ?
        <div className="relative w-full md:px-0 flex items-center justify-between mb-[50px] my-6 md:my-[50px] focus:bg-textBlueColor ">
          <section
            onClick={() =>
              setState({
                ...state,
                ClothingSection: false,
                SubClothingSection: false,
                DressSeason: false,
                Colour: false,
                GenderModal: false,
                DressTypeModal: false,
                MakeCountryModal: false,
                ClothingCategoryModal: false,
                showColor: false,
                openSelect: false,
              })
            }
            className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.ClothingSection ||
                state?.SubClothingSection ||
                state?.DressSeason ||
                state?.Colour ||
                state?.GenderModal ||
                state?.DressTypeModal ||
                state?.ClothingCategoryModal ||
                state?.showColor ||
                state?.openSelect ||
                state?.MakeCountryModal
                ? ""
                : "hidden"
              }`}
          ></section>

          {state?.showColor && (
            <div className="max-w-[576px] w-full fixed z-[221]  left-1/2 right-1/2 top-[50%] translate-x-[-50%] translate-y-[-50%]  h-fit flex items-center  justify-center mx-auto ">
              {/* </div> */}
              <div className="relative z-[223]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
                <div
                  className={`flex items-center justify-between border-b border-searchBgColor pb-3`}
                >
                  <span className="text-black text-lg not-italic font-AeonikProRegular leading-5">
                    Выберите цвет
                  </span>
                  <button
                    className="py-2"
                    type=""
                    onClick={() => setState({ ...state, showColor: false })}
                  >
                    <MenuCloseIcons colors={"#000"} />
                  </button>
                </div>
                <div className="py-4 gap-x-2 gap-y-4 grid gap-4 grid-cols-6">
                  {productsData?.colors.map((data) => {
                    return (
                      <div className="flex flex-col items-center justify-center ">
                        <div
                          key={data?.id}
                          onClick={() => setState({ ...state, color_Id: data?.id })}
                          style={{ background: `${data.hex}` }}
                          className={`rounded-[12px] flex items-center justify-center  w-[65px] h-[40px] bg-[${data.hex
                            }] cursor-pointer ${data?.id == 2
                              ? "border border-setTexOpacity flex items-center justify-center"
                              : ""
                            }
                     `}
                        >
                          {data?.id === state?.color_Id && state?.color_Id !== 1 ? (
                            <InputCheckedTrueIcons colors={"#000"} />
                          ) : null}

                          {state?.color_Id === 1 && data?.id === state?.color_Id ? (
                            <InputCheckedTrueIcons colors={"#fff"} />
                          ) : null}
                        </div>
                        <span
                          className={`text-black text-center text-xs not-italic font-AeonikProRegular`}
                        >
                          {data?.name_ru}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-end">
                  {state?.color_Id && (
                    <button
                      onClick={() => setState({ ...state, color_Id: '', showColor: false })}
                      className="flex items-center text-fullBlue active:scale-95  active:opacity-70 justify-center  px-4 py-1"
                    >
                      Отключить
                    </button>
                  )}
                  {/* </div> */}
                </div>
              </div>
            </div>
          )}
          <section
            className={` max-w-[440px] md:max-w-[700px] z-[201] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.openSelect ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
              }`}
          >
            <button
              onClick={() => setState({ ...state, openSelect: false })}
              type="button"
              className="absolute  right-3 top-3 w-5 h-5 "
            >
              <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
            </button>
            <div className="w-full h-fit flex items-center justify-center py-5 border-b border-borderColor2">
              <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
                Прикрепить к локация
              </p>
            </div>
            <div className="w-full px-[10px] py-[30px] flex flex-col gap-y-[10px]">
              {productsData?.shops?.filter(e => e?.id === state?.shopId).map((item) => {
                return item?.shop_locations?.map(data => {
                  return (
                    <button
                      onClick={() => setState({ ...state, shopLocationId: data?.id, openSelect: false })}
                      key={data?.id}
                      className="w-full py-[10px] flex items-center  rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg"
                    >
                      <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                        {" "}
                        {data?.address}
                      </span>
                    </button>
                  )
                })
              })
              }

            </div>
          </section>

          <div className="absolute top-[0px] hidden md:flex items-center justify-center flex-col mr-[50px]">
            <div className="w-[45px] h-[45px] font-AeonikProMedium border-2 flex items-center justify-center bg-textBlueColor border-textBlueColor rounded-full text-2xl text-white mb-[5px]">
              1
            </div>
            <div className="w-[2px] h-[150px] bg-textBlueColor active:bg-textBlueColor mb-[5px] "></div>
            <div className="flex items-center justify-center font-AeonikProMedium text-textBlueColor text-2xl border border-textBlueColor w-[45px] h-[45px] rounded-full mb-[5px]">
              2
            </div>
            <div className="line flex-1"></div>
          </div>

          {/* ---------------------------------------- */}
          {/* Clothing Section */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.ClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <ClothingSection onClick={ClothingSectionToggle} />
          </section>

          {/*Sub Clothing Section */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.SubClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <SubClothingSection onClick={SubClothingSectionToggle} />
          </section>
          {/*DressSeason */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressSeason ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <DressSeason onClick={DressSeasonToggle} />
          </section>
          {/*ColourList */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.Colour ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <ColourGroup onClick={ColourListToggle} />
          </section>
          {/*ColourList */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.GenderModal ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <GenderList onClick={GenderListToggle} />
          </section>
          {/*DressType */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressTypeModal ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <DressType onClick={DressTypeToggle} />
          </section>
          {/*MakeCountry */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.MakeCountryModal ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <MakeCountry onClick={MakeCountryToggle} />
          </section>
          {/*ClothingCategory */}
          <section
            className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.ClothingCategoryModal ? "bottom-0" : "bottom-[-800px] z-0"
              }`}
          >
            <ClothingCategory onClick={ClothingCategoryToggle} />
          </section>
          {/* ---------------------------------------- */}

          <div className="w-full md:mx-[140px] md:mb-[50px] xs:border border-borderColor rounded-xl md:px-0 p-1">
            <div className="w-full h-fit md:relative md:py-12">
              <div className=" w-full h-fit flex gap-x-4 flex-col-reverse md:flex-row md:px-7 ">
                <div className="w-full md:w-[70%] h-fit flex flex-col gap-y-6">
                  <div className="w-full grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-6 mt-6 md:mt-0">
                    {/* Input Select 1.1 */}
                    <div className=" w-full h-fit flex flex-col gap-y-[5px] overflow-hidden">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Магазин
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        // onClick={() =>
                        //   setState({ ...state, ClothingSection: true })
                        // }
                        type="button"
                        className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                      >
                        <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                          Выбрать
                        </label>
                        <ArrowRightIcon />
                      </button>
                      <div className="w-full  hidden md:flex  rounded-lg focus:border-none overflow-hidden">

                        <Select
                          className=" rounded-lg w-full h-11 md:h-10"
                          showSearch
                          placeholder="Выбрать"
                          optionFilterProp="children"
                          onChange={(e) => setState({ ...state, shopId: e })}
                          onSearch={onSearch}
                          size="large"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }

                        >
                          {productsData?.shops?.map((data) => {
                            return (
                              <>
                                {data?.shop_locations?.length >= 1 && <Option
                                  key={data.id}
                                  value={data?.id}
                                >
                                  {data?.name}
                                </Option>}
                              </>
                            )
                          })}

                        </Select>
                      </div>
                    </div>
                    {/* Input Select 2.1 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className={`text-[13px] md:text-base font-AeonikProRegular ${state?.shopId ? "text-[#000]" : "text-[#b5b5b5]"}`}>
                          Локация
                        </span>
                        <span className="ml-[5px]">
                          {state?.shopId ? (
                            <StarLabel />
                          ) : null}
                        </span>
                      </div>
                      <button
                        // onClick={() =>
                        //   setState({ ...state, SubClothingSection: true })
                        // }
                        type="button"
                        className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                      >
                        <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                          Выбрать
                        </label>
                        <ArrowRightIcon />
                      </button>
                      <div className="w-full h-fit hidden md:flex">
                        {state?.shopId ? <button
                          onClick={() => setState({ ...state, openSelect: true })}
                          type="button"
                          className="w-full h-11 md:h-10 rounded-lg flex cursor-pointer items-center justify-between border border-borderColor px-3"
                        >
                          <label className="text-[14px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                            Выбрать
                          </label>
                          <span className="rotate-[90deg]">
                            <ArrowRightIcon />
                            {/* <DownOutlined style={{ colors: "#b5b5b5" }} /> */}
                          </span>
                        </button> :
                          <button
                            type="button"
                            className="w-full h-11 md:h-10 rounded-lg flex cursor-pointer items-center justify-between border border-borderColor px-3"
                          >
                            <label className="text-[14px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                              Выбрать
                            </label>
                            <span className="rotate-[90deg]">
                              <ArrowRightIcon />
                              {/* <DownOutlined style={{ fontSize: "16px", colors: "#b5b5b5" }} /> */}
                            </span>
                          </button>}


                        {/* <Select
                          className=" rounded-lg w-full h-11 md:h-10"
                          showSearch
                          placeholder="Выбрать"
                          optionFilterProp="children"
                          onClick={() => setState({ ...state, openSelect: true })}
                          // onChange={(e) => setState({ ...state, shopLocationId: e })}
                          // onSearch={onSearch}
                          size="large"
                        // filterOption={(input, option) =>
                        //   (option?.label ?? "")
                        //     .toLowerCase()
                        //     .includes(input.toLowerCase())
                        // }

                        >
                          //  {productsData?.shops?.filter(e => e?.id === state?.shopId).map((item) => {
                          //   return item?.shop_locations?.map(data => {
                          //     return (
                          //       <Option
                          //         key={data.id}
                          //         value={data?.id}
                          //       >
                          //         {data?.address}
                          //       </Option>
                          //     )
                          //   })
                          // })
                          // } 
                      </Select> */}



                      </div>
                    </div>
                    {/* Input Select 1 */}
                    <div className=" w-full h-fit flex flex-col gap-y-[5px] overflow-hidden">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Раздел одежды
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setState({ ...state, ClothingSection: true })
                        }
                        type="button"
                        className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                      >
                        <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                          Выбрать
                        </label>
                        <ArrowRightIcon />
                      </button>
                      <div className="w-full  hidden md:flex  rounded-lg focus:border-none overflow-hidden">
                        <Select
                          className=" rounded-lg w-full h-fit "
                          showSearch
                          mode="multiple"
                          placeholder="Выбрать"
                          optionLabelProp="label"
                          // optionFilterProp="children"
                          onChange={(e) => setState({ ...state, section_Id: e })}
                          onSearch={onSearch}
                          size="large"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }

                        >
                          {productsData?.sections?.map((item) => {
                            return (
                              <Option
                                key={item.id}
                                value={item.id}
                                label={item.name_ru}
                              >
                                <Space>
                                  <span>{item.name_ru}</span>
                                </Space>
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                    {/* Input Select 2 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className={`text-[13px] md:text-base font-AeonikProRegular ${newArray?.length ? "text-[#000]" : "text-[#b5b5b5]"}`}>
                          Подраздел одежды
                        </span>
                        <span className="ml-[5px]">
                          {newArray?.length ? (
                            <StarLabel />
                          ) : null}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setState({ ...state, SubClothingSection: true })
                        }
                        type="button"
                        className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                      >
                        <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                          Выбрать
                        </label>
                        <ArrowRightIcon />
                      </button>
                      <div className="w-full h-fit hidden md:flex">
                        <Select
                          className=" rounded-lg w-full h-11 md:h-10"
                          showSearch
                          disabled={
                            newArray?.length ? false : true
                          }
                          placeholder="Выбрать"
                          mode="multiple"
                          optionLabelProp="label"
                          onChange={(e) => setState({ ...state, sub_Section_Id: e })}
                          onSearch={onSearch}
                          size="large"
                          allowClear
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }

                        >
                          {newArray?.map(item => {
                            return (
                              <Option
                                key={item.id}
                                value={item.id}
                                label={item.name_ru}
                              >
                                <Space>
                                  <span>{item.name_ru}</span>
                                </Space>
                              </Option>
                            );

                          })
                          }
                        </Select>

                      </div>
                    </div>
                    {/* Input Select 3 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Сезон одежды
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        onClick={() => setState({ ...state, DressSeason: true })}
                        type="button"
                        className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                      >
                        <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                          Выбрать
                        </label>
                        <ArrowRightIcon />
                      </button>
                      <div className="w-full h-fit hidden md:flex">
                        <Select
                          mode="multiple"
                          style={{
                            width: "100%",
                          }}
                          placeholder="Выбрать"
                          // defaultValue={["china"]}
                          size="large"
                          onChange={(e) => setState({ ...state, season_Id: e })}
                          optionLabelProp="label"
                        >
                          {productsData?.seasons?.map((item) => {
                            return (
                              <Option
                                key={item.id}
                                value={item.id}
                                label={item.name_ru}
                              >
                                <Space>
                                  <span>{item.name_ru}</span>
                                </Space>
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                    </div>
                    {/* Input Select 4 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Цвет
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        onClick={() => setState({ ...state, Colour: true })}
                        type="button"
                        className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                      >
                        <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                          Выбрать
                        </label>
                        <ArrowRightIcon />
                      </button>
                      <div className="w-full hidden md:flex items-center justify-between border rounded-lg  h-[42px] md:h-10 px-[12px]">
                        {productsData.colors
                          ?.filter((e) => e?.id <= 9)
                          ?.map((data) => {
                            // console.log(data.hex, 'Colors');
                            return (
                              <div key={data?.id} className="block">
                                <label
                                  key={data?.id}
                                  style={{ background: `${data.hex}` }}
                                  className={`rounded-full border  w-[22px] h-[22px] cursor-pointer flex items-center justify-center hover:scale-110 duration-300 `}
                                >
                                  {/* <img src={data.icons} alt="" /> */}
                                </label>
                                <input
                                  type="radio"
                                  id={data?.id}
                                  name="checkStatus"
                                  value={data?.id}
                                  className={"hidden w-full h-full"}
                                />
                              </div>
                            );
                          })}
                        <button
                          onClick={() => setState({ ...state, showColor: true })}
                          type="button"
                        >
                          <AddIconsCircle1 />
                        </button>
                      </div>
                    </div>
                    {/* Input Select 5 */}
                    <div className="w-full h-fit  flex items-center gap-x-3">
                      <div className="w-full md:w-1/2 flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            Пол
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <button
                          onClick={() => setState({ ...state, GenderModal: true })}
                          type="button"
                          className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                        >
                          <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                            Выбрать
                          </label>
                          <ArrowRightIcon />
                        </button>
                        <div className="w-full h-fit md:flex hidden">
                          <Select
                            className=" rounded-lg w-full h-11 md:h-10"
                            showSearch
                            placeholder="Выбрать"
                            optionFilterProp="children"
                            onChange={(e) => setState({ ...state, gender_Id: e })}
                            onSearch={onSearch}
                            size="large"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={productsData?.gender?.map((item) => {
                              return {
                                value: item?.id,
                                label: item?.name_ru,
                              };
                            })}
                          />
                        </div>
                      </div>
                      <div className="w-1/2 hidden md:flex flex-col gap-y-[5px] ">
                        <div className="flex items-center">
                          <span className="text-[12px] flex flex-wrap whitespace-nowrap md:text-base font-AeonikProRegular">
                            Возраст
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <div className="w-full h-fit flex items-center gap-x-2">
                          <input
                            type="text"
                            name="age"
                            placeholder="Мин"
                            value={state?.min_Age_Category}
                            onChange={(e) => setState({ ...state, min_Age_Category: e.target.value })}
                            className="inputStyle outline-none w-[55px] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                          />
                          <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                          <input
                            type="text"
                            name="age"
                            placeholder="Мах"
                            value={state?.max_Age_Category}
                            onChange={(e) => setState({ ...state, max_Age_Category: e.target.value })}
                            className="inputStyle outline-none w-[55px] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                          />
                        </div>
                      </div>
                    </div>
                    {/* Input Select 6 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center  ">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Артикул
                        </span>

                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <div className="w-full h-fit flex items-center justify-between gap-x-3">
                        <input
                          type="text"
                          value={state?.sku}
                          onChange={(e) => setState({ ...state, sku: e.target.value })}
                          placeholder=""
                          className="inputStyle w-[calc(100%-42px)] h-10  flex items-center justify-between border rounded-lg px-[10px] outline-none"
                        />
                        <button
                          onClick={() => randomCode(17)}
                          type={"button"}
                          className="w-[40px] h-[40px] active:scale-95  active:opacity-70 flex items-center justify-center  bg-textBlueColor border border-borderColor rounded-lg"
                        >
                          <LoaderIcon />
                        </button>
                      </div>
                    </div>
                    {/* Input Select 7 */}
                    <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Категория одежды
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <div className="w-full h-fit">
                        <button
                          onClick={toggleDropModalButton}
                          type="button"
                          className={`w-full overflow-hidden h-[40px] hidden md:flex items-center justify-between border border-borderColor rounded-lg p-3 `}
                        >
                          <span className="text-[#a1a1a1]">Выбрать</span>
                          {state.openDropModalButton ? (
                            <span className="-rotate-90 transition duration-200 ease-out">
                              <ArrowRightIcon />
                            </span>
                          ) : (
                            <span className="rotate-90 transition duration-200 ease-out">
                              <ArrowRightIcon />
                            </span>
                          )}
                        </button>
                        <button
                          onClick={() =>
                            setState({
                              ...state,
                              ClothingCategoryModal: !state?.ClothingCategoryModal,
                            })
                          }
                          type="button"
                          className={`w-full overflow-hidden h-[40px] md:hidden flex items-center justify-between border border-borderColor rounded-lg p-3 `}
                        >
                          <span className="text-[#a1a1a1]">Выбрать</span>
                          {state.openDropModalButton ? (
                            <span className="-rotate-90 transition duration-200 ease-out">
                              <ArrowRightIcon />
                            </span>
                          ) : (
                            <span className="rotate-90 transition duration-200 ease-out">
                              <ArrowRightIcon />
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                    {/* Input Select 8 */}
                    <div className="w-full   h-fit  hidden md:flex items-center gap-x-3">
                      <div className="w-1/2 flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            Тип
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <div className="w-full h-fit">
                          <Select
                            className="block rounded-lg w-full h-11 md:h-10"
                            showSearch
                            allowClear
                            placeholder="Выбрать"
                            optionFilterProp="children"
                            onChange={(value, attribute2) => {
                              setState({ ...state, type_Id: attribute2?.attribute2 })
                              // CategoryTypeId(value, attribute2?.attribute2)
                            }}
                            onSearch={onSearch}
                            size="large"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          >
                            {dressInfo?.ProductFilterType ? productsData?.types?.filter(e => e?.category_id == dressInfo?.ProductFilterType)?.map((item) => {
                              return (
                                <Option
                                  key={"item_" + item.id}
                                  value={item?.id}
                                  attribute2={item?.category_id}
                                >
                                  {item.name_ru}
                                </Option>
                              )
                            }) : productsData?.types?.map((item) => {
                              return (
                                <Option
                                  key={"item_" + item.id}
                                  value={item?.id}
                                  attribute2={item?.category_id}
                                >
                                  {item.name_ru}
                                </Option>
                              )
                            })
                            }
                          </Select>
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            Производитель
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <div className="w-full h-fit">
                          <Select
                            className=" rounded-lg w-full h-11 md:h-10"
                            showSearch
                            placeholder="Выбрать"
                            optionFilterProp="children"
                            onChange={(e) => setState({ ...state, producer_Id: e })}
                            onSearch={onSearch}
                            size="large"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={productsData?.producers?.map((item) => {
                              return {
                                value: item?.id,
                                label: item?.name_ru,
                              };
                            })}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Input Select 9 mobile */}
                    <div className="w-full  flex md:hidden flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Тип
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        onClick={() => setState({ ...state, DressTypeModal: true })}
                        type="button"
                        className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                      >
                        <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                          Выбрать
                        </label>
                        <ArrowRightIcon />
                      </button>
                      <div className="w-full h-fit md:flex hidden">
                        <Select
                          className="block rounded-lg w-full h-11 md:h-10"
                          showSearch
                          placeholder="Выбрать"
                          optionFilterProp="children"
                          onChange={(value, attribute2) => {
                            setState({ ...state, type_Id: attribute2?.attribute2 })
                          }}
                          onSearch={onSearch}
                          size="large"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        // options={productsData?.types?.map((item) => {
                        //   return {
                        //     value: item?.id,
                        //     label: item?.name_ru,
                        //   };
                        // })}
                        >
                          {dressInfo?.ProductFilterType ? productsData?.types?.filter(e => e?.category_id == dressInfo?.ProductFilterType)?.map((item) => {
                            return (
                              <Option
                                key={"item_" + item.id}
                                value={item?.id}
                                attribute2={item?.category_id}
                              >
                                {item.name_ru}
                              </Option>
                            )
                          }) : productsData?.types?.map((item) => {
                            return (
                              <Option
                                key={"item_" + item.id}
                                value={item?.id}
                                attribute2={item?.category_id}
                              >
                                {item.name_ru}
                              </Option>
                            )
                          })
                          }
                        </Select>
                      </div>
                    </div>
                    {/* Input Select 10 mobile */}
                    <div className="w-full  flex md:hidden flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Производитель
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setState({ ...state, MakeCountryModal: true })
                        }
                        type="button"
                        className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                      >
                        <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                          Выбрать
                        </label>
                        <ArrowRightIcon />
                      </button>
                      <div className="w-full h-fit md:flex hidden">
                        <Select
                          className=" rounded-lg w-full h-11 md:h-10"
                          showSearch
                          placeholder="Выбрать"
                          optionFilterProp="children"
                          onChange={(e) => setState({ ...state, producer_Id: e })}
                          onSearch={onSearch}
                          size="large"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={productsData?.producers?.map((item) => {
                            return {
                              value: item?.id,
                              label: item?.name_ru,
                            };
                          })}
                        />
                      </div>
                    </div>
                    {/* Input Select 11 mobile */}
                    <div className="w-full  flex md:hidden flex-col gap-y-[5px] ">
                      <div className="flex items-center">
                        <span className="text-[12px] flex flex-wrap whitespace-nowrap md:text-base font-AeonikProRegular">
                          Возрастная категория
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <div className="w-full h-fit flex items-center justify-between gap-x-2">
                        <input
                          type="text"
                          name="age"
                          placeholder="Мин"
                          value={state?.min_Age_Category}
                          onChange={(e) => setState({ ...state, min_Age_Category: e.target.value })}
                          className="inputStyle outline-none w-[40%] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                        />
                        <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                        <input
                          type="text"
                          name="age"
                          placeholder="Мах"
                          value={state?.max_Age_Category}
                          onChange={(e) => setState({ ...state, max_Age_Category: e.target.value })}
                          className="inputStyle outline-none w-[40%] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    {state.openDropModalButton ? (
                      <div className="w-full hidden md:flex items-center flex-wrap gap-3 ">
                        <HeadWearAdd title={productsData?.categories} typeId={state?.type_Id} handleCallBack={CallBackHeadWear} />
                        <OutWearAdd title={productsData?.categories} typeId={state?.type_Id} handleCallBack={CallBackOutWear} />
                        <UnderAddWear title={productsData?.categories} typeId={state?.type_Id} handleCallBack={CallBackUnderWear} />
                        <ShoesAdd title={productsData?.categories} typeId={state?.type_Id} handleCallBack={CallBackShoesWear} />
                        <AccessoriesAdd title={productsData?.categories} typeId={state?.type_Id} handleCallBack={CallBackAccessoriesWear} />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="w-full md:w-[30%] h-fit flex md:flex-col flex-row  justify-center gap-x-4 ">
                  <div className="hidden md:flex items-center  justify-start mb-[5px]">
                    <span className="text-base font-AeonikProRegular">Фото</span>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <div className="w-[300px] md:w-full h-[350px] flex items-center justify-center ">
                    <button
                      type="button"
                      className="h-full w-full flex items-center justify-center "
                    >
                      <label
                        htmlFor="DataImg1"
                        className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center  text-textBlueColor "
                      >
                        <input
                          className="hidden"
                          id="DataImg1"
                          type="file"
                          onChange={handleLocationImageOne}
                          accept=" image/*"
                        />
                        {!state?.pictureBgView1 && (
                          <div className="w-full h-full flex  bg-photoBg items-center justify-center border border-dashed rounded-lg">
                            <span className="leading-none flex items-center text-textBlueColor border-b border-textBlueColor font-AeonikProMedium">
                              Выберите фото   <span className="ml-[5px]">
                                <StarLabel />
                              </span>
                            </span>
                          </div>
                        )}
                        {state?.pictureBgView1 && (
                          <img
                            src={state?.pictureBgView1}
                            alt="backImg"
                            className="w-full h-full border border-searchBgColor object-contain rounded-lg"
                          />
                        )}
                      </label>
                    </button>
                  </div>
                  <div className="w-[90px] md:w-full flex flex-col md:flex-row items-center justify-between gap-y-2 gap-x-[10px] md:mt-[10px]">
                    <div className="w-full h-1/3 md:h-[73px] md:w-1/3 flex flex-col items-center justify-center ">
                      <button
                        type="button"
                        className="h-full w-full flex items-center justify-center "
                      >
                        <label
                          htmlFor="DataImg1"
                          className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                        >
                          <input
                            className="hidden"
                            id="DataImg1"
                            type="file"
                            onChange={handleLocationImage2}
                            accept=" image/*"
                          />
                          {!state?.pictureBgView1 && (
                            <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                              <DownloadIcon />
                              <div className="text-[11px] text-textLightColor mt-[5px]">
                                (необязательно)
                              </div>
                            </div>
                          )}
                          {state?.pictureBgView1 && (
                            <img
                              src={state?.pictureBgView1}
                              alt="backImg"
                              className="w-full h-full object-contain border border-searchBgColor rounded-lg"
                            />
                          )}
                        </label>
                      </button>
                    </div>
                    <div className="w-full h-1/3 md:h-[73px] md:w-1/3 flex flex-col items-center justify-center">
                      <button
                        type="button"
                        className="h-full w-full flex items-center justify-center "
                      >
                        <label
                          htmlFor="DataImg1"
                          className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                        >
                          <input
                            className="hidden"
                            id="DataImg1"
                            type="file"
                            onChange={handleLocationImage3}
                            accept=" image/*"
                          />
                          {!state?.pictureBgView1 && (
                            <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                              <DownloadIcon />
                              <div className="text-[11px] text-textLightColor mt-[5px]">
                                (необязательно)
                              </div>
                            </div>
                          )}
                          {state?.pictureBgView1 && (
                            <img
                              src={state?.pictureBgView1}
                              alt="backImg"
                              className="w-full h-full object-contain border border-searchBgColor rounded-lg"
                            />
                          )}
                        </label>
                      </button>
                    </div>
                    <div className="w-full h-1/3 md:h-[73px] md:w-1/3 flex flex-col items-center justify-center ">
                      <button
                        type="button"
                        className="h-full w-full flex items-center justify-center "
                      >
                        <label
                          htmlFor="DataImg1"
                          className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
                        >
                          <input
                            className="hidden"
                            id="DataImg1"
                            type="file"
                            onChange={handleLocationImage4}
                            accept=" image/*"
                          />
                          {!state?.pictureBgView1 && (
                            <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                              <DownloadIcon />
                              <div className="text-[11px] whitespace-normal text-center text-textLightColor mt-[5px]">
                                (необязательно)
                              </div>
                            </div>
                          )}
                          {state?.pictureBgView1 && (
                            <img
                              src={state?.pictureBgView1}
                              alt="backImg"
                              className="w-full h-full object-contain border border-searchBgColor rounded-lg"
                            />
                          )}
                        </label>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:relative w-full  md:mt-[200px]">
                <div className="flex md:hidden items-center justify-between mb-[40px]">
                  <div className="w-1/3 h-[1px] bg-borderColor"></div>
                  <div className="w-1/3 flex items-center justify-around">
                    <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full	">
                      <span className="w-2 h-2 rounded-full bg-textBlueColor block "></span>
                    </button>
                    <span className="w-1/2 h-[1px]  bg-textBlueColor "></span>
                    <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full"></button>
                  </div>
                  <div className="w-1/3 h-[1px] bg-borderColor"></div>
                </div>

                <button
                  type="button"
                  // to="/products/add-detail"
                  onClick={() => setDressInfo({ ...dressInfo, nextPageShowForm: false })}
                  className="w-full h-[42px] md:h-[45px] flex items-center justify-center md:w-fit md:absolute active:scale-95 md:right-3 md:bottom-3 md:px-[50px] py-3 border border-textBlueColor bg-textBlueColor text-white rounded-lg text-base md:text-lg font-AeonikProMedium"
                >
                  Продолжить
                </button>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="relative w-full">
          <TextFormAdd onClick={LocationAddSubmit} handlCallBack={CallBackTextForm} />
        </div>
      }
    </div >
  );
};

export default AddingProduct;
