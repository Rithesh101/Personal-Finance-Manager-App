import React from 'react'

export default function BalanceCard({ income, expenses }){
  const balance = income - expenses
  return (
    <div className="card balance-card">
      <h3>Balance</h3>
      <p className="muted">Income − Expenses</p>
      <div className="balance-values">
        <div className="item">
          <div className="label muted">Income</div>
          <div className="amount">₹{income.toFixed(2)}</div>
        </div>
        <div className="item">
          <div className="label muted">Expenses</div>
          <div className="amount">₹{expenses.toFixed(2)}</div>
        </div>
        <div className="item">
          <div className="label muted">Balance</div>
          <div className="amount">₹{balance.toFixed(2)}</div>
        </div>
      </div>
    </div>
  )
}