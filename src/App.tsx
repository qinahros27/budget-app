import React from 'react';
import { useState, useEffect } from 'react';

import './App.css';
import Income from './component/Income';
import Expense from './component/Expense';
import Balance from './component/Balance';
import Saving from './component/Saving';
function App() {
  const [balance,setBalance] = useState(0);
  const [saving, setSaving] = useState(0);
  
  const calBalance = (source: string,amount: number) => {
      if(source === 'income') {
        console.log(typeof amount);
        setBalance(balance +amount);
      }
      else if (source === 'expense') {
        if(balance - amount < 0) {
          alert('The expense is out of balance');
          
        }
        else {
        setBalance(balance-amount); }
      }
      else if (source ==='saving') {
        if(balance-amount <0) {
          alert('There is not enough money to transfer to saving');
        } 
        else {
        setBalance(balance-amount); }
      }
      else if (source === 'withdraw') {
        setBalance(balance+amount);
        setSaving(0);
      }
  }
 
  return (
    <div>
        <div className='container'>
          <div className='box'>
            <Income cal={calBalance}/>
          </div>
          
          <div className='box'>
            <Expense cal={calBalance}/>
          </div>
          
          <Saving
            saving={saving}
            cal= {calBalance}
          />
        </div>
      
        <Balance 
          balance={balance}
          setBalance={setBalance}
          saving={saving}
          setSaving={setSaving}
          cal= {calBalance}
        /> 
    </div>
  );
}

export default App;
