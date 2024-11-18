import { DataSource } from "typeorm";
import { User } from "./users/user.entity"; 
import { AddAddressColumnToUsers1731687197009} from "./migrations/1731687197009-AddAddressColumnToUsers"; 

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306, 
    username: "hanhpro", 
    password: "152004", 
    database: "test", 
    synchronize: false,
    logging: true,
    entities: [User], 
    migrations: [__dirname + "/migrations/*.ts"]
});
