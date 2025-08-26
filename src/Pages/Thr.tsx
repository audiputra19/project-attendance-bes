import { FC, useEffect } from "react";
import { usePostThrMutation } from "../services/apiThr";
import { useAppSelector } from "../store";
import Loading from "../Components/Loading";
import { ArrowLeft } from "lucide-react";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { NotFound } from "../Components/NotFound";
import moment from "moment";

const Thr: FC = () => {
    const [postThr, {data, isLoading}] = usePostThrMutation();
    const userData = useAppSelector(state => state.auth.userInfo);
    const navigate = useNavigate();
    const year = moment().year();
    let total = 0;
    if(data){
        total = data.gaji + data.umt;
    }
    //console.log(data);

    useEffect(() => {
        postThr({ nik: userData?.nik })
    }, [postThr, userData?.nik]);

    return (
        isLoading ? (
            <Loading/>
        ) : (
            <div className="min-h-screen bg-white dark:bg-dark-main">
                <div className="sticky z-20 top-0 left-0 right-0 bg-white flex justify-between items-center p-5 md:mx-20 lg:mx-48 lg:border-b-2 lg:border-gray-200 dark:border-dark-second dark:bg-dark-main">
                    <div
                        className="bg-gray-100 p-3 rounded-xl cursor-pointer text-black dark:text-white dark:bg-dark-second"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft/>
                    </div>
                    <div className="hidden lg:block">
                        <p className="text-xl font-bold dark:text-white">{t('thr')}
                            <span className="text-color-base pl-1 text-4xl">.</span>
                        </p>
                    </div>
                    <div></div>
                </div>
                <div className="p-5 sm:mx-12 md:mx-32 lg:mx-80">
                    {!data ? (
                        <NotFound/>
                    ) : (
                        <div className="border border-gray-200 rounded-2xl p-5">
                            <div>
                                <p className="font-bold text-gray-700 text-2xl dark:text-white">THR {year}</p>
                            </div>
                            <div className="mt-10 grid grid-cols-3 gap-4 text-gray-700 dark:text-white">
                                <div className="font-bold">NIK</div>
                                <div className="flex justify-end col-span-2">{data.nik}</div>
                                <div className="font-bold">Nama</div>
                                <div className="flex justify-end col-span-2 text-right">{data.nama}</div>
                                <div className="font-bold">Gaji</div>
                                <div className="flex justify-end col-span-2">{data.gaji.toLocaleString("id-ID")}</div>
                                <div className="font-bold">UMT</div>
                                <div className="flex justify-end col-span-2">{data.umt.toLocaleString("id-ID")}</div>
                                <div className="font-bold"></div>
                                <div className="flex justify-end col-span-2">
                                    <div className="h-[2px] bg-gray-300 w-full dark:bg-white"></div>
                                </div>
                                <div className="font-bold">THR</div>
                                <div className="flex justify-end col-span-2">{total.toLocaleString("id-ID")}</div>
                                <div className="font-bold">Dihitung</div>
                                <div className="flex justify-end col-span-2">1</div>
                                <div className="font-bold"></div>
                                <div className="flex justify-end col-span-2">
                                    <div className="h-[2px] bg-gray-300 w-full dark:bg-white"></div>
                                </div>
                                <div className="font-bold">Diterima</div>
                                <div className="flex text-xl font-bold text-color-base justify-end col-span-2">Rp. {data.jumlah.toLocaleString("id-ID")}</div>
                            </div>
                            <div className="mt-16">
                                <p className="text-xs text-gray-700 dark:text-white">Dear <span className="font-bold text-gray-700">{data.nama}</span>,</p>
                                <p className="text-xs text-gray-700 dark:text-white">Thank you for your commitment and hard work! As a small appreciation, here’s your holiday bonus. Enjoy the festive season with your loved ones, and we look forward to another great year ahead!</p>
                            </div>    
                        </div>
                    )}
                </div>
            </div>
        )    
    )
}

export default Thr;