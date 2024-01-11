import  { useState } from 'react';
import { Space, Rate } from 'antd';

const desc = ['1 คะแนน', '2 คะแนน', '3 คะแนน', '4 คะแนน', '5 คะแนน'];

function Rating() {
    const [value, setValue] = useState(1);

    return (
        <Space>
            <Rate tooltips={desc} onChange={setValue} value={value} />
            {value ? <span>{desc[value - 1]}</span> : ''}
        </Space>
    );
}

export default Rating;