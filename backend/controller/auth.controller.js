import db from "../config/dbconnect.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()

// export const test = (req, res) => {
//     res.send("auth testing is ongoing")
// }
// export const test2 = (req, res) => {
//     res.send("auth testing is ongoing type2")
// }

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await db.query("SELECT* FROM users");
        res.status(200).json({
            data: users,
        });

    } catch (error) {
        next(error);
    }
};

//login api
export const login = async (req, res, next) => {
    try {
        //1.get email and password from user side
        const { email, password } = req.body;

        //2.simple validation
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });

        }
        //check user is available in db
        const [result] = await db.execute("SELECT * FROM users WHERE email=?", [email]);
        //const [result] = await db.execute("SELECT id,name,email FROM users WHERE email=? AND password=?", [email, password]);

        const user = result[0];

        //3.user found?
        if (result.length === 0) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        //check the user's password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }



        //jsonwebtoken 
        const token = await jwt.sign({
            //user details
            id: user.id,
            name: user.name,
            email: user.email,
        },
            //secret key 
            process.env.SECRET_KEY,

            {
                //expirydate
                expiresIn: process.env.EXPIRES,
            });

        //storing token to cookie
        res.cookie("token1", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });

        //4.success then response
        res.status(200).json({
            message: "login successful",
            user: {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                token: token,
            }
        });

    } catch (error) {
        next(error);
    }
}
//signout APIs
export const signOut = async (req, res, next) => {
    try {
        res.clearCookie("token1");
        res.status(200).json({
            message: "successfully signed out"
        });
    } catch (error) {
        next(error);
    }
}
