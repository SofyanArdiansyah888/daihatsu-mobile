import {LockOutlined, SlackOutlined} from "@ant-design/icons"
import FormInput from "../../components/form/form-input";
import {Button, Form, message} from "antd";
import AuthLayout from "../../components/layout/auth-layout";
import {useHistory} from "react-router";
import {usePost} from "../../hooks/useApi";
import {useAuth} from "../../providers/auth-provider";


export default function LoginPage() {
    const [form] = Form.useForm<FormData>();
    const auth = useAuth();
    const history = useHistory()
    const {mutate, isPending} = usePost({
        name: 'login',
        endpoint: '/login',
        onSuccess: async (data: any) => {
            auth.login(data)
            history.replace("/beranda")
        },
        onError: async (error: any) => {
            if (error?.response?.status === 500) {
                await message.error("Tidak dapat menghubungi server!")
                return
            }
            await message.error("Username atau password salah!")
        }
    })

    function handleSubmit(payload: FormData) {
        // @ts-ignore
        mutate(payload)
    }

    return <AuthLayout
        headerText={"Login"}
        headerIcon={<SlackOutlined className={"text-red-500 text-[96px]"}/>}
    >
        <Form
            form={form}
            layout={"vertical"}
            className={""}
            onFinish={handleSubmit}
        >
            <div className={"!space-y-8 py-8"}>
                <div className={"!space-y-4"}>
                    <FormInput name={"name"} label={"Username"} size={"large"}/>
                    <FormInput name={"password"} label={"Password"} size={"large"} type={"password"}/>
                </div>
                <Button
                    size={"large"}
                    type={"primary"}
                    icon={<LockOutlined/>}
                    className={"w-full"}
                    htmlType={"submit"}
                    loading={isPending}
                >Login</Button>
            </div>
        </Form>
    </AuthLayout>
}