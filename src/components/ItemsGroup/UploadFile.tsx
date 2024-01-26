import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { useState } from 'react';


export const UploadFile = () => {
    const [fileList, setFileList] = useState<any[]>([]);
    const props: UploadProps = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                console.log('info.file', info.file)
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
                console.log('info.file', info.file)
            }
            setFileList(info.fileList);
        },
    };
    console.log('fileList', fileList)
    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />} >Click to Upload</Button>
        </Upload>
    )
}
