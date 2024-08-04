import {Descriptions, Form, Modal} from "antd";
import React from "react";
import CheckpointItem from "../../../components/item/checkpoint-item";

export default function RiwayatPatroliModal({
                                                isOpen,
                                                setIsOpen,
                                                selectedItem
                                            }: {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    selectedItem: any
}) {

    return <Modal
        title={"Detail Riwayat"}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        destroyOnClose
        footer={false}
        centered
    >
        <section className={"py-6 space-y-8 divide-y-[1px] divide-red-500"}>
            <div className={"grid grid-cols-2 gap-y-4"}>
                <Item
                    title={"Shift"}
                    description={"Shift 1 Siang"}
                />
                <Item
                    title={"Ketua"}
                    description={"Abdul Hamid II"}
                />
                <Item
                    title={"Dari"}
                    description={"12:00"}
                />
                <Item
                    title={"Sampai"}
                    description={"12:00"}
                />
                <Item
                    title={"Tanggal"}
                    description={"28 April 2024"}
                />


            </div>

            {[1, 1, 1].map(() =>
                <div className={"pt-6"}>
                    <h1 className={"font-semibold text-lg"}>Checkpoint 1</h1>
                    <div className={"space-y-4 mt-6"}>
                        {
                            [1, 1, 1, 4].map(() => <CheckpointItem handleItemClick={() => {
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