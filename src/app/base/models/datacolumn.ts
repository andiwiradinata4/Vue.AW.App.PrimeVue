export interface DataColumn {
    Label: string;
    Key: string;
    Type: string;
}

export class DataColumn {
    Label: string;
    Key: string;
    Type: string;

    constructor(data: Partial<DataColumn>) {
        this.Label = data.Label || '';
        this.Key = data.Key || '';
        this.Type = data.Type || 'text';

    }
}