import {Skeleton} from "antd";

export default function SkeletonLoading() {
    return <div className={"space-y-2"}>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
    </div>
}