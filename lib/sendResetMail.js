import nodemailer from "nodemailer";

export const sendResetEmail = async (email, firstName, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    await transporter.sendMail({
      from: `${process.env.APP_NAME} App Support <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Password Request",
      text: `Hello ${firstName}, please reset your password using the following link: ${resetLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 20px;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; max-width: 500px; width: 100%; box-shadow: 0 2px 4px rgba(0,0,0,0.1); border: 1px solid #e5e5e5;">
            <h1 style="font-size: 20px; color: #333333; text-align: center; margin-bottom: 20px;">Password Reset Request</h1>
            <p style="color: #333333; font-size: 16px;">Hello <strong>${firstName}</strong>,</p>
            <p style="color: #333333; font-size: 16px;">You requested to reset your password. Click the button below to set a new password:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #4f46e5; border-radius: 4px; text-decoration: none; font-size: 16px;">Reset Password</a>
            </div>
            <p style="color: #666666; font-size: 14px;">This link will expire in 1 hour. If you didn’t request a password reset, you can safely ignore this email.</p>
            <p>Do not share any another person</p>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;">
            <p style="color: #999999; font-size: 12px; text-align: center;">&copy; 2024 ${process.env.APP_NAME}. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    return { Message: "Reset email sent successfully." };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { error: "Could not send email", error };
  }
};
