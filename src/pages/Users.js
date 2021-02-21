import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';
import { withRouter } from "react-router-dom";

axios.defaults.withCredentials = true;

const { ToggleList } = ColumnToggle;
const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'username',
  text: 'Username'
}, {
  dataField: 'email',
  text: 'Email'
}, {
  dataField: 'data',
  text: 'Registration date'
}, {
  dataField: 'last_login',
  text: 'Last login'
}, {
  dataField: 'is_blocked',
  text: 'Block status'
}];

class Users extends Component {
    constructor(props) {
    	super(props)
    
    	this.state = { 
    		users: [],
    		selectedRows: [], 
    	}

    	this.handleLogoutClick = this.handleLogoutClick.bind(this);
    	this.blockUsers = this.blockUsers.bind(this);
    	this.unblockUsers = this.unblockUsers.bind(this);
    	this.deleteUsers = this.deleteUsers.bind(this);
    	this.getData = this.getData.bind(this);
  	}

  	async getData() {
  		let data = [];
  		data = await axios.get('https://task4-itransition.herokuapp.com/getTable')
		.then(response => {
			//console.log(response);
			if(!(response.data.message==="No table found")) {
				return response.data;
			}
		})
		.catch(error => {
			console.log(error);
		});
		this.setState({ users: data });
  	} 
    
  	componentDidMount() {
    	this.getData();
  	}
  	
  	/*componentDidUpdate(prevProps, prevState) {
  		//if(prevState.users.length == 0) 
  		//	this.getData();
  		if(this.state.selectedRows !== prevState.selectedRows) {
    		this.getData()
    	}
  	}*/                                                                                                                                                                                                 

  	handleLogoutClick(event) {
  		axios.get('https://task4-itransition.herokuapp.com/logout').
  		then((response) => {});
  		this.props.handleLogout();	
  	}

  	blockUsers() {
    	const selectedRows = this.state.selectedRows;
    	axios.post('https://task4-itransition.herokuapp.com/block', { 
    		selectedRows, 
    	}).then((response) => {
			console.log(response.data);
			//if();
		});
		let checker = false;
		for (let el of this.state.users) {
				if(el.username == this.props.user) {
					checker = true;	
				}
		}
		this.componentDidMount();
		if(this.props.loggedInStatus === "LOGGED_IN" && checker === true) {
			this.handleLogoutClick();
		}	
  	};

  	unblockUsers() {
    	const selectedRows = this.state.selectedRows;
    	axios.post('https://task4-itransition.herokuapp.com/unblock', { 
    		selectedRows, 
    	}).then((response) => {
			console.log(response);
		});
		this.componentDidMount();
  	};

  	deleteUsers() {
    	const selectedRows = this.state.selectedRows;
    	axios.post('https://task4-itransition.herokuapp.com/delete', { 
    		selectedRows, 
    	}).then((response) => {
			console.log(response);
		});
		let checker = false;
		for (let el of this.state.users) {
				if(el.username == this.props.user) {
					checker = true;	
				}
		}
		this.componentDidMount();
		if(this.props.loggedInStatus === "LOGGED_IN" && checker === true) {
			this.handleLogoutClick();
		}
  	};

	render() {
		return (
		<div className="container">
			<div className="btn-group mb-3" role="group">
  				<button onClick={this.blockUsers} type="button" className="btn btn-outline-primary">Block</button>
  				<button onClick={this.unblockUsers} type="button" className="btn btn-outline-primary">Unblock</button>
  				<button onClick={this.deleteUsers} type="button" className="btn btn-outline-danger">Delete</button>
			</div>		
			<BootstrapTable 
    			keyField='id'
    			noDataIndication="Table is Empty" 
    			data = {this.state.users} 
    			columns = {columns} 
    			selectRow={{ 
    				mode: 'checkbox', 
    				clickToSelect: true,
    				onSelectAll: (row, rows, isSelect) => {
    					if(row) {
    						for (let r of rows) {
    						this.setState(prevState => ({
  								selectedRows: [...prevState.selectedRows, r.id]
							}))
							}
    					} else {
    						this.setState({selectedRows: []});
    					}
    				}, 
    				onSelect: (row, isSelect) => {
    					if(isSelect) {
    						this.setState(prevState => ({
  								selectedRows: [...prevState.selectedRows, row.id]
							}))
    					} else {
    						this.setState({selectedRows: this.state.selectedRows.filter(function(selectedRows) {
    							return selectedRows !== row.id
    						})})
    					}
    				}
    			}} />
			<h3 className="mt-5 text-center">
            	<button onClick={this.handleLogoutClick} type="button" className="btn btn-outline-primary">Logout</button>
        	</h3>
      	</div>
      	)
	}    
}

export default withRouter(Users);