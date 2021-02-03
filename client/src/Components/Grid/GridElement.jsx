import React from 'react';
import { switchCurrency } from '../../redux/actions/actions';
import "./grid.css";

const GridElement = ({product, TND, EUR, current_currency}) => {
    return ( 
            <div className="col mb-4">
                <div className="card h-100">
                    <img src={product.image} className="card-img-top" height="250px" alt="product"/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text"><small className="text-muted"><b>Price : </b> {switchCurrency(product.currency, current_currency, product.price, {TND, EUR, USD:1})} {current_currency}</small></p>
                        <p className="card-text"><small className="text-muted"><b>Status : </b> {product.status}</small></p>
                    </div>
                </div>
            </div>
     );
}
 
export default GridElement;