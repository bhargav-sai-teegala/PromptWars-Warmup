import { FaShoppingCart, FaExchangeAlt, FaWallet, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

export function GroceryList({ groceryList, substitutions }) {
  if (!groceryList || groceryList.length === 0) return null;

  return (
    <div className="glass-panel list-section" style={{ marginBottom: '1.5rem' }}>
      <h2><FaShoppingCart /> Grocery List</h2>
      
      <div style={{ marginTop: '1rem' }}>
        {groceryList.map((item, idx) => (
          <div key={idx} className="grocery-item">
            <span>{item.item} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>({item.category})</span></span>
            <span className="grocery-cost">₹{item.estimatedCost.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {substitutions && substitutions.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2><FaExchangeAlt /> Smart Substitutions</h2>
          <div style={{ marginTop: '1rem' }}>
            {substitutions.map((sub, idx) => (
              <div key={idx} className="substitution-item">
                <span className="substitution-original">{sub.original}</span>
                <span className="substitution-arrow">➔</span>
                <span className="substitution-new">{sub.replacement}</span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Why? {sub.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function BudgetFeasibility({ budgetAnalysis }) {
  if (!budgetAnalysis) return null;

  const isOk = budgetAnalysis.isWithinBudget;
  const alertClass = isOk ? 'success' : 'warning';
  const Icon = isOk ? FaCheckCircle : FaExclamationTriangle;

  return (
    <div className="glass-panel list-section">
      <h2><FaWallet /> Budget Analysis</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '1.1rem' }}>Total Estimated Cost:</span>
        <span className="grocery-cost" style={{ fontSize: '1.5rem', color: isOk ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
          ₹{budgetAnalysis.totalEstimatedCost.toFixed(2)}
        </span>
      </div>

      <div className={`budget-alert ${alertClass}`}>
        <div style={{ marginTop: '0.2rem' }}><Icon /></div>
        <div>
          <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
            {isOk ? 'Within Budget!' : 'Over Budget!'}
          </strong>
          {budgetAnalysis.advice}
        </div>
      </div>
    </div>
  );
}
