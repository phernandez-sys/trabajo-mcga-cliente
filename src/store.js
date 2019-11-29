import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initialState = {
  email: undefined,
  password: undefined,
  logged: false,
  message: undefined,
  isLogging: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_CHANGE_EMAIL":
      return {
        ...state,
        email: action.payload,
        logged: false,
        message: undefined
      };
    case "ON_CHANGE_PASSWORD":
      return {
        ...state,
        password: action.payload,
        logged: false,
        message: undefined
      };
    case "LOGIN_PENDING":
      return {
        ...state,
        isLogging: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLogging: false,
        logged: true,
        token: action.payload.token
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        isLogging: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export const onChangeEmail = event => {
  const text = event.target.value;
  return {
    type: "ON_CHANGE_EMAIL",
    payload: text
  };
};

export const onChangePassword = event => {
  const text = event.target.value;
  return {
    type: "ON_CHANGE_PASSWORD",
    payload: text
  };
};

export const handleLogin = (username, password) => {
  return dispatch => {
    dispatch({
      type: "LOGIN_PENDING"
    });

    const options = {
      timeout: 25000,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    };

    return fetch(`https://mcga-servidor-19.herokuapp.com/api/auth/`, {
      ...options,
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (!data.docs.length) {
          return Promise.reject(data);
        }
        return dispatch({
          type: "LOGIN_SUCCESS",
          payload: data
        });
      })
      .catch(error => {
        return dispatch({
          type: "LOGIN_ERROR",
          payload: error
        });
      });
  };
};

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
