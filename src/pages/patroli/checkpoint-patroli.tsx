import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {Button, FloatButton, message} from "antd";
import {AimOutlined, CameraOutlined, HeatMapOutlined} from "@ant-design/icons"
import {useHistory, useLocation} from "react-router";
import NavHeader from "../../components/nav-header";
import {useGetList} from "../../hooks/useApi";
import {ResponseListType} from "../../lib/interface/response-type";
import CheckpointEntity from "../../entities/checkpoint.entity";
import useURLParams from "../../hooks/useURLParams";
import SkeletonLoading from "../../components/skeleton-loading";
import EmptyData from "../../components/empty-data";
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {distanceInMeters} from "../../lib/calculate-distance";
import {Geolocation} from '@capacitor/geolocation';

export default function CheckpointPatroliPage() {
    const history = useHistory()
    const {params, handleParamsChange} = useURLParams({})
    const queryParams = new URLSearchParams(useLocation().search)
    const [items, setItems] = useState<CheckpointEntity[]>([])
    const [scanActive, setScanActive] = useState(false)
    const [distance, setDistance] = useState(0)
    const {data: checkpointData, isLoading, refetch} = useGetList<ResponseListType<CheckpointEntity[]>>
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
        history.replace(`riwayat-patroli?id_checkpoint=${item.id}&id_shift=${queryParams.get('id_shift')}`)
    }

    async function handleCameraClick() {
        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({force: true});
        setScanActive(true)

        const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

        // if the result has content
        if (result.hasContent) {
            try {
                const content = JSON.parse(result.content)
                setItems(checkpointData?.data?.filter(item => item.id === content?.id) ?? []);
            } catch (error) {
                message.error("Qr Code tidak valid")
                setItems([])
            }
        }
        await BarcodeScanner.stopScan();
        setScanActive(false)
    }

    async function handleLocationClick() {
        await Geolocation.requestPermissions()
        await Geolocation.watchPosition(
            {
                enableHighAccuracy: true,
            },
            (data) => {
                if (data) {
                    const {latitude, longitude} = data.coords;
                    const newItems = checkpointData?.data?.filter((item) => {
                        const distance = distanceInMeters(
                            latitude,
                            longitude,
                            item.latitude ?? 0,
                            item.longitude ?? 0
                        );
                        return distance <= item.radius
                    })
                    setItems(newItems ?? [])
                }
            }
        );
    }

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (scanActive) {
            // Set styles directly on the <html> tag
            htmlElement.style.backgroundColor = 'transparent';
            htmlElement.style.display = "none";
            return
        }
        htmlElement.style.backgroundColor = '';
        htmlElement.style.display = ""
    }, [scanActive]);


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

            <NavHeader handleClick={handleBack} title={"Checkpoint Patroli"}/>
            <main className={"p-4"}>
                {
                    isLoading ? <SkeletonLoading/> :
                        <section className={" space-y-2"}>
                            <EmptyData data={items} fullscreen={true}/>
                            {
                                items?.map((item: CheckpointEntity) =>
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
                onClick={handleLocationClick}
            />
        </FloatButton.Group>

    </IonPage>
}