import {Button} from "antd";
import {SecurityScanOutlined} from "@ant-design/icons";
import React from "react";
import {useHistory} from "react-router";

export default function PatroliAktif() {
    const history = useHistory()
    function handlePatroliClick(){
        history.replace("/patroli/checkpoint")
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
                <p className={"font-semibold"}>Shift Sementara Berjalan</p>
                <p className={"text-xs"}>Shift Siang 1</p>
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