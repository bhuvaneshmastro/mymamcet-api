import express from 'express';
import { encrypt } from '../services/enc_dec/encrypt-decrypt.js';
import { getUser, verifyToken } from '../services/auth/token.js';
import { db } from '../../config/db.js';
const userRouter = express.Router();

userRouter.get('/details', verifyToken, getUser, (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ success: false, message: "Invalid user", user: false });
  } else {
    const data = encrypt(req.user);
    res.status(200).json({ success: true, message: "User has verified", user: true, data: data });
  }
});

userRouter.post('/change-profile-photo', verifyToken, getUser, async (req, res) => {
  const user = req.user;

  try {
    const result = await db.collection('users').updateOne(
      { _id: new Object(user._id) },
      { $set: { photo: req.body.data } }
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true, message: 'Profile photo updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found or profile photo not updated' });
    }
  } catch (err) {
    console.error('Error updating profile photo:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

userRouter.post('/add', (req, res) => {
  console.log(req.body);

  res.status(200).json({ success: true, message: "Employee has been added" });
})

export { userRouter }