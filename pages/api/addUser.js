import { encryptPassword } from "@/lib/crypto";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await connectToDatabase();
            const {
                firstName,
                lastName,
                email,
                password,
                cityDist,
                state,
                pinCode
            } = req.body;
            if (!firstName || !email || !lastName || !password || !cityDist || !state || !pinCode) {
                return res.status(400).json({
                    message: 'Name and email are required'
                });
            };
            const existingUser = await User.findOne({
                email
            });
            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists'
                })
            };
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: encryptPassword(password),
                cityDist,
                state,
                pinCode
            });
            await newUser.save();
            res.status(201).json({
                message: 'User added successfully'
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: 'Failed to add user'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}