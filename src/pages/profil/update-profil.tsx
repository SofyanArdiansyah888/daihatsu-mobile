import {Button, Form, message} from "antd";
import {useHistory} from "react-router";
import {usePut} from "../../hooks/useApi";
import {IonContent, IonPage} from "@ionic/react";
import NavHeader from "../../components/nav-header";
import FormInput from "../../components/form/form-input";
import React, {useEffect} from "react";
import {useAuth} from "../../providers/auth-provider";

export default function UpdateProfilPage() {
    const [form] = Form.useForm();
    const history = useHistory()
    const {user, setUser} = useAuth()

    const {mutate: update, isPending} = usePut({
        name: 'user',
        endpoint: `/user/${user?.id}`,
        onSuccess: async ({data}: any) => {
            setUser(data)
            message.success("Berhasil mengupdate profil!")
        },
        onError: async () => {
            message.error("Gagal mengupdate profil!")
        }
    })


    function handleBack() {
        history.replace("/profil")
    }

    function handleSubmit(value: any) {
        update({
            ...value
        })
    }

    useEffect(() => {
        form.setFieldsValue({
            ...user
        })
    }, []);

    return <IonPage>
        <IonContent scrollY={true}>
            <NavHeader handleClick={handleBack} title={"Update Profil"}/>
            <main className={"px-4 py-2 "}>


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