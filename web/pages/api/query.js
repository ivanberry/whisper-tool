const fs = require("fs");

import formidable, { errors as formidableErrors } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  // 1. check session
  // 2. check JWT value -> map to someone
  // 3. handle file to ai endpoint
  // 4. send data back to client

  const form = formidable({})

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({ success: false })
    } else {
      try {
        const data = await query(files.file[0]);
        res.status(200).json({ success: true, data });
      } catch {
        res.status(500).json({ success: false })
      }
    }
  })
}

async function query(file) {

  const response = await fetch(
    "https://api-inference.huggingface.co/models/openai/whisper-base",
    {
      headers: {
        Authorization: "Bearer " + process.env.NEXTAUTH_HUGGINGFACE_SECRET,
      },
      method: "POST",
      body: fs.readFileSync(file.filepath)
    }
  );
  const result = await response.json();
  return result;
}
