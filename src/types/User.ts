export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role?: USER_ROLES
    ) { }

    static toUserModel(data: any): User{
        return new User(data.id, data.name, data.email, data.password, data.role)
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }

    getEmail() {
        return this.email
    }

    getPassword() {
        return this.password
    }
    
    getRole() {
        return this.role
    }
}

export interface UserInputDTO{
    email: string,
    password: string
}

export interface LoginInputDTO{
    name: string,
    email: string,
    password: string,
    role: USER_ROLES
}
export interface UserDB{
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES
}