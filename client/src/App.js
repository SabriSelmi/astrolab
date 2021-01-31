import axios from 'axios';
import {useEffect} from "react";
import {connect} from "react-redux";
import Signin from './Pages/Authentication/Signin';
import {LOGEDIN} from "./redux/actions/actions";

function App({isAuthenticated, LOGEDIN}) {
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
      } catch (error) {
        console.log(error)
      }
  
    }
    checkRequest()
    
  })
  return (
    isAuthenticated ?
    <div className="App">
      signed up
    </div> :
    <Signin/>
  );
}
function mapStateToProps(state) {
  return {
    isAuthenticated : state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps, {LOGEDIN})(App);
