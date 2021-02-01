import React,{useState} from 'react';
import { connect } from 'react-redux';
import {SELECTPRODUCT, SELECTWISHLIST} from "../../redux/actions/actions";
import "./style.css";


const LeftSide = ({data, button, id_modal, select, SELECTPRODUCT, SELECTWISHLIST}) => {
    const [active, setActive] = useState(0);
    return ( 
        <div className="col-sm-3 br-white min-width-100">
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
    data : []
}

export default connect(null,{SELECTPRODUCT, SELECTWISHLIST})(LeftSide);