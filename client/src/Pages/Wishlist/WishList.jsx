import React from 'react';
import LeftSide from './LeftSide';
import WishlistModal from './Modal';
import "./style.css";

const WishlistPage = () => {
    return ( 
        <div className="container-fluid">
            <div className="row">
                <LeftSide/>
                <WishlistModal/>
            </div>
        </div>
     );
}
 
export default WishlistPage;