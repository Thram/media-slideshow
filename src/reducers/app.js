import processReducer from 'process-reducer';
import { types } from '../actions/app';

const { APP_SET_LANGUAGE } = types;

const INIT_STATE = { language: 'en' };

const appReducers = {
  [APP_SET_LANGUAGE]: (state, { payload }) => ({ ...state, language: payload }),
};

export default processReducer(appReducers, INIT_STATE);
