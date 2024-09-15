import exp from "node:constants";
import CheckpointEntity from "./checkpoint.entity";
import JadwalSecurityEntity from "./jadwal-security";

export default interface ShiftEntity{
    id: string
    shift: string;
    dari: string;
    sampai: string;
    checkpoint_history?: CheckpointHistory[]
    jadwal_security_active?: JadwalSecurityEntity[]
    created_at?: string;
    updated_at?: string;

}

export interface CheckpointHistory{
    id: number
    id_shift: string;
    checkpoint: CheckpointEntity;
    id_checkpoint: string;
    id_user:string;
    group_hour: string;
    gambar: string;
    catatan: string;
    created_at?: string;
    updated_at?: string;
}