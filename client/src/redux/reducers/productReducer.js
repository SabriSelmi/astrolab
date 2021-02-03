import {GET_CURRENCIES, PRODUCT_FETCH, SELECT_PRODUCT} from "../actions/types";

const DEAFAULT_STATE = {
    products: [],
    product_selected : {},
    TND : 1,
    EUR : 1,
    USD : 1
}

const state = (state=DEAFAULT_STATE, action)=>{
    switch(action.type){
        case PRODUCT_FETCH:
        return { ...state, products : action.payload, product_selected : action.updated ? state.product_selected : action.payload[0] }
        case SELECT_PRODUCT:
        return { ...state, product_selected : action.payload }
        case GET_CURRENCIES:
        return { ...state, TND : action.payload.TND, EUR : action.payload.EUR }
        default: return state
    }
}
export default state;