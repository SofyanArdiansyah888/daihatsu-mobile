import {Image} from "antd";
import React from "react";

export default function CheckpointItem({handleItemClick, title, subtitle, gambar, tanggal}: {
    handleItemClick: () => void,
    title: string,
    subtitle: string,
    gambar: string,
    tanggal?: string
}) {
    return <div
        className={"flex justify-between items-center"}
        onClick={handleItemClick}
    >
        <div className={"flex gap-2 pt-2"}>
            <Image
                style={{
                    borderRadius: "8px"
                }}
                width={50}
                src={gambar}
            />
                <div className={" py-2  rounded-md"}>
                    <h1 className={"text-sm font-semibold"}>{title}</h1>
                    <p className={"font-light text-xs"}>{subtitle}</p>
                </div>

        </div>

        <div className={"text-sm font-semibold"}>
            {tanggal}
        </div>
    </div>
}