import jwt, { decode } from "jsonwebtoken"
import UsersRepository from "../repository/usersRepository.js";
import { JWT_SECRET } from "../config.js";

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send("Not authorized, no token!");
        }
    
        const decoded = jwt.verify(token, JWT_SECRET); 
    
        if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
            return res.status(401).send("Not authorized, token failed");
        }
        req.user = await UsersRepository.getUserById(Number(decoded.userId));

        next(); 
    } catch (error) {
        console.error(error);  
        res.status(401).send("Unauthorized");
    }
}


export default authMiddleware;