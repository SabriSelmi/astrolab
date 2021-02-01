import {WISHLIST_FETCH} from "../actions/types";

const DEAFAULT_STATE = {
    wishlists: []
}

const state = (state=DEAFAULT_STATE, action)=>{
    switch(action.type){
        case WISHLIST_FETCH:
        return { ...state, wishlists : action.payload }
        default: return state
    }
}
export default state;