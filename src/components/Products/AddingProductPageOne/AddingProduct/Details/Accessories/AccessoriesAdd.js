import React, { useContext, useEffect, useState } from "react";
import { StarLabel } from "../../../../../../assets/icons";
import { Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";
import { Checkbox, Col, Row } from 'antd';
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../../../language/LanguageItem";

function AccessoriesAdd({ title, typeId, handleCallBack }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [languageDetector] = useContext(LanguageDetectorDress);
    const { t } = useTranslation("product");

    const [state, setState] = useState({
        rowSize: "",
        colSize: "",
        minSize: "",
        ageNum: "",
        quantityNum: "",
        priceNum: "",
        salePercent: "",
        salePrice: "",
        sizeListCheck: "",
        isCheckValid: false,
        // ------
        onConcel: false,
        selected: ""
    })
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


    const SelectedNumber = 5
    useEffect(() => {
        if (Number(typeId) === SelectedNumber) {
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
        if (state?.priceNum) {
            handleCallBack({
                accessorySize: state?.minSize,
                legnthAcc: state?.rowSize,
                widthAcc: state?.colSize,
                accessoryLetterSize: state?.sizeListCheck,
                amount: state?.quantityNum,
                age: state?.ageNum,
                price: state?.priceNum,
                discountPercent: state?.salePercent,
                discountPrice: state?.salePrice,
                category_Id: SelectedNumber,

            })
            setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
            setState({ ...state, isCheckValid: false, onConcel: true })
            setToggleShow(false)
        }

    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            ...state,
            rowSize: '',
            colSize: '',
            minSize: '',
            ageNum: '',
            quantityNum: '',
            priceNum: '',
            salePercent: '',
            salePrice: '',
            selected: null,
            isCheckValid: false,
            // ------
            onConcel: false
        })
        setToggleShow(false)
        handleCallBack()
    }
    useEffect(() => {
        if (Number(state?.salePercent) > 0) {
            const sale = Number(state?.priceNum) * (100 - state?.salePercent) / 100
            setState({ ...state, salePrice: parseInt(sale) })
        }
        if (!state?.salePercent) {
            setState({ ...state, salePrice: 0 })
        }
    }, [state?.salePercent, state?.priceNum])
    

     const handleChangePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
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
    const contentAccessories = (
        <div className="w-[650px] h-fit  ">
            <div
                className={`w-full h-fit flex flex-col cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="w-full flex gap-x-10 px-3 pt-5">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            {t("SSsize")}
                            <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                        </p>
                        <div className="w-[60px] flex items-center justify-between gap-x-1">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    name="minSize"
                                    className="inputStyle outline-none w-full text-start h-[38px] border border-borderColor px-3 rounded-lg  font-AeonikProRegular "
                                    value={state?.minSize}
                                    onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[80%] flex flex-col">
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
                                                            onChange={() => onHandleSelectSize(data?.name,)}
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
                                                            onChange={() => onHandleSelectSize(data?.name,)}
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
                                                        htmlFor="m_outwear"
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="m_outwear"
                                                            name="size_Outwear"
                                                            value="M"
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
                    <div className="w-[20%] flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            {t("SSlength")}
                            <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                        </p>
                        <div className="w-[60px] flex items-center justify-between">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    name="colSize"
                                    className="inputStyle outline-none w-full h-[40px] text-start border border-borderColor px-3 rounded-lg   font-AeonikProRegular "
                                    value={state?.colSize}
                                    onChange={(e) => setState({ ...state, colSize: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[20%] flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            {t("SSwidth")}
                        </p>
                        <div className="w-[60px] flex items-center justify-between gap-x-1">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    name="rowSize"
                                    className="inputStyle outline-none w-full h-[40px] text-start border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                    value={state?.rowSize}
                                    onChange={(e) => setState({ ...state, rowSize: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[60%] flex flex-col ml-auto">
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
                                className={`inputStyle outline-none w-[60px] h-[40px] text-center  ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}     px-3  rounded-lg  font-AeonikProRegular `}
                                value={state?.quantityNum}
                                onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
                    <div className="w-[45%] flex items-center gap-x-[25px]">
                        <div className="w-fit hidden md:flex flex-col items-start">
                            <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                    {t("SSage")}
                                </div>
                            </div>
                            <div className="w-fit flex items-center">
                                <input
                                    type="number"
                                    name="ageNum"
                                    className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px] outline-none "
                                    placeholder=""
                                    value={state?.ageNum}
                                    onChange={(e) => setState({ ...state, ageNum: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-[55%]">
                            <div className="flex items-center mb-2 ll:mb-[10px] ">
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                    {t("SSprice")}
                                </div>
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </div>
                            <label htmlFor="priceAccess" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}    px-3 py-[6px] rounded-lg text-xs`}>
                                <input
                                    type="text"
                                    placeholder="0"
                                    name="priceNum"
                                    id="priceAccess"
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
                    <div className="w-[40%] flex flex-col items-start">
                        <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                            <div
                                className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                {t("SSsale")}
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className="w-full flex items-center gap-x-1">
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
                <div className="w-full h-fit  flex items-center justify-end gap-x-5">
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
                    dressInfo?.ProductFilterType === SelectedNumber || toggle && typeId ?
                        "!bg-textBlueColor text-white" :
                        "text-[#bababa]  border-[#bababa]" :
                    "text-textBlueColor focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white border-textBlueColor"} 
                    group px-[15px] h-[38px]  border-[1.5px] select-none font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer rounded-lg transition duration-300
                    `}
            trigger="click"
            options={["Hide"]}
            placement="bottom"
            content={dressInfo?.ProductFilterType || typeId ? dressInfo?.ProductFilterType == SelectedNumber || toggle && typeId ? contentAccessories : null : contentAccessories}
        >
            {
                title?.filter(e => e?.id === SelectedNumber)?.map(item => {
                    return (
                        <span key={item?.id}>
                            {languageDetector?.typeLang === "ru" && item?.name_ru}
                            {languageDetector?.typeLang === "uz" && item?.name_uz}
                        </span>
                    )
                })
            }
        </Popover>
    );
}
export default React.memo(AccessoriesAdd)
