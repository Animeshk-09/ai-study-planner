import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first

import express from "express";
import { google } from "googleapis";

const router = express.Router();

// DEBUG
console.log("CLIENT_ID:", process.env.CLIENT_ID);
console.log("REDIRECT_URI:", process.env.REDIRECT_URI);

// ✅ OAuth client AFTER env loads
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// 🔐 STEP 1
router.get("/google", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
    prompt: "consent",
  });

  console.log("AUTH URL:", url);

  res.redirect(url);
});

// 🔁 STEP 2
router.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);

    global.userTokens = tokens;

    console.log("TOKENS SAVED:", tokens);

    res.send("✅ Google Connected");
  } catch (err) {
    console.error("❌ OAuth Error:", err);
    res.status(500).send("Authentication failed");
  }
});

export default router;