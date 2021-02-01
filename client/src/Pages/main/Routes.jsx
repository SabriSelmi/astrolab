import React from 'react';
import {Route, Link, Switch} from "react-router-dom";
import WishlistPage from '../Wishlist/WishList';

const Routes = () => {
    return ( 
        <Switch>
            <Route exact path="/" component={WishlistPage} />
        </Switch>
     );
}
 
export default Routes;