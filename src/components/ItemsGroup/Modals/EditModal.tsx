import React from 'react'
import InputForm from '../InputForm';
import Buttons from '../Button/Buttons';

interface EditModalProps {
    editName: string;
    setEditName: React.Dispatch<React.SetStateAction<string>>;
    handleSaveEdit: () => void;
    closeEditModal: () => void;
}

const EditModal = ({ editName, setEditName, handleSaveEdit, closeEditModal }: EditModalProps) => {
    return (
        <>
            <div className='flex flex-col gap-5'>
                <div className="">
                    <InputForm
                        type='text'
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                </div>
                <div className="flex justify-center gap-5">
                    <Buttons
                        label="ยืนยัน"
                        buttonType="success"
                        className="px-5 py-2 rounded-xl"
                        onClick={handleSaveEdit}
                    />
                    <Buttons
                        label="ยกเลิก"
                        buttonType="danger"
                        className="px-5 rounded-xl"
                        onClick={closeEditModal}
                    />
                </div>
            </div>
        </>
    )
}

export default EditModal
