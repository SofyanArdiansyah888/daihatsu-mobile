import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import React from "react";
import {Button, FloatButton} from "antd";
import {AimOutlined, CameraOutlined, HeatMapOutlined} from "@ant-design/icons"
import {useHistory, useLocation} from "react-router";
import NavHeader from "../../components/nav-header";
import {useGetList} from "../../hooks/useApi";
import {ResponseListType} from "../../lib/interface/response-type";
import CheckpointEntity from "../../entities/checkpoint.entity";
import useURLParams from "../../hooks/useURLParams";
import SkeletonLoading from "../../components/skeleton-loading";


export default function CheckpointPage() {
    const history = useHistory()
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

    function handleMapClick() {

    }

    function handleCameraClick() {

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
            </main>
        </IonContent>
        <FloatButton.Group
            trigger={"click"}
            style={{insetInlineEnd: 24}}
            icon={<HeatMapOutlined/>}
            type={"primary"}
        >
            <FloatButton
                type={"primary"}
                icon={<CameraOutlined/>}
                onClick={handleCameraClick}
            />
            <FloatButton
                type={"primary"}
                icon={<AimOutlined/>}
                onClick={handleMapClick}
            />
        </FloatButton.Group>
    </IonPage>
}