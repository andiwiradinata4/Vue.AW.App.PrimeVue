import { FieldElementItem } from "@/app/base/models/fieldelementitem";
import { BaseModel } from "@/app/base/models/base.model";
export interface FieldElement {
    Code: string;
    Name: string;
    Description: string;
    AppProjectId: string;
    AppProject: any;
    RowPerPageOptions: Array<number>;
    ScrollHeight: any;
    Label: string;
    ShowLabel: boolean;
    Loading: boolean;
    Fields: Array<FieldElementItem>;
}

export class FieldElement extends BaseModel {
    Code: string;
    Name: string;
    Description: string;
    AppProjectId: string;
    AppProject: any;
    RowPerPageOptions: Array<number>;
    ScrollHeight: any;
    Label: string;
    ShowLabel: boolean;
    Loading: boolean;
    Fields: Array<FieldElementItem>;

    constructor(data: Partial<FieldElement>) {
        super(data);
        this.Code = data.Code || '';
        this.Name = data.Name || '';
        this.Description = data.Description || '';
        this.AppProjectId = data.AppProjectId || '';
        this.AppProject = data.AppProject || {};
        this.RowPerPageOptions = data.RowPerPageOptions || [5, 10, 20, 50];
        this.ScrollHeight = data.ScrollHeight || '480px';
        this.Label = data.Label || '';
        this.ShowLabel = data.ShowLabel || false;
        this.Loading = data.Loading !== undefined ? data.Loading : false;
        this.Fields = (data.Fields || []).map(field => new FieldElementItem(field));
    }
}
