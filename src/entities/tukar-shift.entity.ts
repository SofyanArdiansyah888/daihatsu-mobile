import ShiftEntity from "./shift.entity";
import JadwalSecurityEntity from "./jadwal-security";
import UserEntity from "./user.entity";

export default interface TukarShiftEntity {
    id: string;
    id_user_requester: string;
    id_user_approver: string;
    user_requester: UserEntity,
    user_approver: UserEntity,
    jadwal_approved: JadwalSecurityEntity,
    jadwal_requested: JadwalSecurityEntity,
    id_request_jadwal_security:string;
    id_approve_jadwal_security:string;
    catatan: string,
    status: string
}