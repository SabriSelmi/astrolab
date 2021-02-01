import React, { useEffect } from 'react';
import {connect} from "react-redux";

import LeftSide from '../../Components/SideBar/LeftSide';
import WishlistModal from './Modal';

const WishlistPage = ({wishlists}) => {
    return ( 
        <div className="container-fluid">
            <div className="row">
                <LeftSide 
                button={"Add Wishlist"}
                id_modal={"#addWishlist"}
                data={wishlists}
                />
                <WishlistModal/>
            </div>
        </div>
     );
}
function mapStateToProps(state) {
    return {
        wishlists : state.wishlist.wishlists
    }
} 
export default connect(mapStateToProps)(WishlistPage);