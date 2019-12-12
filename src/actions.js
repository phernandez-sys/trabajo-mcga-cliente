import store from "./store";

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

export const getProducts = () => {
  return dispatch => {
    dispatch({
      type: "GET_PRODUCTS_PENDING"
    });
    const { token } = store.getState();
    const options = {
      timeout: 25000,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BEARER ${token}`
      }
    };

    return fetch(`https://mcga-servidor-19.herokuapp.com/api/product/`, options)
      .then(res => res.json())
      .then(data => {
        console.log("GET_PRODUCTS", data);
        if (!data.length) {
          return Promise.reject(data);
        }

        return dispatch({
          type: "GET_PRODUCTS_SUCCESS",
          payload: data
        });
      })
      .catch(error => {
        return dispatch({
          type: "GET_PRODUCTS_ERROR",
          payload: error
        });
      });
  };
};

export const deleteProduct = code => {
  return dispatch => {
    dispatch({
      type: "DEL_PRODUCT_PENDING"
    });
    const { token } = store.getState();
    const options = {
      timeout: 25000,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BEARER ${token}`
      },
      body: JSON.stringify({ code })
    };

    return fetch(`https://mcga-servidor-19.herokuapp.com/api/product/`, options)
      .then(res => res.json())
      .then(data => {
        console.log("DELETE PRODUCT", data);
        if (!Object.entries(data).length) {
          return Promise.reject(data);
        }

        return dispatch({
          type: "DEL_PRODUCT_SUCCESS",
          payload: {
            code: data.code
          }
        });
      })
      .catch(error => {
        return dispatch({
          type: "DEL_PRODUCT_ERROR",
          payload: error
        });
      });
  };
};

export const postProduct = product => {
  return dispatch => {
    dispatch({
      type: "POST_PRODUCT_PENDING"
    });
    const { token } = store.getState();
    const options = {
      timeout: 25000,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `BEARER ${token}`
      },
      body: JSON.stringify(product)
    };
    console.log("options", options);
    return fetch(`https://mcga-servidor-19.herokuapp.com/api/product/`, options)
      .then(res => res.json())
      .then(data => {
        console.log("POST PRODUCT", data);
        if (!Object.entries(data).length) {
          return Promise.reject(data);
        }

        return dispatch({
          type: "POST_PRODUCT_SUCCESS",
          payload: {
            product: data
          }
        });
      })
      .catch(error => {
        return dispatch({
          type: "POST_PRODUCT_ERROR",
          payload: error
        });
      });
  };
};
