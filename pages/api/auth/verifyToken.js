import { verifyToken } from '@/lib/jwt';

export default function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) return res.status(401).json({ valid: false });

  res.status(200).json({ valid: true, user: decoded });
}
