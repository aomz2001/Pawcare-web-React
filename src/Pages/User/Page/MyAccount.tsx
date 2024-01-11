import { useRef, useState } from "react";
import { Modal } from 'antd';
import InputForm from "../../../components/ItemsGroup/InputForm";
import Buttons from "../../../components/ItemsGroup/Button/Buttons";


const MyAccount = () => {
    const [previewImage, setPreviewImage] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
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
            <div className="bg-[#FFF8EA]">
                <div className="container h-auto flex justify-center">
                    <div className="w-[700px] h-auto bg-white my-24 rounded-3xl">
                        <div className="p-12">
                            <h3 className="text-lg">โปรไฟล์ของคุณ</h3>
                            <form>
                                <div className="h-auto flex justify-center items-center mb-16">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={previewImage || '#'} alt="" className="bg-slate-200 h-40 w-40 rounded-full mb-5" />
                                        <input type="file" id="upload" name="upload" accept="image/*" className="w-[100px]" onChange={handleImageChange} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-10 text-lg pl-16 mb-16">
                                    <p>email : </p>
                                    <p>ชื่อ : </p>
                                    <p>นามสกุล : </p>
                                    <p>เบอร์โทรศัพท์ : </p>
                                    <p>ที่อยู่ : </p>
                                </div>
                            </form>
                            <div className="flex justify-center gap-3">
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
                        </div>
                    </div>
                </div>
                <Modal
                    title="แก้ไขข้อมูลของคุณ"
                    centered
                    open={openEdit}
                    width={1000}
                    footer={false}
                >
                    <div className="flex flex-col gap-3">
                        <InputForm id="email" label="อีเมล" labelColor="black" placeholder="xxx@email.com" ref={inputRef} />
                        <InputForm id="fname" label="ชื่อ" labelColor="black" placeholder="ชื่อ" ref={inputRef} />
                        <InputForm id="lname" label="นามสกุล" labelColor="black" placeholder="นามสกุล" ref={inputRef} />
                        <InputForm id="phone" label="เบอร์โทรศัพท์" labelColor="black" placeholder="เบอร์โทรศัพท์" ref={inputRef} />
                        <InputForm id="address" label="ที่อยู่" labelColor="black" placeholder="ที่อยู่" ref={inputRef} />
                    </div>
                    <div className="flex justify-center gap-3">
                        <Buttons
                            label="ใช่"
                            buttonType="success"
                            className="mt-5 w-1/4 p-2 rounded-full"
                            onClick={() => setOpenEdit(false)}
                        />
                        <Buttons
                            label="ไม่ใช่"
                            buttonType="danger"
                            className="mt-5 w-1/4 p-2 rounded-full"
                            onClick={() => setOpenEdit(false)}
                        />
                    </div>
                </Modal>
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
            </div>
        </>
    )
}

export default MyAccount