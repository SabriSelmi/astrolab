import React, { Component } from 'react';
import {connect} from "react-redux";
import {ADDWISHLIST, GETWISHLISTS} from "../../redux/actions/actions";

class WishlistModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name_wishlist : "",
            requesting : false
         }
    }
    handleChange = (e) =>{
        this.setState({
            name_wishlist : e.target.value
        })
    }
    addWishlist = async () =>{
        try {
            const {name_wishlist} = this.state;
            const {GETWISHLISTS} = this.props;
            // disable adding multiple requests (UX)
            this.setState({
                requesting : true
            });
            this.setState({
                name_wishlist : null
            });
            // add wishlist
            await ADDWISHLIST(name_wishlist);
            GETWISHLISTS();

            this.setState({
                requesting : false
            });
        } catch (error) {
            this.setState({
                requesting : false
            });        
        }

    }
    render() { 
        const {name_wishlist, requesting} = this.state;
        return ( 
        <div className="modal fade" id="addWishlist" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Add Wishlist</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text"  className="form-control" placeholder="Put wishlist name here ..." value={name_wishlist || ""} onChange={this.handleChange}/> 
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" disabled={requesting} 
                onClick={this.addWishlist}>
                    Add Wishlist
                </button>
            </div>
            </div>
        </div>
    </div> );
    }
}
 
export default connect(null, {GETWISHLISTS})(WishlistModal);