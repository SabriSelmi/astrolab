import React, { Component } from 'react';
import {connect} from "react-redux";
import {GETPRODUCTS, SELECTPRODUCT, updateProduct} from "../../redux/actions/actions";

class UpdateModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            requesting : false,   
            inputStatus : "to buy",
            inputCurrency : "TND",         
         }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    componentDidMount(){
        if(this.props.product){
            // set state variables of the current product if the action is edit
            const {name, price, currency, description, wishlist, status} = this.props.product;
            this.setState({
                inputName :name, 
                inputPrice :price, 
                inputCurrency :currency, 
                inputDescription :description,
                inputWishlist :wishlist, 
                inputStatus :status
            })
        }
    }
    componentDidUpdate(prevProps){      
        // watch the changes of the product selected to refresh the values of the state
        if(this.props.product !== prevProps.product){
            const {name, price, currency, description, wishlist, status} = this.props.product;
            this.setState({
                inputName :name, 
                inputPrice :price, 
                inputCurrency :currency, 
                inputDescription :description,
                inputWishlist :wishlist, 
                inputStatus :status
            })
        }
    }
    // convert image file to base64  
    getBase64 = (file, cb) =>{
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    // handle the file changes
    handleFile = (e) =>{
        let photo = e.target.files[0];
        this.getBase64(photo, result=>{
        this.setState({
            image:photo,
            buffer :result
        })
        });

    }
    updateProductHandler = async (e)=>{
        e.preventDefault()
        try {
            const {GETPRODUCTS, product, SELECTPRODUCT} = this.props;
            const {buffer, inputName, inputPrice, inputCurrency, inputDescription, inputWishlist, inputStatus} = this.state;
            // disable adding multiple requests (UX)
            this.setState({
                requesting : true
            });

            // edit product
            await updateProduct(this.state, product._id);
            GETPRODUCTS(true);
            SELECTPRODUCT({
                _id : product._id,
                name : inputName,
                price : inputPrice,
                currency : inputCurrency,
                wishlist : inputWishlist,
                description : inputDescription,
                status : inputStatus,
                image : buffer ? buffer : product.image
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
    clearFile = () =>{
        this.setState({
            image : null,
            buffer : null
        })
    }
    render() { 
        const {inputName, inputPrice, inputCurrency, inputDescription, inputWishlist, inputStatus, requesting, buffer} = this.state;
        const {wishlists, id, product} = this.props;

        return ( 
        <div className="modal fade" id={id} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Edit Product</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="container-fluid">
                <form onSubmit={this.updateProductHandler}>
                    <div className="form-group text-center">
                    {buffer ? <button type="button" className="close" aria-label="Close" onClick={this.clearFile}>
                        <span aria-hidden="true">&times;</span>
                    </button> : null}
                        <label htmlFor="inputImage">
                            {buffer ?<img width="50%" className="img-fluid rounded-circle" src={buffer} alt="input-product"/> : 
                            <img width="50%" className="img-fluid rounded-circle" 
                            src={product.image? product.image : 
                            "https://res.cloudinary.com/natulyn/image/upload/v1612184228/default-pro_aexujq.jpg"} 
                            alt="input-product"/> }
                        </label>
                        <input type="file" className="form-control-file" id="inputImage" hidden onChange={this.handleFile}/>  
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputName">Name</label>
                            <input type="text" className="form-control" name="inputName" id="inputName" value={inputName || ""} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputPrice">Price</label>
                            <input type="number" className="form-control" name="inputPrice" id="inputPrice" value={inputPrice || ""} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputCurrency">Currency</label>
                            <select id="inputCurrency" className="form-control" name="inputCurrency" value={inputCurrency || ""} onChange={this.handleChange}>
                            <option value="TND">TND</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDescription">Description</label>
                        <textarea className="form-control" id="inputDescription" name="inputDescription" rows="3" value={inputDescription} onChange={this.handleChange}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputWishlist">Wishlist</label>
                            <select id="inputWishlist" className="form-control" name="inputWishlist" value={inputWishlist} onChange={this.handleChange}>
                                {wishlists.map((el,i)=><option key={i} value={el._id}>{el.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputStatus">Status</label>
                            <select id="inputStatus" className="form-control" name="inputStatus" value={inputStatus || "to buy"} onChange={this.handleChange}>
                                <option value="to buy">To Buy</option>
                                <option value="bought">Bought</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" disabled={requesting}>
                        Edit Product
                        </button>
            </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div> );
    }
}
function mapStateToProps(state) {
    return {
        wishlists : state.wishlist.wishlists
    }
} 
export default connect(mapStateToProps, {GETPRODUCTS, SELECTPRODUCT})(UpdateModal);