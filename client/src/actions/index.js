import axios from 'axios';
import { FETCH_USER, ALL_MARKETS, SPECIFIC_MARKET, LOAD } from './types';

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

// export const load = data => ({ type: LOAD, data });

export const load = data => async dispatch => {
  console.log('firing the loadForm action');
  console.log(data);
  dispatch({
    type: LOAD,
    data
  });
};

export const queryAllMarkets = () => async dispatch => {
  // console.log(' ---- in the queryAllMarkets action');
  const res = await axios.get('/api/allPrices');
  dispatch({
    type: ALL_MARKETS,
    payload: res.data
  });
};

export const querySpecificMarket = (symbol, limit) => async dispatch => {
  // console.log(' ---- in the querySpecificMarket action');
  let res = await axios.get(`/api/specificMarket/${symbol}/${limit}`);

  dispatch({
    type: SPECIFIC_MARKET,
    payload: res.data
  });
};
