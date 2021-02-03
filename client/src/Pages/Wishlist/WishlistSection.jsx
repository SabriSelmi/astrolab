import React, { Component } from 'react';
import {connect} from "react-redux";
import DeleteModal from '../../Components/DeleteModal';
import Grid from '../../Components/Grid/Grid';
import Table from '../../Components/Table/Table';
import { GETPRODUCTSWISHLIST } from '../../redux/actions/actions';
import Modal from './Modal';

class WishlistSection extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products : [],
            status : 0,
            list : true
         }
    }
    componentDidMount(){
        const id_wishlist = this.props.wishlist ? this.props.wishlist._id : null;
        if(id_wishlist){
           GETPRODUCTSWISHLIST(id_wishlist, (data)=>this.setState({
               products : data
           }))
            
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.wishlist && this.props.wishlist._id !== prevProps.wishlist._id){
            GETPRODUCTSWISHLIST(this.props.wishlist._id, (data)=>this.setState({
                products : data
            }))
        }
    }
    changeStatus = (status) =>{
        this.setState({
            status 
        })
    }
    changeView = (list) =>{
        this.setState({
            list
        })
    }
    render() { 
        const {wishlist} = this.props;
        let {products, status, list} = this.state;
        const cols = products.length ? 
        Object.keys(products[0])
        .filter(el=> el !== "wishlist" && el !== "_id" && el !== "id_user" && el !== "createdAt" && el !== "updatedAt" && el !== "__v") : 
        [];
        products = products.filter(el=>status === 0 ? el["status"] === "to buy" : el["status"] === "bought" )
        return ( 
            wishlist && wishlist.name ? 
            <div className="col-sm-9 mt-2">
                <div className="d-flex justify-content-between">
                    <h5>{wishlist.name}</h5>
                    <div className="row w-188">
                        <div className="text-secondary pointer col-6" data-toggle="modal" data-target={"#"+wishlist._id.toString().replace(/[0-9]/g, "x")}><i className="far fa-edit"></i> Edit</div>
                        <div className="text-danger pointer col-6" data-toggle="modal" data-target="#deleteModal"><i className="far fa-trash-alt"></i> Delete</div>
                    </div>
                </div>
                <div className="b-white d-flex justify-content-between p-3 mt-3">
                    <div className="row">
                        <div className={`col-6 pointer ${status === 0 ?"active-tab" :""}`} onClick={()=>this.changeStatus(0)}>
                            To buy
                        </div>
                        <div className={`col-6 pointer ${status === 1 ?"active-tab" :""}`} onClick={()=>this.changeStatus(1)}>
                            Bought
                        </div>
                    </div>
                    <div className="row w-188">
                        <div className={`col-6 pointer ${!list ?"active-tab" :""}`} onClick={()=>this.changeView(false)}>
                            <i className="fas fa-th"></i> Grid
                        </div>
                        <div className={`col-6 pointer ${list?"active-tab" :""}`} onClick={()=>this.changeView(true)}>
                            <i className="fas fa-list"></i> List
                        </div>
                    </div>
                </div>
                {list && products.length?<Table cols={cols} data={products} lines={2}/>:
                products.length ? <Grid data={products} elementsNumber={3}/>:
                null
                }                
                <DeleteModal type="Wishlist" id={wishlist._id} name={wishlist.name}/>
                <Modal action="edit" id={wishlist._id.toString().replace(/[0-9]/g, "x")} wishlist={wishlist}/>
            </div> :
            null
         );
    }
}
function mapStateToProps(state) {
    return {
        wishlist : state.wishlist.wishlist_selected,
    }
} 
export default connect(mapStateToProps)(WishlistSection);