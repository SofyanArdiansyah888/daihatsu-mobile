import {IonContent, IonPage} from "@ionic/react";
import React from "react";
import {Button, FloatButton} from "antd";
import {AimOutlined,CommentOutlined,CustomerServiceOutlined,CameraOutlined,HeatMapOutlined} from "@ant-design/icons"
import {useHistory} from "react-router";
import NavHeader from "../../components/nav-header";


export default function CheckpointPage() {
    const history = useHistory()

    function handleBack() {
        history.replace("/beranda")
    }

    function handleItemClick(){
        history.replace("checkpoint/history")
    }

    return <IonPage>
        <IonContent scrollY={true}>
            <main className={"px-4 py-6 "}>
                <NavHeader handleClick={handleBack} title={"Checkpoint"} />

                <section className={"divide-y-[1px] space-y-2 py-2"}>
                    {
                        [1, 1, 1, 4].map(() =>
                            <div
                                className={"flex justify-between items-center"}
                                onClick={handleItemClick}
                            >
                                <div className={" py-2  rounded-md"}>
                                    <h1 className={"text-sm font-semibold"}>Checkpoint 1</h1>
                                    <p className={"font-light text-xs"}>Gudang lantai 1</p>
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


            </main>
        </IonContent>
        <FloatButton.Group
            trigger={"click"}
            style={{ insetInlineEnd: 24 }}
            icon={<HeatMapOutlined/>}
            type={"primary"}
        >
            <FloatButton type={"primary"} icon={<CameraOutlined />} />
            <FloatButton type={"primary"} icon={<AimOutlined />} />
        </FloatButton.Group>
    </IonPage>
}