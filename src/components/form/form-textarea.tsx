import {Form, Input} from "antd";
import {RuleObject, RuleRender} from "rc-field-form/lib/interface";

const { TextArea } = Input;
export interface IFormSelectValue {
    value: string,
    label: string,
    disabled?: boolean
}

interface IFormSelect {
    name: string,
    label: string,
    value?: string,
    onChange?: any,
    placeholder?: string,
    rules?: RuleObject[] | RuleRender[]
}

export default function FormTextarea({
                                      name,
                                      label,
                                      onChange,
                                      placeholder,
                                      rules,
                                      value
                                  }: IFormSelect) {
    return <Form.Item name={name} label={label} rules={rules} className={"capitalize"}>
        <TextArea rows={4} onChange={onChange} placeholder={placeholder} value={value}/>
    </Form.Item>

}
