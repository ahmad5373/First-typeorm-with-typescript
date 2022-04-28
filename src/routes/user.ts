import * as express from 'express';
import {Router} from 'express';
import {createuser ,getalluser ,getuserById ,updateUserById ,getuserpostwithquerybuilder 
,getuserwithquerybuilder,getsingleuserwithquerybuilder,deleteUserById 
,getuserwithpost,getuserpostwithId } from '../controller/user_controller';


const router:Router =express.Router();


router.post("/createuser" , createuser);
router.get("/getalluser" , getalluser);
router.get("/getalluserpost" , getuserwithpost);
router.get("/getuserpost/:id" , getuserpostwithId);
router.get("/getuserpostwithquery/:id",getuserpostwithquerybuilder);
router.get("/getuserwithquery/:id" ,getsingleuserwithquerybuilder);
router.get("/getuserwithquery" ,getuserwithquerybuilder);
router.get("/getuser/:id" , getuserById);
router.put("/updateuser/:id" , updateUserById);
router.delete("/deleteuser/:id", deleteUserById);

export default router;