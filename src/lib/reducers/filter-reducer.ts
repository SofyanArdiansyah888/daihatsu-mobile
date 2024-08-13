export interface IFilterSelect {
    value: string,
    label: string,
    disabled?: boolean
}

export interface IFilterReducer<T> {
    filterPayload: {
        [key: string]: Pick<IFilterSelect, "value" | "label">
    }
    changeFilterPayload: (payload: T) => void,
    resetFilterPayload: () => void,
    deleteFilterPayload: (name: string) => void,
}

export default function filterReducer(set: any,filterPayload?: any) {
    return {
        filterPayload: {},
        ...filterPayload,
        changeFilterPayload: (payload: any) => {
            set(() => ({
                filterPayload: {...payload},
            }))
        },
        resetFilterPayload: () => {
            set(() => ({
                    filterPayload: {}
                }
            ))
        },
        deleteFilterPayload: (name: string) => {
            set((state: any) => ({
                    filterPayload: {
                        ...state.filterPayload,
                        [name]: undefined
                    }
                }
            ))
        }
    }
}
