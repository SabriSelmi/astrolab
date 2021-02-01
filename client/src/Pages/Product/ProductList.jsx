import React from 'react';
import {connect} from "react-redux";

import LeftSide from '../../Components/SideBar/LeftSide';
import ProductModal from './Modal';
import ProductSection from './ProductSection';

const ProductPage = ({products}) => {
    return ( 
        <div className="container-fluid">
            <div className="row">
                <LeftSide 
                button={"Add Product"}
                id_modal={"#addProduct"}
                data={products}
                select={"product"}
                />
                <ProductSection/>
                <ProductModal id="addProduct"/>
            </div>
        </div>
     );
}
function mapStateToProps(state) {
    return {
        products : state.product.products
    }
} 
export default connect(mapStateToProps)(ProductPage);