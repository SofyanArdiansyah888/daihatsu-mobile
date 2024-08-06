import UserEntity from "./user.entity";
import ShiftEntity from "./shift.entity";


export default interface JadwalSecurityEntity{
    id: number;
    user: UserEntity;
    tanggal: string;
    posisi: string;
    shift: ShiftEntity;
}