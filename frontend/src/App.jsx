import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'


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
        <p>Transactions :{transaction.length}</p>
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
        <div className="transaction-item" key={t.id}>
          <span>{t.description}</span>
          <span>{t.category}</span>
          <span>{t.amount} DT</span>
        </div>
))}
      </div>
    </div>
  )

}
export default App