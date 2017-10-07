import uuid from 'uuid/v1';

const ADD_TODO = 'ADD_TODO';
const addTodo = text => ({
  type: ADD_TODO,
  payload: {
    id: uuid(),
    text,
  },
});

const SET_FILTER = 'SET_FILTER';
const setFilter = filter => ({
  type: SET_FILTER,
  payload: filter,
});

const TOGGLE_TODO = 'TOGGLE_TODO';
const toggleTodo = id => ({
  type: TOGGLE_TODO,
  meta: { id },
});

const types = { ADD_TODO, SET_FILTER, TOGGLE_TODO };

export { types, addTodo, setFilter, toggleTodo };

export default {
  types, addTodo, setFilter, toggleTodo,
};
