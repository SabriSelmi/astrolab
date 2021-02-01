import {CHANGE_NAV, CHANGE_CURRENCY} from "../actions/types";

const DEAFAULT_STATE = {
    wishlists: window.location.pathname === "/" ? true : false,
    products: window.location.pathname === "/products" ? true :false,
    current_currency : "TND"
}

const state = (state=DEAFAULT_STATE, action)=>{
    switch(action.type){
        case CHANGE_NAV:
        return { ...state, wishlists :false, products:false, [action.payload] : true }
        case CHANGE_CURRENCY : 
        return {...state, current_currency : action.payload}
        default: return state
    }
}
export default state;