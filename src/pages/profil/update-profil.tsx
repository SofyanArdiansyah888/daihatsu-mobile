import {Button, Form} from "antd";
import {useHistory} from "react-router";
import {usePost} from "../../hooks/useApi";
import {IonContent, IonPage} from "@ionic/react";
import NavHeader from "../../components/nav-header";
import FormInput from "../../components/form/form-input";
import React from "react";

export default function UpdateProfilPage() {
    const [form] = Form.useForm<FormData>();
    const history = useHistory()
    const {mutate, isPending} = usePost({
        name: 'login',
        endpoint: '/login',
        withMessage: true,
        errorMessage: "Server error!",
        onSuccess: async () => {
            history.push("/profil")
        },
    })

    function handleBack() {
        history.replace("/profil")
    }

    function handleItemClick() {
        history.replace("checkpoint/history")
    }

    function handleSubmit() {

    }

    return <IonPage>
        <IonContent scrollY={true}>
            <main className={"px-4 py-6 "}>
                <NavHeader handleClick={handleBack} title={"Update Profil"}/>

                <Form
                    form={form}
                    layout={"vertical"}
                    className={""}
                    onFinish={handleSubmit}
                >
                    <section className={"!space-y-4 py-2"}>
                        <FormInput
                            name={"name"}
                            label={"Username"}
                            size={"large"}
                            type={"text"}
                        />
                        <FormInput
                            name={"fullname"}
                            label={"Nama Lengkap"}
                            size={"large"}
                            type={"text"}
                        />
                        <FormInput
                            name={"telepon"}
                            label={"Telepon"}
                            size={"large"}
                            type={"text"}
                        />
                        <FormInput
                            name={"email"}
                            label={"Email"}
                            size={"large"}
                            type={"text"}/>
                        <FormInput
                            name={"nik"}
                            label={"Nik"}
                            size={"large"}
                            type={"text"}
                            disabled/>
                        <FormInput
                            name={"role"}
                            label={"Role"}
                            size={"large"}
                            type={"text"}
                            disabled/>
                        <FormInput
                            name={"status"}
                            label={"Status"}
                            size={"large"}
                            type={"text"}
                            disabled/>

                        <Button
                            size={"large"}
                            type={"primary"}
                            className={"w-full"}
                            htmlType={"submit"}
                            loading={isPending}>
                            Submit
                        </Button>
                    </section>
                </Form>


            </main>
        </IonContent>
    </IonPage>
}