import fs from 'fs';
import path from 'path';
import { getUserFromToken } from '@/utils/auth';

const submissionsFilePath = path.join(process.cwd(), 'data', 'submissions.json');

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

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing submission ID' });
  }

  try {
    const submissionsData = fs.readFileSync(submissionsFilePath, 'utf8');
    const submissions = JSON.parse(submissionsData);

    // Find the submission and check ownership
    const submission = submissions.find(sub => sub.ID === id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    if (submission.submittedBy !== user.nickname) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updatedSubmissions = submissions.filter(sub => sub.ID !== id);

    fs.writeFileSync(submissionsFilePath, JSON.stringify(updatedSubmissions, null, 2));

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}