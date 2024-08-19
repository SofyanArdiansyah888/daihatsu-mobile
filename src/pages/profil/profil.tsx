import {IonContent, IonPage} from "@ionic/react";
import {Avatar, Button, Modal} from "antd";
import {LockOutlined, LogoutOutlined, UserOutlined,GlobalOutlined} from "@ant-design/icons";
import React from "react";
import {useHistory} from "react-router";
import {useAuth} from "../../providers/auth-provider";

const {confirm} = Modal;
export default function ProfilPage() {
    const history = useHistory()
    const {user, logout} = useAuth()

    function handleLogout() {
        confirm({
            title: 'Kamu yakin ingin keluar ?',
            okText: 'Ya',
            okType: 'danger',
            cancelText: 'Tidak',
            onOk: () => logout(),
        })
    }


    function handleUpdatePasswordClick() {
        history.replace("/update-password")
    }

    function handleUpdateProfilClick() {
        history.replace("/update-profil")
    }

    function handleCheckpointClick() {
        history.replace("/checkpoint")
    }

    return <IonPage>
        <IonContent scrollY={true}>
            <main className={"px-4 py-2 "}>

                <header className={"text-center mb-12"}>
                    <Avatar size={64} icon={<UserOutlined/>}/>
                    <div className={"space-y-1 mt-4"}>
                        <p className={"text-sm font-bold capitalize"}>{user?.fullname}</p>
                        <p className={"text-xs "}>{["", null, undefined].includes(user?.email) ? "Email belum tersedia" : user?.email}</p>
                    </div>
                </header>

                <section className={" space-y-2 py-2"}>

                    <Item
                        text={"Update Password"}
                        icon={<LockOutlined/>}
                        handleClick={handleUpdatePasswordClick}
                    />

                    <Item
                        text={"Update Profil"}
                        icon={<UserOutlined/>}
                        handleClick={handleUpdateProfilClick}
                    />

                    <Item
                        text={"Checkpoint"}
                        icon={<GlobalOutlined/>}
                        handleClick={handleCheckpointClick}
                    />

                    <Item
                        text={"Keluar"}
                        icon={<LogoutOutlined/>}
                        handleClick={handleLogout}
                    />

                </section>
            </main>
        </IonContent>
    </IonPage>
}

function Item({
                  text,
                  icon,
                  handleClick
              }: {
    text: string,
    icon: React.ReactNode,
    handleClick: () => void
}) {
    return <div
        className={"flex justify-between items-center"}
        onClick={handleClick}
    >
        <div className={"flex gap-4 items-center py-2  rounded-md"}>
            <Button
                icon={icon}
                type={"primary"}
                size={"middle"}
            />
            <p className={"text-sm font-semibold"}>{text}</p>

        </div>
        <div>
            {/*<Button*/}
            {/*    icon={<RightOutlined/>}*/}
            {/*    type={"primary"}*/}
            {/*    size={"middle"}*/}
            {/*/>*/}
        </div>
    </div>
}