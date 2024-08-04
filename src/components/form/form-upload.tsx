import {Button, Form, Upload} from "antd";
import {UploadIcon} from "lucide-react";

interface IFormUpload {
    name?: string
    label?: string
}

export default function FormUpload({name, label = "Upload"}: IFormUpload) {
    return <Form.Item
        name={name}
        label={label}
        valuePropName="fileList"
        className={"!capitalize"}
    >
        <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadIcon strokeWidth={1} className={"w-3 h-3"}/>}>Pilih Foto</Button>
        </Upload>
    </Form.Item>
}
