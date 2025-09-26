import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#d0ed57", "#8dd1e1"]

export default function ExpenseChart({ transactions }) {
  const expenseByCategory = useMemo(() => {
    const map = {}
    transactions.forEach(tx => {
      if (tx.type !== 'expense') return
      map[tx.category] = (map[tx.category] || 0) + Number(tx.amount)
    })
    return Object.entries(map).map(([category, value]) => ({ category, value }))
  }, [transactions])

  if (expenseByCategory.length === 0) return (
    <div className="card">
      <h3>Expense Breakdown</h3>
      <p className="muted">Add some expense transactions to see the chart.</p>
    </div>
  )

  return (
    <div className="card">
      <h3>Expense Breakdown</h3>
      <div style={{width:'100%',height:320,display:'flex',gap:20}}>
        <div style={{flex:1}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={expenseByCategory} dataKey="value" nameKey="category" outerRadius={100} fill="#8884d8">
                {expenseByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{flex:1}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenseByCategory}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                {expenseByCategory.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}