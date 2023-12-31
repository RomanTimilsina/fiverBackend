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
    const gig = await Gig.findById(req.params.id);

    console.log('Retrieved gig:', gig);

    if (!gig) {
      console.log('Gig not found.');
      return next(createError(404, "Gig not found."));
    }

    if (gig.userId !== req.userId) {
      console.log(`usersId:${req.userId}`)
      console.log(`gigsUserId:${gig.userId}`)

      console.log('User does not have permission to delete this gig.');
      return next(createError(403, "You can delete only your own gig!"));
    }

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig deleted.");
  } catch (err) {
    console.error('Error deleting gig:', err);
    next(err);
  }
};


export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id)

    if (!gig) return next(createError(404, "No such gigs!"))
    console.log(gig)
    res.status(200).send(gig)
  } catch(err) {
    next(err)
  }
}

export const getGigs = async (req, res, next) => {
  const q = req.query
  const filter = {
    ...(q.userId && {userId:q.userId}),
    ...(q.cat && {cat:q.cat}),
    ...((q.min || q.max) && {price:{...(q.min && {$gt:q.min}), ...(q.max && {$lt:q.max})}}),
    ...(q.search && {title:{$regex:q.search, $options: "i"}})
  }

  try {
    const gigs = await Gig.find(filter).sort({[q.sort]: -1})

    if (!gigs) return next(createError(404, "Gig not found!"))

    res.status(200).send(gigs)
  } catch(err) {
    next(err)
  }
}



