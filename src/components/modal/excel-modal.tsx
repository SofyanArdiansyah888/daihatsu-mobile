import React, {useEffect, useState} from "react";
import {Button, Form, FormInstance, Modal} from "antd";
import {PrinterOutlined} from "@ant-design/icons";
import {PrintButton} from "@/components/button";


interface IPrintModal<T> {
    form: FormInstance<T>
    title: string,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    confirmLoading?: boolean,
    setConfirmLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode,
    onSubmit: (values: T) => void;
    // handleFilterClick?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}

export default function ExcelModal<T>({
                                           form,
                                           title,
                                           isOpen,
                                           children,
                                           setIsOpen,
                                           confirmLoading,
                                           onSubmit
                                       }: IPrintModal<T>) {
    const [formInstance, setFormInstance] = useState<FormInstance>();
    useEffect(() => {
        setFormInstance(form);
    }, [form]);

    async function handleOKModal() {
        try {
            const values = await formInstance?.validateFields();
            onSubmit(values)
        } catch (error) {
            console.log('Failed:', error);
        }
    }

    return <>
        <PrintButton handleClick={() => setIsOpen(true)} />
        <Modal
            title={title}
            open={isOpen}
            onOk={handleOKModal}
            confirmLoading={confirmLoading}
            onCancel={() => setIsOpen(false)}
            destroyOnClose
            className={"!w-[350px]"}
            centered
        >
            <section className={"py-6"}>
                <Form
                    form={form}
                    layout={"vertical"}
                    className={"!space-y-2"}
                >
                    {children}
                </Form>
            </section>
        </Modal>
    </>
}
