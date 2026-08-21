/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Check Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Server-side Route for Gemini-Powered Website Proposal Generator
  app.post("/api/generate-demo", async (req, res) => {
    const { businessName, industry, description, pagesCount, themeStyle } = req.body;

    if (!businessName) {
       res.status(400).json({ error: "Business name is required." });
       return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Default High-Quality fallback system in case GM api key is missing / empty
    const fallbackDemo = {
      businessName: businessName || "Your Brand Studio",
      industry: industry || "Corporate Business",
      headline: `The Ultimate Website Built for ${businessName || "Your Business"}`,
      subheadline: `A high-converting, blazing fast website crafted exclusively to turn visitors into loyal clients. Starts generating leads in 7 days.`,
      aboutText: `With our custom web solution for ${businessName || "your business"}, we address your unique market challenges. Our designs are optimized for speed, mobile responsiveness, and intuitive customer paths, ensuring your business stands out and grows.`,
      colorScheme: {
        primary: "#E8602C", // Deep Saffron
        secondary: "#1A2B4A", // Midnight Navy
        background: "#FDF6EC", // Soft Cream
        textColor: "#1c1b1b"
      },
      keyFeatures: [
        {
          title: "Custom Customer Experience",
          description: `Designed specifically for the ${industry || "custom"} industry to build maximum credit and conversion rates.`,
          icon: "Sparkles"
        },
        {
          title: "100% Mobile Optimized",
          description: "Runs beautifully on smartphones, tablets, and desktops for modern NCR customers.",
          icon: "Smartphone"
        },
        {
          title: "Engineered for SEO & Leads",
          description: "Built-in Google rankings optimization and lightning fast load speed.",
          icon: "TrendingUp"
        }
      ],
      suggestedPages: Array.from({ length: Number(pagesCount) || 5 }, (_, i) => {
        const pages = ["Home", "About Us", "Our Services", "Real Works / Portfolio", "Contact Us", "Instant Booking", "F.A.Q."];
        return pages[i] || `Custom Subpage ${i + 1}`;
      }),
      ctaText: `Get a Free Proposal for ${businessName}`
    };

    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Return high-quality local mockup mock structure if no API key is set
      res.json(fallbackDemo);
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `You are an elite web design strategist and senior UI/UX developer at Webwala Studio (a premier web agency).
        A NCR prospective client is requesting a custom design proposal and simulated landing page content.

        Core details received from client:
        - Business Name: "${businessName}"
        - Industry: "${industry || "General Business"}"
        - Client's Custom Needs / Bio: "${description || "High professional services"}"
        - Planned Number of Pages: ${pagesCount || 5}
        - Preferred Theme / Color Mood Style: "${themeStyle || "Corporate/Modern Warm"}"

        Generate a JSON block for a high-impact, custom preview website proposal tailored perfectly to this brand.
        Make all text catchy, inspiring, localized, and specific to their selected industry (never generic).

        Follow this exact JSON architecture:
        {
          "businessName": string (match or clean up input business name),
          "industry": string (clean up name),
          "headline": string (a killer display headline for their hero section, e.g., "The Modern Booking Platform NCR Clinics Deserve"),
          "subheadline": string (persuasive, action-driven subheadline, explaining why they will stand out),
          "aboutText": string (a short professional about paragraph crafted specifically for them and their business),
          "colorScheme": {
            "primary": string (hex color for main accent, choose e.g. #E8602C for vibrant, #4e5e80 for blue/slate, #2E7D32 for medical, or other stylish HEX code based on user theme mood requested),
            "secondary": string (hex color for buttons/text, e.g. #1A2B4A or #1A1A1A),
            "background": string (hex color for canvas backdrop, e.g. #FDF6EC soft warm cream, #f0eded light slate, or dark charcoal/off-white),
            "textColor": string (hex color for body text readability)
          },
          "keyFeatures": [
            {
              "title": string (strong service/advantage, e.g. "Instant Slot Reservation" or "Responsive Menu Board"),
              "description": string (persuasive sentence explanation),
              "icon": string (use a standard Lucide react icon name such as: Sparkles, Smartphone, TrendingUp, Calendar, Scissors, Coffee, ShoppingBag, School, ShieldCheck, HeartPulse, HardHat, Camera, Layers, Globe)
            }
          ], // generate EXACTLY 3 features
          "suggestedPages": string[], // generate exactly ${pagesCount || 5} pages for the sitemap that represent a perfect user flow for their industry, e.g. ["Home", "Clinical Services", "Doctor Profiles", "Book Online", "Contact"]
          "ctaText": string (high-performing lead button text, e.g., "Schedule My First Appointment", "Explore Educational Board", etc.)
        }`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              businessName: { type: Type.STRING },
              industry: { type: Type.STRING },
              headline: { type: Type.STRING },
              subheadline: { type: Type.STRING },
              aboutText: { type: Type.STRING },
              colorScheme: {
                type: Type.OBJECT,
                properties: {
                  primary: { type: Type.STRING },
                  secondary: { type: Type.STRING },
                  background: { type: Type.STRING },
                  textColor: { type: Type.STRING }
                }
              },
              keyFeatures: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    icon: { type: Type.STRING }
                  },
                  required: ["title", "description", "icon"]
                }
              },
              suggestedPages: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              ctaText: { type: Type.STRING }
            },
            required: ["businessName", "industry", "headline", "subheadline", "aboutText", "colorScheme", "keyFeatures", "suggestedPages", "ctaText"]
          }
        }
      });

      const responseText = response.text?.trim() || "";
      const generatedData = JSON.parse(responseText);
      res.json(generatedData);
    } catch (err) {
      console.error("Gemini Generation Error:", err);
      // Fallback in case of parsing or execution errors
      res.json(fallbackDemo);
    }
  });

  // Integration with Vite inside Development Environment
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serving Static files in production
    const distPath = path.join(process.cwd(), "dist");

    // Serve prerendered per-route HTML (e.g. dist/faq/index.html) before
    // express.static, which would otherwise redirect "/faq" -> "/faq/".
    app.get("*", (req, res, next) => {
      if (req.path === "/") return next();
      const prerenderedPath = path.join(distPath, req.path, "index.html");
      if (fs.existsSync(prerenderedPath)) {
        res.sendFile(prerenderedPath);
        return;
      }
      next();
    });

    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
