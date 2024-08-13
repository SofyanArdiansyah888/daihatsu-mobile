import {create} from 'zustand'
import filterReducer, {IFilterReducer} from "../../../lib/reducers/filter-reducer";
import {IFilterTanggal} from "../../../components/modal/filter-tanggal";


const usePatroliSecurityStore = create<IFilterReducer<IFilterTanggal>>((set) => ({
    ...filterReducer(set)
}))
export default usePatroliSecurityStore
