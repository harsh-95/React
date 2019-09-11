import React,{ Component } from 'react';
import './SearchInput.css';
import Parent from './Parent';

class SearchInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            value: "",
			city: ""
        };
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    }

    componentDidMount(){
        console.log('component SearchInput is mounted');
    }

    componentDidUpdate(){
        console.log('component SearchInput did update');
    }
	
	hideText(){
		document.getElementById("search-text").style.display = "none";
	}
	
	// update state variable zipValue onChange event
	handleOnChange(event){
		this.setState({value: event.target.value})
	}
	
	handleOnKeyDown(event){
		if(event.keyCode == 13){
			this.setState({city: this.state.value});
		}
	}

    render(){
		if(this.state.city === ""){
			return(<div className="container search-container">			
						<div className="search-contents">
							<div className="image"></div>
							<div id="search-icon"></div>
							<div id="search-text" onMouseOver={this.hideText}>Enter City for weather information</div>
							<input type="text" className="form-group" value={this.state.value} onChange={this.handleOnChange} onKeyDown={this.handleOnKeyDown}></input>
							<div id="microphone" title="Search by voice"></div>
						</div>
					</div>
			);
		}
		else{
			return(
					<Parent city={this.state.city}/>
					);
		}

    }
}
export default SearchInput;