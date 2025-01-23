export interface BaseModel {
    Id: string;
    LogDateUTC: Date;
    LogDate: Date;
    LogBy: string;
    LogByUserDisplayName: string;
    LogInc: number;
    CreatedDateUTC: Date;
    CreatedDate: Date;
    CreatedBy: string;
    CreatedByUserDisplayName: string;
    Remarks: string;
    Disabled: boolean;
    RowVersion: string;
}

export class BaseModel {
    Id: string;
    LogDateUTC: Date;
    LogDate: Date;
    LogBy: string;
    LogByUserDisplayName: string;
    LogInc: number;
    CreatedDateUTC: Date;
    CreatedDate: Date;
    CreatedBy: string;
    CreatedByUserDisplayName: string;
    Remarks: string;
    Disabled: boolean;
    RowVersion: string;

    constructor(data: Partial<BaseModel>) {
        this.Id = data.Id || '';
        this.LogDateUTC = data.LogDateUTC || new Date(2000, 1, 1);
        this.LogDate = data.LogDate || new Date(2000, 1, 1);
        this.LogBy = data.LogBy || '';
        this.LogByUserDisplayName = data.LogByUserDisplayName || '';
        this.LogInc = data.LogInc || 0;
        this.CreatedDateUTC = data.CreatedDateUTC || new Date(2000, 1, 1);
        this.CreatedDate = data.CreatedDate || new Date(2000, 1, 1);
        this.CreatedBy = data.CreatedBy || '';
        this.CreatedByUserDisplayName = data.CreatedByUserDisplayName || '';
        this.Remarks = data.Remarks || '';
        this.Disabled = data.Disabled || false;
        this.RowVersion = data.RowVersion || '';
    }
}
