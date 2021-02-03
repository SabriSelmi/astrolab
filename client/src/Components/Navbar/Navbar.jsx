import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {SET_NAV, SET_CURRENCY} from "../../redux/actions/actions";
import "./navbar.css";
import Logo from "../../assets/easyshop-mini.png";
import axios from 'axios';

const NavBar = ({wishlists, products, current_currency, SET_CURRENCY, SET_NAV}) => {
    const logout = async () => {
        // delete cookies 
        await axios.get("/user/logout");
        window.location.reload();
    }
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/#"><img className="img-fluid" src={Logo} alt="logo"/></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className={`nav-link ${wishlists ? "active" : ""}`} to="/" onClick={()=>SET_NAV("wishlists")}>
                    <i className="far fa-heart"></i> My Wishlists
                </Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${products ? "active" : ""}`} to="/products" onClick={()=>SET_NAV("products")}>
                    <i className="fab fa-product-hunt"></i> My products
                </Link>
                </li>               
            </ul>
            <ul className="navbar-nav ml-auto mr-5">
                <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
                    <i className="fas fa-user-circle"></i>
                    </span>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/" onClick={logout}>Logout</Link></li>
                    </ul>
                </li>
                <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
                    {current_currency}
                    </span>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                        <li><span className="dropdown-item pointer" onClick={()=>SET_CURRENCY("TND")}>TND</span></li>
                        <li><span className="dropdown-item pointer" onClick={()=>SET_CURRENCY("USD")}>USD</span></li>
                        <li><span className="dropdown-item pointer" onClick={()=>SET_CURRENCY("EUR")}>EUR</span></li>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
     );
}
function mapStateToProps(state) {
    return {
        wishlists : state.nav.wishlists,
        products : state.nav.products,
        current_currency : state.nav.current_currency
    }
}
export default connect(mapStateToProps, {SET_NAV, SET_CURRENCY})(NavBar);