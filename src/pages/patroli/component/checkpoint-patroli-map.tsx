import {ResponseListType} from "../../../lib/interface/response-type";
import {useGetList} from "../../../hooks/useApi";
import CheckpointEntity from "../../../entities/checkpoint.entity";
import React, {useEffect, useRef, useState} from "react";
import {Circle, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {icon} from "leaflet";
import NavHeader from "../../../components/nav-header";
import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import {useHistory} from "react-router";
import 'leaflet/dist/leaflet.css';
import {distanceInMeters} from "../../../lib/calculate-distance";
import {Geolocation} from "@capacitor/geolocation";
import {FloatButton} from "antd";
import {CameraOutlined} from "@ant-design/icons";

export default function CheckpointPatroliMap() {
    const history = useHistory()
    const markerRef = useRef<any>(null)
    const [items, setItems] = useState<CheckpointEntity[]>([])
    const [myPosition, setMyPosition] = useState({
        latitude: 0,
        longitude: 0
    })
    const {data: checkpoint, refetch} = useGetList<ResponseListType<CheckpointEntity[]>>({
        name: "checkpoint",
        endpoint: "/checkpoint",
        params: {}
    })

    function handleBack() {
        history.replace("/checkpoint-patroli")
    }

    const center = {
        lat: -5.1351538,
        lng: 119.4330576,
    }
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
        (async() => await handleLocationClick())()
    }, []);

    useEffect(() => {
        const newItems = checkpoint?.data?.filter((item) => {
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

    async function handleLocationClick() {
        await Geolocation.requestPermissions()
        await Geolocation.watchPosition(
            {
                enableHighAccuracy: true,
            },
            (data) => {
                if (data) {
                    const {latitude, longitude} = data.coords;
                    setMyPosition({latitude, longitude})

                }
            }
        );
    }

    return (
        <IonPage>
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
                <div className={"w-full h-[90vh]"}>
                    <FloatButton
                        type={"primary"}
                        icon={<CameraOutlined/>}
                        className={"z-[999] absolute bottom-24"}
                        // onClick={handleCameraClick}
                    />
                    <MapContainer center={center} zoom={21} scrollWheelZoom={false}
                                  className={" w-full h-full rounded-lg"}>
                        <TileLayer
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            draggable={false}
                            position={{
                                lat: myPosition.latitude,
                                lng: myPosition.longitude
                            }}
                            icon={icon({
                                iconUrl: "/marker-icon-2x.png",
                                iconSize: [16, 16],
                            })}
                            ref={markerRef}
                        >

                        </Marker>
                        {
                            checkpoint?.data?.map((item, index) => {
                                return <Markers
                                    key={index}
                                    position={{
                                        lat: item.latitude ?? 0,
                                        lng: item.longitude ?? 0
                                    }}
                                    checkpoint={item}
                                />
                            })
                        }

                    </MapContainer>

                </div>

            </IonContent>
        </IonPage>
    );
};

function Markers({position, checkpoint}: { position: { lat: number, lng: number }, checkpoint: CheckpointEntity }) {
    const markerRef = useRef<any>(null)
    const ICON = icon({
        iconUrl: "/marker-icon-2x.png",
        iconSize: [16, 16],
    })
    return <>
        <Circle center={position} pathOptions={{fillColor: "blue"}} radius={Number(checkpoint.radius)}/>
        <Marker
            draggable={false}
            position={position}
            icon={ICON}
            ref={markerRef}
        >
            <Popup minWidth={200}>
                <div>
                    <strong>Lokasi:</strong> {checkpoint?.checkpoint}
                </div>
                <div>
                    <strong>Keterangan:</strong> {checkpoint?.deskripsi}
                </div>

            </Popup>
        </Marker></>
}