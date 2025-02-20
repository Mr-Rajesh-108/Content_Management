import { encryptPassword } from '@/lib/crypto';
import dbConnect from '@/lib/mongoose';
import Admin from '@/models/Admin';
// import bcrypt from 'bcryptjs';


export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    await dbConnect();

    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin user already exists' });
    }

    // Hash the password
    const hashedPassword = await encryptPassword(password)

    // Create the admin user
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin user created successfully!' });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
