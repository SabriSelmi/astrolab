import {GET_CURRENCIES, PRODUCT_FETCH, SELECT_PRODUCT, SET_PRODUCT_MODAL_ACTION} from "../actions/types";

const DEAFAULT_STATE = {
    products: [],
    product_selected : {},
    TND : 1,
    EUR : 1,
    USD : 1,
    action : "add"
}

const state = (state=DEAFAULT_STATE, action)=>{
    switch(action.type){
        case PRODUCT_FETCH:
        return { ...state, 
            products : action.payload, 
            product_selected : action.updated && state.products.length ? state.product_selected : action.payload[0] 
        }
        case SELECT_PRODUCT:
        return { ...state, product_selected : action.payload }
        case GET_CURRENCIES:
        return { ...state, TND : action.payload.TND, EUR : action.payload.EUR }
        case SET_PRODUCT_MODAL_ACTION:
        return { ...state, action : action.payload }
        default: return state
    }
}
export default state;