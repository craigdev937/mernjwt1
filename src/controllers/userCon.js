import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/keys.js";
import { Users } from "../models/Users.js";

class People {
    Login = async (req, res, next) => {
        try {
            const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            res.status(200).json({msg: error.message})
        }
        const isPasswordValid = 
        await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({
                name: user.name, 
                email: user.email
            }, config.JWT_SECRET)
            return res.status(200).json({user: token})
        };
        } catch (error) {
            res.status(500).json({msg: error.message});
            next(error);
        }
    };

    Register = async (req, res, next) => {
        console.log(req.body);
        try {
            const newPassword = 
            await bcrypt.hash(req.body.password, 10);
            await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: newPassword
            })
            res.json({ status: "OK" });
        } catch (error) {
            res.status(500).json({msg: error.message});
            next(error);
        }
    };

    PostQuote = async (req, res, next) => {
        const token = req.headers["x-access-token"];
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            const email = decoded.email;
            await Users.updateOne(
                {email: email},
                { $set: { quote: req.body.quote }}
            );
            return res.status(200).json({status: "OK"})
        } catch (error) {
            res.status(500).json({msg: error.message});
            next(error);
        }
    };

    GetQuote = async (req, res, next) => {
        const token = req.headers["x-access-token"];
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            const email = decoded.email;
            const user = await Users.findOne({ email: email });
            return res.status(200)
            .json({quote: user.quote});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: error.message});
            next(error);
        }
    };
};

export const PEOPLE = new People();





