import React, { useState } from 'react'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('General')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')

  function reset(){
    setType('expense'); setCategory('General'); setAmount(''); setDate(''); setNote('')
  }

  function handleSubmit(e){
    e.preventDefault()
    if (!amount || isNaN(amount)) return alert('Enter a valid amount')
    const tx = {
      id: uid(),
      type,
      category,
      amount: Number(amount),
      date: date || new Date().toISOString().slice(0,10),
      note
    }
    onAdd(tx)
    reset()
  }

  return (
    <div className="card transaction-form">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group" style={{flex:1}}>
            <label>Type</label>
            <select value={type} onChange={e=>setType(e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="form-group" style={{flex:1}}>
            <label>Category</label>
            <select value={category} onChange={e=>setCategory(e.target.value)}>
              <option>General</option>
              <option>Food</option>
              <option>Groceries</option>
              <option>Transport</option>
              <option>Rent</option>
              <option>Utilities</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Salary</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" />
        </div>

        <div className="form-row">
          <div className="form-group" style={{flex:1}}>
            <label>Date</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
          </div>
          <div className="form-group" style={{flex:1}}>
            <label>Note</label>
            <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Optional" />
          </div>
        </div>

        <div style={{textAlign:'right'}}>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}