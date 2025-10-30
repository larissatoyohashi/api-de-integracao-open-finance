import Customer from "../models/Customers.js"
import { randomInt } from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWTsecret = process.env.JWTSECRET;

if (!JWTsecret) {
    console.error("ERRO GRAVE: JWT_SECRET não está definido nas variáveis de ambiente!");
    process.exit(1); // Para a aplicação se o segredo não existir
}


class customerService {

    async create( name, cpf , email, password){

            try {

            let newCustomerId;
            let idExists = true;

            while (idExists) {
                const randomNumber = randomInt(0, 999).toString().padStart(3, '0');
                newCustomerId = `cus_${randomNumber}`;
                const existingCustomer = await Customer.findById(newCustomerId);

                if (!existingCustomer) {
                    idExists = false;
                }

            }
                const saltRounds = 10; 
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                const newCustomer = new Customer ({
                    _id : newCustomerId,
                    name,
                    cpf,
                    email,
                    password: hashedPassword
                });
                await newCustomer.save()
            }catch (error){
                console.log(error);
            }
    }

    async getAll(){

        try {
            const customers = await Customer.find();
            return customers;
        } catch (error){
            console.log(error);
        }
    }

   async getOne(email) {
        try{
            const customer = await Customer.findOne({email : email}).select('+password');
            return customer;
        } catch(error){
                console.log(error)
            throw error;
            }
        }

    async getOneById(_id){
        try{
           const customer = await Customer.findById(_id);
        return customer;

        } catch(error){
            console.log(error);
        }
    }

    async getAccountsFromCustomers(_id){
        try{
           const customer = await Customer.findById(_id).select("accounts");
        return customer;

        } catch(error){
            console.log(error);
        }
    }

        

        async login(email, password) {
        
        const user = await this.getOne(email);

        if (!user) {
            throw new Error("Credenciais inválidas!");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Credenciais inválidas!");
        }

        try {
            const token = jwt.sign(
                { id: user._id, email: user.email },
                JWTsecret,
                { expiresIn: "48h" }
            );

            return { token: token };

        } catch (jwtError) {
            console.log("Erro ao gerar token JWT:", jwtError);
            throw new Error("Erro ao processar autenticação.");
        }
    }

    }


export default new customerService();