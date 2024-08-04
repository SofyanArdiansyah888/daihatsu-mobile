import {Form} from "antd";
import {useEffect, useState} from "react";
import {IFormSelectValue} from "../../../components/form/form-select";
import FilterModal from "../../../components/modal/filter-modal";
import FormDate from "../../../components/form/form-date";
import useBerandaStore from "../data/useBerandaStore";

export default function FiterTanggal() {
    const [form] = Form.useForm();
    const {changeFilterPayload, filterPayload} = useBerandaStore();
    const [isOpen, setIsOpen] = useState(false)

    function handleChange(name: string, value: Pick<IFormSelectValue, "value" | "label">) {
        form.setFieldValue(name, value)
    }

    function handleSubmit(value: any) {
        changeFilterPayload({...value})
        setIsOpen(false)
    }

    useEffect(() => {
        form.setFieldsValue({
            dari: filterPayload.dari,
            sampai: filterPayload.sampai,
        })
    }, [filterPayload, form, isOpen]);

    return <FilterModal
        form={form}
        title={"Filter"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={handleSubmit}
        filterText={""}
    >

        <FormDate
            name={"dari"}
            label={"Dari"}
        />
        <FormDate
            name={"sampai"}
            label={"Sampai"}
        />

    </FilterModal>
}