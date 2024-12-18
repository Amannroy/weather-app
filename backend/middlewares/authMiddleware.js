import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const isAuthenticated = (req, res, next) => {
    // Extracting token from authorization header
    const token = req.header('Authorization') && req.headers.authorization.split(" ")[1];
    // If no token  is present, return an unauthorized error
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }
    try{
        // Verifying the token using JWT and secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attching the user ID from the decoded token to the request objecy
        req.userId = decoded.id;

        next();
    }catch(err){
        return res.status(401).json({message: "Invalid token"});
    }
}