import createError from "../utils/CreateError.js";
import jwt from "jsonwebtoken"; // Add this import statement

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return  next(createError(401, "You aren't authenticated!"))

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"))
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next()
  })
}