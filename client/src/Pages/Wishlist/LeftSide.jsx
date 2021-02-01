import React,{useState} from 'react';

const LeftSide = () => {
    const wishlists = ["wishlist1", "wishlist2", "wishlist3", "wishlist4"];
    const [active, setActive] = useState(0);
    return ( 
        <div className="col-sm-3 br-white min-width-100">
            <button type="button" className="btn btn-primary add-button mt-2" data-toggle="modal" data-target="#staticBackdrop">
                + Add wishlist
            </button>
                {wishlists.map((el,i)=><div className={`nav-link mt-2 pointer ${active === i ? "active-side" : ""}`} key={i} onClick={()=>setActive(i)}>{el}</div>)}
            
        </div>
     );
}
 
export default LeftSide;