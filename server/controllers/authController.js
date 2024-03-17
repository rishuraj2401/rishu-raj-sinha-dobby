const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

exports.signup = async (req, res) => {
  const { name, username, password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, password: hashedPassword });
    const token = jwt.sign({ id: user._id,username:username }, config.secret, { expiresIn: '1h' });
    res.status(200).json({ success: true, token, user});
    // res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user._id,username:username }, config.secret, { expiresIn: '1h' });
    res.status(200).json({ success: true, token, user});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
