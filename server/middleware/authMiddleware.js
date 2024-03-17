const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("error");
    return res.status(403).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
