import CheckpointEntity from "../../../entities/checkpoint.entity";
import {Dispatch, useEffect} from "react";
import {Form, message, Select} from "antd";
import {usePost, usePut} from "../../../hooks/useApi";
import FormModal from "../../../components/modal/form-modal";
import FormTextarea from "../../../components/form/form-textarea";
import TukarShiftEntity from "../../../entities/tukar-shift.entity";
import FormDate from "../../../components/form/form-date";
import {useAuth} from "../../../providers/auth-provider";
import SecuritySelect from "../../../components/shared/select/security-select";
import JadwalSelect from "../../../components/shared/select/jadwal-select";
import dayjs from "dayjs";

interface IPropsModal {
    selectedData: TukarShiftEntity | undefined,
    setSelectedData: Dispatch<TukarShiftEntity | undefined>,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

export default function JadwalModal({isOpen, setIsOpen, selectedData, setSelectedData}: IPropsModal) {
    const {user} = useAuth()
    const [form] = Form.useForm();


    const values = Form.useWatch([], form)

    const {mutate: create, isPending: createLoading} = usePost({
        name: 'tukar-shift',
        endpoint: '/tukar-shift',
        onSuccess: async () => {
            message.success("Berhasil membuat request");
            setIsOpen(false)
        }
    })

    const {mutate: update, isPending: updateLoading} = usePut({
        name: 'tukar-shift',
        endpoint: `/tukar-shift/${selectedData?.id}`,
        onSuccess: async () => {
            message.success("Berhasil update request");
            setIsOpen(false)
        }
    })

    function handleSubmit(value: any) {
        if(["approve",'reject'].includes(selectedData?.status as string)){
            message.warning(`Status sudah di ${selectedData?.status}`)
            return
        }
        if (selectedData) {
            update({
                ...value,
                id_user_requester: user?.id,
                status: 'request'
            })
            return
        }
        create({
            ...value,
            id_user_requester: user?.id,
            status: 'request'
        })
    }

    useEffect(() => {
        if (selectedData) {
            form.setFieldsValue({
                ...selectedData,
                id_request_jadwal_security: selectedData?.id_request_jadwal_security?.toString(),
                id_user_approver: selectedData?.id_user_approver?.toString(),
                id_approve_jadwal_security: selectedData?.id_approve_jadwal_security?.toString(),
                tanggal_asal: dayjs(selectedData?.jadwal_requested?.tanggal_mulai),
                tanggal_tujuan: dayjs(selectedData?.jadwal_approved?.tanggal_mulai)
            })
        }
        if (!isOpen) {
            form.resetFields()
            setSelectedData(undefined)
        }

    }, [isOpen])


    return <FormModal<CheckpointEntity>
        form={form}
        title={`Data Tukar Shift`}
        isOpen={isOpen}
        setIsOpen={(value) => setIsOpen(value as boolean)}
        onSubmit={handleSubmit}
        confirmLoading={selectedData ? updateLoading : createLoading}
    >

        <div className={""}>

            {/*tanggal*/}
            <FormDate
                name={"tanggal_asal"}
                label={"tanggal Asal"}
            />

            <JadwalSelect
                name={"id_request_jadwal_security"}
                label={"Shift Asal"}
                tanggal={values?.tanggal_asal?.format("YYYY-MM-DD")}
                id_user={user?.id.toString()}
                disabled={["", null, undefined].includes(values?.tanggal_asal)}
            />
            <FormDate
                name={"tanggal_tujuan"}
                label={"tanggal Tujuan"}
            />


            {/*id_user_approver*/}
            <SecuritySelect
                name={"id_user_approver"}
                label={"Partner Tujuan"}
                excludeUser={user}
                // disabled={!isRequester()}
            />

            {/*id_approve_jadwal_security*/}
            <JadwalSelect
                name={"id_approve_jadwal_security"}
                label={"Shift Tujuan"}
                tanggal={values?.tanggal_tujuan?.format("YYYY-MM-DD")}
                id_user={values?.id_user_approver?.toString()}
                disabled={["", null, undefined].includes(values?.id_user_approver?.toString())}
                // id_user={user?.id?.toString() as string}
            />

            {/*catatan*/}
            <FormTextarea
                name={"catatan"}
                label={"catatan"}
                rules={[
                    {
                        required: true
                    }
                ]}
            />
        </div>


    </FormModal>
}