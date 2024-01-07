import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const receivedData = req.body;
    if (!receivedData) {
      return res.status(400).json({ error: 'Empty request body' });
    }

    const filePath = path.join(process.cwd(), 'JSONs', 'orders.json');
    const rawdata = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(rawdata);

    for (let i of receivedData) {
      data.push(i);
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    res.status(200).json({ message: 'Post body received successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
