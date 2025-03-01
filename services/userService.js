import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js';

export async function registerUser(userData) {
  try {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return { status: 'Fail', message: 'User already exists' };
    }

    const newUser = new UserModel({
      name,
      email,
      password,  // Store the plain password
    });

    await newUser.save();

    return { status: 'Success', message: 'User registered successfully' };
  } catch (err) {
    return { status: 'Fail', message: err.message };
  }
}

export async function loginUser(userData) {
  try {
    const { email, password } = userData;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return { status: 'Fail', message: 'User not found' };
    }

    // Check if the passwords match directly (no hashing or comparison)
    if (user.password !== password) {
      return { status: 'Fail', message: 'Invalid credentials' };
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { status: 'Success', token };
  } catch (err) {
    return { status: 'Fail', message: err.message };
  }
}
