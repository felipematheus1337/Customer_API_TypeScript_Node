import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User{


    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'text',nullable:false})
    name:string;

    @Column({type:'text',nullable:false})
    email:string;

    @Column({type:'text',nullable:false})
    password:string;
    

    
}