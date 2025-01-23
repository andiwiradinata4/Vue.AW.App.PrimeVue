import { FieldElementItem } from "@/app/base/models/fieldelementitem";
import { BaseModel } from "@/app/base/models/base.model";
export interface FieldElement {
    Code: string;
    Name: string;
    Description: string;
    AppProjectId: string;
    AppProject: any;
    Fields: Array<FieldElementItem>;
}

export class FieldElement extends BaseModel {
    Code: string;
    Name: string;
    Description: string;
    AppProjectId: string;
    AppProject: any;
    Fields: Array<FieldElementItem>;

    constructor(data: Partial<FieldElement>) {
        super(data);
        this.Code = data.Code || '';
        this.Name = data.Name || '';
        this.Description = data.Description || '';
        this.AppProjectId = data.AppProjectId || '';
        this.AppProject = data.AppProject || {};
        this.Fields = (data.Fields || []).map(field => new FieldElementItem(field));
    }
}
