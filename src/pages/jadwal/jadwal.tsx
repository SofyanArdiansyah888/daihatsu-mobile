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
import moment from "moment";
import {useAuth} from "../../providers/auth-provider";
import ApprovalModal from "./component/approval-modal";


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
        }
    })

    function handleBack() {
        history.replace("/beranda")
    }

    function handleItemClick(item: TukarShiftEntity) {
        setSelectedItem(item)
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

            <NavHeader
                handleClick={handleBack}
                title={"Tukar Jadwal"}
                withBackButton={false}
                icon={<FilterTanggal
                    filterPayload={filterPayload}
                    changeFilterPayload={changeFilterPayload}
                />}
            />
            <main className={"p-4"}>
                {
                    isLoading ? <SkeletonLoading/> :
                        <section className={" space-y-2"}>
                            <EmptyData
                                data={data?.data}
                                fullscreen={true}
                            />
                            {
                                data?.data?.map((item: TukarShiftEntity) =>
                                    <div
                                        className={"flex justify-between items-center"}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <div className={" py-2  rounded-md"}>
                                            <h1 className={"text-sm font-semibold"}>{item?.jadwal_approved?.shift?.shift}  </h1>
                                            <p className={"font-light text-xs"}>{item?.status ? "Disetujui" : "Belum Disetujui"}</p>
                                        </div>
                                        <div className={"text-xs font-semibold items-end"}>
                                            {moment(item?.jadwal_approved?.tanggal).format("D MMMM Y")}
                                        </div>

                                    </div>
                                )
                            }
                        </section>
                }
            </main>
            <FloatButton
                type={"primary"}
                icon={<PlusCircleOutlined/>}
                onClick={handleAddClick}
                className={"mb-12"}
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