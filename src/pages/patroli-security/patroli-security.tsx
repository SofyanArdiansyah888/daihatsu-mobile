import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import React, {useState} from "react";
import NavHeader from "../../components/nav-header";
import {useGetList} from "../../hooks/useApi";
import {ResponseListType} from "../../lib/interface/response-type";
import SkeletonLoading from "../../components/skeleton-loading";
import FilterTanggal from "../../components/modal/filter-tanggal";
import JadwalSecurityEntity from "../../entities/jadwal-security";
import moment from "moment";
import RiwayatPatroliModal from "../../components/shared/riwayat-patroli-modal";
import usePatroliSecurityStore from "./data/usePatroliSecurityStore";
import EmptyData from "../../components/empty-data";


export default function PatroliSecurityPage() {
    const {filterPayload, changeFilterPayload} = usePatroliSecurityStore()
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
            dari: filterPayload.dari,
            sampai: filterPayload.sampai,
        }
    })

    function handleItemClick(item: JadwalSecurityEntity) {
        setSelectedItem(item)
        setIsOpen(true)
    }


    return <IonPage>
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

            <NavHeader
                title={"Patroli Security"}
                withBackButton={false}
                icon={<FilterTanggal
                    filterPayload={filterPayload}
                    changeFilterPayload={changeFilterPayload}
                />}
            />
            <main className={"p-4"}>
                {
                    isLoading ? <SkeletonLoading/> :
                        <section className={"space-y-2"}>
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
                                            <p className={"font-light text-xs"}>{moment(item.tanggal).format("DD MMMM YYYY")}</p>
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