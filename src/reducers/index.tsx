import { combineReducers } from 'redux';
import loading from './loading';
import user from './user';
import profile from './profile';
import notifications from './notifications';
import zipcode from './zipcode';
import results from './results';
import dinner from './dinner';
import host from './host';

export default combineReducers({
  loading,
  user,
  profile,
  notifications,
  zipcode,
  results,
  dinner,
  host
});
