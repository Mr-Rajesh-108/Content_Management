import nodemailer from 'nodemailer';

export const sendResetEmail = async (email, resetLink,firstName) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT || 587),
            secure: process.env.EMAIL_PORT === "465",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: `${process.env.APP_NAME}" App Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset Password Request",
            text: `Hello ${firstName}, please reset your password using the following link: ${resetLink}`,
            html: `
        <p>Hello ${firstName},</p>
        <p>You requested to reset your password. Click the link below to set a new password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
    `,
        });
        return ({ Message: "Reset email sent successfully." });
    } catch (error) {
        console.error("Failed to send email:", error);
        return ({ error: "Could not send email",error });
    }
};
