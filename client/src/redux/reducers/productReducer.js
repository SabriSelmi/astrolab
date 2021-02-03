import {PRODUCT_FETCH, SELECT_PRODUCT} from "../actions/types";

const DEAFAULT_STATE = {
    products: [],
    product_selected : {}
}

const state = (state=DEAFAULT_STATE, action)=>{
    switch(action.type){
        case PRODUCT_FETCH:
        return { ...state, products : action.payload, product_selected : action.updated ? state.product_selected : action.payload[0] }
        case SELECT_PRODUCT:
        return { ...state, product_selected : action.payload }
        default: return state
    }
}
export default state;