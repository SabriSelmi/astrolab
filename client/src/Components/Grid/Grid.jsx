import React, {useEffect, useState} from 'react';
import "./grid.css";
import GridElement from './GridElement';

const Grid = ({data, elementsNumber}) => {
    const [active, setActive] = useState(1);
    const [dataShowed, setDataShowed] = useState([]);
    const pagesNumber = Math.ceil(data.length / elementsNumber);
    useEffect(()=>{
        const initData = data.slice(0,elementsNumber);
        setDataShowed(initData)
    },[data, elementsNumber])
    const increment = () =>{
        setActive(active + 1)
        setDataShowed(data.slice(active * elementsNumber  , active * elementsNumber  + elementsNumber))
    }
    const decrement = () =>{
        setActive(active - 1)
        setDataShowed(data.slice((active -1) * elementsNumber - elementsNumber, (active-1) * elementsNumber))
    }
    return ( 
        <div className="mt-5">
            <div className="row row-cols-1 row-cols-md-3">
                {
                    dataShowed.map((el,i)=><GridElement product={el} key={i}/>)
                }                    
            </div>
            {dataShowed.length?
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className={active === 1 ?"page-item disabled" : "page-item"}>
                    <span className="page-link pointer" onClick={active === 1 ? null : decrement}>Previous</span>
                    </li>
                    {active === 1 ? null : 
                    <li className="page-item"><span className="page-link pointer"  onClick={active === 1 ? null : decrement} >{active - 1}</span></li>
                    }
                    <li className="page-item active" aria-current="page">
                    <span className="page-link pointer">{active}</span>
                    </li>
                    {active === pagesNumber ? null : 
                    <li className="page-item"><span className="page-link pointer"  onClick={active === pagesNumber ? null : increment} >{active + 1}</span></li>
                    }
                    <li className={active === pagesNumber ? "page-item disabled" : "page-item"}>
                    <span className="page-link pointer" onClick={active === pagesNumber ? null : increment} >Next</span>
                    </li>
                </ul>
            </nav>:null}
        </div>
        
     );
}
 
export default Grid;