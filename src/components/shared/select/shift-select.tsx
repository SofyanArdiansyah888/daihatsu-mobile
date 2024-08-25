import {ISelect} from "./iselect";
import FormSelect from "../../form/form-select";
import {useGetList} from "../../../hooks/useApi";
import {ResponseListType} from "../../../lib/interface/response-type";
import ShiftEntity from "../../../entities/shift.entity";


export default function ShiftSelect({
                                        name = "shift",
                                        label = "Shift",
                                        rules,
                                        mode,
                                        tanggal
                                    }: ISelect & {
    tanggal: string
}) {
    const {data, isLoading, refetch} = useGetList<ResponseListType<ShiftEntity[]>>
    ({
        name: 'shift',
        endpoint: "/shift",
        params: {
            // tanggal,
            jenis: 'internal'
        }
    })
    const options = data?.data?.map((item) => {
        return {
            label: item.shift,
            value: item.id
        }
    })
    return <FormSelect
        mode={mode}
        name={name}
        label={label}
        options={options ? options : []}
        rules={rules}
    />
}
