import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createError from "../utils/CreateError.js"

export let registrationId;

export const registerUser = async (req, res, next) => {
  //TODO
  const date = new Date()

  registrationId =  Date.now() + '-' + Math.round(Math.random() * 1E9)
  try{
    const hash = bcrypt.hashSync(req.body.password, 5)
    console.log(req.body)
    const newUser = User({
      ...req.body,
      password: hash,
      img: req.body.img+'-'+`${registrationId}.png`,
    })
 
    await newUser.save()
    res.status(201).json({message:"User has been created.", registrationId})
  } catch(err) {
    next(err)
  }
}

export const loginUser = async (req, res, next) => {
  // TODO
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong username or password"));

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    ); 

    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    }).status(200).send(info);
    console.log("done");
  } catch (err) {
    next(err);
  }
};


export const logoutUser = async (req, res) => {
  
  res.clearCookie("accessToken", {
    sameSite: "None",
    secure: true,
  }).status(200).send("User has been logged out.");
};
