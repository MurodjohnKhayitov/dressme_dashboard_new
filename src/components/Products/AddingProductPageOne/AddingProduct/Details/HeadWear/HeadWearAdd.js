import React, { useContext, useEffect, useState } from "react";
import { LineIcon, StarLabel } from "../../../../../../assets/icons";
import { Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";
import { BiPlus } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../../../language/LanguageItem";

function HeadWearAdd({ title, typeId, handleCallBack }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const { t } = useTranslation("product");
    const [languageDetector] = useContext(LanguageDetectorDress);

    const [state, setState] = useState({
        minHeadGirth: "",
        maxHeadGirth: "",
        maxHeadGirthShow: false,
        sizeCheck: false,
        amount: "",
        age: "",
        price: "",
        discountPercent: "",
        discountPrice: "",
        isCheckValid: false,
        // ------
        onConcel: false,
        // ----
        toggleShow: false,
        isHasTypeId: false,
        checkEmpty: false

    })
    const SelectedNumber = 1
    useEffect(() => {
        if (Number(typeId) === SelectedNumber) {
            setState({ ...state, isHasTypeId: true })
        } else {
            setState({ ...state, isHasTypeId: false })
        }

    }, [typeId])


    const handleChangePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
        // const formattedValue = Number(sanitizedValue).toLocaleString()
        setState({ ...state, price: sanitizedValue });
    };
    const handleChangeSalePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
        const formattedValue = Number(sanitizedValue).toLocaleString()
        setState({ ...state, discountPrice: formattedValue });
    };


    const handleChangePercent = (event) => {
        const { value } = event.target
        if (value >= 0 && value < 100) {
            setState({ ...state, discountPercent: value });
        }
        if (!value) {
            setState({ ...state, discountPercent: "" });
        }
    };

    const onChangeSwitch = (checked) => {
        setState({ ...state, sizeCheck: checked })
    };


    const handleOpenPopver = (newOpen) => {
        setState({ ...state, toggleShow: newOpen })
    }
    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        if (!state?.minHeadGirth && state?.maxHeadGirth) {
            setState({ ...state, checkEmpty: true })
        } else {
            if (state?.amount && state?.price) {
                handleCallBack({
                    minHeadGirth: state?.minHeadGirth,
                    maxHeadGirth: state?.maxHeadGirth,
                    oneSize: state?.sizeCheck,
                    amount: state?.amount,
                    age: state?.age,
                    price: state?.price,
                    discountPercent: state?.discountPercent,
                    discountPrice: state?.discountPrice,
                    category_Id: SelectedNumber,

                })
                setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
                setState({ ...state, isCheckValid: false, onConcel: true, toggleShow: false, checkEmpty: false })
            }
        }

    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            ...state,
            minHeadGirth: '',
            maxHeadGirth: '',
            sizeCheck: false,
            amount: '',
            age: '',
            price: '',
            discountPercent: '',
            discountPrice: '',
            onConcel: false,
            toggleShow: false,
            checkEmpty: false
        })
        handleCallBack()
    }

    useEffect(() => {
        if (Number(state?.discountPercent) > 0) {
            const value = Number(state?.price) * (100 - state?.discountPercent) / 100
            setState({ ...state, discountPrice: parseInt(value) })
        }
        if (!state?.discountPercent) {
            setState({ ...state, discountPrice: 0 })
        }
    }, [state?.discountPercent, state?.price])

     const contentHat = (
        <div className="w-[650px] h-fit">
            <div
                className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="w-full flex justify-start px-3  gap-x-10  pt-5 ">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                            {t("SShead_circumference")}
                            <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                        </p>
                        <div className="w-full flex items-center mt-[10px]">
                            <div className={`flex flex-col rounded-lg  ${state?.checkEmpty && !state?.minHeadGirth ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}`}>
                                <input
                                    type="number"
                                    name="minHeadGirth"
                                    className={`inputStyle w-[55px] h-[38px] text-center  bg-transparent  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                    placeholder={t("SSmin")}
                                    value={state?.minHeadGirth}
                                    onChange={(e) => setState({ ...state, minHeadGirth: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    required
                                />
                            </div>
                            <span className="mx-[5px]"><LineIcon /></span>
                            <div className="flex flex-col">
                                {state?.maxHeadGirthShow ? <input
                                    type="number"
                                    name="maxHeadGirth"
                                    className={`inputStyle w-[55px] h-[38px] text-center  border border-borderColor bg-white px-2 rounded-lg  font-AeonikProRegular  outline-none`}
                                    placeholder={t("SSmax")}
                                    value={state?.maxHeadGirth}
                                    onChange={(e) => setState({ ...state, maxHeadGirth: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    required
                                />
                                    :
                                    <button onClick={() => setState({ ...state, maxHeadGirthShow: true })} className="border border-borderColor bg-white  rounded-lg  w-[55px] text-center h-[38px] flex items-center justify-center">
                                        <BiPlus color="#007DCA" size={20} />
                                    </button>}
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center justify-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                            {t("SSone_Size")}
                            <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                        </p>
                        <div className="flex items-center justify-center mt-[10px]">
                            <Switch
                                className={`border border-borderColor bg-[#8B8B8B] `}
                                onChange={onChangeSwitch}
                                defaultChecked={state?.sizeCheck}
                            />
                        </div>
                    </div>
                    <div className="w-fit flex flex-col items-center">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                            {t("SSquantity")}
                            {/* <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span> */}
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-start justify-between mt-[10px]">
                            <input
                                type="number"
                                name="amount"
                                className={`inputStyle w-[60px] h-[38px] text-center  flex items-center justify-center outline-none px-1 ${state?.isCheckValid && !state?.amount ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
                                value={state?.amount}
                                onChange={(e) => setState({ ...state, amount: e.target.value })}
                                onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row px-3 gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mt-[15px]">
                    <div className="w-1/2 flex items-center gap-x-[25px]">
                        <div className="w-fit hidden md:flex flex-col items-start">
                            <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                    {t("SSage")}
                                </div>
                            </div>
                            <div className="w-full flex items-center">
                                <input
                                    type="number"
                                    name="age"
                                    className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                                    placeholder=" "
                                    value={state?.age}
                                    onChange={(e) => setState({ ...state, age: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-[90%]">
                            <div className="flex items-center mb-2 ll:mb-[10px] ">
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                    {t("SSprice")}
                                </div>
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </div>
                            <label htmlFor="enterPrice" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.price ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3 py-[6px] rounded-lg text-xs`}>
                                <input
                                    type="text"
                                    placeholder="0"
                                    id="enterPrice"
                                    name="price"
                                    className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                    value={Number(state?.price)?.toLocaleString()}
                                    onChange={handleChangePrice}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                                    required
                                />
                                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                    {t("SSsumm")}
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col items-start">
                        <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                            <div
                                className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                {t("SSsale")}
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <div className="w-full flex items-center gap-x-1">
                                <div className="w-[40%] md:w-[72px] flex items-start">
                                    <div className={`w-full h-10 flex items-center justify-center border border-borderColor ${state?.price > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                        {state?.price > 0 ?
                                            <input
                                                type="number"
                                                name="discountPercent"
                                                placeholder="0"
                                                className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                value={state?.discountPercent}
                                                onChange={handleChangePercent}
                                                onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                                            />
                                            :
                                            <input
                                                type="number"
                                                name="discountPercent"
                                                placeholder="0"
                                                className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                readOnly
                                            />}

                                        <span className="text-textLightColor ml-1">%</span>
                                    </div>
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="w-[60%] md:w-[75%] flex items-center">
                                    <label htmlFor="discountPrice" className={`w-full h-[40px] flex items-center justify-between  ${state?.price > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            id="discountPrice"
                                            name="discountPrice"
                                            className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                            value={Number(state?.discountPrice)?.toLocaleString()}
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
                    {state?.onConcel &&
                        <button onClick={cancelSendDetail} className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1">
                            {t("SScancel")}
                        </button>}
                    <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                        {t("SSready")}
                    </button>
                </div>
            </div>
        </div >
    );
    return (
        <Popover
            open={state?.toggleShow}
            onOpenChange={handleOpenPopver}

            className={`
            ${dressInfo?.ProductFilterType || typeId ?
                    dressInfo?.ProductFilterType == SelectedNumber || state?.isHasTypeId && typeId ?
                        "!bg-textBlueColor text-white" :
                        "text-[#bababa]  border-[#bababa]" :
                    "text-textBlueColor focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white border-textBlueColor"} 
                    group px-[15px] h-[38px]  border-[1.5px] select-none font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer rounded-lg transition duration-300
                    `}
            trigger="click"
            options={["Hide"]}
            placement="bottom"
            content={dressInfo?.ProductFilterType || typeId ? dressInfo?.ProductFilterType == SelectedNumber || state?.isHasTypeId && typeId ? contentHat : null : contentHat}
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
export default React.memo(HeadWearAdd)
