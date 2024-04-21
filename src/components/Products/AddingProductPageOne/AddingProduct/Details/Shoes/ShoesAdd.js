import React, { useContext, useEffect, useState } from "react";
import { LineIcon, StarLabel } from "../../../../../../assets/icons";
import { Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";
import { BiPlus } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../../../language/LanguageItem";

function ShoesAdd({ title, typeId, handleCallBack }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [languageDetector] = useContext(LanguageDetectorDress);

    const [state, setState] = useState({
        minFootLength: "",
        maxFootLength: "",
        maxFootLengthShow: false,
        minSize: "",
        ageNum: "",
        priceNum: "",
        salePercent: "",
        salePrice: "",
        quantityNum: "",
        isCheckValid: false,
        // ------
        onConcel: false,
        checkEmpty: false

    })
    const { t } = useTranslation("product");

    useEffect(() => {
        if (Number(state?.salePercent) > 0) {
            const sale = Number(state?.priceNum) * (100 - state?.salePercent) / 100
            // const formattedValue = parseInt(sale).toLocaleString()
            setState({ ...state, salePrice: parseInt(sale) })
        }
        if (!state?.salePercent) {
            setState({ ...state, salePrice: 0 })
        }
    }, [state?.salePercent, state?.priceNum])
     const [toggleShow, setToggleShow] = useState(false)
    const [toggle, setToggle] = useState(false)
    const SelectedNumber = 4
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
        if (!state?.minFootLength && state?.maxFootLength) {
            setState({ ...state, checkEmpty: true })
        } else {
            if (state?.minSize && state?.priceNum && state?.quantityNum) {
                handleCallBack({
                    footWearSize: state?.minSize,
                    minFootLength: state?.minFootLength,
                    maxFootLength: state?.maxFootLength,
                    amount: state?.quantityNum,
                    age: state?.ageNum,
                    price: state?.priceNum,
                    discountPercent: state?.salePercent,
                    discountPrice: state?.salePrice,
                    category_Id: SelectedNumber,
                })
                setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
                setState({
                    ...state, isCheckValid: false, onConcel: true, checkEmpty: false
                })
                setToggleShow(false)
            }
        }
    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            ...state,
            minFootLength: "",
            maxFootLength: "",
            minSize: "",
            ageNum: "",
            priceNum: "",
            salePercent: "",
            salePrice: "",
            quantityNum: "",
            isCheckValid: false,
            // ------
            onConcel: false,
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
     const contentShoes = (
        <div className="w-fit h-fit">
            <div
                className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="w-full flex gap-x-10 px-3 pt-5">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            {t("SSsize")}
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="w-[58px] flex items-center justify-between gap-x-1">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    name="minSize"
                                    className={`inputStyle outline-none w-full text-start h-[40px] ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3  rounded-lg   font-AeonikProRegular `}
                                    value={state?.minSize}
                                    onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            {t("SSfoot_Length")}
                            <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                        </p>
                        <div className="flex items-center gap-x-1">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    name="minFootLength"
                                    className={`inputStyle outline-none w-[60px] h-[40px] text-center   ${state?.checkEmpty && !state?.minFootLength && state?.maxFootLength ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg   font-AeonikProRegular`}
                                    placeholder={t("SSmin")}
                                    value={state?.minFootLength}
                                    onChange={(e) => setState({ ...state, minFootLength: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                            </div>
                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                            <div className="flex flex-col">

                                {state?.maxFootLengthShow ?
                                    <input
                                        type="number"
                                        name="maxFootLength"
                                        className="inputStyle outline-none w-[60px] h-[40px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                        placeholder={t("SSmax")}
                                        value={state?.maxFootLength}
                                        onChange={(e) => setState({ ...state, maxFootLength: e.target.value })}
                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    /> :
                                    <button onClick={() => setState({ ...state, maxFootLengthShow: true })} className="border border-borderColor bg-white  rounded-lg  w-[60px] text-center h-[38px] flex items-center justify-center">
                                        <BiPlus color="#007DCA" size={20} />
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col md:ml-5">
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
                                className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
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
                                    name="ageNum"
                                    className="inputStyle w-[58px] h-[40px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
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
                            <label htmlFor="priceShoes" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3 py-[6px] rounded-lg text-xs `}>
                                <input
                                    type="text"
                                    id="priceShoes"
                                    placeholder="0"
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
                                className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
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
            content={dressInfo?.ProductFilterType || typeId ? dressInfo?.ProductFilterType == SelectedNumber || toggle && typeId ? contentShoes : null : contentShoes}
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
export default React.memo(ShoesAdd)
