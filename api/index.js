//index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import Subscriber from './models/Subscriber';

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => { 
    console.log(err)
});

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(7100, ()=> {
    console.log('Server is running on port 7100')
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

// Add a new subscriber to the collection
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  // Create a new Subscriber instance
  const subscriber = new Subscriber({ email });

  //**** fix user notifaication when */
  function displayMessage(message) {
  console.log(message);
  }

  // Save the subscriber to the database
  subscriber.save()
    .then(() => {
      displayMessage("Thank you for subscribing!");
      req.flash('Good job!')
      //res.redirect('/newSuccess');
    })
    .catch((err) => {
      console.error('Failed to save subscriber:', err);
      displayMessage(`Failed to subscribe: ${err}`);
      res.sendStatus(500);
    });
});

// Subscribe endpoint
// app.post('/api/subscribe', async (req, res) => {
//     const { email } = req.body;
  
//     try {
//       const subscriber = new Subscriber({ email });
//       await subscriber.save();
//       res.json({ message: 'Successfully subscribed!' });
//     } catch (error) {
//       console.error(error);
//       res.status(400).json({ message: 'Error subscribing. Email already exists or invalid.' });
//     }
//   });
  
//   // Check subscription status endpoint
//   app.get('/api/is-subscribed', async (req, res) => {
//     const { email } = req.query;
  
//     try {
//       const subscriber = await Subscriber.findOne({ email });
//       res.json({ isSubscribed: !!subscriber }); // Convert to boolean
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error checking subscription status.' });
//     }
//   });

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
