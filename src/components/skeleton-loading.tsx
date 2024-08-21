import {Skeleton} from "antd";

export default function SkeletonLoading({length = 5}:{length?:number}) {
    const array = new Array(length).fill(0)
    return <div className={"space-y-2"}>
        {
            array.map(() => <Skeleton/>)
        }
    </div>
}