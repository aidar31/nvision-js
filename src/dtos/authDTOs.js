


export class RegisterUserDTO {
    username; 
    email;
    password;

    constructor(data) {
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
    }
}


export class LoginUserDTO {
    id;
    username;
    email;

    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
    }
}

