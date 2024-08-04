import {IonContent, IonPage} from "@ionic/react";
import React from "react";
import {Button, Form} from "antd";
import {useHistory} from "react-router";
import NavHeader from "../../components/nav-header";
import FormInput from "../../components/form/form-input";
import {usePost} from "../../hooks/useApi";


export default function UpdatePasswordPage() {
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

    function handleItemClick(){
        history.replace("checkpoint/history")
    }

    function handleSubmit(){

    }

    return <IonPage>
        <IonContent scrollY={true}>
            <main className={"px-4 py-6 "}>
                <NavHeader handleClick={handleBack} title={"Update Password"} />

                <Form
                    form={form}
                    layout={"vertical"}
                    className={""}
                    onFinish={handleSubmit}
                >
                <section className={"!space-y-4 py-2"}>
                    <FormInput name={"password"} label={"Password Lama"} size={"large"} type={"password"}/>
                    <FormInput name={"password"} label={"Password Baru"} size={"large"} type={"password"}/>
                    <FormInput name={"password"} label={"Ulangi Password Baru"} size={"large"} type={"password"}/>
                    <Button
                        size={"large"}
                        type={"primary"}
                        className={"w-full"}
                        htmlType={"submit"}
                        loading={isPending}
                    >Submit</Button>
                </section>
                </Form>


            </main>
        </IonContent>
    </IonPage>
}