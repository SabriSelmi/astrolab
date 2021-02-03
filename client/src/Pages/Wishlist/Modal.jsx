import React, { Component } from 'react';
import {connect} from "react-redux";
import {addWishlist, GETWISHLISTS, SELECTWISHLIST, updateWishlist} from "../../redux/actions/actions";

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
    
    addWishlistHandler = async () =>{
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
            await addWishlist(name_wishlist);

            // Get wishlists after update (set param to true to avoid updating the wishlist_selected in redux store )
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
    updateWishlistHandler = async () =>{
        try {
            const {name_wishlist} = this.state;
            const {GETWISHLISTS, wishlist, SELECTWISHLIST} = this.props;
            // disable adding multiple requests (UX)
            this.setState({
                requesting : true
            });
            // update wishlist
            await updateWishlist(name_wishlist, wishlist._id,(succes)=>{
                if(succes){
                    GETWISHLISTS(true);

                    // update the current wishlist selected
                    SELECTWISHLIST({
                        name : name_wishlist,
                        _id : wishlist._id
                    })
                }
            });
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
                onClick={action === "edit"? this.updateWishlistHandler : this.addWishlistHandler}>
                   {action === "edit" ? "Edit" : "Add"} Wishlist
                </button>
            </div>
            </div>
        </div>
    </div> );
    }
}
 
export default connect(null, {GETWISHLISTS, SELECTWISHLIST})(WishlistModal);