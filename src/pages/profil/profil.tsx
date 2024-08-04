import {IonContent, IonPage} from "@ionic/react";
import {Avatar, Button} from "antd";
import {
    ArrowLeftOutlined,
    LockOutlined,
    LogoutOutlined,
    ProfileOutlined,
    RightOutlined,
    UserOutlined,
    HomeOutlined
} from "@ant-design/icons";
import React from "react";
import {useHistory} from "react-router";

export default function ProfilPage() {
    const history = useHistory()

    function handleLogout() {
        history.replace('/login')
    }

    function handleBerandaClick() {
        history.replace('/beranda')
    }

    return <IonPage>
        <IonContent scrollY={true}>
            <main className={"px-4 py-6 "}>

                <header className={"text-center mb-12"}>
                    <Avatar size={64} icon={<UserOutlined/>}/>
                    <div className={"space-y-1 mt-4"}>
                        <p className={"text-sm font-bold"}>Sofyan Ardiansyah</p>
                        <p className={"text-xs "}>sofyanardiansyah888@gmail.com</p>
                    </div>
                </header>

                <section className={"divide-y-[1px] space-y-2 py-2"}>

                    <Item
                        text={"Update Password"}
                        icon={<LockOutlined/>}
                        handleClick={() => {
                            history.replace("/profil/update-password")
                        }}
                    />

                    <Item
                        text={"Update Profil"}
                        icon={<UserOutlined/>}
                        handleClick={() => {
                            history.replace("/profil/update-profil")
                        }}
                    />

                    <Item
                        text={"Beranda"}
                        icon={<HomeOutlined/>}
                        handleClick={handleBerandaClick}
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
            <Button
                icon={<RightOutlined/>}
                type={"text"}
                size={"middle"}
            />
        </div>
    </div>
}