import CheckpointHistoryEntity from "./checkpoint-history";

export default interface CheckpointEntity {
    id: number
    checkpoint:string;
    qrcode: string;
    deskripsi: string;
    latitude?: number;
    longitude?: number;
    radius: number;
    created_at?: string;
    updated_at?: string;
    checkpoint_history?: CheckpointHistoryEntity
}