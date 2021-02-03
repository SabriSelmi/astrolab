import React, { Component } from 'react';
import {connect} from "react-redux";
import {ADDWISHLIST, GETWISHLISTS, SELECTWISHLIST, UPDATEWISHLIST} from "../../redux/actions/actions";

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
    componentDidMount(){
        if(this.props.action === "edit"){
            const {wishlist} = this.props;
            this.setState({
                name_wishlist : wishlist.name
            })
        }
    }
    componentDidUpdate(prevProps){      
        if(this.props.wishlist !== prevProps.wishlist){            
            this.setState({
                name_wishlist :this.props.wishlist.name
            })
        }
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
            GETWISHLISTS(true);

            this.setState({
                requesting : false
            });
        } catch (error) {
            this.setState({
                requesting : false
            });        
        }

    }
    updateWishlist = async () =>{
        try {
            const {name_wishlist} = this.state;
            const {GETWISHLISTS, wishlist, SELECTWISHLIST} = this.props;
            // disable adding multiple requests (UX)
            this.setState({
                requesting : true
            });
            this.setState({
                name_wishlist : null
            });
            // add wishlist
            await UPDATEWISHLIST(name_wishlist, wishlist._id);
            GETWISHLISTS(true);
            SELECTWISHLIST({
                name : name_wishlist,
                _id : wishlist._id
            })
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
        const {action, id} = this.props;
        return ( 
        <div className="modal fade" id={id} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">{action === "edit" ? "Edit" : "Add"}  Wishlist</h5>
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
                onClick={action === "edit"? this.updateWishlist : this.addWishlist}>
                   {action === "edit" ? "Edit" : "Add"} Wishlist
                </button>
            </div>
            </div>
        </div>
    </div> );
    }
}
 
export default connect(null, {GETWISHLISTS, SELECTWISHLIST})(WishlistModal);