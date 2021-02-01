import axios from 'axios';
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import Loader from './Components/Loader/Loader';
import NavBar from './Components/Navbar/Navbar';
import Signin from './Pages/Authentication/Signin';
import Routes from './Pages/main/Routes';
import {LOGEDIN} from "./redux/actions/actions";

function App({isAuthenticated, LOGEDIN}) {
  const [fetching, setFetching] = useState(true);
  useEffect(()=>{
    // Check if user is authenticated
    async function checkRequest() {
      try {
        const res = await axios({
          url: "/user/check",
          method : "GET"
        })
        const authCookie = res.data;
        if(authCookie){
          LOGEDIN(true)
        }
        setFetching(false);
      } catch (error) {
        console.log(error)
        setFetching(false);

      }
  
    }
    checkRequest()
    
  })
  return (
    !fetching ?
    isAuthenticated ?
    <div className="App">
      <NavBar/>
      <Routes/>
    </div> :
    <Signin/> :
    <Loader/>
  );
}
function mapStateToProps(state) {
  return {
    isAuthenticated : state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps, {LOGEDIN})(App);
