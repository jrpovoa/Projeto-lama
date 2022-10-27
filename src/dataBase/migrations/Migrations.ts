import { BaseDatabase } from "../BaseDatabase";

class Migrations extends BaseDatabase {
    execute = async () => {
        try {
            console.log("Creating tables")
            await this.createTables()
            console.log("Tables created successfully!")
        } catch (error: any) {
            console.log(error.message)
        }
    }

    createTables = async () => {
        await this.getConnection().raw(`

        CREATE TABLE lama_user(
            id VARCHAR (255) PRIMARY KEY,
            name VARCHAR (255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM("ADMIN", "NORMAL") DEFAULT "NORMAL" NOT NULL
            );
            
            CREATE TABLE lama_shows(
            id VARCHAR(255) PRIMARY KEY,
            band VARCHAR(255) NOT NULL,
            starts_at DATE NOT NULL
            );
            
            CREATE TABLE lama_tickets(
            id VARCHAR (255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            show_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES lama_user(id),
            FOREIGN KEY (show_id) REFERENCES lama_shows(id)
            );
        
        `)
    }
}

const migrations = new Migrations()

migrations.execute()