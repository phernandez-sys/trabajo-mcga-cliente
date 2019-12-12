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
    case "GET_PRODUCTS_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "GET_PRODUCTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        products: action.payload
      };
    case "GET_PRODUCTS_ERROR":
      return {
        ...state,
        isLoading: false,
        message: action.payload.message
      };
    case "DEL_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "DEL_PRODUCT_SUCCESS":
      const productToDelete = state.products.findIndex(
        ele => ele.code === action.payload.code
      );
      const newProducts = [...state.products];
      newProducts.splice(productToDelete, 1);
      return {
        ...state,
        isLoading: false,
        products: newProducts
      };
    case "DEL_PRODUCT_ERROR":
      return {
        ...state,
        isLoading: false,
        message: action.payload.message
      };
    case "POST_PRODUCT_PENDING":
      return {
        ...state,
        isLoading: true
      };
    case "POST_PRODUCT_SUCCESS":
      const products = [...state.products];
      products.push(action.payload.product);
      return {
        ...state,
        isLoading: false,
        products: products
      };
    case "POST_PRODUCT_ERROR":
      return {
        ...state,
        isLoading: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
