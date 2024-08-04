import {create} from 'zustand'
import filterReducer, {IFilterReducer} from "../../../lib/reducers/filter-reducer";


export interface ILaporanFilter {
    dari?: string;
    sampai?: string;
}
const useBerandaStore = create<IFilterReducer<ILaporanFilter>>((set) => ({
    ...filterReducer(set)
}))
export default useBerandaStore
