import {IonContent, IonPage} from "@ionic/react";
import React from "react";
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons"
import RiwayatPatroli from "./components/riwayat-patroli";
import PatroliAktif from "./components/patroli-aktif";
import {useHistory} from "react-router";
import FilterModal from "../../components/modal/filter-modal";
import useGroupModal from "../../hooks/useGroupModal";
import FiterTanggal from "./components/filter-tanggal";
import useBerandaStore from "./data/useBerandaStore";


export default function BerandaPage() {
    const history = useHistory()


    function handleLogout() {
        history.replace('/profil')
    }

    return <IonPage>
        <IonContent scrollY={true}>
            <main className={"px-4 py-6 "}>
                <div className={"flex justify-between items-center  py-3 rounded-xl"}>
                    <div className={"flex gap-4 items-center"}>
                        <Avatar
                            shape={"circle"}
                            size={40}
                        />
                        <div>
                            <p className={"text-xs text-slate-800"}>Today, 19 March 2024</p>
                            <p className={"font-semibold"}>Jamal Abdul Azis</p>
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

                <PatroliAktif/>

                <RiwayatPatroli/>

            </main>

        </IonContent>
    </IonPage>
}