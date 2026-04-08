//
// Created on 18.01.2026 (DD/MM/YYYY)
//
// This API is used to get community reviews of the compatability of games.
// For official compatability rating use the GameCompatabilityAPI.

const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  const { game } = req.query;

  if (!game) {
    return res.status(400).json({ error: 'Game name is required' });
  }

  const filePath = path.join(process.cwd(), 'data', 'submissions.json');

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const submissions = JSON.parse(data);
    const matches = submissions.filter(sub => sub.game === game);
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read submissions' });
  }
}

// Example of the returned text: [{"game":"Rocket League","engine":"0.6.0","notes":"The game works great on my M4 Pro","submittedAt":"2026-01-18T14:42:14.480Z"},{"game":"Rocket League","engine":"0.5.0","notes":"The game works perfectly! I have more than 500 fps!","submittedAt":"2026-01-18T14:42:37.083Z"}]