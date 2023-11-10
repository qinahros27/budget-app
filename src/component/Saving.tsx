import React from 'react';
import { useState } from 'react';
interface props {
    saving: number;
    cal: (source: string, amount: number) => void;
}

function Saving(props: props) {
    const [target, setTarget] = useState(0);
  
    const targetChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTarget(parseInt(e.target.value));
    }

    let progress = 0;
    if(props.saving !== 0) {
      progress = props.saving/target*100;
      console.log(progress);
    }

    return (
        <div>
        <div className='box target'>
                <div>
                    <label htmlFor="target">Set target</label>
                    <input type="text" name="target" id="target" onChange={targetChanged} value={target}/>
                    <button onClick={() => setTarget(0)}>Reset</button>
                </div>
                <div className='box-saving'>
                    <p>Current saving: {props.saving}</p>
                    <button onClick={()=> props.cal('withdraw', props.saving)}>Withdraw</button>
                </div>
                <label htmlFor="progress">Progress:</label>
                <progress id="progress" value={progress} max="100"/>
            </div>
        </div>
    );
}

export default Saving;