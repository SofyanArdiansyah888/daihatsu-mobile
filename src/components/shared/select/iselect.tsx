import {RuleObject, RuleRender} from "rc-field-form/lib/interface";

export interface ISelect {
    name?: string
    label?: string
    options?: { label: string, value: string }[]
    rules?: RuleObject[] | RuleRender[],
    mode?: "multiple" | "tags" | undefined,
    disabled?: boolean
}