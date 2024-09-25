import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import React, {useState} from "react";
import NavHeader from "../../components/nav-header";
import {useGetList} from "../../hooks/useApi";
import {ResponseListType} from "../../lib/interface/response-type";
import SkeletonLoading from "../../components/skeleton-loading";
import FilterTanggal from "../../components/modal/filter-tanggal";
import usePatroliWargaStore from "./data/usePatroliWargaStore";
import JadwalSecurityEntity from "../../entities/jadwal-security";
import moment from "moment";
import RiwayatPatroliModal from "../../components/shared/riwayat-patroli-modal";
import EmptyData from "../../components/empty-data";
import dayjs from "dayjs";


export default function PatroliWargaPage() {
    const {filterPayload, changeFilterPayload} = usePatroliWargaStore()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<JadwalSecurityEntity>()
    const {
        data,
        isLoading,
        refetch
    } = useGetList<ResponseListType<JadwalSecurityEntity[]>>
    ({
        name: 'laporan-patroli',
        endpoint: "/laporan-patroli",
        params: {
            dari: dayjs(filterPayload?.dari?.toString()).format("YYYY-MM-DD"),
            sampai: dayjs(filterPayload?.sampai.toString()).format("YYYY-MM-DD"),
            jenis: 'warga'
        }
    })


    function handleItemClick(item: JadwalSecurityEntity) {
        setSelectedItem(item)
        setIsOpen(true)
    }


    return <IonPage>
        <NavHeader
            title={"Patroli Warga"}
            withBackButton={false}
            icon={<FilterTanggal
                filterPayload={filterPayload}
                changeFilterPayload={changeFilterPayload}
            />}
        />
        <IonContent scrollY={true}>
            <IonRefresher
                slot="fixed"
                onIonRefresh={async (e) => {
                    await refetch();
                    e.detail.complete();
                }}
            >
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>


            <main className={"p-4"}>
                {
                    isLoading ? <SkeletonLoading/> :
                        <section className={" space-y-2"}>
                            <EmptyData
                                data={data?.data}
                                fullscreen={true}
                            />
                            {
                                data?.data?.map((item: JadwalSecurityEntity, index) =>
                                    <div
                                        key={index}
                                        className={" py-2  rounded-md"}
                                        onClick={() => handleItemClick(item)}>
                                        <h1 className={"text-sm font-semibold"}>{item.shift.shift}</h1>
                                        <div className={"flex justify-between"}>
                                            <p className={"font-light text-xs"}>{item.user.fullname}</p>
                                            <p className={"font-light text-xs"}>{moment(item.tanggal_mulai).format("DD MMMM YYYY")}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </section>
                }
            </main>
        </IonContent>
        <RiwayatPatroliModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedItem={selectedItem}
        />

    </IonPage>
}