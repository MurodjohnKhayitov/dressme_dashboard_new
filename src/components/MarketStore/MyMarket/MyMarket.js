import React, { useContext, useEffect, useState } from "react";
import { MenuCloseIcons, SearchIcon } from "../../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
import { deliveryIcon, man, woman } from "../../../assets";
import { StarIcon } from "../../../assets/icons";
import axios from "axios";
import { HelperData } from "../../../hook/HelperDataStore";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../language/LanguageItem";
import { ShopList } from "../../../hook/ShopList";
const { REACT_APP_BASE_URL } = process.env;

function MyMarket() {
  const [searchName, setSearchName] = useState("");
  const navigate = useNavigate();
  const [helperDatainform, setHelperDatainform] = useContext(HelperData);
  // ------------
  const [shopList, setShopList] = useContext(ShopList)

  const { t } = useTranslation("shops");
  const [languageDetector] = useContext(LanguageDetectorDress);

  const [statusModal, setStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  // ------------
  // ------------GET METHOD delivery-method-----------------
  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/delivery-method`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
          },
        });
        if (data?.status >= 200 && data?.status < 300) {
          setHelperDatainform({
            ...helperDatainform,
            deliveryList: data?.data?.delivery_methods,
          });
        }
      } catch (error) { }
    };
    if (!helperDatainform?.deliveryList) {
      fetchDelivery();
    }
  }, []);

  const goDetail = (id) => {
    navigate(`/store/market-list/${id}`);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  function onHandleStatus(id) {
    setStatusModal(true);
    shopList?.shops?.map((data) => {
      if (data?.id == id) {
        setStatusMessage(data?.status_reason);
      }
    });
  }


  return (
    <div className="relative w-full h-full  py-[1px] px-4 md:px-10">
      <div className="fixed md:static w-[calc(100%-32px)] bg-white md:w-full z-[10] top-0 py-5 md:py-0  md:pb-4 md:py-4 md:border-b border-lightBorderColor block  ">
        <div className="w-full flex items-center justify-center md:hidden">
          <div className="absolute left-0 ">
            <MobileHumburgerMenu />
          </div>
          <span className="text-2xl not-italic font-AeonikProMedium">
            {t("all_shops")}
          </span>
        </div>
        <div className="hidden md:flex items-center justify-between border-t md:border-0 border-borderColor md:mt-0 md:pt-0 mt-4 pt-5">
          <section className="  ">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              {t("all_shops")}{" "}
            </p>
          </section>

          <section className="w-full md:w-fit flex items-center justify-between md:justify-static ">
            <div className="w-full md:w-[400px] flex items-center justify-between md:justify-static gap-x-[15px]">
              <label
                htmlFor="searchStore"
                className=" w-full h-10 overflow-hidden border cursor-pointer  border-lightBorderColor flex items-center rounded-lg"
              >
                <input
                  type="text"
                  name="s"
                  id="searchStore"
                  value={searchName || ""}
                  onChange={(e) => setSearchName(e?.target?.value)}
                  className="w-full h-full outline-0 px-[10px]"
                  placeholder={t("search")}
                />
                <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
                  <SearchIcon />
                </span>
              </label>
            </div>
          </section>
        </div>
      </div>
      <div className="md:hidden flex items-center justify-between   mt-[90px]" >
        <section className="w-full md:w-fit flex items-center justify-between md:justify-static ">
          <div className="w-full md:w-[400px] flex items-center justify-between md:justify-static gap-x-[15px]">
            <label
              htmlFor="searchStore"
              className=" w-full h-10 overflow-hidden border cursor-pointer  border-lightBorderColor flex items-center rounded-lg"
            >
              <input
                type="text"
                name="s"
                id="searchStore"
                value={searchName || ""}
                onChange={(e) => setSearchName(e?.target?.value)}
                className="w-full h-full outline-0 px-[10px]"
                placeholder={t("search")}
              />
              <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
                <SearchIcon />
              </span>
            </label>
          </div>
        </section>
      </div>
      <section
        onClick={() => setStatusModal(false)}
        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${statusModal ? "" : "hidden"}`}
      ></section>
      {/*status Modal */}
      <section
        className={` max-w-[440px] md:max-w-[750px] w-full flex-col  h-fit  bg-white mx-auto fixed py-4 md:py-6 px-6 rounded-t-lg md:rounded-b-lg z-[115] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${statusModal
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <button
          onClick={() => setStatusModal(false)}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 "
        >
          <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
        </button>
        <div className="w-full h-fit flex items-center justify-center mb-2">
          <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
            {t("cause")}
          </p>
        </div>
        {statusMessage ? (
          <div className="w-full p-4 border border-borderColor rounded-lg flex flex-col gap-y-[10px] h-[300px]  overflow-hidden  ">
            {statusMessage}
          </div>
        ) : (
          <div className="w-full flex text-[#b5b5b5] items-center justify-center border border-borderColor rounded-lg  h-[300px]  overflow-hidden  ">
            {t("no_reason")}
          </div>
        )}
      </section>

      <div className="h-fit md:pt-7 md:pb-4 w-full flex items-center justify-end  ">
        <Link
          to={"/store/market-add"}
          className="w-fit h-[42px] active:scale-95 rounded-lg flex items-center px-[10px] md:bg-weatherWinterColor text-weatherWinterColor  md:text-white text-[14px] md:text-base not-italic font-AeonikProMedium"
        >
          {t("create_new_store")}
        </Link>
      </div>
      {shopList ? (
        <div className="w-full h-fit  flex flex-col gap-y-[30px] py-3  overflow-hidden   ">
          {shopList?.shops
            ?.filter((item) =>
              item?.name?.toLowerCase()?.includes(searchName?.toLowerCase())
            )
            ?.map((data, index) => {
              return (
                <div
                  key={data?.id}
                  className="relative w-full h-fit md:h-[100px]  border border-borderColor md:pr-10   p-[10px] md:p-0 rounded-lg flex md:flex-row flex-col justify-between items-center   gap-x-4"
                >
                  <div className="w-full md:w-fit flex flex-col md:flex-row items-center md:justify-start  md:border-0 border-b border-borderColor ">
                    <div className="w-full md:w-fit flex items-center justify-between  md:px-5 text-xl font-AeonikProRegular   ">
                      <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
                      <span className=" text-checkboxBorder md:text-black flex items-center">
                        <span className="md:hidden flex"></span>
                        {index + 1}
                      </span>
                      <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
                    </div>
                    <div className=" w-full md:w-fit flex items-center my-[15px] md:my-0   ">
                      <figure className=" w-[80px] h-[80px] md:w-[120px] md:h-[120px]   overflow-hidden md:left-[40px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
                        <img
                          src={data?.url_logo_photo}
                          alt="url_logo_photo"
                          className="w-full h-full object-cover"
                        />
                      </figure>
                      <div className="w-fit flex gap-y-3 flex-col ml-5 md:ml-8 ">
                        <div className="h-fit flex items-center  justify-start">
                          <p className="md:hidden w-fit  text-start flex items-center md:w-[350px] text-[14px] xs:text-xl font-AeonikProMedium  ">
                            {data?.name || null}
                          </p>
                          <p className="relative md:block hidden max-h-[56px] overflow-hidden w-full break-all md:pr-4   md:w-[350px] text-[14px] xs:text-xl font-AeonikProMedium">
                            {data?.name || null}
                            <span className="absolute right-[16px] top-[28px] w-full block linearGr h-[28px]"></span>
                          </p>
                        </div>
                        {data?.overall_rating && (
                          <div className="w-full flex items-center">
                            <div className="w-fit flex items-center ">
                              <div className="w-fit flex items-center mr-[6px]">
                                <StarIcon />
                              </div>
                              <div className="not-italic font-AeonikProRegular  text-[10px] ls:text-xs leading-4 text-right text-gray-500 md:ml-1 flex items-center text-sm">
                                <p className="font-AeonikProRegular text-[12px] md:text-[14px] ls:font-AeonikProMedium text-black mr-1">
                                  {data?.overall_rating}
                                </p>
                                {data?.rated_users_count && (
                                  <p className="text-setTexOpacity flex font-AeonikProRegular text-[10px] ls:text-[12px] md:text-[14px] ">
                                    ({t("votes")}: {data?.rated_users_count}){" "}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="  w-full max-w-[400px] flex items-center justify-between sm:gap-x-[25px] mt-3 md:mt-0   ">
                    <div className="flex items-center gap-x-1 select-none min-w-[100px] md:justify-between">
                      {(Number(data?.gender_id) === 3 ||
                        Number(data?.gender_id) === 1) && (
                          <div className="xs:w-12 w-[36px] h-[36px] xs:h-12 rounded-lg border border-borderColor flex items-center justify-center">
                            <img src={man} alt="" />
                          </div>
                        )}
                      {(Number(data?.gender_id) === 3 ||
                        Number(data?.gender_id) === 2) && (
                          <div className="xs:w-12 w-[36px] h-[36px] xs:h-12 rounded-lg border border-borderColor flex items-center justify-center">
                            <img src={woman} alt="" />
                          </div>
                        )}
                    </div>
                    <div className="h-[36px] xs:h-12 px-1 ls:px-[10px] w-full max-w-[190px] md:max-w-[250px] ll:px-5 select-none border border-borderColor rounded-lg flex items-center justify-center gap-x-1 ll:gap-x-3 ">
                      <img src={deliveryIcon} alt="" />
                      {helperDatainform?.deliveryList
                        ?.filter((e) => e.id == data?.delivery_id)
                        ?.map((item) => {
                          return (
                            <span
                              key={item?.id}
                              className="text-tableTextTitle2 text-[11px] ls:text-[12px] ll:text-[14px] xs:text-base not-italic font-AeonikProRegular ll:font-AeonikProMedium"
                            >
                              {languageDetector?.typeLang === "ru" &&
                                item?.name_ru}
                              {languageDetector?.typeLang === "uz" &&
                                item?.name_uz}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                  <div className="  w-full flex items-center select-none md:hidden  mt-4 ">
                    <p className="w-fit text-[13px] mr-2 flex items-center md:w-[350px] xs:text-xl xs:font-AeonikProMedium font-AeonikProRegular">
                      {t("status")}:
                    </p>
                    <div className="min-w-[110px] flex items-center select-none ">
                      {data?.status === "approved" && (
                        <button
                          type="button"
                          className="w-full h-fit overflow-hidden flex items-center justify-center text-[12px]  xs:text-base text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[3px]  rounded-full "
                        >
                          {t("approved")}
                        </button>
                      )}
                      {data?.status === "declined" && (
                        <button
                          onClick={() => onHandleStatus(data?.id)}
                          type="button"
                          className="w-full cursor-pointer h-fit overflow-hidden flex items-center justify-center text-[12px]  xs:text-base text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[3px]  rounded-full "
                        >
                          {t("declined")}
                        </button>
                      )}
                      {data?.status === "pending" && (
                        <button
                          type="button"
                          className="w-full h-fit overflow-hidden flex items-center justify-center text-[12px]  xs:text-base text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[3px]  rounded-full "
                        >
                          {t("pending")}
                        </button>
                      )}
                      {data?.status === "updated" && (
                        <button
                          type="button"
                          className="w-full h-fit  flex items-center justify-center text-[12px]  xs:text-base text-center text-[#007DCA] bg-bgUpdate font-AeonikProRegular py-[3px]  rounded-full "
                        >
                          {t("updated")}
                        </button>
                      )}
                    </div>
               
                  </div>
                  <div className="  w-full md:w-fit flex items-center justify-between gap-x-4 sm:gap-x-[40px]  mt-4  md:mt-0    ">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/store/locations/shop/${data?.id}`)
                      }
                      className="md:text-textBlueColor cursor-pointer w-[50%] flex items-center justify-center md:w-fit  md:text-base text-[13px] not-italic md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0 px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-locationBg text-locationText"
                    >
                      {t("location")}
                    </button>
                    <p
                      onClick={() => goDetail(data?.id)}
                      className="text-textBlueColor cursor-pointer w-[50%] flex items-center justify-center md:w-fit  md:text-base text-[13px] not-italic md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0  px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-Editbg"
                    >
                      {t("more_details")}
                    </p>
                    <div className="min-w-[110px] md:flex items-center select-none hidden ">
                      {data?.status === "approved" && (
                        <button
                          type="button"
                          className="w-full h-fit overflow-hidden flex items-center justify-center  text-center text-[#4FB459] bg-bgApproved font-AeonikProRegular py-[3px]  rounded-full "
                        >
                          {t("approved")}
                        </button>
                      )}
                      {data?.status === "declined" && (
                        <button
                          onClick={() => onHandleStatus(data?.id)}
                          type="button"
                          className="w-full cursor-pointer h-fit overflow-hidden flex items-center justify-center  text-center text-[#FF4A4A] bg-bgDecline font-AeonikProRegular py-[3px]  rounded-full "
                        >
                          {t("declined")}
                        </button>
                      )}
                      {data?.status === "pending" && (
                        <button
                          type="button"
                          className="w-full h-fit overflow-hidden flex items-center justify-center  text-center text-[#F1B416] bg-bgPending font-AeonikProRegular py-[3px]  rounded-full "
                        >
                          {t("pending")}
                        </button>
                      )}
                      {data?.status === "updated" && (
                        <button
                          type="button"
                          className="w-full h-fit  flex items-center justify-center  text-center text-[#007DCA] bg-bgUpdate font-AeonikProRegular py-[3px]  rounded-full "
                        >
                          {t("updated")}
                        </button>
                      )}
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              );
            })}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center font-AeonikProMedium text-2xl h-[200px] ">
          {t("nothing_found")}
        </div>
      )
      }
    </div >
  );
}
export default React.memo(MyMarket);
