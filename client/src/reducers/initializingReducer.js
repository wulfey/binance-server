import { LOAD } from '../actions/types';

//state argument is not application state, it is the state for this reducer
export default function(state = {}, action) {
  // console.log("In the reducer");
  // console.log(action);
  switch (action.type) {
    case LOAD:
      return { data: action.data };
    default:
      return state;
  }
}
