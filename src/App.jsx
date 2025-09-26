import React, { useEffect, useState } from 'react'
import BalanceCard from './components/BalanceCard'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import ExpenseChart from './components/ExpenseChart'

const LOCAL_KEY = 'pf_transactions_v1'

export default function App() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (raw) {
      try {
        setTransactions(JSON.parse(raw))
      } catch (e) {
        console.error('Failed to parse localStorage data', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(transactions))
  }, [transactions])

  function addTransaction(tx) {
    setTransactions(prev => [tx, ...prev])
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + Number(t.amount), 0)
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + Number(t.amount), 0)

  return (
    <div className="container">
      <header>
        <h1>Personal Finance Manager</h1>
        <p className="muted">Track income, expenses, and visualize spending by category</p>
      </header>

      <main>
        <div className="top-row">
          <BalanceCard income={income} expenses={expenses} />
          <TransactionForm onAdd={addTransaction} />
        </div>

        <section className="charts">
          <ExpenseChart transactions={transactions} />
        </section>

        <TransactionList transactions={transactions} onDelete={deleteTransaction} />
      </main>

      <footer>
        <small>Data saved locally in your browser (localStorage)</small>
      </footer>
    </div>
  )
}