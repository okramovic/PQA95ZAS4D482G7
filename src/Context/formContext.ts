import { createContext } from "react";

export type Minimum = number | "";
export type Maximum = number | "";

export type FormState = {
  name: string;
  minimum: Minimum;
  maximum: Maximum;
  valid: boolean;
};

export enum ActionTypes {
  NameUpdate = "name-update",
  MinimumUpdate = "minimum-update",
  MaximumUpdate = "maximum-update",
  SetValid = "valid-update",
}

export type NameUpdate = {
  type: ActionTypes.NameUpdate;
  payload: { value: string };
};

export type MinimumUpdate = {
  type: ActionTypes.MinimumUpdate;
  payload: { value: Minimum };
};

export type MaximumUpdate = {
  type: ActionTypes.MaximumUpdate;
  payload: { value: Maximum };
};

export type ValidUpdate = {
  type: ActionTypes.SetValid;
  payload: { valid: boolean };
};

export type DispatchAction =
  | NameUpdate
  | MinimumUpdate
  | MaximumUpdate
  | ValidUpdate;

export const initialFormState: FormState = {
  name: "",
  minimum: "",
  maximum: "",
  valid: true,
};

export const FormContext = createContext<{
  formState: FormState;
  dispatch: React.Dispatch<DispatchAction>;
}>({ formState: initialFormState, dispatch: () => {} });
