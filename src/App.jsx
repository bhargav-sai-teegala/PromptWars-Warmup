import { useState } from 'react';
import DayContextForm from './components/DayContextForm';
import MealPlan from './components/MealPlan';
import { GroceryList, BudgetFeasibility } from './components/GroceryAndBudget';
import { generateMealPlan } from './services/aiService';
import './index.css';

function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (context) => {
    setIsGenerating(true);
    setError(null);
    try {
      const generatedPlan = await generateMealPlan(context);
      setPlan(generatedPlan);
    } catch (err) {
      setError(err.message || 'Something went wrong while generating the plan.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container">

      <header className="header">
        <h1>AI Chef</h1>
        <p>Your intelligent, personalized daily cooking to-do list.</p>
      </header>

      <main className="main-grid">
        <aside>
          <DayContextForm onSubmit={handleGenerate} isGenerating={isGenerating} />
        </aside>
        
        <section style={{ position: 'relative' }}>
          {isGenerating && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <h3 style={{ color: 'var(--accent-primary)' }}>Cooking up a plan...</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Analyzing budget and dietary needs</p>
            </div>
          )}

          {error && (
            <div className="budget-alert warning" style={{ marginBottom: '1.5rem' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {plan && !isGenerating && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <MealPlan meals={plan.meals} />
              <div className="side-panel">
                <GroceryList groceryList={plan.groceryList} substitutions={plan.substitutions} />
                <BudgetFeasibility budgetAnalysis={plan.budgetAnalysis} />
              </div>
            </div>
          )}

          {!plan && !isGenerating && !error && (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <p>Enter your schedule and budget on the left to get a personalized cooking plan!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
