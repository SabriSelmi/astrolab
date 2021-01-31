import Cookies from 'js-cookie';
import {useEffect} from "react";
import {connect} from "react-redux";
import Signin from './Pages/Authentication/Signin';
import {LOGEDIN} from "./redux/actions/actions";

function App({isAuthenticated, LOGEDIN}) {
  console.log("isAuthenticated", isAuthenticated)
  useEffect(()=>{
    const authCookie = Cookies.get("authcookie");
    console.log("authCookie", authCookie)
    if(authCookie){
      LOGEDIN(true)
    }
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
