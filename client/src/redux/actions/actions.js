import axios from "axios";
import Toast from 'light-toast';

import {AUTH_SIGN_IN, 
    CHANGE_CURRENCY, 
    CHANGE_NAV,
    WISHLIST_FETCH,
    PRODUCT_FETCH,
    SELECT_PRODUCT,
    SELECT_WISHLIST,
    GET_CURRENCIES,
    SET_PRODUCT_MODAL_ACTION
} from "./types";

export const checkUser = async (cb) => {
    // cookies are httpOnly so checking the authorization from server
    try {
      const res = await axios({
        url: "/user/check",
        method : "GET"
      })
      const authCookie = res.data;
      if(authCookie){
        cb(true)
      }
    } catch (error) {
      console.log(error)
        cb(false)
    }

  }

  export const switchCurrency = (from, to, value, data) =>{
    //   switch currency and return the new value
      return ((value/data[from]) * data[to]).toFixed(2)
  }

  export const GETCURRENCIES = () => {
    return async dispatch =>{
        try {
            // Get currencies values based on 1 USD
            const res = await axios({
              url: "/currencies",
              method : "GET"
            })
            const tnd_value = res.data.tnd_value;
            const eur_value = res.data.eur_value;
            dispatch({
                type: GET_CURRENCIES,
                payload : {TND : tnd_value, EUR : eur_value}
            })
          } catch (error) {
            console.log(error)    
          }
    }
  }

export const LOGEDIN= (payload)=>{
    // switch redux state isAuthenticated according to the payload
    return dispatch =>{
        dispatch({
            type: AUTH_SIGN_IN,
            payload
        })
    }
}

export const SET_NAV = (route) =>{
    // controle the active route of the navigation bar
    return dispatch => {
        dispatch({
            type : CHANGE_NAV,
            payload : route
        })
    }
}

export const SET_CURRENCY = (currency) =>{
    // Change the redux state with the selected currency from the navigation bar
    return dispatch => {
        dispatch({
            type : CHANGE_CURRENCY,
            payload : currency
        })
    }
};

export const GETWISHLISTS= (updated) =>{
    // get wishlists and store them in redux state
    return async dispatch =>{
        try{
        const res = await axios({
            url:  `/wishlist/`,
            method: 'get',
        })
        dispatch({
            type: WISHLIST_FETCH,
            payload: res.data.wishlists,
            updated
        })

    }catch (err){
        console.error('err', err)
    }
    }
};

export const addWishlist = async (name) => {
    // add a new wishlist
        try{
            const res = await axios({
                method : "POST",
                url : "/wishlist",
                data : {
                    name
                }
            })
            Toast.success(res.data.message, 2000);

    }catch (err){
        console.error('err', err)
        Toast.fail(err.response.data.message, 2000);
    }
}

export const GETPRODUCTS= (updated) =>{
    // get products and store them in the redux state
    return async dispatch =>{
        try{
        const res = await axios({
            url:  `/product/`,
            method: 'get',
        })
        dispatch({
            type: PRODUCT_FETCH,
            payload: res.data.products,
            updated
        })

    }catch (err){
        console.error('err', err)
    }
    }
};

export const addProduct = async (data, cb) => {
    try{
        // add a new product
        const {inputName, inputPrice, inputCurrency, inputDescription, inputWishlist, inputStatus, image} = data;
        console.log("add product data", data)
            let formData = new FormData();
            formData.append('image', image);
            formData.append('name', inputName);
            formData.append('description', inputDescription);
            formData.append('price', inputPrice);
            formData.append('currency', inputCurrency);
            formData.append('wishlist', inputWishlist);
            formData.append('status', inputStatus);
        const res = await axios({
            method : "POST",
            url : "/product",
            data : formData
        })
        Toast.success(res.data.message, 2000);
        cb(true)

}catch (err){
    cb(false)
     Toast.fail(err.response.data.message, 2000);
}
}

export const updateProduct = async (data, id) => {
    try{
        // update a product
        const {inputName, inputPrice, inputCurrency, inputDescription, inputWishlist, inputStatus, image} = data;
            let formData = new FormData();
            formData.append('image', image);
            formData.append('name', inputName);
            formData.append('description', inputDescription);
            formData.append('price', inputPrice);
            formData.append('currency', inputCurrency);
            formData.append('wishlist', inputWishlist);
            formData.append('status', inputStatus);
        const res = await axios({
            method : "PUT",
            url : "/product/" + id,
            data : formData
        })
        Toast.success(res.data.message, 2000);

}catch (err){
    console.error('err', err)
    Toast.fail(err.response.data.message, 2000);
}
}

export const updateWishlist = async (name, id, cb) => {
    try{
        // update a wishlist
        const res = await axios({
            method : "PUT",
            url : "/wishlist/" + id,
            data : {name}
        })
        cb(true)
        Toast.success(res.data.message, 2000);

}catch (err){
    cb(false)
    Toast.fail(err.response.data.message, 2000);
}
}

export const SELECTPRODUCT = (product) =>{
    // select a product from the side bar and store it to redux state
    return dispatch =>{
        dispatch({
            type : SELECT_PRODUCT,
            payload : product
        })
    }
}

export const SELECTWISHLIST = (wishlist) =>{
        // select a wishlist from the side bar and store it to redux state
        return dispatch =>{
        dispatch({
            type : SELECT_WISHLIST,
            payload : wishlist
        })
    }
}

export const getProductsWishlist = async (id, cb) =>{
    try {
        // get the products related to a specific wishlist
        const res = await axios({
        url : "/product/products/" + id
        })
        cb(res.data.products)
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id, cb) =>{
    try {
        // delete a product
        await axios({
        url : "/product/"+id,
        method : "DELETE"
        });
        cb(true)
    } catch (error) {
        cb(false)
    }
    
}

export const deleteWishlist = async (id, cb) =>{
    try {
        // delete a wishlist
        await axios({
        url : "/wishlist/"+id,
        method : "DELETE"
        });
        cb(true)
    } catch (error) {
        cb(false)
    }
    
}

export const SETPRODUCTMODALACTION = (action) =>{
    return dispatch =>{
        dispatch({
            type : SET_PRODUCT_MODAL_ACTION,
            payload : action
        })
    }
}