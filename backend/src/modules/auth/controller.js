import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from './model.js';

const sign = (user) =>
  jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = sign(user);
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (e) {
    res.status(500).json({ message: 'Register failed', error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = sign(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (e) {
    res.status(500).json({ message: 'Login failed', error: e.message });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: 'Fetch me failed', error: e.message });
  }
};
