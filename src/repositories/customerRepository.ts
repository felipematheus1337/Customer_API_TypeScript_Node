import { AppDataSource } from "../database/data-source";
import { Customer } from "../models/Customer";

export const customerRepository = AppDataSource.getRepository(Customer);