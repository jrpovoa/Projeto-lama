import * as bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export class HashManager {
    public async hash(text: string): Promise<string> {
        const rounds = Number(process.env.BCRYPT_COST)
        const salt = await bcrypt.genSalt(rounds)
        const hash = await bcrypt.hash(text, salt)

        return hash
    }

    public async compare(text: string, hash:string):Promise<boolean>{
        return bcrypt.compare(text,hash)
    }
}
