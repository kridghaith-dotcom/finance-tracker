import { useState, useEffect } from "react";
import axios from "axios";


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
  return (
    <div>
      <h1>Finance Tracker</h1>
      <p>Transactions :{transaction.length}</p>
      <ul>
        <li><input type="text" value={amount} onChange={e => setAmount(e.target.value)} /></li>
        <li><input type="text" value={type} onChange={e => seTtype(e.target.value)} /></li>
        <li><input type="text" value={category} onChange={e => setCategory(e.target.value)} /></li>
        <li><input type="text" value={description} onChange={e => setDescription(e.target.value)} /></li>
      </ul>
      <button onClick={addTransaction}>Add</button>
      {transaction.map(t => (
        <p key={t.id}>{t.description} - {t.amount} - {t.category}</p>
      ))}
    </div>
  )

}
export default App