import {Dispatch, useEffect, useState} from "react";
import {Form, FormInstance, Image} from "antd";

import moment from "moment/moment";
import {usePost, usePut} from "../../../hooks/useApi";
import FormModal from "../../../components/modal/form-modal";
import ShiftEntity from "../../../entities/shift.entity";
import FormTextarea from "../../../components/form/form-textarea";
import {PlusCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {image} from "ionicons/icons";
import {useLocation} from "react-router";
import {useAuth} from "../../../providers/AuthProvider";

interface IPropsModal {
    selectedData: ShiftEntity | undefined,
    setSelectedData: Dispatch<ShiftEntity | undefined>,
    isOpen: boolean,
    handleGroupModal: (key: string, value: boolean) => void,
}

export default function RiwayatCheckpointModal({isOpen, handleGroupModal, selectedData, setSelectedData}: IPropsModal) {
    const [form] = Form.useForm();
    const [formInstance, setFormInstance] = useState<FormInstance>();
    const [imagePreview, setImagePreview] = useState<string | undefined>("")
    const queryParams = new URLSearchParams(useLocation().search)
    const {user} = useAuth()
    const {mutate: create, isPending: createLoading} = usePost({
        name: 'checkpoint-history',
        endpoint: '/checkpoint-history',
        onSuccess: async () => {
            handleGroupModal("modal", false)
        }
    })

    const {mutate: update, isPending: updateLoading} = usePut({
        name: 'shift',
        endpoint: `/shift/${selectedData?.id}`,
        onSuccess: async () => {
            handleGroupModal("modal", false)
        }
    })
    console.log({selectedData})

    async function handleSubmit() {
        const value = await formInstance?.validateFields();
        console.log({value})
        if (selectedData) {
            update({
                ...value,
                gambar: imagePreview,
                id_user: user?.id,
                id_shift: queryParams.get("id_shift"),
                id_checkpoint: queryParams.get("id_checkpoint"),
            })
            return
        }
        create({
            ...value,
            gambar: imagePreview,
            id_user: user?.id,
            id_shift: queryParams.get("id_shift"),
            id_checkpoint: queryParams.get("id_checkpoint"),
        })
    }

    function handleDeleteClick() {
        setImagePreview(undefined)
    }

    async function handleCameraClick() {
        const image = await Camera.getPhoto({
            quality: 10,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Camera
        });
        setImagePreview(`${image.base64String}`)
    }

    useEffect(() => {
        setFormInstance(form);
    }, [form]);

    useEffect(() => {
        if (selectedData) {

            form.setFieldsValue({
                ...selectedData,
            })
        }
        if (!isOpen) {
            setImagePreview("")
            form.resetFields()
            setSelectedData(undefined)
        }

    }, [form, selectedData, setSelectedData, isOpen])


    return <FormModal<ShiftEntity>
        form={form}
        title={`${selectedData ? "Edit Laporan" : "Tambah Laporan"}`}
        isOpen={isOpen}
        setIsOpen={(value) => handleGroupModal("modal", value as boolean)}
        onSubmit={handleSubmit}
        confirmLoading={selectedData ? updateLoading : createLoading}
    >
        <div className={"space-y-4"}>
            <FormTextarea
                name={"catatan"}
                label={"Catatan"}
                rules={[
                    {
                        required: true
                    }
                ]}
            />


            {
                imagePreview ? <div className={"relative size-[150px]"}>
                    <Image
                        width={150}
                        height={150}
                        src={`data:image/png;base64,${imagePreview}`}
                        fallback="data:image/png;base64,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"
                    />
                    <DeleteOutlined
                        className={"absolute -top-2 -right-2   text-red-600 text-xl"}
                        onClick={handleDeleteClick}
                    />
                </div> : <div
                    className={"size-[150px]  border-[2px] flex items-center text-center border-dashed border-slate-200"}
                    onClick={handleCameraClick}
                >
                    <PlusCircleOutlined
                        className={"text-4xl text-slate-500 mx-auto"}
                    />
                </div>
            }

        </div>
    </FormModal>
}