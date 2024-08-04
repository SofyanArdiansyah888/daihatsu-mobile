import {Modal} from "antd";
// import {InfoCircledIcon} from "@radix-ui/react-icons";

const { confirm } = Modal;
export function deleteAlert({
    data,
    handleSubmit
                     }: {
    data: any,
    handleSubmit: () => void
}){
    confirm({
        title: 'Kamu yakin ingin menghapus data ini ?',
        // icon: <InfoCircledIcon className={"mr-2 text-destructive"} strokeWidth={1} />,
        content: `${data}`,
        okText: 'Ya',
        okType: 'danger',
        cancelText: 'Tidak',
        onOk: handleSubmit,
    });
}
