import {Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import React from "react";

export default function NavHeader({
                                      handleClick,
                                      title
                                  }: {
                                      handleClick: () => void,
                                      title: string
                                  }
) {
    return <div className={"flex justify-between items-center  py-3 rounded-xl"}>
        <div className={"flex gap-4 items-center"}>
            <div>
                <Button
                    icon={<ArrowLeftOutlined/>}
                    type={"text"}
                    onClick={handleClick}
                />
            </div>
            <div>
                <p className={"font-semibold capitalize"}>{title}</p>
            </div>
        </div>
    </div>
}