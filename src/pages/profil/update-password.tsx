import {IonContent, IonPage} from "@ionic/react";
import React from "react";
import {Button, Form, message} from "antd";
import {useHistory} from "react-router";
import NavHeader from "../../components/nav-header";
import FormInput from "../../components/form/form-input";
import {usePut} from "../../hooks/useApi";
import {useAuth} from "../../providers/AuthProvider";


export default function UpdatePasswordPage() {
    const [form] = Form.useForm<FormData>();
    const history = useHistory()
    const {user, setUser} = useAuth()
    const {mutate, isPending} = usePut({
        name: 'user',
        endpoint: `/user/${user?.id}/reset-password`,
        onSuccess: async ({data}: any) => {
            setUser(data)
            message.success("Berhasil mengupdate password!")
        },
        onError: () => {
            message.error("Gagal mengupdate password!")
        }
    })

    function handleBack() {
        history.replace("/profil")
    }


    function handleSubmit(value: any) {
        mutate({
            ...value
        })
    }

    return <IonPage>
        <IonContent scrollY={true}>
            <main className={"px-4 py-2 "}>
                <NavHeader handleClick={handleBack} title={"Update Password"}/>

                <Form
                    form={form}
                    layout={"vertical"}
                    className={""}
                    onFinish={handleSubmit}
                >
                    <section className={"!space-y-4 py-2"}>
                        <FormInput
                            name={"password"}
                            label={"Password"}
                            size={"large"}
                            type={"password"}
                        />
                        <FormInput
                            name={"confirm_password"}
                            label={"Ulangi Password"}
                            dependencies={['password']}
                            rules={[
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Password tidak sama!'));
                                    },
                                })
                            ]}
                            size={"large"}
                            type={"password"}
                        />
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