import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1d'})
}

export const registerUser = async (req, res) => {
    const { fullName, email, password,profileImageUrl } = req.body;

    if(!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fills are required' });
    }

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });
        res.status(201).json({
            _id: user._id,
            user,
            token: generateToken(user._id),
        });
    }catch (error) {
        res.status(500).json({ message: 'Error registering user',error:error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'All fills are required' });
    }

    try {
        const user = await User.findOne({ email });
        
        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            _id: user._id,
            user,
            token: generateToken(user._id),
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in user', error:error.message });
    }
};

export const getUserInfo = async (req, res) => {
    
};