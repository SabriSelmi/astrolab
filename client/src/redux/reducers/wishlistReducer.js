import {SELECT_WISHLIST, WISHLIST_FETCH} from "../actions/types";

const DEAFAULT_STATE = {
    wishlists: [],
    wishlist_selected : {}
}

const state = (state=DEAFAULT_STATE, action)=>{
    switch(action.type){
        case WISHLIST_FETCH:
        return { ...state, wishlists : action.payload, wishlist_selected : action.updated && state.wishlists.length ? state.wishlist_selected : action.payload[0] }
        case SELECT_WISHLIST:
        return { ...state, wishlist_selected : action.payload }
        default: return state
    }
}
export default state;