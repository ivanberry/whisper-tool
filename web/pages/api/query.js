const fs = require("fs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uplods/" });

export default async function handler(req, res) {
  // 1. check session
  // 2. check JWT value -> map to someone
  // 3. handle file to ai endpoint
  // 4. send data back to client
  // req.body  is the file content

  const data = await query(req.body);

  res.status(200).json({ success: true, data });
}

async function query(filename) {
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("./uploads/");
  }
  //
  const data = fs.readFileSync(path.join("./uploads/", "123.m4a"));

  const response = await fetch(
    "https://api-inference.huggingface.co/models/openai/whisper-base",
    {
      headers: {
        Authorization: "Bearer " + process.env.NEXTAUTH_HUGGINGFACE_SECRET,
      },
      method: "POST",
      body: data,
    }
  );
  const result = await response.json();
  return result;
}
