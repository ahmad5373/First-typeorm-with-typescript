import * as express from 'express';
import Router from 'express';
import{createpost , getallpost, getpostbyid,updateuserbyid,deletepost}from '../controller/post_controller';

const router:Router = express.Router();

router.post("/createpost" , createpost);
router.get("/getallpost" , getallpost);
router.get("/getpost/:id" , getpostbyid);
router.put("/updatepost/:id" , updateuserbyid);
router.delete("/deletepost/:id", deletepost);
export default router;