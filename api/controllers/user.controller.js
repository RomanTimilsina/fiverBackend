import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import createError from "../utils/CreateError.js"

export const deleteUser = async (req,res) => {
  const user = await User.findById(req.params.id)

    if (req.userId.toString() !== user._id.toString()) {
      return next(createError(403, "You can delete only your own account!"))
    }
    await User.findByIdAndDelete(req.params.id)
    next(createError(403, "deleted"))
}

export const fn = (req,res) => {
  //TODO
  res.send("from controller")
}

export const fnn = (req,res) => {
  //TODO
  res.send("from controller")
}
