import express from "express";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { loginSchema, registerSchema } from "../validations/authValidation.js";
import UsersRepository from "../repository/usersRepository.js";
import ApiResponse from "../helpers/apiResponse.js";
import MailerRepository from "../repository/mailerRepository.js";
import { JWT_SECRET } from "../config.js";


class AuthController {
    static async register(req, res) {
        try {
            const body = req.body;
            const validator = vine.compile(registerSchema);
            const payload = await validator.validate(body);
    
            const findUser = await UsersRepository.getUserByEmail(payload.email);
    
            if (findUser) {
                const errors = {
                    email: "Email already taken. Please use another one."
                };
                return ApiResponse.send(res, null, errors, null);
            }
    
            const salt = bcrypt.genSaltSync(10);
            payload.password = bcrypt.hashSync(payload.password, salt);
    
            const user = await UsersRepository.createUser(payload.username, payload.email, payload.password)
    
            if (!user) {
                const errors = {
                    message: "Something went wrong. Please try again."
                };
                return ApiResponse.send(res, null, errors, null);
            }

            return ApiResponse.send(res, payload, null, null);
        } catch (error) {
            console.log("Error: ", error);
            if (error instanceof errors.E_VALIDATION_ERROR) {
                const errors = error.messages;

                return ApiResponse.send(res, null, errors, null);
            } else {
                const errors = {
                    "message": "Something went wrong. Please try again"
                }
                return ApiResponse.send(res, null, errors, null);
            }
        }
    }

    static async login(req, res) {
        try {
            const body = req.body;
            const validator = vine.compile(loginSchema);
            const payload = await validator.validate(body);
    
            const findUser = await UsersRepository.getUserByEmail(payload.email);
    
            if (!findUser) {
                const errors = {
                    message: "No user found with this email"
                };
                return ApiResponse.send(res, null, errors, null);
            }
            console.log(findUser);
            console.log("password", payload);
    
            if (!bcrypt.compareSync(payload.password, findUser.passwordHash)) {
                const errors = {
                    message: "Invalid Credentials"
                };
                return ApiResponse.send(res, null, errors, null);
            }
    
            const payloadData = {
                id: findUser.id,
                username: findUser.username,
                email: findUser.email
            };
            const token = jwt.sign({
                userId: payloadData.id, 
                username: payloadData.username,
                email: payloadData.email
            }, JWT_SECRET, {
                expiresIn: "365d",
                algorithm: "HS256"
            });

            const sendEmail = MailerRepository.sendEmailTo(payloadData.email, token);


            return ApiResponse.send(res, payloadData, null, null);

        } catch (error) {
            console.log("Error: ", error);
            if (error instanceof errors.E_VALIDATION_ERROR) {
                const errors = error.messages;

                return ApiResponse.send(res, null, errors, null);
            } else {
                const errors = {
                    "message": "Something went wrong. Please try again"
                }
                return ApiResponse.send(res, null, errors, null);
            }
        }
    }

    static async confirmation(req, res) {
        try {
            const { token } = req.params;
            
            const payloadData = jwt.verify(token, JWT_SECRET);
            const findUser = await UsersRepository.getUserById(payloadData.userId);
    
            if (!findUser) {
                const errors = {
                    message: "Incorrect token"
                };
                return ApiResponse.send(res, null, errors, null);
            }

            const activateUser = await UsersRepository.activationUser(findUser.id);
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000
            });
            
            const data = {
                "message": "Token added in cookie"
            };

            return ApiResponse.send(res, data, null, null);
        } catch (error) {
            console.log("Error: ", error);
            if (error instanceof errors.E_VALIDATION_ERROR) {
                const errors = error.messages;

                return ApiResponse.send(res, null, errors, null);
            } else {
                const errors = {
                    "message": "Something went wrong. Please try again"
                }
                return ApiResponse.send(res, null, errors, null);
            }
        }
    }

    static async logout(req, res) {
        res.cookie("jwt", {
            httpOnly: true,
            expiresIn: new Date(0)
        });
        res.redirect("/");
    }
}


export default AuthController;