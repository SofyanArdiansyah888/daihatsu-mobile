import UserEntity from "./user.entity";
import ShiftEntity from "./shift.entity";


export default interface JadwalSecurityEntity{
    id: number;
    user: UserEntity;
    tanggal: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    posisi: string;
    shift: ShiftEntity;
}