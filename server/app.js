const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const cors=require('cors');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();
const app = express();
app.use(cors("*"))


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);
app.get("/api/auth",authMiddleware, async(req,res)=>{
  const userId= req.user._id;
  res.status(200).json({ success: true, userId });

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
