import { ALL_MARKETS } from '../actions/types';
import { SPECIFIC_MARKET } from '../actions/types';

//state argument is not application state, it is the state for this reducer
export default function(state = [], action) {
  // console.log("In the survey reducer");
  // console.log(action);
  switch (action.type) {
    case ALL_MARKETS:
      // console.log('in the queyr reducer');
      return action.payload;

    case SPECIFIC_MARKET:
      // console.log('in the queyr reducer');
      return action.payload;
    default:
      return state;
  }
}
