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
            data_table:[],
            flag:0
        }
        this.alertData=this.alertData.bind(this);
        this.change_state_green=this.change_state_green.bind(this);
        this.change_state_red=this.change_state_red.bind(this);
        this.getTable=this.getTable.bind(this);
        this.alertData=this.alertData.bind(this);
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
        const head = {
            headers: { 'Content-Type': 'application/json' }
          };
            axios.get(`http://192.168.31.188:8080/getMess`,head).then((response)=>{
                console.log(response.data)
                let old_data_table = this.state.data_table;
                var now = new Date().toLocaleString();
                let data_table={
                    time: now,
                    CO2:response.data.co2,
                    TVOC:response.data.tvoc,
                    temp:response.data.temperature
                }
                old_data_table.unshift(data_table);
                let new_table_data = old_data_table;
                this.setState({data_table:new_table_data});
                this.setState({state:"update_table"});
                console.log(this.state.data_table);
                setTimeout(this.alertData(),10000)
                //this.alertData();
        })

        
    }
    alertData(){
        console.log('start request');
             axios.get(`http://192.168.31.188:8080/getMess`).then((response)=>{
            this.setState({data:response.data})
            let check = response.data.co2;
            if(check<=550){
                this.setState({state:"greenBox"})
                console.log(response.data);
            }
            else{
                this.setState({state:"redBox"})
                console.log(response.data);
            }
            setTimeout(this.getTable(),10000);
        })

            
        
           
        
        
    }
    render(){
        const {state,data_table} = this.state;
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
                                    <th>Tvoc</th>
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
                                    <th>Tvoc</th>
                                    <th>temp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data_table.map((data_table)=>{return <Column_table time={data_table.time} TVOC={data_table.tvoc}
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
                                    <th>Tvoc</th>
                                    <th>temp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data_table.map((data_table)=>{return <Column_table time={data_table.time} TVOC={data_table.TVOC}
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
                                    <th>Tvoc</th>
                                    <th>temp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data_table.map((data_table)=>{return <Column_table time={data_table.time} TVOC={data_table.TVOC}
                                 CO2={data_table.CO2} temp={data_table.temp}/>})}
                            </tbody>
                            </Table>
                          </div>
                          
                    </div>
                )
            }
        //}
        
    }

}
