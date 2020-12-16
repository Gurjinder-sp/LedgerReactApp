
import React, { useState, useEffect} from 'react';
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route}  from 'react-router-dom'

function App() {

    const [transactions,setTransactions] = useState([]);
    const [currentBalance, setCurrentBalance] = useState(0);

    const addNewTransaction = (type, amount, description, navigate) => {

        let time = new Date();
        let transactionTypeString = type ? 'Credit' : 'Debit';

        // get new balance
        let transactionBalance = type ? amount + currentBalance: currentBalance - amount;

        // prepare new transaction
        let entry = {
            "transactionType":transactionTypeString,
            "amount":amount,
            "description":description,
            "date": time,
            "runningBalance":transactionBalance
        }

        if(transactions) {
        entry = [...transactions,entry]
            // after first entry
            setTransactions(entry);
            saveToLocal(entry)
        }
        else {
            // first entry into transaction array
            setTransactions([...[entry]]);
            saveToLocal([entry]);
        }

        setCurrentBalance(transactionBalance);
        navigate();
    }

    useEffect(() => {
        setTransactionsList();
    },[]);

    useEffect(() => {

    },[transactions]);

    const setTransactionsList = () => {
        let TransactionList = JSON.parse(localStorage.getItem('office-transactions'));
        let balance = TransactionList ? TransactionList[TransactionList.length - 1].runningBalance: 0;
        setCurrentBalance(balance);
        setTransactions(TransactionList);
    }


    const saveToLocal = (transactions) => {
        localStorage.setItem('office-transactions',JSON.stringify(transactions));
    }

  return (
      <BrowserRouter>
         <div className="App">
             <Navbar />
             <Route path='/' exact render={(props) => <Transactions {...props} transactionList={transactions} />} />
             <Route path='/addTransaction' exact render={(props) => <AddTransaction {...props} handleTransaction={addNewTransaction} />} />
         </div>
      </BrowserRouter>
  );
}

export default App;
