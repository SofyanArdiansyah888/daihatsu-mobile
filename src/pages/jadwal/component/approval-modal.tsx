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
    console.log("TANGGAL:",values?.tanggal?.format("YYYY-MM-DD"))
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

    function handleApprove(value: any) {
        console.log({selectedData})
        if (selectedData) {

            // update({
            //     ...value,
            //     status:false
            // })
            return
        }
    }
    function handleReject(value: any) {
        console.log({selectedData})
        if (selectedData) {

            // update({
            //     ...value,
            //     status:false
            // })
            return
        }
    }


    useEffect(() => {
        console.log("INSIDE USE EFFECT:",{selectedData})
        if (selectedData) {
            form.setFieldsValue({...selectedData})
        }
        if (!isOpen) {
            form.resetFields()
            setSelectedData(undefined)
        }

    }, [form, selectedData, setSelectedData, isOpen])


    return <ApprovalFormModal<CheckpointEntity>
        form={form}
        title={`Approval Tukar Shift`}
        isOpen={isOpen}
        setIsOpen={(value) => setIsOpen(value as boolean)}
        onApprove={handleApprove}
        onReject={handleReject}
        onSubmit={() => {}}
        confirmLoading={selectedData ? updateLoading : createLoading}
    >

        <div className={""}>

            {/*tanggal*/}
            <FormDate
                name={"tanggal"}
                label={"tanggal"}
                disabled={true}
            />

            {/*id_user_requester*/}
            <SecuritySelect
                name={"id_user_requester"}
                label={"Requester"}
                user={user}
                disabled={true}
            />

            {/*id_request_jadwal_security*/}
            <JadwalSelect
                name={"id_request_jadwal_security"}
                label={"Dari Shift"}
                tanggal={values?.tanggal?.format("YYYY-MM-DD")}
                id_user={"1"}
                disabled={true}
            />

            {/*id_user_approver*/}
            <SecuritySelect
                name={"id_user_approver"}
                label={"Approver"}
                excludeUser={user}
                disabled={true}
            />

            {/*id_approve_jadwal_security*/}
            <JadwalSelect
                name={"id_approve_jadwal_security"}
                label={"Ke Shift"}
                tanggal={values?.tanggal?.format("YYYY-MM-DD")}
                id_user={values?.id_user_approver?.toString()}
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