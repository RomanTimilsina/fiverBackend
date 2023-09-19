import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req,res) => {
  //TODO

  try{
    const hash = bcrypt.hashSync(req.body.password, 5)
    const newUser = User({
      ...req.body,
      password: hash,
    })
 
    await newUser.save()
    res.status(201).send("User has been created.")
  }catch(err){
    res.status(500).send("error")
  }
}

export const loginUser = async (req,res) => {
  //TODO
  try {
    const user = await User.findOne({username:req.body.username}) 

    if (!user) return res.status(404).send("User not found")

    const isCorrect = bcrypt.compareSync(req.body.password, user.password) 
    if(!isCorrect) return res.status(400).send("Wrong username or password")

    const token = jwt.sign({
      id: user._id,
      isSeller: user.isSeller
    }, process.env.JWT_KEY)


    const {password, ...info} = user._doc;
    res.cookie("accessToken", token, {
      httpOnly: true
    }).status(200).send(info)
    console.log("done")
  } catch (err) {
    res.status(500).send("error")
  }
}

export const logoutUser = async (req,res) => {
  //TODO
  res.send("from controller")
}
