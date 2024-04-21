import { Select, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  AddIconsCircle1,
  ArrowRightIcon,
  CloseAnswer,
  DownloadIcon,
  InputCheckedTrueIcons,
  LoaderIcon,
  MenuCloseIcons,
  SearchIcon,
  StarLabel,
} from "../../../../assets/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import HeadWearAdd from "./Details/HeadWear/HeadWearAdd";
import OutWearAdd from "./Details/OutWear/OutWearAdd";
import AccessoriesAdd from "./Details/Accessories/AccessoriesAdd";
import ShoesAdd from "./Details/Shoes/ShoesAdd";
import UnderAddWear from "./Details/UnderAddWear/UnderAddWear";
import { useHttp } from "../../../../hook/useHttp";
import { dressMainData } from "../../../../hook/ContextTeam";
import TextFormAdd from "./TextFormGroup/TextFormAdd";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingForSeller from "../../../Loading/LoadingFor";
import imageCompression from "browser-image-compression";
import AddSizeForMobile from "./Details/AddSizeForMobile/AddSizeForMobile";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";
import { ShopList } from "../../../../hook/ShopList";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../Authentication/AxiosIntance";


const { Option } = Select;
const url = "https://api.dressme.uz/api/seller";

const AddingProduct = () => {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [shopList, setShopList] = useContext(ShopList)

  const navigate = useNavigate();
  const { t } = useTranslation("product");
  const [languageDetector] = useContext(LanguageDetectorDress);

  const [clothingCategoryModal, setClothingCategoryModal] = useState(false)
  const [searchList, setSearchList] = useState(null)
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
    isCheckValid: false,
    errorList: "",
    errorListMessage: "",
    type_Id: "",
    // --------------
    pictureBgFile1: null,
    pictureBgView1: null,
    pictureBgFile2: null,
    pictureBgView2: null,
    pictureBgFile3: null,
    pictureBgView3: null,
    pictureBgFile4: null,
    pictureBgView4: null,
    // ---------------state?.section_Id
    shopId: null,
    shopLocationId: "",
    section_Id: [],
    sub_Section_Id: [],
    season_Id: [],
    color_Id: "",
    gender_Id: null,
    min_Age_Category: "",
    max_Age_Category: "",
    sku: "",
    category_Id: "",
    filterTypeId: "",
    producer_Id: "",
    photos1: [],
    amount: "",
    age: "",
    price: "",
    discount_percent: "",
    discount_price: "",

    // -----Details-----
    textListOfFormList: "",
    headWearList: "",
    outWearList: "",
    underWearList: "",
    shoesList: "",
    AccessoriesList: "",
    titleUz: "",
    titleRu: "",
    selectedUz: [],
    PathnameToken: "",
    // ------
    sendingLoader: false,
  });
  const [genderFilterId, setGenderFilterId] = useState(null)
  const [section_Id, setSection_Id] = useState([])
  const [subSection_Id, setSubSection_Id] = useState([])
  const [season_Id, setSeason_Id] = useState([])
  const [attribSubSection, setAttribSubSection] = useState([])

  async function handleLocationImage1(event) {
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

  async function handleLocationImage2(event) {
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
        pictureBgFile2: compressedFile,
        pictureBgView2: URL.createObjectURL(event.target.files[0]),
      });
    } catch (error) {
      throw new Error(error || "something wrong");

    }
  }

  async function handleLocationImage3(event) {
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

  async function handleLocationImage4(event) {
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
        pictureBgFile4: compressedFile,
        pictureBgView4: URL.createObjectURL(event.target.files[0]),
      });
    } catch (error) {
      throw new Error(error || "something wrong");

    }
  }

  function CallBackHeadWear(childData) {
    setState({
      ...state,
      headWearList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    });
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
    });

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
    });

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
    });
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
    });

  }

  function randomCode(len) {
    let p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    setState({
      ...state,
      sku: [...Array(len)].reduce(
        (a) => a + p[~~(Math.random() * p.length)],
        ""
      ),
    });
  }



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
      state?.SubClothingSection || clothingCategoryModal
    ) {
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
    clothingCategoryModal
  ]);

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
  useQuery(['seller_product_getInfo_addingProduct'], () => fetchDataShopLocation(customHeaders), {
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

  const toggleDropModalButton = () => {
    setState({ ...state, openDropModalButton: !state.openDropModalButton });
  };
  const handleChangeSubSection = (e, attribute2) => {
    attribute2?.map(item => {
      setAttribSubSection((attribSubSection) => [...attribSubSection, (item?.attribute2)])
    })
    setSubSection_Id(e)
  };

  const handleChangeSection = (e) => {
    setSection_Id(e)
  };
  // --------------------------------------------------------------------------------------
  const newArray111 = [];

  dressInfo?.getProductInfo?.sections
    ?.filter((e) => section_Id?.includes(e?.id))
    ?.map((data) => {
      return data?.sub_sections?.map((item) => {
        newArray111.push(item);
      });
    });

  const [new2, setNew2] = useState([])
  const [newArray1, setNewArray1] = useState([])
  const [newArrayCompine, setNewArrayCompine] = useState([]);
  const [newArray, setNewArray] = useState([]);
  useEffect(() => {
    setNewArray1([])
    setNew2([])
    dressInfo?.getProductInfo?.sections?.map(item => {
      item?.sub_sections?.filter(e => subSection_Id?.length > 0 ? subSection_Id?.includes(e?.id) : e)?.map(item => {
        if (section_Id?.includes(Number(item?.section_id))) {
          if (!newArray1) {
            setNewArray1(newArray1 => [...newArray1, item])
          } else {
            setNewArray1(newArray1 => [...newArray1, item])
          }
        }
      })
      item?.sub_sections?.filter(e => !attribSubSection?.includes(e?.section_id))?.map(data => {
        if (section_Id?.includes(Number(data?.section_id))) {
          if (!new2) {
            setNew2(new2 => [...new2, data])
          } else {
            setNew2(new2 => [...new2, data])
          }
        }
      })
    })

  }, [section_Id, dressInfo?.getProductInfo, subSection_Id, attribSubSection])


  useEffect(() => {
    const combinedArray = [...newArray1, ...new2];
    setNewArrayCompine(combinedArray);
  }, [newArray1, new2]);

  let UniquArr = new Set()
  useEffect(() => {
    let data = newArrayCompine?.reduce((uniqueUser, user) => {
      if (!UniquArr.has(user.id)) {
        UniquArr.add(user.id)
        return [...uniqueUser, user]
      }
      return uniqueUser
    }, [])
    setNewArray(data)
  }, [newArrayCompine])

  useEffect(() => {
    setAttribSubSection([])
    dressInfo?.getProductInfo?.sections?.map(item => {
      item?.sub_sections?.filter(e => subSection_Id?.includes(e?.id))?.map(values => {
        setAttribSubSection((attribSubSection) => [...attribSubSection, values?.section_id])
      })
    })

    // setAttribSubSection(Array.from(new Set(attribSubSection.map(item => item))))


  }, [subSection_Id])

  // --------------------------------------------------------------------------------------

  const onSearch = (value) => {
  };
  const onSearchSection = (value) => {
  };
  const onSearchSubSection = (value) => {
  };

  const onSearchType = (value) => {
  };

  const onSearchCountry = (value) => {
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

  const LocationAddSubmit = () => {
  };
  const { id } = useParams();
  const newId = id?.replace(":", "");
  const CallBackTextForm = (childData) => {
    setState({ ...state, errorListMessage: "", sendingLoader: true });
    let form = new FormData();
    form.append("shop_id", newId ? newId : state?.shopId);
    form.append("shop_location_id", Number(dressInfo?.locationIdAddProduct));
    section_Id?.map((e, index) => {
      form.append("section_ids[]", section_Id[index]);
    });
    subSection_Id?.map((e, index) => {
      form.append("sub_section_ids[]", subSection_Id[index]);
    });
    season_Id?.map((e, index) => {
      form.append("season_ids[]", season_Id[index]);
    });

    form.append("color_id", state?.color_Id);
    form.append("gender_id", state?.gender_Id);
    form.append("min_age_category", state?.min_Age_Category);
    form.append("max_age_category", state?.max_Age_Category);
    form.append("sku", state?.sku);
    form.append("category_id", parseFloat(state?.category_Id));
    form.append("type_id", parseFloat(state?.filterTypeId));
    form.append("producer_id", state?.producer_Id);
    state?.pictureBgFile1 && form.append("photos[]", state?.pictureBgFile1);
    state?.pictureBgFile2 && form.append("photos[]", state?.pictureBgFile2);
    state?.pictureBgFile3 && form.append("photos[]", state?.pictureBgFile3);
    state?.pictureBgFile4 && form.append("photos[]", state?.pictureBgFile4);
    // detailsForAll
    form.append("price", state?.price);
    state?.amount && form.append("amount", state?.amount);
    state?.age && form.append("age", Number(state?.age));
    state?.discount_percent &&
      form.append("discount_percent", state?.discount_percent); //no R
    state?.discount_price &&
      form.append("discount_price", state?.discount_price); //no R
    // textListOfFormList
    form.append("name_uz", childData?.name_Uz);
    form.append("name_ru", childData?.name_Ru);
    form.append("quality_uz", childData?.quality_Uz);
    form.append("quality_ru", childData?.quality_Ru);
    childData?.description_Uz &&
      form.append("description_uz", childData?.description_Uz);
    childData?.description_Ru &&
      form.append("description_ru", childData?.description_Ru);
    childData?.composition_Uz &&
      form.append("composition_uz", childData?.composition_Uz); //no R
    childData?.composition_Ru &&
      form.append("composition_ru", childData?.composition_Ru); //no R
    childData?.brand_id && form.append("brand_id", childData?.brand_id); //no R
    // HeadWear
    form.append("one_size", state?.headWearList?.oneSize ? 1 : 0);
    state?.headWearList?.minHeadGirth &&
      form.append("min_head_girth", state?.headWearList?.minHeadGirth);
    state?.headWearList?.maxHeadGirth &&
      form.append("max_head_girth", state?.headWearList?.maxHeadGirth);
    // OutWear
    state?.outWearList?.outWearLetterSize &&
      form.append("outwear_letter_size", state?.outWearList?.outWearLetterSize);
    state?.outWearList?.minOutWearSize &&
      form.append("min_outwear_size", state?.outWearList?.minOutWearSize);
    state?.outWearList?.maxOutWearSize &&
      form.append("max_outwear_size", state?.outWearList?.maxOutWearSize);
    state?.outWearList?.minChestGirth &&
      form.append("min_chest_girth", state?.outWearList?.minChestGirth);
    state?.outWearList?.maxChestGirth &&
      form.append("max_chest_girth", state?.outWearList?.maxChestGirth);
    state?.outWearList?.minOutWearWaistGirth &&
      form.append(
        "min_outwear_waist_girth",
        state?.outWearList?.minOutWearWaistGirth
      );
    state?.outWearList?.maxOutWearWaistGirth &&
      form.append(
        "max_outwear_waist_girth",
        state?.outWearList?.maxOutWearWaistGirth
      );
    state?.outWearList?.minOutWearHipGirth &&
      form.append(
        "min_outwear_hip_girth",
        state?.outWearList?.minOutWearHipGirth
      );
    state?.outWearList?.maxOutWearHipGirth &&
      form.append(
        "max_outwear_hip_girth",
        state?.outWearList?.maxOutWearHipGirth
      );
    // UnderWear
    state?.underWearList?.underWearLetterSize &&
      form.append(
        "underwear_letter_size",
        state?.underWearList?.underWearLetterSize
      );
    state?.underWearList?.minHeight &&
      form.append("min_height", state?.underWearList?.minHeight);
    state?.underWearList?.maxHeight &&
      form.append("max_height", state?.underWearList?.maxHeight);
    state?.underWearList?.minUnderWearSize &&
      form.append("min_underwear_size", state?.underWearList?.minUnderWearSize);
    state?.underWearList?.maxUnderWearSize &&
      form.append("max_underwear_size", state?.underWearList?.maxUnderWearSize);
    state?.underWearList?.minUnderwearWaistGirth &&
      form.append(
        "min_underwear_waist_girth",
        state?.underWearList?.minUnderwearWaistGirth
      );
    state?.underWearList?.maxUnderwearWaistGirth &&
      form.append(
        "max_underwear_waist_girth",
        state?.underWearList?.maxUnderwearWaistGirth
      );
    state?.underWearList?.minUnderWearHipGirth &&
      form.append(
        "min_underwear_hip_girth",
        state?.underWearList?.minUnderWearHipGirth
      );
    state?.underWearList?.maxUnderWearHipGirth &&
      form.append(
        "max_underwear_hip_girth",
        state?.underWearList?.maxUnderWearHipGirth
      );
    // FooterSize
    state?.shoesList?.footWearSize &&
      form.append("footwear_size", state?.shoesList?.footWearSize);
    state?.shoesList?.minFootLength &&
      form.append("min_foot_length", state?.shoesList?.minFootLength);
    state?.shoesList?.maxFootLength &&
      form.append("max_foot_length", state?.shoesList?.maxFootLength);
    // Accessory
    state?.AccessoriesList?.accessoryLetterSize &&
      form.append(
        "accessory_letter_size",
        state?.AccessoriesList?.accessoryLetterSize
      );
    state?.AccessoriesList?.accessorySize &&
      form.append("accessory_size", state?.AccessoriesList?.accessorySize);
    state?.AccessoriesList?.legnthAcc &&
      form.append("length", state?.AccessoriesList?.legnthAcc);
    state?.AccessoriesList?.widthAcc &&
      form.append("width", state?.AccessoriesList?.widthAcc);

    return fetch(`${url}/products/store`, {
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
          setState({ ...state, sendingLoader: false });
          if (res?.errors === true) {
            setState({ ...state, errorListMessage: res?.message, price: null });
          } else {
            setState({ ...state, errorList: res?.errors, price: null });
          }
          setDressInfo({
            ...dressInfo,
            nextPageShowForm: true,
          });
        } else if (res?.message) {
          setState({ ...state, sendingLoader: false, price: null });
          navigate("/products/location");
          setDressInfo({
            ...dressInfo,
            nextPageShowForm: true,
            ProductFilterType: "",
          });
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
        }
      })
      .catch((err) => {
        setDressInfo({
          ...dressInfo,
          nextPageShowForm: true,
        })
        setState({ ...state, sendingLoader: false, price: null });
        throw new Error(err || "something wrong");
      });
  };
  const handleNextPage = () => {
    setState({ ...state, isCheckValid: true });
    if (newId || state?.shopId) {

      if (
        Number(dressInfo?.locationIdAddProduct) &&
        section_Id?.length > 0 &&
        state?.color_Id &&
        state?.gender_Id &&
        state?.min_Age_Category &&
        state?.max_Age_Category &&
        state?.sku &&
        state?.type_Id &&
        state?.price &&
        state?.filterTypeId &&
        state?.producer_Id &&
        season_Id &&
        state?.pictureBgFile1
      ) {
        if (newArray?.length > 0 && subSection_Id?.length > 0) {
          setDressInfo({ ...dressInfo, nextPageShowForm: false });
          setState({ ...state, isCheckValid: false });
        }
        if (newArray?.length === 0 && subSection_Id?.length === 0) {
          setDressInfo({ ...dressInfo, nextPageShowForm: false });
          setState({ ...state, isCheckValid: false });
        }
      }
    }
  };


  useEffect(() => {
    if (!newArray?.length) {
      setSubSection_Id([])
    }
  }, [newArray?.length]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [dressInfo?.nextPageShowForm]);

  const location = useLocation();
  const pathname = window.location.pathname;
  useEffect(() => {
    if (pathname !== "/products")
      setState({
        ...state,
        PathnameToken: pathname.replace("/products/location/add/:", ""),
      });
  }, [location.pathname]);
  useEffect(() => {
    if (!dressInfo?.locationIdAddProduct) {
      navigate(-1);

    }
  }, [dressInfo?.locationIdAddProduct]);

  // ---------Mobile Device--------
  const handleChangeSectionMobile = (e) => {
    if (section_Id?.length === 0) {
      setSection_Id(section_Id => [...section_Id, e])
    }
    if (section_Id?.length > 0 && !section_Id?.includes(e)) {
      setSection_Id(section_Id => [...section_Id, e])
    }
  }
  const handleChangeSectionDeleteMobile = (e) => {
    if (section_Id?.length > 0 && section_Id?.includes(e)) {
      setSection_Id(section_Id?.filter((v) => v !== e))
    }
  }
  const handleChangeSubSectionMobile = (e, section) => {
    if (!attribSubSection?.includes(section)) {
      setAttribSubSection((attribSubSection) => [...attribSubSection, section])
    }
    if (subSection_Id?.length === 0) {
      setSubSection_Id(subSection_Id => [...subSection_Id, e])
    }
    if (subSection_Id?.length > 0 && !subSection_Id?.includes(e)) {
      setSubSection_Id(subSection_Id => [...subSection_Id, e])
    }
  }
  const handleChangeSubSectionDeleteMobile = (e, section) => {
    if (subSection_Id?.length > 0 && subSection_Id?.includes(e)) {
      setSubSection_Id(subSection_Id?.filter((v) => v !== e))
      setAttribSubSection(attribSubSection?.filter((v) => v !== section))

    }
  }

  const onHandleChangeSeasonMobile = (e) => {
    if (season_Id?.length === 0) {
      setSeason_Id(season_Id => [...season_Id, e])
    }
    if (season_Id?.length > 0 && !season_Id?.includes(e)) {
      setSeason_Id(season_Id => [...season_Id, e])
    }
  }
  const onHandleChangeSeasonDeleteMobile = (e) => {
    if (season_Id?.length > 0 && season_Id?.includes(e)) {
      setSeason_Id(season_Id?.filter((v) => v !== e))
    }
  }
  const selectGenderId = (id) => {
    if (!state?.gender_Id) {
      setState({ ...state, gender_Id: id, })
    }
    if (state?.gender_Id !== id) {
      setState({ ...state, gender_Id: id, })
    }
  }
  const ClearGenderSelected = (id) => {
    if (state?.gender_Id === id) {
      setState({ ...state, gender_Id: null, })
    }
  }

  const selectTypeById = (filter, type_Id) => {
    if (!state?.filterTypeId) {
      setState({ ...state, filterTypeId: filter, type_Id: type_Id })
    }
    if (state?.filterTypeId !== filter) {
      setState({ ...state, filterTypeId: filter, type_Id: type_Id })
    }
  }
  const ClearSelectTypeById = (filter, type_Id) => {

    if (state?.filterTypeId === filter) {
      setState({ ...state, filterTypeId: null, type_Id: null })
    }
  }
  const selectProduceId = (id) => {
    if (!state?.producer_Id) {
      setState({ ...state, producer_Id: id })
    }
    if (state?.producer_Id !== id) {
      setState({ ...state, producer_Id: id })
    }
  }
  const ClearProducerById = (id) => {
    if (state?.producer_Id === id) {
      setState({ ...state, producer_Id: null })
    }
  }

  useEffect(() => {
    setSearchList('')
  }, [
    state?.ClothingSection,
    state?.SubClothingSection,
    state?.DressTypeModal,
    clothingCategoryModal,
    state?.openSelect,
    state?.MakeCountryModal
  ])

  useEffect(() => {
    if (newId) {
      shopList?.shops?.filter(e => Number(e?.id) === Number(newId))?.map(item => {
        setGenderFilterId(item?.gender_id)
      })
    }
    if (!newId && state?.shopId) {
      shopList?.shops?.filter(e => e?.id === state?.shopId)?.map(item => {
        setGenderFilterId(item?.gender_id)
      })
    }

    // return () => {
    //   setDressInfo({ ...dressInfo, locationIdAddProduct: null })
    // }
  }, [state?.shopId])

  return (
    <div className="w-full h-fit ">
      {state?.sendingLoader ? (
        <LoadingForSeller />
      ) : (
        <div>
          <div className="flex items-center grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2 mt-5 ">
            {state?.errorListMessage && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-[16px] text-textRedColor font-AeonikProRegular">
                  {state?.errorListMessage}
                </span>
              </div>
            )}
            {state?.errorList?.shop_id && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APmarket")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.shop_id[0]}
                </span>
              </div>
            )}
            {state?.errorList?.shop_location_id && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APlocation")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.shop_location_id[0]}
                </span>
              </div>
            )}
            {state?.errorList?.section_ids && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APclothesSection")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.section_ids[0]}
                </span>
              </div>
            )}
            {state?.errorList?.season_ids && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APclothesseason")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.season_ids[0]}
                </span>
              </div>
            )}
            {state?.errorList?.color_id && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APcolor")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.color_id[0]}
                </span>
              </div>
            )}
            {state?.errorList?.gender_id && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APgender")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.gender_id[0]}
                </span>
              </div>
            )}
            {state?.errorList?.min_age_category && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APageMin")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.min_age_category[0]}
                </span>
              </div>
            )}
            {state?.errorList?.max_age_category && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APageMax")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.max_age_category[0]}
                </span>
              </div>
            )}
            {state?.errorList?.category_id && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APclothesCategory")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.category_id[0]}
                </span>
              </div>
            )}
            {state?.errorList?.type_id && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APtype")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.type_id[0]}
                </span>
              </div>
            )}
            {state?.errorList?.producer_Id && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APmanufacturer")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.producer_Id[0]}
                </span>
              </div>
            )}
            {state?.errorList?.amount && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APquantity")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.amount[0]}
                </span>
              </div>
            )}
            {state?.errorList?.price && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APprice")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.price[0]}
                </span>
              </div>
            )}
            {state?.errorList?.photos && (
              <div className="w-full  flex items-center gap-x-2 ">
                <span className="text-[12px] md:text-base font-AeonikProRegular">
                  {t("APselectPhoto")}:
                </span>
                <span className="text-[12px] md:text-[14px] text-textRedColor font-AeonikProRegular">
                  {state?.errorList?.photos[0]}
                </span>
              </div>
            )}
          </div>
          <div
            className={`${dressInfo?.nextPageShowForm ? "flex" : "hidden"
              } relative w-full md:px-0  items-center justify-between mb-[50px] my-6 md:my-[50px] focus:bg-textBlueColor `}
          >
            <section
              onClick={() => {
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
                setClothingCategoryModal(false)
              }
              }
              className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
                ${state?.ClothingSection ||
                  state?.SubClothingSection ||
                  state?.DressSeason ||
                  state?.Colour ||
                  state?.GenderModal ||
                  state?.DressTypeModal ||
                  clothingCategoryModal ||
                  state?.showColor ||
                  state?.openSelect ||
                  state?.MakeCountryModal
                  ? ""
                  : "hidden"
                }`}
            ></section>

            {state?.showColor && (
              <div className={`max-w-[440px] md:max-w-[576px] w-full fixed z-[221]  left-1/2 right-1/2 md:top-[50%] translate-x-[-50%] md:translate-y-[-50%]  h-fit flex items-center  justify-center mx-auto ${state?.showColor
                ? " bottom-0 md:flex"
                : "md:hidden bottom-[-800px] z-[-10]"
                }`}>
                <div className="relative z-[223]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-t-md md:rounded-md shadow-lg">
                  <div
                    className={`flex items-center justify-between border-b border-searchBgColor pb-3`}
                  >
                    <span className="text-black text-[14px] md:text-lg not-italic font-AeonikProRegular leading-5">
                      {t("APselectColor")}
                    </span>
                    <button
                      className="py-2"
                      type=""
                      onClick={() => setState({ ...state, showColor: false })}
                    >
                      <MenuCloseIcons colors={"#a1a1a1"} />
                    </button>
                  </div>
                  <div className="py-4 gap-x-2 gap-y-4 grid gap-4 grid-cols-6">
                    {dressInfo?.getProductInfo?.colors.map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center "
                        >
                          <div
                            key={data?.id}
                            onClick={() =>
                              setState({ ...state, color_Id: data?.id })
                            }
                            style={{ background: `${data.hex}` }}
                            className={`rounded-full md:rounded-[12px] flex items-center justify-center w-[25px] h-[25px]  md:w-[65px] md:h-[40px] bg-[${data.hex
                              }] cursor-pointer ${data?.id == 2
                                ? "border border-setTexOpacity flex items-center justify-center"
                                : ""
                              }
                     `}
                          >
                            {data?.id === state?.color_Id &&
                              state?.color_Id !== 2 ? (
                              <InputCheckedTrueIcons colors={"#fff"} />
                            ) : null}

                            {state?.color_Id === 2 &&
                              data?.id === state?.color_Id ? (
                              <InputCheckedTrueIcons colors={"#000"} />
                            ) : null}
                          </div>
                          <span
                            className={`text-black text-center text-[10px] md:text-xs not-italic font-AeonikProRegular`}
                          >
                            {languageDetector?.typeLang === "ru" && data?.name_ru}
                            {languageDetector?.typeLang === "uz" && data?.name_uz}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-end  gap-x-5">
                    {state?.color_Id && (
                      <button
                        onClick={() =>
                          setState({ ...state, color_Id: "", showColor: false })
                        }
                        className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-[14px] md:text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"
                      >
                        {t("APdisable")}
                      </button>
                    )}
                    <button
                      onClick={() => setState({ ...state, showColor: false })}
                      className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-[14px] md:text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1"
                    >
                      {t("PRready")}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <section
              className={` max-w-[440px] md:max-w-[700px] z-[201] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[25px] rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.openSelect
                ? " bottom-0 md:flex"
                : "md:hidden bottom-[-800px] z-[-10]"
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
                  {t("APattacLocation")}
                </p>
              </div>
              <div className="w-full px-[10px] py-[30px] flex flex-col gap-y-[10px]  ">
                {dressInfo?.getProductInfo?.shops
                  ?.filter((e) => state?.shopId ? e?.id === state?.shopId : e)
                  .map((item) => {
                    return item?.shop_locations?.map((data) => {
                      return (
                        <button
                          onClick={() => {
                            setState({
                              ...state,
                              // shopLocationId: data?.id,
                              openSelect: false,
                            })
                            setDressInfo({ ...dressInfo, locationIdAddProduct: data?.id })
                          }
                          }
                          key={data?.id}
                          className={`w-full py-[10px] px-[20px] flex items-center justify-between rounded-[8px] ${Number(data?.id) ===
                            Number(dressInfo?.locationIdAddProduct)
                            ? "bg-LocationSelectBg"
                            : "bg-white"
                            } hover:bg-LocationSelectBg focus:bg-LocationSelectBg`}
                        >
                          <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                            {" "}
                            {data?.address}
                          </span>
                          {Number(data?.id) === Number(dressInfo?.locationIdAddProduct) && (
                            <BiCheckDouble size={25} color={"#007dca"} />
                          )}
                        </button>
                      );
                    });
                  })}
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
              <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
                <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                  <p className="text-base font-AeonikProMedium"> {t("APsectionProduct")}</p>
                  <button onClick={() => setState({ ...state, ClothingSection: false })}>
                    <CloseAnswer colors={"#000"} />
                  </button>
                </section>
                <section className="w-full h-[400px] px-4 flex flex-col items-center">
                  <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                    <form className='w-full flex flex-col items-center'>
                      <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                        <input
                          type="text"
                          name='clothingTypes'
                          placeholder={t("APsearch")}
                          value={searchList}
                          onChange={(e) => setSearchList(e?.target?.value)}
                          className='w-full pr-3 outline-none' />
                        <SearchIcon />
                      </div>
                      <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                        {dressInfo?.getProductInfo?.sections?.filter((e) =>
                          searchList ? languageDetector?.typeLang === "ru" ? e?.name_ru?.toLowerCase()?.includes(searchList?.toLowerCase()) :
                            e?.name_uz?.toLowerCase()?.includes(searchList?.toLowerCase()) : e
                        )?.map((item) => {
                          return (
                            <div
                              onClick={() => handleChangeSectionMobile(item?.id)}
                              key={item?.id}
                              className={`w-full ${section_Id?.includes(item?.id) ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                              {languageDetector?.typeLang === "ru" && item?.name_ru}
                              {languageDetector?.typeLang === "uz" && item?.name_uz}
                              {section_Id?.includes(item?.id) &&
                                <span
                                  onClick={() => handleChangeSectionDeleteMobile(item?.id)}
                                >
                                  <MenuCloseIcons colors={'#a1a1a1'} />
                                </span>}
                            </div>
                          );
                        })}
                      </div>
                    </form>
                  </div>
                </section>
              </div>
            </section>
            {/*Sub Clothing Section */}
            <section
              className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.SubClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
                }`}
            >
              {/*Sub Clothing Section */}
              <section
                className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden  ${state?.SubClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
                  }`}
              >
                <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
                  <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                    <p className={`text-base font-AeonikProMedium `}>{t("APsubSectionProduct")}</p>
                    <button onClick={() => setState({ ...state, SubClothingSection: false })}>
                      <CloseAnswer colors={"#000"} />
                    </button>
                  </section>
                  <section className="w-full h-[400px] px-4 flex flex-col items-center">
                    <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                      <form className='w-full flex flex-col items-center'>
                        <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                          <input type="text"
                            value={searchList}
                            onChange={(e) => setSearchList(e?.target?.value)}
                            name='clothingTypes' placeholder={t("APsearch")} className='w-full pr-3 outline-none' />
                          <SearchIcon />
                        </div>
                        <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                          {newArray?.filter((e) =>
                            searchList ? languageDetector?.typeLang === "ru" ? e?.name_ru?.toLowerCase()?.includes(searchList?.toLowerCase()) :
                              e?.name_uz?.toLowerCase()?.includes(searchList?.toLowerCase()) : e
                          )?.map((item) => {
                            return (
                              <div
                                onClick={() => handleChangeSubSectionMobile(item?.id, item?.section_id)}
                                key={item?.id} className={`w-full ${subSection_Id?.includes(item?.id) ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                                {dressInfo?.getProductInfo?.sections?.filter(e => e?.id == item?.section_id)?.map((data, index) => {
                                  return <div key={index} className=" flex items-center">
                                    <p className="flex  items-center font-AeonikProRegular">
                                      {languageDetector?.typeLang === "ru" && item?.name_ru}
                                      {languageDetector?.typeLang === "uz" && item?.name_uz} </p>
                                    <p className="text-[12px]  flex items-center  ml-[8px] text-[#b5b5b5] font-AeonikProRegular">(
                                      {languageDetector?.typeLang === "ru" && data?.name_ru}
                                      {languageDetector?.typeLang === "uz" && data?.name_uz})</p>
                                  </div>
                                })}
                                {subSection_Id?.includes(item?.id) &&
                                  <span
                                    onClick={() => handleChangeSubSectionDeleteMobile(item?.id, item?.section_id)}
                                  ><MenuCloseIcons colors={'#a1a1a1'} /></span>}
                              </div>
                            );
                          })}
                        </div>
                      </form>
                    </div>
                  </section>
                </div>
              </section>
            </section>
            {/*DressSeason */}
            <section
              className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressSeason ? "bottom-0" : "bottom-[-800px] z-0"
                }`}
            >
              <section
                className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressSeason ? "bottom-0" : "bottom-[-800px] z-0"
                  }`}
              >
                <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
                  <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                    <p className="text-base font-AeonikProMedium">{t("APseasonProduct")}</p>
                    <button onClick={() => setState({ ...state, DressSeason: false })}>
                      <CloseAnswer colors={"#000"} />
                    </button>
                  </section>
                  <section className="w-full h-[400px] px-4 flex flex-col items-center">
                    <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                      <div className='w-full flex flex-col items-center'>

                        <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                          {dressInfo?.getProductInfo?.seasons?.map((item) => {
                            return (
                              <div onClick={() => onHandleChangeSeasonMobile(item?.id)} key={item?.id} className={`w-full ${season_Id?.includes(item?.id) ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                                {languageDetector?.typeLang === "ru" && item?.name_ru}
                                {languageDetector?.typeLang === "uz" && item?.name_uz}
                                {season_Id?.includes(item?.id) &&
                                  <span
                                    onClick={() => onHandleChangeSeasonDeleteMobile(item?.id)}
                                  ><MenuCloseIcons colors={'#a1a1a1'} /></span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </section>
            {/*GenderModal */}
            <section
              className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.GenderModal ? "bottom-0" : "bottom-[-800px] z-0"
                }`}
            >
              <section
                className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.GenderModal ? "bottom-0" : "bottom-[-800px] z-0"
                  }`}
              >
                <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
                  <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                    <p className="text-base font-AeonikProMedium"> {t("APgender")}</p>
                    <button onClick={() => setState({ ...state, GenderModal: false })}>
                      <CloseAnswer colors={"#000"} />
                    </button>
                  </section>
                  <section className="w-full h-[400px] px-4 flex flex-col items-center">
                    <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                      <div className='w-full flex flex-col items-center'>

                        <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                          {dressInfo?.getProductInfo?.gender?.filter(e => Number(genderFilterId) == 3 ? e : (e?.id == genderFilterId || e?.id == 3))?.map((item) => {
                            return (
                              <div onClick={() => selectGenderId(item?.id)} key={item?.id} className={`w-full ${state?.gender_Id == item?.id ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                                {languageDetector?.typeLang === "ru" && item?.name_ru}
                                {languageDetector?.typeLang === "uz" && item?.name_uz}
                                {state?.gender_Id == (item?.id) &&
                                  <span onClick={() => ClearGenderSelected(item?.id)}><MenuCloseIcons colors={'#a1a1a1'} /></span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </section>
            {/*Type */}
            <section
              className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressTypeModal ? "bottom-0" : "bottom-[-800px] z-0"
                }`}
            >
              <section
                className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressTypeModal ? "bottom-0" : "bottom-[-800px] z-0"
                  }`}
              >
                <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
                  <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                    <p className="text-base font-AeonikProMedium">  {t("APtype")}</p>
                    <button onClick={() => setState({ ...state, DressTypeModal: false })}>
                      <CloseAnswer colors={"#000"} />
                    </button>
                  </section>
                  <section className="w-full h-[400px] px-4 flex flex-col items-center">
                    <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                      <form className='w-full flex flex-col items-center'>
                        <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                          <input
                            type="text"
                            value={searchList}
                            onChange={(e) => setSearchList(e?.target?.value)}
                            name='clothingTypes'
                            placeholder={t("APsearch")}
                            className='w-full pr-3 outline-none' />
                          <SearchIcon />
                        </div>
                        <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                          {state?.type_Id ?
                            dressInfo?.getProductInfo?.types?.filter(e =>
                              searchList ? languageDetector?.typeLang === "ru" ?
                                e?.name_ru?.toLowerCase()?.includes(searchList?.toLowerCase()) :
                                e?.name_uz?.toLowerCase()?.includes(searchList?.toLowerCase()) : e
                            )?.map((item) => {
                              return (
                                <>   {item?.category_id == state?.type_Id &&
                                  <div
                                    onClick={() => selectTypeById(item?.id, item?.category_id)}
                                    key={item?.id}
                                    className={`w-full ${state?.filterTypeId == item?.id ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                                    {languageDetector?.typeLang === "ru" && item?.name_ru}
                                    {languageDetector?.typeLang === "uz" && item?.name_uz}
                                    {state?.filterTypeId == (item?.id) &&
                                      <span onClick={() => ClearSelectTypeById(item?.id)}><MenuCloseIcons colors={'#a1a1a1'} /></span>}
                                  </div>}</>
                              )
                            })
                            :
                            dressInfo?.getProductInfo?.types?.filter((e) =>
                              searchList ? languageDetector?.typeLang === "ru" ?
                                e?.name_ru?.toLowerCase()?.includes(searchList?.toLowerCase()) :
                                e?.name_uz?.toLowerCase()?.includes(searchList?.toLowerCase()) : e
                            )?.map((item) => {
                              return (
                                <div
                                  onClick={() => selectTypeById(item?.id, item?.category_id)}
                                  key={item?.id} className={`w-full ${state?.filterTypeId == (item?.id) ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                                  {languageDetector?.typeLang === "ru" && item?.name_ru}
                                  {languageDetector?.typeLang === "uz" && item?.name_uz}
                                  {state?.filterTypeId == (item?.id) &&
                                    <span onClick={() => ClearSelectTypeById(item?.id)}><MenuCloseIcons colors={'#a1a1a1'} /></span>}

                                </div>
                              )
                            })
                          }
                        </div>
                      </form>
                    </div>
                  </section>
                </div>
              </section>
            </section>
            {/*MakeCountry */}
            <section
              className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.MakeCountryModal ? "bottom-0" : "bottom-[-800px] z-0"
                }`}
            >
              <section
                className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.MakeCountryModal ? "bottom-0" : "bottom-[-800px] z-0"
                  }`}
              >
                <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
                  <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                    <p className="text-base font-AeonikProMedium">  {t("APmanufacturer")}</p>
                    <button onClick={() => setState({ ...state, MakeCountryModal: false })}>
                      <CloseAnswer colors={"#000"} />
                    </button>
                  </section>
                  <section className="w-full h-[400px] px-4 flex flex-col items-center">
                    <div className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
                      <form className='w-full flex flex-col items-center'>
                        <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                          <input
                            type="text"
                            value={searchList}
                            onChange={(e) => setSearchList(e?.target?.value)}
                            name='clothingTypes'
                            placeholder={t("APsearch")}
                            className='w-full pr-3 outline-none' />
                          <SearchIcon />
                        </div>
                        <div className='w-full h-[290px] overflow-auto VerticelScroll'>
                          {dressInfo?.getProductInfo?.producers?.filter((e) =>
                            searchList ? languageDetector?.typeLang === "ru" ? e?.name_ru?.toLowerCase()?.includes(searchList?.toLowerCase()) :
                              e?.name_uz?.toLowerCase()?.includes(searchList?.toLowerCase()) : e
                          )?.map((item) => {
                            return (
                              <div
                                onClick={() => selectProduceId(item?.id)}
                                key={item?.id} className={`w-full ${state?.producer_Id == (item?.id) ? 'bg-bgUpdate' : ''} h-10 px-1 rounded-t-lg my-[2px] flex items-center justify-between border-b border-borderColor text-[13px] xs:text-[14px] font-AeonikProRegular`}>
                                {/* {item.name_ru} */}
                                {languageDetector?.typeLang === "ru" && item?.name_ru}
                                {languageDetector?.typeLang === "uz" && item?.name_uz}
                                {state?.producer_Id == (item?.id) && <span onClick={() => ClearProducerById(item?.id)}><MenuCloseIcons colors={'#a1a1a1'} /></span>}
                              </div>
                            );
                          })}
                        </div>
                      </form>
                    </div>
                  </section>
                </div>
              </section>
            </section>
            {/* ClothingCategory */}
            <section
              className={`w-full max-w-[440px] h-[600px] fixed z-[113] rounded-t-lg   left-1/2  right-1/2  translate-x-[-50%]   duration-300 overflow-hidden ${clothingCategoryModal
                ? "bottom-0"
                : "bottom-[-800px] z-0"
                }`}
            >
              <AddSizeForMobile
                clothingCategoryModal={clothingCategoryModal}
                setClothingCategoryModal={setClothingCategoryModal}
                title={dressInfo?.getProductInfo?.categories}
                typeId={state?.type_Id}
                handleCallBackHead={CallBackHeadWear}
                handleCallBackOut={CallBackOutWear}
                handleCallBackUnder={CallBackUnderWear}
                handleCallBackShoes={CallBackShoesWear}
                handleCallBackAccess={CallBackAccessoriesWear}
              />
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
                            {t("APmarket")}
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        {/* <button
                          type="button"
                          className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                        >
                          <div className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                            {t("PRselect2")}
                          </div>
                          <ArrowRightIcon />
                        </button> */}
                        <div
                          className={`w-full flex rounded-lg overflow-hidden`}
                        >
                          {newId ? (
                            <button
                              type="button"
                              className="w-full h-[38px] md:h-[40px] bg-[#F5F5F5] rounded-lg flex items-center justify-between border border-borderColor px-3"
                            >
                              <span>
                                {dressInfo?.getProductInfo?.shops
                                  ?.filter((e) => e?.id == newId)
                                  ?.map((data, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="mt-[3px] text-[12px] md:text-[16px] capitalize   font-AeonikProRegular text-[#b5b5b5]"
                                      >
                                        {data?.name}
                                      </span>
                                    );
                                  })}
                              </span>
                              <span className=" md:rotate-[90deg]">
                                <ArrowRightIcon />
                              </span>
                            </button>
                          ) : (
                            <Select
                              className={`overflow-hidden rounded-lg w-full h-11 md:h-10  ${(state?.isCheckValid && !newId && !state?.shopId)
                                ? "!border border-[#FFB8B8] !bg-[#FFF6F6]"
                                : ""
                                }`}
                              showSearch
                              placeholder={t("PRselect2")}
                              optionFilterProp="children"
                              onChange={(e) =>
                                setState({ ...state, shopId: e })
                              }
                              value={dressInfo?.getProductInfo?.shops?.filter(e => e?.id == state.shopId)?.map((item) => { return item?.name })}
                              onSearch={onSearch}
                              optionLabelProp="label"
                              // value={state.shopId}
                              size="large"
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {dressInfo?.getProductInfo?.shops?.filter(e => e?.shop_locations?.length > 0)?.map(
                                (data, index) => {
                                  return (
                                    <Option key={data.id} value={data?.id}>
                                      <Space>
                                        <span className=" ">
                                          {data?.name}
                                        </span>
                                      </Space>
                                    </Option>
                                  );
                                }
                              )}

                            </Select>
                          )}
                        </div>
                      </div>
                      {/* Input Select 2.1 */}
                      <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span
                            className={`text-[13px] md:text-base font-AeonikProRegular ${newId ? "text-[#000]" : "text-[#b5b5b5]"
                              }`}
                          >
                            {t("APlocation")}
                          </span>
                          <span className="ml-[5px]">
                            {newId ? <StarLabel /> : null}
                          </span>
                        </div>
                        {/* <button
                          // onClick={() =>
                          //   setState({ ...state, SubClothingSection: true })
                          // }
                          type="button"
                          className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                        >
                          <div className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                            Выбрать
                          </div>
                          <ArrowRightIcon />
                        </button> */}

                        <div className="w-full h-fit flex">
                          {dressInfo?.locationIdAddProduct ? (
                            <button
                              type="button"
                              className="w-full overflow-hidden h-[38px] md:h-[40px] rounded-lg flex items-center  bg-[#F5F5F5] justify-between border border-borderColor px-3"
                            >
                              <span className="w-[95%]">
                                {dressInfo?.getProductInfo?.shops?.filter((e) => e?.id == newId).map((item) => {
                                  return item?.shop_locations?.filter((e) => e?.id == parseInt(dressInfo?.locationIdAddProduct))?.map((data, index) => {
                                    return (
                                      <span
                                        key={index}
                                        className="w-full leading-[15px]	 text-start text-[11px] xs:text-[12px] md:text-[14px]  overflow-hidden text-[#b5b5b5] flex items-center">

                                        {data?.address}
                                      </span>
                                    );
                                  });
                                })}
                              </span>
                              <span className="md:rotate-[90deg]">
                                <ArrowRightIcon />
                              </span>
                            </button>
                          ) :
                            newId ?
                              (
                                <button
                                  onClick={() =>
                                    setState({ ...state, openSelect: true })
                                  }
                                  type="button"
                                  className={`w-full h-11 md:h-10 overflow-hidden rounded-lg flex cursor-pointer items-center justify-between 
                             ${state?.isCheckValid &&
                                      (!Number(dressInfo?.locationIdAddProduct))
                                      ? "border border-[#FFB8B8] "
                                      : "border border-borderColor"
                                    }
  
                             px-3`}
                                >
                                  {(Number(dressInfo?.locationIdAddProduct)) ? (
                                    dressInfo?.getProductInfo?.shops?.filter((e) => e?.id === newId)
                                      .map((item) => {
                                        return item?.shop_locations?.filter((e) => Number(e?.id) === Number(dressInfo?.locationIdAddProduct))?.map((data) => {
                                          return (
                                            <span
                                              className="w-[85%] whitespace-nowrap	flex items-center text-tableTextTitle2 text-[14px] not-italic font-AeonikProRegular" // onClick={() => setState({ ...state, shopLocationId: data?.id, openSelect: false })}
                                              key={data?.id}
                                            >
                                              <span className="w-full leading-[15px]	 text-start text-[11px] xs:text-[12px] md:text-[14px]  overflow-hidden text-[#b5b5b5] flex items-center">
                                                {data?.address}
                                              </span>
                                            </span>
                                          );
                                        });
                                      })
                                  ) : (
                                    <div className="text-[14px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                      {t("PRselect2")}

                                    </div>
                                  )}

                                  <span className="rotate-[90deg]">
                                    <ArrowRightIcon />
                                    {/* <DownOutlined style={{ colors: "#b5b5b5" }} /> */}
                                  </span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="w-full h-11 md:h-10  bg-[#F5F5F5] rounded-lg flex cursor-pointer items-center justify-between border border-borderColor px-3"
                                >
                                  <div className="text-[15px] mt-[3px] font-AeonikProRegular text-[#b5b5b5] tracking-wider	ant-select-selection-placeholder">
                                    {t("PRselect2")}
                                  </div>
                                  <span className="rotate-[90deg]">
                                    <ArrowRightIcon />
                                  </span>
                                </button>
                              )}
                        </div>
                      </div>
                      {/* Input Select 1 */}
                      <div className=" w-full h-fit flex flex-col gap-y-[5px] overflow-hidden">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            {t("APsectionProduct")}
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
                          className={`w-full min-h-[38px] rounded-lg flex md:hidden items-center justify-between  px-3 ${state?.isCheckValid && !section_Id?.length > 0
                            ? "!border border-[#FFB8B8] !bg-[#FFF6F6]"
                            : "border border-borderColor"
                            }`}
                        >
                          {section_Id?.length ?
                            <div className="w-full h-full rounded-lg flex flex-wrap overflow-hidden ">
                              {dressInfo?.getProductInfo?.sections?.filter(e => section_Id?.includes(e?.id))?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                    {languageDetector?.typeLang === "ru" && item?.name_ru}
                                    {languageDetector?.typeLang === "uz" && item?.name_uz}
                                  </span>
                                )
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                {t("PRselect2")}
                              </span>
                              <ArrowRightIcon />
                            </div>}
                        </button>
                        <div
                          className={`w-full  hidden md:flex  rounded-lg focus:border-none overflow-hidden`}
                        >
                          <Select
                            className={`overflow-hidden rounded-lg w-full  ${state?.isCheckValid && !section_Id?.length > 0
                              ? "!border border-[#FFB8B8] !bg-[#FFF6F6]"
                              : ""
                              }`}
                            showSearch
                            mode="multiple"
                            placeholder={t("PRselect2")}
                            optionLabelProp="label"
                            // optionFilterProp="children"
                            // value={dressInfo?.getProductInfo?.sections?.filter(e => state?.section_Id?.includes(e?.id))?.map((item) => { return languageDetector?.typeLang === "ru" ? item?.name_ru : item?.name_uz })}
                            onChange={handleChangeSection}
                            value={section_Id}
                            onSearch={onSearchSection}
                            size="large"
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }

                          >
                            {dressInfo?.getProductInfo?.sections?.map(
                              (item) => {
                                return (
                                  <Option
                                    key={item.id}
                                    value={item.id}
                                    label={
                                      languageDetector?.typeLang === "ru" ? item?.name_ru :
                                        languageDetector?.typeLang === "uz" ? item?.name_uz :
                                          undefined
                                    }
                                  >
                                    <Space>
                                      <span>
                                        {languageDetector?.typeLang === "ru" && item?.name_ru}
                                        {languageDetector?.typeLang === "uz" && item?.name_uz}</span>
                                    </Space>
                                  </Option>
                                );
                              }
                            )}
                          </Select>
                        </div>
                      </div>
                      {/* Input Select 2 */}
                      <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span
                            className={`text-[13px] md:text-base font-AeonikProRegular ${newArray?.length > 0
                              ? "text-[#000]"
                              : "text-[#b5b5b5]"
                              }`}
                          >
                            {t("APsubSectionProduct")}
                          </span>
                          <span className="ml-[5px]">
                            {newArray?.length ? <StarLabel /> : null}
                          </span>
                        </div>
                        <button
                          onClick={newArray?.length > 0 ? () =>
                            setState({ ...state, SubClothingSection: true }) : null
                          }
                          type="button"
                          className={`w-full min-h-[38px] rounded-lg flex md:hidden items-center justify-between   px-3 
                          ${state?.isCheckValid &&
                              !subSection_Id?.length &&
                              newArray?.length > 0
                              ? "overflow-hidden border border-[#FFB8B8] !bg-[#FFF6F6]"
                              : "border border-borderColor"
                            }
                          `}
                        >
                          {subSection_Id?.length > 0 ?
                            <div className="w-full h-full rounded-lg flex flex-wrap items-center justify-start gap-1">
                              {newArray?.filter(e => subSection_Id?.includes(e?.id))?.map((item) => {
                                return (

                                  <span className="text-[13px] md:text-base font-AeonikProRegular">
                                    {languageDetector?.typeLang === "ru" && item?.name_ru}
                                    {languageDetector?.typeLang === "uz" && item?.name_uz}
                                  </span>
                                )
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                {t("PRselect2")}
                              </span>
                              <ArrowRightIcon />
                            </div>
                          }
                        </button>

                        <div className="w-full h-fit hidden md:flex">
                          <Select
                            className={` rounded-lg w-full h-11 md:h-10 ${state?.isCheckValid &&
                              !subSection_Id?.length &&
                              newArray?.length > 0
                              ? " overflow-hidden border border-[#FFB8B8] "
                              : ""
                              }`}
                            showSearch
                            disabled={newArray?.length ? false : true}
                            placeholder={t("PRselect2")}
                            mode="multiple"
                            optionLabelProp="label"
                            value={subSection_Id}
                            // onChange={(e) => setState({ ...state, sub_Section_Id: e })}
                            onChange={(e, attribute2) => handleChangeSubSection(e, attribute2)}

                            onSearch={onSearchSubSection}
                            size="large"
                            allowClear
                            filterOption={(input, option) =>
                              (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          // value={dressInfo?.getProductInfo?.sections?.filter(e => state?.section_Id?.includes(e?.id))?.map((item) => { return languageDetector?.typeLang === "ru" ? item?.name_ru : item?.name_uz })}

                          >
                            {newArray?.map((item) => {
                              return (
                                <Option
                                  key={item.id}
                                  value={item.id}
                                  attribute2={item?.section_id}
                                  label={
                                    languageDetector?.typeLang === "ru" ? item?.name_ru :
                                      languageDetector?.typeLang === "uz" ? item?.name_uz :
                                        undefined
                                  }
                                >
                                  <Space>
                                    {dressInfo?.getProductInfo?.sections?.filter(e => e?.id == item?.section_id)?.map((data, index) => {
                                      return <div key={index} className=" flex items-center">
                                        <p className="flex  items-center font-AeonikProRegular">
                                          {languageDetector?.typeLang === "ru" && item?.name_ru}
                                          {languageDetector?.typeLang === "uz" && item?.name_uz} </p>
                                        <p className="text-[12px]  flex items-center  ml-[8px] text-[#b5b5b5] font-AeonikProRegular">(
                                          {languageDetector?.typeLang === "ru" && data?.name_ru}
                                          {languageDetector?.typeLang === "uz" && data?.name_uz})</p>
                                      </div>
                                    })}
                                  </Space>
                                </Option>
                              );
                            })}
                          </Select>
                        </div>
                      </div>
                      {/* Input Select 3 */}
                      <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            {t("APseasonProduct")}
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setState({ ...state, DressSeason: true })
                          }
                          type="button"
                          className={`w-full h-[38px] rounded-lg flex md:hidden items-center justify-between   px-3 
                          ${state?.isCheckValid && !season_Id?.length
                              ? "!border border-[#FFB8B8] !bg-[#FFF6F6]"
                              : "border border-borderColor"
                            }
                          `}
                        >
                          {season_Id?.length ?
                            <div className="w-full h-full rounded-lg flex items-center gap-x-1">
                              {dressInfo?.getProductInfo?.seasons?.filter(e => season_Id?.includes(e?.id))?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-full px-[3px] flex items-center">
                                    {languageDetector?.typeLang === "ru" && item?.name_ru}
                                    {languageDetector?.typeLang === "uz" && item?.name_uz}

                                  </span>)
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                {t("PRselect2")}
                              </span>
                              <ArrowRightIcon />
                            </div>}
                        </button>
                        <div className="w-full h-fit hidden md:flex">
                          <Select
                            className={`overflow-hidden rounded-lg w-full  ${state?.isCheckValid && !season_Id?.length
                              ? "!border border-[#FFB8B8] !bg-[#FFF6F6]"
                              : ""
                              }`}
                            mode="multiple"
                            style={{
                              width: "100%",
                            }}
                            placeholder={t("PRselect2")}
                            // defaultValue={["china"]}
                            showSearch={false} // Disabling search functionality

                            size="large"
                            onChange={(e) => setSeason_Id(e)}
                            optionLabelProp="label"
                            value={season_Id}

                          >
                            {dressInfo?.getProductInfo?.seasons?.map((item) => {
                              return (
                                <Option
                                  key={item.id}
                                  value={item.id}
                                  label={
                                    languageDetector?.typeLang === "ru" ? item?.name_ru :
                                      languageDetector?.typeLang === "uz" ? item?.name_uz :
                                        undefined
                                  }
                                >
                                  <Space>
                                    <span>
                                      {languageDetector?.typeLang === "ru" && item?.name_ru}
                                      {languageDetector?.typeLang === "uz" && item?.name_uz}</span>
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
                            {t("APcolor")}
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <div
                          className={`w-full flex items-center gap-x-1 justify-between  overflow-hidden                   
                          ${state?.isCheckValid && !state?.color_Id
                              ? "border border-[#FFB8B8] !bg-[#FFF6F6] md:bg-auto"
                              : "border border-borderColor"
                            } rounded-lg  h-[42px] md:h-10 px-[12px]`}
                        >
                          {dressInfo?.getProductInfo?.colors
                            ?.filter((e) => e?.id <= 9)
                            ?.map((data) => {
                              return (
                                <div key={data?.id} className="block ">
                                  <div className="w-full ">
                                    <label
                                      key={data?.id}
                                      htmlFor={data?.id}
                                      onClick={() =>
                                        setState({
                                          ...state,
                                          color_Id: data?.id,
                                        })
                                      }
                                      style={{ background: `${data.hex}` }}
                                      className={`rounded-full border  w-[22px] h-[22px] p-[2px] cursor-pointer flex items-center justify-center hover:scale-110 duration-300 `}
                                    >
                                      {data?.id === state?.color_Id &&
                                        state?.color_Id !== 2 ? (
                                        <BiCheck
                                          size={25}
                                          color={"#fff"}
                                          className="flex items-center justify-center"
                                        />
                                      ) : null}

                                      {state?.color_Id === 2 &&
                                        data?.id === state?.color_Id ? (
                                        <BiCheck
                                          size={25}
                                          color={"#000"}
                                          className="flex items-center justify-center"
                                        />
                                      ) : null}
                                    </label>
                                    <input
                                      type="radio"
                                      id={data?.id}
                                      name="checkStatus"
                                      value={data?.id}
                                      className={"hidden w-full h-full"}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          <button
                            onClick={() =>
                              setState({ ...state, showColor: true })
                            }
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
                              {t("APgender")}
                            </span>
                            <span className="ml-[5px]">
                              <StarLabel />
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setState({ ...state, GenderModal: true })
                            }
                            type="button"
                            className={`w-full h-[38px] rounded-lg flex md:hidden items-center justify-between   px-3 ${state?.isCheckValid && !state?.gender_Id
                              ? "border border-[#FFB8B8] !bg-[#FFF6F6]"
                              : "border border-borderColor"
                              }`}
                          >
                            {state?.gender_Id ?
                              <div className="w-full h-full rounded-lg flex items-center gap-x-1">
                                {dressInfo?.getProductInfo?.gender?.filter(e => state?.gender_Id == e?.id)?.map((item) => {
                                  return (
                                    <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                      {languageDetector?.typeLang === "ru" && item?.name_ru}
                                      {languageDetector?.typeLang === "uz" && item?.name_uz}
                                    </span>
                                  )
                                })}
                              </div>
                              :
                              <div className="w-full h-full rounded-lg flex items-center justify-between">
                                <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                  {t("PRselect2")}
                                </span>
                                <ArrowRightIcon />
                              </div>}
                          </button>
                          <div className="w-full h-fit md:flex hidden selectAndt">
                            <Select
                              className={` ${state?.isCheckValid && !state?.gender_Id
                                ? "border border-[#FFB8B8] "
                                : ""
                                }
                          rounded-lg w-full h-11 md:h-10 overflow-hidden`}
                              placeholder={t("PRselect2")}
                              optionFilterProp="children"
                              onChange={(e) =>
                                setState({ ...state, gender_Id: e })
                              }
                              value={state?.gender_Id}

                              showSearch={false} // Disabling search functionality
                              size="large"
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              options={dressInfo?.getProductInfo?.gender?.filter(e => Number(genderFilterId) == 3 ? e : (e?.id == genderFilterId || e?.id == 3))?.map(
                                (item) => {
                                  return {
                                    value: item?.id,
                                    label: languageDetector?.typeLang === "ru" ? item?.name_ru : item?.name_uz
                                  };
                                }
                              )}
                            />
                          </div>
                        </div>
                        <div className="w-1/2 hidden md:flex flex-col gap-y-[5px] ">
                          <div className="flex items-center">
                            <span className="text-[12px] flex flex-wrap whitespace-nowrap md:text-base font-AeonikProRegular">
                              {t("APage")}
                            </span>
                            <span className="ml-[5px]">
                              <StarLabel />
                            </span>
                          </div>
                          <div className="w-full h-fit flex items-center gap-x-2">
                            <input
                              type="number"
                              name="minAge"
                              placeholder={t("APmin")}
                              value={state?.min_Age_Category}
                              onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  min_Age_Category: e.target.value,
                                })
                              }
                              className={`inputStyle outline-none w-[55px] h-10 text-center  ${state?.isCheckValid && !state?.min_Age_Category
                                ? "border border-[#FFB8B8] "
                                : "border border-borderColor"
                                }  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                            />
                            <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                            <input
                              type="number"
                              name="maxAge"
                              placeholder={t("APmax")}
                              value={state?.max_Age_Category}
                              onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                              onChange={(e) =>
                                setState({
                                  ...state,
                                  max_Age_Category: e.target.value,
                                })
                              }
                              className={`inputStyle outline-none w-[55px] h-10 text-center  ${state?.isCheckValid && !state?.max_Age_Category
                                ? "border border-[#FFB8B8] "
                                : "border border-borderColor"
                                }  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Input Select 6 */}
                      <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                        <div className="flex items-center  ">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            {t("PRrandomCode")}
                          </span>

                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <div className="w-full h-fit   flex items-center justify-between gap-x-3">
                          <input
                            type="text"
                            name="artikul"
                            value={state?.sku}
                            onChange={(e) =>
                              setState({ ...state, sku: e.target.value })
                            }
                            placeholder=""
                            className={`inputStyle w-[calc(100%-42px)] text-[12px] md:text-[16px] h-[38px] md:h-10  flex items-center justify-between ${state?.isCheckValid && !state?.sku
                              ? "border border-[#FFB8B8] !bg-[#FFF6F6]"
                              : "border border-borderColor"
                              } rounded-lg px-[10px] outline-none`}
                          />
                          <button
                            onClick={() => randomCode(17)}
                            type={"button"}
                            className={`w-[40px] h-[38px] md:h-10 active:scale-95  active:opacity-70 flex items-center justify-center  bg-textBlueColor border border-borderColor rounded-lg`}
                          >
                            <LoaderIcon />
                          </button>
                        </div>
                      </div>
                      {/* Input Select 7 */}
                      <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            {t("APcategoryProduct")}
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <div className="w-full h-fit">
                          <button
                            onClick={toggleDropModalButton}
                            type="button"
                            className={`w-full overflow-hidden h-[38px] hidden md:flex items-center justify-between ${state?.isCheckValid && (!state?.price || !state?.type_Id)
                              ? "border border-[#FFB8B8] "
                              : "border border-borderColor"
                              }  rounded-lg p-3 `}
                          >
                            {state?.type_Id ? (
                              dressInfo?.getProductInfo?.categories
                                ?.filter((e) => e?.id == state?.type_Id)
                                ?.map((item, index) => {
                                  return (
                                    <span key={index} className="text-[#000]">
                                      {languageDetector?.typeLang === "ru" && item?.name_ru}
                                      {languageDetector?.typeLang === "uz" && item?.name_uz}
                                    </span>
                                  );
                                })
                            ) : (
                              <span className="text-[#a1a1a1]"> {t("PRselect2")}</span>
                            )}
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
                            type="button"
                            className={`w-full overflow-hidden min-h-[38px] md:hidden flex items-center justify-between ${state?.isCheckValid && !state?.category_Id && !state?.type_Id
                              ? "border border-[#FFB8B8] bg-[#FFF6F6]"
                              : "border border-borderColor"
                              }  rounded-lg  px-3 `} >
                            {state?.type_Id ? (
                              dressInfo?.getProductInfo?.categories
                                ?.filter((e) => e?.id == state?.type_Id)
                                ?.map((item, index) => {
                                  return (
                                    <span key={index} className="text-[12px] text-[#b5b5b5]">
                                      {languageDetector?.typeLang === "ru" && item?.name_ru}
                                      {languageDetector?.typeLang === "uz" && item?.name_uz}
                                    </span>
                                  );
                                })
                            ) : (
                              <span className="text-[#b5b5b5] text-[12px]"> {t("selectCategory")}</span>
                            )}
                            {/* <span className="rotate-90 transition duration-200 ease-out">
                              <ArrowRightIcon />
                            </span> */}
                          </button>
                        </div>
                      </div>
                      {/* Input Select 8 */}
                      <div className="w-full   h-fit  hidden md:flex items-center gap-x-3">
                        <div className="w-1/2 flex flex-col gap-y-[5px]  ">
                          <div className="flex items-center">
                            <span className="text-[13px] md:text-base font-AeonikProRegular">
                              {t("APtype")}
                            </span>
                            <span className="ml-[5px]">
                              <StarLabel />
                            </span>
                          </div>
                          <div className="w-full h-fit selectAndt">
                            <Select
                              className={`overflow-hidden block rounded-lg w-full  md:h-10  ${state?.isCheckValid && !state?.filterTypeId
                                ? "border border-[#FFB8B8] bg-[#FFF6F6]"
                                : ""
                                }`}
                              showSearch
                              allowClear
                              placeholder={t("PRselect2")}
                              optionFilterProp="children"
                              onChange={(value, attribute2) => {
                                setState({
                                  ...state,
                                  filterTypeId: value,
                                  type_Id: attribute2?.attribute2,
                                });
                                // CategoryTypeId(value, attribute2?.attribute2)
                              }}
                              onSearch={onSearchType}
                              size="large"
                              // optionLabelProp="label"
                              value={dressInfo?.getProductInfo?.types?.filter(e => e?.id == state?.filterTypeId)?.map((item) => { return languageDetector?.typeLang === "ru" ? item?.name_ru : item?.name_uz })}

                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {dressInfo?.ProductFilterType ? dressInfo?.getProductInfo?.types?.filter((e) => Number(e?.category_id) === Number(dressInfo?.ProductFilterType))?.map((item) => {
                                return (
                                  <Option
                                    key={"item_" + item.id}
                                    value={item?.id}
                                    attribute2={item?.category_id}
                                    label={
                                      languageDetector?.typeLang === "ru" ? item?.name_ru :
                                        languageDetector?.typeLang === "uz" ? item?.name_uz :
                                          undefined
                                    }
                                  >
                                    {languageDetector?.typeLang === "ru" && item?.name_ru}
                                    {languageDetector?.typeLang === "uz" && item?.name_uz}
                                  </Option>
                                );
                              })
                                : dressInfo?.getProductInfo?.types?.map((item) => {
                                  return (
                                    <Option
                                      key={"item_" + item.id}
                                      value={item?.id}
                                      attribute2={item?.category_id}
                                      label={
                                        languageDetector?.typeLang === "ru" ? item?.name_ru :
                                          languageDetector?.typeLang === "uz" ? item?.name_uz :
                                            undefined
                                      }
                                    >
                                      {languageDetector?.typeLang === "ru" && item?.name_ru}
                                      {languageDetector?.typeLang === "uz" && item?.name_uz}
                                    </Option>
                                  );
                                }
                                )}
                            </Select>

                          </div>
                        </div>
                        <div className="w-1/2 flex flex-col gap-y-[5px]  ">
                          <div className="flex items-center">
                            <span className="text-[13px] md:text-base font-AeonikProRegular">
                              {t("APmanufacturer")}
                            </span>
                            <span className="ml-[5px]">
                              <StarLabel />
                            </span>
                          </div>
                          <div className="w-full h-11 md:h-10 overflow-hidden selectAndt">
                            <Select
                              className={`overflow-hidden rounded-lg w-full  h-full ${state?.isCheckValid && !state?.producer_Id
                                ? "border border-[#FFB8B8] "
                                : ""
                                }`}
                              showSearch
                              placeholder={t("PRselect2")}
                              optionFilterProp="children"
                              onChange={(e) =>
                                setState({ ...state, producer_Id: e })
                              }
                              allowClear
                              onSearch={onSearchCountry}
                              size="large"
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                              value={dressInfo?.getProductInfo?.producers?.filter(e => e?.id == state?.producer_Id)?.map((item) => { return languageDetector?.typeLang === "ru" ? item?.name_ru : item?.name_uz })}

                            >
                              {dressInfo?.getProductInfo?.producers?.map(
                                (item) => {
                                  return (
                                    <Option
                                      key={item.id}
                                      value={item.id}
                                      label={
                                        languageDetector?.typeLang === "ru" ? item?.name_ru :
                                          languageDetector?.typeLang === "uz" ? item?.name_uz :
                                            undefined
                                      }
                                    >
                                      <Space>
                                        <span>
                                          {languageDetector?.typeLang === "ru" && item?.name_ru}
                                          {languageDetector?.typeLang === "uz" && item?.name_uz}</span>
                                      </Space>
                                    </Option>
                                  );
                                }
                              )}
                            </Select>
                          </div>
                        </div>
                      </div>
                      {/* Input Select 9 mobile */}
                      <div className="w-full  flex md:hidden flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            {t("PRtype")}
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setState({ ...state, DressTypeModal: true })
                          }
                          type="button"
                          className={`w-full h-[40px] rounded-lg flex md:hidden items-center justify-between   px-3 ${state?.isCheckValid && !state?.filterTypeId
                            ? "border border-[#FFB8B8] bg-[#FFF6F6]"
                            : "border border-borderColor"
                            }`}
                        >
                          {state?.filterTypeId ?
                            <div className="w-full h-full rounded-lg flex items-center gap-x-1">
                              {dressInfo?.getProductInfo?.types?.filter(e => e?.id == state?.filterTypeId)?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                    {languageDetector?.typeLang === "ru" && item?.name_ru}
                                    {languageDetector?.typeLang === "uz" && item?.name_uz}

                                  </span>)
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                {t("PRselect2")}
                              </span>
                              <ArrowRightIcon />
                            </div>
                          }
                        </button>

                      </div>
                      {/* Input Select 10 mobile */}
                      <div className="w-full  flex md:hidden flex-col gap-y-[4px] ">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            {t("APmanufacturer")}
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
                          className={`w-full h-[40px] rounded-lg flex md:hidden items-center justify-between   px-3 
                          ${state?.isCheckValid && !state?.producer_Id
                              ? "border border-[#FFB8B8] bg-[#FFF6F6]"
                              : "border border-borderColor"
                            }
                          `}
                        >
                          {state?.producer_Id ?
                            <div className="w-full h-full rounded-lg flex items-center gap-x-1">
                              {dressInfo?.getProductInfo?.producers?.filter(e => e?.id == state?.producer_Id)?.map((item) => {
                                return (
                                  <span className="text-[12px] rounded-lg md:text-base font-AeonikProRegular h-[32px] px-[3px] flex items-center">
                                    {languageDetector?.typeLang === "ru" && item?.name_ru}
                                    {languageDetector?.typeLang === "uz" && item?.name_uz}

                                  </span>)
                              })}
                            </div>
                            :
                            <div className="w-full h-full rounded-lg flex items-center justify-between">
                              <span className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                {t("PRselect2")}
                              </span>
                              <ArrowRightIcon />
                            </div>
                          }
                        </button>

                      </div>
                      {/* Input Select 11 mobile */}
                      <div className="w-full  flex md:hidden flex-col gap-y-[5px] ">
                        <div className="flex items-center">
                          <span className="text-[12px] flex flex-wrap whitespace-nowrap md:text-base font-AeonikProRegular">
                            {t("APageCategory")}
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <div className="w-full h-fit flex items-center justify-between gap-x-2">
                          <input
                            type="number"
                            name="minAge"
                            placeholder={t("APmin")}
                            value={state?.min_Age_Category}
                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                            onChange={(e) =>
                              setState({
                                ...state,
                                min_Age_Category: e.target.value,
                              })
                            }
                            className={`inputStyle text-[12px]  outline-none w-[40%] h-[38px] text-center    flex items-center justify-center rounded-lg font-AeonikProRegular 
                            ${state?.isCheckValid && !state?.min_Age_Category
                                ? "border border-[#FFB8B8] bg-[#FFF6F6]"
                                : "border border-borderColor"
                              }`}
                          />
                          <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                          <input
                            type="number"
                            name="maxAge"
                            placeholder={t("APmax")}
                            value={state?.max_Age_Category}
                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                            onChange={(e) =>
                              setState({
                                ...state,
                                max_Age_Category: e.target.value,
                              })
                            }
                            className={`inputStyle text-[12px]  outline-none w-[40%] h-[38px] text-center    flex items-center justify-center rounded-lg font-AeonikProRegular 
                            
                            ${state?.isCheckValid && !state?.max_Age_Category
                                ? "border border-[#FFB8B8] bg-[#FFF6F6]"
                                : "border border-borderColor"
                              }`}
                          />
                        </div>
                      </div>
                      {/* Input Select 12 mobile */}
                      {state?.type_Id ?
                        <button
                          onClick={() => setClothingCategoryModal(true)}
                          className={` w-full  md:hidden rounded-[10px] h-[38px] select-none font-AeonikProMedium flex items-center justify-center text-[12px] md:text-sm cursor-pointer rounded-lg transition duration-300 text-textBlueColor focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white 
                          ${state?.isCheckValid && (!state?.price || !state?.type_Id) ?
                              "border border-[#FFB8B8] "
                              : "border border-textBlueColor"}
                          `}>
                          {t("APaddSize")}
                        </button> :
                        <button
                          className={` w-full  md:hidden   border border-searchBgColor rounded-[10px] h-[38px] select-none font-AeonikProMedium flex items-center justify-center text-[12px] md:text-sm cursor-pointer rounded-lg transition duration-300 text-[#b5b5b5]    `}>
                          {t("APaddSize")}
                        </button>
                      }
                    </div>

                    <div>

                      <div className={`w-full hidden    items-center flex-wrap gap-3 ${state.openDropModalButton ? "md:flex" : "md:hidden"} `}>
                        <HeadWearAdd
                          title={dressInfo?.getProductInfo?.categories}
                          typeId={state?.type_Id}
                          handleCallBack={CallBackHeadWear}
                        />
                        <OutWearAdd
                          title={dressInfo?.getProductInfo?.categories}
                          typeId={state?.type_Id}
                          handleCallBack={CallBackOutWear}
                        />
                        <UnderAddWear
                          title={dressInfo?.getProductInfo?.categories}
                          typeId={state?.type_Id}
                          handleCallBack={CallBackUnderWear}
                        />
                        <ShoesAdd
                          title={dressInfo?.getProductInfo?.categories}
                          typeId={state?.type_Id}
                          handleCallBack={CallBackShoesWear}
                        />
                        <AccessoriesAdd
                          title={dressInfo?.getProductInfo?.categories}
                          typeId={state?.type_Id}
                          handleCallBack={CallBackAccessoriesWear}
                        />
                      </div>

                    </div>
                  </div>

                  <div className="w-full md:w-[30%] h-fit flex md:flex-col flex-row  justify-center gap-x-4 ">
                    <div className="hidden md:flex items-center  justify-start mb-[5px]">
                      <span className="text-base font-AeonikProRegular">
                        {t("PRphoto")}
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="w-full max-w-[220px]  md:max-w-[290px]  h-[300px] md:h-[380px] flex items-center ">
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
                            name="fileUpload1"
                            onChange={handleLocationImage1}
                            accept=" image/*"
                          />
                          {!state.pictureBgView1 && (
                            <div
                              className={`w-full h-full flex md:text-base text-[14px] bg-photoBg items-center justify-center ${state?.isCheckValid && !state.pictureBgView1
                                ? "border border-[#FFB8B8]"
                                : "border border-dashed"
                                } rounded-lg`}
                            >
                              <span className="leading-none flex items-center text-textBlueColor border-b border-textBlueColor font-AeonikProMedium">
                                {t("APselectPhoto")}{" "}
                                <span className="ml-[5px]">
                                  <StarLabel />
                                </span>
                              </span>
                            </div>
                          )}
                          {state.pictureBgView1 && (
                            <img
                              src={state.pictureBgView1}
                              alt="backImg"
                              className="w-full h-full border border-searchBgColor object-cover rounded-lg"
                            />
                          )}
                        </label>
                      </button>
                    </div>
                    <div className="w-[70px] md:w-[290px] md:mt-[10px] gap-y-2  h-[300px]  md:h-[120px]  md:flex-row flex-col flex      justify-between rounded-lg gap-y-2  md:mt-[10px]">
                      <div className="w-full  h-[100px] md:h-[120px] md:w-[31%] flex flex-col items-center justify-center ">
                        <button
                          type="button"
                          className="h-full w-full flex items-center justify-center "
                        >
                          {state?.pictureBgView1 ? (
                            <label
                              htmlFor="DataImg2"
                              className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                            >
                              <input
                                className="hidden"
                                id="DataImg2"
                                type="file"
                                name="fileUpload2"
                                onChange={handleLocationImage2}
                                accept=" image/*"
                              />

                              {!state?.pictureBgView2 && (
                                <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                                  <DownloadIcon colors={"#007DCA"} />
                                  <div className="text-[9px] md:text-[11px] text-textLightColor mt-[5px]">
                                    ({t("APnotNecessary")})
                                  </div>
                                </div>
                              )}
                              {state?.pictureBgView2 && (
                                <img
                                  src={state?.pictureBgView2}
                                  alt="backImg"
                                  className="w-full h-full border border-searchBgColor object-cover rounded-lg"
                                />
                              )}
                            </label>
                          ) : (
                            <div className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-[#b5b5b5] ">
                              <div className="w-full h-full overflow-hidden  border border-dashed rounded-lg flex flex-col items-center justify-center">
                                <DownloadIcon colors={"#b5b5b5"} />
                                <div className="text-[9px] md:text-[11px] text-textLightColor mt-[5px]">
                                  ({t("APnotNecessary")})
                                </div>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                      <div className="w-full  h-[100px] md:h-[120px] md:w-[31%] flex flex-col items-center justify-center ">
                        <button
                          type="button"
                          className="h-full w-full flex items-center justify-center "
                        >
                          {state?.pictureBgView2 ? (
                            <label
                              htmlFor="DataImg3"
                              className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                            >
                              <input
                                className="hidden"
                                id="DataImg3"
                                type="file"
                                name="fileUpload3"
                                onChange={handleLocationImage3}
                                accept=" image/*"
                              />

                              {!state?.pictureBgView3 && (
                                <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                                  <DownloadIcon colors={"#007DCA"} />
                                  <div className="text-[9px] md:text-[11px] text-textLightColor mt-[5px]">
                                    ({t("APnotNecessary")})
                                  </div>
                                </div>
                              )}
                              {state?.pictureBgView3 && (
                                <img
                                  src={state?.pictureBgView3}
                                  alt="backImg"
                                  className="w-full h-full border border-searchBgColor object-cover rounded-lg"
                                />
                              )}
                            </label>
                          ) : (
                            <div className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-[#b5b5b5] ">
                              <div className="w-full h-full overflow-hidden  border border-dashed rounded-lg flex flex-col items-center justify-center">
                                <DownloadIcon colors={"#b5b5b5"} />
                                <div className="text-[9px] md:text-[11px] text-textLightColor mt-[5px]">
                                  ({t("APnotNecessary")})
                                </div>
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                      <div className="w-full  h-[100px] md:h-[120px] md:w-[31%] flex flex-col items-center justify-center ">
                        <button
                          type="button"
                          className="h-full w-full flex items-center justify-center "
                        >
                          {state?.pictureBgView3 ? (
                            <label
                              htmlFor="DataImg4"
                              className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                            >
                              <input
                                className="hidden"
                                id="DataImg4"
                                type="file"
                                name="fileUpload4"
                                onChange={handleLocationImage4}
                                accept=" image/*"
                              />

                              {!state?.pictureBgView4 && (
                                <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                                  <DownloadIcon colors={"#007DCA"} />
                                  <div className="text-[9px] md:text-[11px] text-textLightColor mt-[5px]">
                                    ({t("APnotNecessary")})
                                  </div>
                                </div>
                              )}
                              {state?.pictureBgView4 && (
                                <img
                                  src={state?.pictureBgView4}
                                  alt="backImg"
                                  className="w-full h-full border border-searchBgColor object-cover rounded-lg"
                                />
                              )}
                            </label>
                          ) : (
                            <div className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-[#b5b5b5] ">
                              <div className="w-full h-full overflow-hidden  border border-dashed rounded-lg flex flex-col items-center justify-center">
                                <DownloadIcon colors={"#b5b5b5"} />
                                <div className="text-[9px] md:text-[11px] text-textLightColor mt-[5px]">
                                  ({t("APnotNecessary")})
                                </div>
                              </div>
                            </div>
                          )}
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
                    onClick={handleNextPage}
                    className="w-full h-[38px] md:h-[45px] flex items-center justify-center md:w-fit md:absolute active:scale-95 md:right-3 md:bottom-3 md:px-[50px]   border border-textBlueColor bg-textBlueColor text-white rounded-lg text-base md:text-lg font-AeonikProMedium"
                  >
                    {t("APContinue")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`relative w-full ${dressInfo?.nextPageShowForm ? "hidden" : " flex"
              }`}
          >
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
            <TextFormAdd
              LocationAddSubmit={LocationAddSubmit}
              handlCallBack={CallBackTextForm}
            />
          </div>
        </div >
      )
      }
    </div >
  );
};

export default AddingProduct;
// APsubSectionProduct  