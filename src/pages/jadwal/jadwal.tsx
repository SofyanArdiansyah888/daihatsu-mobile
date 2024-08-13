import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import React from "react";
import {useHistory, useLocation} from "react-router";
import NavHeader from "../../components/nav-header";
import {useGetList} from "../../hooks/useApi";
import {ResponseListType} from "../../lib/interface/response-type";
import CheckpointEntity from "../../entities/checkpoint.entity";
import useURLParams from "../../hooks/useURLParams";
import SkeletonLoading from "../../components/skeleton-loading";
import {FilterButton} from "../../components/button";
import FilterTanggal from "../../components/modal/filter-tanggal";
import useJadwalStore from "./data/useJadwalStore";


export default function JadwalPage() {
    const history = useHistory()
    const {filterPayload,changeFilterPayload} = useJadwalStore()
    const {params, handleParamsChange} = useURLParams({})
    const queryParams = new URLSearchParams(useLocation().search)
    const {data, isLoading, refetch} = useGetList<ResponseListType<CheckpointEntity[]>>
    ({
        name: 'checkpoint',
        endpoint: "/checkpoint",
        params: {
            ...params,
        }
    })

    function handleBack() {
        history.replace("/beranda")
    }

    function handleItemClick(item: CheckpointEntity) {
        history.replace(`checkpoint-history?id_checkpoint=${item.id}&id_shift=${queryParams.get('id_shift')}`)
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
                handleClick={handleBack}
                title={"Tukar Jadwal"}
                withBackButton={false}
                icon={<FilterTanggal
                    filterPayload={filterPayload}
                    changeFilterPayload={changeFilterPayload}
                />}
            />
            <main className={"px-4"}>
                {
                    isLoading ? <SkeletonLoading/> :
                        <section className={" space-y-2 py-2"}>
                            {
                                data?.data?.map((item: CheckpointEntity) =>
                                    <div
                                        className={"flex justify-between items-center"}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <div className={" py-2  rounded-md"}>
                                            <h1 className={"text-sm font-semibold"}>{item?.checkpoint}</h1>
                                            <p className={"font-light text-xs"}>{item?.deskripsi}</p>
                                        </div>

                                    </div>
                                )
                            }
                        </section>
                }
            </main>
        </IonContent>

    </IonPage>
}