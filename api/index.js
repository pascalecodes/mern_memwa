//index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import Subscriber from './models/subscriber.model.js';
import cors from 'cors'



dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => { 
    console.log(err)
});

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.listen(7100, ()=> {
    console.log('Server is running on port 7100')
})

app.use('/api', postRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/posts', postRouter);


app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    //res.status(201).json({ message: 'Subscriber added successfully' });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'Subscriber added successfully!!!' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Handle Mongoose validation errors
      res.status(400).json({ message: err.message });
    } else if (err.code === 11000) {
      // Handle duplicate email error
      res.status(400).json({ message: 'Email already subscribed' });
    } else {
      // Handle other errors
      console.error('Error saving subscriber:', err);
      res.status(500).json({ message: 'Error saving subscriber' });
    }
  }
});

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  })

app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500; 
   const message = err.message || 'Internal Server Error'
   return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
   })
})
