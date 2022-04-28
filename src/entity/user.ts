import { Entity, PrimaryGeneratedColumn, Column , DeleteDateColumn ,OneToMany } from "typeorm"
import { post } from "./post";
@Entity()
export class user {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;


    @Column()
    phone: string;

@DeleteDateColumn({name:'deletedAt'})
deletedAt : Date;


    @OneToMany(()=>post , Post=>Post.User)
    Post:post[];
}
