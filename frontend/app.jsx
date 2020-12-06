import React from 'react';
import ReactDOM from 'react-dom';
import ButtonApi from './button_api.jsx';
import axios from 'axios';
export default class App extends React.Component{
    render(){
        return(
            <ButtonApi/>
        )
    }
}
ReactDOM.render(<App/>,document.getElementById('page_site'));    