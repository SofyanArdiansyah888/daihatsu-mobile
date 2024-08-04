import {Form, Input, InputNumber} from "antd";
import {RuleObject, RuleRender} from "rc-field-form/lib/interface";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {FormItemLayout} from "antd/es/form/Form";


export interface IFormSelectValue {
    value: string,
    label: string,
    disabled?: boolean
}

interface IFormSelect {
    type?: "number" | "text" | "password",
    name: string | number | (string | number)[],
    label: string,
    value?: string,
    onChange?: any,
    placeholder?: string,
    disabled?: boolean,
    help?: string,
    size?: SizeType,
    rules?: RuleObject[] | RuleRender[],
    layout?: FormItemLayout
}

export default function FormInput({
                                      name,
                                      label,
                                      onChange,
                                      placeholder,
                                      rules,
                                      value,
                                      type = "text",
                                      help,
                                      disabled = false,
                                      size = "middle",
                                      layout = "vertical"
                                  }: IFormSelect) {
    return <Form.Item name={name} label={label} layout={layout} help={help} rules={rules} className={"!capitalize"}>
        {
            type === "number" ?
                <InputNumber
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    parser={(value) => value?.replace(/\./g, "").replace(".", "") as unknown as string}
                    className={"w-full"}
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    size={size}

                /> :
                type === "password" ?
                    <Input.Password onChange={onChange}
                                    placeholder={placeholder}
                                    value={value}
                                    type={type}
                                    disabled={disabled}
                                    size={size}/> :

                    <Input onChange={onChange}
                           size={size}
                           placeholder={placeholder}
                           value={value}
                           type={type}
                           disabled={disabled}
                    />
        }
    </Form.Item>

}
