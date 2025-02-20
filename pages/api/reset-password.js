import dbConnect from "@/lib/mongoose";
import { sendResetEmail } from "@/lib/sendResetMail";
import User from "@/models/User";
// import crypto,  from 'crypto';
import { generateToken, hashToken } from '../../lib/crypto';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();
            const { firstName, lastName, email } = req.body;
            if (!firstName || !lastName || !email) {
                return res.status(400).json({ message: 'Email, firstName, and lastName are required' });
            }

            const user = await User.findOne({ firstName, lastName, email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (user.resetPasswordToken && user.resetPasswordExpires > Date.now()) {
                return res.status(400).json({
                    message: 'Password reset link/mail has already been sent. Please check your email inbox (and spam folder) for further instructions.'
                });
            }
            const resetToken=generateToken();
            user.resetPasswordToken = hashToken(resetToken);
            user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1h
            await user.save();

            const resetLink = `${process.env.BASE_URL}/reset-password?token=${encodeURIComponent(resetToken)}`;
            try {
                const result = await sendResetEmail(email, firstName, resetLink);
                return res.status(200).json({ result })
            } catch (error) {
                return res.status(500).json({ result })
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending email', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
