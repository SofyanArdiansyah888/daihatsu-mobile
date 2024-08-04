import {DatePicker, Form, TimePicker} from "antd";
import {RuleObject, RuleRender} from "rc-field-form/lib/interface";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {FormItemLayout} from "antd/es/form/Form";
import {Dayjs} from "dayjs";


interface IFormSelect {
    name: string,
    label: string,
    value?: Dayjs,
    onChange?: ((date: Dayjs, dateString: (string | string[])) => void) | undefined,
    type?: "time",
    showTime?: boolean,
    rules?: RuleObject[] | RuleRender[],
    disabled?: boolean,
    size?: SizeType,
    layout?: FormItemLayout
}

export default function FormTime({
                                     name,
                                     label,
                                     onChange,
                                     rules,
                                     value,
                                     disabled = false,
                                     size = "middle",
                                     layout = "vertical"
                                 }: IFormSelect) {
    return <Form.Item name={name} layout={layout} label={label} rules={rules} className={"!capitalize"}>
        <TimePicker
            onChange={onChange}
            value={value}
            format="HH:mm"
            placeholder={""}
            disabled={disabled}
            size={size}
            className={"!w-full"}/>
    </Form.Item>
}



