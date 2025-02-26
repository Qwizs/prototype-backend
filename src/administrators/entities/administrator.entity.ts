export class Administrator {
    // attributs
    public idAdministrator: number;
    public username: string;
    public password: string;

    // constructeur
    constructor(
        idAdministrator: number,
        username: string,
        password: string
    ) {
        this.idAdministrator = idAdministrator;
        this.username = username;
        this.password = password;
    }

}
