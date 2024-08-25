import {create} from 'zustand'
import filterReducer, {IFilterReducer} from "../../../lib/reducers/filter-reducer";
import {IFilterTanggal} from "../../../components/modal/filter-tanggal";


const useJadwalStore = create<IFilterReducer<IFilterTanggal>>((set) => ({
    ...filterReducer(set),
}))
export default useJadwalStore
