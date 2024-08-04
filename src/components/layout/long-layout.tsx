import {LockOutlined, SlackOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import FormInput from "../form/form-input";
import {Button} from "antd";
import React from "react";
import {IonContent, IonPage} from "@ionic/react";

interface ILongLayout {
    headerText: string
    headerIcon: React.ReactNode
    children: React.ReactNode
    footerIcon?: React.ReactNode
}

export default function LongLayout({
                                       headerText,
                                       headerIcon,
                                       children,
                                       footerIcon
                                   }: ILongLayout) {

    return <IonPage>
        <IonContent scrollY={true}>
            <section className={"w-full min-h-screen  overflow-y-auto flex items-center justify-center "}>
                <div className={"text-center space-y-8 w-full px-12 py-12"}>
                    <div className={"space-y-4"}>
                        {headerIcon}
                        <Title level={4}>{headerText}</Title>
                    </div>

                    {/*<div className={"space-y-6"}>*/}
                    {children}
                    {/*</div>*/}
                </div>
                {footerIcon}
            </section>
        </IonContent>
    </IonPage>
}