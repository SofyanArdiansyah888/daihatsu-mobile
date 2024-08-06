import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import React from "react";
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons"
import RiwayatPatroli from "./components/riwayat-patroli";
import PatroliAktif from "./components/patroli-aktif";
import {useHistory} from "react-router";
import {useAuth} from "../../providers/AuthProvider";
import moment from "moment/moment";
import {useGetList} from "../../hooks/useApi";
import {ResponseListType} from "../../lib/interface/response-type";
import CheckpointEntity from "../../entities/checkpoint.entity";
import ShiftEntity from "../../entities/shift.entity";
import JadwalSecurityEntity from "../../entities/jadwal-security";


export default function BerandaPage() {
    const history = useHistory()
    const {user} = useAuth()


    const {data: activeShift, isLoading, refetch} = useGetList<ResponseListType<ShiftEntity>>
    ({
        name: 'shift-active',
        endpoint: "/active-shift",
        params: {
            // ...params,
        }
    })

    const {data, isLoading:isLoadingRiwayat,refetch:refectRiwayat} = useGetList<ResponseListType<JadwalSecurityEntity[]>>
    ({
        name: 'laporan-patroli',
        endpoint: "/laporan-patroli",
        params: {
            // ...params,
        }
    })

    function handleLogout() {
        history.replace('/profil')
    }

    return <IonPage>
        <IonContent scrollY={true}>
            <IonRefresher
                slot="fixed"
                onIonRefresh={async (e) => {
                    await refetch();
                    await refectRiwayat();
                    e.detail.complete();
                }}
            >
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <main className={"px-4 py-2 "}>
                <div className={"flex justify-between items-center  py-3 rounded-xl"}>
                    <div className={"flex gap-4 items-center"}>
                        <Avatar
                            shape={"circle"}
                            size={40}
                        >
                            {user?.fullname[0]}
                        </Avatar>
                        <div>
                            <p className={"text-xs text-slate-800"}>{moment().format("dddd, DD MMMM YYYY")}</p>
                            <p className={"font-semibold capitalize"}>{user?.fullname}</p>
                        </div>
                    </div>
                    <div>
                        <Button
                            icon={<UserOutlined/>}
                            type={"text"}
                            onClick={handleLogout}
                        />
                    </div>
                </div>

                <PatroliAktif
                    activeShift={activeShift?.data}
                />

                <RiwayatPatroli
                    data={data?.data}
                    isLoading={isLoadingRiwayat}
                />

            </main>

        </IonContent>
    </IonPage>
}