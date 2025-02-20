import { authenticate } from '@/middleware/auth'; // Middleware for authentication
import dbConnect from '@/lib/mongoose';

export default authenticate(async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await dbConnect();

  // Mock data or fetch actual data from the database
  const adminData = {
    message: 'This is protected admin data.',
    stats: {
      users: 120,
      sales: 450,
    },
  };

  res.status(200).json(adminData);
});
