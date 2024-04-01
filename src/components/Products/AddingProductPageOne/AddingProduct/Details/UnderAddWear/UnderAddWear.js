import React, { useContext, useEffect, useState } from "react";
import { StarLabel } from "../../../../../../assets/icons";
import { Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";
import { Checkbox, Col, Row } from 'antd';
import { BiPlus } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../../../language/LanguageItem";

function UnderAddWear({ title, typeId, handleCallBack }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [languageDetector] = useContext(LanguageDetectorDress);

    const [state, setState] = useState({
        minBreast: "",
        maxBreast: "",
        minSize: "",
        maxSize: "",
        minHeight: "",
        maxHeight: "",
        minHips: "",
        maxHips: "",
        quantityNum: "",
        ageNum: "",
        priceNum: "",
        salePercent: "",
        salePrice: "",
        sizeListCheck: null,
        selected: null,
        maxBreastShow: false,
        maxSizeShow: false,
        maxHeightShow: false,
        maxHipsShow: false,
        isCheckValid: false,
        // ------
        onConcel: false,
        checkEmpty: false

    })
    const { t } = useTranslation("product");

    useEffect(() => {
        if (Number(state?.salePercent) > 0) {
            const sale = Number(state?.priceNum) * (100 - state?.salePercent) / 100
            setState({ ...state, salePrice: parseInt(sale) })
        }
        if (!state?.salePercent) {
            setState({ ...state, salePrice: 0 })
        }
    }, [state?.salePercent, state?.priceNum])

    const [toggleShow, setToggleShow] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [decraseList, setDecraseList] = useState(false)
    const [sizeList, setSizeList] = useState({
        sizeList1: [
            { id: 1, action: true, name: "XXS" },
            { id: 2, action: true, name: "XS" },
            { id: 3, action: true, name: "S" },
            { id: 4, action: true, name: "M" },
            { id: 5, action: true, name: "L" },
            { id: 6, action: true, name: "XL" },
            { id: 7, action: true, name: "2XL" },
            { id: 8, action: true, name: "3XL" },
        ],
        sizeList2: [
            { id: 11, action: true, name: "5XL" },
            { id: 12, action: true, name: "7XL" },
            { id: 13, action: true, name: "9XL" },
            { id: 14, action: true, name: "10XL" },
            { id: 15, action: true, name: "4XL" },
            { id: 16, action: true, name: "6XL" },
            { id: 17, action: true, name: "8XL" },
        ]
    }
    )


    const SelectedNumber = 3
    useEffect(() => {
        if (typeId == SelectedNumber) {
            setToggle(true)
        } else {
            setToggle(false)
        }
    }, [typeId])
    const handleOpenPopver = (newOpen) => {
        setToggleShow(newOpen)
    }
    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        if (!state?.minBreast && state?.maxBreast ||
            !state?.minSize && state?.maxSize ||
            !state?.minHeight && state?.maxHeight ||
            !state?.minHips && state?.maxHips) {
            setState({ ...state, checkEmpty: true })
        } else {
            if (state?.minSize && state?.quantityNum && state?.priceNum) {
                setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
                setState({
                    ...state, isCheckValid: false, onConcel: true, checkEmpty: false
                })
                setToggleShow(false)
                handleCallBack({
                    minUnderwearWaistGirth: state?.minBreast,
                    maxUnderwearWaistGirth: state?.maxBreast,
                    minUnderWearSize: state?.minSize,
                    maxUnderWearSize: state?.maxSize,
                    minUnderWearHipGirth: state?.minHips,
                    maxUnderWearHipGirth: state?.maxHips,
                    minHeight: state?.minHeight,
                    maxHeight: state?.maxHeight,
                    underWearLetterSize: state?.sizeListCheck,
                    amount: state?.quantityNum,
                    age: state?.ageNum,
                    price: state?.priceNum,
                    discountPercent: state?.salePercent,
                    discountPrice: state?.salePrice,
                    category_Id: SelectedNumber,
                })
            }
        }
    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            ...state,
            minBreast: "",
            maxBreast: "",
            minSize: "",
            maxSize: "",
            minHeight: "",
            maxHeight: "",
            minHips: "",
            maxHips: "",
            quantityNum: "",
            ageNum: "",
            priceNum: "",
            salePercent: "",
            salePrice: "",
            isCheckValid: false,
            onConcel: false,
            selected: null,
            checkEmpty: false

        })
        handleCallBack()
        setToggleShow(false)
    }
    const handleChangePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
        // const formattedValue = Number(sanitizedValue).toLocaleString()
        setState({ ...state, priceNum: sanitizedValue });
    };
    const handleChangeSalePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
        const formattedValue = Number(sanitizedValue).toLocaleString()
        setState({ ...state, salePrice: formattedValue });
    };
    const handleChangePercent = (event) => {
        const { value } = event.target
        if (value >= 0 && value < 100) {
            setState({ ...state, salePercent: value });
        }
        if (!value) {
            setState({ ...state, salePercent: "" });
        }
    };
    const onHandleSelectSize = (name) => {
        if (!state?.sizeListCheck) {
            setState({ ...state, sizeListCheck: name })
        }
        if (state?.sizeListCheck === name) {
            setState({ ...state, sizeListCheck: null })
        }
        if (state?.sizeListCheck !== name) {
            setState({ ...state, sizeListCheck: name })
        }
    }

    const contentUnderWear = (
        <div className="w-[840px] h-fit">
            <div
                className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="w-full flex gap-x-10 px-3 pt-5">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            {t("SSwaist")}
                            <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                        </p>
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center  ${state?.checkEmpty && !state?.minBreast && state?.maxBreast ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3  rounded-lg   font-AeonikProRegular `}
                                    placeholder={t("SSmin")}
                                    name="minBreast"
                                    value={state?.minBreast}
                                    onChange={(e) => setState({ ...state, minBreast: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                            </div>
                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                            <div className="flex flex-col">

                                {state?.maxBreastShow ?
                                    <input
                                        type="number"
                                        className={`inputStyle outline-none w-[60px] h-[38px] text-center border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                        placeholder={t("SSmax")}
                                        name="maxBreast"
                                        value={state?.maxBreast}
                                        onChange={(e) => setState({ ...state, maxBreast: e.target.value })}
                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    /> :
                                    <button onClick={() => setState({ ...state, maxBreastShow: true })} className="border border-borderColor bg-white  rounded-lg  w-[60px] text-center h-[38px] flex items-center justify-center">
                                        <BiPlus color="#007DCA" size={20} />
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            {t("SSsize")}
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-center justify-between gap-x-1">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px] ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg   font-AeonikProRegular `}
                                        placeholder={t("SSmin")}
                                        name="minSize"
                                        value={state?.minSize}
                                        onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    {state?.maxSizeShow ? <input
                                        type="number"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                        placeholder={t("SSmax")}
                                        name="maxSize"
                                        value={state?.maxSize}
                                        onChange={(e) => setState({ ...state, maxSize: e.target.value })}
                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    /> :
                                        <button onClick={() => setState({ ...state, maxSizeShow: true })} className="border border-borderColor bg-white  rounded-lg  w-[60px] text-center h-[38px] flex items-center justify-center">
                                            <BiPlus color="#007DCA" size={20} />
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[53%] flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            {t("SSletter_Size")}
                        </p>
                        <div className='w-full '>
                            {/* -----------------Desktop--------------------- */}
                            <div className="w-full hidden md:flex flex-row">
                                <div className="w-fit w-[222px]  h-[50px] grid grid-cols-4 gap-2 ">
                                    {sizeList.sizeList1.map((data) => {
                                        return (
                                            <div
                                                key={data?.id}
                                                className="flex "
                                            >

                                                {data?.action &&
                                                    <label
                                                        htmlFor={data?.id}
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={data?.id}
                                                            name="size_Outwear"
                                                            checked={data?.name === state?.sizeListCheck}
                                                            onChange={() => onHandleSelectSize(data?.name)}
                                                            value={data?.name}
                                                            className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                        />
                                                        <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                            {data?.name}
                                                        </span>
                                                    </label>
                                                }
                                            </div>
                                        );
                                    })}

                                </div>
                                <div className={`w-fit w-[222px]  h-[50px] grid grid-cols-4  gap-2 ${decraseList ? "" : "items-end"} `}>

                                    {decraseList && sizeList.sizeList2.map((data) => {
                                        return (
                                            <div
                                                key={data?.id}
                                                className="flex "
                                            >

                                                {data?.action && <label
                                                    htmlFor={data?.id}
                                                    className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={data?.id}
                                                        name="size_Outwear"
                                                        checked={data?.name === state?.sizeListCheck}
                                                        onChange={() => onHandleSelectSize(data?.name)}
                                                        value={data?.name}
                                                        className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                    />
                                                    <span className="text-textLightColor   flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                        {data?.name}
                                                    </span>
                                                </label>}
                                            </div>
                                        );
                                    })}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDecraseList(!decraseList)
                                        }}
                                        className="text-textBlueColor select-none text-[10px] ls:text-[12px] ll:text-xs not-italic font-AeonikProMedium cursor-pointer"
                                    >
                                        {decraseList ? t("SSless") : t("SSmore")}
                                    </button>
                                </div>
                            </div>
                            {/* -----------------Mobile--------------------- */}
                            <div className="w-full flex md:flex-row flex-col md:hidden">
                                <div className="w-fit md:w-[222px]  md:h-[50px] flex md:block flex-wrap md:grid md:grid-cols-4 gap-1 md:gap-2 ">
                                    {sizeList.sizeList1.map((data) => {
                                        return (
                                            <div
                                                key={data?.id}
                                                className="flex "
                                            >
                                                {
                                                    data?.action &&
                                                    <label
                                                        htmlFor={data?.id}
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={data?.id}
                                                            name="size_Outwear"
                                                            checked={data?.id === state?.selected}
                                                            onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                            value={data?.name}
                                                            className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                        />
                                                        <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                            {data?.name}
                                                        </span>
                                                    </label>
                                                }
                                            </div>
                                        );
                                    })}
                                    {/* <span className="flex flex-wrap "> */}
                                    {decraseList && sizeList.sizeList2.map((data) => {
                                        return (
                                            <div
                                                key={data?.id}
                                                className="flex  md:hidden"
                                            >
                                                {
                                                    data?.action &&
                                                    <label
                                                        htmlFor={data?.id}
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={data?.id}
                                                            name="size_Outwear"
                                                            checked={data?.id === state?.selected}
                                                            onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                            value={data?.name}
                                                            className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                        />
                                                        <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                            {data?.name}
                                                        </span>
                                                    </label>
                                                }
                                            </div>
                                        );
                                    })}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDecraseList(!decraseList)
                                        }}
                                        className=" md:hidden text-textBlueColor select-none text-[10px] ls:text-[12px] ll:text-md not-italic font-AeonikProMedium cursor-pointer"
                                    >
                                        {decraseList ? t("SSless") : t("SSmore")}
                                    </button>
                                    {/* </span> */}
                                </div>
                                <div className="w-fit md:w-[222px]  h-[50px] hidden md:block flex-wrap  md:grid md:grid-cols-4gap-1 md:gap-2 items-end">
                                    {decraseList && sizeList.sizeList2.map((data) => {
                                        return (
                                            <div
                                                key={data?.id}
                                                className="flex "
                                            >
                                                {
                                                    data?.action &&
                                                    <label
                                                        htmlFor={data?.id}
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={data?.id}
                                                            name="size_Outwear"
                                                            checked={data?.id === state?.selected}
                                                            onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                            value={data?.name}
                                                            className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                        />
                                                        <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                            {data?.name}
                                                        </span>
                                                    </label>
                                                }
                                            </div>
                                        );
                                    })}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDecraseList(!decraseList)
                                        }}
                                        className="text-textBlueColor select-none text-[10px] ls:text-[12px] ll:text-xs not-italic font-AeonikProMedium cursor-pointer"
                                    >
                                        {decraseList ? t("SSless") : t("SSmore")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-x-10 px-3 pt-5">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            {t("SShip_circumference")}
                        </p>
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center    ${state?.checkEmpty && !state?.minHips && state?.maxHips ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}    px-3  rounded-lg   font-AeonikProRegular `}
                                    placeholder={t("SSmin")}
                                    name="minHips"
                                    value={state?.minHips}
                                    onChange={(e) => setState({ ...state, minHips: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                            </div>
                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                            <div className="flex flex-col">


                                {state?.maxHipsShow ?
                                    <input
                                        type="number"
                                        className={`inputStyle outline-none w-[60px] h-[38px] text-center border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                        placeholder={t("SSmax")}
                                        name="maxHips"
                                        value={state?.maxHips}
                                        onChange={(e) => setState({ ...state, maxHips: e.target.value })}
                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    /> :
                                    <button onClick={() => setState({ ...state, maxHipsShow: true })} className="border border-borderColor bg-white  rounded-lg  w-[60px] text-center h-[38px] flex items-center justify-center">
                                        <BiPlus color="#007DCA" size={20} />
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            {t("SSheight")}
                        </p>
                        <div className="flex items-center justify-between gap-x-1">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px] ${state?.checkEmpty && !state?.minHeight && state?.maxHeight ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}     px-3  rounded-lg   font-AeonikProRegular `}
                                        placeholder={t("SSmin")}
                                        name="minHeight"
                                        value={state?.minHeight}
                                        onChange={(e) => setState({ ...state, minHeight: e.target.value })}
                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">


                                    {state?.maxHeightShow ?
                                        <input
                                            type="number"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px] border border-borderColor bg-white px-3  rounded-lg  font-AeonikProRegular `}
                                            placeholder={t("SSmax")}
                                            name="maxHeight"
                                            value={state?.maxHeight}
                                            onChange={(e) => setState({ ...state, maxHeight: e.target.value })}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        /> :
                                        <button onClick={() => setState({ ...state, maxHeightShow: true })} className="border border-borderColor bg-white  rounded-lg  w-[60px] text-center h-[38px] flex items-center justify-center">
                                            <BiPlus color="#007DCA" size={20} />
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col md:ml-[14px]">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            {t("SSquantity")}

                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-start justify-between ">
                            <input
                                type="number"
                                name="quantityNum"
                                className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3  rounded-lg  font-AeonikProRegular `}
                                value={state?.quantityNum}
                                onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
                    <div className="w-fit flex items-center gap-x-[25px]">
                        <div className="w-fit hidden md:flex flex-col items-start">
                            <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                    {t("SSage")}
                                </div>
                            </div>
                            <div className="w-fit flex items-center">
                                <input
                                    type="number"
                                    className=" inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none"
                                    placeholder=""
                                    name="ageNum"
                                    value={state?.ageNum}
                                    onChange={(e) => setState({ ...state, ageNum: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-[55%]">
                            <div className="flex items-center  mb-2 ll:mb-[10px]">
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                    {t("SSprice")}
                                </div>
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </div>
                            <label htmlFor="priceNum" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3 py-[6px] rounded-lg text-xs`}>
                                <input
                                    type="text"
                                    placeholder="0"
                                    id="priceNum"
                                    name="priceNum"
                                    className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                    value={Number(state?.priceNum)?.toLocaleString()}
                                    onChange={handleChangePrice}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                    {t("SSsumm")}
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col items-start">
                        <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                            <div
                                className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                {t("SSsale")}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className="w-full flex items-center gap-x-1 ">
                                <div className="w-[40%] md:w-[72px] flex items-start">
                                    <div className={`w-full h-10 flex items-center justify-center border border-borderColor ${state?.priceNum > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                        {state?.priceNum > 0 ?
                                            <input
                                                type="number"
                                                name="salePercent"
                                                placeholder="0"
                                                className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                value={state?.salePercent}
                                                onChange={handleChangePercent}
                                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                            />
                                            :
                                            <input
                                                type="number"
                                                name="salePercent"
                                                placeholder="0"
                                                className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                readOnly
                                            />}
                                        <span className="text-textLightColor ml-1">%</span>
                                    </div>
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="w-[60%] md:w-[75%] flex items-center">
                                    <label htmlFor="salePrice" className={`w-full h-[40px] flex items-center justify-between  ${state?.priceNum > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            id="salePrice"
                                            name="salePrice"
                                            className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                            value={Number(state?.salePrice)?.toLocaleString()}
                                            onChange={handleChangeSalePrice}
                                            readOnly
                                        />
                                        <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                            {t("SSsumm")}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit flex items-center justify-end gap-x-5">
                    {state?.onConcel && <button onClick={cancelSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1">
                        {t("SScancel")}
                    </button>}
                    <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                        {t("SSready")}
                    </button>
                </div>
            </div>
        </div>
    );
    return (
        <Popover
            open={toggleShow}
            onOpenChange={handleOpenPopver}
            className={`
            ${dressInfo?.ProductFilterType || typeId ?
                    dressInfo?.ProductFilterType == SelectedNumber || toggle && typeId ?
                        "!bg-textBlueColor text-white" :
                        "text-[#bababa]  border-[#bababa]" :
                    "text-textBlueColor focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white border-textBlueColor"} 
                    group px-[15px] h-[38px]  border-[1.5px] select-none font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer rounded-lg transition duration-300
                    `}
            trigger="click"
            options={["Hide"]}
            placement="bottom"
            content={dressInfo?.ProductFilterType || typeId ? dressInfo?.ProductFilterType == SelectedNumber || toggle && typeId ? contentUnderWear : null : contentUnderWear}
        >
            {
                title?.filter(e => e?.id === SelectedNumber)?.map(item => {
                    return (
                        <span key={item?.id}> {languageDetector?.typeLang === "ru" && item?.name_ru}
                            {languageDetector?.typeLang === "uz" && item?.name_uz}</span>
                    )
                })
            }

        </Popover>
    );
}
export default React.memo(UnderAddWear)
