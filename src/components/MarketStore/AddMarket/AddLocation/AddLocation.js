import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowTopIcons,
  GoBackIcons,
  StarLabel,
  TelIcon,
} from "../../../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";
import StoreListModal from "./Modal/StoreListModal";
import YandexMapStore from "./YandexMaps";

export default function AddLocation() {
  const navigate = useNavigate();

  const [openStoreList, setOpenStoreList] = useState(false);

  const storeToggle = React.useCallback(() => setOpenStoreList(false), []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full max-w-[920px] mx-auto mt-6 md:mt-12">
      {openStoreList && <StoreListModal onClick={storeToggle} />}
      <div className=" ">
        <div className="md:hidden flex ">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="  md:hidden flex items-center cursor-pointer justify-center "
          >
            <GoBackIcons />
          </button>
        </div>{" "}
        <div className="text-center mb-3 md:mb-[50px] text-5 md:text-[35px] font-AeonikProMedium">
          Добавить локацию магазина
        </div>
        {/* <div className="mb-3 hidden md:flex">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="md:w-8 md:h-8 w-6 h-6  flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
          >
            <AiOutlineLeft />
          </button>
        </div> */}
        <div>
          <YandexMapStore />
        </div>
        <div className="flex mt-[10px] justify-between items-centers gap-x-[5px] ls:gap-x-[10px] md:gap-[25px] mb-[25px] ">
          <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <Link to="#" className="flex items-center justify-center">
              <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                Фото локации
              </span>
              <span className=" ml-[2px] md:ml-[5px]">
                <StarLabel />
              </span>
            </Link>
          </div>
          <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <Link to="#" className="flex items-center justify-center">
              <span className="leading-none text-[11px] flex md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                <span className="hidden md:flex">Второе</span> фото локации
              </span>
            </Link>
          </div>
          <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <Link to="#" className="flex items-center justify-center">
              <span className="leading-none text-[11px] flex md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                <span className="hidden md:flex"> Третье</span> фото локации
              </span>
            </Link>
          </div>
        </div>
        <div className="w-full  ">
          <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 ">
            <label className="w-full md:w-[31%] xs:w-[48%]   ">
              <div className="w-full text-[12px] md:text-base flex items-center mb-[10px]">
                Имя администратора{" "}
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
                <input
                  type="text"
                  name="fname"
                  placeholder=" Имя администратора"
                  className="w-full outline-none text-[12px] md:text-[14px] font-AeonikProRegular px-2"
                />
              </div>
            </label>
            <label className="w-full md:w-[31%] xs:w-[48%]  ">
              <div className="w-full text-[12px] md:text-base flex items-center mb-[10px]">
                Имя второго администратора{" "}
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
                <input
                  type="text"
                  name="fname"
                  placeholder=" (не обезательно)"
                  className="w-full outline-none text-[12px] md:text-[14px] font-AeonikProRegular px-2 "
                />
              </div>
            </label>
            <div className="w-full md:w-[31%] xs:w-[48%]  ">
              <div className="text-[12px] md:text-base flex items-center mb-[10px]">
                Рабочее время
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="flex flex-wraps">
                {" "}
                от
                <input
                  type="text"
                  value={"09:00"}
                  className="mr-5 ml-[5px] border border-borderColor text-center flex items-center justify-center h-[32px] md:h-[45px] rounded md:rounded-lg w-full md:max-w-[80px] text-[12px]md:text-[14px] font-AeonikProRegular "
                />
                до
                <input
                  type="text"
                  value={"20:00"}
                  className="ml-[5px] border border-borderColor text-center flex items-center justify-center h-[32px] md:h-[45px] rounded md:rounded-lg w-full md:max-w-[80px] text-[12px]md:text-[14px] font-AeonikProRegular "
                />
              </div>
            </div>
            <label className="w-full md:w-[31%] xs:w-[48%]   ">
              <div className="text-[12px] md:text-base flex items-center mb-[10px]">
                Номер администратора
                <span className="ml-[5px]">{/* <StarLabel /> */}</span>
              </div>
              <div className="flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
                <span className="h-full text-[12px] md:text-base  flex items-center px-[12px] border-r border-lightBorderColor">
                  +998
                </span>
                <input
                  type="phone"
                  value={"(97) 214-34-56"}
                  className="pl-3 outline-none text-[12px] md:text-[14px] font-AeonikProRegular  "
                />
                <span className="mr-12">
                  <TelIcon />
                </span>
              </div>
            </label>
            <label className="w-full md:w-[31%] xs:w-[48%]  ">
              <div className="text-[12px] md:text-base flex items-center mb-[10px]">
                Номер второго администратора{" "}
                <span className="ml-[5px]">{/* <StarLabel /> */}</span>
              </div>
              <div className="flex items-center border border-borderColor  h-[32px] md:h-[45px]  rounded md:rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
                <span className="h-full text-[12px] md:text-base  flex items-center px-[12px] border-r border-lightBorderColor">
                  +998
                </span>
                <input
                  type="phone"
                  value={"(не обезательно)"}
                  className="pl-3 outline-none text-[12px] md:text-[14px] font-AeonikProRegular  "
                />
                <span className="mr-12">
                  <TelIcon />
                </span>
              </div>
            </label>
            <div className="w-full md:w-[31%] xs:w-[48%]   ">
              <div className="w-full" onClick={() => setOpenStoreList(true)}>
                <div className="text-[12px] md:text-[14px] font-AeonikProRegular flex items-center mb-[10px]">
                  Выберите регион
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 cursor-pointer border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
                  <span className="text-[#8C8C8C] font-AeonikProRegular md:text-[14px] font-AeonikProRegular ">
                    Выберите регион
                  </span>
                  <span className="rotate-[90deg]">
                    <ArrowTopIcons colors={"#A4A4A4"} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[50px]">
          <Link
            className="w-full md:w-fit h-[42px] flex items-center justify-center md:px-[100px]  bg-textBlueColor text-white rounded md:rounded-lg active:scale-95"
            // to={"/store"}
          >
            Добавить
          </Link>
        </div>
      </div>
    </div>
  );
}
// export default React.memo(AddLocation);
