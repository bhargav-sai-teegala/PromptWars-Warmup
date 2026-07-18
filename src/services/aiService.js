import { GoogleGenAI } from '@google/genai';

// Initialize the API client. 
// We strictly read from import.meta.env.VITE_GEMINI_API_KEY for Vercel/production security.
export const generateMealPlan = async (context) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("No Gemini API key provided. Please configure VITE_GEMINI_API_KEY in your .env file or Vercel settings.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
You are a master chef and a budget-friendly meal planner AI.
The user will provide you with their context for the day, including:
- Available time
- Dietary restrictions
- Budget (in Indian Rupees - INR / ₹)
- Number of people

You MUST output a valid JSON object answering their context. 
Your output must exactly match this JSON schema:
{
  "meals": {
    "breakfast": { "title": "...", "description": "...", "prepSteps": ["...", "..."], "timeEstimate": "..." },
    "lunch": { "title": "...", "description": "...", "prepSteps": ["...", "..."], "timeEstimate": "..." },
    "dinner": { "title": "...", "description": "...", "prepSteps": ["...", "..."], "timeEstimate": "..." }
  },
  "groceryList": [
    { "item": "...", "category": "...", "estimatedCost": 0.00 }
  ],
  "substitutions": [
    { "original": "...", "replacement": "...", "reason": "..." }
  ],
  "budgetAnalysis": {
    "totalEstimatedCost": 0.00,
    "isWithinBudget": true,
    "advice": "..."
  }
}

Important Rules:
1. Provide actionable prep steps in 'prepSteps' array that a user can use as a checklist.
2. Keep recipes simple and well-suited for their provided time constraints.
3. Keep the costs realistic and make sure to calculate 'totalEstimatedCost' accurately.
4. If their budget is too low, suggest substitutions or cheaper ingredients and set 'isWithinBudget' appropriately.
`;

  const userPrompt = `
Here is my context for today:
Time available: ${context.time}
Dietary needs: ${context.diet}
Budget: ${context.budget}
Number of people: ${context.people}

Please generate my daily cooking to-do list.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.7,
      }
    });

    const text = response.text;
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw new Error("Failed to generate meal plan. Please check your API key and try again.");
  }
};
