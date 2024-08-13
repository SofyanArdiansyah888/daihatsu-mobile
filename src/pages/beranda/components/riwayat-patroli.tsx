import React, {useEffect, useState} from "react";
import RiwayatPatroliModal from "../../../components/shared/riwayat-patroli-modal";
import JadwalSecurityEntity from "../../../entities/jadwal-security";
import moment from "moment/moment";
import SkeletonLoading from "../../../components/skeleton-loading";

export default function RiwayatPatroli({isLoading, data, title}: {
    isLoading: boolean,
    data: JadwalSecurityEntity[] | undefined,
    title: string

}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<JadwalSecurityEntity>()

    function handleClickItem(data: JadwalSecurityEntity) {
        setSelectedItem(data)
        setIsOpen(true)
    }

    useEffect(() => {
        if (!isOpen) {
            setSelectedItem(undefined)
        }
    }, [isOpen]);
    return <section className={"space-y-2"}>


        <div className={"flex justify-between"}>
            <h1 className={"font-semibold text-md capitalize"}>{title}</h1>
        </div>
        <hr className={"border-[1px] rounded-full border-red-500"}/>

        {
            isLoading ? <SkeletonLoading/> :
                <div className={""}>
                    {
                        data?.map((item, index) =>
                            <div
                                key={index}
                                className={" py-2  rounded-md"}
                                onClick={() => handleClickItem(item)}>
                                <h1 className={"text-sm font-semibold"}>{item.shift.shift}</h1>
                                <div className={"flex justify-between"}>
                                    <p className={"font-light text-xs"}>{item.user.fullname}</p>
                                    <p className={"font-light text-xs"}>{moment(item.tanggal).format("DD MMMM YYYY")}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
        }


        <RiwayatPatroliModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedItem={selectedItem}
        />

    </section>
}