export interface TokenDTO {
    Username: string;
    Email: string;
    AccessToken: string;
    ValidFrom: Date;
    ValidTo: Date;
    RefreshToken: string;
    Issuer: string;
    Audience: string;
}

export class TokenDTO {
    Username: string;
    Email: string;
    AccessToken: string;
    ValidFrom: Date;
    ValidTo: Date;
    RefreshToken: string;
    Issuer: string;
    Audience: string;

    constructor(data: Partial<TokenDTO>) {
        this.Username = data.Username || '';
        this.Email = data.Email || '';
        this.AccessToken = data.AccessToken || '';
        this.ValidFrom = data.ValidFrom || new Date(2000, 1, 1);
        this.ValidTo = data.ValidTo || new Date(2000, 1, 1);
        this.RefreshToken = data.RefreshToken || '';
        this.Issuer = data.Issuer || '';
        this.Audience = data.Audience || '';
    }
}
