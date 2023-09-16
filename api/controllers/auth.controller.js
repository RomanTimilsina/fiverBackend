import User from "../models/user.model.js"

export const registerUser = async (req,res) => {
  //TODO

  try{
    const newUser = User(req.body)

    await newUser.save()
    res.status(201).send("User has been created.")
  }catch(err){
    res.status(500).send("ërror")
  }
}

export const loginUser = async (req,res) => {
  //TODO
  res.send("from controller")
}

export const logoutUser = async (req,res) => {
  //TODO
  res.send("from controller")
}
