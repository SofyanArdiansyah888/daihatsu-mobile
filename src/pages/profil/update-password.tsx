import {IonContent, IonPage} from "@ionic/react";
import React from "react";
import {Button, Form, message} from "antd";
import {useHistory} from "react-router";
import NavHeader from "../../components/nav-header";
import FormInput from "../../components/form/form-input";
import {usePut} from "../../hooks/useApi";
import {useAuth} from "../../providers/auth-provider";


export default function UpdatePasswordPage() {
    const [form] = Form.useForm<FormData>();
    const history = useHistory()
    const {user, logout} = useAuth()
    const {mutate, isPending} = usePut({
        name: 'user',
        endpoint: `/user/${user?.id}/reset-password`,
        onSuccess: async ({data}: any) => {
            logout()
            await message.success("Berhasil mengganti password!")
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
            <NavHeader
                handleClick={handleBack}
                title={"Update Password"}
            />
            <main className={"px-4 py-2 "}>


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
                        {/*<FormInput*/}
                        {/*    name={"confirm_password"}*/}
                        {/*    label={"Ulangi Password"}*/}
                        {/*    dependencies={['password']}*/}
                        {/*    rules={[*/}
                        {/*        ({getFieldValue}) => ({*/}
                        {/*            validator(_, value) {*/}
                        {/*                if (!value || getFieldValue('password') === value) {*/}
                        {/*                    return Promise.resolve();*/}
                        {/*                }*/}
                        {/*                return Promise.reject(new Error('Password tidak sama!'));*/}
                        {/*            },*/}
                        {/*        })*/}
                        {/*    ]}*/}
                        {/*    size={"large"}*/}
                        {/*    type={"password"}*/}
                        {/*/>*/}
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