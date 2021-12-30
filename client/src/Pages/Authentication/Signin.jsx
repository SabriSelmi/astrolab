import React from "react";
import axios from "axios";
import Toast from 'light-toast';
import {LOGEDIN} from "../../redux/actions/actions";

import "./style.css"
import { connect } from "react-redux";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            requesting : false,
            showPass : false,
            showConfirm : false,
            showSigninPass :false
         }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    // user sign up handler
    handleRegisterSubmit = async (e) =>{
        e.preventDefault();

        // Disable button when submitting
        this.setState({
            requesting : true
        })

        const {userName, email, password, password2} = this.state;

        // Compare passwords
        if(password === password2){
            try {
                // Add new user
                let res = await axios({
                    url : "/user/signup",
                    method : "POST",
                    data : {
                        userName, email, password
                    }
                })
                if(res.data.success){
                    Toast.success(res.data.message, 2000)
                    this.setState({
                        requesting : false,
                        userName :"", 
                        email : "", 
                        password : "", 
                        password2 : ""
                    })
                }
            } catch (error) {
                this.setState({
                    requesting : false
                })
                Toast.fail(error.response.data.message, 2000)
            }    
        }else{
            this.setState({
                requesting : false
            })
            Toast.fail("Passwords don't match", 2000)
        }
        
    }
    // function to handle login action
    handleLoginSubmit = async (e) =>{
        const {sign_userName, sign_password} = this.state;
        e.preventDefault();
        this.setState({
            requesting : true
        })
        try {
            // sign in user
            let res = await axios({
                url : "/user/signin",
                method : "POST",
                data : {
                   sign_userName, sign_password
                }
            })

            if(res.data.success){
                Toast.success(res.data.message, 3000);
                this.setState({
                    requesting : false
                })
                this.props.LOGEDIN(true);
            }
        } catch (error) {
            this.setState({
                requesting : false
            })
            Toast.fail(error.response.data.message, 3000)
        }

    }
    showPassword = (input)=>{
        const {showPass, showConfirm, showSigninPass} = this.state;
        switch (input) {
            case "password":
                this.setState({
                    showPass : !showPass
                })
                break;

            case "confirm-password":
                this.setState({
                    showConfirm : !showConfirm
                })
                break;

            case "sign_password":
                this.setState({
                    showSigninPass : !showSigninPass
                })
                break;

            default:
                break;
        }
    }
    render() { 
        const {userName, sign_userName, password, showPass, showConfirm,
               showSigninPass, sign_password, password2, email, requesting} = this.state;
        return ( 
            <div className="container-fluid head-title-login">
		        <div className="container sign-container">
                    <h2 className="text-center">Welcome to E@sy Shop</h2>
                    <p className="text-center">
                        <small id="passwordHelpInline" className="text-muted"> Follow us on facebook <a href="https://www.facebook.com/triples.a"> E@sy Shop</a>.</small>
                    </p>
                    <hr/>
                    <div className="row">
                        <div className="col-md-5">
                            <form onSubmit={this.handleRegisterSubmit}>
                                <fieldset>							
                                    <p className="text-uppercase pull-center text-secondary"><b>SIGN UP</b> </p>	
                                    <div className="form-group">
                                        <label htmlFor="userName">User Name *</label>
                                        <input type="text" name="userName" id="userName" value={userName || ""} className="form-control input-lg" placeholder="username" onChange={this.handleChange} required/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input type="email" name="email" id="email" value={email || ""} className="form-control input-lg" placeholder="Email Address" onChange={this.handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password *</label>
                                        <input type={showPass?"text":"password"} id="password" 
                                                autoComplete="password" value={password || ""} 
                                                name="password" className="form-control input-lg d-inline" 
                                                placeholder="Password" onChange={this.handleChange} 
                                                required/>
                                        <i className="far fa-eye ml--30 pointer" onClick={()=>this.showPassword("password")}></i>
                                    </div>
                                        <div className="form-group">
                                        <label htmlFor="confirm-password">Confirm Password *</label>
                                        <input type={showConfirm?"text":"password"} id="confirm-password" 
                                                autoComplete="confirm-password" 
                                                value={password2 || ""} name="password2" 
                                                className="form-control input-lg d-inline" 
                                                placeholder="Confirm Password" 
                                                onChange={this.handleChange} required/>
                                        <i className="far fa-eye ml--30 pointer" onClick={()=>this.showPassword("confirm-password")}></i>
                                    </div>
                                    <div className="mt-2">
                                            <button type="submit" className="btn btn-md btn-primary" disabled={requesting}>Register</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        
                        <div className="col-md-2 mb-2">
                        </div>
                        
                        <div className="col-md-5">
                                <form onSubmit={this.handleLoginSubmit}>
                                <fieldset>							
                                    <p className="text-uppercase text-secondary"> <b>Login using your account:</b> </p>	
                                        
                                    <div className="form-group">
                                        <label htmlFor="sign_userName">User Name *</label>
                                        <input type="text" name="sign_userName" id="sign_userName" value={sign_userName || ""} className="form-control input-lg" placeholder="username" onChange={this.handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="sign_password">Password *</label>    
                                        <input type={showSigninPass?"text":"password"} id="sign_password" 
                                                autoComplete="sign_password" name="sign_password" 
                                                value={sign_password || ""} className="form-control input-lg d-inline" 
                                                placeholder="Password" 
                                                onChange={this.handleChange} 
                                                required/>
                                    
                                        <i className="far fa-eye ml--30 pointer" onClick={()=>this.showPassword("sign_password")}></i>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-md btn-primary" disabled={requesting}>Sign In</button>
                                    </div>
                                        
                                </fieldset>
                        </form>	
                        </div>
                    </div>
                </div>
                <p className="text-center">
                    <small id="passwordHelpInline" className="text-muted"> Developer:<a href="https://www.facebook.com/triples.a"> Sabri Selmi</a> Full stack js developer since @2019</small>
                </p>
            </div>
         );
    }
}
 
export default connect(null, {LOGEDIN})(Signin);