const Image = require('../models/Image');

exports.uploadImage = async (req, res) => {
  try {
    const {name, imageUrl, user} = req.body;
    // const image = req.file;
    // const userID= mongoose.Types.ObjectId(user)
    const newImage = await Image.create({ name, imageUrl, user });
    res.status(201).json({ success: true, message: 'Image uploaded successfully', image: newImage });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getUserImages = async (req, res) => {
  try {
    const { name } = req.query;
    const userId = req.user._id;
    if(!name){
    const images = await Image.find({ user: userId });
    // console.log("if is worki");
    res.status(200).json({ success: true, message:"if is working" ,data:images });}
    else{
      const images = await Image.find({ name: { $regex: new RegExp(name, 'i') }, user: userId });

      res.status(200).json({success: true,message:"else is working", data: images, userId });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

