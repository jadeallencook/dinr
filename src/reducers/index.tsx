import { combineReducers } from 'redux';
import loading from './loading';
import user from './user';
import profile from './profile';
import notifications from './notifications';

export default combineReducers({
    loading, user, profile, notifications
});