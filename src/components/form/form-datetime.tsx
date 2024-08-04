import {DatePicker, Form} from "antd";
import {RuleObject, RuleRender} from "rc-field-form/lib/interface";


interface IFormSelect {
    name: string,
    label: string,
    value?: string,
    onChange?: any,
    rules?: RuleObject[] | RuleRender[]
}

export default function FormDatetime({
                                         name,
                                         label,
                                         onChange,
                                         rules,
                                         value
                                     }: IFormSelect) {
    return <Form.Item name={name} label={label} rules={rules} className={"!capitalize"}>
        <DatePicker onChange={onChange}
                    needConfirm
                    showTime value={value}
                    format={['DD/MM/YYYY hh:mm:ss', 'DD/MM/YY hh:mm:ss', 'DD-MM-YYYY hh:mm:ss', 'DD-MM-YY hh:mm:ss']}
                    className={"!w-full"}/>
    </Form.Item>

}
