import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { userName, email, password, firstName, lastName, bio, avatar }= req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({userName, email, password: hashedPassword, firstName, lastName, bio, avatar});
    try {
        await newUser.save()
        res.status(201).json('User created successfully!')
    } catch (error){
        next(error)
    }
    
}