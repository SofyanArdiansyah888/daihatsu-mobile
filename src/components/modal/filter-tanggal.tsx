import {Form} from "antd";
import {useEffect, useState} from "react";
import FilterModal from "./filter-modal";
import FormDate from "../form/form-date";
import {IFilterSelect} from "../../lib/reducers/filter-reducer";

import dayjs from 'dayjs';

export interface IFilterTanggal {
    dari?: string;
    sampai?: string;
}

export default function FilterTanggal({
                                         changeFilterPayload,
                                         filterPayload
                                     }: {
    changeFilterPayload: (payload: IFilterTanggal) => void;
    filterPayload: {
        [key: string]: Pick<IFilterSelect, "value" | "label">
    }

}) {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState(false)


    function handleSubmit(value: any) {
        changeFilterPayload({...value})
        setIsOpen(false)
    }

    useEffect(() => {

        form.setFieldsValue({
            dari: dayjs(filterPayload?.dari?.toString()),
            sampai: dayjs(filterPayload.sampai?.toString()),
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