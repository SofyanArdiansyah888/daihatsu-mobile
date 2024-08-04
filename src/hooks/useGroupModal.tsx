import {useState} from "react";

export type IUseGroupModal = {
    [key: string]: boolean;
};
export default function useGroupModal(initialState: IUseGroupModal) {
    const [groupModal, setGroupModal] = useState<IUseGroupModal>(initialState)
    const handleGroupModal = (key: string, value: boolean) => {
        setGroupModal({
            ...groupModal,
            [key]: value
        })
    }
    return {
        handleGroupModal,
        groupModal,
        setGroupModal
    }
}
