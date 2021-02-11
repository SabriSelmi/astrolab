import React from 'react';
import Truncate from "../Truncate/Truncate";
import { switchCurrency, SELECTPRODUCT } from '../../redux/actions/actions';
import "./grid.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const GridElement = ({product, TND, EUR, current_currency, SELECTPRODUCT}) => {
    return ( 
            <div className="col mb-4">
                <div className="card min-vh-60">
                    <Link to="/products" onClick={()=>SELECTPRODUCT(product)}>
                        <img src={product.image} className="card-img-top" height="250px" alt="product"/>
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>                        
                            <Truncate lines={7}>
                            <p className="card-text">
                                {product.description}
                            </p>
                            </Truncate> 
                        <p className="card-text"><small className="text-muted"><b>Price : </b> {switchCurrency(product.currency, current_currency, product.price, {TND, EUR, USD:1})} {current_currency}</small></p>
                        <p className="card-text"><small className="text-muted"><b>Status : </b> {product.status}</small></p>
                    </div>
                </div>
            </div>
     );
}
 
export default connect(null, {SELECTPRODUCT})(GridElement);