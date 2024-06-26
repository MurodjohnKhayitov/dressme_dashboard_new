import React, { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { CloseAnswer, StarOutlineIcon } from "../../../../assets/icons";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";

export default function EditComponent({ item, titleStore, handleRefetch }) {
  const [sendText, setSendText] = useState(false);
  const [state, setState] = useState({
    sendAnswer: false,
    startReviews: true,
    replyText: null,
    getUserId: null,
    replyTextEdit: "",
    getUserIdEdit: "",
    getComment: null,
    editComment: false,
  });
  const [languageDetector] = useContext(LanguageDetectorDress);

  const { t } = useTranslation("reviews");

  const url = "https://api.dressme.uz/api/seller/reply";

  const sendReply = () => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
        "Accept-Language": languageDetector?.typeLang,

      },
      body: JSON.stringify({
        reply: state.replyText,
        id: state?.getUserId,
      }),
    })
      .then((res) => {
         return res.json();
      })
      .then((data) => {
        setState({ ...state, getComment: data });
        handleRefetch();
      })
      .catch((err) => {
        throw new Error(err || "something wrong");
      });
  };

  const sendReplyEdit = () => {
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
        "Accept-Language": languageDetector?.typeLang,

      },
      body: JSON.stringify({
        reply: state.replyTextEdit,
        id: state?.getUserIdEdit,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setState({ ...state, getComment: data });
        handleRefetch();
        setState({ ...state, editComment: false });
      })
      .catch((err) => {
        throw new Error(err || "something wrong");
      });
  };

  return (
    <div className="w-full h-fit rounded-[5px] p-[15px] mb-[10px] md:mb-3 border border-borderColor md:rounded-lg">
      {/* userImg and Date */}
      <div className="w-full md:p-[15px] mb-5 md:mb-0 h-fit flex justify-between">
        <div className="h-10 w-fit flex items-center gap-x-[15px]">
          <div className="flex flex-col">
            <div className="text-tableTextTitle2 text-base md:text-xl font-AeonikProMedium">
              {item?.user?.name}
            </div>
            <div className="flex md:gap-x-[10px]">
              <p className="text-gray-700 text-[13px] md:text-sm font-AeonikProRegular leading-normal">
                {t("purchase_rating")}
              </p>
              <p className="flex items-center gap-x-[2px] ml-[5px] md:ml-0">
                <span className="text-gray-700 text-[13px] md:text-sm mr-[2px] font-AeonikProRegular leading-normal ">
                  {item?.score}.0
                </span>
                <span>
                  <StarOutlineIcon />
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="h-10 w-fit flex items-start md:items-center">
          <span className="text-textLightColor text-xs md:text-base font-AeonikProRegular leading-normal">
            {item?.created_at}
          </span>
        </div>
      </div>
      {/* userText */}
      <div className="md:p-[15px] w-full md:w-[95%] h-fit ">
        <span className="text-mobileTextColor text-[13px] md:text-base not-italic font-AeonikProRegular leading-normal">
          {item?.comment}
        </span>
      </div>
      {/* Comment Section */}
      {titleStore?.locationListId?.shop?.ratings?.length !== 0 &&
        item?.reply && (
          <div className={`w-full h-fit mt-[20px] md:mt-[15px] md:p-[15px]`}>
            <div className="relative w-full h-fit flex justify-between px-[15px] py-3 md:p-[25px] bg-ProductReplyBg rounded-lg gap-x-[15px]">
              <div>
                <p className="text-tableTextTitle2 text-[12px] md:text-base font-AeonikProMedium mb-4">
                  <span className="mr-1">{t("answer")}</span>
                  {titleStore?.locationListId?.shop?.name}
                </p>
                <p className="text-gray-700 text-[12px] md:text-base font-AeonikProRegular">
                  <span>{item?.reply}</span>
                </p>
              </div>
              <div className="flex items-start mt-[2px]">
                <span className="text-textLightColor text-[11px] md:text-base font-AeonikProRegular leading-normal">
                  {item?.replyDate}
                </span>
              </div>
              <button
                onClick={() => {
                  setState({ ...state, editComment: !state.editComment });
                }}
                className="absolute top-2 right-2 shadow rounded p-1 bg-white"
              >
                <CiEdit />
              </button>
            </div>
          </div>
        )}

      {!item?.reply && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`${
            sendText ? "hidden" : "flex"
          } w-full h-fit mt-[25px] md:mt-[5px]  justify-end`}
        >
          {state?.sendAnswer ? (
            <div className="w-full flex flex-col md:flex-row items-center justify-between">
              <textarea
                name="answer"
                id="answer"
                className="w-full md:w-4/5 h-12 text-[13px] md:text-base md:h-14 border rounded-lg p-3 md:mr-[20px] xxl:mr-[30px]"
                value={state?.replyText}
                onChange={(e) =>
                  setState({
                    ...state,
                    replyText: e.target.value,
                    getUserId: item?.id,
                  })
                }
                placeholder={t("add_answer")}
              ></textarea>
              <div className="flex items-center ml-auto mt-3 md:mt-0">
                <button
                  onClick={() => {
                    sendReply();
                    setSendText(!sendText);
                  }}
                  className={`w-[132px] h-9 md:py-0 md:h-11 bg-textBlueColor flex items-center justify-center active:scale-95 active:opacity-70 text-white rounded-lg mr-[10px]`}
                >
                  <span className="text-[13px] md:text-sm not-italic font-AeonikProMedium">
                    {t("send")}
                  </span>
                </button>
                <button
                  onClick={() => setState({ ...state, sendAnswer: false })}
                  className="w-9 h-9 md:w-11 md:h-11 bg-white flex items-center justify-center active:scale-95  active:opacity-70 text-white border border-textBlueColor rounded-lg"
                >
                  <CloseAnswer colors="#007DCA" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() =>
                setState({ ...state, sendAnswer: !state.sendAnswer })
              }
              className="w-full md:w-[132px] h-9 md:py-0 md:h-11 bg-textBlueColor flex items-center justify-center active:scale-95  active:opacity-70 text-white rounded-lg"
            >
              <span className="text-[13px] md:text-sm not-italic font-AeonikProMedium">
                {t("answer_two")}
              </span>
            </button>
          )}
        </form>
      )}

      {state?.editComment && (
        <div className="w-full flex flex-col md:flex-row items-center justify-between md:px-[15px]">
          <input
            name="answer1"
            id="answer1"
            className="w-full md:w-4/5 h-12 text-[13px] md:text-base md:h-14 border rounded-lg p-3 md:mr-[20px] xxl:mr-[30px]"
            defaultValue={item?.reply}
            onChange={(e) =>
              setState({
                ...state,
                replyTextEdit: e.target.value,
                getUserIdEdit: item?.id,
              })
            }
            placeholder={t("add_answer")}
          />
          <div className="flex items-center ml-auto mt-3 md:mt-0">
            <button
              onClick={() => {
                sendReplyEdit();
                setSendText(!sendText);
                setState({
                  ...state,
                  editComment: false,
                });
              }}
              className={` w-[132px] h-9 md:py-0 md:h-11 bg-textBlueColor flex items-center justify-center active:scale-95 active:opacity-70 text-white rounded-lg mr-[10px]`}
            >
              <span className="text-[13px] md:text-sm not-italic font-AeonikProMedium">
                {t("send")}
              </span>
            </button>
            <button
              onClick={() =>
                setState({
                  ...state,
                  sendAnswer: false,
                  editComment: false,
                })
              }
              className="w-9 h-9 md:w-11 md:h-11 bg-white flex items-center justify-center active:scale-95  active:opacity-70 text-white border border-textBlueColor rounded-lg"
            >
              <CloseAnswer colors="#007DCA" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
