import {Form, Select} from "antd";
import {RuleObject, RuleRender} from "rc-field-form/lib/interface";
import {FormItemLayout} from "antd/es/form/Form";
import {SizeType} from "antd/es/config-provider/SizeContext";


export interface IFormSelectValue {
    value: string,
    label: string,
    disabled?: boolean
}

interface IFormSelect {
    name: string,
    label: string,
    defaultValue?: Pick<IFormSelectValue, "value" | "label">
    value?: Pick<IFormSelectValue, "value" | "label">
    options: IFormSelectValue[]
    onChange?: ((value: Pick<IFormSelectValue, "value" | "label">, option: (IFormSelectValue | IFormSelectValue[])) => void) | undefined,
    mode?: "multiple" | "tags" | undefined,
    placeholder?: string,
    rules?: RuleObject[] | RuleRender[],
    disabled?: boolean,
    size?: SizeType,
    layout?: FormItemLayout
}

export default function FormSelect({
                                       name,
                                       label,
                                       onChange,
                                       defaultValue,
                                       options,
                                       mode,
                                       placeholder,
                                       rules,
                                       value,
                                       disabled,
                                       layout = "vertical",
                                       size = "middle"
                                   }: IFormSelect) {
    return <Form.Item name={name} layout={layout} label={label} rules={rules} className={"!capitalize"}>
        <Select
            showSearch
            value={value}
            key={name}
            mode={mode}
            defaultValue={defaultValue}
            style={{width: "100%"}}
            onChange={onChange}
            options={options}
            allowClear={true}
            placeholder={placeholder}
            labelInValue={true}
            disabled={disabled}
            size={size}
        />
    </Form.Item>

}
