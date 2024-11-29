// pages/api/auth/reset-password.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../../utils/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { token, password } = req.body;

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password
        await db.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        // Delete the token record from database (optional)
        await db.passwordReset.deleteMany({ where: { userId } });

        return res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }
}
