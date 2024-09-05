import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

// Handle signup POST request
export const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password before saving it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user and store in the database
        const newUser = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, username: newUser.username } });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};
