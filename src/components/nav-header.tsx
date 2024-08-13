import {Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import React from "react";

export default function NavHeader({
                                      handleClick,
                                      title,
                                      withBackButton = true,
                                      icon
                                  }: {
                                      handleClick: () => void,
                                      title: string,
                                      withBackButton?: boolean,
                                      icon?: React.ReactNode,
                                  }
) {
    return <div className={"flex justify-between items-center bg-red-500 px-2  py-3 text-white"}>
        <div className={"flex gap-4 items-center"}>
            {
                withBackButton && <div>
                    <Button
                        icon={<ArrowLeftOutlined className={"text-white"}/>}
                        type={"text"}
                        onClick={handleClick}
                    />
                </div>
            }
            <div>
                <p className={"font-semibold capitalize"}>{title}</p>
            </div>
        </div>


        {icon}

    </div>
}