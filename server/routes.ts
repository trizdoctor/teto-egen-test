import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";

// Store for share pages
const sharePages = new Map<string, any>();

export async function registerRoutes(app: Express): Promise<Server> {
  // Create share page
  app.post("/api/share", (req, res) => {
    console.log("=== SHARE API DEBUG ===");
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    console.log("Request origin:", req.get('origin'));
    console.log("Request host:", req.get('host'));
    
    const { type, intensity, tetoPercentage, estrogenPercentage } = req.body;

    // Generate short random ID
    const shareId = Math.random().toString(36).substring(2, 8);
    
    console.log("Generated shareId:", shareId);

    // Store the share data
    const shareData = {
      type,
      intensity,
      tetoPercentage,
      estrogenPercentage,
      createdAt: Date.now(),
    };
    
    sharePages.set(shareId, shareData);
    console.log("Stored share data:", shareData);
    console.log("Current sharePages size:", sharePages.size);
    
    const response = { shareId };
    console.log("Sending response:", response);
    console.log("=== END SHARE API DEBUG ===");

    res.json(response);
  });

  // Serve share page
  app.get("/s/:shareId*", (req, res) => {
    console.log("=== SHARE PAGE DEBUG ===");
    console.log("Request URL:", req.url);
    console.log("Request params:", req.params);
    console.log("Request headers:", req.headers);
    
    // Extract shareId from the beginning of the path, ignoring the random suffix
    const fullPath = req.params.shareId + (req.params[0] || "");
    const shareId = fullPath.substring(0, 6); // Original shareId is always 6 characters
    
    console.log("Full path:", fullPath);
    console.log("Extracted shareId:", shareId);
    console.log("Available shareIds:", Array.from(sharePages.keys()));
    
    const shareData = sharePages.get(shareId);
    console.log("Found share data:", shareData);

    if (!shareData) {
      console.log("Share data not found, redirecting to /");
      console.log("=== END SHARE PAGE DEBUG ===");
      // Redirect to main page if share not found
      return res.redirect("/");
    }

    console.log("Generating HTML for share data");
    // Generate HTML with proper meta tags
    const html = generateShareHTML(shareData, shareId);
    console.log("Generated HTML length:", html.length);
    console.log("=== END SHARE PAGE DEBUG ===");
    res.send(html);
  });

  const httpServer = createServer(app);

  return httpServer;
}

function generateShareHTML(shareData: any, shareId: string) {
  const { type, intensity, tetoPercentage, estrogenPercentage } = shareData;

  // Define personality types data (simplified version)
  const personalityTypes: any = {
    "teto-male": {
      title: "테토남",
      intensityImages: {
        very_strong:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        strong:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        moderate:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        weak: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
      },
    },
    "estrogen-male": {
      title: "에겐남",
      intensityImages: {
        very_strong:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        strong:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        moderate:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        weak: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
      },
    },
    "teto-female": {
      title: "테토녀",
      intensityImages: {
        very_strong:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        strong:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        moderate:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        weak: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
      },
    },
    "estrogen-female": {
      title: "에겐녀",
      intensityImages: {
        very_strong:
          "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        strong:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        moderate:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        weak: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
      },
    },
  };

  const intensityLabels: any = {
    very_strong: "초강력",
    strong: "뚜렷한",
    moderate: "살짝",
    weak: "약한",
  };

  const typeData = personalityTypes[type];
  const intensityLabel = intensityLabels[intensity];
  const image =
    typeData?.intensityImages?.[intensity] ||
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630";

  const title = `나는 ${intensityLabel} ${typeData?.title} - 테토에겐 유형테스트`;
  const description = `나는 ${intensityLabel} ${typeData?.title}입니다! 테토 성향 ${tetoPercentage}%, 에겐 성향 ${estrogenPercentage}%`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="${process.env.NODE_ENV === "production" ? "https://your-domain.com" : "http://localhost:5000"}/s/${shareId}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    
    <script>
        // Redirect to main app immediately
        window.location.href = '/';
    </script>
</head>
<body>
    <div style="text-align: center; padding: 50px;">
        <h1>${title}</h1>
        <p>${description}</p>
        <p>잠시만 기다려주세요...</p>
        <a href="/" style="color: #3B82F6;">테스트 하러 가기</a>
    </div>
</body>
</html>`;
}
