import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

export const verifyToken = (req, res, next) => {
  console.log("verifyToken hit")
  console.log("auth header:", req.headers.authorization)
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: "Please login" })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decodedToken
    next()
  } catch (err) {
    res.status(401).json({ message: "Session expired, please login again" })
  }
}
