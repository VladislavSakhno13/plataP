import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,Table,Nav,Navbar,NavDropdown,FormControl,ButtonGroup,Carousel,Item} from 'react-bootstrap';
export default class Signal extends React.Component{
    render(){
        return(
            <div className="alertBox" style={{backgroundColor:this.props.color}}>
                  {this.props.signal}
            </div>
        )
    }
}