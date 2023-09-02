import { ActionTypes, DispatchAction, FormState } from "./formContext";

export function formReducer(state: FormState, action: DispatchAction): any {
  switch (action.type) {
    case ActionTypes.NameUpdate:{
      return {
        ...state,
        name: action.payload.value,
      }
    }
    case ActionTypes.MinimumUpdate: {
      return {
        ...state,
        minimum: action.payload.value
      }
    }
    case ActionTypes.MaximumUpdate: {
      return {
        ...state,
        maximum: action.payload.value
      }
    }
    default: {
      throw Error('Unknown action!');
    }
  }
}
