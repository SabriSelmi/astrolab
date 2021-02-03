import React,{Component} from "react";
import {connect} from "react-redux";
import Loader from './Components/Loader/Loader';
import NavBar from './Components/Navbar/Navbar';
import Signin from './Pages/Authentication/Signin';
import Routes from './Pages/main/Routes';
import {LOGEDIN, GETWISHLISTS, GETPRODUCTS, checkUser, GETCURRENCIES} from "./redux/actions/actions";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      fetching : true
     }
  }
  componentDidMount(){
    const {LOGEDIN, GETWISHLISTS, GETPRODUCTS, GETCURRENCIES} = this.props;

    // check if user is authorized and load data to the redux store in case authenticated
    checkUser((res)=>{
      if(res){
        LOGEDIN(true)
        GETCURRENCIES();
        GETWISHLISTS();
        GETPRODUCTS();
      }
      this.setState({fetching : false})
    });
  }
  componentDidUpdate(prevProps){
    // Watch the users changes without reloading the web page
    if(this.props.isAuthenticated && this.props.isAuthenticated !== prevProps.isAuthenticated){
          this.props.GETWISHLISTS();
          this.props.GETPRODUCTS();
          this.props.GETCURRENCIES();
    }
  }
  render() { 
    const {fetching} = this.state;
    const {isAuthenticated} = this.props;
    return ( 
      !fetching ?
        isAuthenticated ?
        <div className="App">
          <NavBar/>
          <div className="padd-top-76">
            <Routes/>
          </div>
        
        </div> :
        <Signin/> :
        <Loader/>
     );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated : state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps, {GETWISHLISTS, GETPRODUCTS, LOGEDIN, GETCURRENCIES})(App);
