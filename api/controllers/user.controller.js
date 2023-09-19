import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const deleteUser = async (req,res) => {
  const user = await User.findById(req.params.id)
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not authenticated!")

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (payload.id.toString() !== user._id.toString()) {
      return res.status(403).send(user._id)
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(403).send("deleted")
  })
}

export const fn = (req,res) => {
  //TODO
  res.send("from controller")
}

export const fnn = (req,res) => {
  //TODO
  res.send("from controller")
}
