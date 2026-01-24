import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-SET-A-PROPER-SECRET-KEY-BEFORE-USE';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let users = [];
    try {
      const data = await fsPromises.readFile(usersFilePath, 'utf8');
      users = JSON.parse(data);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, nickname: user.nickname }, JWT_SECRET, { expiresIn: '1d' });

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=86400`);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}