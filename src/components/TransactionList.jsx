import React from 'react'

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions || transactions.length === 0) return (
    <div className="card transactions">
      <h3>Transactions</h3>
      <p className="muted">No transactions yet — add your first one!</p>
    </div>
  )

  return (
    <div className="card transactions">
      <h3>Transactions</h3>
      {transactions.map(tx => (
        <div key={tx.id} className="transaction-item">
          <div className="tx-left">
            <div>
              <div style={{fontWeight:700}}>{tx.type === 'income' ? '+' : '-'} ₹{Number(tx.amount).toFixed(2)}</div>
              <div className="tx-category">{tx.category} • {tx.date}</div>
            </div>
          </div>
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            {tx.note && <div className="muted">{tx.note}</div>}
            <button className="delete-btn" onClick={() => onDelete(tx.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}