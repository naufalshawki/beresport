import isLogged from './logged';
import {combineReducers} from 'redux';

const allreduce = combineReducers({
  isLogged: isLogged
});

export default allreduce;
