import {DatePicker, Form} from "antd";
import {RuleObject, RuleRender} from "rc-field-form/lib/interface";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {FormItemLayout} from "antd/es/form/Form";


interface IFormSelect {
    name: string,
    label: string,
    value?: string,
    onChange?: ((date: string, dateString: (string | string[])) => void) | undefined,
    type?: "date" | "time" | "week" | "month" | "quarter" | "year",
    showTime?: boolean,
    rules?: RuleObject[] | RuleRender[],
    disabled?: boolean,
    size?: SizeType,
    layout?: FormItemLayout
}

export default function FormDate({
                                     name,
                                     label,
                                     onChange,
                                     rules,
                                     type = "date",
                                     value,
                                     showTime = false,
                                     disabled = false,
                                     size = "middle",
                                     layout = "vertical"
                                 }: IFormSelect) {
    function getFormat() {
        let format: string[];
        switch (type) {
            case "time":
                format = ["hh:mm:ss"]
                break;
            case "month":
                format = ['MM-YYYY']
                break;
            default:
                format = ['DD MMMM YYYY'];
                break;
        }
        return format;
    }

    return <Form.Item name={name} layout={layout} label={label} rules={rules} className={"!capitalize"}>
        <DatePicker
            showTime={showTime}
            picker={type}
            onChange={onChange}
            value={value}
            format={getFormat()}
            placeholder={""}
            disabled={disabled}
            size={size}
            className={"!w-full"}/>
    </Form.Item>
}
