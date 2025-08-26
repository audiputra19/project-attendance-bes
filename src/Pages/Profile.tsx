import { ArrowLeft, BookHeart, BriefcaseBusiness, Mail, MapPinHouse, Phone } from "lucide-react";
import moment from "moment";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { usePostProfileMutation } from "../services/apiProfile";
import { useAppSelector } from "../store";

const formatPhoneNumber = (phoneNumber: string | undefined) => {
    let cleaned = ('' + phoneNumber).replace(/\D/g, '');

    if(cleaned.length === 11) {
        return cleaned.slice(0, 4) + '-' + cleaned.slice(4, 7) + '-' + cleaned.slice(7);
    } else {
        return cleaned.match(/.{1,4}/g)?.join('-') || phoneNumber
    }
}

const Profile: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [profile, {data, isLoading}] = usePostProfileMutation();
    const userData = useAppSelector(state => state.auth.userInfo);
    const profileData = data?.data;
    const nameParts = profileData?.nama?.split(" ");
    const username = nameParts?.slice(0, 2).join(' ');
    const phone = formatPhoneNumber(profileData?.nohp);
    const joinDate = moment(profileData?.tgl_masuk).format('DD MMM YYYY');

    useEffect(() => {
        profile({ nik: userData?.nik });
    }, [profile, userData?.nik]);

    console.log(profileData?.status)
    const status = (profileData?.status === 1) ? 'Sudah Menikah' : 'Belum Menikah';
    
    const urlImage = "https://cdn3d.iconscout.com/3d/premium/thumb/office-boy-3d-icon-download-in-png-blend-fbx-gltf-file-formats--employee-male-man-businessman-avatar-pack-avatars-icons-6431786.png";

    return (
        <div className="min-h-screen bg-white dark:bg-dark-main">
            <div className="sticky z-20 top-0 left-0 right-0 bg-white flex justify-between items-center p-5 md:mx-20 lg:mx-48 lg:border-b-2 lg:border-gray-200 dark:border-dark-second dark:bg-dark-main">
                <div
                    className="bg-gray-100 p-3 rounded-xl cursor-pointer text-black dark:text-white dark:bg-dark-second"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft/>
                </div>
                <div className="hidden lg:block">
                    <p className="text-xl font-bold text-black dark:text-white">{t('profile')}
                        <span className="text-color-base pl-1 text-4xl">.</span>
                    </p>
                </div>
                <div></div>
            </div>
            <div className="p-5 sm:mx-12 md:mx-32 lg:mx-80">
                <div className="flex items-center gap-5">
                    <div>
                        {isLoading ? (
                            <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                        ) : (
                            <img
                                src={urlImage}
                                alt={profileData?.nama}
                                className="w-20 h-20 rounded-full object-cover bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100"
                            />
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        {isLoading ? (
                            <div className="flex flex-col gap-2">
                                <div className="w-[180px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                                <div className="w-[100px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg text-gray-700 font-bold dark:text-white">{username}</p>
                                <p className="text-sm font-semibold text-gray-400">{t('employee')}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="py-3 border-y border-gray-200 dark:border-dark-second my-5">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col items-center gap-1 w-full">
                            {isLoading ? (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-[100px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                                    <div className="w-[80px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-1">
                                    <p className="font-semibold text-gray-700 dark:text-white">{profileData?.divisi}</p>
                                    <p className="text-xs font-semibold text-gray-400">{t('division')}</p>
                                </div>
                            )}
                        </div>
                        <div className="h-16 w-0.5 bg-gray-200 mx-4 dark:bg-dark-second"></div>
                        <div className="flex flex-col items-center gap-1 w-full">
                            {isLoading ? (
                                <div className="flex flex-col items-center gap-2 w-full">
                                    <div className="w-[100px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                                    <div className="w-[80px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-1">
                                    <p className="font-semibold text-gray-700 dark:text-white">{joinDate}</p>
                                    <p className="text-xs font-semibold text-gray-400">{t('joinDate')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                <div 
                        className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center p-2" 
                    >
                        <div className="flex justify-center text-gray-600 dark:text-white">
                            {isLoading ? (
                                <div className="w-[50px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            ) : (
                                <Phone size={20}/>
                            )}
                        </div>
                        <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12">
                            {isLoading ? (
                                <div className="w-[150px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">{phone}</p>
                            )}
                        </div>
                    </div>
                    <div 
                        className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center p-2" 
                    >
                        <div className="flex justify-center text-gray-600 dark:text-white">
                            {isLoading ? (
                                <div className="w-[50px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            ) : (
                                <Mail size={20}/>
                            )}
                        </div>
                        <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12">
                            {isLoading ? (
                                <div className="w-[180px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">{profileData?.email}</p>
                            )}
                        </div>
                    </div>
                    <div 
                        className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center p-2" 
                    >
                        <div className="flex justify-center text-gray-600 dark:text-white">
                            {isLoading ? (
                                <div className="w-[50px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            ) : (
                                <MapPinHouse size={20}/>
                            )}
                        </div>
                        <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12">
                            {isLoading ? (
                                <div className="w-[150px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">{profileData?.alamat}</p>
                            )}
                        </div>
                    </div>
                    <div 
                        className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center p-2" 
                    >
                        <div className="flex justify-center text-gray-600 dark:text-white">
                            {isLoading ? (
                                <div className="w-[50px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            ) : (
                                <BriefcaseBusiness size={20}/>
                            )}
                        </div>
                        <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12">
                            {isLoading ? (
                                <div className="w-[180px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">{profileData?.st_kerja}</p>
                            )}
                        </div>
                    </div>
                    <div 
                        className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-12 gap-4 items-center p-2" 
                    >
                        <div className="flex justify-center text-gray-600 dark:text-white">
                            {isLoading ? (
                                <div className="w-[50px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            ) : (
                                <BookHeart size={20}/>
                            )}
                        </div>
                        <div className="col-start-2 col-span-6 sm:col-start-2 sm:col-span-10 lg:col-start-2 lg:col-span-12">
                            {isLoading ? (
                                <div className="w-[180px] h-5 bg-gray-300 animate-pulse rounded-xl dark:bg-gray-600"></div>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">{status}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Profile;