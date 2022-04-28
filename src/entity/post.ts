import { Entity , Column ,PrimaryGeneratedColumn , ManyToOne } from "typeorm";
import { user } from "./user";


@Entity()
export class post{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    post_description : string;


    @Column()
    created_date:Date;

    @Column()
    userId: number;

    @ManyToOne(()=>user ,User =>User.Post)
    User:user;

}