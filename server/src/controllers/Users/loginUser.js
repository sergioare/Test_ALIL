import { User } from "../../models/users.js";
import { schemaLogin } from "../../validations/login.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const loginUser = async (req, res, next) => {
    const { email, password} = req.body;
    //Validations
    const {error} = schemaLogin.validate(req.body)
    if (error) return res.status(400).json({error: error.details[0].message});

    //Find in PostgreSQL tables
    const user = await User.findOne({where:{ email:email}})
    if(!user) return res.status(400).json({error: true, message: "Email doesn´t exist"})

    //Compare encrypted passwords
    const validPassword = await bcrypt.compare(password, user.hashedPassword)
    if(!validPassword) return res.status(400).json({error: true, message: "Password incorrect"})

    //Access Token
    const token = jwt.sign({
        id: user.id,
        name: user.username
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error:null,
        data: {token}
    })

    res.json({error:null, message: "Welcome", token})
}