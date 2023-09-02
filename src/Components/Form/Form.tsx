import React, { useContext } from "react";
import { isNumber } from "../../utils";
import { Organisation } from "../../apiTypes";
import { ActionTypes, FormContext, Maximum, Minimum } from "../../Context/formContext";

type FormProps = {
  currentOrg: Organisation;
}

export const Form = ({
  currentOrg,
}: FormProps) =>{

  const { formState: {minimum, maximum, name, valid}, dispatch } = useContext(FormContext);

  function handleName(value: string) {
    dispatch({
      type: ActionTypes.NameUpdate,
      payload: {value},
    });
  }

  function handleMinimum(value: Minimum){
    dispatch({
      type: ActionTypes.MinimumUpdate,
      payload: {value},
    });
  }

  function handleMaximum(value: Maximum){
    dispatch({
      type: ActionTypes.MaximumUpdate,
      payload: {value},
    });
  }

  function handleValidity(valid: boolean){
    dispatch({
      type: ActionTypes.SetValid,
      payload: {valid},
    });
  }

  const onNameChange = (ev:React.ChangeEvent<HTMLInputElement>)=>{
    handleName(ev.target.value);
  };

  const onMinimumChange = (ev: React.ChangeEvent<HTMLInputElement>)=>{
    const newMin = ev.target.value ? parseInt(ev.target.value) : '';

    if (isNumber(maximum) && maximum < newMin) {
      handleValidity(false);
      window.alert('minimum should be lower number than maximum');
    } else handleValidity(true);
    handleMinimum(newMin);
  };

  const onMaximumChange = (ev: React.ChangeEvent<HTMLInputElement>)=>{
    const newMax = ev.target.value ? parseInt(ev.target.value) : '';

    if (isNumber(minimum) && newMax < minimum) {
      handleValidity(false);
      window.alert('maximum should be higher number than minimum');
    } else handleValidity(true);
    handleMaximum(newMax);
  };

  const onFormSubmit = (ev: React.FormEvent)=>{
    ev.preventDefault();
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h1 className='header'>browse repositories of {currentOrg.login}:</h1>
      <div className='form-row'>
        <label htmlFor='input-repository'>repository name</label>
        <input type="text" id='input-repository' onChange={onNameChange} value={name}/>
      </div>
      <div className='form-row'>
        <label htmlFor='issues-minimum'>minimum issues</label>
        <input type="number" id='issues-minimum' min={0} onChange={onMinimumChange} value={minimum}/>
      </div>
      <div className='form-row'>
        <label htmlFor='issues-maximum'>maximum issues</label>
        <input type="number" id='issues-maximum' min={0} onChange={onMaximumChange} value={maximum}/>
      </div>

      {!valid && <p>⚠️ form is not valid, please check if all data makes sense</p>}
      <button id='submit' disabled={!valid}>reload data</button>
    </form>
  )
}
