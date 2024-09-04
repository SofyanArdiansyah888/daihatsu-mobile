import {Empty} from "antd";
import React from "react";

export default function EmptyData({data, fullscreen = false}: { data: any[] | undefined, fullscreen?: boolean }) {
    return data?.length === 0 || data === undefined ?
        <div className={`flex items-center ${fullscreen ? "h-[80vh]" : ""}`}>
            <Empty
                description={"Data Kosong"}
                className={"mx-auto size-24 my-4"}
            />
        </div> : <></>
}