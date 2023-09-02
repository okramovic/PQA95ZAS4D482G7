import { useState } from "react";
import { isNumber } from "../../utils";

const {log} = console

type FormProps = {
  // minimum: number|'',
  // maximum: number|'',
}

export const Form = ({
  
}: FormProps) =>{

  const [minimum, setMinimum] = useState<number|''>('');
  const [maximum, setMaximum] = useState<number|''>('');

  const onRepositoryChange = (ev:React.ChangeEvent<HTMLInputElement>)=>{
    const newValue = ev.target.value;
    log(newValue)
  }

  const onMinimumChange = (ev: React.ChangeEvent<HTMLInputElement>)=>{
    const newMin = ev.target.value ? parseInt(ev.target.value) : ''

    if (isNumber(maximum) && maximum < newMin) {
      return window.alert('sorry, minimum has to be lower number than maximum')
    }
    setMinimum(newMin)
  }

  const onMaximumChange = (ev: React.ChangeEvent<HTMLInputElement>)=>{
    const newMax = ev.target.value ? parseInt(ev.target.value) : ''

    if (isNumber(minimum) && newMax < minimum) {
      return window.alert('sorry, maximum has to be higher number than minimum')
    }
    setMaximum(newMax)
  }

  return (
    <form>
      <div className='form-row'>
        <label htmlFor='input-repository'>repository name</label>
        <input type="text" onChange={onRepositoryChange} id='input-repository'/>
      </div>
      <div className='form-row'>
        <label htmlFor='issues-minimum'>minimum issues</label>
        <input type="number" onChange={onMinimumChange} id='issues-minimum' value={minimum}/>
      </div>
      <div className='form-row'>
        <label htmlFor='issues-maximum'>maximum issues</label>
        <input type="number" onChange={onMaximumChange} id='issues-maximum' value={maximum}/>
      </div>
    </form>
  )
}