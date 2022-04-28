import { getRepository } from "typeorm";
import {Request ,Response} from 'express';
import { post } from "../entity/post";

export const createpost = async(req:Request , res:Response)=>{
try{
    if(!req.body){
        res.status(302).send({
            message: "content can not be empty!",
        });
        return;
    }
    // Create post data for request body 
    const {post_description, created_date, userId } = req.body;
   const postRepository = getRepository(post)

   //Create post 
   const Post = await postRepository.create({
       post_description,
       created_date,
    userId
   });
   console.log("check created date",created_date,post_description,userId);
   //Save user in database 
   await postRepository.save(Post);
   res.status(200).send({
       message: " post has been created successfully.",
       Data:Post
   })
}catch(error){
    console.log("Error",error);
    res.status(500).send({
        message: "Could not create post"
    });
}
};

export const getallpost =async (req:Request , res:Response) => {
try{
    const postRepository = getRepository(post)
   const Data = await postRepository.find();
   res.send({message:"All post",Data})
}catch (error){
    console.log("Error",error)
    res.status(500).send({message: error.message||"could not find post"})
}
};

export const getpostbyid =async (req:Request , res:Response) => {
try{
    const ID = req.params.id;
    const postRepository = getRepository(post)
    const userwithid = await postRepository.find({
        where:{id:ID},
    })
    res.send(userwithid);
}catch (error){
    console.log("error",error)
    res.status(500).send({message:"Some error occure while get post with id"})
}
}; 


export const updateuserbyid = async(req:Request , res:Response)=>{
    try{
        const {post_description , created_date , userId} = req.body;
        const postRepository =getRepository(post)
        await postRepository.update(Number(req.params.id),{
           post_description  , 
           created_date,
           userId
        });


         const data = await postRepository.findOne({
             where : {id : req.params.id},
         });
        res.send({message:"post updated sucessfully" , DATA:data})
    }catch (error){
        console.log("Error",error)
        res.status(500).send({message:error.message||"could not update post"});
    }
};


export const deletepost =async (req:Request, res:Response) => {
    try{
        const ID =req.params.id;
        const postRepository = getRepository(post)
        const deletepost = await postRepository.find({
            where:{id:ID},
        })
        await postRepository.remove(deletepost);
    res.send({message:"Post deleted sucesfully",data:deletepost})
    }catch (error){
        console.log("Error",error)
        res.status(500).send({Message:"Could not delete post"});
    }
};