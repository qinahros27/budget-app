import React from 'react';
import { useState, useEffect } from 'react';
interface Expense {
  expense: string;
  amount: number;
  date: Date;
}

interface CalBalance {
  cal: (source: string, amount: number) => void;
}

function Expense(props: CalBalance) {
    const [expense, setExpense] = useState<Expense>({
        expense: '',
        amount: 0,
        date: new Date(),
    });
    
    const [expenseList, setExpenseList] = useState<Expense[]>([]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setExpense((prevExpense) => ({ ...prevExpense, [name]: name === 'amount' ? parseFloat(value) : value }));
    };
    
    const addExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.cal('expense', expense.amount);
        setExpenseList((prevExpenseList) => [...prevExpenseList, expense]);
        setExpense({ expense: '', amount: 0, date: new Date() });
    };
    
    const DeleteExpense = (index:number) => {
        expenseList.splice(index,1);
    };

  return (
    <div>
      <form onSubmit={addExpense}>
        <div>
          <label htmlFor="expense">Expense source</label>
          <select id="expense" name="expense" onChange={handleInputChange} value={expense.expense}>
            <option value="Select">Select</option>
            <option value="Food">Food</option>
            <option value="Taxes">Taxes</option>
            <option value="Entertaiment">Entertaiment</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div>
          <label htmlFor="amount">Amount of expense</label>
          <input type="number" name="amount" id="amount" min='1' onChange={handleInputChange} value={expense.amount} />
        </div>

        <div>
          <label htmlFor="date">Date of expense</label>
          <input type="date" placeholder="dd-mm-yyyy" name="date" id="date" onChange={handleInputChange} />
        </div>

        <button type="submit">Add expense</button>
      </form>

      {expenseList.map((expense, index) => (
        <div key={index} className='list-item'>
            <ul>
                <li>{expense.expense}: {expense.amount} EUR on {new Date(expense.date).toDateString()}</li> 
            </ul>

            <div className='button'>
              <button onClick={() => DeleteExpense(index)}>Delete</button>
              <Edit expenseList={expenseList} i={index}/>
            </div>
        </div>
      ))}
    </div>
  );
}

type EditProps = {
    i: number;
    expenseList: Expense[];
}

function Edit(props:EditProps) {
    let i = props.i;
    const [open,setOpen] = useState(false); 

    const handleClick = () => {
        setOpen(!open);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setExpense((prevExpense) => ({ ...prevExpense, [name]: name === 'amount' ? parseFloat(value) : value }));
    };
    
    const [expense, setExpense] = useState<Expense>({
        expense: '',
        amount: 0,
        date: new Date(),
    });
    
      const editExpense = (e:React.FormEvent<HTMLFormElement>,index:number) => {
        e.preventDefault();
        props.expenseList[index].expense = expense.expense;
        props.expenseList[index].amount = expense.amount;
        props.expenseList[index].date = expense.date;
        console.log("edit",props.expenseList);
        setOpen(!open);
    };
    
    useEffect(() => {
        console.log('expenseList has changed in edit:', props.expenseList);
    }, [props.expenseList]);
    return (
      <div>
            <button onClick={handleClick}>Edit</button>
            {open && (
                <form onSubmit={(e) => editExpense(e, i)}>
                <div>
                  <label htmlFor="expense">Expense source</label>
                  <select id="expense" name="expense" onChange={handleInputChange} >
                    <option value="Select">Select</option>
                    <option value="Food">Food</option>
                    <option value="Taxes">Taxes</option>
                    <option value="Entertaiment">Entertaiment</option>
                    <option value="Shopping">Shopping</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="amount">Amount of expense</label>
                  <input type="number" name="amount" id="amount" onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="date">Date of expense</label>
                  <input type="date" placeholder="dd-mm-yyyy" name="date" id="date" onChange={handleInputChange} />
                </div>
                <button type="submit">Save</button>
              </form>
            )}
      </div>
    )
}

export default Expense;