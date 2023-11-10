import React from 'react';

interface props {
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    saving: number;
    setSaving: React.Dispatch<React.SetStateAction<number>>;
    cal: (source: string, amount: number) => void;
}

function Balance(props: props) {
   const savingChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let value = parseInt(e.target.value);
      props.setSaving(value);
   }

  return (
    <div>
      <div className='balance_box'>
          <p>Current balance: {props.balance}</p>
          <div>
              <label htmlFor="saving">Transfer to saving account: </label>
              <input type="text" name="saving" id="saving" onChange={savingChanged} value={props.saving}/>
              <button onClick={()=> props.cal('saving', props.saving)}>Transfer</button>
          </div>
        </div>
    </div>
  );
}

export default Balance;