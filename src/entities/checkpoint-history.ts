import CheckpointEntity from "./checkpoint.entity";
import ShiftEntity from "./shift.entity";
import UserEntity from "./user.entity";

export default interface CheckpointHistoryEntity {
    id: number
    checkpoint:CheckpointEntity;
    shift: ShiftEntity;
    user: UserEntity;
    group_hour: string;
    gambar: string;
    catatan: string;
    created_at: string;
    updated_at: string;
}