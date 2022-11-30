import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customer')
export class Customer {


    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'text',nullable:false})
    name:string;

    @Column({type:'text',nullable:true})
    phone:string;

    @Column({type:'text',nullable:false})
    address:string;

    @Column({type:'integer'})
    loyalty:number;
    

    
}