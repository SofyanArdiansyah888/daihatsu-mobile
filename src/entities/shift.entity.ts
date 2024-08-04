import exp from "node:constants";

export default interface ShiftEntity{
    id: number
    shift: string;
    dari: string;
    sampai: string;
    checkpoint_history?: CheckpointHistory[]
    created_at?: string;
    updated_at?: string;

}

export interface CheckpointHistory{
    id: number
    id_shift: string;
    id_checkpoint: string;
    id_user:string;
    group_hour: string;
    gambar: string;
    catatan: string;
    created_at?: string;
    updated_at?: string;
}