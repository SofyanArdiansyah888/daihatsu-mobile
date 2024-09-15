import CheckpointEntity from "../../../entities/checkpoint.entity";
import {Dispatch, useEffect} from "react";
import {Form, message} from "antd";
import {usePost, usePut} from "../../../hooks/useApi";
import FormModal from "../../../components/modal/form-modal";
import FormInput from "../../../components/form/form-input";
import FormSelect from "../../../components/form/form-select";
import FormTextarea from "../../../components/form/form-textarea";
import {Geolocation} from "@capacitor/geolocation";

interface IPropsModal {
    selectedData: CheckpointEntity | undefined,
    setSelectedData: Dispatch<CheckpointEntity | undefined>,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

export default function CheckpointModal({isOpen, setIsOpen, selectedData, setSelectedData}: IPropsModal) {
    const [form] = Form.useForm();

    const {mutate: create, isPending: createLoading} = usePost({
        name: 'checkpoint',
        endpoint: '/checkpoint',
        onSuccess: async () => {
            message.success("Berhasil membuat checkpoint");
            setIsOpen(false)
        }
    })

    const {mutate: update, isPending: updateLoading} = usePut({
        name: 'checkpoint',
        endpoint: `/checkpoint/${selectedData?.id}`,
        onSuccess: async () => {
            message.success("Berhasil update checkpoint");
            setIsOpen(false)
        }
    })


    useEffect(() => {
        (async ()=> {
            await Geolocation.requestPermissions()
            await Geolocation.watchPosition(
                {
                    enableHighAccuracy: true,
                },
                (data) => {
                    if (data) {
                        const {latitude, longitude} = data.coords;
                        form.setFieldValue('latitude',latitude)
                        form.setFieldValue('longitude',longitude)
                    }
                }
            );
        })()

    }, []);

    function handleSubmit(value: any) {
        if (selectedData) {
            update({
                ...value,
                radius: 5
            })
            return
        }
        create({
            ...value,
            radius: 5
        })
    }

    useEffect(() => {
        if (selectedData) {
            form.setFieldsValue({...selectedData})
        }
        if (!isOpen) {
            form.resetFields()
            setSelectedData(undefined)
        }

    }, [form, selectedData, setSelectedData, isOpen])


    return <FormModal<CheckpointEntity>
        form={form}
        title={`${selectedData ? "Edit Checkpoint" : "Tambah Checkpoint"}`}
        isOpen={isOpen}
        setIsOpen={(value) => setIsOpen(value as boolean)}
        onSubmit={handleSubmit}
        confirmLoading={selectedData ? updateLoading : createLoading}
    >

        <div className={""}>
            <FormInput
                name={"checkpoint"}
                label={"Checkpoint"}
                rules={[
                    {
                        required: true
                    }
                ]}
            />
            <FormSelect name={"jenis"}
                        label={"Jenis"}
                        options={[
                            {
                                label: "Internal",
                                value: "internal"
                            },
                            {
                                label: "External",
                                value: "external"
                            }
                        ]}
                        rules={[
                            {
                                required: true
                            }
                        ]}
            />

            {/*<FormInput*/}
            {/*    name={"radius"}*/}
            {/*    label={"Radius"}*/}
            {/*    type={"number"}*/}
            {/*    rules={[*/}
            {/*        {*/}
            {/*            required: true*/}
            {/*        }*/}
            {/*    ]}*/}
            {/*/>*/}
            <FormInput
                name={"latitude"}
                label={"latitude"}
                type={"float"}
                rules={[
                    {
                        required: true
                    }
                ]}
            />
            <FormInput
                name={"longitude"}
                label={"longitude"}
                type={"float"}
                rules={[
                    {
                        required: true
                    }
                ]}
            />

            <FormTextarea
                name={"deskripsi"}
                label={"deskripsi"}
                rules={[
                    {
                        required: true
                    }
                ]}
            />
        </div>


    </FormModal>
}