# 🧑‍🍳 AI Chef - PromptWars Warmup Challenge

A dynamic, intelligent cooking to-do list micro-app built for the Google for Developers PromptWars Hackathon.

## 🚀 Overview

This AI-powered application generates a personalized daily meal plan based on a user's schedule, dietary restrictions, budget, and party size. 

It satisfies all core requirements of the warmup challenge by providing:
- A structured **Breakfast, Lunch, and Dinner plan** with interactive prep checklists.
- An intelligent **Grocery List** with cost estimations.
- Smart ingredient **Substitutions** based on dietary needs.
- **Budget Feasibility Logic** to determine if the plan fits the user's constraints.

## 🏆 Evaluation Criteria Alignment

- **High Impact (Code Quality & Alignment):** Modular React components, clean separation of concerns (API logic separated into `aiService.js`), and strict adherence to the problem statement.
- **Medium Impact (Security & Efficiency):** Secrets are kept out of the codebase. The Gemini API key is strictly loaded via environment variables (`VITE_GEMINI_API_KEY`), ensuring secure Vercel deployment without exposing keys in the UI or source code.
- **Low Impact (Testing & Accessibility):** Configured with **Vitest** for unit testing (run `npm test`). Includes semantic HTML (`htmlFor`/`id` bindings) to ensure accessibility for screen readers.
- **Real GenAI Logic:** Absolutely **NO mock data**. Every meal plan is dynamically generated using the `@google/genai` SDK and the `gemini-2.5-flash` model.

## ⚙️ Setup & Local Testing

To evaluate this project locally, you must provide a valid Google Gemini API key.

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

3. **Run the App:**
   ```bash
   npm run dev
   ```

4. **Run the Tests (Optional):**
   ```bash
   npm test
   ```

## 🌐 Deployment

This project is built with Vite and is perfectly configured for Vercel. 
To deploy, simply link the repository to Vercel and add `VITE_GEMINI_API_KEY` to the Vercel Environment Variables configuration.
