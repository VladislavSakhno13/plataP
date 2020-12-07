import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,Table,Nav,Navbar,NavDropdown,FormControl,ButtonGroup,Carousel,Item} from 'react-bootstrap';
export default class Column_table extends React.Component{
    render(){
        return(
                <tr>
                    <td>{this.props.time}</td>
                    <td>{this.props.CO2}</td>
                    <td>{this.props.TVOC}</td>
                    <td>{this.props.temp}</td>
                </tr>
        )
    }
}