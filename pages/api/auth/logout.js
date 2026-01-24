export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Clear the token cookie
  res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');

  return res.status(200).json({ success: true });
}