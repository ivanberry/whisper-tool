const fs = require("fs");

import formidable, { errors as formidableErrors } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // 1. check session
  // 2. check JWT value -> map to someone
  // 3. handle file to ai endpoint
  // 4. send data back to client

  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({ success: false, error: err });
    } else {
      try {
        const { translate, toImage } = fields;
        const data = await query({
          audio: files.file[0],
          translate: translate[0] === "false" ? false : true,
        });
        res.status(200).json({ success: true, data });
      } catch (err) {
        console.log("errors: ", err);
        res.status(500).json({ success: false, error: err });
      }
    }
  });
}

async function query(data) {
  const { audio, translate } = data;
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    headers: {
      Authorization: "Token " + process.env.REPLICATE_API_TOKEN,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      version:
        "23241e5731b44fcb5de68da8ebddae1ad97c5094d24f94ccb11f7c1d33d661e2",
      input: {
        audio,
        translate,
      },
    }),
  });
  const result = await response.json();
  return result;
}
