import {Button, FloatButton} from "antd";
import {useHistory} from "react-router";
import {useGetList} from "../../hooks/useApi";
import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import NavHeader from "../../components/nav-header";
import React, {useState} from "react";
import SkeletonLoading from "../../components/skeleton-loading";
import CheckpointEntity from "../../entities/checkpoint.entity";
import {AimOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {ResponseListType} from "../../lib/interface/response-type";
import CheckpointModal from "./component/checkpoint-modal";

export default function CheckpointPage() {
    const history = useHistory()
    const [modal, setModal] = useState(false);
    const {data, isFetching, refetch} = useGetList<ResponseListType<CheckpointEntity[]>>
    ({
        name: 'checkpoint',
        endpoint: `/checkpoint`,
        params: {}
    })
    const [selectedData, setSelectedData] = useState<CheckpointEntity | undefined>()

    function handleBack() {
        history.replace(`/profil`)
    }

    function handleItemClick(item: CheckpointEntity) {
        setSelectedData(item)
        setModal(true)
    }

    function handleAddClick(){
        setModal(true)
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
            <NavHeader handleClick={handleBack} title={"Checkpoint"}/>
            <main className={"px-4 "}>
                {
                    isFetching ? <SkeletonLoading/> :
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
                                        <div>
                                            <Button
                                                icon={<AimOutlined/>}
                                                type={"primary"}
                                                size={"middle"}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </section>
                }
                <FloatButton
                    type={"primary"}
                    icon={<PlusCircleOutlined/>}
                    onClick={handleAddClick}
                />

            </main>
        </IonContent>

        <CheckpointModal
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            isOpen={modal}
            setIsOpen={setModal}
        />
    </IonPage>
}