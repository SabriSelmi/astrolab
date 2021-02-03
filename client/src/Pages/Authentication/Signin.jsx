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
            requesting : false
         }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleRegisterSubmit = async (e) =>{
        e.preventDefault();
        await this.setState({
            requesting : true
        })
        const {userName, email, password, password2} = this.state;
        if(password === password2){
            try {
                let res = await axios({
                    url : "/user/signup",
                    method : "POST",
                    data : {
                        userName, email, password
                    }
                })
                if(res.data.success){
                    Toast.success(res.data.message, 2000)
                    await this.setState({
                        requesting : false
                    })
                }
            } catch (error) {
                console.log(error.response.data)
                await this.setState({
                    requesting : false
                })
                Toast.fail(error.response.data.message, 2000)
            }    
        }else{
            await this.setState({
                requesting : false
            })
            Toast.fail("Passwords don't match", 3000)
        }
        
    }
    handleLoginSubmit = async (e) =>{
        const {sign_userName, sign_password} = this.state;
        e.preventDefault();
        await this.setState({
            requesting : true
        })
        try {
            let res = await axios({
                url : "/user/signin",
                method : "POST",
                data : {
                   sign_userName, sign_password
                }
            })

            if(res.data.success){
                Toast.success(res.data.message, 3000);
                this.props.LOGEDIN(true);
                await this.setState({
                    requesting : false
                })
            }
        } catch (error) {
            await this.setState({
                requesting : false
            })
            Toast.fail(error.response.data.message, 3000)
        }

    }
    render() { 
        const {userName, sign_userName, password, sign_password, password2, email, requesting} = this.state;
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
                                        <input type="text" name="userName" value={userName || ""} className="form-control input-lg" placeholder="username" onChange={this.handleChange}/>
                                    </div>

                                    <div className="form-group">
                                        <input type="email" name="email" value={email || ""} className="form-control input-lg" placeholder="Email Address" onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" autoComplete="password" value={password || ""} name="password" className="form-control input-lg" placeholder="Password" onChange={this.handleChange}/>
                                    </div>
                                        <div className="form-group">
                                        <input type="password" autoComplete="confirm-password" value={password2 || ""} name="password2" className="form-control input-lg" placeholder="Confirm Password" onChange={this.handleChange}/>
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
                                        <input type="text" name="sign_userName" value={sign_userName || ""} className="form-control input-lg" placeholder="username" onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" autoComplete="sign_password" name="sign_password" value={sign_password || ""} className="form-control input-lg" placeholder="Password" onChange={this.handleChange}/>
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