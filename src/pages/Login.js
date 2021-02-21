import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Redirect, Link } from 'react-router-dom';
import axios from "axios";

axios.defaults.withCredentials = true;

class Login extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
			username: '',
    		password: '',
    	};
    	this.onClickLogin = this.onClickLogin.bind(this);
  	};

  	handleInputChange = (event) => {
    	this.setState({
      		[event.target.name]: event.target.value,
    	});
  	};

  	onClickLogin(event) {
    	const { username, password } = this.state;
    	axios.post('https://task4-itransition.herokuapp.com/login', { 
    		username,  
    		password, 
    	}).then((response) => {
    		console.log(response);
    		if(!response.data.message) {
    			this.props.handleSuccessfulAuth(response.data);
    		}
		});
  	};

	render() {
		
        return (
        <div className="login">
        	<form>
                <h3 className="mb-3 text-center">Sign In</h3>
                <div className="container">
                <div className="row mb-3 mt-5 justify-content-center">
                    <label className="col-2 form-label">Username</label>
                    <input type="text" className="col-3 form-control" name="username" placeholder="Enter username" onChange={this.handleInputChange} />
                </div>                                       
                <div className="row justify-content-center">
                    <label className="col-2 form-label">Password</label>
                    <input type="password" className="col-3 form-control" name="password" placeholder="Enter password" onChange={this.handleInputChange} />
                </div>
                <div className="row mt-5 justify-content-center">
                	<button type="button" onClick={this.onClickLogin} className="btn btn-outline-primary">Submit</button>
                </div>
                </div>
            </form>
            <h3 className="mt-5 text-center">
            	<Link to="/signup" className="register_link">
          			Create an account
        		</Link>
        	</h3>
        </div>
        );
	}
}

export default Login;