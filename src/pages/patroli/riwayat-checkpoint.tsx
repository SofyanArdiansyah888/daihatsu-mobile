import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import React, {useState} from "react";
import {FloatButton} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons"
import {useHistory, useLocation} from "react-router";
import NavHeader from "../../components/nav-header";
import CheckpointItem from "../../components/item/checkpoint-item";
import RiwayatCheckpointModal from "./component/riwayat-checkpoint-modal";
import useGroupModal from "../../hooks/useGroupModal";
import useURLParams from "../../hooks/useURLParams";
import ShiftEntity from "../../entities/shift.entity";
import {useGetList} from "../../hooks/useApi";
import {ResponseListType} from "../../lib/interface/response-type";
import CheckpointHistoryEntity from "../../entities/checkpoint-history";
import SkeletonLoading from "../../components/skeleton-loading";
import moment from "moment/moment";


export default function CheckpointHistoryPage() {
    const history = useHistory()
    const {groupModal, handleGroupModal} = useGroupModal({
        modal: false,
    })
    const {params, handleParamsChange} = useURLParams({})
    const queryParams = new URLSearchParams(useLocation().search)
    const {data, isLoading, refetch} = useGetList<ResponseListType<CheckpointHistoryEntity[]>>
    ({
        name: 'checkpoint-history',
        endpoint: `/checkpoint-history`,
        params: {
            ...params,
            id_shift: queryParams.get("id_shift"),
            id_checkpoint: queryParams.get("id_checkpoint"),
        }
    })
    const [selectedData, setSelectedData] = useState<ShiftEntity | undefined>()


    function handleBack() {
        history.replace(`/checkpoint?id_shift=${queryParams.get("id_shift")}`)
    }

    function handleItemClick() {

    }

    interface GroupedData {
        [key: string]: CheckpointHistoryEntity[];
    }

    function groupByHour(): { group_hour: string, items: CheckpointHistoryEntity[] }[] {
        const groupedData = data?.data?.reduce((result: GroupedData, item: CheckpointHistoryEntity) => {
            const key = item.group_hour;
            if (!result[key]) {
                result[key] = [];
            }
            result[key].push(item);
            return result;
        }, {} as GroupedData);

        return Object.keys(groupedData || {}).map(key => ({
            group_hour: key,
            items: groupedData![key]
        }));
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
            <NavHeader handleClick={handleBack} title={"Detail Checkpoint"}/>
            <main className={"px-4"}>

                {
                    isLoading ? <SkeletonLoading/> :
                        <section>
                            {
                                groupByHour()?.map((item) =>
                                    <div className={"divide-y-[1px] space-y-2 py-2"}>

                                        <h1 className={"text-xl font-bold"}>{item.group_hour}</h1>
                                        <div className={"divide-y-[1px] space-y-2 py-2"}>
                                            {
                                                item.items.map((detail) =>
                                                    <CheckpointItem
                                                        gambar={`data:image/png;base64,${detail?.gambar}`}
                                                        title={moment(detail.created_at).format("HH:mm:ss")}
                                                        subtitle={detail.catatan}
                                                        handleItemClick={handleItemClick}
                                                    />
                                                )
                                            }
                                        </div>

                                    </div>
                                )
                            }
                        </section>
                }
            </main>

        </IonContent>
        <FloatButton
            icon={<PlusCircleOutlined/>}
            type={"primary"}
            className={"!bottom-[24px]"}
            onClick={() => handleGroupModal('modal', true)}
        />

        <section>
            <RiwayatCheckpointModal
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                isOpen={groupModal.modal}
                handleGroupModal={handleGroupModal}
            />
        </section>
    </IonPage>
}