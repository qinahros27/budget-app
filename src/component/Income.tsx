import React from 'react';
import {useState,useEffect} from 'react';
import '../App.css';
interface Income {
  income: string;
  amount: number;
  date: Date;
}

interface CalBalance {
  cal: (source: string, amount: number) => void;
}

function Income(props: CalBalance) {
  const [income, setIncome] = useState<Income>({
    income: '',
    amount: 0,
    date: new Date(),
  }); 

  const [incomeList, setIncomeList] = useState<Income[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIncome((prevIncome) => ({ ...prevIncome, [name]: name === 'amount' ? parseFloat(value) : value }));
  };

  const addIncome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(typeof income.amount);
    if(!income.income || !income.amount || !income.date) {
        alert(`Please enter all input!!`)
    }
    else {
    props.cal('income', income.amount);
    setIncomeList((prevIncomeList) => [...prevIncomeList, income]);
    setIncome({ income: '', amount: 0, date: new Date() });
    }
  };

  const DeleteIncome = (index:number) => {
    incomeList.splice(index,1);
  };

  useEffect(() => {
    console.log('incomeList has changed:', incomeList);
  }, [incomeList]);
 
  return (
    <div>
      <form onSubmit={addIncome}>
        <div>
          <label htmlFor="income">source</label>
          <select id="income" name="income" onChange={handleInputChange}>
            <option value="Select">Select</option>
            <option value="Salary">Salary</option>
            <option value="Investment">Investment</option>
            <option value="Interest">Interest</option>
            <option value="Dividend">Dividend</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount">Amount of income</label>
          <input type="number" min='1' name="amount" id="amount" onChange={handleInputChange}  />
        </div>
        <div>
          <label htmlFor="date">Date of income</label>
          <input type="date" placeholder="dd-mm-yyyy" name="date" id="date" onChange={handleInputChange} />
        </div>
        <button type="submit">Add income</button>
      </form>

      {incomeList.map((income, index) => (
        <div key={index} className='list-item'>
            <ul>
                <li>{income.income}: {income.amount} EUR on {new Date(income.date).toDateString()}</li> 
            </ul>

            <div className='button'>
                <button onClick={() => DeleteIncome(index)}>Delete</button>
                <Edit incomeList={incomeList} i={index}/>
            </div>
            
        </div>
      ))}
    </div>
  );
}

type EditProps = {
    i: number;
    incomeList: Income[];
}

function Edit(props:EditProps) {
    let i = props.i;
    const [open,setOpen] = useState(false); 

    const handleClick = () => {
        setOpen(!open);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setIncome((prevIncome) => ({ ...prevIncome, [name]: name === 'amount' ? parseFloat(value) : value }));
      };
    
    const [income, setIncome] = useState<Income>({
        income: '',
        amount: 0,
        date: new Date(),
      });
    
      const editIncome = (e:React.FormEvent<HTMLFormElement>,index:number) => {
        e.preventDefault();
        props.incomeList[index].income = income.income;
        props.incomeList[index].amount = income.amount;
        props.incomeList[index].date = income.date;
        console.log("edit",props.incomeList);
        setOpen(!open);
      };
    
      useEffect(() => {
        console.log('incomeList has changed in edit:', props.incomeList);
      }, [props.incomeList]);

    return (
        <div>
            <button onClick={handleClick}>Edit</button>
            {open && (
                <form onSubmit={(e) => editIncome(e, i)}>
                <div>
                  <label htmlFor="income">Income source</label>
                  <select id="income" name="income" onChange={handleInputChange} >
                    <option value="Select">Select</option>
                    <option value="Salary">Salary</option>
                    <option value="Investment">Investment</option>
                    <option value="Interest">Interest</option>
                    <option value="Dividend">Dividend</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="amount">Amount of income</label>
                  <input type="number" name="amount" id="amount" onChange={handleInputChange} />
                </div>
                <div>
                  <label htmlFor="date">Date of income</label>
                  <input type="date" placeholder="dd-mm-yyyy" name="date" id="date" onChange={handleInputChange} />
                </div>
                <button type="submit">Save</button>
              </form>
            )}
        </div>
    )
}

export default Income;