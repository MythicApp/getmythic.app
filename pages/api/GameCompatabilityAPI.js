//
// Created on 18.01.2026 (DD/MM/JJJJ)
//
// This API (getmythic.app/api/GameCompatabilityAPI) is used to get official and trusted information about the support of games.
// The function will return an emtry array if no entry for the requested game was found
// If this database doesnt have the needed information wether or not a game will run, use the CommunitySupportAPI.
// The CommunitySupportAPI returns all reviews for a game (written by community and not reviewed by anyone)

import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const officialSupportFilePath = path.join(process.cwd(), 'data', 'OfficialSupport.json');
const officialSupport = JSON.parse(fs.readFileSync(officialSupportFilePath, 'utf8'));

// API handler function
export default async function handler(req, res) {
  if (req.query.game) {
    const { game } = req.query;

    if (!game) {
      return res.status(400).json({ error: 'Game parameter is required' });
    }

    // Filter entries where the game name includes the query (case-insensitive)
    const matchingEntries = officialSupport.filter(entry =>
      entry.game.toLowerCase().includes(game.toLowerCase())
    );

    return res.status(200).json(matchingEntries);
  } else if (req.query.submit) {
    return await handleSubmit(req, res);
  } else {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }
}
//Example for the returned array: [{"game":"Rocket League","engine":"0.6.0","notes":"Game runs perfectly on high settings."}]

// Function to handle new game submissions. The submissions are saved to /data/submissions.json
async function handleSubmit(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { game, engine, notes } = req.body;

  if (!game || !engine) {
    return res.status(400).json({ error: 'Missing game or engine in request body' });
  }

  const submissionsFilePath = path.join(process.cwd(), 'data', 'submissions.json');

  let submissions = [];
  try {
    const data = await fsPromises.readFile(submissionsFilePath, 'utf8');
    submissions = JSON.parse(data);
  } catch (err) {
    // File doesnt exist, start with empty array
  }

  submissions.push({
    game,
    engine,
    notes,
    submittedAt: new Date().toISOString()
  });

  await fsPromises.writeFile(submissionsFilePath, JSON.stringify(submissions, null, 2));

  return res.status(200).json({ success: true, message: 'Submission saved successfully' });
}



//To Submit a new Game use this code
fetch('/api/GameCompatabilityAPI?submit=1', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    game: 'Among Us',
    engine: 'Steam'
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));