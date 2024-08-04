import {useState} from "react";

export type IUseParams = {
    [key: string]: string | number | boolean | null | undefined;
};
export default function useURLParams(initialState: IUseParams) {
    const [params, setParams] = useState(initialState);

    // const navigate = useNavigate();

    function handleParamsChange(key: string, value: any) {
        setParams({...params, [key]: value});
        // navigate({ search: (prev) => (value ? { ...prev, [key]: value } : {}) });
    }

    return {
        handleParamsChange,
        params,
        setParams,
    };
}
