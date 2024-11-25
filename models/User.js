import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    cityDist: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    pinCode: {
        type: Number,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;