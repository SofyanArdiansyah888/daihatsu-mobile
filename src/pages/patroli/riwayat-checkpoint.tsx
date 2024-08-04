import {IonContent, IonPage} from "@ionic/react";
import React, {useState} from "react";
import {Button, FloatButton, Image} from "antd";
import {DeleteOutlined, PlusCircleOutlined} from "@ant-design/icons"
import {useHistory} from "react-router";
import NavHeader from "../../components/nav-header";
import CheckpointItem from "../../components/item/checkpoint-item";
import RiwayatCheckpointModal from "./component/riwayat-checkpoint-modal";
import useGroupModal from "../../hooks/useGroupModal";
import useURLParams from "../../hooks/useURLParams";
import ShiftEntity from "../../entities/shift.entity";


export default function CheckpointHistoryPage() {
    const history = useHistory()
    const {groupModal, handleGroupModal} = useGroupModal({
        modal: false,
    })
    const {params, handleParamsChange} = useURLParams({})
    const [selectedData, setSelectedData] = useState<ShiftEntity | undefined>()


    function handleBack() {
        history.replace("/patroli/checkpoint")
    }

    function handleItemClick() {

    }

    return <IonPage>
        <IonContent scrollY={true}>
            <main className={"px-4 py-6 "}>
                <NavHeader handleClick={handleBack} title={"Checkpoint 2"}/>
                {
                    [1, 1, 1, 4].map(() =>
                        <div className={"divide-y-[1px] space-y-2 py-2"}>

                            <h1 className={"text-xl font-bold"}>12:00</h1>
                            <div className={"divide-y-[1px] space-y-2 py-2"}>
                                {
                                    [1, 1, 1, 4].map(() =>
                                        <CheckpointItem handleItemClick={handleItemClick}/>
                                    )
                                }
                            </div>

                        </div>
                    )
                }
            </main>

        </IonContent>
        <FloatButton
            icon={<PlusCircleOutlined/>}
            type={"primary"}
            className={"!bottom-[24px]"}
            onClick={() => handleGroupModal('modal',true)}
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