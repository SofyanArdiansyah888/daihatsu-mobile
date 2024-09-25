import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import React from "react";
import {Avatar} from "antd";
import RiwayatPatroli from "./components/riwayat-patroli";
import PatroliAktif from "./components/patroli-aktif";
import {useAuth} from "../../providers/auth-provider";
import moment from "moment/moment";
import {useGetList} from "../../hooks/useApi";
import {ResponseListType} from "../../lib/interface/response-type";
import ShiftEntity from "../../entities/shift.entity";
import JadwalSecurityEntity from "../../entities/jadwal-security";


export default function BerandaPage() {
    const {user} = useAuth()
    const {data: activeShift, refetch} = useGetList<ResponseListType<ShiftEntity>>
    ({
        name: 'shift-active',
        endpoint: "/active-shift",
        params: {
            // ...params,
            jenis: user?.role === 'security' ? 'internal' : 'external',
            id_user: user?.id
        }
    })

    const {
        data,
        isLoading: isLoadingRiwayat,
        refetch: refectRiwayat
    } = useGetList<ResponseListType<JadwalSecurityEntity[]>>
    ({
        name: 'laporan-patroli-security-berjalan',
        endpoint: "/laporan-patroli/berjalan",
        params: {
            jenis: 'security'
        }
    })

    const {
        data:dataRiwayatWarga,
        isLoading: isLoadingRiwayatWarga,
        refetch: refectRiwayatWarga
    } = useGetList<ResponseListType<JadwalSecurityEntity[]>>
    ({
        name: 'laporan-patroli-warga-berjalan',
        endpoint: "/laporan-patroli/berjalan",
        params: {
            jenis: 'warga'
        }
    })


    return <IonPage>
        <IonContent scrollY={true}>
            <IonRefresher
                slot="fixed"
                onIonRefresh={async (e) => {
                    await refetch();
                    await refectRiwayat();
                    await refectRiwayatWarga();
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
                        {/*<Button*/}
                        {/*    icon={<UserOutlined/>}*/}
                        {/*    type={"text"}*/}
                        {/*    onClick={handleLogout}*/}
                        {/*/>*/}
                    </div>
                </div>

                <PatroliAktif
                    activeShift={activeShift?.data}
                />


                <div className={"space-y-10 mt-12"}>
                    {
                        user?.role !== 'warga' && <RiwayatPatroli
                            title={"Shift Berjalan"}
                            data={data?.data}
                            isLoading={isLoadingRiwayat}
                        />
                    }


                    <RiwayatPatroli
                        title={"Shift Warga"}
                        data={dataRiwayatWarga?.data}
                        isLoading={isLoadingRiwayatWarga}
                    />
                </div>

            </main>

        </IonContent>
    </IonPage>
}