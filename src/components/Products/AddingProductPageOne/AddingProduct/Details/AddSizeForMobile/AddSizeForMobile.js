import React, { useContext, useEffect, useState } from 'react'
import { CloseAnswer, LineIcon, StarLabel } from '../../../../../../assets/icons'
import { dressMainData } from '../../../../../../hook/ContextTeam';
import { Switch } from 'antd';
import { BiPlus } from 'react-icons/bi';
import { ClipLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
import { LanguageDetectorDress } from "../../../../../../language/LanguageItem";

export default function AddSizeForMobile({ onClick, title, typeId, handleCallBackOut,
    handleCallBackHead,
    handleCallBackUnder,
    handleCallBackShoes,
    handleCallBackAccess, clothingCategoryModal, setClothingCategoryModal }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [decraseList, setDecraseList] = useState(false)
    const { t } = useTranslation("product");
    const [languageDetector] = useContext(LanguageDetectorDress);

    const [state, setState] = useState({
        minHeadGirth: "",
        maxHeadGirth: "",
        sizeCheck: false,
        // outWear
        minBreast: "",
        maxBreast: "",
        minSize: "",
        maxSize: "",
        minHeight: "",
        maxHeight: "",
        minHips: "",
        maxHips: "",
        minWaist: "",
        maxWaist: "",
        // shoesWear
        minFootLength: "",
        maxFootLength: "",
        one_size: "",
        // Accessuar
        rowSize: "",
        colSize: "",
        //Universal
        quantityNum: "",
        age: "",
        price: "",
        discountPercent: "",
        discountPrice: "",
        sizeListCheck: "",
        selected: "",
        isCheckValid: false,
        // --------------------
        maxHeadGirthShow: false,
        maxSizeShow: false,
        maxBreastShow: false,
        maxHeightShow: false,
        maxHipsShow: false,
        maxWaistShow: false,
        maxFootLengthShow: false,
        // ------
        sendingLoader: false,
        // ------
        onConcel: false,
        // ----
        toggleShow: false,
        isHasTypeId1: false,
        isHasTypeId2: false,
        isHasTypeId3: false,
        isHasTypeId4: false,
        isHasTypeId5: false,
        checkEmpty: false,
        category_Id: null,
    })
    const SelectedNumber = 1
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

    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        if (!state?.minHeadGirth && state?.maxHeadGirth) {
            setState({ ...state, checkEmpty: true })
        } else {
            if (Number(typeId) === 1 && state?.quantityNum && state?.price) {
                setClothingCategoryModal(false)
                handleCallBackHead({
                    minHeadGirth: state?.minHeadGirth,
                    maxHeadGirth: state?.maxHeadGirth,
                    oneSize: state?.sizeCheck,
                    amount: state?.quantityNum,
                    age: state?.age,
                    price: state?.price,
                    discountPercent: state?.discountPercent,
                    discountPrice: state?.discountPrice,
                    category_Id: 1,
                })
                setDressInfo({ ...dressInfo, ProductFilterType: 1 })
                setState({ ...state, isCheckValid: false, onConcel: true, toggleShow: false, checkEmpty: false })
            }
        }
        if (!state?.minBreast && state?.maxBreast ||
            !state?.minSize && state?.maxSize ||
            !state?.minWaist && state?.maxWaist ||
            !state?.minHips && state?.maxHips) {
            setState({ ...state, checkEmpty: true })
        } else {
            if (Number(typeId) === 2 && state?.minSize && state?.quantityNum && state?.price) {
                setClothingCategoryModal(false)
                setDressInfo({ ...dressInfo, ProductFilterType: 3 })
                setState({ ...state, isCheckValid: false, onConcel: true, toggleShow: false, checkEmpty: false })
                handleCallBackOut({
                    minChestGirth: state?.minBreast,
                    maxChestGirth: state?.maxBreast,
                    minOutWearSize: state?.minSize,
                    maxOutWearSize: state?.maxSize,
                    minOutWearWaistGirth: state?.minWaist,
                    maxOutWearWaistGirth: state?.maxWaist,
                    minOutWearHipGirth: state?.minHips,
                    maxOutWearHipGirth: state?.maxHips,
                    outWearLetterSize: state?.sizeListCheck,
                    amount: state?.quantityNum,
                    age: state?.age,
                    price: state?.price,
                    discountPercent: state?.discountPercent,
                    discountPrice: state?.discountPrice,
                    category_Id: 2,

                })
            }
        }
        if (!state?.minBreast && state?.maxBreast ||
            !state?.minSize && state?.maxSize ||
            !state?.minHeight && state?.maxHeight ||
            !state?.minHips && state?.maxHips) {
            setState({ ...state, checkEmpty: true })
        } else {
            if (Number(typeId) === 3 && state?.minSize && state?.quantityNum && state?.price) {
                setClothingCategoryModal(false)
                setDressInfo({ ...dressInfo, ProductFilterType: 3 })
                setState({
                    ...state, isCheckValid: false, onConcel: true, checkEmpty: false, toggleShow: false,
                })
                // setToggleShow(false)
                handleCallBackUnder({
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
                    age: state?.age,
                    price: state?.price,
                    discountPercent: state?.discountPercent,
                    discountPrice: state?.discountPrice,
                    category_Id: 3,
                })
            }
        }
        if (!state?.minFootLength && state?.maxFootLength) {
            setState({ ...state, checkEmpty: true })
        } else {
            if (Number(typeId) === 4 && state?.minSize && state?.price && state?.quantityNum) {
                setClothingCategoryModal(false)
                handleCallBackShoes({
                    footWearSize: state?.minSize,
                    minFootLength: state?.minFootLength,
                    maxFootLength: state?.maxFootLength,
                    amount: state?.quantityNum,
                    age: state?.age,
                    price: state?.price,
                    discountPercent: state?.discountPercent,
                    discountPrice: state?.discountPrice,
                    category_Id: 4,
                })
                setDressInfo({ ...dressInfo, ProductFilterType: 4 })
                setState({
                    ...state, isCheckValid: false, onConcel: true, checkEmpty: false, toggleShow: false,
                })
                // setToggleShow(false)
            }
        }
        if (Number(typeId) === 5 && state?.price) {
            setClothingCategoryModal(false)
            handleCallBackAccess({
                accessorySize: state?.minSize,
                legnthAcc: state?.rowSize,
                widthAcc: state?.colSize,
                accessoryLetterSize: state?.sizeListCheck,
                amount: state?.quantityNum,
                age: state?.age,
                price: state?.price,
                discountPercent: state?.discountPercent,
                discountPrice: state?.discountPrice,
                category_Id: 5,

            })
            setDressInfo({ ...dressInfo, ProductFilterType: 5 })
            setState({ ...state, isCheckValid: false, onConcel: true, toggleShow: false, })
            // setToggleShow(false)
        }
    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            minHeadGirth: null,
            maxHeadGirth: null,
            sizeCheck: false,
            // outWear
            minBreast: null,
            maxBreast: null,
            minSize: null,
            maxSize: null,
            minHeight: null,
            maxHeight: null,
            minHips: null,
            maxHips: null,
            minWaist: null,
            maxWaist: null,
            // shoesWear
            minFootLength: null,
            maxFootLength: null,
            one_size: null,
            // Accessuar
            rowSize: null,
            colSize: null,
            //Universal
            quantityNum: null,
            age: null,
            price: null,
            discountPercent: "",
            discountPrice: "",
            sizeListCheck: null,
            selected: null,
            isCheckValid: false,
            // --------------------
            maxHeadGirthShow: false,
            maxSizeShow: false,
            maxBreastShow: false,
            maxHeightShow: false,
            maxHipsShow: false,
            maxWaistShow: false,
            maxFootLengthShow: false,
            // ------
            sendingLoader: false,
            // ------
            onConcel: false,
            // ----
            toggleShow: false,

            checkEmpty: false,
            category_Id: null,
        })
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

    return (
        <div className=' w-full bg-white h-full'>
            <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
                <p className="text-base font-AeonikProMedium">   {t("APaddSize")}</p>
                <button onClick={() => setClothingCategoryModal(false)}>
                    <CloseAnswer colors={"#b5b5b5"} />
                </button>
            </section>

            <div className='flex flex-col px-4'>
                {Number(typeId) === 1 &&
                    <div className="w-full max-w-[440px] h-fit">
                        <div
                            className={`w-full h-fit flex border p-1 gap-y-4 rounded-lg flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                        >
                            {/* <div className="w-full ">
                        {productsDataIdEdit?.colors?.filter(e => Number(e?.id) === Number(selectColorID))?.map((data, index) => {
                            return (
                                <div key={index} className={`flex justify-start items-center gap-x-2 px-3 ${data ? "" : "hidden"}`}>
                                    <span className="text-black text-base not-italic font-AeonikProRegular"> Цвет:</span>
                                    <div
                                        key={data?.id}
                                        style={{ background: `${data.hex}` }}
                                        className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
                                    >
                                    </div>
                                </div>
                            );
                        })}
                    </div> */}
                            <div className="w-full grid grid-cols-2 gap-4   ">
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                                        {t("SShead_circumference")}
                                        <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>

                                    </p>
                                    <div className="w-full flex items-center mt-[10px]">
                                        <div className="flex flex-col">
                                            <input
                                                type="number"
                                                className={`inputStyle w-[55px] h-[38px] text-center ${state?.checkEmpty && !state?.minHeadGirth ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                                placeholder={t("SSmin")}
                                                name="minHeadGirth"
                                                value={state?.minHeadGirth}
                                                onChange={(e) => setState({ ...state, minHeadGirth: e.target.value })}
                                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                                required
                                            />
                                        </div>
                                        <span className="mx-[5px]"><LineIcon /></span>
                                        <div className="flex flex-col">
                                            {state?.maxHeadGirthShow ?
                                                <input
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
                                                <button
                                                    type="button"
                                                    onClick={() => setState({ ...state, maxHeadGirthShow: true })}
                                                    className={`inputStyle w-[55px] h-[38px] flex items-center justify-center  border border-borderColor bg-white px-2 rounded-lg  font-AeonikProRegular  outline-none`}>
                                                    <BiPlus color="#007DCA" size={20} />
                                                </button>}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center justify-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                                        {t("SSone_Size")}
                                        <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>

                                    </p>
                                    <div className="flex items-center justify-center mt-[10px]">
                                        <Switch
                                            className={`border border-borderColor bg-[#8B8B8B] `}
                                            onChange={onChangeSwitch}
                                            checked={state?.sizeCheck}
                                        // defaultChecked={state?.sizeCheck}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center  ">
                                <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                    {t("SSquantity")}
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </p>
                                <div className="w-full flex items-start justify-center gap-x-1 mt-[10px]">
                                    <button
                                        type="button"
                                        onClick={(e) => setState({ ...state, quantityNum: Number(state?.quantityNum) - 1, })}
                                        className="flex items-center  text-[20px] w-[120px] h-[38px] border border-borderColor bg-[#E5E5E5] rounded-lg justify-center">
                                        <span>-</span>
                                    </button>
                                    <input
                                        type="number"
                                        name="quantityNum"
                                        className={`inputStyle w-[60px] h-[38px] text-center  flex items-center justify-center outline-none px-1 ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
                                        value={state?.quantityNum}
                                        onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => setState({ ...state, quantityNum: Number(state?.quantityNum) + 1, })}
                                        className="flex items-center  text-[20px] w-[120px] h-[38px] border border-borderColor bg-[#E5E5E5] rounded-lg justify-center">
                                        <span>+</span>
                                    </button>
                                </div>
                            </div>
                            <div className="w-full flex  justify-between  ">
                                <div className="w-[40%] flex items-center  ">

                                    <div className="w-full ">
                                        <div className="flex items-center mb-2 ll:mb-[10px] ">
                                            <div
                                                className="flex items-center text-[14px] xs:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                                {t("SSprice")}
                                            </div>
                                            <span className="ml-[5px]">
                                                <StarLabel />
                                            </span>
                                        </div>
                                        <label htmlFor="enterPrice1" className={`w-full h-[38px] flex items-center ${state?.isCheckValid && !state?.price ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3 py-[6px] rounded-lg text-xs`}>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                id="enterPrice1"
                                                name="price"
                                                className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                                value={Number(state?.price)?.toLocaleString()}
                                                onChange={handleChangePrice}
                                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish

                                                required
                                            />
                                            <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                                {t("SSsumm")}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-[57%] flex flex-col items-start">
                                    <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                                        <div
                                            className="flex items-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                            {t("SSsale")}
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center justify-center">
                                        <div className="w-full flex items-center gap-x-1">
                                            <div className=" w-[60px] flex items-start">
                                                <div className={`w-full h-[38px] flex items-center justify-center border border-borderColor ${Number(state?.price) > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                                    {Number(state?.price) > 0 ?
                                                        <input
                                                            type="number"
                                                            placeholder="0"
                                                            name="salePercent"
                                                            className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                            value={state?.discountPercent}
                                                            onChange={handleChangePercent}
                                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish

                                                        />
                                                        :
                                                        <input
                                                            type="number"
                                                            placeholder="0"
                                                            name="salePercent"
                                                            className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                            readOnly
                                                        />}
                                                    <span className="text-textLightColor ml-1">%</span>
                                                </div>
                                            </div>
                                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                            <div className=" w-[75%] flex items-center">
                                                <label htmlFor="salePrice1" className={`w-full h-[38px] flex items-center justify-between  ${Number(state?.price) > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                                    <input
                                                        type="text"
                                                        placeholder="0"
                                                        id="salePrice1"
                                                        name="salePrice1"
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
                            <div className="w-full h-fit  flex  justify-between  ">
                                <div className="w-fit  flex flex-col items-start">
                                    <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                        <div
                                            className="flex items-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                            {t("SSage")}
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <input
                                            type="number"
                                            name="age"
                                            className="inputStyle w-[58px] h-[38px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                                            placeholder=" "
                                            value={state?.age}
                                            onChange={(e) => setState({ ...state, age: e.target.value })}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        />
                                    </div>
                                </div>
                                <div className='w-fit flex items-center gap-x-4'>
                                    {state?.onConcel && <button onClick={cancelSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1">
                                        {t("SScancel")}
                                    </button>}
                                    <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-[14px] xs:text-base text-textBlueColor   font-AeonikProMedium ">
                                        {t("SSready")}
                                    </button>
                                </div>


                            </div>
                        </div>
                    </div >
                }
                {Number(typeId) === 2 &&
                    <div
                        className={`w-full h-fit p-1 border rounded-lg gap-y-4 flex flex-col items-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                    >
                        {/* <div className="w-full ">
                         {productsDataIdEdit?.colors?.filter(e => e?.id == selectColorID)?.map((data, index) => {
                             return (
                                 <div key={index} className={`flex justify-start items-center gap-x-2 px-3 ${data ? "" : "hidden"}`}>
                                     <span className="text-black text-base not-italic font-AeonikProRegular"> Цвет:</span>
                                     <div
                                         key={data?.id}
                                         style={{ background: `${data.hex}` }}
                                         className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
                                     >
                                     </div>
                                 </div>
                             );
                         })}
                     </div> */}
                        <div className="w-full flex   grid grid-cols-2 gap-4">
                            <div className="w-full flex flex-col">
                                <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                    {t("SSchest_circumference")}
                                    <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                                </p>
                                <div className="flex items-center">
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px]  ${state?.checkEmpty && !state?.minBreast && state?.maxBreast ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg  font-AeonikProRegular `}
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
                                                name="maxBreast"
                                                className={`inputStyle outline-none w-[60px] text-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                                placeholder={t("SSmax")}
                                                value={state?.maxBreast}
                                                onChange={(e) => setState({ ...state, maxBreast: e.target.value })}
                                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                            />
                                            :
                                            <button
                                                type="button"
                                                onClick={() => setState({ ...state, maxBreastShow: true })}
                                                className={`inputStyle outline-none w-[60px] flex items-center justify-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                            >
                                                <BiPlus color="#007DCA" size={20} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                    {t("SSsize")}
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </p>
                                <div className="flex items-center">
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            name="minSize"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px]  ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3  rounded-lg font-AeonikProRegular `}
                                            placeholder={t("SSmin")}
                                            value={state?.minSize}
                                            onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        />
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="flex flex-col">
                                        {state?.maxSizeShow ? <input
                                            type="number"
                                            name="maxSize"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px] border border-borderColor bg-white px-3  rounded-lg font-AeonikProRegular `}
                                            placeholder={t("SSmax")}
                                            value={state?.maxSize}
                                            onChange={(e) => setState({ ...state, maxSize: e.target.value })}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        /> :
                                            <button onClick={() => setState({ ...state, maxSizeShow: true })} className="border border-borderColor bg-white  rounded-lg  w-[60px] text-center h-[38px] flex items-center justify-center">
                                                <BiPlus color="#007DCA" size={20} />
                                            </button>}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                    {t("SSwaist")}
                                    <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                                </p>
                                <div className="flex items-center">
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            name="minWaist"
                                            className={`inputStyle outline-none w-[60px] h-[38px]  text-center  ${state?.checkEmpty && !state?.minWaist && state?.maxWaist ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-2 md:px-3  rounded-lg   font-AeonikProRegular `}
                                            placeholder={t("SSmin")}
                                            value={state?.minWaist}
                                            onChange={(e) => setState({ ...state, minWaist: e.target.value })}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        />
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="flex flex-col">

                                        {state?.maxWaistShow ?
                                            <input
                                                type="number"
                                                name="maxWaist"
                                                className={`inputStyle outline-none w-[60px] h-[38px]  text-center border border-borderColor bg-white px-2 md:px-3  rounded-lg  font-AeonikProRegular `}
                                                placeholder={t("SSmax")}
                                                value={state?.maxWaist}
                                                onChange={(e) => setState({ ...state, maxWaist: e.target.value })}
                                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                            />
                                            :
                                            <button
                                                type="button"
                                                onClick={() => setState({ ...state, maxWaistShow: true })}
                                                className={`inputStyle outline-none w-[60px] flex items-center justify-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                            >
                                                <BiPlus color="#007DCA" size={20} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                    {t("SShip_circumference")}
                                </p>
                                <div className="flex items-center">
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            name="minHips"
                                            className={`inputStyle outline-none w-[60px] h-[38px]  text-center ${state?.checkEmpty && !state?.minHips && state?.maxHips ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-2 md:px-3  rounded-lg   font-AeonikProRegular `}
                                            placeholder={t("SSmin")}
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
                                                name="maxHips"
                                                className="inputStyle outline-none w-[60px] h-[38px] text-center border border-borderColor px-2 md:px-3  rounded-lg  font-AeonikProRegular "
                                                placeholder={t("SSmax")}
                                                value={state?.maxHips}
                                                onChange={(e) => setState({ ...state, maxHips: e.target.value })}
                                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                            />
                                            :
                                            <button
                                                type="button"
                                                onClick={() => setState({ ...state, maxHipsShow: true })}
                                                className={`inputStyle outline-none w-[60px] flex items-center justify-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                            >
                                                <BiPlus color="#007DCA" size={20} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full    gap-y-4">
                            <div className="w-full flex flex-col">
                                <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                    {t("SSletter_Size")}
                                </p>
                                <div className='w-full '>

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
                            <div className="w-full  flex flex-col  ">
                                <p className="w-full justify-center flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                    {t("SSquantity")}
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </p>
                                <div className="w-full flex items-start justify-center gap-x-1 ">
                                    <button
                                        type="button"
                                        onClick={() => setState({ ...state, quantityNum: Number(state?.quantityNum) - 1 })} className="flex items-center  text-[20px] w-[120px] h-[38px] border border-borderColor bg-[#E5E5E5] rounded-lg justify-center">
                                        <span>-</span>
                                    </button>
                                    <input
                                        type="number"
                                        name="quantityNum"
                                        className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
                                        value={state?.quantityNum}
                                        onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setState({ ...state, quantityNum: Number(state?.quantityNum) + 1 })}
                                        className="flex items-center  text-[20px] w-[120px] h-[38px] border border-borderColor bg-[#E5E5E5] rounded-lg justify-center">
                                        <span>
                                            +
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between ">
                            <div className="w-[40%] flex items-center gap-x-[25px]">
                                <div className="w-full  ">
                                    <div className="flex items-center mb-2 ll:mb-[10px] ">
                                        <span
                                            className="flex items-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                            {t("SSprice")}
                                        </span>
                                        <span className="ml-[5px]">
                                            <StarLabel />
                                        </span>
                                    </div>
                                    <label htmlFor="priceOutWear" className={`w-full h-[38px] flex items-center  ${state?.isCheckValid && !state?.price ? " border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3 py-[6px] rounded-lg text-xs`}>
                                        <input
                                            type="text"
                                            placeholder="0"
                                            id="priceOutWear"
                                            name="priceNum"
                                            className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent "
                                            value={Number(state?.price)?.toLocaleString()}
                                            onChange={handleChangePrice}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish

                                        />
                                        <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                            {t("SSsumm")}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="w-[57%] flex flex-col items-start">
                                <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                                    <div
                                        className="flex items-center text-[14px] xs:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                        {t("SSsale")}
                                    </div>

                                </div>
                                <div className="w-full flex items-center justify-center">
                                    <div className="w-full flex items-center gap-x-1">
                                        <div className="w-[60px] flex items-start">
                                            <div className={`w-full h-[38px] flex items-center justify-center border border-borderColor ${state?.price > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                                {state?.price > 0 ?
                                                    <input
                                                        type="number"
                                                        name="salePercent"
                                                        placeholder="0"
                                                        className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                        value={state?.discountPercent}
                                                        onChange={handleChangePercent}
                                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish

                                                    />
                                                    :
                                                    <span
                                                        className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    ></span>}
                                                <span className="text-textLightColor ml-1">%</span>
                                            </div>
                                        </div>
                                        <span className="w-[8px] ll:w-[15px] h-[2px] bg-borderColor mx-[2px] ll:mx-[4px]"></span>
                                        <div className="w-[60%] md:w-[75%] flex items-center">
                                            <label htmlFor="salePrice2" className={`w-full h-[38px] flex items-center justify-between  ${state?.price > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-1 ls:px-3 py-[6px] rounded-lg text-xs`}>
                                                <input
                                                    type="text"
                                                    placeholder="0"
                                                    id="salePrice2"
                                                    name="salePrice2"
                                                    className="inputStyle w-[85%] ll:w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
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

                        <div className="w-full h-fit  flex   justify-between  ">
                            <div className="w-fit  flex flex-col items-start">
                                <div className="flex items-center justify-center ">
                                    <div
                                        className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                        {t("SSage")}
                                    </div>
                                </div>
                                <div className="w-fit flex items-center">
                                    <input
                                        type="number"
                                        name="ageNum"
                                        className="inputStyle w-[58px] h-[38px] text-center fon border border-borderColor rounded-lg   outline-none"
                                        placeholder=""
                                        value={state?.age}
                                        onChange={(e) => setState({ ...state, age: e.target.value })}
                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    />
                                </div>
                            </div>
                            <div className='w-fit flex items-center gap-x-4'>
                                {state?.onConcel && <button onClick={cancelSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1">
                                    {t("SScancel")}
                                </button>}
                                <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-[14px] xs:text-base text-textBlueColor   font-AeonikProMedium ">
                                    {t("SSready")}
                                </button>
                            </div>

                        </div>
                    </div>
                }
                {Number(typeId) === 3 &&
                    <div className="w-full max-w-[440px] h-fit">
                        <div
                            className={`w-full border rounded-lg p-1 gap-y-4 h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                        >
                            {/* <div className="w-full ">
                        {productsDataIdEdit?.colors?.filter(e => e?.id == selectColorID)?.map((data, index) => {
                            return (
                                <div key={index} className={`flex justify-start items-center gap-x-2 px-3 ${data ? "" : "hidden"}`}>
                                    <span className="text-black text-base not-italic font-AeonikProRegular"> Цвет:</span>
                                    <div
                                        key={data?.id}
                                        style={{ background: `${data.hex}` }}
                                        className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
                                    >
                                    </div>
                                </div>
                            );
                        })}
                    </div> */}
                            <div className="w-full flex  grid grid-cols-2 gap-4">
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                        {t("SSwaist")}
                                        <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                                    </p>
                                    <div className="flex items-center">
                                        <div className="flex flex-col">
                                            <input
                                                type="number"
                                                name="minBreast"
                                                className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.checkEmpty && !state?.minBreast && state?.maxBreast ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3  rounded-lg   font-AeonikProRegular `}
                                                placeholder={t("SSmin")}
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
                                                    name="maxBreast"
                                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                                    placeholder={t("SSmax")}
                                                    value={state?.maxBreast}
                                                    onChange={(e) => setState({ ...state, maxBreast: e.target.value })}
                                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                                />
                                                :
                                                <button
                                                    type="button"
                                                    onClick={() => setState({ ...state, maxBreastShow: true })}
                                                    className={`inputStyle outline-none w-[60px] flex items-center justify-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                                >
                                                    <BiPlus color="#007DCA" size={20} />
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

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
                                                    name="minSize"
                                                    className={`inputStyle outline-none w-[60px] text-center h-[38px] ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg   font-AeonikProRegular `}
                                                    placeholder={t("SSmin")}
                                                    value={state?.minSize}
                                                    onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                                />
                                            </div>
                                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                            <div className="flex flex-col">
                                                {state?.maxSizeShow ? <input
                                                    type="number"
                                                    name="maxSize"
                                                    className={`inputStyle outline-none w-[60px] text-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                                    placeholder={t("SSmax")}
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
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                        {t("SSsize_circumference")}

                                    </p>
                                    <div className="flex items-center">
                                        <div className="flex flex-col">
                                            <input
                                                type="number"
                                                name="minHips"
                                                className={`inputStyle outline-none w-[60px] h-[38px] text-center  ${state?.checkEmpty && !state?.minHips && state?.maxHips ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3  rounded-lg   font-AeonikProRegular `}
                                                placeholder={t("SSmin")}
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
                                                    name="maxHips"
                                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                                    placeholder={t("SSmax")}
                                                    value={state?.maxHips}
                                                    onChange={(e) => setState({ ...state, maxHips: e.target.value })}
                                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                                />
                                                :
                                                <button
                                                    type="button"
                                                    onClick={() => setState({ ...state, maxHipsShow: true })}
                                                    className={`inputStyle outline-none w-[60px] flex items-center justify-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                                >
                                                    <BiPlus color="#007DCA" size={20} />
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                        {t("SSheight")}
                                    </p>
                                    <div className="flex items-center justify-between gap-x-1">
                                        <div className="flex items-center">
                                            <div className="flex flex-col">
                                                <input
                                                    type="number"
                                                    name="minHeight"
                                                    className={`inputStyle outline-none w-[60px] text-center h-[38px] ${state?.checkEmpty && !state?.minHeight && state?.maxHeight ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3  rounded-lg   font-AeonikProRegular `}
                                                    placeholder={t("SSmin")}
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
                                                        name="maxHeight"
                                                        className={`inputStyle outline-none w-[60px] text-center h-[38px] border border-borderColor bg-white px-3  rounded-lg  font-AeonikProRegular `}
                                                        placeholder={t("SSmax")}
                                                        value={state?.maxHeight}
                                                        onChange={(e) => setState({ ...state, maxHeight: e.target.value })}
                                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                                    />
                                                    :
                                                    <button
                                                        type="button"
                                                        onClick={() => setState({ ...state, maxHeightShow: true })}
                                                        className={`inputStyle outline-none w-[60px] flex items-center justify-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                                    >
                                                        <BiPlus color="#007DCA" size={20} />
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full  gap-y-4 flex flex-col">

                                <div className="w-full flex flex-col">
                                    <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                        {t("SSletter_Size")}
                                    </p>

                                    <div className='w-full '>

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
                                <div className="w-full flex flex-col md:ml-[14px]">
                                    <p className="w-full justify-center flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                        {t("SSquantity")}
                                        <span className="ml-[5px]">
                                            <StarLabel />
                                        </span>
                                    </p>
                                    <div className="w-full flex items-start justify-center gap-x-1 ">
                                        <button
                                            type="button"
                                            onClick={() => setState({ ...state, quantityNum: Number(state?.quantityNum) - 1 })} className="flex items-center  text-[20px] w-[120px] h-[38px] border border-borderColor bg-[#E5E5E5] rounded-lg justify-center">
                                            <span>-</span>
                                        </button>
                                        <input
                                            type="number"
                                            name="quantityNum"
                                            className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
                                            value={state?.quantityNum}
                                            onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setState({ ...state, quantityNum: Number(state?.quantityNum) + 1 })}
                                            className="flex items-center  text-[20px] w-[120px] h-[38px] border border-borderColor bg-[#E5E5E5] rounded-lg justify-center">
                                            <span>
                                                +
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between  ">
                                <div className="w-[40%] flex items-center ">
                                    <div className="w-full  ">
                                        <div className="flex items-center  mb-2 ll:mb-[10px]">
                                            <div
                                                className="flex items-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                                {t("SSprice")}
                                            </div>
                                            <span className="ml-[5px]">
                                                <StarLabel />
                                            </span>
                                        </div>
                                        <label htmlFor="priceNum" className={`w-full h-[38px] flex items-center ${state?.isCheckValid && !state?.price ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3 py-[6px] rounded-lg text-xs`}>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                id="price"
                                                className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                                value={Number(state?.price)?.toLocaleString()}
                                                onChange={handleChangePrice}
                                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                            />
                                            <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                                {t("SSsumm")}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-[57%] flex flex-col items-start">
                                    <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                                        <div
                                            className="flex items-center text-[14px] xs:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                            {t("SSsale")}
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center justify-center">
                                        <div className="w-full flex items-center gap-x-1">
                                            <div className="w-[60px] flex items-start">
                                                <div className={`w-full h-[38px] flex items-center justify-center border border-borderColor ${state?.price > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                                    {state?.price > 0 ?
                                                        <input
                                                            type="number"
                                                            name="salePercent"
                                                            placeholder="0"
                                                            className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                            value={state?.discountPercent}
                                                            onChange={handleChangePercent}
                                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                                        />
                                                        :
                                                        <span
                                                            className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                        ></span>}
                                                    <span className="text-textLightColor ml-1">%</span>
                                                </div>
                                            </div>
                                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                            <div className="w-[75%] flex items-center">
                                                <label htmlFor="salePrice3" className={`w-full h-[38px] flex items-center justify-between  ${state?.price > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                                    <input
                                                        type="text"
                                                        placeholder="0"
                                                        id="salePrice3"
                                                        name="salePrice3"
                                                        className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                                        value={Number(state?.discountPrice)?.toLocaleString()}
                                                        onChange={handleChangeSalePrice}
                                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
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
                            <div className="w-full h-fit flex   justify-between  ">
                                <div className="w-fit  flex flex-col items-start">
                                    <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                        <div
                                            className="flex items-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                            {t("SSage")}
                                        </div>
                                    </div>
                                    <div className="w-fit flex items-center">
                                        <input
                                            type="number"
                                            name="ageNum"
                                            className=" inputStyle w-[58px] h-[38px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none"
                                            placeholder=""
                                            value={state?.age}
                                            onChange={(e) => setState({ ...state, age: e.target.value })}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        />
                                    </div>
                                </div>

                                <div className='w-fit flex items-center gap-x-4'>
                                    {state?.onConcel && <button onClick={cancelSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1">
                                        {t("SScancel")}
                                    </button>}
                                    <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-[14px] xs:text-base text-textBlueColor   font-AeonikProMedium ">
                                        {t("SSready")}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                }
                {Number(typeId) === 4 &&
                    <div
                        className={`w-full border p-1 gap-y-4 rounded-lg h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                    >
                        {/* <div className="w-full ">
                       {productsDataIdEdit?.colors?.filter(e => e?.id == selectColorID)?.map((data, index) => {
                           return (
                               <div key={index} className={`flex justify-start items-center gap-x-2 px-3 ${data ? "" : "hidden"}`}>
                                   <span className="text-black text-base not-italic font-AeonikProRegular"> Цвет:</span>
                                   <div
                                       key={data?.id}
                                       style={{ background: `${data.hex}` }}
                                       className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
                                   >
                                   </div>
                               </div>
                           );
                       })}
                   </div> */}
                        <div className="w-full grid grid-cols-2 gap-4  flex ">
                            <div className="w-full flex flex-col">
                                <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                    {t("SSsize")}
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </p>
                                <div className="w-[58px] flex items-center justify-between gap-x-1">
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            name="one_size"
                                            className={`inputStyle outline-none w-full text-start h-[40px] ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3  rounded-lg   font-AeonikProRegular `}
                                            value={state?.minSize}
                                            onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-col">
                                <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                    {t("SSfoot_Length")}
                                    <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                                </p>
                                <div className="flex items-center gap-x-1">
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            name="minFootLength"
                                            className={`inputStyle outline-none w-[60px] h-[40px] text-center ${state?.checkEmpty && !state?.minFootLength && state?.maxFootLength ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3  rounded-lg   font-AeonikProRegular`}
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
                                            />
                                            :
                                            <button
                                                type="button"
                                                onClick={() => setState({ ...state, maxFootLengthShow: true })}
                                                className={`inputStyle outline-none w-[60px] flex items-center justify-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                            >
                                                <BiPlus color="#007DCA" size={20} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="w-full flex flex-col md:ml-5">
                            <p className="w-full justify-center flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                {t("SSquantity")}
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </p>
                            <div className="w-full flex items-start justify-center gap-x-1 ">
                                <button
                                    type="button"
                                    onClick={() => setState({ ...state, quantityNum: Number(state?.quantityNum) - 1 })} className="flex items-center  text-[20px] w-[120px] h-[38px] border border-borderColor bg-[#E5E5E5] rounded-lg justify-center">
                                    <span>-</span>
                                </button>
                                <input
                                    type="number"
                                    name="quantityNum"
                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
                                    value={state?.quantityNum}
                                    onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                    onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                />
                                <button
                                    type="button"
                                    onClick={() => setState({ ...state, quantityNum: Number(state?.quantityNum) + 1 })}
                                    className="flex items-center  text-[20px] w-[120px] h-[38px] border border-borderColor bg-[#E5E5E5] rounded-lg justify-center">
                                    <span>
                                        +
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between ">
                            <div className="w-[40%] flex items-center  ">
                                <div className="w-full  ">
                                    <div className="flex items-center mb-2 ll:mb-[10px] ">
                                        <div
                                            className="flex items-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                            {t("SSprice")}
                                        </div>
                                        <span className="ml-[5px]">
                                            <StarLabel />
                                        </span>
                                    </div>
                                    <label htmlFor="priceShoes" className={`w-full h-[38px] flex items-center ${state?.isCheckValid && !state?.price ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3 py-[6px] rounded-lg text-xs `}>
                                        <input
                                            type="text"
                                            id="priceShoes"
                                            placeholder="0"
                                            name="price"
                                            className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                            value={Number(state?.price)?.toLocaleString()}
                                            onChange={handleChangePrice}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish

                                        />
                                        <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                            {t("SSsumm")}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="w-[57%] flex flex-col items-start">
                                <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                                    <div
                                        className="flex items-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                        {t("SSsale")}
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-center">
                                    <div className="w-full flex items-center gap-x-1">
                                        <div className="w-[60px] flex items-start">
                                            <div className={`w-full h-[38px] flex items-center justify-center border border-borderColor ${state?.price > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                                {state?.price > 0 ?
                                                    <input
                                                        type="number"
                                                        name="salePercent"
                                                        placeholder="0"
                                                        className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                        value={state?.discountPercent}
                                                        onChange={handleChangePercent}
                                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish

                                                    />
                                                    :
                                                    <span

                                                        className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"

                                                    ></span>}
                                                <span className="text-textLightColor ml-1">%</span>
                                            </div>
                                        </div>
                                        <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                        <div className="w-[75%] flex items-center">
                                            <label htmlFor="salePrice4" className={`w-full h-[38px] flex items-center justify-between  ${state?.price > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                                <input
                                                    type="text"
                                                    placeholder="0"
                                                    id="salePrice4"
                                                    name="salePrice4"
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
                        <div className="w-full h-fit flex   justify-between  ">
                            <div className="w-fit  flex flex-col items-start">
                                <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                    <div
                                        className="flex items-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                        {t("SSage")}
                                    </div>
                                </div>
                                <div className="w-fit flex items-center">
                                    <input
                                        type="number"
                                        name="ageNum"
                                        className="inputStyle w-[58px] h-[38px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                                        placeholder=""
                                        value={state?.age}
                                        onChange={(e) => setState({ ...state, age: e.target.value })}
                                        onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                    />
                                </div>
                            </div>

                            <div className='w-fit flex items-center gap-x-4'>
                                {state?.onConcel && <button onClick={cancelSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1">
                                    {t("SScancel")}
                                </button>}
                                <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-[14px] xs:text-base text-textBlueColor   font-AeonikProMedium ">
                                    {t("SSready")}
                                </button>
                            </div>

                        </div>
                    </div>
                }
                {Number(typeId) === 5 &&
                    <div className="w-full max-w-[440px] h-fit">
                        <div
                            className={`border p-1 rounded-lg gap-y-4 w-full h-fit flex flex-col cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                        >
                            {/* <div className="w-full ">
                        {productsDataIdEdit?.colors?.filter(e => e?.id == selectColorID)?.map((data, index) => {
                            return (
                                <div key={index} className={`flex justify-start items-center gap-x-2 px-3 ${data ? "" : "hidden"}`}>
                                    <span className="text-black text-base not-italic font-AeonikProRegular"> Цвет:</span>
                                    <div
                                        key={data?.id}
                                        style={{ background: `${data.hex}` }}
                                        className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
                                    >
                                    </div>
                                </div>
                            );
                        })}
                    </div> */}
                            <div className="w-full flex  grid grid-cols-2 gap-4">
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                        {t("SSsize")}{" "}
                                        <span className="text-sm text-textLightColor ml-[6px]">({t("SSsm")})</span>
                                    </p>
                                    <div className="w-[60px] flex items-center justify-between gap-x-1">
                                        <div className="flex flex-col">
                                            <input
                                                type="number"
                                                name="one_size"
                                                className="inputStyle outline-none w-full text-start h-[38px] border border-borderColor px-3 rounded-lg  font-AeonikProRegular "
                                                value={state?.minSize}
                                                onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
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
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
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
                            </div>
                            <div className="w-full flex flex-col gap-y-4 ">
                                <div className="w-full flex flex-col">
                                    <p className="flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                        {t("SSletter_Size")}
                                    </p>
                                    <div className='w-full '>

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
                                <div className="w-full flex flex-col  ">
                                    <p className="w-full justify-center flex items-center text-[14px] xs:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                        {t("SSquantity")}
                                        <span className="ml-[5px]">
                                            <StarLabel />
                                        </span>
                                    </p>

                                    <div className="w-full flex items-start justify-center gap-x-1 ">
                                        <button
                                            type="button"
                                            onClick={() => setState({ ...state, quantityNum: Number(state?.quantityNum) - 1 })} className="flex items-center  text-[20px] w-[120px] h-[38px] border border-borderColor bg-[#E5E5E5] rounded-lg justify-center">
                                            <span>-</span>
                                        </button>
                                        <input
                                            type="number"
                                            name="quantityNum"
                                            className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
                                            value={state?.quantityNum}
                                            onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setState({ ...state, quantityNum: Number(state?.quantityNum) + 1 })}
                                            className="flex items-center  text-[20px] w-[120px] h-[38px] border border-borderColor bg-[#E5E5E5] rounded-lg justify-center">
                                            <span>
                                                +
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-row justify-between ">
                                <div className="w-[40%] flex items-center gap-x-[25px]">

                                    <div className="w-full md:w-[55%]">
                                        <div className="flex items-center mb-2 ll:mb-[10px] ">
                                            <div
                                                className="flex items-center text-[14px] xs:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                                {t("SSprice")}
                                            </div>
                                            <span className="ml-[5px]">
                                                <StarLabel />
                                            </span>
                                        </div>
                                        <label htmlFor="priceAccess" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.price ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}    px-3 py-[6px] rounded-lg text-xs`}>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                id="priceAccess"
                                                name="price"
                                                className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                                value={Number(state?.price)?.toLocaleString()}
                                                onChange={handleChangePrice}
                                                onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish

                                            />
                                            <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                                {t("SSsumm")}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="w-[57%] flex flex-col items-start">
                                    <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                                        <div
                                            className="flex items-center text-[14px] xs:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                            {t("SSsale")}
                                        </div>

                                    </div>
                                    <div className="w-full flex items-center justify-center">
                                        <div className="w-full flex items-center gap-x-1">
                                            <div className="w-[60px] flex items-start">
                                                <div className={`w-full h-[38px] flex items-center justify-center border border-borderColor ${state?.price > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                                    {state?.price > 0 ?
                                                        <input
                                                            type="number"
                                                            placeholder="0"
                                                            name="salePercent"
                                                            className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                            value={state?.discountPercent}
                                                            onChange={handleChangePercent}
                                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish

                                                        />
                                                        :
                                                        <span
                                                            className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                        ></span>}
                                                    <span className="text-textLightColor ml-1">%</span>
                                                </div>
                                            </div>
                                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                            <div className="w-[75%] flex items-center">
                                                <label htmlFor="salePrice5" className={`w-full h-[38px] flex items-center justify-between  ${state?.price > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                                    <input
                                                        type="text"
                                                        placeholder="0"
                                                        id="salePrice5"
                                                        name="salePrice5"
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
                            <div className="w-full h-fit  flex   justify-between ">
                                <div className="w-fit  flex flex-col items-start">
                                    <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                                        <div
                                            className="flex items-center text-[14px] xs:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                            {t("SSage")}
                                        </div>
                                    </div>
                                    <div className="w-fit flex items-center">
                                        <input
                                            type="number"
                                            className="inputStyle w-[58px] h-[38px] text-center fon border border-borderColor rounded-lg px-[12px] outline-none "
                                            placeholder=""
                                            name="ageNum"
                                            value={state?.age}
                                            onChange={(e) => setState({ ...state, age: e.target.value })}
                                            onKeyDown={(e) => e.key === '-' && e.preventDefault()} // Bu qatorda o'zgarish
                                        />
                                    </div>
                                </div>

                                <div className='w-fit flex items-center gap-x-4'>
                                    {state?.onConcel && <button onClick={cancelSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1">
                                        {t("SScancel")}
                                    </button>}
                                    <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-[14px] xs:text-base text-textBlueColor   font-AeonikProMedium ">
                                        {t("SSready")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div >
    )
}
