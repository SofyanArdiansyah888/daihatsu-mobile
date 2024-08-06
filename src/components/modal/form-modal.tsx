import React, {ReactNode, useEffect, useState} from "react";
import {Form, FormInstance, Modal} from "antd";
import {Scrollbar} from "@radix-ui/react-scroll-area";

import {cn} from "../../lib/utils";
import {ScrollArea} from "../scroll-area";



interface IFormModal<T> {
    form: FormInstance<T>
    title: string,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    confirmLoading?: boolean,
    setConfirmLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode,
    onSubmit: (values: T) => void;
    scrollArea?: boolean,
    sectionClass?: string,
    modalClass?: string,
    loading?: boolean
    // handleFormClick?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}

export default function FormModal<T>({
                                         form,
                                         title,
                                         isOpen,
                                         children,
                                         setIsOpen,
                                         confirmLoading,
                                         onSubmit,
                                         scrollArea = false,
                                         sectionClass,
                                         modalClass
                                     }: IFormModal<T>) {
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

    return <Modal
        title={title}
        open={isOpen}
        onOk={handleOKModal}
        okText={"Simpan"}
        cancelText={"Batal"}
        confirmLoading={confirmLoading}
        onCancel={() => setIsOpen(false)}
        destroyOnClose
        className={`${cn("!w-[350px]", modalClass)}`}
        centered
    >
        {
            scrollArea ?
                <ScrollArea className={"h-fit"}>
                    <SectionForm form={form} sectionClass={sectionClass}>
                        {children}
                    </SectionForm>
                    <Scrollbar orientation={"vertical"}/>
                </ScrollArea> :
                <SectionForm form={form} sectionClass={sectionClass}>
                    {children}
                </SectionForm>
        }
    </Modal>
}

function SectionForm<T>({children, form, sectionClass}: {
    children: ReactNode,
    form: FormInstance<T>,
    sectionClass?: string
}) {
    return <section className={`${cn("py-6")} `}>
        <Form
            form={form}
            layout={"vertical"}
            className={`${cn('!space-y-1', sectionClass)}`}
        >
            {children}
        </Form>
    </section>
}
