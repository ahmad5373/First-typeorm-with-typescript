import * as express from 'express';
import {Application} from 'express';
import {Request , Response} from 'express';
import { createConnection } from "typeorm";
import  user from './routes/user';
import post from './routes/post';

createConnection().then(async (connection) => {
    const PORT = process.env.PORT||3000;
    const app:Application =express();

    //Testing
app.get("/" ,(req: Request , res: Response)=>{
    res.send("Hello this is first typeOrm project")
})

//Express.json() Use a middlerware
app.use(express.json())

//Using express middleware in this main file
app.use("/user" ,user);
app.use("/post" ,post);




app.listen(PORT,()=>{
    console.log(`Server is listening on port :http://localhost:${PORT}`)
}); 

}).catch(error => console.log("Enable to connect with database",error))
