import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

function App() {

  const [transaction, setTransaction] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, seTtype] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/transactions/")
      .then(response => {
        setTransaction(response.data.transactions)
      })
  }, [])

  const addTransaction = () => {
    axios.post("http://localhost:5000/api/transactions/", {
      amount: amount,
      type: type,
      category: category,
      description: description
    }).then(() => {
      axios.get("http://localhost:5000/api/transactions/").then(response =>
        setTransaction(response.data.transactions)
      )
    })
  }

  const deleteTransaction = (id) => {
    axios.delete(`http://localhost:5000/api/transactions/${id}`)
      .then(() => axios.get("http://localhost:5000/api/transactions/").then(response =>
        setTransaction(response.data.transactions)
      ))
  }

  const chartData = Object.entries(
    transaction.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value }))

  const income = transaction
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
  const expenses = transaction
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)
  const balance = income - expenses

  return (
    <div>
      <nav className="navbar"> <h1>Finance Tracker</h1> </nav>

      <div className="container">
        <p className="transaction-count">Transactions :{transaction.length}</p>
        <div className="cards-row">
          <div className="card-balance">
            <h3>Balance</h3>
            <p>{balance} DT</p>
          </div>
          <div className="card-income">
            <h3>Income</h3>
            <p>{income} DT</p>
          </div>
          <div className="card-expense">
            <h3>Expense</h3>
            <p>{expenses} DT</p>
          </div>
        </div>
        <div className="form">
          <input type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
          <input type="text" placeholder="Type (income/expense)" value={type} onChange={e => seTtype(e.target.value)} />
          <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
          <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <button className="btn" onClick={addTransaction}>Add</button>
        </div>
        {transaction.map(t => (
          <div className="transaction-item" key={t.id}style={{
            borderLeft: `4px solid ${t.type === "income" ? "#16a34a" : "#dc2626"}`
          }}>
            <span>{t.description}</span>
            <span>{t.category}</span>
            <span>{t.amount} DT</span>
            <button className="btndel" onClick={() => deleteTransaction(t.id)}>Delete</button>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:"24px"}}>
          <h3 style={{marginBottom: "12px", color: "#888"}}>Spending by category</h3>
          <PieChart width={400} height={300}>
          <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
            {chartData.map((entry, index) => (
              <Cell key={index} fill={["#4f46e5", "#16a34a", "#dc2626", "#f59e0b"][index % 4]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        </div>
      </div>
    </div>
  )

}
export default App