import { useState } from 'react';
import { FaWandMagicSparkles } from 'react-icons/fa6';

export default function DayContextForm({ onSubmit, isGenerating }) {
  const [context, setContext] = useState({
    time: 'Busy, only have 30 mins per meal',
    diet: 'None',
    budget: '₹500',
    people: 2
  });

  const handleChange = (e) => {
    setContext(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(context);
  };

  return (
    <div className="glass-panel context-form">
      <h2 style={{ marginBottom: '0.5rem', color: '#fff' }}>Plan Your Day</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className="form-group">
          <label htmlFor="timeInput">Available Time & Schedule</label>
          <input 
            id="timeInput"
            type="text" 
            name="time" 
            value={context.time} 
            onChange={handleChange} 
            placeholder="e.g. Busy all day, fast meals" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dietInput">Dietary Restrictions</label>
          <input 
            id="dietInput"
            type="text" 
            name="diet" 
            value={context.diet} 
            onChange={handleChange} 
            placeholder="e.g. Vegetarian, Gluten-free" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="budgetInput">Budget (for the day)</label>
          <input 
            id="budgetInput"
            type="text" 
            name="budget" 
            value={context.budget} 
            onChange={handleChange} 
            placeholder="e.g. ₹400 or ₹1000" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="peopleInput">Number of People</label>
          <input 
            id="peopleInput"
            type="number" 
            name="people" 
            value={context.people} 
            onChange={handleChange} 
            min="1" 
            required 
          />
        </div>
        
        <button type="submit" className="btn-primary" disabled={isGenerating}>
          <FaWandMagicSparkles /> 
          {isGenerating ? 'Generating Plan...' : 'Generate Meal Plan'}
        </button>
      </form>
    </div>
  );
}
