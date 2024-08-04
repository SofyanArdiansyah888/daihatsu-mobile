import {LockOutlined, SlackOutlined} from "@ant-design/icons"
import FormInput from "../../components/form/form-input";
import {Button, Form} from "antd";
import AuthLayout from "../../components/layout/auth-layout";
import {useHistory} from "react-router";
import {usePost} from "../../hooks/useApi";


export default function LoginPage() {
    const [form] = Form.useForm<FormData>();
    const history = useHistory()
    const {mutate, isPending} = usePost({
        name: 'login',
        endpoint: '/login',
        withMessage: true,
        errorMessage: "Server error!",
        onSuccess: async () => {
            history.push("/beranda")
        },
    })

    function handleSubmit(payload: FormData) {
        history.push("/beranda")
        // @ts-ignore
        // mutate(payload)
    }

    return <AuthLayout
        headerText={"Login"}
        headerIcon={<SlackOutlined className={"text-red-500 text-[96px]"}/>}
        // footerIcon={<img
        //     src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-1vifkvbyOEZFb0YRoH_EZLSuNWEjiTgKYg&s"}
        //     className={"absolute bottom-4 text-red-500 w-full h-32 aspect-video "}
        //     alt={"Footer Logo"}
        // />}
    >
        <Form
            form={form}
            layout={"vertical"}
            className={""}
            onFinish={handleSubmit}
        >
            <div className={"!space-y-8 py-8"}>
                <div className={"!space-y-4"}>
                    <FormInput name={"username"} label={"Username"} size={"large"}/>
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