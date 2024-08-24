import {ISelect} from "./iselect";
import {useGetList} from "../../../hooks/useApi";
import {ResponseListType} from "../../../lib/interface/response-type";
import FormSelect from "../../form/form-select";
import JadwalSecurityEntity from "../../../entities/jadwal-security";

export default function JadwalSelect({
                                         name = "shift",
                                         label = "Shift",
                                         rules,
                                         mode,
                                         tanggal,
                                         id_user,
                                         disabled = false
                                     }: ISelect & { tanggal: string, id_user: string }) {
    console.log("TANGGAL JADWAL:", tanggal)
    const {data, isFetching} = useGetList<ResponseListType<JadwalSecurityEntity[]>>
    ({
        name,
        endpoint: "/jadwal-security",
        params: {
            tanggal_mulai: tanggal,
            id_user
        }
    })
    const options = data?.data?.map((item) => {
        return {
            label: item.shift.shift,
            value: item.id.toString()
        }
    })
    return <FormSelect
        mode={mode}
        name={name}
        label={label}
        options={options ? options : []}
        rules={rules}
        loading={isFetching}
        disabled={disabled}
    />
}
