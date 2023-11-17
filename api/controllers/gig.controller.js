import Gig from "../models/gig.model.js"
import createError from "../utils/CreateError.js";

export const createGig = async (req, res, next) => {
  if(!req.isSeller) return next(createError(403, "Only sellers can create a gig!"))

  const gig = new Gig({
    userId: req.userId,
    ...req.body,
  })

  try {
    const savedGig = await gig.save();
    res.status(201).json(savedGig)
  }catch(err) {
    next(err)
  }
}

export const deleteGig = async (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
}

export const getGig = async (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
}

export const getGigs = async (req, res, next) => {
  try {

  } catch(err) {
    next(err)
  }
}
