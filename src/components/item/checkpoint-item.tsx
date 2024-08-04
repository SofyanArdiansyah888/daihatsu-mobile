import {Button, Image} from "antd";
import {EyeOutlined} from "@ant-design/icons";
import React from "react";

export default function CheckpointItem({handleItemClick}: { handleItemClick: () => void }) {
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
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <div className={" py-2  rounded-md"}>
                <h1 className={"text-sm font-semibold"}>12:30:48</h1>
                <p className={"font-light text-xs"}>Tidak ada catatan</p>
            </div>
        </div>

        <div>
            {/*<Button*/}
            {/*    icon={<EyeOutlined/>}*/}
            {/*    type={"primary"}*/}
            {/*    size={"middle"}*/}

            {/*/>*/}
        </div>
    </div>
}