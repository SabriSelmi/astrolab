import axios from "axios";
import Toast from 'light-toast';

import {AUTH_SIGN_IN, 
    CHANGE_CURRENCY, 
    CHANGE_NAV,
    WISHLIST_FETCH,
    PRODUCT_FETCH,
    SELECT_PRODUCT,
    SELECT_WISHLIST
} from "./types";

export const LOGEDIN= (payload)=>{
    return dispatch =>{
        dispatch({
            type: AUTH_SIGN_IN,
            payload
        })
    }
}

export const SET_NAV = (route) =>{
    return dispatch => {
        dispatch({
            type : CHANGE_NAV,
            payload : route
        })
    }
}

export const SET_CURRENCY = (currency) =>{
    return dispatch => {
        dispatch({
            type : CHANGE_CURRENCY,
            payload : currency
        })
    }
};

export const GETWISHLISTS= (updated) =>{
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

export const ADDWISHLIST = async (name) => {
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

export const ADDPRODUCT = async (data, cb) => {
    try{
        const {inputName, inputPrice, inputCurrency, inputDescription, inputWishlist, inputStatus} = data;
            let formData = new FormData();
            formData.append('image', data.image);
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
        cb()

}catch (err){
    console.error('err', err)
    Toast.fail(err.response.data.message, 2000);
}
}

export const UPDATEPRODUCT = async (data, id) => {
    try{
        const {inputName, inputPrice, inputCurrency, inputDescription, inputWishlist, inputStatus} = data;
            let formData = new FormData();
            formData.append('image', data.image);
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

export const UPDATEWISHLIST = async (name, id) => {
    try{
        const res = await axios({
            method : "PUT",
            url : "/wishlist/" + id,
            data : {name}
        })
        Toast.success(res.data.message, 2000);

}catch (err){
    console.error('err', err)
    Toast.fail(err.response.data.message, 2000);
}
}

export const SELECTPRODUCT = (product) =>{
    return dispatch =>{
        dispatch({
            type : SELECT_PRODUCT,
            payload : product
        })
    }
}

export const SELECTWISHLIST = (wishlist) =>{
    return dispatch =>{
        dispatch({
            type : SELECT_WISHLIST,
            payload : wishlist
        })
    }
}

export const GETPRODUCTSWISHLIST = async (id, cb) =>{
    try {
        const res = await axios({
        url : "/product/products/" + id
        })
        cb(res.data.products)
    } catch (error) {
        console.log(error)
    }
}