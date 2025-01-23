export class MessageObject {
    Errors: Array<Message>;
    Warnings: Array<Message>;
    Confirmation: Array<Message>;
    Informations: Array<Message>;
    ProcessingStatus: boolean;
    Data: Array<Message>;

    constructor(data: Partial<MessageObject>) {
        this.Confirmation = data.Confirmation || [];
        this.Errors = data.Errors || [];
        this.Informations = data.Informations || [];
        this.ProcessingStatus = data.ProcessingStatus || false;
        this.Warnings = data.Warnings || [];
        this.Data = data.Data || [];
    }
}

export class Message {
    Type: number;
    Code: string;
    Description: string;
    Field: string;

    constructor(data: Partial<Message>) {
        this.Type = data.Type || 0;
        this.Code = data.Code || '';
        this.Description = data.Description || '';
        this.Field = data.Field || '';
    }
}