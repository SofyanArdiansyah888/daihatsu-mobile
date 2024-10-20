import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import React, {ReactNode, useEffect, useState} from "react";
import {Button, FloatButton, message} from "antd";
import {AimOutlined, CameraOutlined,HeatMapOutlined} from "@ant-design/icons"
import {useHistory, useLocation} from "react-router";
import NavHeader from "../../components/nav-header";
import {useGetList} from "../../hooks/useApi";
import {ResponseListType} from "../../lib/interface/response-type";
import CheckpointEntity from "../../entities/checkpoint.entity";
import useURLParams from "../../hooks/useURLParams";
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {distanceInMeters} from "../../lib/calculate-distance";
import SkeletonLoading from "../../components/skeleton-loading";
import EmptyData from "../../components/empty-data";
import {Geolocation} from "@capacitor/geolocation";
import {useAuth} from "../../providers/auth-provider";
import { App } from '@capacitor/app';
// export default function CheckpointPatroliPage() {
//     const history = useHistory()
//     const {params, handleParamsChange} = useURLParams({})
//     const queryParams = new URLSearchParams(useLocation().search)
//     const [scanActive, setScanActive] = useState(false)
//     const [items, setItems] = useState<CheckpointEntity[]>([])
//     const {data: checkpointData, isLoading, refetch} = useGetList<ResponseListType<CheckpointEntity[]>>
//     ({
//         name: 'checkpoint',
//         endpoint: "/checkpoint",
//         params: {
//             ...params,
//         }
//     })
//
//     function handleBack() {
//         history.replace("/beranda")
//     }
//
//     async function handleCameraClick() {
//         // Check camera permission
//         // This is just a simple example, check out the better checks below
//         await BarcodeScanner.checkPermission({force: true});
//         setScanActive(true)
//
//         const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
//
//         // if the result has content
//         if (result.hasContent) {
//             try {
//                 const content = JSON.parse(result.content)
//                 setItems(checkpointData?.data?.filter(item => item.id === content?.id) ?? []);
//             } catch (error) {
//                 message.error("Qr Code tidak valid")
//                 setItems([])
//             }
//         }
//         await BarcodeScanner.stopScan();
//         setScanActive(false)
//     }
//
//     return <IonPage>
//         <NavHeader handleClick={handleBack} title={"Checkpoint Patroli"}/>
//         <IonContent scrollY={true}>
//             <IonRefresher
//                 slot="fixed"
//                 onIonRefresh={async (e) => {
//                     await refetch();
//                     e.detail.complete();
//                 }}
//             >
//                 <IonRefresherContent></IonRefresherContent>
//             </IonRefresher>
//
//
//             <main className={"p-4 grid grid-cols-2 gap-4"}>
//                 <CheckpointPatroliCard
//                     icon={<CameraOutlined className={"text-5xl text-red-500"}/>}
//                     handleClick={handleCameraClick}
//                 />
//                 <CheckpointPatroliCard
//                     icon={<AimOutlined className={"text-5xl text-red-500"}/>}
//                     handleClick={() => {
//                         history.push('checkpoint-patroli-map')
//                     }}
//                 />
//             </main>
//         </IonContent>
//     </IonPage>
// }
//
// function CheckpointPatroliCard({icon, handleClick}: { icon: ReactNode, handleClick: () => void }) {
//     return <div
//         className={"p-2 rounded-md bg-slate-100 h-[150px] text-center flex items-center justify-center"}
//         onClick={handleClick}
//     >
//         {icon}
//     </div>
// }

export default function CheckpointPatroliPage() {
    const history = useHistory()
    const {params, handleParamsChange} = useURLParams({})
    const queryParams = new URLSearchParams(useLocation().search)
    const [items, setItems] = useState<CheckpointEntity[]>([])
    const [scanActive, setScanActive] = useState(false)
    const [distance, setDistance] = useState(0)
    const {user} = useAuth()

    // JIKA USER WARGA MAKA TIDAK BOLEH AKSES JENIS CHECKPOINT INTERNAL
    const {data: checkpointData, isLoading, refetch} = useGetList<ResponseListType<CheckpointEntity[]>>
    ({
        name: 'checkpoint',
        endpoint: "/checkpoint",
        params: {
            ...params,
        }
    })
    function filterCheckpoint(){
        if(user?.role === 'warga')
        return checkpointData?.data?.filter((item) => item?.jenis == 'external')
        return checkpointData?.data;
    }

    const [myPosition, setMyPosition] = useState({
        latitude: 0,
        longitude: 0
    })


    function handleBack() {
        history.replace("/beranda")
    }

    function handleItemClick(item: CheckpointEntity) {
        if(user?.role === 'warga' && item.jenis == 'internal'){
            message.error('User anda tidak bisa mengakses checkpoint internal')
            return;
        }
        history.push(`riwayat-patroli?id_checkpoint=${item.id}&id_shift=${queryParams.get('id_shift')}&checkpoint=${item?.checkpoint}`)
    }

    async function handleCameraClick() {
        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({force: true});
        setScanActive(true)

        // await BarcodeScanner.hideBackground()
        const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

        // if the result has content
        if (result.hasContent) {
            await BarcodeScanner.pauseScanning();
            setScanActive(false)
            try {
                const content = JSON.parse(result?.content)
                if(user?.role === 'warga' && content?.jenis == 'internal'){
                    message.error('User anda tidak bisa mengakses checkpoint internal')
                    return;
                }
                history.push(`riwayat-patroli?id_checkpoint=${content?.id}&id_shift=${queryParams.get('id_shift')}&checkpoint=${content?.checkpoint}`)
            } catch (error) {
                message.error("Qr Code tidak valid")
            }
        }

    }



    useEffect(() => {
        (async() => {
            await Geolocation.requestPermissions()
            await Geolocation.watchPosition(
                {
                    enableHighAccuracy: true,
                },
                (data) => {
                    if (data) {
                        const {latitude, longitude} = data.coords;
                        setMyPosition({latitude,longitude})
                    }
                }
            );


        })()

    }, []);

    useEffect(() => {
        const newItems = filterCheckpoint()?.filter((item) => {
            const distance = distanceInMeters(
                myPosition.latitude,
                myPosition.longitude,
                item.latitude ?? 0,
                item.longitude ?? 0
            );
            return distance <= item.radius
        })
        setItems(newItems ?? [])
    }, [myPosition]);



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
        <NavHeader handleClick={handleBack} title={"Checkpoint Patroli"}/>
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
        <FloatButton
            type={"primary"}
            icon={<CameraOutlined/>}
            onClick={handleCameraClick}
        />
        {/*<FloatButton.Group*/}
        {/*    trigger={"click"}*/}
        {/*    style={{insetInlineEnd: 24}}*/}
        {/*    icon={<HeatMapOutlined/>}*/}
        {/*    type={"primary"}*/}
        {/*>*/}
        {/*    <FloatButton*/}
        {/*        type={"primary"}*/}
        {/*        icon={<CameraOutlined/>}*/}
        {/*        onClick={handleCameraClick}*/}
        {/*    />*/}
        {/*    <FloatButton*/}
        {/*        type={"primary"}*/}
        {/*        icon={<AimOutlined/>}*/}
        {/*        onClick={handleLocationClick}*/}
        {/*    />*/}
        {/*</FloatButton.Group>*/}

    </IonPage>
}