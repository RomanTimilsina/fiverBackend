import Conversation from "../models/conversation.model.js"

export const createConversation = async(req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.bod.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: !req.isSeller ? req.userId : req.body.to,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller, 
  })
  try {
    const savedConversation = await newConversation.save()

    res.status(201).send(savedConversation)
  } catch (err) {
    next(err)
  }
}

export const updateConversation = async(req, res, next) => {
  
  try {

  } catch (err) {
    next(err)
  }
}

export const getSingleConversation = async(req, res, next) => {
  
  try {

  } catch (err) {
    next(err)
  }
}

export const getConversations = async(req, res, next) => {
  
  try {

  } catch (err) {
    next(err)
  }
}
