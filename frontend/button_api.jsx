import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Signal from './signal.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,Table,Nav,Navbar,NavDropdown,FormControl,ButtonGroup,Carousel,Item, Alert} from 'react-bootstrap';
export default class ButtonApi extends React.Component{
    constructor(props){
        super(props);
        this.state={
            state:"start",
            data:null,
            data_fire:undefined
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
      let data_fire={
        co2:"10",
        time:"12:87",
        timerture:"Норм так"
      }
      this.setState({data_fire:data_fire})
        console.log(this.state.data_fire);
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
        const {state} = this.state;
        //const inter = setInterval(this.alertData,10000);
        if(state=="start"){
            return(
                <div>
                      <Button variant="secondary" onClick={this.getTable}>Получить показания</Button>
                </div>
            )
        }
        if(state=="greenBox"){
            return(
                <div>
                      <Button variant="secondary" onClick={this.alertData}>Получить показания</Button>
                      <Signal signal={"Все по кайфу"} color={"#2CFF18"}/>
                </div>
            )
        }
        if(state=="redBox"){
            return(
                <div>
                      <Button variant="secondary" onClick={this.alertData}>Получить показания</Button>
                      <Signal signal={"Жопа все горит"} color={"#FF1839"}/>
                </div>
            )
        }
    }

}