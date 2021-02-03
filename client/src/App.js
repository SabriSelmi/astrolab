import axios from 'axios';
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import Loader from './Components/Loader/Loader';
import NavBar from './Components/Navbar/Navbar';
import Signin from './Pages/Authentication/Signin';
import Routes from './Pages/main/Routes';
import {LOGEDIN, GETWISHLISTS, GETPRODUCTS} from "./redux/actions/actions";
import "./App.css";

function App({isAuthenticated, LOGEDIN, GETPRODUCTS, GETWISHLISTS}) {
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
        // Check if user is authenticated
        async function getCurrenciesValue() {
          try {
            const res = await axios({
              url: "https://api.currencyfreaks.com/latest?apikey="  + process.env.API_KEY,
              method : "GET"
            })
            const tnd_value = res.data.rates["TND"];
            const eur_value = res.data.rates["EUR"];
            console.log(tnd_value, eur_value)
          } catch (error) {
            console.log(error)    
          }
      
        }
    checkRequest();
    getCurrenciesValue();
    GETWISHLISTS();
    GETPRODUCTS();
    
  })
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
function mapStateToProps(state) {
  return {
    isAuthenticated : state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps, {LOGEDIN, GETWISHLISTS, GETPRODUCTS})(App);
