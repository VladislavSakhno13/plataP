import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Signal from './signal.jsx';
import Column_table from './column_table.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,Table,Nav,Navbar,NavDropdown,FormControl,ButtonGroup,Carousel,Item, Alert} from 'react-bootstrap';
export default class ButtonApi extends React.Component{
    constructor(props){
        super(props);
        this.state={
            state:"start",
            data:null,
            data_fire:undefined,
            data_table:[]
        }
        this.alertData=this.alertData.bind(this);
        this.change_state_green=this.change_state_green.bind(this);
        this.change_state_red=this.change_state_red.bind(this);
        this.getTable=this.getTable.bind(this);
    }
    change_state_green(){
        this.state.state = "greenBox";
    }
    change_state_red(){
        this.state.state = "redBox";
    }
    interval(){
        console.log(1);
    }
    getTable(){
        /*const head = {
            headers: { 'Content-Type': 'application/json' }
          };
        axios.get(`http://192.168.31.188:8080/getMess`,head).then((response)=>console.log(response.data));*/
        let old_data_table = this.state.data_table;
        let data_table={
            time:"newTime",
            CO2:"Дохуя",
            huita:"newHuita",
            temp:"36.19"
        }
        old_data_table.push(data_table);
        let new_table_data = old_data_table;
        this.setState({data_table:new_table_data});
        this.setState({state:"update_table"});
        console.log(this.state.data_table);
        
    }
    alertData(){
        console.log(1);
        axios.get(`https://api.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1m&limit=1`).then((response)=>{
            this.setState({data:response.data})
            let check = 100;
            if(check<150){
                this.setState({state:"greenBox"})
            }
            else{
                this.setState({state:"redBox"})
            }
        })
    }
    render(){
        const {state,data_table} = this.state;
        //const inter = setInterval(this.alertData,10000);
        if(state=="start"){
            return(
                <div>
                        <div className="alet">
                        <Button variant="secondary" onClick={this.getTable}>Получить показания</Button>
                        </div>
                      <div className="data_table">
                      <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>CO2</th>
                                <th>TV</th>
                                <th>temp</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        </Table>
                      </div>
                </div>
            )
        }
        if(state=="greenBox"){
            return(
                <div>
                       <div className="alet">
                        <Button variant="secondary" onClick={this.getTable}>Получить показания</Button>
                        <Signal signal={"Все по кайфу"} color={"#2CFF18"}/>
                        </div>

                        <div className="data_table">
                      <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>CO2</th>
                                <th>TV</th>
                                <th>temp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data_table.map((data_table)=>{return <Column_table time={data_table.time} TV={data_table.TV}
                             CO2={data_table.CO2} temp={data_table.temp}/>})}
                        </tbody>
                        </Table>
                      </div>
                </div>
            )
        }
        if(state=="redBox"){
            return(
                <div>
                      <div className="alet">
                        <Button variant="secondary" onClick={this.getTable}>Получить показания</Button>
                        <Signal signal={"Жопа все горит"} color={"#FF1839"}/>
                        </div>
                        
                        <div className="data_table">
                      <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>CO2</th>
                                <th>TV</th>
                                <th>temp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data_table.map((data_table)=>{return <Column_table time={data_table.time} TV={data_table.TV}
                             CO2={data_table.CO2} temp={data_table.temp}/>})}
                        </tbody>
                        </Table>
                      </div>
                </div>
            )
        }
        if(state=="update_table"){
            return(
                <div>
                    <div className="alet">
                        <Button variant="secondary" onClick={this.getTable}>Получить показания</Button>
                        </div>
                      <div className="data_table">
                      <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>CO2</th>
                                <th>TV</th>
                                <th>temp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data_table.map((data_table)=>{return <Column_table time={data_table.time} TV={data_table.TV}
                             CO2={data_table.CO2} temp={data_table.temp}/>})}
                        </tbody>
                        </Table>
                      </div>
                      
                </div>
            )
        }
    }

}