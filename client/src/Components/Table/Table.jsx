import React, { Component } from 'react';
import { switchCurrency } from '../../redux/actions/actions';
import "./table.css";

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            active : 1,
            dataShowed : []
        }
    }
    componentDidMount(){
        // init array with the first set of data
        const {data, lines} = this.props;
        const initData = data.slice(0,lines);
        this.setState({
            dataShowed : initData
        });
    }
    componentDidUpdate(prevProps){
        if(JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)){
            // watch data modification on switching wishlist to init data
            const {data, lines} = this.props;
            const initData = data.slice(0,lines);
            this.setState({
                dataShowed : initData,
                active : 1,
            });
        }
    }
    // Navigate to the next page
    increment = () =>{
        const {active} = this.state;
        const {data, lines} = this.props;
        this.setState({
            active : this.state.active + 1,
            dataShowed : data.slice(active * lines  , active * lines  + lines)
        })
    }

    // Navigate to the previous page
    decrement = () =>{
        const {active} = this.state;
        const {data, lines} = this.props;
        this.setState({
            active : active - 1,
            dataShowed : data.slice((active -1) * lines - lines, (active-1) * lines)
        })
    }
    
    render() { 
        const {cols, TND, EUR, current_currency, data, lines} = this.props;
        const {dataShowed, active} = this.state;

        // calculate the page number
        const pagesNumber = Math.ceil(data.length / lines);

        return ( <div className="table-responsive">
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
                <span className="page-link pointer" onClick={active === 1 ? null : this.decrement}>Previous</span>
                </li>
                {active === 1 ? null : 
                <li className="page-item"><span className="page-link pointer"  onClick={active === 1 ? null : this.decrement} >{active - 1}</span></li>
                }
                <li className="page-item active" aria-current="page">
                <span className="page-link pointer">{active}</span>
                </li>
                {active === pagesNumber ? null : 
                <li className="page-item"><span className="page-link pointer"  onClick={active === pagesNumber ? null : this.increment} >{active + 1}</span></li>
                }
                <li className={active === pagesNumber ? "page-item disabled" : "page-item"}>
                <span className="page-link pointer" onClick={active === pagesNumber ? null : this.increment} >Next</span>
                </li>
            </ul>
        </nav>:null}
        </div> );
    }
}
 
Table.defaultProps = {
    cols : []
}
export default Table;