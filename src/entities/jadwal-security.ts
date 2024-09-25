import UserEntity from "./user.entity";
import ShiftEntity, {CheckpointHistory} from "./shift.entity";


export default interface JadwalSecurityEntity{
    id: number;
    id_user: string;
    user: UserEntity;
    tanggal: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    posisi: string;
    shift: ShiftEntity;
    checkpoint_history?: CheckpointHistory[]
}