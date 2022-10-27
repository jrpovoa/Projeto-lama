import { UserDatabase } from "../dataBase/UserDatabase"
import { Conflict } from "../errors/Conflict"
import { MissingFields } from "../errors/MissingFields"
import { ValueTypeError } from "../errors/ValueTypeError"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { LoginInputDTO, User, UserInputDTO, USER_ROLES } from "../types/User"

export class UserBusiness {
    constructor(
       private userDatabase: UserDatabase,
       private hashManager:HashManager,
       private idGenerator:IdGenerator,
       private authenticator:Authenticator

    ){}

    public createUser = async(input: LoginInputDTO) => {

        const { name, email, password, role } = input

        if (!name || !email || !password) {
            throw new MissingFields()
        }

        if (typeof name !== 'string') {
            throw new ValueTypeError(`Input 'name' should be a string!`)
        }

        if (typeof email !== 'string') {
            throw new ValueTypeError(`Input 'email' should be a string!`)
        }

        if (typeof password !== 'string') {
            throw new ValueTypeError(`Input 'password' should be a string!`)
        }

        if (name.length < 3) {
            throw new ValueTypeError(`Input 'name' should have at least 3 characters.`)
        }

        if (password.length < 6) {
            throw new ValueTypeError(`Input 'password' should have at least 6 characters.`)
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new ValueTypeError(`${email} is not a valid email.`)
        }

        //const userDatabase = new UserDatabase()
        const checkEmail = await this.userDatabase.getUserByEmail(email)

        if (checkEmail) {
            throw new Conflict(`Email already exists.`)
        }

        //const idGenerator = new IdGenerator()
        const id = this.idGenerator.generateId()

        //const hashManager = new HashManager()
        const hashedPassword = await this.hashManager.hash(password)
        const user = new User(id, name, email, hashedPassword, role)

        await this.userDatabase.insertUser(user)
        //const authenticator = new Authenticator()
        const token = this.authenticator.generate({ id, role })

        const response = {
            message: `User '${name}' has been created!`,
            token: token
        }

        return response

    }

    public loginUser = async (input: UserInputDTO) => {

        const { email, password } = input

        if (!email || !password) {
            throw new MissingFields()
        }

        if (typeof email !== 'string') {
            throw new ValueTypeError(`Input 'email' should be a string!`)
        }

        if (typeof password !== 'string') {
            throw new ValueTypeError(`Input 'password' should be a string!`)
        }

        if (password.length < 6) {
            throw new ValueTypeError(`Password not valid.`)
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new ValueTypeError(`Email not vaild.`)
        }

        // const userDatabase = new UserDatabase()

        const user = await this.userDatabase.getUserByEmail(email)

        if (!user) {
            throw new Conflict(`Wrong email or password.`)
        }

        // const hashManager = new HashManager()
        const verifyPassword = await this.hashManager.compare(password, user.getPassword())
        if (!verifyPassword) {
            throw new Conflict(`Wrong email or password.`)
        }

        // const authenticator = new Authenticator
        const token = this.authenticator.generate({ id: user.getId(), role: user.getRole() as USER_ROLES })

        const response = {
            message: `Login successfully!`,
            token: token
        }

        return response
    }
}

