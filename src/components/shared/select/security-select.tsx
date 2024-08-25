import {ISelect} from "./iselect";
import {useGetList} from "../../../hooks/useApi";
import {ResponseListType} from "../../../lib/interface/response-type";
import FormSelect from "../../form/form-select";
import UserEntity from "../../../entities/user.entity";

export default function SecuritySelect({
                                           name = "user",
                                           label = "user",
                                           rules,
                                           mode,
                                           user,
                                           excludeUser,
                                           disabled
                                       }: ISelect & {
    user?: UserEntity,
    excludeUser?: UserEntity
}) {
    const {data, isLoading, refetch} = useGetList<ResponseListType<UserEntity[]>>
    ({
        name: 'security',
        endpoint: "/user",
        params: {
            role: 'security'
        }
    })
    const options = data?.data
        ?.filter((item) => {
            return excludeUser?.id !== item.id;
        })
        ?.map((item) => {
            return {
                label: item.fullname,
                value: item.id.toString()
            }
        })
    return <FormSelect
        mode={mode}
        name={name}
        label={label}
        options={options ? options : []}
        rules={rules}
        defaultValue={{
            value: user?.id.toString() ?? "",
            label: user?.fullname ?? ""
        }}
        disabled={disabled}
    />
}
