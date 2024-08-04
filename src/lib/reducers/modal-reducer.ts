export interface IModalReducer {
    modal: {
        [key: string]: boolean
    }
    setModal: (key: string, value: boolean) => void,
}

export default function modalReducer(set: any) {
    return {
        setModal: (key: string, value: boolean) => {
            set((state: any) => ({
                    modal: {
                        ...state.modal,
                        [key]: value
                    }
                }
            ))
        },

    }
}
