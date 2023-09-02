import { createContext } from "react";

export type Minimum = number|'';
export type Maximum = number|'';

export type FormState = {
  name: string;
  minimum: Minimum;
  maximum: Maximum;
}

export enum ActionTypes{
  NameUpdate = 'name-update',
  MinimumUpdate = 'minimum-update',
  MaximumUpdate = 'maximum-update'
}

export type NameUpdate = {
  type: ActionTypes.NameUpdate;
  payload: { value: string };
}

export type MinimumUpdate = {
  type: ActionTypes.MinimumUpdate;
  payload: { value: Minimum }
}

export type MaximumUpdate = {
  type: ActionTypes.MaximumUpdate;
  payload: { value: Maximum }
}

export type DispatchAction = NameUpdate | MinimumUpdate | MaximumUpdate;

export const initialFormState: FormState = {
  name: '',
  minimum: '',
  maximum: ''
}

export const FormContext = createContext<{
  formState: FormState;
  dispatch: React.Dispatch<DispatchAction>}>
  ({formState: initialFormState, dispatch: ()=>{} });
