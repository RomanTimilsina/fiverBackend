const setSharedVariable = (req, res, next) => {
  if (req.img !== null && req.img !== undefined) {
    const currentDate = new Date()
    req.newName = req.img + currentDate.toISOString()
    // console.log("req.img"+req.img)
  } else { 
    req.newName = ""
  }  next();
};

export default setSharedVariable;