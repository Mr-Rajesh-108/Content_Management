// pages/api/auth/forgot-password.js
import { sendResetEmail } from '../../../utils/email'; // Utility to send emails
import { generateToken } from '../../../utils/token'; // Utility for tokens
// import db from '../../../utils/db'; // Database connection
import dbConnect from '@/lib/mongoose';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;

    try {
        // Check if the email exists in the database
        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Generate a reset token and save it in the database
        const token = generateToken(user.id);
        await db.passwordReset.create({
            data: { token, userId: user.id, expiresAt: new Date(Date.now() + 3600000) }, // Expires in 1 hour
        });

        // Send a reset link via email
        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
        await sendResetEmail(email, resetLink);

        return res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong.' });
    }
}
