export interface IItemReducer {
    item: any
    setItem: (key: string, value: any) => void,
}

export default function itemReducer(set: any) {
    return {
        setItem: (value: any) => {
            set(() => ({
                    item: value
                }
            ))
        },
        resetItem: () => {
            set(() => ({
                item: null
            }))
        }

    }
}
