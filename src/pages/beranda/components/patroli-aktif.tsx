import {Button} from "antd";
import {SecurityScanOutlined} from "@ant-design/icons";
import React from "react";
import {useHistory} from "react-router";
import {useGetList} from "../../../hooks/useApi";
import {ResponseListType} from "../../../lib/interface/response-type";
import CheckpointEntity from "../../../entities/checkpoint.entity";
import ShiftEntity from "../../../entities/shift.entity";

export default function PatroliAktif({activeShift}: { activeShift: ShiftEntity | undefined }) {
    const history = useHistory()


    function handlePatroliClick() {
        if (activeShift) history.replace(`/patroli/checkpoint?id_shift=${activeShift.id}`)
    }

    return <div
        className={"flex justify-between items-center my-4 bg-[#f5222d] px-4 py-3 rounded-2xl text-white"}
        onClick={handlePatroliClick}
    >
        <div className={"flex gap-4 items-center"}>
            <Button
                icon={
                    <SecurityScanOutlined
                        style={{color: "#FFF"}}
                        className={"!text-3xl"}
                    />}
                size={"large"}
                type={"primary"}
            />
            <div>
                <p className={"font-semibold"}>Shift Berjalan</p>
                <p className={"text-xs"}>{activeShift ? activeShift?.shift : "Tidak ada shift berjalan"}</p>
            </div>
        </div>
        <div>
            <Button
                type={"text"}
                className={"bg-white font-semibold hover:!bg-white"}
            >
                Patroli
            </Button>
        </div>
    </div>
}