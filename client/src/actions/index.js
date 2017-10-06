import axios from 'axios';
import { FETCH_USER } from './types';
import { ALL_MARKETS } from './types';

// v2 of THUNK action creator
// this is the best format for async request actions that aren't just fancy
// if and else things
export const fetchUserV2 = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const queryAllMarkets = () => async dispatch => {
  // console.log(' ---- in the query action');
  const res = await axios.get('/api/allPrices');
  dispatch({
    type: ALL_MARKETS,
    payload: res.data
  });
};
