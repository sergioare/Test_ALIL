import {User} from "../../models/users.js";
import { schemaRegister } from "../../validations/schemaRegister.js";
import bcrypt from 'bcrypt'

export const createUser = async (req, res, next) => {
    const { username, email, password} = req.body;
    const {error} = schemaRegister.validate(req.body)
    
    try {
        const userEmailExist = await User.findAll({ where: { email: email } });
        
        if (error) return res.status(400).json({error: error.details[0].message});
        if (userEmailExist.length) return res.status(400).send({ message: "User already exists" });
        
        //pass hashed
        const salts = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salts)
        
      await User.create({ username, email, hashedPassword});
      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      res.send(error);
    }
  };