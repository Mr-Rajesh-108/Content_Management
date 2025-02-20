import dbConnect from '@/lib/mongoose';
import Admin from '@/models/Admin';
import { signToken } from '@/lib/jwt';
import { decryptPassword } from '@/lib/crypto';
// import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  // console.log(username,password);
  

  await dbConnect();

  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  const hashPassword = decryptPassword(admin.password)
  console.log(hashPassword);
  
  console.log(admin);

  // const isValidPassword = await bcrypt.compare(password, admin.password);
  if (password !== hashPassword) {

    return res.status(401).json({ error: 'Invalid credentials password not Match' });

  }
  const token = signToken({ id: admin._id, role: 'admin' });
  res.status(200).json({ token });
  localStorage.setItem('token',token)
}