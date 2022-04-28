import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { user } from "../entity/user";
import { post } from "../entity/post";

export const createuser = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(302).send({
        message: "content can not be empty!",
      });
      return;
    }
    //Creating content for request body
    const { name, email, phone } = req.body;

    const userRepository = getRepository(user);
    const existinguser = await userRepository.findOne({
      where: { email: email },
    });

    if (existinguser) {
      res.status(400).send({
        message: "Email is already exist",
      });
    } else {
      //Create  a new user
      const User = await userRepository.create({
        name,
        email,
        phone,
      });
      //Save user in databasae
      await userRepository.save(User);
      res.status(200).send({
        message: "User has been created successfully",
        data: User,
      });
    }
  } catch (error) {
    console.log("could not create user", error);
    res.status(500).send({
      message: error.message || "Some error occure while creating user",
    });
  }
};

export const getalluser = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(user);
    const data = await userRepository.find();
    console.log("All Users data", data);
    res.send({ message: "All user ", data });
  } catch (error) {
    console.log("Error", error);
    return res.status(302).send({
      message: "Could not get user",
    });
  }
};

export const getuserwithpost = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(user);
    const data = await userRepository.find({
      relations: { Post: true },
    });

    res.send({ message: "all user with post", data });
  } catch (error) {
    console.log("Error", error);
    return res.status(302).send({
      message: "Could not get All user with post",
    });
  }
};

export const getuserpostwithId = async (req: Request, res: Response) => {
  try {
      const userID = req.params.id
    const userRepository = getRepository(user);
    const data = await userRepository.findOne({
      relations: { Post: true },
      where: { id: userID },
    });

    res.send({ message: "Single user with All post", data });
  } catch (error) {
    console.log("Error", error);
    return res.status(302).send({
      message: "Could not get All user with post",
    });
  }
};

export const getuserById = async (req: Request, res: Response) => {
  try {
    const ID = req.params.id;
    const userRepository = getRepository(user);
    const userid = await userRepository.find({
      where: { id: ID },
    });
    console.log("User with id", userid);
    res.send(userid);
  } catch (error) {
    console.log("ERROR", error);
    res.status(302).send({
      message: `cannot find user with id`,
    });
  }
};

export const getsingleuserwithquerybuilder = async (req:Request , res:Response)=>{
    try{

        const ID = req.params.id;
        const userRepository = getRepository(user)
        const User = await userRepository.createQueryBuilder()
        .select("user")
        .where("user.id = :id" ,{id:ID})
        .getMany()

        res.status(200).send({
            message:"User Data", Date: User
            
        });
    }catch(error){
        console.log("Error",error)
        res.status(400).send({
            message:"could not get user data"
        });
    }
};

export const getuserwithquerybuilder = async (req:Request , res:Response)=>{
    try{

        const userRepository = getRepository(user)
        const User = await userRepository.createQueryBuilder()
        .select("user")
       .getMany()

        res.status(200).send({
            message:"User Data", Date: User
            
        });
    }catch(error){
        console.log("Error",error)
        res.status(400).send({
            message:"could not get user data"
        });
    }
};

export const getuserpostwithquerybuilder = async(req:Request , res:Response)=>{
try{
    const ID = req.params.id;
    const userRepository = getRepository(user);
   const User = await  userRepository.createQueryBuilder()
    .leftJoinAndSelect("user.Post", "Post")
    .where("user.id = :id", { id: ID})
    .getOne();

res.status(200).send({message:"Getting user relation with post",
Date :User});
   console.log("user from database" , User);
}catch (error) {
        console.log("Error",error)
        res.status(400).send({
            message:"could not get user with querybuilder"
        });
}
};
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    const userRepository = getRepository(user);
    await userRepository.update(Number(req.params.id), {
      name,
      email,
      phone,
    });
    const data = await userRepository.findOne({
      where: { id: req.params.id },
    });
    console.log("updated data", data);
    if (data !== null) {
      res.status(200).send({
        message: `user has been updated Successfuly`,
        Data: data,
      });
    } else {
      res.status(302).send({
        message: `Cannot update user with id Maybe user was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(400).send({
      message: "could not update user",
    });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(user);
    const deleted = await userRepository.find({
      where: { id: req.params.id },
    });
    await userRepository.remove(deleted);
    console.log("deleted user", deleted);
    res.status(200).send({
      message: "User deleted sucessfully!",
      userData: deleted,
    });
  } catch (error) {
    console.log("error", error);
    res.status(302).send({
      message: error.message || "could not delete user",
    });
  }
};
