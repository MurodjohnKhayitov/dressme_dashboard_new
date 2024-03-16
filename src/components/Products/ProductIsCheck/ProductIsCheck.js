import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductsPageOne from '../AddingProductPageOne/ProductsPageOne'
import { dressMainData } from '../../../hook/ContextTeam'
import axios from 'axios'
import LoadingForSeller from '../../Loading/LoadingFor'
import { HelperData } from '../../../hook/HelperDataStore'
import { useTranslation } from 'react-i18next'
import { ShopList } from '../../../hook/ShopList'
const { REACT_APP_BASE_URL } = process.env;

export default function ProductIsCheck() {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [loading, setLoading] = useState(true);
     const [shopList, setShopList] = useContext(ShopList)

    const { t } = useTranslation("product");

    useEffect(() => {
        const fetchDataShop = async () => {
            try {
                setLoading(true)
                const data = await axios.get(`${REACT_APP_BASE_URL}/shops`, {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
                    }
                });
                if (data?.status >= 200 && data?.status < 300) {
                     setShopList( data?.data)
                }
                setLoading(false)

            } catch (error) {

            }
        };
        const fetchDataLocations = async () => {
            try {
                const data = await axios.get(`${REACT_APP_BASE_URL}/shops/locations/index`, {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
                    }
                });
                if (data?.status >= 200 && data?.status < 300) {
                    setDressInfo({ ...dressInfo, locationList: data?.data?.locations })
                }
            } catch (error) {

            }
        };
        if (!shopList) {
            fetchDataShop();
        }
        if (!dressInfo?.locationList) {
            fetchDataLocations();
        }
    }, []);
    return (
        <div>
            {

                loading ?
                    <LoadingForSeller />
                    :
                    shopList?.shops?.length > 0
                        ?
                        dressInfo?.locationList?.length > 0
                            ?
                            <ProductsPageOne />
                            :
                            <div className="flex items-center h-[100vh] justify-center">
                                <Link
                                    to="/locations-store"
                                    className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
                                >
                                    {t("PRNoLocation")}
                                </Link>
                            </div >
                        :
                        <div className="flex items-center h-[100vh] justify-center">
                            <Link
                                to="/store"
                                className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
                            >
                                {t("PRaddMarket")}
                            </Link>
                        </div >
            }
        </div >
    )
}
