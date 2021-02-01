import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import navReducer from "./navReducer";
import wishlistReducer from "./wishlistReducer";
import productReducer from "./productReducer";

export default combineReducers({
    auth : authReducer,
    nav : navReducer,
    product : productReducer,
    wishlist : wishlistReducer,
})