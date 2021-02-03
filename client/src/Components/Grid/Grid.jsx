import React, {Component} from 'react';
import "./grid.css";
import GridElement from './GridElement';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            active : 1,
            dataShowed : []
        }
    }
    componentDidMount(){
        const {data, elementsNumber} = this.props;
        const initData = data.slice(0,elementsNumber);
        this.setState({
            dataShowed : initData
        });
    }
    componentDidUpdate(prevProps){
        if(JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)){
            const {data, elementsNumber} = this.props;
            const initData = data.slice(0,elementsNumber);
            this.setState({
                dataShowed : initData,
                active : 1,
            });
        }
    }
    // Navigate to the next page
    increment = () =>{
        const {active} = this.state;
        const {data, elementsNumber} = this.props;
        this.setState({
            active : this.state.active + 1,
            dataShowed : data.slice(active * elementsNumber  , active * elementsNumber  + elementsNumber)
        })
    }

    // Navigate to the previous page
    decrement = () =>{
        const {active} = this.state;
        const {data, elementsNumber} = this.props;
        this.setState({
            active : active - 1,
            dataShowed : data.slice((active -1) * elementsNumber - elementsNumber, (active-1) * elementsNumber)
        })
    }
    render() { 
        const {TND, EUR, current_currency, data, elementsNumber} = this.props;
        const {dataShowed, active} = this.state;
        const pagesNumber = Math.ceil(data.length / elementsNumber);
        return(
        <div className="mt-5">
            <div className="row row-cols-1 row-cols-md-3">
                {
                    dataShowed.map((el,i)=><GridElement product={el} key={i} TND={TND} EUR={EUR} current_currency={current_currency}/>)
                }                    
            </div>
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
        </div>
        
     )
    }
}
 
export default Grid;