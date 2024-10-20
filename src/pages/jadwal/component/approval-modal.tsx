import CheckpointEntity from "../../../entities/checkpoint.entity";
import {Dispatch, useEffect} from "react";
import {Form, message} from "antd";
import {usePost, usePut} from "../../../hooks/useApi";
import {ApprovalFormModal} from "../../../components/modal/form-modal";
import FormTextarea from "../../../components/form/form-textarea";
import TukarShiftEntity from "../../../entities/tukar-shift.entity";
import FormDate from "../../../components/form/form-date";
import {useAuth} from "../../../providers/auth-provider";
import SecuritySelect from "../../../components/shared/select/security-select";
import JadwalSelect from "../../../components/shared/select/jadwal-select";
import moment from "moment";
import FormInput from "../../../components/form/form-input";

interface IPropsModal {
    selectedData: TukarShiftEntity | undefined,
    setSelectedData: Dispatch<TukarShiftEntity | undefined>,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}

export default function ApprovalModal({isOpen, setIsOpen, selectedData, setSelectedData}: IPropsModal) {
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
        endpoint: `/tukar-shift/${selectedData?.id}/update-status`,
        onSuccess: async () => {
            message.success("Berhasil update request");
            setIsOpen(false)
        }
    })

    function handleApprove(value: any) {
        if (selectedData) {
            update({
                ...value,
                ...selectedData,
                status: 'approve'
            })
            return
        }
    }

    function handleReject(value: any) {
        if (selectedData) {
            update({
                ...value,
                ...selectedData,
                status: 'reject'
            })
            return
        }
    }


    useEffect(() => {
        if (selectedData) {
            console.log("SELECTED JAGA:",selectedData)
            const tanggal = selectedData?.jadwal_requested?.tanggal_mulai
            form.setFieldsValue({
                ...selectedData,
                id_request_jadwal_security: selectedData?.id_request_jadwal_security?.toString(),
                id_approve_jadwal_security: selectedData?.id_approve_jadwal_security?.toString(),
                id_user_approver: selectedData?.id_user_approver?.toString(),
                id_user_requester: selectedData?.id_user_requester?.toString(),
                shift_tujuan: selectedData?.jadwal_approved?.shift?.shift,
                shift_asal: selectedData?.jadwal_requested?.shift?.shift,
                partner_asal: selectedData?.user_requester?.fullname,
                partner_tujuan: selectedData?.user_approver?.fullname,


                status:  selectedData?.status?.toUpperCase()?.toString(),
                tanggal: moment(tanggal)
            })
        }
        if (!isOpen) {
            form.resetFields()
            setSelectedData(undefined)
        }

    }, [isOpen])


    return <ApprovalFormModal<CheckpointEntity>
        form={form}
        title={`Approval Tukar Shift`}
        isOpen={isOpen}
        setIsOpen={(value) => setIsOpen(value as boolean)}
        onApprove={handleApprove}
        onReject={handleReject}
        onSubmit={() => {
        }}
        status={selectedData?.status as string}
        confirmLoading={selectedData ? updateLoading : createLoading}
    >

        <div className={""}>
            <FormInput
                name={"status"} label={"Status"} disabled={true}
            />

            {/*tanggal*/}
            <FormDate
                name={"tanggal"}
                label={"tanggal asal"}
                disabled={true}
            />

            <FormInput
                name={"partner_asal"}
                label={"Partner Asal"}
                disabled={true}
            />


            <FormInput
                name={"shift_asal"}
                label={"Shift Asal"}
                disabled={true}
            />

            <FormInput
                name={"partner_tujuan"}
                label={"Partner Tujuan"}
                disabled={true}
            />

            <FormInput
                name={"shift_tujuan"}
                label={"Shift Tujuan"}
                disabled={true}
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
                disabled={true}
            />
        </div>


    </ApprovalFormModal>
}