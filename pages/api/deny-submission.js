import fs from 'fs';
import path from 'path';
import { getUserFromToken } from '@/utils/auth';

const submissionsFilePath = path.join(process.cwd(), 'data', 'submissions.json');
const configFilePath = path.join(process.cwd(), 'data', 'config.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = getUserFromToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Check if user is admin
  let config;
  try {
    const configData = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(configData);
  } catch (error) {
    console.error('Error reading config.json:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }

  const adminEmails = config.adminEmails || [];
  if (!adminEmails.includes(user.email)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing submission ID' });
  }

  try {
    const submissionsData = fs.readFileSync(submissionsFilePath, 'utf8');
    const submissions = JSON.parse(submissionsData);

    const updatedSubmissions = submissions.filter(sub => sub.ID !== id);

    fs.writeFileSync(submissionsFilePath, JSON.stringify(updatedSubmissions, null, 2));

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error denying submission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}