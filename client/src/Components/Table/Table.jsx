import React, { useEffect, useState } from 'react';
import { switchCurrency } from '../../redux/actions/actions';
import "./table.css";

const Table = ({cols, data, lines, TND, EUR, current_currency}) => {
    const [active, setActive] = useState(1);
    const [dataShowed, setDataShowed] = useState([]);
    const pagesNumber = Math.ceil(data.length / lines);
    useEffect(()=>{
        // init first set of data
        const initData = data.slice(0,lines);
        setDataShowed(initData)
    },[data, lines])

    // Navigate to the next page
    const increment = () =>{
        setActive(active + 1)
        setDataShowed(data.slice(active * lines  , active * lines  + lines))
    }

    // Navigate to the previous page
    const decrement = () =>{
        setActive(active - 1)
        setDataShowed(data.slice((active -1) * lines - lines, (active-1) * lines))
    }
    return ( 
        <div className="table-responsive">
        <table className="table mt-5">
            <thead className="thead-dark">
                <tr>
                    {cols.map((el,i)=><th scope="col" className="text-capitalize" key={i}>{el}</th>)}
                </tr>
            </thead>
            <tbody>
                {dataShowed.map((product,i)=>
                <tr key={i}>
                   {cols.map((el,j)=>
                   <td key={j}>
                       {el ==="image"?
                       <img className="img-table img-fluid" src={product[el]} alt="product"/>:
                       el === "price" ?
                        // switch currency function it takes as vars "current currency",
                        // "currency to switch to" , "total value", "values related to 1 USD"
                       switchCurrency(product["currency"], current_currency, product[el], {TND, EUR, USD : 1}) :
                       el === "currency" ?
                       current_currency :
                       product[el]
                       }
                   </td>)                 
                   } 
                </tr>)}
            </tbody>
        </table>
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
Table.defaultProps = {
    cols : []
}
export default Table;