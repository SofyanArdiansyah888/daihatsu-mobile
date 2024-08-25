import {create} from 'zustand'
import filterReducer, {IFilterReducer} from "../../../lib/reducers/filter-reducer";
import {IFilterTanggal} from "../../../components/modal/filter-tanggal";
import moment from "moment/moment";


const usePatroliWargaStore = create<IFilterReducer<IFilterTanggal>>((set) => ({

    ...filterReducer(set,{
        dari: moment().format("YYYY-MM-DD"),
        sampai: moment().format("YYYY-MM-DD"),
    })
}))
export default usePatroliWargaStore
