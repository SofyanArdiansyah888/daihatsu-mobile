import React, {useEffect, useState} from "react";
import FiterTanggal from "./filter-tanggal";
import useBerandaStore from "../data/useBerandaStore";
import RiwayatPatroliModal from "./riwayat-patroli-modal";

export default function RiwayatPatroli() {
    const {filterPayload} = useBerandaStore()
    const [isOpen,setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState()
    function handleClickItem(data:any){
        setSelectedItem(data)
        setIsOpen(true)
    }

    useEffect(() => {
        if(!isOpen){
            setSelectedItem(undefined)
        }
    }, [isOpen]);
    return <section className={"space-y-2 mt-8"}>
        <div className={"flex justify-between"}>
            <h1 className={"font-bold text-md"}>Riwayat Patroli</h1>
            <FiterTanggal/>
        </div>
        <div className={"divide-y-[1px]"}>
            {
                [1, 1, 1, 4, 5, 6, 7, 1, 1, 1, 1, 1].map((data,index) =>
                    <div
                        key={index}
                        className={" py-2  rounded-md"}
                        onClick={() => handleClickItem(data)}>
                        <h1 className={"text-sm font-semibold"}>Shift 1</h1>
                        <div className={"flex justify-between"}>
                            <p className={"font-light text-xs"}>Abdul Muis</p>
                            <p className={"font-light text-xs"}>28 April 2024</p>
                        </div>
                    </div>
                )
            }
        </div>

        <RiwayatPatroliModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedItem={selectedItem}
        />

    </section>
}