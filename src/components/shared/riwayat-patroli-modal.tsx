import {Descriptions, Form, Modal} from "antd";
import React from "react";
import CheckpointItem from "../item/checkpoint-item";
import CheckpointHistoryEntity from "../../entities/checkpoint-history";
import JadwalSecurityEntity from "../../entities/jadwal-security";
import moment from "moment/moment";

interface GroupedData {
    [key: string]: CheckpointHistoryEntity[];
}

export default function RiwayatPatroliModal({
                                                isOpen,
                                                setIsOpen,
                                                selectedItem
                                            }: {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedItem: any
}) {
    function groupByCheckpoint(): { group_checkpoint: string, items: CheckpointHistoryEntity[] }[] {
        const groupedData = selectedItem?.checkpoint_history?.reduce((result: GroupedData, item: any) => {
            const key = item?.checkpoint?.checkpoint;
            if (!result[key]) {
                result[key] = [];
            }
            result[key].push(item);
            return result;
        }, {} as GroupedData);

        return Object.keys(groupedData || {}).map(key => ({
            group_checkpoint: key,
            items: groupedData![key]
        }));
    }
    return <Modal
        title={"Detail Riwayat"}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        destroyOnClose
        footer={false}
        centered
    >
        <section className={"py-6 space-y-8  divide-red-500"}>
            <div className={"grid grid-cols-2 gap-y-4"}>
                <Item
                    title={"Shift"}
                    description={selectedItem?.shift?.shift}
                />
                <Item
                    title={"Ketua"}
                    description={selectedItem?.user?.fullname}
                />
                <Item
                    title={"Dari"}
                    description={selectedItem?.shift?.dari}
                />
                <Item
                    title={"Sampai"}
                    description={selectedItem?.shift?.sampai}
                />
                <Item
                    title={"Tanggal"}
                    description={moment(selectedItem?.tanggal_mulai).format("DD MMMM YYYY")}
                />


            </div>

            {groupByCheckpoint()?.map((item, index) =>
                <div className={"pt-6"}>
                    <h1 className={"font-semibold text-md"}>{item.group_checkpoint}</h1>
                    <hr className={"border-[1px] rounded-full border-red-500 my-2"}/>
                    <div className={"space-y-4 mt-6"}>
                        {
                            item.items.map((detail) => <CheckpointItem
                                title={detail?.user?.fullname}
                                // subtitle={moment(detail?.created_at).format("HH:mm")}
                                subtitle={["", null, undefined].includes(detail?.catatan) ? "Tidak ada catatan" : detail?.catatan}
                                tanggal={moment(detail?.created_at).format("HH:mm")}
                                gambar={`${detail?.gambar}`}
                                handleItemClick={() => {
                                }}/>)
                        }
                    </div>
                </div>
            )}

        </section>
    </Modal>
}

function Item({title, description}: { title: string, description: string }) {
    return <div>
        <p className={"font-semibold"}>{title}</p>
        <p>{description}</p>
    </div>
}