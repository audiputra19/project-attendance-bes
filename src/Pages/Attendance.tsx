import axios from "axios";
import { ArrowLeft, Clock1, Clock12, Clock5, Clock7 } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import LiveClock from "../Components/LiveClock";
import Loading from "../Components/Loading";
import { useAlert } from "../Context/AlertContext";
import { TimeAttendanceProps } from "../interfaces/attendance";
import { usePostAttendanceMutation, useTimeAttendanceMutation } from "../services/apiAttendance";
import { useAppSelector } from "../store";

const Attendance: FC = () => {
    const [postAttendance, {isLoading}] = usePostAttendanceMutation();
    const [postTimeAttendance, {data, isSuccess, isLoading: timeLoading}] = useTimeAttendanceMutation();
    const [time, setTime] = useState<TimeAttendanceProps>();
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const userData = useAppSelector(state => state.auth.userInfo);
    const nik = userData?.nik;
    const { t } = useTranslation();

    useEffect(() => {
        if(nik){
            postTimeAttendance({nik});
        }
    }, [nik, postTimeAttendance]);

    useEffect(() => {
        if(isSuccess && data){
            setTime(data.data);
        }
    }, [isSuccess, data]);

    const formatTime = (timeSring: string): string => {
        return timeSring.split(':').join(' : ');
    }

    const handleAttendance = async () => {
        setLoading(true);

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( 
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const data = await postAttendance({ latitude, longitude, nik }).unwrap();
                        showAlert(data.message);
                        
                        if (nik) {
                            postTimeAttendance({ nik });
                        }

                    } catch (error: any) {
                        const message = error?.data?.message || 'Gagal melakukan absensi';
                        showAlert(message);
                    } finally {
                        setLoading(false); 
                    }
                },
                (error) => {
                    console.error('Error mendapatkan lokasi:', error);
                    showAlert('Tidak mendapatkan lokasi.');
                    setLoading(false);
                },{
                    enableHighAccuracy: true, // Menggunakan akurasi tinggi
                    timeout: 5000, // Set timeout untuk mendapatkan lokasi
                    maximumAge: 0,
                });
        } else {
            showAlert('Geolokasi tidak didukung oleh browser ini.');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-dark-main">
            {isLoading || loading ? (
                <Loading/>
            ) : (
                <div>
                    <div className="sticky z-20 top-0 left-0 right-0 bg-white flex justify-between items-center p-5 md:mx-20 lg:mx-48 lg:border-b-2 lg:border-gray-200 dark:border-dark-second dark:bg-dark-main">
                        <div
                            className="bg-gray-100 p-3 rounded-xl cursor-pointer text-black dark:text-white dark:bg-dark-second"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft/>
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-xl font-bold text-black dark:text-white">{t('attendance')}
                                <span className="text-color-base pl-1 text-4xl">.</span>
                            </p>
                        </div>
                        <div></div>
                    </div>
                    <div className="p-5 sm:mx-10 md:mx-32 lg:mx-80">
                        <LiveClock/>
                        <div className="mt-10 flex gap-3">
                            <p className="font-semibold text-xl text-black dark:text-white">{t('todayAttendance')}</p>
                            <div className="py-2 px-4 text-xs font-semibold rounded-2xl bg-red-100 text-red-500">Comingsoon</div>
                        </div> 
                        <div className="mt-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="bg-gray-100 p-5 rounded-xl dark:bg-dark-second">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-3 rounded-xl dark:bg-blue-500">
                                            <Clock7 className="text-blue-500 dark:text-white"/>
                                        </div>
                                        <p className="font-semibold text-sm md:text-base text-black dark:text-white">{t('checkIn')}</p>
                                    </div>
                                    <div className="mt-3">
                                        {timeLoading ? (
                                            <div className="w-[100px] h-5 rounded-xl animate-pulse bg-gray-300 mb-2 dark:bg-gray-600"></div>
                                        ) : (
                                            <p className="font-semibold text-xl text-color-base">{time && time.masuk !== '00:00:00' ? formatTime(time.masuk) : '-'}</p>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        {timeLoading ? (
                                            <div className="w-[80px] h-5 rounded-xl animate-pulse bg-gray-300 mb-2 dark:bg-gray-600"></div>
                                        ) : (
                                            <p className={`font-semibold text-sm ${ time?.telat === 0 || time?.masuk === '00:00:00' ? 'text-gray-400' : 'text-red-500'}`}>
                                                {time?.masuk === '00:00:00' ? 'Please Check-In' : time?.telat === 0 ? t('onTime') : t('late')}
                                                
                                                {time && time.alpa > 0 
                                                ? <span className="bg-red-100 text-red-500 text-xs py-1 px-2 rounded-xl ml-2">Alpa</span>
                                                : null
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-5 rounded-xl dark:bg-dark-second">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-3 rounded-xl dark:bg-blue-500">
                                            <Clock12 className="text-blue-500 dark:text-white"/>
                                        </div>
                                        <p className="font-semibold text-sm md:text-base text-black dark:text-white">{t('break')}</p>
                                    </div>
                                    <div className="mt-3">
                                        {timeLoading ? (
                                            <div className="w-[100px] h-5 rounded-xl animate-pulse bg-gray-300 mb-2 dark:bg-gray-600"></div>
                                        ) : (
                                            <p className="font-semibold text-xl text-color-base">{time && time.istKeluar !== '00:00:00' ? formatTime(time.istKeluar) : '-'}</p>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        {timeLoading ? (
                                            <div className="w-[80px] h-5 rounded-xl animate-pulse bg-gray-300 mb-2 dark:bg-gray-600"></div>
                                        ) : (
                                            <p className="font-semibold text-sm text-gray-400">{t('halfHours')}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-5 rounded-xl dark:bg-dark-second">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-3 rounded-xl dark:bg-blue-500">
                                            <Clock1 className="text-blue-500 dark:text-white"/>
                                        </div>
                                        <p className="font-semibold text-sm md:text-base text-black dark:text-white">{t('breakIn')}</p>
                                    </div>
                                    <div className="mt-3">
                                        {timeLoading ? (
                                            <div className="w-[100px] h-5 rounded-xl animate-pulse bg-gray-300 mb-2 dark:bg-gray-600"></div>
                                        ) : (
                                            <p className="font-semibold text-xl text-color-base">{time && time.istMasuk !== '00:00:00' ? formatTime(time.istMasuk) : '-'}</p>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        {timeLoading ? (
                                            <div className="w-[80px] h-5 rounded-xl animate-pulse bg-gray-300 mb-2 dark:bg-gray-600"></div>
                                        ) : (
                                            <p className={`font-semibold text-sm ${ time?.telatIst === 0 || time?.istMasuk === '00:00:00' ? 'text-gray-400' : 'text-red-500'}`}>
                                                {time?.telatIst === 0 || time?.istMasuk === '00:00:00' ? t('halfHours') : t('late')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-5 rounded-xl dark:bg-dark-second">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-3 rounded-xl dark:bg-blue-500">
                                            <Clock5 className="text-blue-500 dark:text-white"/>
                                        </div>
                                        <p className="font-semibold text-sm md:text-base text-black dark:text-white">{t('checkOut')}</p>
                                    </div>
                                    <div className="mt-3">
                                        {timeLoading ? (
                                            <div className="w-[100px] h-5 rounded-xl animate-pulse bg-gray-300 mb-2 dark:bg-gray-600"></div>
                                        ) : (
                                            <p className="font-semibold text-xl text-color-base">{time && time.keluar !== '00:00:00' ? formatTime(time.keluar) : '-'}</p>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        {timeLoading ? (
                                            <div className="w-[80px] h-5 rounded-xl animate-pulse bg-gray-300 mb-2 dark:bg-gray-600"></div>
                                        ) : (
                                            <p className="font-semibold text-sm text-gray-400">{t('goHome')}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                    <div className="p-5 sm:mx-10 md:mx-32 lg:mx-80">
                        <button
                            type="button"
                            className="w-full bg-color-base p-4 rounded-xl text-white font-bold"
                            onClick={handleAttendance}
                            disabled
                        >
                            {t('attendance')}
                        </button>
                    </div>
                </div>
            )}
            <Alert />
        </div>
    )
}

export default Attendance;