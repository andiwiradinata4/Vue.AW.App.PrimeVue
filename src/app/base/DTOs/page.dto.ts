export interface PageDTO {
    TotalCount: number;
    TotalPage: number;
    DataSet: Array<{ [key: string]: any }>;
}

export class PageDTO {
    TotalCount: number;
    TotalPage: number;
    DataSet: Array<{ [key: string]: any }>;

    constructor(data: Partial<PageDTO>) {
        this.TotalCount = data.TotalCount || 0;
        this.TotalPage = data.TotalPage || 0;
        this.DataSet = data.DataSet || [];
    }
}
