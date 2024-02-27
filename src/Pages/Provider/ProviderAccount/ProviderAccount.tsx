import { Descriptions, Modal } from 'antd';
import { useEffect, useState } from 'react';
import Buttons from '../../../components/ItemsGroup/Button/Buttons';
import axios from 'axios';
import InputForm from '../../../components/ItemsGroup/InputForm';
import ServiceCard from './AccountCard/ServiceCard';

import dayjs from "dayjs"
import "dayjs/locale/th"
import httpClient from '../../../utils/httpClient';

dayjs.locale("th")

interface ProviderData {
    provider: any;
    provider_id: number;
    provider_email: string;
    provider_firstname: string;
    provider_lastname: string;
    provider_phone: string;
    provider_address: string;
    district_id: number;
    district_name: string;
    district?: string;
    pet_id: number;
    pet_name: string;
    pet?: string;
    service: {
        service_id: number;
        service_name: string;
        service_price: number;
        booking_start: string;
        booking_end: string;
    }[];
}

export const ProviderAccount = () => {
    const [providerData, setProviderData] = useState<ProviderData | null>(null);
    const [previewImage, setPreviewImage] = useState('');
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editEmail, setEditEmail] = useState("");
    const [editFirstname, setEditFirstname] = useState("");
    const [editLastname, setEditLastname] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [districtData, setDistrictData] = useState<ProviderData | null>(null);
    const [petData, setPetData] = useState<ProviderData | null>(null);
    const [serviceData, setServiceData] = useState<ProviderData>();


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage('');
        }
    };

    const fetchProviderData = async () => {
        try {
            const token = localStorage.getItem('token');
            const providerId = localStorage.getItem('providerId');

            if (!token || !providerId) {
                console.error("Token or provider_id not found");
                return;
            }

            const { data } = await httpClient.get<ProviderData>(`provider/provider-data`);

            const { data: districtData } = await httpClient.get<ProviderData>(
                `provider/provider-data-district/${providerId}`
            );
            const { data: petData } = await httpClient.get<ProviderData>(
                `provider/provider-data-pet/${providerId}`
            );
            const { data: serviceData } = await httpClient.get<ProviderData>(
                `provider/provider-data-service/${providerId}`
            );
            if (data) {
                setProviderData(data);
                setDistrictData(districtData);
                setPetData(petData);
                setServiceData(serviceData);
            } else {
                alert("ไม่พบข้อมูลผู้ใช้ที่เข้าสู่ระบบ");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchProviderData();
    }, []);

    const updateProviderData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found");
                return;
            }

            const updatedData = {
                provider_email: editEmail || providerData?.provider[0]?.provider_email || '',
                provider_firstname: editFirstname || providerData?.provider[0]?.provider_firstname || '',
                provider_lastname: editLastname || providerData?.provider[0]?.provider_lastname || '',
                provider_phone: editPhone || providerData?.provider[0]?.provider_phone || '',
                provider_address: editAddress || providerData?.provider[0]?.provider_address || '',
            };

            const response = await httpClient.put(`provider/provider-data/${providerData?.provider[0]?.provider_id}`, updatedData);

            if (response.data) {
                console.log("Provider data updated successfully!");
                window.location.reload();
            } else {
                console.error("Failed to update provider data.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteProvider = async (providerId: number): Promise<void> => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("Token not found");
                return;
            }

            const { status } = await httpClient.delete(`provider/provider-data/${providerId}`);

            if (status === 200) {
                console.log("Provider data deleted successfully!");
                setProviderData(null);
                localStorage.removeItem('token');
                window.location.reload();
            } else {
                console.error("Failed to delete provider data.");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("error message: ", error.message);
            } else {
                console.log("unexpected error: ", error);
            }
        }
    };

    const serviceItems = serviceData?.service?.map((serviceItem, index) => (
        <div key={serviceItem?.service_id || index}>
            {serviceItem && serviceItem.service_name && serviceItem.service_price && (
                <div className='flex bg-stone-200 mb-3 p-3 rounded-xl'>
                    {`${serviceItem.service_name}`}<br />
                    {` วันและเวลาที่ให้บริการ : ${dayjs(serviceItem.booking_start).locale("th").format("DD MMMM YYYY [เวลา:] HH:mm")} ถึง ${dayjs(serviceItem.booking_end).locale("th").format("DD MMMM YYYY [เวลา:] HH:mm")} `}<br />
                    {`ราคา : ${serviceItem.service_price} `}
                </div>
            )}
        </div>
    ));

    const items = [
        { label: 'อีเมล', value: providerData?.provider[0]?.provider_email || '' },
        { label: 'ชื่อ-นามสกุล', value: `${providerData?.provider[0]?.provider_firstname} ${providerData?.provider[0]?.provider_lastname}` || '' },
        { label: 'เบอร์โทรศัพท์ (หมายเลย PromptPay)', value: providerData?.provider[0]?.provider_phone || '' },
        { label: 'ที่อยู่', value: providerData?.provider[0]?.provider_address || '' },
        { label: 'อำเภอที่ให้บริการ', value: districtData?.district || '' },
        { label: 'สัตว์เลี้ยงที่ให้บริการ', value: petData?.pet || '' },
        { label: 'บริการ', value: serviceItems },
    ];
    return (
        <>
            {/* <div className="h-56 flex justify-start items-center ">
                <div className="flex flex-col ">
                    <img src={previewImage || '#'} alt="" className="bg-slate-200 h-40 w-40 rounded-full mb-5" />
                    <input type="file" id="upload" name="upload" accept="image/*" onChange={handleImageChange} />
                </div>
            </div> */}
            <Descriptions title={<h3 className='text-3xl font-kanit '>ข้อมูลบัญชีของคุณ</h3>} items={items.map(item => ({
                key: item.label,
                label: <h4 className='text-xl font-kanit'>{item.label}</h4>,
                children: <p className='text-xl font-kanit '>{item.value}</p>,
            }))}
                column={{ xs: 1, sm: 1, md: 1, xl: 2 }}
            />
            <div className="border-b-2"></div>
            <ServiceCard />
            <div className="flex justify-center gap-3 pt-8">
                <Buttons
                    label="แก้ไขข้อมูล"
                    buttonType="edit"
                    className="w-28 p-2 rounded-xl"
                    onClick={() => setOpenEdit(true)}
                />
                <Buttons
                    label="ลบบัญชี"
                    buttonType="danger"
                    className="w-28 p-2 rounded-xl"
                    onClick={() => setOpenDelete(true)}
                />
            </div>
            <Modal
                title="คุณต้องการลบบัญชีใช่หรือไม่"
                centered
                open={openDelete}
                width={500}
                footer={false}
            >
                <div className="flex justify-center gap-3">
                    <Buttons
                        label="ไม่ใช่"
                        buttonType="danger"
                        className="mt-5 w-1/4 p-2 rounded-full"
                        onClick={() => setOpenDelete(false)}
                    />
                    <Buttons
                        label="ใช่"
                        buttonType="success"
                        className="mt-5 w-1/4 p-2 rounded-full"
                        onClick={() => {
                            deleteProvider(providerData?.provider[0]?.provider_id || 0);
                            setOpenDelete(false);
                        }}
                    />
                </div>
            </Modal>
            <Modal
                title="แก้ไขข้อมูลของคุณ"
                centered
                open={openEdit}
                width={1000}
                footer={false}
                onCancel={() => setOpenEdit(false)}
            >
                <div className="flex flex-col gap-3">
                    <InputForm
                        id="email"
                        label="อีเมล"
                        labelColor="black"
                        placeholder={providerData?.provider[0]?.provider_email}
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                    />
                    <InputForm
                        id="fname"
                        label="ชื่อ"
                        labelColor="black"
                        placeholder={providerData?.provider[0]?.provider_firstname}
                        value={editFirstname}
                        onChange={(e) => setEditFirstname(e.target.value)}
                    />
                    <InputForm
                        id="lname"
                        label="นามสกุล"
                        labelColor="black"
                        placeholder={providerData?.provider[0]?.provider_lastname}
                        value={editLastname}
                        onChange={(e) => setEditLastname(e.target.value)}
                    />
                    <InputForm
                        id="phone"
                        label="เบอร์โทรศัพท์"
                        labelColor="black"
                        placeholder={providerData?.provider[0]?.provider_phone}
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                    />
                    <InputForm
                        id="address"
                        label="ที่อยู่"
                        labelColor="black"
                        placeholder={providerData?.provider[0]?.provider_address}
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                    />
                </div>
                <div className="flex justify-center gap-3">
                    <Buttons
                        label="ไม่ใช่"
                        buttonType="danger"
                        className="mt-5 w-1/4 p-2 rounded-full"
                        onClick={() => setOpenEdit(false)}
                    />
                    <Buttons
                        label="ใช่"
                        buttonType="success"
                        className="mt-5 w-1/4 p-2 rounded-full"
                        onClick={() => {
                            updateProviderData();
                            setOpenEdit(false);
                        }}
                    />
                </div>
            </Modal>
        </>
    )
}
