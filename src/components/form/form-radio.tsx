import {Form, Radio} from "antd";
import {RuleObject, RuleRender} from "rc-field-form/lib/interface";

interface IFormRadio {
    name: string | number | (string|number)[],
    radios: string[] | boolean[],
    rules?: RuleObject[] | RuleRender[]
}

export default function FormRadio({name, radios, rules}: IFormRadio) {
    return <Form.Item name={name} rules={rules} className={"!capitalize"}>
        <Radio.Group>
            {
                radios.map((value, index) => <Radio key={index} value={value}/>)
            }
        </Radio.Group>
    </Form.Item>
}
