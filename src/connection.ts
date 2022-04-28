import "reflect-metadata"
import { createConnection } from "typeorm"

createConnection({
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "crud",
    synchronize: false,
    logging: false,
    entities: [__dirname + "/entity/*.ts"],
    migrations: [],
    subscribers: [],
})
.then( connection =>{
    console.log("connection is establish sucessfuly")
}).catch (error => console.log(error));
