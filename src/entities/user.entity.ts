export default interface UserEntity {
    id: number
    name: string;
    nik: string;
    fullname: string;
    role: "security" | "warga" | "admin";
    email: string;
    telepon: string;
    password?: string;
    created_at?: string;
    updated_at?: string;
}