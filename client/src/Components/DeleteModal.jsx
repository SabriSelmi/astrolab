import React, { useState } from 'react';
import Toast from "light-toast";
import { connect } from 'react-redux';
import { deleteProduct, deleteWishlist, GETPRODUCTS, GETWISHLISTS, SELECTPRODUCT, SELECTWISHLIST} from '../redux/actions/actions';

const DeleteModal = ({type, id, GETPRODUCTS, GETWISHLISTS, SELECTPRODUCT, SELECTWISHLIST, name}) => {
    const [requesting, setRequesting] = useState(false);
    const deleteElement = async () =>{
        try {
            setRequesting(true);
        if(type === "Product"){      
            //  delete product
            deleteProduct(id, (success)=>{
                if (success) {
                    GETPRODUCTS();
                    SELECTPRODUCT({});
                    Toast.success("Product Deleted successfully")
                }
            })
            
        }else{
            // delete wishlist
            deleteWishlist(id,(success)=>{
                if(success){
                    GETWISHLISTS();
                    SELECTWISHLIST({});
                    Toast.success("Wishlist Deleted successfully");
                }
            })
            
        }
        setRequesting(false);
        } catch (error) {
            setRequesting(false);
            Toast.fail("Error has been occured");
        }
        
    }
    return ( 
        <div className="modal fade" id="deleteModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Delete {type}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                
                <div className="alert alert-danger">
                    <p>
                        Are you sure you want to delete {name}?
                    </p>
                </div>
                
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" disabled={requesting}  data-dismiss="modal"
                onClick={deleteElement}>
                    Delete
                </button>
            </div>
            </div>
        </div>
    </div>
     );
}
 
export default connect(null,{GETPRODUCTS, GETWISHLISTS, SELECTPRODUCT, SELECTWISHLIST})(DeleteModal);