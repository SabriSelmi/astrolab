import React from 'react';
import {Route, Switch} from "react-router-dom";
import WishlistPage from '../Wishlist/WishList';
import ProductPage from '../Product/ProductList';

const Routes = () => {
    return ( 
        <Switch>
            <Route exact path="/products" component={ProductPage} />
            <Route exact path="/" component={WishlistPage} />
        </Switch>
     );
}
 
export default Routes;