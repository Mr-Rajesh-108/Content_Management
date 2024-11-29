// import mongoose from 'mongoose';
// import CryptoJS from 'crypto-js';

// const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Store the key securely in environment variables

// // Define the UserSchema
// const UserSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: [true, 'First name is required'],
//         trim: true,
//         maxlength: [50, 'First name cannot exceed 50 characters'],
//     },
//     lastName: {
//         type: String,
//         required: [true, 'Last name is required'],
//         trim: true,
//         maxlength: [50, 'Last name cannot exceed 50 characters'],
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
//         lowercase: true,
//     },
//     password: {
//         type: String,
//         required: [true, 'Password is required'],
//         minlength: [8, 'Password must be at least 8 characters long'],
//         select: false, // Excludes password by default in queries
//     },
//     cityDist: {
//         type: String,
//         required: [true, 'City/District is required'],
//         trim: true,
//     },
//     state: {
//         type: String,
//         required: [true, 'State is required'],
//         trim: true,
//     },
//     pinCode: {
//         type: Number,
//         required: [true, 'Pin code is required'],
//         min: [100000, 'Pin code must be at least 6 digits'],
//         max: [999999, 'Pin code must not exceed 6 digits'],
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
//     resetPasswordToken: String,
//     resetPasswordExpires: Date,
// }, {
//     timestamps: true,
//     autoIndex: true,
// });

// // Pre-save middleware to encrypt passwords
// UserSchema.pre('save', function (next) {
//     if (!this.isModified('password')) return next();

//     try {
//         // Encrypt the password using CryptoJS
//         this.password = CryptoJS.AES.encrypt(this.password, SECRET_KEY).toString();
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

// // Instance method to decrypt and compare passwords
// UserSchema.methods.comparePassword = function (candidatePassword) {
//     try {
//         // Decrypt the stored password
//         const bytes = CryptoJS.AES.decrypt(this.password, SECRET_KEY);
//         const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

//         // Compare the provided password with the decrypted one
//         return originalPassword === candidatePassword;
//     } catch (error) {
//         return false; // Return false if decryption fails
//     }
// };

// // Validation to prevent duplicate email entries
// UserSchema.path('email').validate(async function (value) {
//     const count = await mongoose.models.User.countDocuments({ email: value });
//     return count === 0;
// }, 'Email already exists');
// // Check if token is expired before deleting


// // Model creation, ensuring it is not redefined in development
// const User = mongoose.models.User || mongoose.model('User', UserSchema);

// export default User;
