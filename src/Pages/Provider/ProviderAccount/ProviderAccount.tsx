import { Checkbox, Descriptions, DescriptionsProps, Modal } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState } from 'react';
import { UploadFile } from '../../../components/ItemsGroup/UploadFile';
import Buttons from '../../../components/ItemsGroup/Button/Buttons';

const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
};

const petOptions = ['สุนัข', 'แมว'];
const serviceOptions = ['บริการรับฝากเลี้ยง', 'บริการพาสัตว์เลี้ยงเดินเล่น', 'บริการรับ-ส่ง', 'บริการอาบน้ำทำความสะอาด'];

const items: DescriptionsProps['items'] = [
    {
        key: '1',
        label: <h4 className='text-xl font-kanit'>อีเมล</h4>,
        children: <p className='text-xl font-kanit'>xxx@email.com</p>,
    },
    {
        key: '2',
        label: <h4 className='text-xl font-kanit'>ชื่อ-นามสกุล</h4>,
        children: <p className='text-xl font-kanit'>xxx</p>,
    },
    {
        key: '3',
        label: <h4 className='text-xl font-kanit'>เบอร์โทรศัพท์</h4>,
        children: <p className='text-xl font-kanit'>0123456789</p>,
    },
    {
        key: '4',
        label: <h4 className='text-xl font-kanit'>ที่อยู่</h4>,
        children: <p className='text-xl font-kanit'>123 xx 456xxx </p>,
    },
    {
        key: '5',
        label: <h4 className='text-xl font-kanit'>ประเภทสัตว์เลี้ยงของคุณที่ให้บริการ</h4>,
        children: <p className='text-xl font-kanit'></p>,
    },
    {
        key: '6',
        label: <h4 className='text-xl font-kanit'>บริการของคุณ</h4>,
        children: <p className='text-xl font-kanit'></p>,
    },
];

export const ProviderAccount = () => {

    const [previewImage, setPreviewImage] = useState('');
    const [openDelete, setOpenDelete] = useState(false);

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

    return (
        <>
            <div className="h-56 flex justify-start items-center ">
                <div className="flex flex-col ">
                    <img src={previewImage || '#'} alt="" className="bg-slate-200 h-40 w-40 rounded-full mb-5" />
                    <input type="file" id="upload" name="upload" accept="image/*" onChange={handleImageChange} />
                </div>
            </div>
            <Descriptions title={<h3 className='text-3xl font-kanit pt-10'>ข้อมูลบัญชีของคุณ</h3>} items={items} />
            <div className="text-xl flex flex-col gap-5 border-t-2 pt-8">
                ประเภทสัตว์เลี้ยงที่ต้องการให้บริการ <Checkbox.Group options={petOptions} onChange={onChange} />
                <Buttons
                    label="ยืนยัน"
                    className="w-20 p-2 rounded-xl mb-6 text-base"
                    buttonType="secondary"
                    onClick={() => { }}
                />
            </div>
            <div className="text-xl flex flex-col gap-5 border-t-2 pt-8">
                ประเภทบริการที่ต้องการให้บริการ <Checkbox.Group options={serviceOptions} onChange={onChange} />
                <Buttons
                    label="ยืนยัน"
                    className="w-20 p-2 rounded-xl mb-6 text-base"
                    buttonType="secondary"
                    onClick={() => { }}
                />
            </div>
            <div className="text-xl flex flex-col gap-5 border-t-2 pt-8">
                โปรดแนบไฟล์บัตรประชาชนเพื่อยืนยันตัวตน <UploadFile />
                <Buttons
                    label="ยืนยัน"
                    className="w-20 p-2 rounded-xl mb-6 text-base"
                    buttonType="secondary"
                    onClick={() => { }}
                />
            </div>
            <div className="flex justify-center">
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
                        label="ใช่"
                        buttonType="success"
                        className="mt-5 w-1/4 p-2 rounded-full"
                        onClick={() => setOpenDelete(false)}
                    />
                    <Buttons
                        label="ไม่ใช่"
                        buttonType="danger"
                        className="mt-5 w-1/4 p-2 rounded-full"
                        onClick={() => setOpenDelete(false)}
                    />
                </div>
            </Modal>
        </>
    )
}
