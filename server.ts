import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || "";
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Read panjiri poster reference image if exists
const posterImagePath = path.join(__dirname, "public", "assets", "aistudio", "image_9615a613.png");
let posterBase64 = "";
if (fs.existsSync(posterImagePath)) {
  try {
    posterBase64 = fs.readFileSync(posterImagePath).toString("base64");
  } catch (err) {
    console.error("Could not load poster base64:", err);
  }
}

// API: AI Health & Panjiri Advisor
app.post("/api/ai/recommend", async (req, res) => {
  try {
    const { ageGroup, goal, dietaryPreference, notes } = req.body;
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is not configured." });
    }

    const prompt = `You are a master Ayurvedic nutrition and traditional Desi food artisan specializing in Shuddh Desi Ghee and Handcrafted Panjiri.
A customer has asked for a personalized Panjiri recommendation.
Customer details:
- Age / Stage: ${ageGroup || "Adult"}
- Primary Health Goal: ${goal || "General Energy & Immunity"}
- Dietary Preference: ${dietaryPreference || "Traditional"}
- Notes/Conditions: ${notes || "None"}

Please evaluate and return a strict JSON response with:
1. "recommendedVariety": One of ["Classic Panjiri", "Gond Panjiri", "Dry Fruits Panjiri", "Protein Panjiri", "Sugar Free Panjiri", "Special Royal Panjiri"]
2. "why": 2-3 sentences explaining the exact Ayurvedic & nutritional rationale.
3. "keyIngredients": array of 4-5 key ingredients specifically beneficial for them (e.g. "Gond (edible gum)", "California Almonds", "A2 Gir Cow Ghee", "Makhana", "Kesar").
4. "howToConsume": Best time and traditional ritual to eat it (e.g., 2 tablespoons morning with warm milk).
5. "sweetenerRecommendation": Best sweetener (e.g. Desi Shakkar, Pure Jaggery, Khandsari, or Stevia).
Return valid JSON only, without markdown fences if possible.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const data = JSON.parse(responseText);
      return res.json(data);
    } catch (apiErr) {
      console.warn("Gemini API spike or error, using artisanal Ayurvedic formulation fallback:", apiErr);
      
      // Intelligent rule-based Ayurvedic fallback tailored to user goal
      const g = (goal || "").toLowerCase();
      const a = (ageGroup || "").toLowerCase();

      if (g.includes("gond") || a.includes("mother") || a.includes("postpartum") || g.includes("spine")) {
        return res.json({
          recommendedVariety: "Gond Panjiri",
          why: "Gond (crispy edible acacia gum) fried in pure A2 Bilona Ghee is Ayurveda's gold standard for strengthening pelvic and lumbar ligaments, soothing postpartum fatigue, and replenishing joint lubrication.",
          keyIngredients: ["Crispy Popped Gond (Acacia Gum)", "California Almonds", "Pure A2 Cow Bilona Ghee", "Kamarkas Herb", "Makhana"],
          howToConsume: "Take 2 heaped tablespoons warm with a glass of warm milk every morning on an empty stomach.",
          sweetenerRecommendation: "Traditional Desi Shakkar for wholesome natural warmth."
        });
      } else if (g.includes("protein") || a.includes("fitness") || a.includes("gym")) {
        return res.json({
          recommendedVariety: "Protein Panjiri",
          why: "Packed with clean roasted chana sattu, crushed walnuts, pumpkin seeds, and chia seeds bound in pure bilona ghee for sustained muscle synthesis and glycogen recovery without synthetic powders.",
          keyIngredients: ["Roasted Chana Sattu", "Crushed Walnuts", "Raw Pumpkin & Chia Seeds", "Puffed Makhana", "Pure Cow Ghee"],
          howToConsume: "Consume 3 tablespoons as a pre-workout fuel or post-workout breakfast with warm oat or dairy milk.",
          sweetenerRecommendation: "Raw Unrefined Jaggery (Gud) for natural iron."
        });
      } else if (g.includes("sugar") || a.includes("diabetic")) {
        return res.json({
          recommendedVariety: "Sugar Free Panjiri",
          why: "Carefully formulated for zero glycemic spikes using pure botanical Stevia leaf extract, generous roasted almonds, walnuts, and makhana in pure A2 ghee.",
          keyIngredients: ["Pure Stevia Leaf Extract", "California Almonds", "Puffed Lotus Seeds", "A2 Gir Cow Ghee", "Green Cardamom"],
          howToConsume: "1-2 tablespoons with morning cinnamon tea or black coffee.",
          sweetenerRecommendation: "Pure Stevia Leaf Extract (Zero glycemic index)"
        });
      } else if (g.includes("royal") || g.includes("saffron")) {
        return res.json({
          recommendedVariety: "Special Royal Panjiri",
          why: "An imperial rejuvenation blend infused with precious Kashmiri saffron (Mongra Kesar), wild chilgoza pine nuts, and double-churned Gir cow ghee for cellular radiance and Ojas.",
          keyIngredients: ["Kashmiri Mongra Kesar", "Wild Pine Nuts (Chilgoza)", "Jumbo Cashews", "Crisp Gond", "A2 Bilona Ghee"],
          howToConsume: "2 tablespoons warm with saffron milk before bed or at breakfast.",
          sweetenerRecommendation: "Desi Khand"
        });
      } else {
        return res.json({
          recommendedVariety: "Dry Fruits Panjiri",
          why: "Over 60% concentration of slow-roasted almonds, cashews, pistachios, and makhana delivers sustained brain and muscle energy for peak winter vitality.",
          keyIngredients: ["California Almonds", "Jumbo Cashews", "Green Pistachios", "Crispy Makhana", "A2 Cow Ghee"],
          howToConsume: "Enjoy 2 heaped spoons with warm morning milk.",
          sweetenerRecommendation: "Khandsari Raw Cane Sugar"
        });
      }
    }
  } catch (err: any) {
    console.error("Recommendation error:", err);
    return res.status(500).json({ error: err.message || "Failed to generate recommendation" });
  }
});

// API: AI Video Generation for Panjiri
app.post("/api/video/generate", async (req, res) => {
  try {
    const { prompt: userPrompt, cameraMovement, lighting } = req.body;
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is not configured." });
    }

    const videoPrompt = `Cinematic 4K hyper-realistic video of authentic Indian Panjiri in a traditional heavy brass engraved bowl. ${userPrompt || "Slow motion zoom-in showing crispy golden roasted California almonds, whole cashews, puffed makhana lotus seeds, and shimmering edible gum gond glistening with pure golden liquid Desi Ghee. Gentle aromatic steam rises into the warm sunlit rustic kitchen."} Camera motion: ${cameraMovement || "Slow 360 degree orbit"}. Lighting: ${lighting || "Warm golden morning light"}.`;

    try {
      // Attempt Omni Flash generation if account has paid video permissions
      const interaction = await ai.interactions.create({
        model: "gemini-omni-1.1-flash",
        input: [
          ...(posterBase64
            ? [
                {
                  type: "image" as const,
                  mime_type: "image/png",
                  data: posterBase64,
                },
              ]
            : []),
          {
            type: "text" as const,
            text: videoPrompt,
          },
        ],
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: "video",
          aspect_ratio: "16:9",
          duration: "5s",
        },
      }, { timeout: 180000 });

      if (interaction.output_video?.data) {
        return res.json({
          success: true,
          videoData: `data:video/mp4;base64,${interaction.output_video.data}`,
          prompt: videoPrompt,
          engine: "gemini-omni-1.1-flash",
        });
      }
    } catch (omniErr: any) {
      console.warn("Omni video generation error:", omniErr.message);
      // If free tier rate limit or requires paid model flow, return clear message and fallback trigger
      return res.json({
        success: false,
        requiresPaidKey: omniErr.message?.includes("Rate limit exceeded") || omniErr.message?.includes("Free Tier") || omniErr.status === 429,
        message: omniErr.message?.includes("Rate limit exceeded")
          ? "Gemini Omni Flash Video generation requires a paid Google AI Studio API tier. You can view our high-definition interactive Panjiri Cinematic Reel or upgrade API tier."
          : (omniErr.message || "Video generation could not be completed with current quota."),
        simulated: true,
      });
    }

    return res.json({ success: false, message: "No video stream returned from model." });
  } catch (err: any) {
    console.error("General video generation error:", err);
    return res.status(500).json({ error: err.message || "Failed to process video generation request" });
  }
});

// Direct download endpoints for complete website packages
app.use(express.static(path.join(__dirname, "public")));

app.get("/website.zip", (_req, res) => {
  const filePath = path.join(__dirname, "public", "website.zip");
  if (fs.existsSync(filePath)) {
    res.download(filePath, "website.zip");
  } else {
    res.status(404).send("File not found");
  }
});

app.get("/api/download/source", (_req, res) => {
  const filePath = path.join(__dirname, "public", "website.zip");
  if (fs.existsSync(filePath)) {
    res.download(filePath, "website.zip");
  } else {
    res.status(404).send("File not found");
  }
});

app.get("/api/download/build", (_req, res) => {
  const filePath = path.join(__dirname, "public", "desi-ghee-panjiri-production-build.zip");
  if (fs.existsSync(filePath)) {
    res.download(filePath, "desi-ghee-panjiri-production-build.zip");
  } else {
    res.status(404).send("File not found");
  }
});

// Setup Vite dev server or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
