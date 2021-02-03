import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {SELECTPRODUCT, SELECTWISHLIST} from "../../redux/actions/actions";
import "./style.css";


const LeftSide = ({data, button, id_modal, select, product_selected,
    SELECTPRODUCT, SELECTWISHLIST, wishlist_selected}) => {
    const [active, setActive] = useState();
    useEffect(()=>{
        if(select === "product"){
            if(!product_selected){
                // init product selected to show in the right side of the screen
                const initData = data[0]?data[0]["_id"]:"";
                setActive(initData);
            }else{
                setActive(product_selected._id);
            }
        }else{
            if(!wishlist_selected){
                // init wishlist selected to show in the right side of the screen
                const initData = data[0]?data[0]["_id"]:"";
                setActive(initData);
            }else{
                setActive(wishlist_selected._id);
            }
        }
        

    },[data, active, wishlist_selected, product_selected, select])
    return ( 
        <div className="col-sm-3 br-white min-height-100">
            <button type="button" className="btn btn-primary add-button mt-2" data-toggle="modal" data-target={id_modal}>
                + {button}
            </button>
                {data.map((el,i)=><div className={`nav-link mt-2 pointer ${active === el._id.toString() ? "active-side" : ""}`} key={i} 
                onClick={()=>{
                    setActive(el._id.toString());
                    if(select === "product"){
                        SELECTPRODUCT(el)
                    }else{
                        SELECTWISHLIST(el)
                    }
                }
                }>
                        {el.name}
                </div>)}
            
        </div>
     );
}

LeftSide.defaulProps={
    data : [{}]
}
function mapStateToProps(state) {
    return {
        wishlist_selected : state.wishlist.wishlist_selected,
        product_selected : state.product.product_selected,
    }
}
export default connect(mapStateToProps,{SELECTPRODUCT, SELECTWISHLIST})(LeftSide);