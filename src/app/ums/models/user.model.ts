import { BaseModel } from "@/app/base/models/base.model";

export interface UserModel {
    Username: string;
    Name: string;
    NormalizedUserName: string;
    Email: string;
    NormalizedEmail: string;
    EmailConfirmed: boolean;
    PhoneNumber: string;
    PhoneNumberConfirmed: boolean;
    PasswordHash: string;
    LockoutEnd: Date;
    LockoutEnabled: boolean;
    AccessFailedCount: number;
}

export class UserModel extends BaseModel {
    Username: string;
    Name: string;
    NormalizedUserName: string;
    Email: string;
    NormalizedEmail: string;
    EmailConfirmed: boolean;
    PhoneNumber: string;
    PhoneNumberConfirmed: boolean;
    PasswordHash: string;
    LockoutEnd: Date;
    LockoutEnabled: boolean;
    AccessFailedCount: number;

    constructor(data: Partial<UserModel>) {
        super(data);
        this.Id = data.Id || '';
        this.Username = data.Username || '';
        this.Name = data.Name || '';
        this.NormalizedUserName = data.NormalizedUserName || '';
        this.Email = data.Email || '';
        this.NormalizedEmail = data.NormalizedEmail || '';
        this.EmailConfirmed = data.EmailConfirmed || false;
        this.PhoneNumber = data.PhoneNumber || '';
        this.PhoneNumberConfirmed = data.PhoneNumberConfirmed || false;
        this.PasswordHash = data.PasswordHash || '';
        this.LockoutEnd = data.LockoutEnd || new Date(2000, 1, 1);
        this.LockoutEnabled = data.LockoutEnabled || false;
        this.AccessFailedCount = data.AccessFailedCount || -1;
    }
}
