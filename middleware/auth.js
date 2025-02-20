import { verifyToken } from '@/lib/jwt';

export const authenticate = (handler) => async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  req.user = decoded; // Add user info to the request object
  return handler(req, res);
};
