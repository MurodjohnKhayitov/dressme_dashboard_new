import React from "react";
import { deliveryIcon, man, nike, woman } from "../../../assets";
import { StarIcon } from "../../../assets/icons";
import { Link, useNavigate } from "react-router-dom";

const MarketList = () => {
  const data = [
    { id: 1, name: "Nike Store Official Dealer" },
    { id: 2, name: "Nike Store Official Dealer" },
    { id: 3, name: "Nike Store Official Dealer" },
    { id: 4, name: "Nike Store Official Dealer" },
  ];
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/store/list/:${id}`);
  };

  return (
    <div className="w-full h-fit  flex flex-col gap-y-[30px]">
      {data.map((data) => {
        return (
          <div
            key={data?.id}
            className="w-full h-[100px] border border-borderColor pl-[55px] pr-10  rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center  w-fit ">
              <figure className="w-[80px] md:w-[120px] h-[80px] md:h-[120px] md:left-[40px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
                <img src={nike} alt="" />
              </figure>
              <div className="flex flex-col ml-8">
                <p className="text-xl font-AeonikProMedium mb-3">
                  Nike Store Official Dealer
                </p>
                <div className="">
                  <div className="flex items-center ">
                    <div className="flex items-center  mr-[6px]">
                      <StarIcon />
                    </div>
                    <div className="not-italic font-AeonikProRegular text-[10px] ls:text-xs leading-4 text-right text-gray-500 md:ml-1 flex items-center text-sm">
                      <p className="font-AeonikProMedium text-black mr-1">
                        5.0
                      </p>
                      <p className="text-setTexOpacity font-AeonikProRegular">
                        (859 votes) <span className="ml-[10px]">|</span>{" "}
                      </p>
                      <p className="font-AeonikProRegular ml-[10px] text-setTexOpacity">
                        4937 orders
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-1">
              <button className="w-12 h-12 rounded-lg border border-borderColor flex items-center justify-center">
                <img src={man} alt="" />
              </button>
              <button className="w-12 h-12 rounded-lg border border-borderColor flex items-center justify-center">
                <img src={woman} alt="" />
              </button>
            </div>
            <div>
              <button className="h-12 px-5 active:scale-95  active:opacity-70 border border-borderColor rounded-lg flex items-center gap-x-3">
                <img src={deliveryIcon} alt="" />
                <span className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                  Собственная доставка
                </span>
              </button>
            </div>
            <div className="flex items-center gap-x-[50px]">
              <p className="text-textBlueColor cursor-pointer  text-base not-italic font-AeonikProMedium hover:underline">
                Локации
              </p>
              <p
                onClick={() => goDetail(data?.id)}
                className="text-textBlueColor cursor-pointer  text-base not-italic font-AeonikProMedium hover:underline"
              >
                Подробнее
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MarketList;
