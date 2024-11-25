// pages/api/login.js
import dbConnect from '@/lib/mongoose';
import User from '../../models/User';
import { decryptPassword } from '@/lib/crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      const { email, password } = req.body;
      // console.log(email,password)
      // Input validation
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Decrypt and compare passwords
      const decryptedPassword = decryptPassword(user.password);
      if (password !== decryptedPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // If successful, return user details (excluding password)
      res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
