import React, { Component } from 'react';
import {connect} from "react-redux";
import DeleteModal from '../../Components/DeleteModal';
import { SETPRODUCTMODALACTION, switchCurrency } from '../../redux/actions/actions';
import UpdateModal from './UpdateModal';

class ProductSection extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {product, wishlists, EUR, TND, current_currency, SETPRODUCTMODALACTION} = this.props;
        let wishlist_selected={};
        if(product && product.name){
            // indentify the wishlist selected
           wishlist_selected = wishlists.filter(el=>el._id.toString() === product.wishlist.toString())[0];
        }
        return ( 
            product && product.name ? 
            <div className="col-sm-9 mt-2">
                <div className="row">
                    <div className="col-sm-10">
                    <div className="row">
                    <div className="col-sm-4">
                        <img className="img-fluid" src={product.image} alt="product"/>
                    </div>
                    <div className="col-sm-8 d-flex justify-content-between flex-column">
                            <div>
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                            </div>
                            <div>
                                <label>Price: </label>
                                <b> {switchCurrency(product.currency, current_currency, product.price,{USD : 1, TND, EUR})  + " " + current_currency} {}</b>
                            </div>                        
                        
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-sm-3">
                        <b className="d-block">Wishlist</b>
                        <p>
                            {wishlist_selected ? wishlist_selected.name : ""}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                    <b className="d-block">Status</b>
                        <p>
                            {product.status}
                        </p>
                    </div>
                </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="text-secondary pointer" 
                            data-toggle="modal" 
                            onClick={()=>SETPRODUCTMODALACTION("edit")}
                            data-target={"#"+product._id.toString().replace(/[0-9]/g, "x")}
                            ><i className="far fa-edit"></i> Edit</div>
                        <div className="text-danger pointer" data-toggle="modal" data-target="#deleteModal"><i className="far fa-trash-alt"></i> Delete</div>
                    </div>
                </div>
                
                <DeleteModal type="Product" id={product._id} name={product.name}/>
                <UpdateModal id={product._id.toString().replace(/[0-9]/g, "x")} product={product}/>
            </div> :
            null
         );
    }
}
function mapStateToProps(state) {
    return {
        product : state.product.product_selected,
        wishlists : state.wishlist.wishlists,
        EUR : state.product.EUR,
        TND : state.product.TND,
        current_currency : state.nav.current_currency
    }
} 
export default connect(mapStateToProps, {SETPRODUCTMODALACTION})(ProductSection);