//
// Created on 18.01.2026 (DD/MM/JJJJ)
//
// This API (getmythic.app/api/GameCompatabilityAPI) is used to get official and trusted information about the support of games.
// The function will return an emtry array if no entry for the requested game was found
// If this database doesnt have the needed information wether or not a game will run, use the CommunitySupportAPI.
// The CommunitySupportAPI returns all reviews for a game (written by community and not reviewed by anyone)
// This API returns all anything ==> Adding arguemts in data file is possible.

import { toNumber } from 'lodash';
import { getUserFromToken } from '../../utils/auth';
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const officialSupportFilePath = path.join(process.cwd(), 'data', 'OfficialSupport.json');
const officialSupport = JSON.parse(fs.readFileSync(officialSupportFilePath, 'utf8'));

// API handler function
export default async function handler(req, res) {
  if (req.query.game) {
    const { game } = req.query;

    if (!game) {
      return res.status(400).json({ error: 'Game parameter is required' });
    }

    const matchingEntries = officialSupport.filter(entry =>
      entry.game.toLowerCase().includes(game.toLowerCase())
    );

    return res.status(200).json(matchingEntries);
  } else if (req.query.submit) {
    return await handleSubmit(req, res);
  } else if (req.query.idcheck) {
    return res.status(200).json(1)
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

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7);
  const user = getUserFromToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { game, engine, notes, rating, ID, submittedAt } = req.body;

  if (!game || !engine || !rating || !ID) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }

  const submissionsFilePath = path.join(process.cwd(), 'data', 'submissions.json');

  let submissions = [];
  try {
    const data = await fsPromises.readFile(submissionsFilePath, 'utf8');
    submissions = JSON.parse(data);
  } catch (err) {
    // Datei existiert nicht → leeres Array
  }

  let RealID = await ValidateID() //The ID Value is broken for some reason, this just counts again...

  submissions.push({
    game,
    engine,
    notes: notes || '',
    rating,
    ID: RealID,
    submittedAt,
    submittedBy: await getNicknameByEmail(user.email)
  });

  await fsPromises.writeFile(submissionsFilePath, JSON.stringify(submissions, null, 2));

  return res.status(200).json({ success: true, message: 'Submission saved successfully' });
}

async function getNicknameByEmail(email) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const data = await fsPromises.readFile(filePath, 'utf8');

    const users = JSON.parse(data);

    const user = Array.isArray(users)
      ? users.find(u => u.email === email)
      : (users.email === email ? users : null);

    return user ? user.nickname : null;
  } catch (error) {
    return null;
  }
}

async function ValidateID() {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), 'data', 'submissions.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const submissions = JSON.parse(fileContents);
  const maxId = submissions.length > 0 ? Math.max(...submissions.map(s => s.ID || 0)) : 0;
  const nextId = maxId + 1
  return Number(nextId)
}

