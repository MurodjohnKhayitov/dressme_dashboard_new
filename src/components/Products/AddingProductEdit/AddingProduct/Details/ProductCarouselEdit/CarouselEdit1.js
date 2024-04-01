import React, { useContext, useEffect, useState } from 'react'
import imageCompression from "browser-image-compression";
import { useHttp } from '../../../../../../hook/useHttp';
import { useTranslation } from 'react-i18next';
import { LanguageDetectorDress } from '../../../../../../language/LanguageItem';
import { PuffLoader } from 'react-spinners';
import { MdError } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { DeleteIcon, DownloadIcon, MenuCloseIcons, StarLabel } from '../../../../../../assets/icons';
import { FiDownload } from 'react-icons/fi';
import { useMutation } from '@tanstack/react-query';
const url = "https://api.dressme.uz/api/seller";

function CarouselEdit1({ productData, activeColor, onRefetch, colors_Id, colorListForTest, colorGroup, onHandleImage, productId }) {
    const { request } = useHttp()
    const { t } = useTranslation("product");
    const [languageDetector] = useContext(LanguageDetectorDress);

    const [activeNewColor, setActiveNewColor] = useState(null);
    const [modalOfCarsouel, setModalOfCarsouel] = useState(false)
    const [freeModalUploadImg, setFreeModalUploadImg] = useState(false)


    const [modalId, setModalId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    // --------------
    const [deleteModal, setDeleteModal] = useState(false);
    const [hideToggleIcons, setHideToggleIcons] = useState(false);
    const [SuccessMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loader, setLoader] = useState(false);
    const [reRender, setReRender] = useState(false);
    const [imageArray, setImageArray] = useState([]);

    const [imageOne, setImageOne] = useState({
        id1: Date.now() + 1,
        product_color_id1: null,
        product_id1: null,
        status1: null,
        status_reason1: null,
        status_update1: null,
        url_photo1: null,
        url_photo_change1: null,
        url_File1: null,
        changed1: false
    });
    const [imageTwo, setImageTwo] = useState({
        id2: Date.now() + 2,
        product_color_id2: null,
        product_id2: null,
        status2: null,
        status_reason2: null,
        status_update2: null,
        url_photo2: null,
        url_photo_change2: null,
        url_File2: null,
        changed2: false

    });
    const [imageThree, setImageThree] = useState({
        id3: Date.now() + 3,
        product_color_id3: null,
        product_id3: null,
        status3: null,
        status_reason3: null,
        status_update3: null,
        url_photo3: null,
        url_photo_change3: null,
        url_File3: null,
        changed3: false

    });
    const [imageFour, setImageFour] = useState({
        id4: Date.now() + 4,
        product_color_id4: null,
        product_id4: null,
        status4: null,
        status_reason4: null,
        status_update4: null,
        url_photo4: null,
        url_photo_change4: null,
        url_File4: null,
        changed4: false

    });


    function handleFreeModalUploadImg(id) {
        setFreeModalUploadImg(true)
        setModalId(id)
    }
    function handleClickCarosuel() {
        setModalOfCarsouel(true)
    }
    async function handleLocationImage1(e) {
        const imageFile = e.target.files[0];
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            setImageOne({
                ...imageOne,
                id1: imageOne?.id1 ? imageOne?.id1 : Date.now() + 1,
                url_File1: compressedFile,
                url_photo1: URL.createObjectURL(e.target.files[0]),
                changed1: true
            })

        } catch (error) {
            throw new Error(error || "something wrong");
        }
    }

    async function handleLocationImage2(e) {
        const imageFile = e.target.files[0];
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            setImageTwo({
                ...imageTwo,
                id2: imageTwo?.id2 ? imageTwo?.id2 : Date.now() + 2,
                url_File2: compressedFile,
                url_photo2: URL.createObjectURL(e.target.files[0]),
                changed2: true
            })

        } catch (error) {
            throw new Error(error || "something wrong");

        }
    }

    async function handleLocationImage3(e) {
        const imageFile = e.target.files[0];
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            setImageThree({
                ...imageThree,
                id3: imageThree?.id3 ? imageThree?.id3 : Date.now() + 3,
                url_File3: compressedFile,
                url_photo3: URL.createObjectURL(e.target.files[0]),
                changed3: true
            })

        } catch (error) {
            throw new Error(error || "something wrong");

        }
    }

    async function handleLocationImage4(e) {
        const imageFile = e.target.files[0];
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            setImageFour({
                ...imageFour,
                id4: imageFour?.id4 ? imageFour?.id4 : Date.now() + 4,
                url_File4: compressedFile,
                url_photo4: URL.createObjectURL(e.target.files[0]),
                changed4: true,
            })

        } catch (error) {
            throw new Error(error || "something wrong");

        }
    }
    useEffect(() => {
        onHandleImage({
            image_File_1: imageOne?.url_File1,
            image_File_2: imageTwo?.url_File2,
            image_File_3: imageThree?.url_File3,
            image_File_4: imageFour?.url_File4,
        })
    }, [imageOne?.url_File1, imageTwo?.url_File2, imageThree?.url_File3, imageFour?.url_File4])


    useEffect(() => {
        setImageArray([])
        setImageOne({
            id1: Date.now() + 1,
            product_color_id1: null,
            product_id1: null,
            status1: null,
            url_photo1: null,
            url_photo_change1: null,
        })

        setImageFour({
            id4: Date.now() + 4,
            product_color_id4: null,
            product_id4: null,
            status4: null,
            url_photo4: null,
            url_photo_change4: null,
        })

        setImageThree({
            id3: Date.now() + 3,
            product_color_id3: null,
            product_id3: null,
            status3: null,
            url_photo3: null,
            url_photo_change3: null,
        })

        setImageTwo({
            id2: Date.now() + 2,
            product_color_id2: null,
            product_id2: null,
            status2: null,
            url_photo2: null,
            url_photo_change2: null,
        })
        const pivotId = productData?.colors?.filter(e => e?.id == activeColor)?.map(item => { return item?.pivot?.id })
        if (colors_Id?.length > colorListForTest?.length) {
            colors_Id?.filter(e => !colorListForTest?.includes(e))?.map(item => {
                setActiveNewColor(item)
            })
        } else {
            setActiveNewColor(null)
        }

        const filteredItems = productData?.photos
            .filter(e => Number(e?.product_color_id) === Number(pivotId[0]))
            .map(item => ({
                id: item?.id, // Assuming `id` is the ID property in your photo object
                productColorId: item?.product_color_id,
                productId: item?.product_id,
                url: item?.url_photo
            }));
        if (filteredItems) {
            setImageOne({
                id1: filteredItems[0]?.id && filteredItems[0]?.id || Date.now() + 1,
                product_color_id1: filteredItems[0]?.productColorId && filteredItems[0]?.productColorId || null,
                product_id1: filteredItems[0]?.productId && filteredItems[0]?.productId || null,
                status1: filteredItems[0]?.status && filteredItems[0]?.status || null,
                url_photo1: filteredItems[0]?.url && filteredItems[0]?.url || null,
                url_photo_change1: filteredItems[0]?.url && filteredItems[0]?.url || null,
            })

            setImageTwo({
                id2: filteredItems[1]?.id && filteredItems[1]?.id || Date.now() + 2,
                product_color_id2: filteredItems[1]?.productColorId && filteredItems[1]?.productColorId || null,
                product_id2: filteredItems[1]?.productId && filteredItems[1]?.productId || null,
                status2: filteredItems[1]?.status && filteredItems[1]?.status || null,
                url_photo2: filteredItems[1]?.url && filteredItems[1]?.url || null,
                url_photo_change2: filteredItems[1]?.url && filteredItems[1]?.url || null,
            })

            setImageThree({
                id3: filteredItems[2]?.id && filteredItems[2]?.id || Date.now() + 3,
                product_color_id3: filteredItems[2]?.productColorId && filteredItems[2]?.productColorId || null,
                product_id3: filteredItems[2]?.productId && filteredItems[2]?.productId || null,
                status3: filteredItems[2]?.status && filteredItems[2]?.status || null,
                url_photo3: filteredItems[2]?.url && filteredItems[2]?.url || null,
                url_photo_change3: filteredItems[2]?.url && filteredItems[2]?.url || null,
            })
            setImageFour({
                id4: filteredItems[3]?.id && filteredItems[3]?.id || Date.now() + 4,
                product_color_id4: filteredItems[3]?.productColorId && filteredItems[3]?.productColorId || null,
                product_id4: filteredItems[3]?.productId && filteredItems[3]?.productId || null,
                status4: filteredItems[3]?.status && filteredItems[3]?.status || null,
                url_photo4: filteredItems[3]?.url && filteredItems[3]?.url || null,
                url_photo_change4: filteredItems[3]?.url && filteredItems[3]?.url || null,
            })

        }

        // setImageArray(filteredItems);

    }, [activeColor, productData])

    function UpadatePhoto(productId) {

        setLoader(true)
        setHideToggleIcons(true)
        let form = new FormData();
        imageOne?.id1 == productId && form.append("new_photo", imageOne?.url_File1);
        imageTwo?.id2 == productId && form.append("new_photo", imageTwo?.url_File2);
        imageThree?.id3 == productId && form.append("new_photo", imageThree?.url_File3);
        imageFour?.id4 == productId && form.append("new_photo", imageFour?.url_File4);

        return fetch(`${url}/products/${productId}/update-product-photo`, {
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
                    setErrorMessage(res?.message)
                    setLoader(false)
                    onRefetch()
                } else if (res?.message) {
                    setSuccessMessage(res?.message)
                    setLoader(false)
                    onRefetch()

                    setTimeout(() => {
                        setHideToggleIcons(false)
                        setModalOfCarsouel(false)
                    }, 1000);
                }
            })
            .catch((err) => {
                setErrorMessage(err)
                setLoader(false)
                throw new Error(err || "something wrong");
            });
    }
    const onHandleAddImage = async () => {
        setLoader(true)
        setHideToggleIcons(true)
        let form = new FormData();
        imageOne?.url_File1 && form.append("photo", imageOne?.url_File1);
        imageOne?.url_File1 && form.append("color_id", activeColor);
        imageTwo?.url_File2 && form.append("photo", imageTwo?.url_File2);
        imageTwo?.url_File2 && form.append("color_id", activeColor);
        imageThree?.url_File3 && form.append("photo", imageThree?.url_File3);
        imageThree?.url_File3 && form.append("color_id", activeColor);
        imageFour?.url_File4 && form.append("photo", imageFour?.url_File4);
        imageFour?.url_File4 && form.append("color_id", activeColor);

        try {
            const res = await fetch(`${url}/products/${Number(productId)}/add-product-photo`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
                    "Accept-Language": languageDetector?.typeLang,

                },
                body: form,
            });
            const res_1 = await res.json();
            if (res_1) {
                if (res_1?.errors && res_1?.message) {
                    setErrorMessage(res_1?.message)
                    setLoader(false)
                    onRefetch()
                } else if (res_1?.message) {
                    setSuccessMessage(res_1?.message)
                    setLoader(false)
                    onRefetch()

                    setTimeout(() => {
                        // setOpenStoreList(false)
                        setHideToggleIcons(false)
                        setFreeModalUploadImg(false)
                    }, 1000);
                }
            }
        } catch (err) {
            setErrorMessage(err)
            throw new Error(err?.message || "something wrong");
        }
    }
    const deleteImageId = useMutation(() => {
        return request({
            url: `/products/${Number(productId)}/delete-product-photo`,
            method: "DELETE",
            token: true,
            body: {
                photo_id: deleteId
            }
        });
    });


    function onHandleDeleteImage() {
        setLoader(true)
        setHideToggleIcons(true)
        deleteImageId.mutate({},
            {
                onSuccess: (res) => {
                    if (res?.message && res?.errors) {
                        setErrorMessage(res?.message)
                        setLoader(false)
                        onRefetch()
                    } else if (res?.message) {
                        setSuccessMessage(res?.message)
                        setLoader(false)

                        onRefetch()
                        setTimeout(() => {
                            setHideToggleIcons(false)
                            setDeleteModal(false)
                            setModalOfCarsouel(false)
                        }, 1000);
                    }
                },

                onError: err => {
                    throw new Error(err || "something wrong");
                }
            })
    }
  
    return (
        <div className='max-w-[350px] md:max-w-[300px] w-full h-fit  '>
            <section
                onClick={() => {
                    setModalOfCarsouel(false)
                    setSuccessMessage(null)
                    setErrorMessage(null)
                }}
                className={`fixed inset-0 z-[200] duration-200 w-full h-[100vh] bg-black opacity-60 
          ${modalOfCarsouel ? "" : "hidden"
                    }`}
            ></section>
            <section
                onClick={() => {
                    setDeleteModal(false)
                    setSuccessMessage(null)
                    setErrorMessage(null)
                    setFreeModalUploadImg(false)
                }}
                className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${deleteModal || freeModalUploadImg ? "" : "hidden"}`}
            ></section>
            <div>
                {/* Delete Product Of Pop Confirm */}
                <section
                    className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${deleteModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
                        }`}
                >
                    <button
                        onClick={() => {
                            // setOpenStoreList(false)
                            setErrorMessage(null)
                            setSuccessMessage(null)
                            setDeleteModal(false)
                        }}
                        type="button"
                        className="absolute  right-3 top-3 w-5 h-5 ">
                        <MenuCloseIcons
                            className="w-full h-full"
                            colors={"#a1a1a1"} />
                    </button>
                    {hideToggleIcons ?
                        <div className="w-full h-full flex items-center justify-center">
                            {loader && hideToggleIcons ?
                                <PuffLoader
                                    // className={styles.loader1}
                                    color={"#007DCA"}
                                    size={80}
                                    loading={true}
                                />
                                :
                                <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                                    {errorMessage ?
                                        <span className="flex items-center justify-center p-2">
                                            <MdError size={35} color="#FF4343" />
                                        </span> :
                                        <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                            <FaCheck size={30} color="#009B17" />
                                        </span>}
                                    <span className="text-base md:text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                                </div>
                            }
                        </div>
                        :
                        <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
                            <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                                <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                                    <DeleteIcon width={30} />
                                </span>
                            </span>
                            <span className="flex items-center text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                                {t("PRsure")}<span>?</span>
                            </span>
                        </div>
                    }
                    <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">

                        <button
                            onClick={() => setDeleteModal(false)}
                            type="button"
                            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                            {t("PRcancel")}
                        </button>
                        <button
                            onClick={() => onHandleDeleteImage()}
                            type="button"
                            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                            {t("PRdelete")} </button>
                    </div>

                </section>
                {/* Img show */}
                <section
                    className={`fixed z-[201]   rounded-lg bg-white   w-fit h-fit m-auto cursor-pointer flex flex-col items-center justify-center inset-0  ${modalOfCarsouel ? "" : "hidden"
                        }`}
                >
                    <button
                        onClick={() => setModalOfCarsouel(false)}
                        className="absolute   z-[202] sm:top-0  top-[-50px] z-[224] right-[0px] sm:right-[-50px] md:right-[-80px]  flex items-center justify-center h-[38px] w-[38px] md:w-[50px] md:h-[50px] rounded-full bg-[#808080]">
                        <MenuCloseIcons colors="#fff" />
                    </button>
                    <div
                        className="w-full max-w-[440px] md:max-w-[620px] h-fit bg-white rounded-lg mt-[-4px] p-0 m-0 "
                    >
                        < div className="w-full  flex flex-col items-center justify-start">
                            {modalId == imageOne?.id1 &&
                                <div className="w-full">
                                    <div className="w-full h-[400px] md:h-[80vh]   flex items-center">
                                        {hideToggleIcons ?
                                            <div className="w-full h-full flex items-center justify-center">
                                                {loader && hideToggleIcons ?
                                                    <PuffLoader
                                                        color={"#007DCA"}
                                                        size={80}
                                                        loading={true}
                                                    />
                                                    :
                                                    <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                                                        {errorMessage ?
                                                            <span className="flex items-center justify-center p-2">
                                                                <MdError size={35} color="#FF4343" />
                                                            </span> :
                                                            <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                                                <FaCheck size={30} color="#009B17" />
                                                            </span>}
                                                        <span className="text-base md:text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <img
                                                src={imageOne?.url_photo1}
                                                alt="backImg"
                                                className=" w-full max-w-[440px] md:max-w-[620px] h-[400px] md:h-[80vh]	 border border-searchBgColor object-cover rounded-lg"
                                            />

                                        }

                                    </div>
                                    <div className={`w-full justify-between flex items-center px-3 h-[38px] md:h-[50px]`}>
                                        <label
                                            htmlFor={"imageOne1"}
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   text-[13px] md:text-lg font-AeonikProMedium"
                                        >
                                            <input
                                                className="hidden"
                                                id={"imageOne1"}
                                                type="file"
                                                name="fileUpload1"
                                                onChange={handleLocationImage1}
                                                accept=" image/*"
                                            />
                                            {t("PReditPhoto")}
                                        </label>
                                        {imageOne?.changed1 ? <button
                                            onClick={() => {
                                                setDeleteId(imageOne?.id1)
                                                UpadatePhoto(imageOne?.id1)
                                            }}
                                            type="button"
                                            className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   text-[13px] md:text-lg font-AeonikProMedium"
                                        >

                                            {t("PRsave")}
                                        </button>
                                            :
                                            <span
                                                className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-[13px] md:text-lg text-[13px] md:text-lg font-AeonikProMedium"
                                            >
                                                {t("PRsave")}
                                            </span>
                                        }
                                        <button
                                            onClick={() => {
                                                setDeleteModal(true)
                                                setDeleteId(imageOne?.id1)
                                            }}
                                            className="text-[#D50000] active:scale-95	active:opacity-70  text-[13px] md:text-lg not-italic font-AeonikProMedium">{t("PRdelete")}
                                        </button>
                                    </div>
                                </div>
                            }
                            {modalId == imageTwo?.id2 &&
                                <div className="w-full ">
                                    <div className="w-full h-[400px] md:h-[80vh]    flex items-center">
                                        {hideToggleIcons ?
                                            <div className="w-full h-full flex items-center justify-center">
                                                {loader && hideToggleIcons ?
                                                    <PuffLoader
                                                        color={"#007DCA"}
                                                        size={80}
                                                        loading={true}
                                                    />
                                                    :
                                                    <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                                                        {errorMessage ?
                                                            <span className="flex items-center justify-center p-2">
                                                                <MdError size={35} color="#FF4343" />
                                                            </span> :
                                                            <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                                                <FaCheck size={30} color="#009B17" />
                                                            </span>}
                                                        <span className="text-base md:text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <img
                                                src={imageTwo?.url_photo2}
                                                alt="backImg"
                                                className=" w-full max-w-[440px] md:max-w-[620px]  h-full	 border border-searchBgColor object-cover rounded-lg"
                                            />
                                        }
                                    </div>
                                    <div className={`w-full  justify-between  flex items-center px-3 h-[38px] md:h-[50px]`}>
                                        <label
                                            htmlFor={"imageTwo1"}
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   text-[13px] md:text-lg font-AeonikProMedium"
                                        >
                                            <input
                                                className="hidden"
                                                id={"imageTwo1"}
                                                type="file"
                                                name="fileUpload2"
                                                onChange={handleLocationImage2}
                                                accept=" image/*"
                                            />
                                            {t("PReditPhoto")}
                                        </label>
                                        {imageTwo?.changed2 ?
                                            <button
                                                onClick={() => {
                                                    setDeleteId(imageTwo?.id2)
                                                    UpadatePhoto(imageTwo?.id2)
                                                }}
                                                type="button"
                                                className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   text-[13px] md:text-lg font-AeonikProMedium"
                                            >
                                                {t("PRsave")}
                                            </button> :
                                            <span
                                                className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base text-[13px] md:text-lg font-AeonikProMedium"
                                            >
                                                {t("PRsave")}
                                            </span>}
                                        <button
                                            onClick={() => {
                                                setDeleteModal(true)
                                                setDeleteId(imageTwo?.id2)
                                            }}
                                            className="text-[#D50000] active:scale-95	active:opacity-70  text-[13px] md:text-lg not-italic font-AeonikProMedium">{t("PRdelete")}
                                        </button>
                                    </div>
                                </div>
                            }
                            {modalId == imageThree?.id3 &&
                                <div className="w-full">
                                    <div className="w-full h-[400px] md:h-[80vh]    flex items-center">
                                        {hideToggleIcons ?
                                            <div className="w-full h-full flex items-center justify-center">
                                                {loader && hideToggleIcons ?
                                                    <PuffLoader
                                                        color={"#007DCA"}
                                                        size={80}
                                                        loading={true}
                                                    />
                                                    :
                                                    <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                                                        {errorMessage ?
                                                            <span className="flex items-center justify-center p-2">
                                                                <MdError size={35} color="#FF4343" />
                                                            </span> :
                                                            <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                                                <FaCheck size={30} color="#009B17" />
                                                            </span>}
                                                        <span className="text-base md:text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <img
                                                src={imageThree?.url_photo3}
                                                alt="backImg"
                                                className=" w-full max-w-[440px] md:max-w-[620px] h-[400px] md:h-[80vh]	 border border-searchBgColor object-cover rounded-lg"
                                            />
                                        }

                                    </div>
                                    <div className={`w-full justify-between px-3 h-[38px] md:h-[50px] flex items-center`}>
                                        <label
                                            htmlFor={"imageThree1"}
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   text-[13px] md:text-lg font-AeonikProMedium"
                                        >
                                            <input
                                                className="hidden"
                                                id={"imageThree1"}
                                                type="file"
                                                name="fileUpload3"
                                                onChange={handleLocationImage3}
                                                accept=" image/*"
                                            />
                                            {t("PReditPhoto")}
                                        </label>
                                        {imageThree?.changed3 ? <button
                                            onClick={() => {
                                                setDeleteId(imageThree?.id3)
                                                UpadatePhoto(imageThree?.id3)
                                            }}
                                            type="button"
                                            className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   text-[13px] md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </button> :
                                            <span
                                                className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base text-[13px] md:text-lg font-AeonikProMedium"
                                            >
                                                {t("PRsave")}
                                            </span>}
                                        <button
                                            onClick={() => {
                                                setDeleteModal(true)
                                                setDeleteId(imageThree?.id3)
                                            }}
                                            className="text-[#D50000] active:scale-95	active:opacity-70  text-[13px] md:text-lg not-italic font-AeonikProMedium">{t("PRdelete")}
                                        </button>
                                    </div>
                                </div>
                            }
                            {modalId == imageFour?.id4 &&
                                <div className="w-full">
                                    <div className="w-full h-[400px] md:h-[80vh]    flex items-center">
                                        {hideToggleIcons ?
                                            <div className="w-full h-full flex items-center justify-center">
                                                {loader && hideToggleIcons ?
                                                    <PuffLoader
                                                        color={"#007DCA"}
                                                        size={80}
                                                        loading={true}
                                                    />
                                                    :
                                                    <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                                                        {errorMessage ?
                                                            <span className="flex items-center justify-center p-2">
                                                                <MdError size={35} color="#FF4343" />
                                                            </span> :
                                                            <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                                                <FaCheck size={30} color="#009B17" />
                                                            </span>}
                                                        <span className="text-base md:text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <img
                                                src={imageFour?.url_photo4}
                                                alt="backImg"
                                                className=" w-full max-w-[440px] md:max-w-[620px] h-[400px] md:h-[80vh]	 border border-searchBgColor object-cover rounded-lg"
                                            />
                                        }

                                    </div>
                                    <div className={`w-full  justify-between px-3 h-[38px] md:h-[50px]  flex items-center`}>
                                        <label
                                            htmlFor={"imageFour1"}
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   text-[13px] md:text-lg font-AeonikProMedium"
                                        >
                                            <input
                                                className="hidden"
                                                id={"imageFour1"}
                                                type="file"
                                                name="fileUpload4"
                                                onChange={handleLocationImage4}
                                                accept=" image/*"
                                            />
                                            {t("PReditPhoto")}
                                        </label>
                                        {imageFour?.changed4 ? <button
                                            onClick={() => {
                                                setDeleteId(imageFour?.id4)
                                                UpadatePhoto(imageFour?.id4)
                                            }}
                                            type="button"
                                            className="w-fit  flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   text-[13px] md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </button> : <span
                                            className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base text-[13px] md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </span>}
                                        <button
                                            onClick={() => {
                                                setDeleteModal(true)
                                                setDeleteId(imageFour?.id4)
                                            }}
                                            className="text-[#D50000] active:scale-95	active:opacity-70  text-[13px] md:text-lg not-italic font-AeonikProMedium">{t("PRdelete")}
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
                {/* Img Upload */}
                <section
                    className={`fixed z-[223]  rounded-lg bg-white w-full max-w-[440px]   md:max-w-[620px]  h-fit m-auto cursor-pointer flex flex-col items-center justify-center inset-0  ${freeModalUploadImg ? "" : "hidden"
                        }`}
                >
                    <button
                        onClick={() => {
                            // setOpenStoreList(false)
                            setErrorMessage(null)
                            setSuccessMessage(null)
                            setFreeModalUploadImg(false)
                        }}
                        className="absolute sm:top-0  top-[-50px] z-[224] right-[0px] sm:right-[-50px] md:right-[-80px]  flex items-center justify-center h-[38px] w-[38px] md:w-[50px] md:h-[50px] rounded-full bg-[#808080]">
                        <MenuCloseIcons colors="#fff" />
                    </button>
                    <div className="w-full max-w-[440px] md:max-w-[620px] h-fit overflow-hidden rounded-lg  ">
                        {Number(modalId) === Number(imageOne?.id1) &&
                            <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0 ">
                                <div className="w-full h-full">

                                    {!imageOne?.url_photo1 ?
                                        <label
                                            htmlFor={"imageOne"}
                                            className="h-[400px] md:h-[60vh] w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                        >
                                            <input
                                                className="hidden"
                                                id={"imageOne"}
                                                type="file"
                                                name="fileUpload1"
                                                onChange={handleLocationImage1}
                                                accept=" image/*"
                                            />

                                            <div
                                                className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col items-center justify-center">
                                                < FiDownload size={30} colors="" />
                                                <div className="text-xl text-textLightColor mt-[5px] ">
                                                    {t("APselectPhoto")}
                                                </div>
                                            </div>
                                        </label>
                                        :
                                        hideToggleIcons ?
                                            <div className="w-full h-[400px] md:h-[60vh] flex items-center justify-center">
                                                {loader && hideToggleIcons ?
                                                    <PuffLoader
                                                        // className={styles.loader1}
                                                        color={"#007DCA"}
                                                        size={80}
                                                        loading={true}
                                                    />
                                                    :
                                                    <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                                                        {errorMessage ?
                                                            <>
                                                                <span className="hidden md:flex items-center justify-center p-2">
                                                                    <MdError size={35} color="#FF4343" />
                                                                </span>
                                                                <span className="md:hidden flex items-center justify-center p-2">
                                                                    <MdError size={25} color="#FF4343" />
                                                                </span>
                                                            </> :
                                                            <>
                                                                <span className="border-2 border-[#009B17] rounded-full hidden md:flex items-center justify-center p-2">
                                                                    <FaCheck size={30} color="#009B17" />
                                                                </span>
                                                                <span className="border-2 border-[#009B17] rounded-full md:hidden flex items-center justify-center p-2">
                                                                    <FaCheck size={20} color="#009B17" />
                                                                </span>
                                                            </>
                                                        }
                                                        <span className="text-base md:text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <img
                                                src={imageOne?.url_photo1}
                                                alt="backImg"
                                                className=" w-full h-[400px] md:h-[80vh]  object-cover "
                                            />
                                    }
                                </div>
                                {imageOne?.url_File1 ?
                                    <div className="w-full h-[48px] flex items-center justify-between px-3  border-t">
                                        <label
                                            htmlFor={"changeimageOne"}
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                                        >
                                            <input
                                                className="hidden"
                                                id={"changeimageOne"}
                                                type="file"
                                                name="fileUpload2"
                                                onChange={handleLocationImage1}
                                                accept=" image/*"
                                            />
                                            {t("PReditPhoto")}
                                        </label>
                                        {activeColor !== activeNewColor && <button
                                            onClick={() => {
                                                onHandleAddImage()
                                            }}
                                            type="button"
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </button>}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageOne({ ...imageOne, url_File1: null, url_photo1: null })
                                            }}
                                            className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">{t("SScancel")}
                                        </button>
                                    </div> :
                                    <div className="w-full h-[48px] flex items-center justify-between px-3  border-t">
                                        <span
                                            className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PReditPhoto")}
                                        </span>
                                        {activeColor !== activeNewColor && <span
                                            className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </span>}
                                        <span
                                            className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">{t("SScancel")}
                                        </span>
                                    </div>}
                            </div>
                        }
                        {Number(modalId) === Number(imageTwo?.id2) &&
                            <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0  ">
                                <div className="w-full h-full  ">

                                    {!imageTwo?.url_photo2 ?
                                        <label
                                            htmlFor={"imageTwo"}
                                            className="h-[400px] md:h-[60vh] w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                        >
                                            <input
                                                className="hidden"
                                                id={"imageTwo"}
                                                type="file"
                                                name="fileUpload2"
                                                onChange={handleLocationImage2}
                                                accept=" image/*"
                                            />

                                            <div
                                                className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col items-center justify-center">
                                                < FiDownload size={30} colors="" />
                                                <div className="text-xl text-textLightColor mt-[5px] ">
                                                    {t("APselectPhoto")}
                                                </div>
                                            </div>
                                        </label>
                                        :
                                        hideToggleIcons ?
                                            <div className="w-full h-[400px] md:h-[60vh] flex items-center justify-center">
                                                {loader && hideToggleIcons ?
                                                    <PuffLoader
                                                        // className={styles.loader1}
                                                        color={"#007DCA"}
                                                        size={80}
                                                        loading={true}
                                                    />
                                                    :
                                                    <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                                                        {errorMessage ?
                                                            <>
                                                                <span className="hidden md:flex items-center justify-center p-2">
                                                                    <MdError size={35} color="#FF4343" />
                                                                </span>
                                                                <span className="md:hidden flex items-center justify-center p-2">
                                                                    <MdError size={25} color="#FF4343" />
                                                                </span>
                                                            </> :
                                                            <>
                                                                <span className="border-2 border-[#009B17] rounded-full hidden md:flex items-center justify-center p-2">
                                                                    <FaCheck size={30} color="#009B17" />
                                                                </span>
                                                                <span className="border-2 border-[#009B17] rounded-full md:hidden flex items-center justify-center p-2">
                                                                    <FaCheck size={20} color="#009B17" />
                                                                </span>
                                                            </>
                                                        }
                                                        <span className="text-base md:text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <img
                                                src={imageTwo?.url_photo2}
                                                alt="backImg"
                                                className=" w-full h-[400px] md:h-[80vh]  object-cover "
                                            />
                                    }
                                </div>
                                {imageTwo?.url_File2 ?
                                    <div className="w-full h-[48px] flex items-center justify-between px-3  border-t">
                                        <label
                                            htmlFor={"changeImageTwo"}
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                                        >
                                            <input
                                                className="hidden"
                                                id={"changeImageTwo"}
                                                type="file"
                                                name="fileUpload2"
                                                onChange={handleLocationImage2}
                                                accept=" image/*"
                                            />
                                            {t("PReditPhoto")}
                                        </label>
                                        {activeColor !== activeNewColor && <button
                                            onClick={() => {
                                                onHandleAddImage()
                                            }}
                                            type="button"
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </button>}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageTwo({ ...imageTwo, url_File2: null, url_photo2: null })
                                            }}
                                            className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">{t("SScancel")}
                                        </button>
                                    </div> :
                                    <div className="w-full h-[48px] flex items-center justify-between px-3  border-t">
                                        <span
                                            className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PReditPhoto")}
                                        </span>
                                        {activeColor !== activeNewColor && <span
                                            className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </span>}
                                        <span
                                            className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">{t("SScancel")}
                                        </span>
                                    </div>}
                            </div>
                        }
                        {Number(modalId) === Number(imageThree?.id3) &&
                            <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0 ">
                                <div className="w-full h-fil">

                                    {!imageThree?.url_photo3 ?
                                        <label
                                            htmlFor={"imageThree"}
                                            className="h-[400px] md:h-[60vh] w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                        >
                                            <input
                                                className="hidden"
                                                id={"imageThree"}
                                                type="file"
                                                name="fileUpload3"
                                                onChange={handleLocationImage3}
                                                accept=" image/*"
                                            />

                                            <div
                                                className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col items-center justify-center">
                                                < FiDownload size={30} colors="" />
                                                <div className="text-xl text-textLightColor mt-[5px] ">
                                                    {t("APselectPhoto")}
                                                </div>
                                            </div>
                                        </label>
                                        :
                                        hideToggleIcons ?
                                            <div className="w-full h-[400px] md:h-[60vh] flex items-center justify-center">
                                                {loader && hideToggleIcons ?
                                                    <PuffLoader
                                                        // className={styles.loader1}
                                                        color={"#007DCA"}
                                                        size={80}
                                                        loading={true}
                                                    />
                                                    :
                                                    <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                                                        {errorMessage ?
                                                            <>
                                                                <span className="hidden md:flex items-center justify-center p-2">
                                                                    <MdError size={35} color="#FF4343" />
                                                                </span>
                                                                <span className="md:hidden flex items-center justify-center p-2">
                                                                    <MdError size={25} color="#FF4343" />
                                                                </span>
                                                            </> :
                                                            <>
                                                                <span className="border-2 border-[#009B17] rounded-full hidden md:flex items-center justify-center p-2">
                                                                    <FaCheck size={30} color="#009B17" />
                                                                </span>
                                                                <span className="border-2 border-[#009B17] rounded-full md:hidden flex items-center justify-center p-2">
                                                                    <FaCheck size={20} color="#009B17" />
                                                                </span>
                                                            </>}
                                                        <span className="text-base md:text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <img
                                                src={imageThree?.url_photo3}
                                                alt="backImg"
                                                className=" w-full h-[400px] md:h-[80vh]  object-cover "
                                            />
                                    }
                                </div>
                                {imageThree?.url_photo3 ?
                                    <div className="w-full h-[48px] flex items-center justify-between px-3  border-t">
                                        <label
                                            htmlFor={"changeImageThree"}
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                                        >
                                            <input
                                                className="hidden"
                                                id={"changeImageThree"}
                                                type="file"
                                                name="fileUpload3"
                                                onChange={handleLocationImage3}
                                                accept=" image/*"
                                            />
                                            {t("PReditPhoto")}
                                        </label>

                                        {activeColor !== activeNewColor && <button
                                            onClick={() => {
                                                onHandleAddImage()
                                            }}
                                            type="button"
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </button>}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageThree({ ...imageThree, url_File3: null, url_photo3: null })
                                            }}
                                            className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">{t("SScancel")}
                                        </button>
                                    </div> :
                                    <div className="w-full h-[48px] flex items-center justify-between px-3  border-t">
                                        <span
                                            className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PReditPhoto")}
                                        </span>
                                        {activeColor !== activeNewColor && <span
                                            className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </span>}
                                        <span
                                            className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">{t("SScancel")}
                                        </span>
                                    </div>}
                            </div>
                        }
                        {Number(modalId) === Number(imageFour?.id4) &&
                            <div className="w-full h-full bg-white  rounded-lg mt-[-4px] p-0 m-0 ">
                                <div className="w-full h-fit">

                                    {!imageFour?.url_photo4 ?
                                        <label
                                            htmlFor={"imageFour"}
                                            className="h-[400px] md:h-[60vh] w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                        >
                                            <input
                                                className="hidden"
                                                id={"imageFour"}
                                                type="file"
                                                name="fileUpload4"
                                                onChange={handleLocationImage4}
                                                accept=" image/*"
                                            />
                                            <div
                                                className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col items-center justify-center">
                                                < FiDownload size={30} colors="" />
                                                <div className="text-xl text-textLightColor mt-[5px] ">
                                                    {t("APselectPhoto")}
                                                </div>
                                            </div>
                                        </label>
                                        :
                                        hideToggleIcons ?
                                            <div className="w-full h-[400px] md:h-[60vh] flex items-center justify-center">
                                                {loader && hideToggleIcons ?
                                                    <PuffLoader
                                                        // className={styles.loader1}
                                                        color={"#007DCA"}
                                                        size={80}
                                                        loading={true}
                                                    />
                                                    :
                                                    <div className="w-full h-full flex gap-y-3 flex-col items-center justify-center ">
                                                        {errorMessage ?
                                                            <>
                                                                <span className="hidden md:flex items-center justify-center p-2">
                                                                    <MdError size={35} color="#FF4343" />
                                                                </span>
                                                                <span className="md:hidden flex items-center justify-center p-2">
                                                                    <MdError size={25} color="#FF4343" />
                                                                </span>
                                                            </> :
                                                            <>
                                                                <span className="border-2 border-[#009B17] rounded-full hidden md:flex items-center justify-center p-2">
                                                                    <FaCheck size={30} color="#009B17" />
                                                                </span>
                                                                <span className="border-2 border-[#009B17] rounded-full md:hidden flex items-center justify-center p-2">
                                                                    <FaCheck size={20} color="#009B17" />
                                                                </span>
                                                            </>}
                                                        <span className="text-base md:text-2xl not-italic font-AeonikProMedium">{errorMessage ? errorMessage : SuccessMessage}</span>
                                                    </div>
                                                }
                                            </div>
                                            :
                                            <img
                                                src={imageFour?.url_photo4}
                                                alt="backImg"
                                                className=" w-full h-[400px] md:h-[80vh]  object-cover "
                                            />
                                    }
                                </div>
                                {imageFour?.url_photo4 ?
                                    <div className="w-full h-[48px] flex items-center justify-between px-3  border-t">
                                        <label
                                            htmlFor={"changeImageFour"}
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                                        >
                                            <input
                                                className="hidden"
                                                id={"changeImageFour"}
                                                type="file"
                                                name="fileUpload4"
                                                onChange={handleLocationImage4}
                                                accept=" image/*"
                                            />
                                            {t("PReditPhoto")}
                                        </label>
                                        {activeColor !== activeNewColor && <button
                                            onClick={() => {
                                                onHandleAddImage()
                                            }}
                                            type="button"
                                            className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </button>}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFour({ ...imageFour, url_File4: null, url_photo4: null })
                                            }}
                                            className="text-[#D50000]  active:scale-95	active:opacity-70  text-lg not-italic font-AeonikProMedium">{t("SScancel")}
                                        </button>
                                    </div>
                                    :
                                    <div className="w-full h-[48px] flex items-center justify-between px-3  border-t">
                                        <span
                                            className="w-fit   flex items-center  cursor-not-allowed    text-[#b5b5b5]   md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PReditPhoto")}
                                        </span>
                                        {activeColor !== activeNewColor && <span
                                            className="w-fit  flex items-center justify-center cursor-not-allowed    text-[#b5b5b5] rounded-lg text-base md:text-lg font-AeonikProMedium"
                                        >
                                            {t("PRsave")}
                                        </span>}
                                        <span
                                            className="text-[#b5b5b5]  cursor-not-allowed   text-lg not-italic font-AeonikProMedium">{t("SScancel")}
                                        </span>
                                    </div>}
                            </div>
                        }

                    </div>
                </section>
            </div>
            <div className='w-full  flex flex-col justify-center'>
                < div className="w-[230px] ls:w-[250px] md:w-[290px] flex items-center justify-between  " >
                    <div className="flex items-center text-[13px] md:text-base font-AeonikProRegular">
                        <p>{t("PRphoto")}</p>
                        <span className="ml-[5px]">
                            <StarLabel />
                        </span>
                    </div>
                    {
                        <div className="w-fit flex h-fit items-center mb-[6px]  rounded-[12px]">
                            <div className="w-fit h-fit flex items-center gap-x-3">
                                <button
                                    type="button"
                                    className={`w-[16px] xs:w-[22px] h-[16px] xs:h-[22px] rounded-full   `}
                                    style={{ background: `${colorGroup?.filter(e => e?.id === activeColor)?.map(item => { return item?.hex })}` }}
                                ></button>
                            </div>
                        </div>}
                </div >
                <section className="w-full flex flex-col flex-wrap h-full md:gap-x-[10px] ">
                    {colors_Id?.length > colorListForTest?.length && activeNewColor === activeColor ?
                        <div className="w-full h-full flex md:flex-col gap-x-1  ll:gap-x-3  justify-center">
                            <div className={`w-full max-w-[220px]  md:max-w-[290px]  h-[300px] md:h-[380px] flex items-center `}>
                                <div className="w-full h-full rounded-[12px] border overflow-hidden"                            >
                                    <div className={`h-full w-full max-w-[220px] md:max-w-[290px]`}>
                                        < article
                                            className="w-full flex flex-col h-full ">
                                            {!imageOne?.url_photo1 &&
                                                <label
                                                    htmlFor={"image1"}
                                                    className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                                >
                                                    <input
                                                        className="hidden"
                                                        id={"image1"}
                                                        type="file"
                                                        name="fileUpload6"
                                                        onChange={handleLocationImage1}
                                                        accept=" image/*"
                                                    />
                                                    <div
                                                        className="w-full h-full overflow-hidden  bg-photoBg   flex flex-col items-center justify-center">
                                                        <DownloadIcon colors={'#007DCA'} />
                                                        <div className="text-center text-[11px] text-textLightColor mt-[5px]">
                                                            ({t("APnotNecessary")})
                                                        </div>
                                                    </div>
                                                </label>
                                            }
                                            {imageOne.url_photo1 && (
                                                <div
                                                    onClick={() => handleFreeModalUploadImg(imageOne?.id1)}
                                                    className="BackgImageBLur overflow-hidden  h-full  w-full  flex items-center justify-center  ">
                                                    <div className="flex items-center justify-center   h-full  w-full ">
                                                        <img
                                                            className="w-full max-w-[220px] md:max-w-[290px] md:max-h-[380px] max-h-[295px] h-full mx-auto align-middle object-cover cursor-pointer "
                                                            src={imageOne?.url_photo1}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                        </article>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[70px] md:w-[290px] md:mt-[10px] gap-y-2  h-[300px]  md:h-[120px]  md:flex-row flex-col flex      justify-between rounded-lg  ">
                                <div className={`w-full md:w-[31%]   h-[100px] md:h-[120px]  flex-col items-center justify-start  border rounded-lg overflow-hidden   `}>
                                    {imageOne?.url_photo1 ?
                                        !imageTwo?.url_photo2 ?
                                            <label
                                                htmlFor={"image2"}
                                                className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                            >
                                                <input
                                                    className="hidden"
                                                    id={"image2"}
                                                    type="file"
                                                    name="fileUpload6"
                                                    onChange={handleLocationImage2}
                                                    accept=" image/*"
                                                />
                                                <div
                                                    className="w-full h-full overflow-hidden  bg-photoBg   flex flex-col items-center justify-center">
                                                    <DownloadIcon colors={'#007DCA'} />
                                                    <div className="text-center text-[11px] text-textLightColor mt-[5px]">
                                                        ({t("APnotNecessary")})
                                                    </div>
                                                </div>
                                            </label>
                                            :
                                            <div
                                                onClick={() => handleFreeModalUploadImg(imageTwo?.id2)}
                                                className="BackgImageBLur  overflow-hidden  w-full h-full flex items-center justify-center   ">
                                                <div className="flex items-center justify-center w-full h-full ">
                                                    <img
                                                        className="h-full w-full mx-auto align-middle object-cover cursor-pointer "
                                                        src={imageTwo?.url_photo2}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        :
                                        <div
                                            className="w-full h-full overflow-hidden    flex flex-col items-center  justify-center">
                                            <span><DownloadIcon colors={'#b5b5b5'} /></span>
                                            <div className="text-[11px] text-[#b5b5b5] mt-[5px]">
                                                ({t("APnotNecessary")})
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className={`w-full md:w-[31%]   h-[100px] md:h-[120px]  flex-col items-center justify-start  border rounded-lg overflow-hidden`}>
                                    {imageTwo?.url_photo2 ?
                                        !imageThree?.url_photo3 ?
                                            <label
                                                htmlFor={"image3"}
                                                className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                            >
                                                <input
                                                    className="hidden"
                                                    id={"image3"}
                                                    type="file"
                                                    name="fileUpload6"
                                                    onChange={handleLocationImage3}
                                                    accept=" image/*"
                                                />
                                                <div
                                                    className="w-full h-full overflow-hidden  bg-photoBg   flex flex-col items-center justify-center">
                                                    <DownloadIcon colors={'#007DCA'} />
                                                    <div className="text-center text-[11px] text-textLightColor mt-[5px]">
                                                        ({t("APnotNecessary")})
                                                    </div>
                                                </div>
                                            </label>
                                            :
                                            <div
                                                onClick={() => handleFreeModalUploadImg(imageThree?.id3)}
                                                className="BackgImageBLur  overflow-hidden  w-full h-full flex items-center justify-center   ">
                                                <div className="flex items-center justify-center w-full h-full ">
                                                    <img
                                                        className="h-full w-full mx-auto align-middle object-cover cursor-pointer "
                                                        src={imageThree?.url_photo3}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        :
                                        <div
                                            className="w-full h-full overflow-hidden    flex flex-col items-center  justify-center">
                                            <span><DownloadIcon colors={'#b5b5b5'} /></span>
                                            <div className="text-[11px] text-[#b5b5b5] mt-[5px]">
                                                ({t("APnotNecessary")})
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className={`w-full md:w-[31%]   h-[100px] md:h-[120px]  flex-col items-center justify-start  border rounded-lg overflow-hidden `}>
                                    {imageThree?.url_photo3 ?
                                        !imageFour?.url_photo4 ?
                                            <label
                                                htmlFor={"image4"}
                                                className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                            >
                                                <input
                                                    className="hidden"
                                                    id={"image4"}
                                                    type="file"
                                                    name="fileUpload6"
                                                    onChange={handleLocationImage4}
                                                    accept=" image/*"
                                                />
                                                <div
                                                    className="w-full h-full overflow-hidden  bg-photoBg   flex flex-col items-center justify-center">
                                                    <DownloadIcon colors={'#007DCA'} />
                                                    <div className="text-center text-[11px] text-textLightColor mt-[5px]">
                                                        ({t("APnotNecessary")})
                                                    </div>
                                                </div>
                                            </label>
                                            :
                                            <div
                                                onClick={() => handleFreeModalUploadImg(imageFour?.id4)}
                                                className="BackgImageBLur  overflow-hidden  w-full h-full flex items-center justify-center   ">
                                                <div className="flex items-center justify-center w-full h-full ">
                                                    <img
                                                        className="h-full w-full mx-auto align-middle object-cover cursor-pointer "
                                                        src={imageFour?.url_photo4}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        :
                                        <div
                                            className="w-full h-full overflow-hidden    flex flex-col items-center  justify-center">
                                            <span><DownloadIcon colors={'#b5b5b5'} /></span>
                                            <div className="text-[11px] text-[#b5b5b5] mt-[5px]">
                                                ({t("APnotNecessary")})
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div >
                        :
                        <div className="w-full h-full flex md:flex-col gap-x-1  ll:gap-x-3   rounded-lg  justify-center ">
                            <div className={`w-full max-w-[220px]  md:max-w-[290px]  h-[300px] md:h-[380px] flex items-center `}>
                                <div
                                    className="h-full w-full max-w-[220px] md:max-w-[290px]  "
                                >
                                    <div className={`h-full  border  overflow-hidden rounded-lg`}>
                                        < article
                                            onClick={
                                                () => {
                                                    handleClickCarosuel()
                                                    setModalId(imageOne?.id1)
                                                }
                                            }
                                            className="w-full flex flex-col h-full ">
                                            <div className="BackgImageBLur   h-full  flex items-center justify-center ">
                                                <div className="flex items-center justify-center w-full h-full  backdrop-blur-md">
                                                    <img
                                                        className="h-full w-full max-w-[220px] md:max-w-[290px] mx-auto align-middle object-cover cursor-pointer "
                                                        src={imageOne?.url_photo1}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[70px]     md:w-[290px] md:mt-[10px] gap-y-2 ls:h-[300px]  md:h-[120px]  md:flex-row flex-col flex      justify-between rounded-lg  ">
                                <div className={`w-full md:w-[31%]   h-[100px] md:h-[120px]  flex-col items-center justify-start  border rounded-lg overflow-hidden   `}>
                                    {!imageTwo?.url_photo2 ?
                                        imageOne?.url_photo1 ?
                                            <div
                                                onClick={
                                                    () => handleFreeModalUploadImg(imageTwo?.id2)}
                                                className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                            >

                                                <div
                                                    className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col  items-center justify-center">
                                                    <DownloadIcon colors={'#007DCA'} />
                                                    <div className="text-center text-[11px] text-textLightColor mt-[5px]">
                                                        ({t("APnotNecessary")})
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-[#b5b5b5]">
                                                <div
                                                    className="w-full h-full overflow-hidden    flex flex-col items-center  justify-center">
                                                    <span><DownloadIcon colors={'#b5b5b5'} /></span>
                                                    <div className="text-center text-[11px] text-[#b5b5b5] mt-[5px]">
                                                        ({t("APnotNecessary")})
                                                    </div>
                                                </div>
                                            </div>
                                        :
                                        <div
                                            onClick={
                                                imageTwo?.product_id2 ?
                                                    () => {
                                                        handleClickCarosuel()
                                                        setModalId(imageTwo?.id2)
                                                    } :
                                                    () => handleFreeModalUploadImg(imageTwo?.id2)
                                            }
                                            className="BackgImageBLur  overflow-hidden  w-full h-full flex items-center justify-center   ">
                                            <div className="flex items-center justify-center w-full h-full ">
                                                <img
                                                    className="h-full w-full mx-auto align-middle object-cover cursor-pointer "
                                                    src={imageTwo?.url_photo2}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className={`w-full md:w-[31%]   h-[100px] md:h-[120px]  flex-col items-center justify-start  border rounded-lg overflow-hidden   `}>
                                    {!imageThree?.url_photo3 ?
                                        imageTwo?.url_photo2 ?
                                            <div
                                                onClick={
                                                    () => handleFreeModalUploadImg(imageThree?.id3)}
                                                className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                            >

                                                <div
                                                    className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col  items-center justify-center">
                                                    <DownloadIcon colors={'#007DCA'} />
                                                    <div className="text-center text-[11px] text-textLightColor mt-[5px]">
                                                        ({t("APnotNecessary")})
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-[#b5b5b5]">
                                                <div
                                                    className="w-full h-full overflow-hidden    flex flex-col items-center  justify-center">
                                                    <span><DownloadIcon colors={'#b5b5b5'} /></span>
                                                    <div className="text-center text-[11px] text-[#b5b5b5] mt-[5px]">
                                                        ({t("APnotNecessary")})
                                                    </div>
                                                </div>
                                            </div>
                                        :
                                        <div
                                            onClick={
                                                imageThree?.product_id3 ?
                                                    () => {
                                                        handleClickCarosuel()
                                                        setModalId(imageThree?.id3)
                                                    } :
                                                    () => handleFreeModalUploadImg(imageThree?.id3)
                                            }
                                            className="BackgImageBLur  overflow-hidden  w-full h-full flex items-center justify-center   ">
                                            <div className="flex items-center justify-center w-full h-full ">
                                                <img
                                                    className="h-full w-full mx-auto align-middle object-cover cursor-pointer "
                                                    src={imageThree?.url_photo3}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className={`w-full md:w-[31%]  h-[100px] md:h-[120px]  flex-col items-center justify-start  border rounded-lg overflow-hidden   `}>
                                    {!imageFour?.url_photo4 ?
                                        imageThree?.url_photo3 ?
                                            <div
                                                onClick={
                                                    () => handleFreeModalUploadImg(imageFour?.id4)}
                                                className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                                            >
                                                <div
                                                    className="w-full h-full overflow-hidden  bg-photoBg  flex flex-col  items-center justify-center">
                                                    <DownloadIcon colors={'#007DCA'} />
                                                    <div className="text-center text-[11px] text-textLightColor mt-[5px]">
                                                        ({t("APnotNecessary")})
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-[#b5b5b5]">
                                                <div
                                                    className="w-full h-full overflow-hidden    flex flex-col items-center  justify-center">
                                                    <span><DownloadIcon colors={'#b5b5b5'} /></span>
                                                    <div className="text-center text-[11px] text-[#b5b5b5] mt-[5px]">
                                                        ({t("APnotNecessary")})
                                                    </div>
                                                </div>
                                            </div>
                                        :
                                        <div
                                            onClick={
                                                imageFour?.product_id4 ?
                                                    () => {
                                                        handleClickCarosuel()
                                                        setModalId(imageFour?.id4)
                                                    } :
                                                    () => handleFreeModalUploadImg(imageFour?.id4)
                                            }
                                            className="BackgImageBLur  overflow-hidden  w-full h-full flex items-center justify-center   ">
                                            <div className="flex items-center justify-center w-full h-full ">
                                                <img
                                                    className="h-full w-full mx-auto align-middle object-cover cursor-pointer "
                                                    src={imageFour?.url_photo4}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div >
                    }
                </section >
            </div>
        </div>
    )
}

export default CarouselEdit1
