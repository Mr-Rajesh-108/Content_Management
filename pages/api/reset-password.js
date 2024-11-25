import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import nodemailer from 'nodemailer';
import crypto from 'crypto'; // Import crypto for token generation

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT || 587),
            secure: process.env.EMAIL_PORT === "465",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

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

            // Generate a reset token
            const resetToken = crypto.randomBytes(32).toString('hex');

            // Set the token and expiration time in the user’s database record (pseudo code; adjust based on your schema)
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
            await user.save();

            // Construct reset password URL
            const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}&email=${email}`;

            // Send email with reset password link
            const info = await transporter.sendMail({
                from: `${process.env.APP_NAME}" App Support" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Reset Password Request",
                text: `Hello ${firstName}, please reset your password using the following link: ${resetUrl}`,
                html: `
                    <p>Hello ${firstName},</p>
                    <p>You requested to reset your password. Click the link below to set a new password:</p>
                    <a href="${resetUrl}">Reset Password</a>
                    <p>This link will expire in 1 hour.</p>
                `,
            });

            console.log("Message sent: %s", info.messageId);
            res.status(200).json({ message: 'Reset password email sent successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending email', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
