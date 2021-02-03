import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import navReducer from "./navReducer";
import wishlistReducer from "./wishlistReducer";
import productReducer from "./productReducer";

// combine reducers to the store
export default combineReducers({
    auth : authReducer,
    nav : navReducer,
    product : productReducer,
    wishlist : wishlistReducer,
})