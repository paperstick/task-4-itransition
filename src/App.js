import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Users from './pages/Users.js';
import PrivateRoute from './PrivateRoute.js';
import LoginRoute from './LoginRoute.js';
import axios from "axios";
import { withRouter } from "react-router";

axios.defaults.withCredentials = true;

class App extends Component {
  constructor() {
  	super();
  	this.state = {
  	  loggedInStatus: "NOT_LOGGED_IN",
  	  user: {},
  	}
	this.handleLogin = this.handleLogin.bind(this);
	this.handleLogout = this.handleLogout.bind(this);
	this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

   checkLoginStatus() {
    axios
      .get("https://task4-itransition.herokuapp.com/login")
      .then(response => {
      	this.setState({loggedInStatus: response.data.loggedInStatus, user: response.data.username});
      });
  }

  handleSuccessfulAuth(data) {
   	this.handleLogin(data);
   	this.props.history.push("/users");
  }

  handleLogout() {
  	this.setState({
  	  loggedInStatus: "NOT_LOGGED_IN",
  	  user: {}
  	})
  	this.props.history.push("/login");
  }

  handleLogin(data) {
  	this.setState({
  	  loggedInStatus: "LOGGED_IN",
  	  user: data[0].username
  	})
  }

  componentDidMount() {
  	this.checkLoginStatus();
  }

  render() {
    return (
        <div>
			<div className="row col-1">
        		<div className="list-group">
          			<div className="list-group-item">
            			<Link to="/login">Login</Link>
            	    </div>
            	    <div className="list-group-item">
            			<Link to="/signup">Sign up</Link>
            		</div>
            		<div className="list-group-item">
            			<Link to="/users">Users</Link>
          			</div>
        		</div>
            </div>
            <div>
            	<Switch>
        			<Route exact path="/" component={Home} />
        			<LoginRoute exact path="/login" component={Login}
        				handleSuccessfulAuth={this.handleSuccessfulAuth.bind(this)} 
        				handleLogin={this.handleLogin.bind(this)} 
        				loggedInStatus={this.state.loggedInStatus}
        				user={this.state.user}  />
        			<Route exact path="/signup" render={props => (
        				<Register {...props}
        					handleSuccessfulAuth={this.handleSuccessfulAuth.bind(this)}  
        					handleLogin={this.handleLogin.bind(this)}
        					loggedInStatus={this.state.loggedInStatus} /> 
        			)} />
        			<PrivateRoute exact path="/users" component={Users}
        				handleLogout={this.handleLogout.bind(this)} 
        				loggedInStatus={this.state.loggedInStatus}
        				user={this.state.user}  />
        			<Route path="*" component={() => <h3 className="text-center">404 NOT FOUND</h3>} />
        		</Switch>
      		</div>
      	</div>
    );
  }
}

export default withRouter(App);
