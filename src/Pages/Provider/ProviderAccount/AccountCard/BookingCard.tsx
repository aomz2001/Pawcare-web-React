import { DatePicker, Space } from 'antd';
import { useState } from 'react';
import { RangePickerProps } from 'antd/lib/date-picker';

const { RangePicker } = DatePicker;

const BookingCard = () => {
    const [selectTime, setSelectTime] = useState<RangePickerProps['value']>();

    const handleTimeChange = (value: RangePickerProps['value']) => {
        setSelectTime(value);
    };

    const selectedTimeValues = selectTime?.map(e => e?.toISOString())
    console.log('selectedTimeValues', selectedTimeValues?.[0])
    console.log('selectedTimeValues', selectedTimeValues?.[1])

    const selectedValues = selectTime?.map(date => date ? date.format('YYYY-MM-DD HH:mm') : null) || [];
    console.log('selectTime', selectTime)

    return (
        <>
            <div className="text-xl flex flex-col gap-5  py-4 font-bold">
                <h3 className='font-bold'>กำหนดวันที่ให้บริการและเวลาที่ให้บริการล่วงหน้า</h3>
                <Space direction="vertical" size={12}>
                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        value={selectTime}
                        onChange={handleTimeChange}
                    />
                </Space>
                <div>
                    <h4>วันและเวลาที่คุณเลือก:</h4>
                    <ul>
                        {selectedValues.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default BookingCard;