import {IonContent, IonPage, IonRefresher, IonRefresherContent} from "@ionic/react";
import React, {useState} from "react";
import {useHistory, useLocation} from "react-router";
import NavHeader from "../../components/nav-header";
import {useGetList} from "../../hooks/useApi";
import {ResponseListType} from "../../lib/interface/response-type";
import useURLParams from "../../hooks/useURLParams";
import SkeletonLoading from "../../components/skeleton-loading";
import FilterTanggal from "../../components/modal/filter-tanggal";
import useJadwalStore from "./data/useJadwalStore";
import {PlusCircleOutlined} from "@ant-design/icons";
import {FloatButton} from "antd";
import EmptyData from "../../components/empty-data";
import JadwalModal from "./component/jadwal-modal";
import TukarShiftEntity from "../../entities/tukar-shift.entity";
import {useAuth} from "../../providers/auth-provider";
import ApprovalModal from "./component/approval-modal";
import {SwapOutlined} from '@ant-design/icons'
import moment from "moment";


export default function JadwalPage() {
    const history = useHistory()
    const [selectedItem, setSelectedItem] = useState<TukarShiftEntity>()
    const [modal, setModal] = useState<boolean>(false)
    const [approvalModal, setApprovalModal] = useState<boolean>(false)
    const {filterPayload, changeFilterPayload} = useJadwalStore()
    const {params, handleParamsChange} = useURLParams({})
    const {user} = useAuth()
    const queryParams = new URLSearchParams(useLocation().search)

    const {data, isLoading, refetch} = useGetList<ResponseListType<TukarShiftEntity[]>>
    ({
        name: 'tukar-shift',
        endpoint: "/tukar-shift",
        params: {
            ...params,
            ...filterPayload,
            id_user: user?.id
        }
    })

    function handleBack() {
        history.replace("/beranda")
    }

    function handleItemClick(item: TukarShiftEntity) {
        setSelectedItem(item)

        // JIKA USER LOGIN = REQUEST MAKA TAMPILKAN FORM EDIT
        // ELSE TAMPILKAN APPROVAL
        if (user?.id?.toString() === item?.id_user_requester?.toString()) {
            setModal(true)
            return;
        }
        setApprovalModal(true)
    }

    function handleAddClick() {
        setModal(true)
    }


    return <IonPage>
        <NavHeader
            handleClick={handleBack}
            title={"Tukar Jadwal"}
            withBackButton={false}
            icon={<FilterTanggal
                filterPayload={filterPayload}
                changeFilterPayload={changeFilterPayload}
            />}
        />
        <IonContent scrollY={true}>
            <IonRefresher
                slot="fixed"
                onIonRefresh={async (e) => {
                    await refetch();
                    e.detail.complete();
                }}
            >
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>


            <main className={"p-4"}>
                {
                    isLoading ? <SkeletonLoading/> :
                        <section className={" space-y-8"}>
                            <EmptyData
                                data={data?.data}
                                fullscreen={true}
                            />
                            {/*<div className={"flex w-full"}>*/}
                            {/*    <div className={"basis-1/2"}>*/}
                            {/*        <h3 className={"font-semibold text-semibold"}>Asal</h3>*/}
                            {/*        /!*<p className={"text-xs"}>Suparman</p>*!/*/}
                            {/*        /!*<p className={"text-xs"}>28 September 2024 (Pagi)</p>*!/*/}
                            {/*    </div>*/}
                            {/*    <div className={"basis-1/2  text-right"}>*/}
                            {/*        <h3 className={"font-semibold text-semibold"}>Tujuan</h3>*/}
                            {/*        /!*<p className={"text-xs"}>Suparman</p>*!/*/}
                            {/*        /!*<p className={"text-xs"}>28 September 2024 (Pagi)</p>*!/*/}
                            {/*    </div>*/}
                            {/*</div>*/}



                            {
                                data?.data?.map((item: TukarShiftEntity) =>
                                        <div className={"flex w-full justify-between items-start"} onClick={() => handleItemClick(item)}>
                                            <div className={"basis-1/2"}>
                                                <p className={"text-xs font-semibold capitalize"}>{item?.user_requester?.fullname}</p>
                                                <p className={"text-xs"}>{moment(item?.jadwal_requested?.tanggal_mulai).format("DD MMM YYYY")}</p>
                                                <p className={"text-xs"}>{item?.jadwal_requested?.shift?.shift}</p>
                                            </div>
                                            <div>
                                               <SwapOutlined className={`${item?.status === 'request' ? "text-slate-500" :
                                                                           item?.status === 'approve' ? "text-green-500" : 
                                                                           "text-red-500"} my-4`}
                                               />
                                            </div>
                                            <div className={"basis-1/2  text-right "}>
                                                <p className={"text-xs font-semibold capitalize"}>{item?.user_approver?.fullname}</p>
                                                <p className={"text-xs"}>{moment(item?.jadwal_approved?.tanggal_mulai).format("DD MMM YYYY")}</p>
                                                <p className={"text-xs"}>{item?.jadwal_approved?.shift?.shift}</p>
                                            </div>
                                        </div>
                                    // <div
                                    //     className={"flex justify-between items-center"}
                                    //     onClick={() => handleItemClick(item)}
                                    // >
                                    //     <div className={" py-2  rounded-md"}>
                                    //         <h1 className={"text-sm font-semibold"}>{item?.jadwal_approved?.shift?.shift}  </h1>
                                    //         <p className={"font-light text-xs capitalize"}>{item?.status}</p>
                                    //     </div>
                                    //     <div className={"text-xs font-semibold items-end"}>
                                    //         {moment(item?.jadwal_approved?.tanggal_mulai).format("D MMMM Y")}
                                    //     </div>
                                    //
                                    // </div>
                                )
                            }
                        </section>
                }
            </main>
            <FloatButton
                type={"primary"}
                icon={<PlusCircleOutlined/>}
                onClick={handleAddClick}
                className={""}
            />
        </IonContent>

        <JadwalModal
            selectedData={selectedItem}
            setSelectedData={setSelectedItem}
            isOpen={modal}
            setIsOpen={setModal}
        />
        <ApprovalModal
            selectedData={selectedItem}
            setSelectedData={setSelectedItem}
            isOpen={approvalModal}
            setIsOpen={setApprovalModal}
        />
    </IonPage>
}