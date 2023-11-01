const jwt=require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    //validate user with token
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req._id = decoded._id; // Attach the decoded user data to the request object for later use
      next();
    });
  };
  
  
  module.exports = verifyToken