import { useState } from 'react';
import { FaClock, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const MealCard = ({ mealType, mealData }) => {
  const [completedSteps, setCompletedSteps] = useState(
    mealData.prepSteps.reduce((acc, _, i) => ({ ...acc, [i]: false }), {})
  );

  const toggleStep = (index) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!mealData) return null;

  return (
    <div className="meal-card">
      <div className="meal-header">
        <span className="meal-type">{mealType}</span>
        <span className="meal-time" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--accent-primary)' }}>
          <FaClock /> {mealData.timeEstimate}
        </span>
      </div>
      
      <h3 className="meal-title" style={{ marginBottom: '0.5rem' }}>{mealData.title}</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>{mealData.description}</p>
      
      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Prep Checklist</h4>
        <ul className="prep-list">
          {mealData.prepSteps.map((step, idx) => {
            const isCompleted = completedSteps[idx];
            return (
              <li key={idx} className={`prep-item ${isCompleted ? 'completed' : ''}`} onClick={() => toggleStep(idx)} style={{ cursor: 'pointer' }}>
                <div style={{ color: isCompleted ? 'var(--accent-success)' : 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {isCompleted ? <FaCheckCircle /> : <FaRegCircle />}
                </div>
                <span className="prep-text">{step}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default function MealPlan({ meals }) {
  if (!meals) return null;
  
  return (
    <div className="meal-plan-section">
      <MealCard mealType="Breakfast" mealData={meals.breakfast} />
      <MealCard mealType="Lunch" mealData={meals.lunch} />
      <MealCard mealType="Dinner" mealData={meals.dinner} />
    </div>
  );
}
